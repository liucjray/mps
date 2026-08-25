import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "瑪菲斯皮膚覆蓋專家｜新北雙和店",
  description: "瑪菲斯皮膚覆蓋專家｜新北雙和店：草本撫紋、皮膚覆蓋術、科技測色與肌膚美學知識，關注妊娠紋、肥胖紋、成長紋與各類疤痕。",
  keywords: ["瑪菲斯", "Mavis pure skin", "皮膚覆蓋術", "草本撫紋", "科技測色", "妊娠紋", "肥胖紋", "成長紋", "疤痕", "新北雙和"],
  openGraph: {
    title: "瑪菲斯皮膚覆蓋專家｜新北雙和店",
    description: "草本撫紋、皮膚覆蓋術、科技測色與肌膚美學知識。先了解，再選擇適合自己的方向。",
    type: "website",
    locale: "zh_TW",
  },
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body>{children}</body></html>;
}
