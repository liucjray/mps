#!/usr/bin/env node

import { createSign } from "node:crypto";
import { writeFileSync } from "node:fs";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SEARCH_CONSOLE_SCOPE = "https://www.googleapis.com/auth/webmasters";
const DEFAULT_SITE_URL = "https://ycaura.com/";
const DEFAULT_SITEMAP_URL = "https://ycaura.com/sitemap.xml";

function writeReport(report) {
  const reportPath = process.env.GSC_REPORT_PATH;
  if (reportPath) writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
}

function base64Url(value) {
  return Buffer.from(value).toString("base64url");
}

export function createJwtAssertion(credentials, nowSeconds = Math.floor(Date.now() / 1000)) {
  if (!credentials?.client_email || !credentials?.private_key) throw new Error("GSC credentials must contain client_email and private_key");
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64Url(JSON.stringify({
    iss: credentials.client_email,
    scope: SEARCH_CONSOLE_SCOPE,
    aud: TOKEN_URL,
    iat: nowSeconds - 30,
    exp: nowSeconds + 3570,
  }));
  const unsignedToken = `${header}.${payload}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsignedToken);
  signer.end();
  return `${unsignedToken}.${signer.sign(credentials.private_key, "base64url")}`;
}

export function buildSitemapEndpoint(siteUrl, sitemapUrl) {
  return `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(sitemapUrl)}`;
}

function readCredentials() {
  const raw = process.env.GSC_CREDENTIALS?.trim();
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error("GSC_CREDENTIALS is not valid JSON");
  }
}

async function fetchWithRetry(url, options, { retries = 2, label = "request" } = {}) {
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const delayMs = 2000 * (2 ** attempt);
    try {
      const response = await fetch(url, { ...options, signal: AbortSignal.timeout(Number(process.env.GSC_REQUEST_TIMEOUT_MS ?? 8000)) });
      if (![429, 500, 502, 503, 504].includes(response.status) || attempt === retries) return response;
      console.warn(`[GSC] ${label} returned HTTP ${response.status}; retrying in ${delayMs}ms`);
    } catch (error) {
      if (attempt === retries) throw error;
      console.warn(`[GSC] ${label} failed (${error.message}); retrying in ${delayMs}ms`);
    }
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  throw new Error(`[GSC] ${label} exhausted retries`);
}

async function getAccessToken(credentials) {
  const assertion = createJwtAssertion(credentials);
  const response = await fetchWithRetry(TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }),
  }, { label: "OAuth token request" });
  if (!response.ok) {
    const body = await response.text();
    let message = "";
    try {
      message = JSON.parse(body)?.error_description ?? JSON.parse(body)?.error ?? "";
    } catch {
      message = body.trim();
    }
    throw new Error(`[GSC] OAuth token request failed with HTTP ${response.status}${message ? `: ${message}` : ""}`);
  }
  const payload = await response.json();
  if (!payload.access_token) throw new Error("[GSC] OAuth response did not contain an access token");
  return payload.access_token;
}

async function verifySitemap(sitemapUrl) {
  const response = await fetchWithRetry(sitemapUrl, { headers: { accept: "application/xml,text/xml;q=0.9" } }, { label: "sitemap verification" });
  const body = await response.text();
  if (!response.ok) throw new Error(`[GSC] sitemap verification failed with HTTP ${response.status}`);
  if (!/<urlset\b/i.test(body) || !/<loc>https:\/\/ycaura\.com[^<]*<\/loc>/i.test(body)) throw new Error("[GSC] sitemap verification did not find a valid ycaura.com urlset");
  return body;
}

export async function submitSitemap({ credentials, siteUrl = DEFAULT_SITE_URL, sitemapUrl = DEFAULT_SITEMAP_URL }) {
  await verifySitemap(sitemapUrl);
  const token = await getAccessToken(credentials);
  const endpoint = buildSitemapEndpoint(siteUrl, sitemapUrl);
  const response = await fetchWithRetry(endpoint, {
    method: "PUT",
    headers: { authorization: `Bearer ${token}`, accept: "application/json" },
  }, { label: "Search Console sitemap submit" });
  if (!response.ok) {
    const body = await response.text();
    let message = "";
    try {
      message = JSON.parse(body)?.error?.message ?? JSON.parse(body)?.error_description ?? "";
    } catch {
      message = body.trim();
    }
    throw new Error(`[GSC] sitemap submit failed with HTTP ${response.status}${message ? `: ${message}` : ""}`);
  }
  return { endpoint, status: response.status };
}

if (process.argv[1] && new URL(import.meta.url).pathname === process.argv[1]) {
  try {
    const credentials = readCredentials();
    if (!credentials) {
      writeReport({ status: "skipped", reason: "GSC_CREDENTIALS not configured" });
      console.warn("[GSC] GSC_CREDENTIALS not configured, skipping sitemap submission");
      process.exit(0);
    }
    const result = await submitSitemap({
      credentials,
      siteUrl: process.env.GSC_SITE_URL ?? DEFAULT_SITE_URL,
      sitemapUrl: process.env.GSC_SITEMAP_URL ?? DEFAULT_SITEMAP_URL,
    });
    writeReport({ status: "submitted", siteUrl: process.env.GSC_SITE_URL ?? DEFAULT_SITE_URL, sitemapUrl: process.env.GSC_SITEMAP_URL ?? DEFAULT_SITEMAP_URL, httpStatus: result.status });
    console.log(`[GSC] Sitemap submitted successfully (HTTP ${result.status})`);
  } catch (error) {
    writeReport({ status: "failed", error: error.message });
    console.error(`[GSC] ${error.message}`);
    process.exitCode = 1;
  }
}
