import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "./google-analytics";
import { siteCanonicalUrl, siteDescription, siteName, siteTitle, siteUrl, socialImageUrl } from "./site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: `%s｜${siteName}` },
  description: siteDescription,
  keywords: ["新北雙和店", "雙和店", "瑪菲斯", "Mavis pure skin", "皮膚覆蓋術", "草本撫紋", "科技測色", "妊娠紋", "肥胖紋", "成長紋", "疤痕", "捷運南勢角站", "新北市中和區", "中和", "永和", "雙和", "台北市", "雙北", "北部"],
  authors: [{ name: siteName, url: siteCanonicalUrl }],
  creator: siteName,
  publisher: siteName,
  alternates: { canonical: siteCanonicalUrl },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    locale: "zh_TW",
    url: siteCanonicalUrl,
    siteName,
    images: [{ url: socialImageUrl, type: "image/jpeg", width: 1536, height: 1024, alt: "自然光下展示肌膚紋理的女性肩背" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [{ url: socialImageUrl, alt: "自然光下展示肌膚紋理的女性肩背" }],
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
  return <html lang="zh-Hant-TW"><body>{children}<GoogleAnalytics /></body></html>;
}
