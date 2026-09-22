#!/usr/bin/env node

import { writeFileSync } from "node:fs";
import { fetchWithRetry, getAccessToken } from "./gsc-notify.mjs";

const DEFAULT_SITE_URL = "sc-domain:ycaura.com";
const DEFAULT_DAYS = 28;
const DEFAULT_ROW_LIMIT = 1000;

function writeReport(report) {
  const reportPath = process.env.GSC_REPORT_PATH;
  if (reportPath) writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
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

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

export function buildSearchAnalyticsEndpoint(siteUrl) {
  return `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
}

export function buildQueryBody({ days = DEFAULT_DAYS, rowLimit = DEFAULT_ROW_LIMIT, endDate = new Date() } = {}) {
  const end = new Date(endDate);
  const start = new Date(end);
  start.setDate(start.getDate() - days);
  return {
    startDate: isoDate(start),
    endDate: isoDate(end),
    dimensions: ["query"],
    rowLimit,
  };
}

// GSC only ever reports rows that already have at least one impression, so
// searching for a keyword the site has never been shown for legitimately
// returns nothing here — that is a coverage signal, not a request bug.
export function matchKeywords(rows, keywords) {
  const normalize = (value) => value.trim().toLowerCase();
  const byQuery = new Map((rows ?? []).map((row) => [normalize(row.keys[0]), row]));
  return keywords.map((keyword) => {
    const row = byQuery.get(normalize(keyword));
    if (!row) return { keyword, found: false };
    return {
      keyword,
      found: true,
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    };
  });
}

export async function querySearchAnalytics({ credentials, siteUrl = DEFAULT_SITE_URL, days = DEFAULT_DAYS, rowLimit = DEFAULT_ROW_LIMIT }) {
  const token = await getAccessToken(credentials);
  const endpoint = buildSearchAnalyticsEndpoint(siteUrl);
  const response = await fetchWithRetry(endpoint, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(buildQueryBody({ days, rowLimit })),
  }, { label: "Search Console search analytics query" });
  if (!response.ok) {
    const body = await response.text();
    let message = "";
    try {
      message = JSON.parse(body)?.error?.message ?? "";
    } catch {
      message = body.trim();
    }
    throw new Error(`[GSC] search analytics query failed with HTTP ${response.status}${message ? `: ${message}` : ""}`);
  }
  const payload = await response.json();
  return payload.rows ?? [];
}

if (process.argv[1] && new URL(import.meta.url).pathname === process.argv[1]) {
  try {
    const credentials = readCredentials();
    if (!credentials) {
      writeReport({ status: "skipped", reason: "GSC_CREDENTIALS not configured" });
      console.warn("[GSC] GSC_CREDENTIALS not configured, skipping search analytics query");
      process.exit(0);
    }
    const siteUrl = process.env.GSC_SITE_URL ?? DEFAULT_SITE_URL;
    const days = Number(process.env.GSC_SA_DAYS ?? DEFAULT_DAYS);
    const rowLimit = Number(process.env.GSC_SA_ROW_LIMIT ?? DEFAULT_ROW_LIMIT);
    const keywords = process.argv.slice(2);
    const rows = await querySearchAnalytics({ credentials, siteUrl, days, rowLimit });
    const matches = keywords.length > 0 ? matchKeywords(rows, keywords) : null;
    const report = { status: "ok", siteUrl, days, rowCount: rows.length, matches, topRows: rows.slice(0, 50) };
    writeReport(report);
    if (matches) {
      for (const match of matches) {
        console.log(match.found
          ? `[GSC] "${match.keyword}" — 平均排名 ${match.position.toFixed(1)}，曝光 ${match.impressions}，點擊 ${match.clicks}，CTR ${(match.ctr * 100).toFixed(1)}%`
          : `[GSC] "${match.keyword}" — 近 ${days} 天沒有曝光紀錄（不是查不到，是這段期間內完全沒被搜尋顯示過）`);
      }
    } else {
      console.log(`[GSC] 近 ${days} 天共 ${rows.length} 組有曝光的查詢字詞，前幾筆：`);
      for (const row of rows.slice(0, 20)) {
        console.log(`  ${row.keys[0]} — 平均排名 ${row.position.toFixed(1)}，曝光 ${row.impressions}，點擊 ${row.clicks}`);
      }
    }
  } catch (error) {
    writeReport({ status: "failed", error: error.message });
    console.error(`[GSC] ${error.message}`);
    process.exitCode = 1;
  }
}
