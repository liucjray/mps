#!/usr/bin/env node

import { appendFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";

function readJson(path, fallback) {
  if (!existsSync(path)) return fallback;
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return fallback;
  }
}

const impact = readJson("seo-aeo-impact.json", { needsGscSitemapSubmit: false, reasons: [] });
const predeploy = readJson("seo-aeo-predeploy-report.json", { ok: false, issues: ["not-run"] });
const publicReport = readJson("seo-aeo-report.json", { ok: false, issues: ["not-run"] });
const gsc = readJson("gsc-report.json", {
  status: impact.needsGscSitemapSubmit ? "not-run" : "skipped",
  reason: impact.needsGscSitemapSubmit ? "workflow stopped before GSC step" : (impact.reasons?.join(", ") || "no SEO/AEO impact"),
});
const indexNow = readJson("indexnow-report.json", { status: "not-run", reason: "workflow stopped before IndexNow step" });

if (!existsSync("gsc-report.json")) writeFileSync("gsc-report.json", `${JSON.stringify(gsc, null, 2)}\n`);
if (!existsSync("indexnow-report.json")) writeFileSync("indexnow-report.json", `${JSON.stringify(indexNow, null, 2)}\n`);

const summaryPath = process.env.GITHUB_STEP_SUMMARY;
if (summaryPath) {
  const lines = [
    "## SEO/AEO deployment summary",
    "",
    `- Impact: ${impact.reasons?.join(", ") || "none"}`,
    `- SEO/AEO predeploy: **${predeploy.ok ? "passed" : "failed/not-run"}**${predeploy.issues?.length ? ` — ${predeploy.issues.join(", ")}` : ""}`,
    `- SEO/AEO public: **${publicReport.ok ? "passed" : "failed/not-run"}**${publicReport.issues?.length ? ` — ${publicReport.issues.join(", ")}` : ""}`,
    `- GSC sitemap: **${gsc.status}**${gsc.reason ? ` — ${gsc.reason}` : ""}`,
    `- IndexNow: **${indexNow.status}**${indexNow.reason ? ` — ${indexNow.reason}` : ""}`,
    "",
  ];
  appendFileSync(summaryPath, `${lines.join("\n")}\n`);
}

console.log(JSON.stringify({ impact, predeploy, publicReport, gsc, indexNow }, null, 2));
