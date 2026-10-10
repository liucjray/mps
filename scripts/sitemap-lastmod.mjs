export function getSitemapLastmod(sitemap, pageUrl) {
  const escapedUrl = pageUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const entry = sitemap.match(new RegExp(`<url>\\s*<loc>${escapedUrl}</loc>([\\s\\S]*?)</url>`));
  return entry?.[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? null;
}

export function isSitemapLastmodInSync(sitemap, pageUrl, updatedAt) {
  return getSitemapLastmod(sitemap, pageUrl) === updatedAt;
}
