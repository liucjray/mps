#!/usr/bin/env node

import { appendFileSync, readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

const rootDir = resolve(new URL("..", import.meta.url).pathname);
const emptyTree = "4b825dc642cb6eb9a060e54bf8d69288fbee4904";

function getArgument(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
}

function runGit(args) {
  return execFileSync("git", args, { cwd: rootDir, encoding: "utf8" }).trim();
}

function isCommit(value) {
  return Boolean(value) && !/^0+$/.test(value) && /^[0-9a-f]{7,40}$/i.test(value);
}

function resolveBaseCommit(requestedBase, head) {
  if (requestedBase === head || requestedBase === "HEAD") return head;
  if (requestedBase && /^0+$/.test(requestedBase)) return emptyTree;
  if (isCommit(requestedBase)) {
    try {
      runGit(["cat-file", "-e", `${requestedBase}^{commit}`]);
      return requestedBase;
    } catch {
      // Fall back to the local parent when a shallow checkout does not contain the event base.
    }
  }

  try {
    return runGit(["rev-parse", `${head}^`]);
  } catch {
    return emptyTree;
  }
}

function readGitFile(commit, filePath) {
  if (commit === emptyTree) return "";
  try {
    return runGit(["show", `${commit}:${filePath}`]);
  } catch {
    return "";
  }
}

export function extractSitemapUrls(xmlContent) {
  return [...xmlContent.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => match[1].trim())
    .filter((url) => url.startsWith("https://ycaura.com"));
}

function getDiffFiles(base, head) {
  if (base === head) return [];
  return runGit(["diff", "--name-only", "--find-renames", `${base}..${head}`])
    .split("\n")
    .map((filePath) => filePath.trim())
    .filter(Boolean);
}

function getDiffText(base, head, filePath) {
  if (base === head) return "";
  return runGit(["diff", "--unified=0", `${base}..${head}`, "--", ...(filePath ? [filePath] : ["app", "public", "scripts"])]);
}

function hasMeaningfulPageDiff(diffText) {
  const changedLines = diffText
    .split("\n")
    .filter((line) => /^[+-]/.test(line) && !line.startsWith("+++") && !line.startsWith("---"))
    .map((line) => ({ direction: line[0], value: normalizeChangedLine(line.slice(1)) }))
    .filter(Boolean);

  if (changedLines.length === 0) return false;

  const removals = changedLines.filter(({ direction }) => direction === "-").map(({ value }) => value);
  const additions = changedLines.filter(({ direction }) => direction === "+").map(({ value }) => value);
  for (const value of additions) {
    const matchingRemoval = removals.indexOf(value);
    if (matchingRemoval >= 0) removals.splice(matchingRemoval, 1);
    else if (value) return true;
  }
  return removals.some(Boolean);
}

function normalizeChangedLine(line) {
  let normalized = line.trim();
  normalized = normalized.replace(/\s+(?:className|style|data-ga-[\w-]+|aria-[\w-]+|key|loading|decoding|width|height|fetchPriority)=(?:"[^"]*"|'[^']*'|\{[^}]*\})/g, "");
  normalized = normalized.replace(/^import .*globals\.css;?$/, "");
  normalized = normalized.replace(/\s+/g, " ").trim();
  if (/^\/\//.test(normalized)) return "";
  return normalized;
}

function isAnalyticsOnlyLayoutDiff(diffText) {
  const changedLines = diffText
    .split("\n")
    .filter((line) => /^[+-]/.test(line) && !line.startsWith("+++") && !line.startsWith("---"))
    .map((line) => normalizeChangedLine(line.slice(1)))
    .filter(Boolean);
  return changedLines.length > 0 && changedLines.every((line) => /google-analytics|NEXT_PUBLIC_GA|gtag/i.test(line));
}

export function classifyChanges({ base, head, files, diffText, diffTextByFile = {}, previousSitemap, currentSitemap, previousSitemapContent = "", currentSitemapContent = "" }) {
  const addedUrls = currentSitemap.filter((url) => !previousSitemap.includes(url));
  const removedUrls = previousSitemap.filter((url) => !currentSitemap.includes(url));
  const sitemapChanged = files.includes("public/sitemap.xml");
  const sitemapUrlsChanged = addedUrls.length > 0 || removedUrls.length > 0;
  const sitemapMetadataChanged = sitemapChanged && previousSitemapContent !== currentSitemapContent && !sitemapUrlsChanged;
  const changedPublicSearchFiles = files.filter((filePath) => (
    filePath === "public/sitemap.xml"
    || filePath === "public/robots.txt"
    || filePath === "public/llms.txt"
    || filePath === "public/llms-full.txt"
    || filePath === "app/site.ts"
    || filePath === "app/services.ts"
    || filePath === "app/layout.tsx"
    || /^app\/.*\/layout\.tsx$/.test(filePath)
    || filePath === "app/site-navigation.tsx"
    || filePath === "app/knowledge-contact.tsx"
    || filePath === "app/contact-guide.tsx"
    || filePath === "app/contact-qr.tsx"
    || filePath === "worker/index.ts"
    || /^app\/.*\/page\.tsx$/.test(filePath)
    || filePath === "app/page.tsx"
  ));
  const meaningfulPageChange = changedPublicSearchFiles.some((filePath) => {
    if (!filePath.endsWith(".tsx")) return true;
    if (filePath === "app/layout.tsx" && isAnalyticsOnlyLayoutDiff(diffTextByFile[filePath] ?? diffText)) return false;
    return hasMeaningfulPageDiff(diffTextByFile[filePath] ?? diffText);
  });
  const reasons = [];

  if (sitemapUrlsChanged) reasons.push("sitemap URL set changed");
  if (sitemapMetadataChanged) reasons.push("sitemap metadata changed");
  if (meaningfulPageChange && !sitemapUrlsChanged && !sitemapMetadataChanged) reasons.push("public SEO/AEO source changed");

  return {
    base,
    head,
    changedFiles: files,
    changedPublicSearchFiles,
    addedUrls,
    removedUrls,
    needsGscSitemapSubmit: reasons.length > 0,
    needsPublicSeoValidation: changedPublicSearchFiles.length > 0,
    reasons,
  };
}

export function classifyFromGit({ requestedBase, head = "HEAD" } = {}) {
  const base = resolveBaseCommit(requestedBase, head);
  const files = getDiffFiles(base, head);
  const diffText = getDiffText(base, head);
  const diffTextByFile = Object.fromEntries(files.map((filePath) => [filePath, getDiffText(base, head, filePath)]));
  const previousSitemapContent = readGitFile(base, "public/sitemap.xml");
  const currentSitemapContent = readGitFile(head, "public/sitemap.xml") || readFileSync(resolve(rootDir, "public/sitemap.xml"), "utf8");
  const previousSitemap = extractSitemapUrls(previousSitemapContent);
  const currentSitemap = extractSitemapUrls(currentSitemapContent);
  return classifyChanges({ base, head, files, diffText, diffTextByFile, previousSitemap, currentSitemap, previousSitemapContent, currentSitemapContent });
}

function writeGithubOutputs(result) {
  const outputPath = process.env.GITHUB_OUTPUT;
  if (!outputPath) return;
  appendFileSync(outputPath, `needs_gsc_sitemap_submit=${result.needsGscSitemapSubmit}\n`);
  appendFileSync(outputPath, `needs_public_seo_validation=${result.needsPublicSeoValidation}\n`);
  appendFileSync(outputPath, `impact_reasons=${result.reasons.join(", ") || "none"}\n`);
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(new URL(import.meta.url).pathname)) {
  const result = classifyFromGit({
    requestedBase: getArgument("--base") ?? process.env.GITHUB_EVENT_BEFORE,
    head: getArgument("--head") ?? process.env.GITHUB_SHA ?? "HEAD",
  });
  const outputPath = getArgument("--output");
  if (outputPath) writeFileSync(resolve(rootDir, outputPath), `${JSON.stringify(result, null, 2)}\n`);
  writeGithubOutputs(result);
  console.log(JSON.stringify(result, null, 2));
}
