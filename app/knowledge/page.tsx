/* eslint-disable @next/next/no-html-link-for-pages -- static HTML links avoid Vinext client-router hydration issues. */
import type { Metadata } from "next";
import { darkCirclesKnowledgePath, facebookUrl, instagramUrl, knowledgeImageUrl, knowledgeIndexUrl, lineUrl, organizationId, phoneNumber, sharedOrganizationEntity, siteAddress, siteBusinessHours, siteCanonicalUrl, siteEmail, siteName, siteUrl, stretchMarksKnowledgePath } from "../site";

export const dynamic = "force-static";

const pageUrl = knowledgeIndexUrl;
const websiteId = `${siteCanonicalUrl}#website`;
const pageId = `${pageUrl}#webpage`;
const itemListId = `${pageUrl}#itemlist`;
const updatedAt = "2026-09-03";

export const metadata: Metadata = {
  title: "肌膚知識中心｜妊娠紋、黑眼圈與局部美學科普",
  description: "瑪菲斯新北雙和店肌膚知識中心，整理妊娠紋成因、產後變化、紅白紋差異與黑眼圈外觀評估科普，陪你在做美化選擇前，先把肌膚狀態看懂。",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: `肌膚知識中心｜${siteName}`,
    description: "瑪菲斯新北雙和店肌膚知識中心，整理妊娠紋成因、產後變化、紅白紋差異與黑眼圈外觀評估科普，陪你在做美化選擇前，先把肌膚狀態看懂。",
    type: "website",
    locale: "zh_TW",
    url: pageUrl,
    siteName,
    images: [{ url: knowledgeImageUrl, type: "image/webp", width: 1448, height: 1086, alt: "膚色色彩樣本與保養瓶放在自然光下的肌膚教育桌面" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `肌膚知識中心｜${siteName}`,
    description: "瑪菲斯新北雙和店肌膚知識中心，整理妊娠紋成因、產後變化、紅白紋差異與黑眼圈外觀評估科普，陪你在做美化選擇前，先把肌膚狀態看懂。",
    images: [{ url: knowledgeImageUrl, alt: "膚色色彩樣本與保養瓶放在自然光下的肌膚教育桌面" }],
  },
};

const articles = [
  {
    slug: "stretch-marks",
    title: "妊娠紋是什麼？產後變化與保養",
    description: "了解妊娠紋形成原因、紅白紋差異、產後變化與保濕限制，也認識瑪菲斯雙和店的妊娠紋外觀修飾與諮詢方式。",
    path: stretchMarksKnowledgePath,
    url: `${siteCanonicalUrl}${stretchMarksKnowledgePath}`,
    tag: "STRETCH MARKS",
    date: "2026-08-28",
    summary: "懷孕或皮膚快速伸展後形成的線狀紋路，產後會如何變化？紅白紋差異在哪裡？保濕的極限是什麼？在考慮草本撫紋或外觀修飾前，先把關鍵界線看懂。",
  },
  {
    slug: "dark-circles",
    title: "黑眼圈怎麼看？成因與外觀評估",
    description: "整理黑眼圈常見的色澤、陰影與眼周狀態差異，了解新北雙和與台北肌膚美學諮詢前可以先觀察什麼。",
    path: darkCirclesKnowledgePath,
    url: `${siteCanonicalUrl}${darkCirclesKnowledgePath}`,
    tag: "DARK CIRCLES",
    date: "2026-08-30",
    summary: "黑眼圈只有睡不飽嗎？如何分辨色素型色澤差異與結構型光影、淚溝或眼袋？本篇整理諮詢前自我觀察重點，以及需要尋求合格醫療專業的警訊提醒。",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    sharedOrganizationEntity,
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteCanonicalUrl,
      name: siteName,
      inLanguage: "zh-Hant-TW",
      publisher: { "@id": organizationId },
    },
    {
      "@type": ["WebPage", "CollectionPage"],
      "@id": pageId,
      url: pageUrl,
      name: "肌膚知識中心｜新北雙和店｜瑪菲斯皮膚覆蓋專家",
      description: "瑪菲斯新北雙和店肌膚知識中心，整理妊娠紋成因、產後變化、紅白紋差異與黑眼圈外觀評估科普，陪你在做美化選擇前，先把肌膚狀態看懂。",
      inLanguage: "zh-Hant-TW",
      dateModified: updatedAt,
      isPartOf: { "@id": websiteId },
      author: { "@id": organizationId },
      publisher: { "@id": organizationId },
      about: { "@id": itemListId },
      mainEntity: { "@id": itemListId },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      primaryImageOfPage: { "@type": "ImageObject", url: `${siteUrl}${knowledgeImageUrl}`, width: 1448, height: 1086, caption: "膚色色彩樣本與保養瓶放在自然光下的肌膚教育桌面" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: siteName, item: siteCanonicalUrl },
        { "@type": "ListItem", position: 2, name: "知識中心", item: pageUrl },
      ],
    },
    {
      "@type": "ItemList",
      "@id": itemListId,
      name: "雙和店肌膚美學知識文章",
      description: "整理肌膚常見紋路、色澤、眼周困擾之科普文章與外觀評估指南",
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: article.url,
        name: article.title,
      })),
    },
  ],
};

