#!/usr/bin/env node

import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const DEFAULT_BASE_URL = "https://ycaura.com";
const PROJECT_ROOT = resolve(new URL("..", import.meta.url).pathname);

function normalizeUrl(value) {
  const url = new URL(value);
  if (url.pathname === "/") url.pathname = "";
  return url.toString().replace(/\/$/, "");
}

export function parseSitemap(xml, baseUrl) {
  validateSitemapXml(xml);
  const base = new URL(baseUrl);
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => normalizeUrl(match[1].trim()));
  if (urls.length === 0) throw new Error("sitemap does not contain any loc entries");
  const invalid = urls.filter((url) => new URL(url).origin !== base.origin);
  if (invalid.length > 0) throw new Error(`sitemap contains URLs outside ${base.origin}: ${invalid.join(", ")}`);
  return [...new Set(urls)];
}

export function discoverPublicRoutes() {
  const routes = new Set();
  const appRoot = resolve(PROJECT_ROOT, "app");
  function walk(directory, segments = []) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      if (entry.name.startsWith("[") || entry.name.startsWith(".")) continue;
      const entryPath = resolve(directory, entry.name);
      if (entry.isDirectory()) walk(entryPath, [...segments, entry.name]);
      else if (entry.name === "page.tsx") routes.add(`/${segments.join("/")}`.replace(/\/$/, "") || "/");
    }
  }
  walk(appRoot);
  const servicesSource = readFileSync(resolve(appRoot, "services.ts"), "utf8");
  for (const match of servicesSource.matchAll(/\bslug:\s*["']([^"']+)["']/g)) routes.add(`/services/${match[1]}`);
  return [...routes].sort();
}

export function findMissingRoutes(sitemapUrls, expectedRoutes, canonicalOrigin = DEFAULT_BASE_URL) {
  const sitemapPaths = new Set(sitemapUrls.map((url) => new URL(url).pathname || "/"));
  return expectedRoutes.filter((route) => !sitemapPaths.has(route)).map((route) => `${normalizeUrl(canonicalOrigin)}${route}`);
}

