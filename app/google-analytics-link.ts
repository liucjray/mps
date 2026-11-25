export function getAnalyticsLinkDetails(href: string | undefined, label: string | null) {
  if (/^(?:tel|mailto):/i.test(href ?? "")) return {};

  return {
    link_url: href,
    link_text: label?.trim().slice(0, 100),
  };
}