export default function KnowledgeHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <a className="skip-link" href="#main-content">跳至主要內容</a>
      <nav className="site-nav" aria-label="主要導覽">
        <a className="wordmark" href="/#top" aria-label="新北雙和店｜瑪菲斯皮膚覆蓋專家首頁"><span className="wordmark-mark">M</span><span>新北雙和店｜瑪菲斯皮膚覆蓋專家</span></a>
        <div className="nav-links"><a href="/#about">品牌理念</a><a href="/#services">服務內容</a><a href="/knowledge">肌膚知識</a><a href="/#faq">常見問題</a></div>
        <a className="nav-cta" href={facebookUrl} target="_blank" rel="noreferrer" data-ga-event="contact_click" data-ga-contact-method="facebook" data-ga-cta-location="navigation">Facebook 私訊</a>
        <details className="nav-menu">
          <summary><span className="nav-menu-label-open">選單</span><span className="nav-menu-label-close">關閉</span></summary>
          <div className="nav-menu-panel">
            <a href="/#about">品牌理念</a><a href="/#services">服務內容</a><a href="/knowledge">肌膚知識</a><a href="/#faq">常見問題</a>
            <span className="nav-menu-divider">知識專題</span>
            <a href={stretchMarksKnowledgePath} data-ga-event="content_navigation" data-ga-cta-location="nav_menu">妊娠紋知識</a>
            <a href={darkCirclesKnowledgePath} data-ga-event="content_navigation" data-ga-cta-location="nav_menu">黑眼圈知識</a>
          </div>
        </details>
      </nav>

      <main id="main-content" tabIndex={-1}>
        <nav className="service-breadcrumb section-shell" aria-label="麵包屑導覽">
          <a href="/">首頁</a><span aria-hidden="true">/</span><span aria-current="page">知識中心</span>
        </nav>

        <header className="knowledge-article-hero section-shell">
          <div className="knowledge-article-copy">
            <div className="section-label">雙和店 / 肌膚知識中心</div>
            <h1>先把肌膚的故事看懂，<br /><em>再做選擇。</em></h1>
            <p>新北雙和店將常見的妊娠紋、肥胖紋、疤痕色澤與眼周陰影困擾拆解為科普知識。我們相信，清楚理解肌膚的生理特性與外觀差異，是在尋求任何美化服務前最重要的第一步。</p>
            <div className="knowledge-article-meta"><span>科普衛教與外觀評估指南</span><span>最後更新：{updatedAt}</span></div>
          </div>
          <div className="knowledge-article-facts" aria-label="知識中心核心原則">
            <span className="knowledge-card-label">知識中心三大原則</span>
            <ol>
              <li><strong>科普先行</strong><span>先理解成因與自然變化，不急著在焦慮時做出決定。</span></li>
              <li><strong>清楚邊界</strong><span>外觀修飾不等於醫療治療，遇疾病或傷口應諮詢醫師。</span></li>
              <li><strong>個別評估</strong><span>每個人膚色與紋理不同，不以單一案例代表全部結果。</span></li>
            </ol>
          </div>
        </header>

        <div className="section-shell">
          <div className="knowledge-article-notice">本站提供一般肌膚美學與外觀照護科普資訊，不取代合格醫療專業人員之診斷或治療建議；若有健康、皮膚病症、發炎或傷口疑慮，請先諮詢醫療專業人員。</div>
        </div>

        <section className="services section-shell" style={{ paddingTop: "80px" }} aria-labelledby="knowledge-articles-title">
          <div className="section-heading">
            <div>
              <div className="section-label">專題文章</div>
              <h2 id="knowledge-articles-title">肌膚困擾專題解析</h2>
            </div>
            <p>從紋路成因、產後照護到眼周色澤，<br />拆解常見疑問與諮詢前自我觀察重點。</p>
          </div>
          <div className="service-list">
            {articles.map((article, idx) => (
              <article className="service-row" key={article.slug}>
                <span className="service-number">0{idx + 1}</span>
                <div className="service-title-wrap">
                  <h3><a href={article.path}>{article.title}</a></h3>
                  <span>{article.tag}</span>
                </div>
                <div className="service-row-content">
                  <p>{article.summary}</p>
                  <div style={{ marginTop: "16px" }}>
                    <a className="text-link" href={article.path} data-ga-event="content_navigation" data-ga-cta-location="knowledge_hub">閱讀完整專題 <span aria-hidden="true">→</span></a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact service-detail-contact section-shell" id="contact" aria-labelledby="knowledge-contact-title">
          <div className="contact-copy">
            <div className="section-label">新北中和・南勢角站 / 服務雙和與雙北</div>
            <h2 id="knowledge-contact-title">想了解你的肌膚狀態，<br /><em>可以從這裡開始。</em></h2>
            <p>閱讀完科普文章後，若想進一步了解適合自己的外觀修飾、草本撫紋或科技測色方向，歡迎透過 Facebook 私訊、LINE、Instagram 或手機預約，先聊聊你的狀況。</p>
            <address className="contact-details">
              <span>地址</span>{siteAddress.addressRegion}{siteAddress.addressLocality}{siteAddress.streetAddress}<br />
              <span>時間</span>{siteBusinessHours}<br />
              <span>預約</span>手機、LINE、Instagram 或 Facebook 私訊<br />
              <span>Email</span><a href={`mailto:${siteEmail}`} data-ga-event="contact_click" data-ga-contact-method="email" data-ga-cta-location="knowledge_contact">{siteEmail}</a>
            </address>
          </div>
          <div className="contact-actions">
            <a className="contact-button" href={facebookUrl} target="_blank" rel="noreferrer" data-ga-event="contact_click" data-ga-contact-method="facebook" data-ga-cta-location="knowledge_contact">
              <span>前往雙和店 Facebook<br /><small>了解最新案例與預約方式</small></span>
            </a>
            <a className="contact-secondary" href={lineUrl} target="_blank" rel="noreferrer" data-ga-event="contact_click" data-ga-contact-method="line" data-ga-cta-location="knowledge_contact">LINE 預約諮詢</a>
            <a className="contact-secondary" href={instagramUrl} target="_blank" rel="noreferrer" data-ga-event="contact_click" data-ga-contact-method="instagram" data-ga-cta-location="knowledge_contact">Instagram 追蹤／私訊</a>
            <a className="contact-secondary" href={`tel:${phoneNumber}`} data-ga-event="contact_click" data-ga-contact-method="phone" data-ga-cta-location="knowledge_contact">電話預約 0981-756-111</a>
          </div>
        </section>
      </main>

      <footer className="site-footer section-shell"><a className="wordmark" href="/#top" aria-label="新北雙和店｜瑪菲斯皮膚覆蓋專家首頁"><span className="wordmark-mark">M</span><span>新北雙和店｜瑪菲斯皮膚覆蓋專家</span></a><span>紋路美化・科技測色・肌膚知識</span><span>© 2026</span></footer>
      <a className="mobile-sticky-cta" href={facebookUrl} target="_blank" rel="noreferrer" data-ga-event="contact_click" data-ga-contact-method="facebook" data-ga-cta-location="mobile_sticky">立即預約諮詢</a>
    </>
  );
}
