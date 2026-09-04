#!/usr/bin/env node

/**
 * submit-indexnow.mjs
 *
 * Submits all public URLs discovered in public/sitemap.xml to the IndexNow API
 * (supported by Bing, Yandex, Naver, Seznam, etc.) for rapid crawler notification.
 *
 * Usage:
 *   node scripts/submit-indexnow.mjs [--dry-run]
 */

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");
const sitemapPath = resolve(rootDir, "public/sitemap.xml");

const HOST = "ycaura.com";
const KEY = "e9bc2e27a67fe6a725cf2b64a15917a0";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const MAX_URLS_PER_BATCH = 10000;

export function decodeXmlEntities(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

export function extractSitemapUrls(xmlContent) {
  const urls = [];
  const locRegex = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = locRegex.exec(xmlContent)) !== null) {
    const raw = decodeXmlEntities(match[1].trim());
    try {
      const parsed = new URL(raw);
      if (
        parsed.protocol === "https:" &&
        parsed.hostname === HOST &&
        (!parsed.port || parsed.port === "443") &&
        !parsed.username &&
        !parsed.password
      ) {
        const normalized =
          parsed.pathname === "/" && !raw.endsWith("/")
            ? `https://${parsed.host}`
            : parsed.toString();
        if (!urls.includes(normalized)) {
          urls.push(normalized);
        }
      }
    } catch {
      // ignore invalid URLs
    }
  }
  return urls;
}

export function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

async function main() {
  const isDryRun = process.argv.includes("--dry-run");

  let sitemapContent;
  try {
    sitemapContent = readFileSync(sitemapPath, "utf-8");
  } catch (err) {
    console.error(`[IndexNow] Error reading sitemap at ${sitemapPath}:`, err.message);
    process.exit(1);
  }

  const urls = extractSitemapUrls(sitemapContent);
  if (urls.length === 0) {
    console.warn("[IndexNow] Warning: No valid URLs found in sitemap matching host:", HOST);
    process.exit(0);
  }

  const batches = chunkArray(urls, MAX_URLS_PER_BATCH);

  console.log(`[IndexNow] Discovered ${urls.length} canonical URLs for ${HOST} (Split into ${batches.length} batch(es)):`);
  for (const url of urls) {
    console.log(`  - ${url}`);
  }

  if (isDryRun) {
    console.log("[IndexNow] DRY-RUN mode active: Skipping HTTP request.");
    console.log("[IndexNow] Payload preview (batch 1):", JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: batches[0],
    }, null, 2));
    process.exit(0);
  }

  let hasError = false;

  for (let i = 0; i < batches.length; i++) {
    const batchUrls = batches[i];
    const payload = {
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: batchUrls,
    };

    console.log(`[IndexNow] Submitting batch ${i + 1}/${batches.length} (${batchUrls.length} URLs) to ${INDEXNOW_ENDPOINT}...`);

    try {
      const response = await fetch(INDEXNOW_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok || response.status === 202) {
        console.log(`[IndexNow] Successfully submitted batch ${i + 1}! (HTTP ${response.status})`);
      } else {
        const errorText = await response.text().catch(() => "");
        console.warn(`[IndexNow] Warning: API returned HTTP ${response.status} for batch ${i + 1}: ${errorText}`);
        hasError = true;
      }
    } catch (err) {
      console.warn(`[IndexNow] Warning: Network request failed for batch ${i + 1}:`, err.message);
      hasError = true;
    }
  }

  if (hasError && process.env.INDEXNOW_STRICT === "true") {
    process.exit(1);
  }

  process.exit(0);
}

// Only execute when run as main script
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main();
}
