import assert from "node:assert/strict";
import { generateKeyPairSync, verify } from "node:crypto";
import test from "node:test";
import { classifyChanges } from "../scripts/classify-seo-aeo-change.mjs";
import { discoverPublicRoutes, extractCanonical, findMissingRoutes, parseJsonLd, parseSitemap, runChecks, validateHtml } from "../scripts/seo-aeo-check.mjs";
import { buildSitemapEndpoint, createJwtAssertion } from "../scripts/gsc-notify.mjs";

test("skips GSC for presentation-only changes", () => {
  const result = classifyChanges({
    base: "before",
    head: "after",
    files: ["app/globals.css", "tests/rendered-html.test.mjs"],
    diffText: "- .old { color: red; }\n+ .new { color: blue; }",
    previousSitemap: ["https://ycaura.com"],
    currentSitemap: ["https://ycaura.com"],
  });
  assert.equal(result.needsGscSitemapSubmit, false);
  assert.deepEqual(result.reasons, []);
});

test("skips GSC when an inline JSX line only changes presentation attributes", () => {
  const result = classifyChanges({
    base: "before",
    head: "after",
    files: ["app/page.tsx"],
    diffText: "-<a className=\"old\" data-ga-event=\"old\">foo</a>\n+<a className=\"new\" data-ga-event=\"new\">foo</a>",
    previousSitemap: ["https://ycaura.com"],
    currentSitemap: ["https://ycaura.com"],
  });
  assert.equal(result.needsGscSitemapSubmit, false);
});

test("skips GSC for analytics-only root layout changes", () => {
  const result = classifyChanges({
    base: "before",
    head: "after",
    files: ["app/layout.tsx"],
    diffText: "-import { GoogleAnalytics } from \"./google-analytics\";\n+import { GoogleAnalytics } from \"./google-analytics\";\n-<GoogleAnalytics />\n+<GoogleAnalytics />",
    diffTextByFile: {
      "app/layout.tsx": "-import { GoogleAnalytics } from \"./google-analytics\";\n+import { GoogleAnalytics } from \"./google-analytics\";\n-<GoogleAnalytics />\n+<GoogleAnalytics />",
    },
    previousSitemap: ["https://ycaura.com"],
    currentSitemap: ["https://ycaura.com"],
  });
  assert.equal(result.needsGscSitemapSubmit, false);
});

test("does not let a CSS diff make a presentation-only page diff look meaningful", () => {
  const result = classifyChanges({
    base: "before",
    head: "after",
    files: ["app/page.tsx", "app/globals.css"],
    diffText: "-<a className=\"old\">foo</a>\n+<a className=\"new\">foo</a>\n-.old { color: red; }\n+.new { color: blue; }",
    diffTextByFile: {
      "app/page.tsx": "-<a className=\"old\">foo</a>\n+<a className=\"new\">foo</a>",
    },
    previousSitemap: ["https://ycaura.com"],
    currentSitemap: ["https://ycaura.com"],
  });
  assert.equal(result.needsGscSitemapSubmit, false);
});

test("submits GSC sitemap when a public URL is added", () => {
  const result = classifyChanges({
    base: "before",
    head: "after",
    files: ["public/sitemap.xml"],
    diffText: "",
    previousSitemap: ["https://ycaura.com"],
    currentSitemap: ["https://ycaura.com", "https://ycaura.com/knowledge/new-page"],
  });
  assert.equal(result.needsGscSitemapSubmit, true);
  assert.deepEqual(result.addedUrls, ["https://ycaura.com/knowledge/new-page"]);
});

test("submits GSC sitemap when a nested route layout changes", () => {
  const result = classifyChanges({
    base: "before",
    head: "after",
    files: ["app/knowledge/layout.tsx"],
    diffText: "-export const metadata = oldMetadata;\n+export const metadata = newMetadata;",
    previousSitemap: ["https://ycaura.com"],
    currentSitemap: ["https://ycaura.com"],
  });
  assert.equal(result.needsGscSitemapSubmit, true);
});

test("submits GSC when the deployed worker canonicalization changes", () => {
  const result = classifyChanges({
    base: "before",
    head: "after",
    files: ["worker/index.ts"],
    diffText: "-const canonicalHost = oldHost;\n+const canonicalHost = newHost;",
    previousSitemap: ["https://ycaura.com"],
    currentSitemap: ["https://ycaura.com"],
  });
  assert.equal(result.needsGscSitemapSubmit, true);
});

