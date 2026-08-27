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
    new Request("https://localhost/", {
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
  assert.equal(response.headers.get("cache-control"), "public, max-age=300, stale-while-revalidate=86400");
  const html = await response.text();
  assert.match(html, /<\/body><\/html>$/i);
  assert.doesNotMatch(html, /<\/html>\s*<script/i);
  const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  assert.ok(jsonLdMatch, "JSON-LD block should be rendered");
  const graph = JSON.parse(jsonLdMatch[1])["@graph"];
  const organization = graph.find((entity) => Array.isArray(entity["@type"]) ? entity["@type"].includes("Organization") : entity["@type"] === "Organization");
  assert.ok(organization, "Organization entity should be rendered");
  assert.equal("availableLanguage" in organization, false);
  assert.deepEqual(organization.contactPoint.availableLanguage, ["zh-Hant-TW"]);
  assert.deepEqual(organization.contactPoint.areaServed.map((area) => area.name), ["新北市", "中和區", "永和區", "台北市"]);
  assert.equal(organization.email, "millie0806@gmail.com");
  assert.deepEqual(organization.address, { "@type": "PostalAddress", streetAddress: "景新街347號9樓之9", addressLocality: "中和區", addressRegion: "新北市", addressCountry: "TW" });
  const services = graph.filter((entity) => entity["@type"] === "Service");
  assert.equal(services.length, 4);
  assert.ok(services.every((service) => service.provider["@id"] === "https://ycaura.com/#organization"));
  assert.ok(services.every((service) => service.areaServed.some((area) => area.name === "中和區")));
  assert.ok(organization.hasOfferCatalog.itemListElement.every((offer) => offer.itemOffered["@id"].includes("#service-")));
  assert.match(html, developmentPreviewMeta);
  assert.match(html, /<link rel="canonical" href="https:\/\/ycaura\.com\/?"\/>/i);
  assert.match(html, /<meta property="og:url" content="https:\/\/ycaura\.com\/?"\/>/i);
  assert.match(html, /<meta name="robots" content="index, follow"\/>/i);
  assert.match(html, /<meta name="twitter:card" content="summary_large_image"\/>/i);
  assert.match(html, /雙和店 \/ 新北中和・南勢角站/);
  assert.match(html, /新北雙和店｜瑪菲斯皮膚覆蓋專家/);
  assert.match(html, /新北雙和店｜瑪菲斯皮膚覆蓋專家｜中和・南勢角站｜雙北預約/);
  assert.match(html, /"@type":\["Organization","LocalBusiness"\]/i);
  assert.match(html, /millie0806@gmail\.com/i);
  assert.match(html, /景新街347號9樓之9/);
  assert.match(html, /"@type":"ImageObject"/i);
  assert.match(html, /https:\/\/ycaura\.com\/logo\.png/i);
  assert.match(html, /property="og:image" content="https:\/\/ycaura\.com\/social-skin-atelier\.jpg"/i);
  assert.match(html, /"dateModified":"2026-08-27"/i);
  assert.match(html, /"alternateName":\["Mavis pure skin","MAVIS PURE SKIN"\]/i);
  assert.match(html, /"@type":"Brand"/i);
  assert.match(html, /新北市中和區/);
  assert.match(html, /捷運南勢角站/);
  assert.match(html, /雙和（中和、永和）與雙北（新北市、台北市）地區，亦接受北部地區預約/);
  assert.match(html, /11:00–19:00（預約制）/);
  assert.match(html, /預約.*手機、LINE、Instagram 或 Facebook 私訊/);
  assert.match(html, /"@type":"AdministrativeArea"/i);
  assert.doesNotMatch(html, /"@type":"BeautySalon"/i);
  assert.match(html, /"@type":"ContactPoint"/i);
  assert.match(html, /https:\/\/line\.me\/ti\/p\/f_92dWjx8l/i);
  assert.match(html, /https:\/\/www\.instagram\.com\/millie_711102/i);
  assert.match(html, /aria-label="LINE 預約 QR Code/i);
  assert.match(html, /src="\/qr-line\.svg"/i);
  assert.match(html, /src="\/qr-facebook\.svg"/i);
  assert.match(html, /src="\/qr-instagram\.svg"/i);
  assert.match(html, /facebook\.com\/people\/.+61592083747747\//i);
  assert.match(html, /"serviceType":"草本撫紋"/i);
  assert.match(html, /"@type":"FAQPage"/i);
  assert.match(html, /"@type":"WebPage"/i);
  assert.doesNotMatch(html, /personal-brand\.workspace-885811\.chatgpt\.site/i);
  assert.doesNotMatch(html, /\/_(?:vinext|next)\/image/i);
  assert.match(html, /src="\/hero-skin-atelier\.webp"/i);
  assert.match(html, /src="\/intro-skin-consultation\.webp"/i);
  assert.match(html, /src="\/knowledge-skin-palette\.webp"/i);
  assert.match(html, /alt="自然光下的肌膚諮詢桌面，包含筆記本、陶瓷器皿與放大鏡"/i);
  assert.match(html, /了解流程/);
  assert.match(html, /<section class="intro section-shell" aria-labelledby="about-title"><div class="section-label nav-target" id="about"/i);
  assert.match(html, /<section class="services section-shell" aria-labelledby="services-title"><div class="section-heading"><div><div class="section-label nav-target" id="services"/i);
  assert.match(html, /<section class="faq section-shell" aria-labelledby="faq-title"><div class="section-label nav-target" id="faq"/i);
  for (const slug of ["herbal-stretch-care", "skin-camouflage", "colour-matching", "beauty-education"]) {
    assert.match(html, new RegExp(`href="/services/${slug}"`, "i"));
  }
  assert.match(html, /href="\/knowledge\/stretch-marks"/i);
  assert.match(html, /本站提供一般肌膚美學資訊，不取代醫療診斷或治療建議。/);

  const assetResponse = await worker.fetch(
    new Request("https://localhost/hero-skin-atelier.webp"),
    { ASSETS: { fetch: async () => new Response("asset", { headers: { "content-type": "image/webp" } }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(assetResponse.status, 200);
  assert.equal(assetResponse.headers.get("cache-control"), "public, max-age=86400, stale-while-revalidate=604800");
  assert.equal(assetResponse.headers.get("x-content-type-options"), "nosniff");
});

test("renders the pregnancy stretch marks knowledge page", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("knowledge-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("https://localhost/knowledge/stretch-marks", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.equal(response.headers.get("cache-control"), "public, max-age=300, stale-while-revalidate=86400");
  const html = await response.text();
  assert.match(html, /<h1>妊娠紋是什麼？[\s\S]*先了解，再選擇。[\s\S]*<\/h1>/i);
  assert.match(html, /<link rel="canonical" href="https:\/\/ycaura\.com\/knowledge\/stretch-marks"\/>/i);
  assert.match(html, /<meta property="og:type" content="article"\/>/i);
  assert.match(html, /<meta property="og:url" content="https:\/\/ycaura\.com\/knowledge\/stretch-marks"\/>/i);
  assert.match(html, /妊娠紋是皮膚在懷孕等快速伸展情況下形成的線狀紋路/);
  assert.match(html, /保濕可以協助舒緩乾燥與搔癢/);
  assert.match(html, /本站內容與外觀修飾諮詢都不能取代診斷或治療/);
  assert.match(html, /href="\/services\/herbal-stretch-care"/i);
  assert.match(html, /facebook\.com\/people\/.+61592083747747\//i);
  assert.doesNotMatch(html, /facebook\.com\/mavispureskin1110111/i);

  const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  assert.ok(jsonLdMatch, "knowledge page JSON-LD block should be rendered");
  const graph = JSON.parse(jsonLdMatch[1])["@graph"];
  assert.ok(graph.some((entity) => entity["@type"] === "Article"));
  assert.ok(graph.some((entity) => entity["@type"] === "FAQPage"));
  assert.equal(graph.find((entity) => entity["@type"] === "FAQPage").mainEntity.length, 6);
  assert.equal(graph.find((entity) => entity["@type"] === "Article").dateModified, "2026-08-27");
});

test("renders independently indexable service pages", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("services-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const serviceSlugs = ["herbal-stretch-care", "skin-camouflage", "colour-matching", "beauty-education"];

  for (const slug of serviceSlugs) {
    const response = await worker.fetch(
      new Request(`https://localhost/services/${slug}`, { headers: { accept: "text/html" } }),
      { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
      { waitUntil() {}, passThroughOnException() {} },
    );

    assert.equal(response.status, 200, `${slug} should render`);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    const html = await response.text();
    assert.match(html, /<h1>[^<]+<\/h1>/i);
    assert.match(html, new RegExp(`<link rel="canonical" href="https://ycaura\\.com/services/${slug}/?"(?:/?>)`, "i"));
    assert.match(html, new RegExp(`<meta property="og:url" content="https://ycaura\\.com/services/${slug}"(?:/?>)`, "i"));
    assert.match(html, /"@type":"Service"/i);
    assert.match(html, /"@type":\["Organization","LocalBusiness"\]/i);
    assert.match(html, /millie0806@gmail\.com/i);
    assert.match(html, /景新街347號9樓之9/);
    assert.match(html, /捷運南勢角站/);
    assert.match(html, /雙和（中和、永和）與雙北（新北市、台北市）地區，亦接受北部地區預約/);
    assert.match(html, /11:00–19:00（預約制）/);
    assert.match(html, /預約.*手機、LINE、Instagram 或 Facebook 私訊/);
    assert.match(html, /"@type":"BreadcrumbList"/i);
    assert.match(html, /"@type":"FAQPage"/i);
    assert.match(html, /<details>/i);
    assert.match(html, /本站提供一般肌膚美學與外觀照護資訊，不取代醫療診斷或治療建議。/);
    assert.match(html, /href="\/services\//i);
    if (slug === "herbal-stretch-care") {
      assert.match(html, /<h1>草本撫紋<\/h1>/i);
      assert.match(html, /針對妊娠紋、肥胖紋與成長紋等常見紋路，從紋路類型、部位與肌膚狀態開始評估/);
      assert.doesNotMatch(html, /<h1>雙和店草本撫紋<\/h1>/i);
    }
  }
});

test("redirects every HTTP hostname to HTTPS", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("http-redirect-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  for (const [hostname, target] of [
    ["ycaura.com", "ycaura.com"],
    ["www.ycaura.com", "ycaura.com"],
    ["mps.rabby.cc", "ycaura.com"],
  ]) {
    const response = await worker.fetch(
      new Request(`http://${hostname}/contact?source=test`),
      { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
      { waitUntil() {}, passThroughOnException() {} },
    );

    assert.equal(response.status, 301, `${hostname} should redirect`);
    assert.equal(response.headers.get("location"), `https://${target}/contact?source=test`);
  }
});

test("keeps local development on HTTP", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("local-http-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  for (const hostname of ["localhost", "terminal.local"]) {
    const response = await worker.fetch(
      new Request(`http://${hostname}/knowledge/stretch-marks`, { headers: { accept: "text/html" } }),
      { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
      { waitUntil() {}, passThroughOnException() {} },
    );

    assert.notEqual(response.status, 301);
    assert.match(await response.text(), /妊娠紋/);
  }
});

test("ships crawler and answer-engine support files", async () => {
  const [robots, sitemap, llms] = await Promise.all([
    readFile(new URL("../public/robots.txt", import.meta.url), "utf8"),
    readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8"),
    readFile(new URL("../public/llms.txt", import.meta.url), "utf8"),
  ]);

  assert.match(robots, /Sitemap: https:\/\/ycaura\.com\/sitemap\.xml/);
  assert.match(robots, /User-agent: GPTBot[\s\S]*Allow: \//);
  assert.match(robots, /User-agent: OAI-SearchBot[\s\S]*Allow: \//);
  assert.match(robots, /User-agent: OAI-SearchBot[\s\S]*Disallow: \/api\//);
  assert.match(sitemap, /<loc>https:\/\/ycaura\.com\/<\/loc>/);
  for (const slug of ["herbal-stretch-care", "skin-camouflage", "colour-matching", "beauty-education"]) {
    assert.match(sitemap, new RegExp(`<loc>https://ycaura\\.com/services/${slug}<\\/loc>`));
    assert.match(llms, new RegExp(`https://ycaura\\.com/services/${slug}`));
  }
  assert.match(sitemap, /xmlns:image="http:\/\/www\.google\.com\/schemas\/sitemap-image\/1\.1"/);
  for (const image of [
    "hero-skin-atelier.webp",
    "intro-skin-consultation.webp",
    "knowledge-skin-palette.webp",
  ]) {
    assert.match(sitemap, new RegExp(`<image:loc>https:\\/\\/ycaura\\.com\\/${image}<\\/image:loc>`));
  }
  assert.match(llms, /# 新北雙和店｜瑪菲斯皮膚覆蓋專家｜中和・南勢角站｜雙北預約/);
  assert.match(sitemap, /<loc>https:\/\/ycaura\.com\/knowledge\/stretch-marks<\/loc>/);
  assert.match(llms, /https:\/\/ycaura\.com\/knowledge\/stretch-marks/);
  assert.match(llms, /最後更新：2026-08-27/);
  assert.match(llms, /Email: millie0806@gmail\.com/);
  assert.match(llms, /地址: 新北市中和區景新街347號9樓之9/);
  assert.match(llms, /服務據點: 新北市中和區、捷運南勢角站附近/);
  assert.match(llms, /服務範圍: 雙和（中和、永和）與雙北（新北市、台北市）地區，亦接受北部地區預約客/);
  assert.match(llms, /營業時間: 11:00–19:00（預約制）/);
  assert.match(llms, /預約方式: 手機、LINE、Instagram 或雙和店 Facebook 私訊/);
  assert.match(llms, /- \[官方網站\]\(https:\/\/ycaura\.com\/\)/);
  assert.match(llms, /- \[LINE 預約\]\(https:\/\/line\.me\/ti\/p\/f_92dWjx8l\)/);
  assert.match(llms, /- \[雙和店 Facebook\]\(https:\/\/www\.facebook\.com\/people\/.+61592083747747\//);
  assert.match(llms, /- \[Instagram\]\(https:\/\/www\.instagram\.com\/millie_711102\)/);
  assert.match(llms, /- \[諮詢流程\]\(https:\/\/ycaura\.com\/#process\)/);
  assert.doesNotMatch(llms, /liff\.line\.me/i);
  assert.match(llms, /## 諮詢流程/);
  assert.match(llms, /肌膚美學資訊可以取代看醫生嗎？不可以/);
});