export function validateSitemapXml(xml) {
  const tokens = xml.match(/<!--[\s\S]*?-->|<\?[\s\S]*?\?>|<[^>]+>|[^<]+/g) ?? [];
  const allowedChildren = {
    urlset: new Set(["url"]),
    url: new Set(["loc", "lastmod", "image:image"]),
    "image:image": new Set(["image:loc"]),
    loc: new Set(),
    lastmod: new Set(),
    "image:loc": new Set(),
  };
  const stack = [];
  let rootName = null;
  let rootClosed = false;
  let seenUrl = false;
  let locCount = 0;
  const urlLocCounts = [];
  for (const token of tokens) {
    if (token.startsWith("<!--") || token.startsWith("<?")) continue;
    if (!token.startsWith("<")) {
      if (stack.length === 0 && token.trim()) throw new Error("sitemap contains text outside the root element");
      if (stack.at(-1) === "loc" && token.includes("<")) throw new Error("sitemap contains invalid loc text");
      continue;
    }
    if (/^<!DOCTYPE/i.test(token) || /^<!\[CDATA\[/i.test(token)) throw new Error("sitemap contains unsupported markup");
    const closing = token.match(/^<\/([A-Za-z_:][\w:.-]*)\s*>$/);
    if (closing) {
      if (stack.pop() !== closing[1]) throw new Error(`sitemap has mismatched closing tag: ${closing[1]}`);
      if (closing[1] === "url") {
        const directLocCount = urlLocCounts.pop();
        if (directLocCount !== 1) throw new Error("every sitemap url must contain exactly one loc");
      }
      if (stack.length === 0) rootClosed = true;
      continue;
    }
    const opening = token.match(/^<([A-Za-z_:][\w:.-]*)(?:\s[^>]*)?>$/);
    const selfClosing = token.match(/^<([A-Za-z_:][\w:.-]*)(?:\s[^>]*)?\/>$/);
    const tagName = selfClosing?.[1] ?? opening?.[1];
    if (!tagName) throw new Error("sitemap contains invalid XML markup");
    if (!rootName) rootName = tagName;
    else if (stack.length === 0 || rootClosed) throw new Error("sitemap contains multiple root elements");
    if (!allowedChildren[tagName]) throw new Error(`sitemap contains unsupported tag: ${tagName}`);
    if (stack.length > 0 && !allowedChildren[stack.at(-1)].has(tagName)) {
      throw new Error(`sitemap has invalid child ${tagName} under ${stack.at(-1)}`);
    }
    if (tagName === "url") {
      seenUrl = true;
      urlLocCounts.push(0);
    }
    if (tagName === "loc") locCount += 1;
    if (tagName === "loc" && stack.at(-1) === "url") urlLocCounts[urlLocCounts.length - 1] += 1;
    if (!selfClosing) stack.push(tagName);
    else {
      if (tagName === "url") {
        urlLocCounts.pop();
        throw new Error("every sitemap url must contain exactly one loc");
      }
      if (stack.length === 0) rootClosed = true;
    }
  }
  if (rootName !== "urlset") throw new Error("sitemap does not contain a urlset root");
  if (stack.length > 0) throw new Error(`sitemap has unclosed tag: ${stack.at(-1)}`);
  if (!rootClosed) throw new Error("sitemap root is not closed");
  if (!seenUrl || locCount === 0) throw new Error("sitemap does not contain url/loc entries");
  return true;
}

export function extractCanonical(html) {
  const match = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)
    ?? html.match(/<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i);
  return match?.[1] ? normalizeUrl(match[1]) : null;
}

function getAttribute(tag, attribute) {
  return tag.match(new RegExp(`${attribute}=["']([^"']*)["']`, "i"))?.[1] ?? null;
}

export function extractMetaContent(html, attribute, value) {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  return tags.find((tag) => getAttribute(tag, attribute)?.toLowerCase() === value.toLowerCase())
    ? getAttribute(tags.find((tag) => getAttribute(tag, attribute)?.toLowerCase() === value.toLowerCase()), "content")
    : null;
}

export function extractTitle(html) {
  return html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() ?? null;
}

export function parseJsonLd(html) {
  const blocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const parsed = [];
  const errors = [];
  for (const block of blocks) {
    try {
      parsed.push(JSON.parse(block[1]));
    } catch {
      errors.push("invalid JSON-LD block");
    }
  }
  return { parsed, errors };
}

export function validateJsonLdSemantics(parsed, expectedUrl) {
  const issues = [];
  const nodes = parsed.flatMap((value) => Array.isArray(value?.["@graph"]) ? value["@graph"] : [value]);
  const hasType = (type) => nodes.some((node) => (Array.isArray(node?.["@type"]) ? node["@type"] : [node?.["@type"]]).includes(type));
  if (!parsed.some((value) => value?.["@context"] === "https://schema.org")) issues.push("JSON-LD is missing schema.org @context");
  if (!hasType("Organization") && !hasType("LocalBusiness")) issues.push("JSON-LD is missing Organization/LocalBusiness");
  const webPage = nodes.find((node) => (Array.isArray(node?.["@type"]) ? node["@type"] : [node?.["@type"]]).includes("WebPage"));
  if (!webPage) issues.push("JSON-LD is missing WebPage");
  else if (!webPage.url || normalizeUrl(webPage.url) !== normalizeUrl(expectedUrl)) issues.push("JSON-LD WebPage URL mismatch");
  if (expectedUrl.includes("/services/") && !hasType("Service")) issues.push("JSON-LD is missing Service");
  if (/\/knowledge\/.+/.test(new URL(expectedUrl).pathname) && !hasType("Article")) issues.push("JSON-LD is missing Article");
  return issues;
}

export function validateHtml({ html, expectedUrl }) {
  const issues = [];
  if (!extractTitle(html)) issues.push("missing title");
  if (!extractMetaContent(html, "name", "description")) issues.push("missing meta description");
  if (!extractMetaContent(html, "property", "og:title")) issues.push("missing Open Graph title");
  if (!extractMetaContent(html, "property", "og:description")) issues.push("missing Open Graph description");
  const ogUrl = extractMetaContent(html, "property", "og:url");
  if (!ogUrl) issues.push("missing Open Graph URL");
  else if (normalizeUrl(ogUrl) !== normalizeUrl(expectedUrl)) issues.push(`Open Graph URL mismatch: ${ogUrl}`);
  if (!/<h1\b[^>]*>[\s\S]+?<\/h1>/i.test(html)) issues.push("missing h1");
  if (/<meta\s+[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) issues.push("page is noindex");
  const canonical = extractCanonical(html);
  if (!canonical) issues.push("missing canonical");
  else if (normalizeUrl(canonical) !== normalizeUrl(expectedUrl)) issues.push(`canonical mismatch: ${canonical}`);
  const jsonLd = parseJsonLd(html);
  issues.push(...jsonLd.errors);
  if (jsonLd.parsed.length === 0) issues.push("missing JSON-LD");
  else issues.push(...validateJsonLdSemantics(jsonLd.parsed, expectedUrl));
  return issues;
}

async function fetchText(url, options = {}) {
  const maxAttempts = Number(process.env.SEO_AEO_MAX_ATTEMPTS ?? 3);
  const retryDelayMs = Number(process.env.SEO_AEO_RETRY_DELAY_MS ?? 250);
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { accept: "text/html,application/xml,text/plain;q=0.9,*/*;q=0.8", ...options.headers },
        signal: AbortSignal.timeout(Number(process.env.SEO_AEO_TIMEOUT_MS ?? 15000)),
      });
      const text = await response.text();
      if (attempt === maxAttempts || (![429, 500, 502, 503, 504].includes(response.status))) return { response, text };
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
      if (attempt === maxAttempts) throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, retryDelayMs * attempt));
  }
  throw lastError;
}

