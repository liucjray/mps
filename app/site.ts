export const siteUrl = "https://ycaura.com";
// 站內一律使用無尾斜線 URL（`/path/` 會 308 轉址到 `/path`），
// canonical、og:url 與 sitemap 需與此一致。
export const siteCanonicalUrl = siteUrl;
export const siteName = "新北雙和店｜瑪菲斯皮膚覆蓋專家";
export const siteTitle = "新北雙和店｜瑪菲斯皮膚覆蓋專家｜中和・南勢角站｜雙北預約";
export const siteServiceArea = "位於新北市中和區、捷運南勢角站附近，主要服務雙和（中和、永和）與雙北（新北市、台北市）地區，亦接受北部地區預約";
export const siteDescription = `新北雙和店${siteServiceArea}，提供草本撫紋、皮膚覆蓋術、科技測色與肌膚美學知識。`;
export const siteBusinessHours = "11:00–19:00（預約制）";
export const siteEmail = "millie0806@gmail.com";
export const siteAddress = {
  "@type": "PostalAddress",
  streetAddress: "景新街347號9樓之9",
  addressLocality: "中和區",
  addressRegion: "新北市",
  addressCountry: "TW",
} as const;
export const facebookUrl = "https://www.facebook.com/people/%E7%91%AA%E8%8F%B2%E6%96%AF%E7%9A%AE%E8%86%9A%E8%A6%86%E8%93%8B%E5%B0%88%E5%AE%B6-%E6%96%B0%E5%8C%97%E9%9B%99%E5%92%8C%E5%BA%97/61592083747747/";
export const lineUrl = "https://line.me/ti/p/f_92dWjx8l";
export const instagramUrl = "https://www.instagram.com/millie_711102";
export const phoneNumber = "+886981756111";
export const heroImageUrl = "/hero-skin-atelier.webp";
export const introImageUrl = "/intro-skin-consultation.webp";
export const knowledgeImageUrl = "/knowledge-skin-palette.webp";
export const socialImageUrl = "/social-skin-atelier.jpg";
export const knowledgeIndexPath = "/knowledge";
export const knowledgeIndexUrl = `${siteUrl}/knowledge`;
export const stretchMarksKnowledgeUrl = `${siteUrl}/knowledge/stretch-marks`;
export const stretchMarksKnowledgePath = "/knowledge/stretch-marks";
export const darkCirclesKnowledgeUrl = `${siteUrl}/knowledge/dark-circles`;
export const darkCirclesKnowledgePath = "/knowledge/dark-circles";
export const striaeKnowledgeUrl = `${siteUrl}/knowledge/striae-comparison`;
export const striaeKnowledgePath = "/knowledge/striae-comparison";
// 首頁與服務頁的內容最後更新日；知識頁各自維護自己的 updatedAt。
export const siteLastModified = "2026-09-03";

export const organizationId = `${siteCanonicalUrl}#organization`;

export const sharedServedAreas = [
  { "@type": "AdministrativeArea", name: "新北市" },
  { "@type": "AdministrativeArea", name: "中和區" },
  { "@type": "AdministrativeArea", name: "永和區" },
  { "@type": "AdministrativeArea", name: "台北市" },
] as const;

export const sharedContactPoint = {
  "@type": "ContactPoint",
  telephone: phoneNumber,
  email: siteEmail,
  contactType: "customer service",
  url: lineUrl,
  areaServed: sharedServedAreas,
  availableLanguage: ["zh-Hant-TW"],
  hoursAvailable: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "11:00",
    closes: "19:00",
  },
} as const;

export const sharedOrganizationEntity = {
  "@type": ["Organization", "LocalBusiness"],
  "@id": organizationId,
  name: siteName,
  alternateName: ["Mavis pure skin", "MAVIS PURE SKIN"],
  description: siteDescription,
  email: siteEmail,
  address: siteAddress,
  url: siteCanonicalUrl,
  telephone: phoneNumber,
  image: [`${siteUrl}${heroImageUrl}`, `${siteUrl}${introImageUrl}`, `${siteUrl}${knowledgeImageUrl}`],
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/logo.png`,
    contentUrl: `${siteUrl}/logo.png`,
    width: 512,
    height: 512,
  },
  sameAs: [facebookUrl, lineUrl, instagramUrl],
  brand: { "@type": "Brand", name: "Mavis pure skin" },
  areaServed: sharedServedAreas,
  contactPoint: sharedContactPoint,
  knowsAbout: ["妊娠紋", "肥胖紋", "成長紋", "各類疤痕", "皮膚覆蓋術", "科技測色", "肌膚美學"],
} as const;
