import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const developmentPreviewMeta =
  /<meta[^>]*\bname=["']codex-preview["'][^>]*>/i;

test("renders SEO/AEO signals without development-only metadata", async () => {
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
  assert.equal("openingHoursSpecification" in organization, false);
  assert.deepEqual(organization.contactPoint.availableLanguage, ["zh-Hant-TW"]);
  assert.deepEqual(organization.contactPoint.hoursAvailable, {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "11:00",
    closes: "19:00",
  });
  assert.deepEqual(organization.alternateName, ["Mavis pure skin", "MAVIS PURE SKIN"]);
  assert.deepEqual(organization.brand, { "@type": "Brand", name: "Mavis pure skin" });
  assert.ok(organization.knowsAbout.includes("妊娠紋"));
  assert.deepEqual(organization.contactPoint.areaServed.map((area) => area.name), ["新北市", "中和區", "永和區", "台北市"]);
  assert.equal(organization.email, "millie0806@gmail.com");
  assert.deepEqual(organization.address, { "@type": "PostalAddress", streetAddress: "景新街347號9樓之9", addressLocality: "中和區", addressRegion: "新北市", addressCountry: "TW" });
  const services = graph.filter((entity) => entity["@type"] === "Service");
  assert.equal(services.length, 4);
  assert.ok(services.every((service) => service.provider["@id"] === "https://ycaura.com#organization"));
  assert.ok(services.every((service) => service.areaServed.some((area) => area.name === "中和區")));
  assert.ok(organization.hasOfferCatalog.itemListElement.every((offer) => offer.itemOffered["@id"].includes("#service-")));
  assert.doesNotMatch(html, developmentPreviewMeta);
  assert.match(html, /<link rel="canonical" href="https:\/\/ycaura\.com"\/>/i);
  assert.match(html, /<meta property="og:url" content="https:\/\/ycaura\.com"\/>/i);
  // 站內一律無尾斜線；帶斜線代表 siteCanonicalUrl 被改回舊形式。
  assert.doesNotMatch(html, /<link rel="canonical" href="https:\/\/ycaura\.com\/"/i);
  assert.doesNotMatch(html, /<meta property="og:url" content="https:\/\/ycaura\.com\/"/i);
  assert.match(html, /<meta name="robots" content="index, follow"\/>/i);
  assert.match(html, /<meta name="googlebot" content="[^"]*max-image-preview:large[^"]*"\/>/i);
  assert.match(html, /<meta name="googlebot" content="[^"]*max-snippet:-1[^"]*"\/>/i);
  assert.doesNotMatch(html, /maxImagePreview|maxSnippet|maxVideoPreview/);
  // 品牌英文拼法全站一致，MAPHIS 為曾出現過的錯字。
  assert.doesNotMatch(html, /MAPHIS/i);
  assert.match(html, /MAVIS PURE SKIN/);
  assert.match(html, /<a class="skip-link" href="#main-content">跳至主要內容<\/a>/);
  assert.match(html, /<meta name="twitter:card" content="summary_large_image"\/>/i);
  assert.match(html, /雙和店 \/ 新北中和・南勢角站/);
  assert.match(html, /新北雙和店｜瑪菲斯皮膚覆蓋專家/);
  assert.match(html, /新北雙和店｜瑪菲斯皮膚覆蓋專家｜中和・南勢角站｜雙北預約/);
  assert.match(html, /"@type":\["Organization","LocalBusiness"\]/i);
  assert.match(html, /millie0806@gmail\.com/i);
  assert.match(html, /景新街347號9樓之9（元大證券 6F 樓上）/);
  assert.match(html, /"@type":"ImageObject"/i);
  assert.match(html, /https:\/\/ycaura\.com\/logo\.png/i);
  assert.match(html, /property="og:image" content="https:\/\/ycaura\.com\/social-skin-atelier\.jpg"/i);
  assert.match(html, /"dateModified":"2026-09-04"/i);
  assert.match(html, /"alternateName":\["Mavis pure skin","MAVIS PURE SKIN"\]/i);
  assert.match(html, /"@type":"Brand"/i);
  assert.match(html, /新北市中和區/);
  assert.match(html, /捷運南勢角站/);
  assert.match(html, /鄰近捷運南勢角站，建議出發前透過地圖規劃路線/);
  assert.match(html, /maps\/search\/\?api=1&amp;query=%E6%96%B0%E5%8C%97%E5%B8%82%E4%B8%AD%E5%92%8C%E5%8D%80%E6%99%AF%E6%96%B0%E8%A1%97347%E8%99%9F/);
  assert.match(html, /私訊前可先整理 3 件事/);
  assert.match(html, /01 在意部位/);
  assert.match(html, /03 清楚照片/);
  assert.match(html, /若不便提供照片，直接以文字說明外觀困擾與想了解的方向亦可/);
  assert.doesNotMatch(html, /免收諮詢費用/);
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
  assert.match(html, /data-ga-event="contact_click"/i);
  assert.match(html, /data-ga-contact-method="line"/i);
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
  assert.match(html, /href="\/knowledge"/i);
  assert.match(html, /href="\/knowledge\/stretch-marks"/i);
  assert.match(html, /href="\/knowledge\/dark-circles"/i);
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
  assert.match(html, /<title>妊娠紋是什麼？產後變化與保養｜新北雙和店｜瑪菲斯皮膚覆蓋專家<\/title>/i);
  assert.match(html, /<meta name="description" content="了解妊娠紋形成原因、紅白紋差異、產後變化與保濕限制，也認識瑪菲斯雙和店的妊娠紋外觀修飾與諮詢方式。"\/>/i);
  assert.match(html, /<link rel="canonical" href="https:\/\/ycaura\.com\/knowledge\/stretch-marks"\/>/i);
  assert.match(html, /<meta property="og:type" content="article"\/>/i);
  assert.match(html, /<meta property="og:url" content="https:\/\/ycaura\.com\/knowledge\/stretch-marks"\/>/i);
  assert.match(html, /妊娠紋是皮膚在懷孕等快速伸展情況下形成的線狀紋路/);
  assert.match(html, /妊娠紋是懷孕或皮膚快速伸展後可能形成的線狀紋路，產後可能逐漸變淡，但不一定完全消失/);
  assert.match(html, /內容整理：[\s\S]*新北雙和店｜瑪菲斯皮膚覆蓋專家/);
  assert.match(html, /保濕可以協助舒緩乾燥與搔癢/);
  assert.match(html, /本站內容與外觀修飾諮詢都不能取代診斷或治療/);
  assert.match(html, /href="\/services\/herbal-stretch-care"/i);
  assert.match(html, /了解雙和店的草本撫紋服務/);
  assert.doesNotMatch(html, /了解雙和店草本撫紋服務/);
  assert.match(html, /data-ga-cta-location="knowledge_aside"/i);
  assert.match(html, /maps\/search\/\?api=1&amp;query=%E6%96%B0%E5%8C%97%E5%B8%82%E4%B8%AD%E5%92%8C%E5%8D%80%E6%99%AF%E6%96%B0%E8%A1%97347%E8%99%9F/);
  assert.match(html, /景新街347號9樓之9（元大證券 6F 樓上）/);
  assert.match(html, /鄰近捷運南勢角站，建議出發前透過地圖規劃路線/);
  assert.match(html, /私訊諮詢前可先準備：① 在意部位 ② 出現時間與狀態 ③ 自然光清楚近照/);
  assert.match(html, /facebook\.com\/people\/.+61592083747747\//i);
  assert.doesNotMatch(html, /facebook\.com\/mavispureskin1110111/i);

  const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  assert.ok(jsonLdMatch, "knowledge page JSON-LD block should be rendered");
  const graph = JSON.parse(jsonLdMatch[1])["@graph"];
  const org = graph.find((entity) => Array.isArray(entity["@type"]) ? entity["@type"].includes("Organization") : entity["@type"] === "Organization");
  assert.ok(org, "Organization should be in stretch-marks page graph");
  assert.deepEqual(org.alternateName, ["Mavis pure skin", "MAVIS PURE SKIN"]);
  assert.deepEqual(org.brand, { "@type": "Brand", name: "Mavis pure skin" });
  assert.deepEqual(org.contactPoint.hoursAvailable, {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "11:00",
    closes: "19:00",
  });
  assert.equal("openingHoursSpecification" in org, false);
  assert.ok(graph.some((entity) => entity["@type"] === "Article"));
  assert.ok(graph.some((entity) => entity["@type"] === "FAQPage"));
  assert.equal(graph.find((entity) => entity["@type"] === "FAQPage").mainEntity.length, 6);
  assert.equal(graph.find((entity) => entity["@type"] === "Article").datePublished, "2026-08-28");
  assert.equal(graph.find((entity) => entity["@type"] === "Article").dateModified, "2026-09-04");
  assert.match(html, /href="\/knowledge"/i);
  assert.match(html, /href="\/knowledge\/dark-circles"/i);
  assert.match(html, /data-ga-cta-location="knowledge_aside_related"/i);
  const breadcrumb = graph.find((entity) => entity["@type"] === "BreadcrumbList");
  assert.ok(breadcrumb, "BreadcrumbList should be present in stretch-marks");
  assert.equal(breadcrumb.itemListElement.length, 3);
  assert.equal(breadcrumb.itemListElement[1].name, "知識中心");
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
    assert.match(html, new RegExp(`<link rel="canonical" href="https://ycaura\\.com/services/${slug}"(?:/?>)`, "i"));
    assert.match(html, new RegExp(`<meta property="og:url" content="https://ycaura\\.com/services/${slug}"(?:/?>)`, "i"));
    assert.match(html, /"@type":"Service"/i);
    assert.match(html, /"@type":\["Organization","LocalBusiness"\]/i);
    const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
    assert.ok(jsonLdMatch, "service page JSON-LD block should be rendered");
    const graph = JSON.parse(jsonLdMatch[1])["@graph"];
    const org = graph.find((entity) => Array.isArray(entity["@type"]) ? entity["@type"].includes("Organization") : entity["@type"] === "Organization");
    assert.ok(org, "Organization should be in service page graph");
    assert.deepEqual(org.alternateName, ["Mavis pure skin", "MAVIS PURE SKIN"]);
    assert.deepEqual(org.brand, { "@type": "Brand", name: "Mavis pure skin" });
    assert.deepEqual(org.contactPoint.hoursAvailable, {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "11:00",
      closes: "19:00",
    });
    assert.equal("openingHoursSpecification" in org, false);
    assert.match(html, /millie0806@gmail\.com/i);
    assert.match(html, /景新街347號9樓之9（元大證券 6F 樓上）/);
    assert.match(html, /捷運南勢角站/);
    assert.match(html, /鄰近捷運南勢角站，建議出發前透過地圖規劃路線/);
    assert.match(html, /maps\/search\/\?api=1&amp;query=%E6%96%B0%E5%8C%97%E5%B8%82%E4%B8%AD%E5%92%8C%E5%8D%80%E6%99%AF%E6%96%B0%E8%A1%97347%E8%99%9F/);
    assert.match(html, /私訊前可先整理 3 件事/);
    assert.match(html, /雙和（中和、永和）與雙北（新北市、台北市）地區，亦接受北部地區預約/);
    assert.match(html, /11:00–19:00（預約制）/);
    assert.match(html, /預約.*手機、LINE、Instagram 或 Facebook 私訊/);
    assert.match(html, /"@type":"BreadcrumbList"/i);
    assert.match(html, /"@type":"FAQPage"/i);
    assert.match(html, /<details>/i);
    assert.match(html, /本站提供一般肌膚美學與外觀照護資訊，不取代醫療診斷或治療建議。/);
    assert.match(html, /href="\/services\//i);
    assert.match(html, /href="\/knowledge"/i);
    if (slug === "herbal-stretch-care") {
      assert.match(html, /<h1>草本撫紋｜妊娠紋外觀修飾<\/h1>/i);
      assert.match(html, /<title>草本撫紋｜妊娠紋外觀修飾｜新北雙和店｜瑪菲斯皮膚覆蓋專家<\/title>/i);
      assert.match(html, /內容整理：[\s\S]*新北雙和店｜瑪菲斯皮膚覆蓋專家/);
      assert.match(html, /最後更新：[\s\S]*2026-09-04/);
      assert.match(html, /了解瑪菲斯雙和店的草本撫紋服務，從妊娠紋、肥胖紋與成長紋的顏色、紋理、部位與形成時間開始評估/);
      assert.doesNotMatch(html, /<h1>雙和店草本撫紋<\/h1>/i);
    }
    if (slug === "skin-camouflage") {
      assert.match(html, /位於新北中和、南勢角站附近的雙和店皮膚覆蓋術/);
    }
    if (slug === "colour-matching") {
      assert.match(html, /位於新北中和、南勢角站附近的雙和店科技測色/);
      assert.doesNotMatch(html, /精準/);
    }
  }
});

test("renders the dark circles child knowledge page", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("dark-circles-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("https://localhost/knowledge/dark-circles", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.equal(response.headers.get("cache-control"), "public, max-age=300, stale-while-revalidate=86400");
  const html = await response.text();
  assert.match(html, /<h1>黑眼圈怎麼看？[\s\S]*先分辨色澤與陰影。[\s\S]*<\/h1>/i);
  assert.match(html, /<title>黑眼圈怎麼看？成因與外觀評估｜新北雙和店｜瑪菲斯皮膚覆蓋專家<\/title>/i);
  assert.match(html, /<meta name="description" content="整理黑眼圈常見的色澤、陰影與眼周狀態差異，了解新北雙和與台北肌膚美學諮詢前可以先觀察什麼。"\/>/i);
  assert.match(html, /<link rel="canonical" href="https:\/\/ycaura\.com\/knowledge\/dark-circles"\/>/i);
  assert.match(html, /<meta property="og:type" content="article"\/>/i);
  assert.match(html, /<meta property="og:url" content="https:\/\/ycaura\.com\/knowledge\/dark-circles"\/>/i);
  assert.match(html, /黑眼圈不一定只有一種成因/);
  assert.match(html, /皮膚覆蓋術/);
  assert.match(html, /新北市中和區/);
  assert.match(html, /捷運南勢角站/);
  assert.match(html, /鄰近捷運南勢角站，建議出發前透過地圖規劃路線/);
  assert.match(html, /maps\/search\/\?api=1&amp;query=%E6%96%B0%E5%8C%97%E5%B8%82%E4%B8%AD%E5%92%8C%E5%8D%80%E6%99%AF%E6%96%B0%E8%A1%97347%E8%99%9F/);
  assert.match(html, /景新街347號9樓之9（元大證券 6F 樓上）/);
  assert.match(html, /私訊諮詢前可先準備：① 在意部位 ② 出現時間與狀態 ③ 自然光清楚近照/);
  assert.match(html, /11:00–19:00（預約制）/);
  assert.match(html, /"@type":"Article"/i);
  assert.match(html, /"@type":"FAQPage"/i);
  assert.match(html, /"@type":"BreadcrumbList"/i);
  const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  assert.ok(jsonLdMatch, "knowledge page JSON-LD block should be rendered");
  const graph = JSON.parse(jsonLdMatch[1])["@graph"];
  const org = graph.find((entity) => Array.isArray(entity["@type"]) ? entity["@type"].includes("Organization") : entity["@type"] === "Organization");
  assert.ok(org, "Organization should be in dark-circles page graph");
  assert.deepEqual(org.alternateName, ["Mavis pure skin", "MAVIS PURE SKIN"]);
  assert.deepEqual(org.brand, { "@type": "Brand", name: "Mavis pure skin" });
  assert.deepEqual(org.contactPoint.hoursAvailable, {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "11:00",
    closes: "19:00",
  });
  assert.equal(graph.find((entity) => entity["@type"] === "Article").datePublished, "2026-08-30");
  assert.equal(graph.find((entity) => entity["@type"] === "Article").dateModified, "2026-09-04");
  assert.equal("openingHoursSpecification" in org, false);
  assert.match(html, /https:\/\/pubmed\.ncbi\.nlm\.nih\.gov\/27398005\//i);
  assert.match(html, /https:\/\/pubmed\.ncbi\.nlm\.nih\.gov\/34078228\//i);
  assert.match(html, /https:\/\/acaai\.org\/allergies\/allergic-conditions\/eye-allergy\//i);
  assert.match(html, /https:\/\/www\.mayoclinic\.org\/symptoms\/dark-circles-under-eyes\/basics\/causes\/sym-20050624/i);
  assert.match(html, /href="\/services\/beauty-education"/i);
  assert.match(html, /href="\/knowledge"/i);
  assert.match(html, /href="\/knowledge\/stretch-marks"/i);
  assert.match(html, /data-ga-cta-location="knowledge_aside_related"/i);
  assert.match(html, /data-ga-cta-location="knowledge_aside"/i);
  const breadcrumb = graph.find((entity) => entity["@type"] === "BreadcrumbList");
  assert.ok(breadcrumb, "BreadcrumbList should be present in dark-circles");
  assert.equal(breadcrumb.itemListElement.length, 3);
  assert.equal(breadcrumb.itemListElement[1].name, "知識中心");
});

test("renders the striae comparison child knowledge page", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("striae-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("https://localhost/knowledge/striae-comparison", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.equal(response.headers.get("cache-control"), "public, max-age=300, stale-while-revalidate=86400");
  const html = await response.text();
  assert.match(html, /<h1>肥胖紋、成長紋與妊娠紋，[\s\S]*究竟有何不同？[\s\S]*<\/h1>/i);
  assert.match(html, /<title>肥胖紋、成長紋與妊娠紋怎麼分？成因差異與外觀評估｜新北雙和店｜瑪菲斯皮膚覆蓋專家<\/title>/i);
  assert.match(html, /<meta name="description" content="整理妊娠紋、肥胖紋與生長紋（萎縮紋）成因、好發部位、紅紋與白紋演變差異，並了解非醫療外觀修飾與雙和店諮詢評估方向。"\/>/i);
  assert.match(html, /<link rel="canonical" href="https:\/\/ycaura\.com\/knowledge\/striae-comparison"\/>/i);
  assert.match(html, /<meta property="og:type" content="article"\/>/i);
  assert.match(html, /<meta property="og:url" content="https:\/\/ycaura\.com\/knowledge\/striae-comparison"\/>/i);
  assert.match(html, /同屬於「皮膚擴張紋（Striae Distensae）」/);
  assert.match(html, /皮膚覆蓋術/);
  assert.match(html, /新北市中和區/);
  assert.match(html, /捷運南勢角站/);
  assert.match(html, /鄰近捷運南勢角站，建議出發前透過地圖規劃路線/);
  assert.match(html, /maps\/search\/\?api=1&amp;query=%E6%96%B0%E5%8C%97%E5%B8%82%E4%B8%AD%E5%92%8C%E5%8D%80%E6%99%AF%E6%96%B0%E8%A1%97347%E8%99%9F/);
  assert.match(html, /景新街347號9樓之9（元大證券 6F 樓上）/);
  assert.match(html, /私訊諮詢前可先準備：① 在意部位 ② 出現時間與狀態 ③ 自然光清楚近照/);
  assert.match(html, /11:00–19:00（預約制）/);
  assert.match(html, /"@type":"Article"/i);
  assert.match(html, /"@type":"FAQPage"/i);
  assert.match(html, /"@type":"BreadcrumbList"/i);
  const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  assert.ok(jsonLdMatch, "knowledge page JSON-LD block should be rendered");
  const graph = JSON.parse(jsonLdMatch[1])["@graph"];
  const org = graph.find((entity) => Array.isArray(entity["@type"]) ? entity["@type"].includes("Organization") : entity["@type"] === "Organization");
  assert.ok(org, "Organization should be in striae-comparison page graph");
  assert.deepEqual(org.alternateName, ["Mavis pure skin", "MAVIS PURE SKIN"]);
  assert.deepEqual(org.brand, { "@type": "Brand", name: "Mavis pure skin" });
  assert.deepEqual(org.contactPoint.hoursAvailable, {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "11:00",
    closes: "19:00",
  });
  assert.equal("openingHoursSpecification" in org, false);
  assert.match(html, /https:\/\/www\.aad\.org\/public\/cosmetic\/scars-stretch-marks\/stretch-marks-why-appear/i);
  assert.match(html, /https:\/\/www\.mayoclinic\.org\/diseases-conditions\/stretch-marks\/symptoms-causes\/syc-20351144/i);
  assert.match(html, /https:\/\/www\.nhs\.uk\/pregnancy\/common-symptoms\/stretch-marks\//i);
  assert.match(html, /https:\/\/www\.fda\.gov\.tw\/tc\/newsContent\.aspx\?id=28618/i);
  assert.match(html, /href="\/services\/skin-camouflage"/i);
  assert.match(html, /href="\/knowledge"/i);
  assert.match(html, /href="\/knowledge\/stretch-marks"/i);
  assert.match(html, /href="\/knowledge\/dark-circles"/i);
  assert.match(html, /data-ga-cta-location="knowledge_aside_related"/i);
  assert.match(html, /data-ga-cta-location="knowledge_aside"/i);
  const breadcrumb = graph.find((entity) => entity["@type"] === "BreadcrumbList");
  assert.ok(breadcrumb, "BreadcrumbList should be present in striae-comparison");
  assert.equal(breadcrumb.itemListElement.length, 3);
  assert.equal(breadcrumb.itemListElement[1].name, "知識中心");
  assert.equal(breadcrumb.itemListElement[2].name, "肥胖紋與成長紋");
});

test("renders the knowledge hub index page", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("knowledge-hub-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("https://localhost/knowledge", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.equal(response.headers.get("cache-control"), "public, max-age=300, stale-while-revalidate=86400");
  const html = await response.text();
  assert.match(html, /<title>肌膚知識中心｜妊娠紋、黑眼圈與局部美學科普｜新北雙和店｜瑪菲斯皮膚覆蓋專家<\/title>/i);
  assert.match(html, /<link rel="canonical" href="https:\/\/ycaura\.com\/knowledge"\/>/i);
  assert.match(html, /<h1>先看懂肌膚，[\s\S]*再做選擇。[\s\S]*<\/h1>/i);
  assert.match(html, /href="\/knowledge\/stretch-marks"/i);
  assert.match(html, /href="\/knowledge\/dark-circles"/i);
  assert.match(html, /href="\/knowledge\/striae-comparison"/i);
  assert.match(html, /本站提供一般肌膚美學與外觀照護科普資訊，不取代合格醫療專業人員之診斷或治療建議/);
  assert.match(html, /maps\/search\/\?api=1&amp;query=%E6%96%B0%E5%8C%97%E5%B8%82%E4%B8%AD%E5%92%8C%E5%8D%80%E6%99%AF%E6%96%B0%E8%A1%97347%E8%99%9F/);
  assert.match(html, /景新街347號9樓之9（元大證券 6F 樓上）/);
  assert.match(html, /鄰近捷運南勢角站，建議出發前透過地圖規劃路線/);
  assert.match(html, /私訊前可先整理 3 件事/);

  const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  assert.ok(jsonLdMatch, "knowledge hub JSON-LD block should be rendered");
  const graph = JSON.parse(jsonLdMatch[1])["@graph"];
  const org = graph.find((entity) => Array.isArray(entity["@type"]) ? entity["@type"].includes("Organization") : entity["@type"] === "Organization");
  assert.ok(org, "Organization should be in knowledge hub graph");
  assert.deepEqual(org.alternateName, ["Mavis pure skin", "MAVIS PURE SKIN"]);
  assert.ok(graph.some((entity) => Array.isArray(entity["@type"]) ? entity["@type"].includes("CollectionPage") : entity["@type"] === "CollectionPage"));
  const itemList = graph.find((entity) => entity["@type"] === "ItemList");
  assert.ok(itemList, "ItemList should be present in knowledge hub");
  assert.equal(itemList.itemListElement.length, 3);
  const breadcrumb = graph.find((entity) => entity["@type"] === "BreadcrumbList");
  assert.ok(breadcrumb, "BreadcrumbList should be present in knowledge hub");
  assert.equal(breadcrumb.itemListElement.length, 2);
  assert.equal(breadcrumb.itemListElement[1].name, "知識中心");
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
  assert.match(robots, /User-agent: Applebot-Extended[\s\S]*Allow: \//);
  assert.match(robots, /User-agent: meta-externalagent[\s\S]*Allow: \//);
  assert.match(robots, /User-agent: Amazonbot[\s\S]*Allow: \//);
  assert.match(robots, /User-agent: cohere-ai[\s\S]*Allow: \//);
  assert.match(robots, /User-agent: Bingbot[\s\S]*Allow: \//);
  assert.match(sitemap, /<loc>https:\/\/ycaura\.com<\/loc>/);
  assert.doesNotMatch(sitemap, /<loc>https:\/\/ycaura\.com\/<\/loc>/);
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
  assert.match(sitemap, /<loc>https:\/\/ycaura\.com\/knowledge<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/ycaura\.com\/knowledge\/stretch-marks<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/ycaura\.com\/knowledge\/dark-circles<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/ycaura\.com\/knowledge\/striae-comparison<\/loc>/);
  assert.match(llms, /https:\/\/ycaura\.com\/knowledge/);
  assert.match(llms, /https:\/\/ycaura\.com\/knowledge\/dark-circles/);
  assert.match(llms, /https:\/\/ycaura\.com\/knowledge\/striae-comparison/);
  // 每個 <loc> 都必須有 <lastmod>，避免新增頁面時漏填。
  assert.equal(
    (sitemap.match(/<loc>https:\/\/ycaura\.com[^<]*<\/loc>/g) ?? []).length,
    (sitemap.match(/<lastmod>/g) ?? []).length,
  );
  assert.match(llms, /https:\/\/ycaura\.com\/knowledge\/stretch-marks/);
  const llmsFull = await readFile(new URL("../public/llms-full.txt", import.meta.url), "utf8");
  assert.match(llmsFull, /# 新北雙和店｜瑪菲斯皮膚覆蓋專家｜完整知識與服務指南/);
  assert.match(llmsFull, /https:\/\/ycaura\.com\/knowledge/);
  assert.match(llmsFull, /肥胖紋與生長紋/);
  assert.match(llmsFull, /0981-756-111/);
  assert.match(llms, /最後更新：2026-09-04/);
  assert.match(llms, /Email: millie0806@gmail\.com/);
  assert.match(llms, /地址: 新北市中和區景新街347號9樓之9/);
  assert.match(llms, /服務據點: 新北市中和區、捷運南勢角站附近/);
  assert.match(llms, /服務範圍: 雙和（中和、永和）與雙北（新北市、台北市）地區，亦接受北部地區預約客/);
  assert.match(llms, /營業時間: 11:00–19:00（預約制）/);
  assert.match(llms, /預約方式: 手機、LINE、Instagram 或雙和店 Facebook 私訊/);
  assert.match(llms, /- \[官方網站\]\(https:\/\/ycaura\.com\)/);
  assert.match(llms, /- \[LINE 預約\]\(https:\/\/line\.me\/ti\/p\/f_92dWjx8l\)/);
  assert.match(llms, /- \[雙和店 Facebook\]\(https:\/\/www\.facebook\.com\/people\/.+61592083747747\//);
  assert.match(llms, /- \[Instagram\]\(https:\/\/www\.instagram\.com\/millie_711102\)/);
  assert.match(llms, /- \[諮詢流程\]\(https:\/\/ycaura\.com#process\)/);
  assert.doesNotMatch(llms, /https:\/\/ycaura\.com\/[#)]/);
  assert.doesNotMatch(llms, /liff\.line\.me/i);
  assert.match(llms, /## 諮詢流程/);
  assert.match(llms, /肌膚美學資訊可以取代看醫生嗎？不可以/);
});
