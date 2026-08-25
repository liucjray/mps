/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const isHashedAsset = (pathname: string) => pathname.startsWith("/assets/");
const isPublicAsset = (pathname: string) => /\.(?:avif|css|gif|ico|jpe?g|js|png|svg|webp|woff2?)$/i.test(pathname);
const isAssetRequest = (request: Request, pathname: string) =>
  (request.method === "GET" || request.method === "HEAD") && (isHashedAsset(pathname) || isPublicAsset(pathname));

function addResponseHeaders(response: Response, cacheControl?: string): Response {
  const headers = new Headers(response.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), geolocation=(), microphone=()");
  if (cacheControl && response.ok) headers.set("Cache-Control", cacheControl);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

async function normalizeHtmlDocument(response: Response): Promise<Response> {
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.startsWith("text/html") || !response.body) return response;

  const body = await response.text();
  const trailingScripts = body.match(/^(?<document>[\s\S]*?)<\/body>\s*<\/html>(?<scripts>\s*<script[\s\S]*)$/i);
  if (!trailingScripts?.groups) return new Response(body, response);

  const normalizedBody = `${trailingScripts.groups.document}${trailingScripts.groups.scripts}</body></html>`;
  return new Response(normalizedBody, response);
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    if (isAssetRequest(request, url.pathname)) {
      const response = await env.ASSETS.fetch(request);
      return addResponseHeaders(
        response,
        isHashedAsset(url.pathname)
          ? "public, max-age=31536000, immutable"
          : "public, max-age=86400, stale-while-revalidate=604800",
      );
    }

    const response = await handler.fetch(request, env, ctx);
    return addResponseHeaders(await normalizeHtmlDocument(response));
  },
};

export default worker;
