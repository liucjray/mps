/* eslint-disable @next/next/no-html-link-for-pages -- static HTML links avoid Vinext client-router hydration issues. */
import type { Metadata } from "next";
import { facebookUrl, instagramUrl, knowledgeImageUrl, lineUrl, phoneNumber, siteAddress, siteBusinessHours, siteCanonicalUrl, siteDescription, siteEmail, siteName, siteServiceArea, siteUrl, stretchMarksKnowledgeUrl } from "../../site";

export const dynamic = "force-static";

const pageUrl = stretchMarksKnowledgeUrl;
const pageTitle = "妊娠紋是什麼？產後變化與保養";
const pageDescription = "了解妊娠紋形成原因、紅白紋差異、產後變化與保濕限制，也認識瑪菲斯雙和店的妊娠紋外觀修飾與諮詢方式。";
const updatedAt = "2026-08-28";

const faqs = [
  {
    question: "妊娠紋會自己消失嗎？",
    answer: "妊娠紋在生產後可能逐漸變淡，但不一定完全消失。它通常不會造成健康問題；如果很在意外觀，可以先了解紋路顏色、凹凸、部位與形成時間，再評估適合的方向。",
  },
  {
    question: "乳液可以預防妊娠紋嗎？",
    answer: "保濕可以協助舒緩孕期或產後的乾燥與搔癢，但目前沒有可靠證據可以保證一般乳液、油類或保養品預防或消除妊娠紋。",
  },
  {
    question: "懷孕或哺乳中可以做妊娠紋服務嗎？",
    answer: "不要只依網路文章自行判定。懷孕或哺乳中若考慮任何產品或處置，應先詢問產科或皮膚科醫師，並向服務方確認是否暫緩、使用什麼產品，以及有哪些禁忌。",
  },
  {
    question: "妊娠紋覆蓋是在治療妊娠紋嗎？",
    answer: "外觀修飾與醫療治療是不同概念。妊娠紋覆蓋或色澤修飾若以顏色與視覺落差為主要討論，不能因此宣稱改變皮膚結構、治療疾病或讓紋路完全消失。",
  },
  {
    question: "凹凸的妊娠紋也能只靠顏色修飾嗎？",
    answer: "不一定。顏色落差與凹凸、紋理是不同問題，實際能討論的方向會受到部位、紋路狀態、膚色與形成時間影響，不能只用一張案例照片推論結果。",
  },
  {
    question: "什麼情況應該先看醫師？",
    answer: "如果有疼痛、發炎、傷口、感染、快速變化、明顯搔癢或其他健康疑慮，應先尋求合格醫療專業意見。本站內容與外觀修飾諮詢都不能取代診斷或治療。",
  },
];

