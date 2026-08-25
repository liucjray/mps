import type { Metadata } from "next";
import "./globals.css";
import { siteCanonicalUrl, siteDescription, siteName, siteUrl, socialImageUrl } from "./site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: `%s｜${siteName}` },
  description: siteDescription,
  keywords: ["瑪菲斯", "Mavis pure skin", "皮膚覆蓋術", "草本撫紋", "科技測色", "妊娠紋", "肥胖紋", "成長紋", "疤痕", "新北雙和", "新北市中和區"],
  authors: [{ name: siteName, url: siteCanonicalUrl }],
  creator: siteName,
  publisher: siteName,
  alternates: { canonical: siteCanonicalUrl },
  openGraph: {
    title: siteName,
    description: siteDescription,
    type: "website",
    locale: "zh_TW",
    url: siteCanonicalUrl,
    siteName,
    images: [{ url: socialImageUrl, type: "image/jpeg", width: 1536, height: 1024, alt: "自然光下展示肌膚紋理的女性肩背" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [socialImageUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant-TW"><body>{children}</body></html>;
}