test("submits GSC when sitemap metadata changes without changing URLs", () => {
  const result = classifyChanges({
    base: "before",
    head: "after",
    files: ["public/sitemap.xml"],
    diffText: "-<lastmod>2026-09-18</lastmod>\n+<lastmod>2026-09-19</lastmod>",
    previousSitemap: ["https://ycaura.com"],
    currentSitemap: ["https://ycaura.com"],
    previousSitemapContent: "<urlset><url><loc>https://ycaura.com</loc><lastmod>2026-09-18</lastmod></url></urlset>",
    currentSitemapContent: "<urlset><url><loc>https://ycaura.com</loc><lastmod>2026-09-19</lastmod></url></urlset>",
  });
  assert.equal(result.needsGscSitemapSubmit, true);
  assert.deepEqual(result.reasons, ["sitemap metadata changed"]);
});

test("validates canonical, heading, and JSON-LD output", () => {
  const html = `<!doctype html><html><head><title>測試頁面</title><meta name="description" content="測試描述" /><meta property="og:title" content="測試頁面" /><meta property="og:description" content="測試描述" /><meta property="og:url" content="https://ycaura.com/knowledge/test" /><link rel="canonical" href="https://ycaura.com/knowledge/test" /></head><body><h1>測試頁面</h1><script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":["Organization","LocalBusiness"]},{"@type":"WebPage","url":"https://ycaura.com/knowledge/test"},{"@type":"Article"}]}</script></body></html>`;
  assert.equal(extractCanonical(html), "https://ycaura.com/knowledge/test");
  assert.deepEqual(parseJsonLd(html).errors, []);
  assert.deepEqual(validateHtml({ html, expectedUrl: "https://ycaura.com/knowledge/test" }), []);
});

test("rejects sitemap URLs outside the canonical origin", () => {
  assert.throws(
    () => parseSitemap("<urlset><url><loc>https://example.com/other</loc></url></urlset>", "https://ycaura.com"),
    /outside https:\/\/ycaura\.com/,
  );
});

test("detects public routes omitted from the sitemap", () => {
  assert.deepEqual(findMissingRoutes(["https://ycaura.com"], ["/", "/knowledge/new-page"], "https://ycaura.com"), ["https://ycaura.com/knowledge/new-page"]);
  assert.equal(discoverPublicRoutes().includes("/services/herbal-stretch-care"), true);
});

test("rejects malformed sitemap nesting", () => {
  assert.throws(
    () => parseSitemap("<urlset><url><loc>https://ycaura.com</loc></urlset>", "https://ycaura.com"),
    /mismatched closing tag/,
  );
});

test("rejects a sitemap url without its own loc", () => {
  assert.throws(
    () => parseSitemap("<urlset><url><loc>https://ycaura.com/a</loc></url><url></url></urlset>", "https://ycaura.com"),
    /every sitemap url must contain exactly one loc/,
  );
});

test("rejects multiple sitemap roots", () => {
  assert.throws(
    () => parseSitemap("<urlset><url><loc>https://ycaura.com</loc></url></urlset><urlset></urlset>", "https://ycaura.com"),
    /multiple root elements/,
  );
});

test("does not accept a robots sitemap URL with a trailing suffix", async () => {
  const originalFetch = global.fetch;
  global.fetch = async (url) => {
    const path = new URL(url).pathname;
    const body = path === "/sitemap.xml"
      ? "<urlset><url><loc>https://ycaura.com/a</loc></url></urlset>"
      : path === "/robots.txt"
        ? "Sitemap: https://ycaura.com/sitemap.xml.backup"
        : "ycaura.com";
    return new Response(body, { status: 200 });
  };
  try {
    const report = await runChecks("http://localhost:1106", "https://ycaura.com", { checkRouteManifest: false });
    assert.equal(report.ok, false);
    assert.equal(report.issues.includes("robots.txt does not reference sitemap.xml"), true);
  } finally {
    global.fetch = originalFetch;
  }
});