const sources = [
  { name: "美國皮膚科醫學會 AAD：Stretch marks", url: "https://www.aad.org/public/cosmetic/scars-stretch-marks/stretch-marks-why-appear" },
  { name: "美國婦產科醫學會 ACOG：Skin Conditions During Pregnancy", url: "https://www.acog.org/womens-health/faqs/skin-conditions-during-pregnancy" },
  { name: "英國 NHS：Stretch marks in pregnancy", url: "https://www.nhs.uk/pregnancy/common-symptoms/stretch-marks/" },
  { name: "台灣食藥署：使用化粧品真的能讓妊娠紋消失嗎？", url: "https://www.fda.gov.tw/tc/newsContent.aspx?id=28618" },
  { name: "Cochrane：Topical preparations for preventing stretch marks in pregnancy", url: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD000066.pub2/pdf/CDSR/CD000066/CD000066_abstract.pdf" },
];

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  authors: [{ name: siteName, url: siteCanonicalUrl }],
  creator: siteName,
  publisher: siteName,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: `${pageTitle}｜${siteName}`,
    description: pageDescription,
    type: "article",
    locale: "zh_TW",
    url: pageUrl,
    siteName,
    images: [{ url: knowledgeImageUrl, type: "image/webp", width: 1448, height: 1086, alt: "膚色色彩樣本與保養瓶放在自然光下的肌膚教育桌面" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle}｜${siteName}`,
    description: pageDescription,
    images: [{ url: knowledgeImageUrl, alt: "膚色色彩樣本與保養瓶放在自然光下的肌膚教育桌面" }],
  },
};

const organizationId = `${siteCanonicalUrl}#organization`;
const websiteId = `${siteCanonicalUrl}#website`;
const pageId = `${pageUrl}#webpage`;
const articleId = `${pageUrl}#article`;
const faqId = `${pageUrl}#faq`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": organizationId,
      name: siteName,
      alternateName: ["Mavis pure skin", "MAVIS PURE SKIN"],
      description: siteDescription,
      url: siteCanonicalUrl,
      telephone: phoneNumber,
      email: siteEmail,
      address: siteAddress,
      sameAs: [facebookUrl, lineUrl, instagramUrl],
      areaServed: [
        { "@type": "AdministrativeArea", name: "新北市" },
        { "@type": "AdministrativeArea", name: "中和區" },
        { "@type": "AdministrativeArea", name: "永和區" },
        { "@type": "AdministrativeArea", name: "台北市" },
      ],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteCanonicalUrl,
      name: siteName,
      inLanguage: "zh-Hant-TW",
      publisher: { "@id": organizationId },
    },
    {
      "@type": "WebPage",
      "@id": pageId,
      url: pageUrl,
      name: pageTitle,
      description: pageDescription,
      inLanguage: "zh-Hant-TW",
      dateModified: updatedAt,
      isPartOf: { "@id": websiteId },
      author: { "@id": organizationId },
      publisher: { "@id": organizationId },
      about: "https://schema.org/HealthAndBeautyBusiness",
      mainEntity: { "@id": articleId },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      primaryImageOfPage: { "@type": "ImageObject", url: `${siteUrl}${knowledgeImageUrl}`, width: 1448, height: 1086, caption: "膚色色彩樣本與保養瓶放在自然光下的肌膚教育桌面" },
    },
    {
      "@type": "Article",
      "@id": articleId,
      headline: pageTitle,
      description: pageDescription,
      image: `${siteUrl}${knowledgeImageUrl}`,
      datePublished: updatedAt,
      dateModified: updatedAt,
      inLanguage: "zh-Hant-TW",
      author: { "@id": organizationId },
      publisher: { "@id": organizationId },
      mainEntityOfPage: { "@id": pageId },
      articleSection: "妊娠紋與肌膚知識",
      keywords: ["妊娠紋", "產後妊娠紋", "妊娠紋外觀修飾", "新北妊娠紋", "中和妊娠紋"],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: siteName, item: siteCanonicalUrl },
        { "@type": "ListItem", position: 2, name: "妊娠紋知識", item: pageUrl },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": faqId,
      inLanguage: "zh-Hant-TW",
      mainEntity: faqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

export default function StretchMarksKnowledgePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <a className="skip-link" href="#main-content">跳至主要內容</a>
      <nav className="site-nav" aria-label="主要導覽">
        <a className="wordmark" href="/#top" aria-label="新北雙和店｜瑪菲斯皮膚覆蓋專家首頁"><span className="wordmark-mark">M</span><span>新北雙和店｜瑪菲斯皮膚覆蓋專家</span></a>
        <div className="nav-links"><a href="/#about">品牌理念</a><a href="/#services">服務內容</a><a href="/#knowledge">肌膚知識</a><a href="#faq">常見問題</a></div>
        <a className="nav-cta" href={facebookUrl} target="_blank" rel="noreferrer" data-ga-event="contact_click" data-ga-contact-method="facebook" data-ga-cta-location="navigation">Facebook 私訊</a>
        <details className="nav-menu">
          <summary><span className="nav-menu-label-open">選單</span><span className="nav-menu-label-close">關閉</span></summary>
          <div className="nav-menu-panel">
            <a href="/#about">品牌理念</a><a href="/#services">服務內容</a><a href="/#knowledge">肌膚知識</a><a href="#faq">常見問題</a>
            <span className="nav-menu-divider">知識文章</span>
            <a href="/knowledge/stretch-marks" data-ga-event="content_navigation" data-ga-cta-location="nav_menu">妊娠紋知識</a>
            <a href="/knowledge/dark-circles" data-ga-event="content_navigation" data-ga-cta-location="nav_menu">黑眼圈知識</a>
          </div>
        </details>
      </nav>

      <main id="main-content" tabIndex={-1}>
        <nav className="service-breadcrumb section-shell" aria-label="麵包屑導覽">
          <a href="/">首頁</a><span aria-hidden="true">/</span><span aria-current="page">妊娠紋知識</span>
        </nav>

        <article className="knowledge-article section-shell">
          <header className="knowledge-article-hero">
            <div className="knowledge-article-copy">
              <div className="section-label">雙和店 / 妊娠紋知識</div>
              <h1>妊娠紋是什麼？<br /><em>先了解，再選擇。</em></h1>
              <p>妊娠紋是懷孕或皮膚快速伸展後可能形成的線狀紋路，產後可能逐漸變淡，但不一定完全消失。這一頁整理形成原因、紅白紋差異、保濕限制，以及外觀修飾前值得問清楚的事。</p>
              <div className="knowledge-article-meta"><span>內容整理：{siteName}</span><span>最後更新：{updatedAt}</span></div>
            </div>
            <div className="knowledge-article-facts" aria-label="妊娠紋重點摘要">
              <span className="knowledge-card-label">先知道三件事</span>
              <ol>
                <li><strong>常見</strong><span>懷孕時常見於腹部，也可能出現在乳房、臀部與大腿。</span></li>
                <li><strong>會變淡</strong><span>產後可能逐漸變淡，但不一定完全消失。</span></li>
                <li><strong>先分辨</strong><span>顏色、凹凸、部位與形成時間都會影響後續討論。</span></li>
              </ol>
            </div>
          </header>

          <div className="knowledge-article-notice">本站提供一般肌膚美學與外觀照護資訊，不取代醫療診斷或治療建議；若有健康疑慮，請先諮詢合格醫療專業人員。</div>

          <div className="knowledge-article-body">
            <div className="knowledge-article-main">
              <section className="knowledge-article-section" aria-labelledby="what-title">
                <div className="section-label">01 / 先把名詞說清楚</div>
                <h2 id="what-title">妊娠紋是什麼？</h2>
                <p className="knowledge-lede">妊娠紋是皮膚在懷孕等快速伸展情況下形成的線狀紋路，常見於腹部，也可能出現在乳房、臀部與大腿。它通常不會造成健康問題，但可能成為外觀上的困擾。</p>
                <p>早期紋路可能呈現紅、粉、紫或棕色，經過一段時間後顏色可能變淡，並留下較白或接近膚色的紋路。英文資料常見 <em>stretch marks</em>、<em>striae</em>，妊娠相關則可能使用 <em>striae gravidarum</em>。</p>
              </section>

              <section className="knowledge-article-section" aria-labelledby="fade-title">
                <div className="section-label">02 / 產後會怎麼變化</div>
                <h2 id="fade-title">妊娠紋會完全消失嗎？</h2>
                <p className="knowledge-lede">多數妊娠紋在生產後可能逐漸變淡，但不能保證完全消失。不同人的膚色、紋路年齡、部位與皮膚狀態都不一樣。</p>
                <div className="knowledge-callout"><strong>先記住</strong><p>「變淡」不等於「消失」，「外觀修飾」也不等於「治療」。看待案例或療程時，這兩個界線都要先問清楚。</p></div>
              </section>

              <section className="knowledge-article-section" aria-labelledby="care-title">
                <div className="section-label">03 / 孕期與產後照護</div>
                <h2 id="care-title">保濕可以預防妊娠紋嗎？</h2>
                <p className="knowledge-lede">保濕可以協助舒緩乾燥與搔癢，但目前沒有可靠證據能保證一般乳液、油類或保養品預防或消除妊娠紋。</p>
                <ul className="knowledge-check-list">
                  <li>懷孕或哺乳中使用產品前，先確認成分並詢問產科或皮膚科醫師。</li>
                  <li>不要把「草本」「天然」或「保濕」直接理解成孕期一定適用或具有預防效果。</li>
                  <li>若有疼痛、發炎、傷口、感染、快速變化或明顯搔癢，先尋求醫療專業意見。</li>
                </ul>
              </section>

              <section className="knowledge-article-section" aria-labelledby="service-title">
                <div className="section-label">04 / 外觀修飾前先了解</div>
                <h2 id="service-title">妊娠紋覆蓋是在做什麼？</h2>
                <p className="knowledge-lede">外觀修飾主要是討論色澤、紋路與周圍肌膚的視覺落差；它不應被描述成治療皮膚疾病、改變皮膚結構或保證讓妊娠紋消失。</p>
                <p>雙和店的諮詢會先從在意的部位、紋路顏色、凹凸與形成時間開始了解，再說明目前能討論的方向與限制。實際服務細節、適用條件與孕期／哺乳期是否需要暫緩，請在預約前直接向雙和店確認。</p>
                <a className="text-link" href="/services/herbal-stretch-care" data-ga-event="content_navigation" data-ga-cta-location="knowledge_article">了解雙和店的草本撫紋服務 <span aria-hidden="true">↗</span></a>
              </section>

              <section className="knowledge-article-section" id="faq" aria-labelledby="faq-title">
                <div className="section-label">05 / 常見問題</div>
                <h2 id="faq-title">關於妊娠紋，<br /><em>先問清楚。</em></h2>
                <div className="faq-list knowledge-faq-list">
                  {faqs.map(({ question, answer }) => <details key={question}><summary>{question}<span>＋</span></summary><div className="faq-answer"><p>{answer}</p></div></details>)}
                </div>
              </section>

              <section className="knowledge-article-sources" aria-labelledby="sources-title">
                <div className="section-label">資料來源</div>
                <h2 id="sources-title">這些內容從哪裡來？</h2>
                <p>本頁以醫學組織、公共醫療資訊與台灣官方資料整理；品牌服務內容則以雙和店目前公開的服務範圍為準。來源可能更新，最後更新日期請見頁面上方。</p>
                <ul>{sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.name}<span aria-hidden="true">↗</span></a></li>)}</ul>
              </section>
            </div>

            <aside className="knowledge-article-aside" aria-label="雙和店資訊與聯絡方式">
              <div className="knowledge-aside-card">
                <span className="knowledge-card-label">雙和店 / 新北中和</span>
                <h2>想了解自己的紋路？</h2>
                <p>可以先準備在意的部位、形成時間與清楚照片，再向雙和店說明狀況。</p>
                <a className="button button-dark" href={facebookUrl} target="_blank" rel="noreferrer" data-ga-event="contact_click" data-ga-contact-method="facebook" data-ga-cta-location="knowledge_aside">雙和店 Facebook 私訊 <span aria-hidden="true">↗</span></a>
                <a className="text-link" href={lineUrl} target="_blank" rel="noreferrer" data-ga-event="contact_click" data-ga-contact-method="line" data-ga-cta-location="knowledge_aside">LINE 預約諮詢 <span aria-hidden="true">↗</span></a>
              </div>
              <div className="knowledge-aside-details">
                <span className="knowledge-card-label">CONTACT</span>
                <p>{siteServiceArea}。</p>
                <address>{siteAddress.addressRegion}{siteAddress.addressLocality}{siteAddress.streetAddress}<br />{siteBusinessHours}<br /><a href={`tel:${phoneNumber}`} data-ga-event="contact_click" data-ga-contact-method="phone" data-ga-cta-location="knowledge_contact">{phoneNumber.replace("+886", "0")}</a><br /><a href={`mailto:${siteEmail}`} data-ga-event="contact_click" data-ga-contact-method="email" data-ga-cta-location="knowledge_contact">{siteEmail}</a></address>
                <a className="text-link" href="/#contact">查看完整聯絡方式 <span aria-hidden="true">↗</span></a>
              </div>
            </aside>
          </div>
        </article>
      </main>

      <footer className="site-footer section-shell"><a className="wordmark" href="/#top" aria-label="新北雙和店｜瑪菲斯皮膚覆蓋專家首頁"><span className="wordmark-mark">M</span><span>新北雙和店｜瑪菲斯皮膚覆蓋專家</span></a><span>紋路美化・科技測色・肌膚知識</span><span>© 2026</span></footer>
      <a className="mobile-sticky-cta" href={facebookUrl} target="_blank" rel="noreferrer" data-ga-event="contact_click" data-ga-contact-method="facebook" data-ga-cta-location="mobile_sticky">立即預約諮詢</a>
    </>
  );
}
