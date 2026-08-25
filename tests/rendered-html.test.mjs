import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders development preview metadata and SEO/AEO signals", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
  assert.equal(response.headers.get("permissions-policy"), "camera=(), geolocation=(), microphone=()");
  const html = await response.text();
  assert.match(html, developmentPreviewMeta);
  assert.match(html, /<link rel="canonical" href="https:\/\/mps\.rabby\.cc\/"\/>/i);
  assert.match(html, /<meta property="og:url" content="https:\/\/mps\.rabby\.cc"\/>/i);
  assert.match(html, /<meta name="robots" content="index, follow"\/>/i);
  assert.match(html, /<meta name="twitter:card" content="summary_large_image"\/>/i);
  assert.match(html, /"@type":"BeautySalon"/i);
  assert.match(html, /"alternateName":\["Mavis pure skin","MAVIS PURE SKIN"\]/i);
  assert.match(html, /"@type":"Brand"/i);
  assert.match(html, /新北市中和區/);
  assert.match(html, /"@type":"City"/i);
  assert.match(html, /"@type":"ContactPoint"/i);
  assert.match(html, /https:\/\/www\.instagram\.com\/mavis_pure_skin\//i);
  assert.match(html, /accountId=043aqebt/i);
  assert.match(html, /facebook\.com\/people\/.+61592083747747\//i);
  assert.match(html, /"serviceType":"瑪菲斯草本撫紋"/i);
  assert.match(html, /"@type":"FAQPage"/i);
  assert.match(html, /"@type":"WebPage"/i);
  assert.doesNotMatch(html, /personal-brand\.workspace-885811\.chatgpt\.site/i);
  assert.doesNotMatch(html, /\/_(?:vinext|next)\/image/i);
  assert.match(html, /src="\/hero-skin-atelier\.webp"/i);
  assert.match(html, /src="\/intro-skin-consultation\.webp"/i);
  assert.match(html, /src="\/knowledge-skin-palette\.webp"/i);
  assert.match(html, /alt="自然光下的肌膚諮詢桌面，包含筆記本、陶瓷器皿與放大鏡"/i);
  assert.match(html, /了解流程/);
  assert.match(html, /本站提供一般肌膚美學資訊，不取代醫療診斷或治療建議。/);

  const assetResponse = await worker.fetch(
    new Request("http://localhost/hero-skin-atelier.webp"),
    { ASSETS: { fetch: async () => new Response("asset", { headers: { "content-type": "image/webp" } }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(assetResponse.status, 200);
  assert.equal(assetResponse.headers.get("cache-control"), "public, max-age=86400, stale-while-revalidate=604800");
  assert.equal(assetResponse.headers.get("x-content-type-options"), "nosniff");
});

test("ships crawler and answer-engine support files", async () => {
  const [robots, sitemap, llms] = await Promise.all([
    readFile(new URL("../public/robots.txt", import.meta.url), "utf8"),
    readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8"),
    readFile(new URL("../public/llms.txt", import.meta.url), "utf8"),
  ]);

  assert.match(robots, /Sitemap: https:\/\/mps\.rabby\.cc\/sitemap\.xml/);
  assert.match(robots, /User-agent: GPTBot[\s\S]*Allow: \//);
  assert.match(sitemap, /<loc>https:\/\/mps\.rabby\.cc\/<\/loc>/);
  assert.match(sitemap, /xmlns:image="http:\/\/www\.google\.com\/schemas\/sitemap-image\/1\.1"/);
  for (const image of [
    "hero-skin-atelier.webp",
    "intro-skin-consultation.webp",
    "knowledge-skin-palette.webp",
  ]) {
    assert.match(sitemap, new RegExp(`<image:loc>https:\\/\\/mps\\.rabby\\.cc\\/${image}<\\/image:loc>`));
  }
  assert.match(llms, /# 瑪菲斯皮膚覆蓋專家｜新北雙和店（中和區）/);
  assert.match(llms, /官方網站: https:\/\/mps\.rabby\.cc\//);
  assert.match(llms, /雙和店 Facebook: https:\/\/www\.facebook\.com\/people\/.+61592083747747\//);
  assert.match(llms, /諮詢流程: https:\/\/mps\.rabby\.cc\/#process/);
  assert.match(llms, /品牌 Instagram: https:\/\/www\.instagram\.com\/mavis_pure_skin\//);
  assert.match(llms, /品牌 LINE: https:\/\/liff\.line\.me\/1645278921-kWRPP32q\/\?accountId=043aqebt/);
  assert.match(llms, /## 諮詢流程/);
  assert.match(llms, /肌膚美學資訊可以取代看醫生嗎？不可以/);
});