test("creates a verifiable Google service-account JWT", () => {
  const { privateKey, publicKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
  const privateKeyPem = privateKey.export({ type: "pkcs8", format: "pem" });
  const publicKeyPem = publicKey.export({ type: "spki", format: "pem" });
  const assertion = createJwtAssertion({ client_email: "gsc@example.iam.gserviceaccount.com", private_key: privateKeyPem }, 1_700_000_000);
  const [header, payload, signature] = assertion.split(".");
  const verified = verify("RSA-SHA256", Buffer.from(`${header}.${payload}`), publicKeyPem, Buffer.from(signature, "base64url"));
  const decodedPayload = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  assert.equal(verified, true);
  assert.equal(decodedPayload.iss, "gsc@example.iam.gserviceaccount.com");
  assert.equal(decodedPayload.iat, 1_699_999_970);
  assert.equal(decodedPayload.exp, 1_700_003_570);
  assert.equal("sub" in decodedPayload, false);
});

test("builds the Search Console sitemap submit endpoint", () => {
  assert.equal(
    buildSitemapEndpoint("https://ycaura.com/", "https://ycaura.com/sitemap.xml"),
    "https://www.googleapis.com/webmasters/v3/sites/https%3A%2F%2Fycaura.com%2F/sitemaps/https%3A%2F%2Fycaura.com%2Fsitemap.xml",
  );
});

test("validates a local build against the production canonical origin", async () => {
  const originalFetch = global.fetch;
  const html = `<!doctype html><html><head><title>測試頁面</title><meta name="description" content="測試描述" /><meta property="og:title" content="測試頁面" /><meta property="og:description" content="測試描述" /><meta property="og:url" content="https://ycaura.com/knowledge/test" /><link rel="canonical" href="https://ycaura.com/knowledge/test" /></head><body><h1>測試頁面</h1><script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":["Organization","LocalBusiness"]},{"@type":"WebPage","url":"https://ycaura.com/knowledge/test"},{"@type":"Article"}]}</script></body></html>`;
  global.fetch = async (url) => {
    const path = new URL(url).pathname;
    const body = path === "/sitemap.xml"
      ? "<urlset><url><loc>https://ycaura.com/knowledge/test</loc></url></urlset>"
      : path === "/robots.txt"
        ? "User-agent: *\nSitemap: https://ycaura.com/sitemap.xml\n"
        : path === "/llms.txt" || path === "/llms-full.txt"
          ? "ycaura.com LINE 預約 0981-756-111 https://ycaura.com/knowledge/test"
          : html;
    return new Response(body, { status: 200 });
  };
  try {
    const report = await runChecks("http://localhost:1106", "https://ycaura.com", { checkRouteManifest: false });
    assert.equal(report.ok, true);
    assert.deepEqual(report.checkedUrls, ["https://ycaura.com/knowledge/test"]);
  } finally {
    global.fetch = originalFetch;
  }
});

test("rejects duplicate page titles and descriptions", async () => {
  const originalFetch = global.fetch;
  const html = (path) => `<!doctype html><html><head><title>相同標題</title><meta name="description" content="相同描述" /><meta property="og:title" content="${path}" /><meta property="og:description" content="${path}" /><meta property="og:url" content="https://ycaura.com${path}" /><link rel="canonical" href="https://ycaura.com${path}" /></head><body><h1>${path}</h1><script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":["Organization","LocalBusiness"]},{"@type":"WebPage","url":"https://ycaura.com${path}"},{"@type":"Article"}]}</script></body></html>`;
  global.fetch = async (url) => {
    const path = new URL(url).pathname;
    const body = path === "/sitemap.xml"
      ? "<urlset><url><loc>https://ycaura.com/a</loc></url><url><loc>https://ycaura.com/b</loc></url></urlset>"
      : path === "/robots.txt"
        ? "Sitemap: https://ycaura.com/sitemap.xml"
        : path === "/llms.txt" || path === "/llms-full.txt"
          ? "ycaura.com LINE 預約 0981-756-111 https://ycaura.com/a https://ycaura.com/b"
          : html(path);
    return new Response(body, { status: 200 });
  };
  try {
    const report = await runChecks("http://localhost:1106", "https://ycaura.com", { checkRouteManifest: false });
    assert.equal(report.ok, false);
    assert.equal(report.issues.some((issue) => issue.startsWith("duplicate title across pages")), true);
    assert.equal(report.issues.some((issue) => issue.startsWith("duplicate description across pages")), true);
  } finally {
    global.fetch = originalFetch;
  }
});

test("rejects stale or incomplete AEO source files", async () => {
  const originalFetch = global.fetch;
  const html = (path) => `<!doctype html><html><head><title>${path}</title><meta name="description" content="${path}" /><meta property="og:title" content="${path}" /><meta property="og:description" content="${path}" /><meta property="og:url" content="https://ycaura.com${path}" /><link rel="canonical" href="https://ycaura.com${path}" /></head><body><h1>${path}</h1><script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":["Organization","LocalBusiness"]},{"@type":"WebPage","url":"https://ycaura.com${path}"},{"@type":"Article"}]}</script></body></html>`;
  global.fetch = async (url) => {
    const path = new URL(url).pathname;
    const body = path === "/sitemap.xml"
      ? "<urlset><url><loc>https://ycaura.com/a</loc></url><url><loc>https://ycaura.com/b</loc></url></urlset>"
      : path === "/robots.txt"
        ? "Sitemap: https://ycaura.com/sitemap.xml"
        : path === "/llms.txt" || path === "/llms-full.txt"
          ? "ycaura.com LINE https://ycaura.com/a"
          : html(path);
    return new Response(body, { status: 200 });
  };
  try {
    const report = await runChecks("http://localhost:1106", "https://ycaura.com", { checkRouteManifest: false });
    assert.equal(report.ok, false);
    assert.equal(report.issues.some((issue) => issue.includes("missing sitemap route: /b")), true);
    assert.equal(report.issues.some((issue) => issue.includes("required contact signal: 預約")), true);
    assert.equal(report.issues.some((issue) => issue.includes("required contact signal: phone")), true);
  } finally {
    global.fetch = originalFetch;
  }
});
