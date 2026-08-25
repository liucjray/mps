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
  const html = await response.text();
  assert.match(html, developmentPreviewMeta);
  assert.match(html, /<link rel="canonical" href="https:\/\/mps\.rabby\.cc\/"\/>/i);
  assert.match(html, /<meta property="og:url" content="https:\/\/mps\.rabby\.cc"\/>/i);
  assert.match(html, /<meta name="robots" content="index, follow"\/>/i);
  assert.match(html, /<meta name="twitter:card" content="summary_large_image"\/>/i);
  assert.match(html, /"@type":"BeautySalon"/i);
  assert.match(html, /"@type":"FAQPage"/i);
  assert.match(html, /"@type":"WebPage"/i);
  assert.doesNotMatch(html, /personal-brand\.workspace-885811\.chatgpt\.site/i);
  assert.match(html, /alt="自然光下的肌膚諮詢桌面，包含筆記本、陶瓷器皿與放大鏡"/i);
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
  assert.match(llms, /# 瑪菲斯皮膚覆蓋專家｜新北雙和店/);
  assert.match(llms, /官方網站: https:\/\/mps\.rabby\.cc\//);
});