function internalSitemapPaths(text, canonicalOrigin) {
  const paths = new Set();
  for (const rawUrl of text.match(/https:\/\/ycaura\.com[^\s\])>"']*/g) ?? []) {
    try {
      const url = new URL(rawUrl.replace(/[.,:]+$/, ""));
      if (url.origin === new URL(canonicalOrigin).origin) paths.add(url.pathname || "/");
    } catch {
      // Ignore non-URL text fragments.
    }
  }
  return paths;
}

export async function runChecks(baseUrl = DEFAULT_BASE_URL, canonicalOrigin = process.env.SEO_AEO_CANONICAL_ORIGIN ?? baseUrl, { checkRouteManifest = true } = {}) {
  const base = normalizeUrl(baseUrl);
  const canonical = normalizeUrl(canonicalOrigin);
  const issues = [];
  const warnings = [];
  const sitemapUrl = `${canonical}/sitemap.xml`;
  const fetchSitemapUrl = `${base}/sitemap.xml`;
  const robotsUrl = `${base}/robots.txt`;
  const llmsUrls = [`${base}/llms.txt`, `${base}/llms-full.txt`];
  const sitemapResult = await fetchText(fetchSitemapUrl);
  if (!sitemapResult.response.ok) issues.push(`sitemap returned HTTP ${sitemapResult.response.status}`);
  let urls = [];
  try {
    urls = parseSitemap(sitemapResult.text, canonical);
  } catch (error) {
    issues.push(error.message);
  }
  if (checkRouteManifest) {
    for (const missingRoute of findMissingRoutes(urls, discoverPublicRoutes(), canonical)) {
      issues.push(`sitemap is missing public route: ${missingRoute}`);
    }
  }

  const robotsResult = await fetchText(robotsUrl);
  if (!robotsResult.response.ok) issues.push(`robots.txt returned HTTP ${robotsResult.response.status}`);
  if (!new RegExp(`Sitemap:\\s*${sitemapUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "i").test(robotsResult.text)) {
    issues.push("robots.txt does not reference sitemap.xml");
  }
  const hasExactSitemapDirective = robotsResult.text.split(/\r?\n/).some((line) => {
    const match = line.match(/^\s*Sitemap:\s*(\S+)\s*$/i);
    return match?.[1] === sitemapUrl;
  });
  if (!hasExactSitemapDirective && !issues.includes("robots.txt does not reference sitemap.xml")) {
    issues.push("robots.txt does not reference sitemap.xml");
  }

  for (const llmsUrl of llmsUrls) {
    const result = await fetchText(llmsUrl);
    if (!result.response.ok) {
      issues.push(`${llmsUrl} returned HTTP ${result.response.status}`);
      continue;
    }
    if (!result.text.includes("ycaura.com")) issues.push(`${llmsUrl} does not mention the canonical site`);
    for (const signal of ["LINE", "預約"]) {
      if (!result.text.includes(signal)) issues.push(`${llmsUrl} is missing required contact signal: ${signal}`);
    }
    const normalizedPhone = result.text.replace(/\D/g, "");
    if (!normalizedPhone.includes("0981756111") && !normalizedPhone.includes("886981756111")) {
      issues.push(`${llmsUrl} is missing required contact signal: phone`);
    }
    const internalPaths = internalSitemapPaths(result.text, canonical);
    const sitemapPaths = new Set(urls.map((url) => new URL(url).pathname || "/"));
    for (const path of internalPaths) {
      if (!sitemapPaths.has(path)) issues.push(`${llmsUrl} references a URL not present in sitemap: ${path}`);
    }
    if (llmsUrl.endsWith("/llms.txt")) {
      for (const path of sitemapPaths) {
        if (!internalPaths.has(path)) issues.push(`${llmsUrl} is missing sitemap route: ${path}`);
      }
    }
  }

  const pageResults = [];
  for (const url of urls) {
    const pageUrl = new URL(url);
    const fetchPageUrl = new URL(`${pageUrl.pathname}${pageUrl.search}${pageUrl.hash}`, base);
    const result = await fetchText(fetchPageUrl.toString());
    const pageIssues = result.response.ok ? validateHtml({ html: result.text, expectedUrl: url }) : [`page returned HTTP ${result.response.status}`];
    pageResults.push({ url, status: result.response.status, title: result.response.ok ? extractTitle(result.text) : null, description: result.response.ok ? extractMetaContent(result.text, "name", "description") : null, issues: pageIssues });
    issues.push(...pageIssues.map((issue) => `${url}: ${issue}`));
  }

  for (const field of ["title", "description"]) {
    const values = new Map();
    for (const page of pageResults) {
      if (!page[field]) continue;
      const urlsForValue = values.get(page[field]) ?? [];
      urlsForValue.push(page.url);
      values.set(page[field], urlsForValue);
    }
    for (const [value, urlsForValue] of values) {
      if (urlsForValue.length > 1) issues.push(`duplicate ${field} across pages (${value}): ${urlsForValue.join(", ")}`);
    }
  }

  return { ok: issues.length === 0, baseUrl: base, canonicalOrigin: canonical, sitemapUrl, checkedUrls: urls, issues, warnings, pages: pageResults };
}

if (process.argv[1] && new URL(import.meta.url).pathname === process.argv[1]) {
  const baseUrl = process.env.SEO_AEO_BASE_URL ?? process.argv[2] ?? DEFAULT_BASE_URL;
  const outputPath = process.env.SEO_AEO_REPORT_PATH;
  try {
    const report = await runChecks(baseUrl, process.env.SEO_AEO_CANONICAL_ORIGIN ?? baseUrl);
    if (outputPath) {
      const { writeFileSync } = await import("node:fs");
      writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
    }
    console.log(JSON.stringify(report, null, 2));
    if (!report.ok) process.exitCode = 1;
  } catch (error) {
    const report = { ok: false, baseUrl: normalizeUrl(baseUrl), canonicalOrigin: process.env.SEO_AEO_CANONICAL_ORIGIN ?? normalizeUrl(baseUrl), issues: [error.message], warnings: [], checkedUrls: [], pages: [] };
    if (outputPath) {
      const { writeFileSync } = await import("node:fs");
      writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
    }
    console.error(`[SEO/AEO] ${error.message}`);
    process.exitCode = 1;
  }
}
