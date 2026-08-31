/* eslint-disable @next/next/no-html-link-for-pages -- static HTML links avoid Vinext client-router hydration issues. */
import type { Metadata } from "next";
import { facebookUrl, instagramUrl, knowledgeImageUrl, lineUrl, phoneNumber, siteAddress, siteBusinessHours, siteCanonicalUrl, siteDescription, siteEmail, siteName, siteServiceArea, siteUrl } from "../../site";
import { darkCirclesPath, darkCirclesUrl, servicePath } from "../../services";

export const dynamic = "force-static";
export const dynamicParams = false;

const parentSlug = "beauty-education";
const pageTitle = "黑眼圈怎麼看？成因與外觀評估";
const pageDescription = "整理黑眼圈常見的色澤、陰影與眼周狀態差異，了解新北雙和與台北肌膚美學諮詢前可以先觀察什麼。";
const updatedAt = "2026-08-30";

const faqs = [
  {
    question: "黑眼圈只有睡不飽造成的嗎？",
    answer: "不一定。黑眼圈可能和遺傳、疲勞、日曬、眼周刺激或搔抓、皮膚色素變化與年齡變化等因素相關；有時看起來像黑眼圈的，其實是眼袋浮腫或眼下凹陷形成的陰影。",
  },
  {
    question: "黑眼圈和淚溝、眼袋是一樣的嗎？",
    answer: "不完全一樣。黑眼圈通常是在描述眼下顏色變深，淚溝或眼袋則比較常用來描述凹陷、隆起與陰影。不同狀態可能同時存在，因此不能只用一個名稱判斷適合的方向。",
  },
  {
    question: "黑眼圈可以做皮膚覆蓋嗎？",
    answer: "不能只看名稱先判定。若主要是色澤落差，可以把外觀美學評估作為討論起點；但眼周皮膚薄且敏感，是否適合皮膚覆蓋、可討論的範圍與限制，都需要先由服務方了解個別狀況。這不等同於治療黑眼圈或眼周疾病。",
  },
  {
    question: "想改善黑眼圈，諮詢前要準備什麼？",
    answer: "可以記下黑眼圈出現或變明顯的時間、左右是否不同、在什麼光線下最明顯，以及是否伴隨乾癢、脫皮、紅腫或疼痛。若要提供照片，建議在自然光、無濾鏡與不過度遮瑕的情況下拍攝，讓初步溝通更接近實際狀態。",
  },
  {
    question: "眼下只有一側變深，需要看醫生嗎？",
    answer: "如果只有單側出現變化，且持續加重，或同時有疼痛、紅腫、明顯搔癢、皮膚病灶、視力變化等情況，建議先諮詢合格醫療專業人員。本站內容不能取代診斷或治療。",
  },
];

const sources = [
  { name: "PubMed：Infraorbital Dark Circles — A Review of the Pathogenesis, Evaluation and Treatment", url: "https://pubmed.ncbi.nlm.nih.gov/27398005/" },
  { name: "PubMed：Periorbital Discolouration Diagnosis and Treatment — Evidence-Based Review", url: "https://pubmed.ncbi.nlm.nih.gov/34078228/" },
  { name: "PubMed：Treatments of Periorbital Hyperpigmentation — A Systematic Review", url: "https://pubmed.ncbi.nlm.nih.gov/32740208/" },
  { name: "美國過敏、氣喘與免疫學會 ACAAI：Eye Allergies", url: "https://acaai.org/allergies/allergic-conditions/eye-allergy/" },
  { name: "Mayo Clinic：Dark circles under eyes — causes and definition", url: "https://www.mayoclinic.org/symptoms/dark-circles-under-eyes/basics/causes/sym-20050624" },
  { name: "Mayo Clinic：Bags under eyes — symptoms and causes", url: "https://www.mayoclinic.org/diseases-conditions/bags-under-eyes/symptoms-causes/syc-20369927" },
  { name: "Cleveland Clinic：Allergic Shiners", url: "https://my.clevelandclinic.org/health/diseases/allergic-shiners" },
];

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  authors: [{ name: siteName, url: siteCanonicalUrl }],
  creator: siteName,
  publisher: siteName,
  alternates: { canonical: darkCirclesUrl },
  openGraph: {
    title: `${pageTitle}｜${siteName}`,
    description: pageDescription,
    type: "article",
    locale: "zh_TW",
    url: darkCirclesUrl,
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
const pageId = `${darkCirclesUrl}#webpage`;
const articleId = `${darkCirclesUrl}#article`;

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
      url: darkCirclesUrl,
      name: pageTitle,
      description: pageDescription,
      inLanguage: "zh-Hant-TW",
      dateModified: updatedAt,
      isPartOf: { "@id": websiteId },
      author: { "@id": organizationId },
      publisher: { "@id": organizationId },
      about: "https://schema.org/HealthAndBeautyBusiness",
      mainEntity: { "@id": articleId },
      breadcrumb: { "@id": `${darkCirclesUrl}#breadcrumb` },
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
      articleSection: "黑眼圈與眼周肌膚知識",
      keywords: ["黑眼圈", "黑眼圈成因", "過敏性黑眼圈", "黑眼圈外觀評估", "新北黑眼圈", "中和黑眼圈", "台北黑眼圈"],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${darkCirclesUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: siteName, item: siteCanonicalUrl },
        { "@type": "ListItem", position: 2, name: "局部美學與科普", item: `${siteUrl}${servicePath(parentSlug)}` },
        { "@type": "ListItem", position: 3, name: "黑眼圈", item: darkCirclesUrl },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${darkCirclesUrl}#faq`,
      inLanguage: "zh-Hant-TW",
      mainEntity: faqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

export function DarkCirclesContent() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <a className="skip-link" href="#main-content">跳至主要內容</a>
      <nav className="site-nav" aria-label="主要導覽">
        <a className="wordmark" href="/#top" aria-label="新北雙和店｜瑪菲斯皮膚覆蓋專家首頁"><span className="wordmark-mark">M</span><span>新北雙和店｜瑪菲斯皮膚覆蓋專家</span></a>
        <div className="nav-links"><a href="/#about">品牌理念</a><a href="/#services">服務內容</a><a href="/#knowledge">肌膚知識</a><a href="/#faq">常見問題</a></div>
        <a className="nav-cta" href={facebookUrl} target="_blank" rel="noreferrer" data-ga-event="contact_click" data-ga-contact-method="facebook" data-ga-cta-location="navigation">Facebook 私訊</a>
        <details className="nav-menu">
          <summary><span /></summary>
          <div className="nav-menu-panel">
            <a href="/#about">品牌理念</a><a href="/#services">服務內容</a><a href="/#knowledge">肌膚知識</a><a href="/#faq">常見問題</a>
            <span className="nav-menu-divider">知識文章</span>
            <a href="/knowledge/stretch-marks" data-ga-event="content_navigation" data-ga-cta-location="nav_menu">妊娠紋知識</a>
            <a href="/knowledge/dark-circles" data-ga-event="content_navigation" data-ga-cta-location="nav_menu">黑眼圈知識</a>
          </div>
        </details>
      </nav>

      <main id="main-content">
        <nav className="service-breadcrumb section-shell" aria-label="麵包屑導覽">
          <a href="/">首頁</a><span aria-hidden="true">/</span><a href={servicePath(parentSlug)}>局部美學與科普</a><span aria-hidden="true">/</span><span aria-current="page">黑眼圈</span>
        </nav>

        <article className="knowledge-article section-shell">
          <header className="knowledge-article-hero">
            <div className="knowledge-article-copy">
              <div className="section-label">雙和店 / 黑眼圈知識</div>
              <h1>黑眼圈怎麼看？<br /><em>先分辨色澤與陰影。</em></h1>
              <p>黑眼圈不一定只有一種成因，也不一定只是睡眠不足。這一頁先整理色澤、陰影、浮腫與眼周狀態的差異，讓你在討論皮膚覆蓋或其他外觀美學方向前，先把自己在意的問題說清楚。</p>
              <div className="knowledge-article-meta"><span>內容整理：{siteName}</span><span>最後更新：{updatedAt}</span></div>
            </div>
            <div className="knowledge-article-facts" aria-label="黑眼圈重點摘要">
              <span className="knowledge-card-label">先知道三件事</span>
              <ol>
                <li><strong>多因素</strong><span>黑眼圈可能和色澤、過敏、眼周刺激、疲勞或遺傳等因素相關。</span></li>
                <li><strong>有陰影</strong><span>眼袋浮腫或眼下凹陷，可能讓眼下看起來更深。</span></li>
                <li><strong>先評估</strong><span>左右差異、光線、持續時間與伴隨症狀都值得記下來。</span></li>
              </ol>
            </div>
          </header>

          <div className="knowledge-article-notice">本站提供一般肌膚美學與外觀照護資訊，不取代醫療診斷或治療建議；若有單側持續變化、紅腫、疼痛、視力變化或其他健康疑慮，請先諮詢合格醫療專業人員。</div>

          <div className="knowledge-article-body">
            <div className="knowledge-article-main">
              <section className="knowledge-article-section" aria-labelledby="what-title">
                <div className="section-label">01 / 先把名詞說清楚</div>
                <h2 id="what-title">黑眼圈是什麼？</h2>
                <p className="knowledge-lede">黑眼圈通常是在描述眼下皮膚看起來比平常深的外觀變化，不是一個只有單一成因的名稱。</p>
                <p>常見相關因素可能包含遺傳、疲勞、日曬、眼周刺激或搔抓、皮膚色素變化與年齡變化。有時看起來像黑眼圈的，其實是眼袋浮腫或眼下凹陷造成的陰影，因此「顏色變深」與「光影變化」需要分開理解。</p>
              </section>

              <section className="knowledge-article-section" aria-labelledby="difference-title">
                <div className="section-label">02 / 先分辨外觀差異</div>
                <h2 id="difference-title">你看到的是色澤，<br /><em>還是眼下的影子？</em></h2>
                <p className="knowledge-lede">同樣被稱為黑眼圈，實際在意的可能是不同問題。先用自己的觀察描述狀態，比急著選一個方法更重要。</p>
                <ul className="knowledge-check-list">
                  <li>色澤：在不同光線下，眼下仍呈現棕、灰、紫或較深的顏色。</li>
                  <li>陰影：隨著光線、表情或角度改變，深色感可能跟著變化。</li>
                  <li>浮腫與凹陷：眼袋、泡泡眼或淚溝的輪廓落差，可能讓眼下看起來更暗。</li>
                </ul>
              </section>

              <section className="knowledge-article-section" aria-labelledby="allergy-title">
                <div className="section-label">03 / 別漏掉過敏與鼻塞</div>
                <h2 id="allergy-title">過敏，<br /><em>也可能讓眼下變深。</em></h2>
                <p className="knowledge-lede">鼻過敏造成的鼻塞，可能讓眼下出現較深的顏色或些微浮腫，英文資料常稱為 allergic shiners，也就是「過敏性黑眼圈」。</p>
                <p>如果黑眼圈在換季、鼻塞或眼睛癢時更明顯，並同時有打噴嚏、流鼻水、揉眼等情況，這些線索都值得在看診或諮詢時一併說明。過敏可能是相關因素之一，但不能只看到黑眼圈就自行判定是過敏。</p>
                <div className="knowledge-callout"><strong>先分清楚</strong><p>處理過敏、減少揉眼，與討論眼周外觀美化是不同事情。若症狀持續或影響生活，請先向醫師或過敏專業人員確認。</p></div>
              </section>

              <section className="knowledge-article-section" aria-labelledby="camouflage-title">
                <div className="section-label">04 / 外觀美化前先了解</div>
                <h2 id="camouflage-title">黑眼圈可以做皮膚覆蓋嗎？</h2>
                <p className="knowledge-lede">如果主要困擾是色澤落差，可以把外觀美學評估作為討論起點；但眼周皮膚薄且敏感，不能只憑名稱或網路案例判定是否適合。</p>
                <p>若深色感主要來自凹陷、浮腫或光線形成的陰影，單純處理顏色不一定能處理造成陰影的原因。雙和店諮詢會先了解在意的部位、顏色、左右差異與肌膚狀態，再說明能討論的方向與限制；皮膚覆蓋也不等同於治療黑眼圈或眼周疾病。</p>
                <a className="text-link" href={servicePath("skin-camouflage")} data-ga-event="content_navigation" data-ga-cta-location="knowledge_article">了解皮膚覆蓋術服務說明 <span aria-hidden="true">↗</span></a>
              </section>

              <section className="knowledge-article-section" aria-labelledby="prepare-title">
                <div className="section-label">05 / 諮詢前先整理</div>
                <h2 id="prepare-title">把你的觀察，<br /><em>變成好溝通的資訊。</em></h2>
                <p className="knowledge-lede">預約前不需要先替自己下診斷，可以先整理「什麼時候最明顯」與「還有沒有其他症狀」。</p>
                <ul className="knowledge-check-list">
                  <li>記下出現或變明顯的時間，以及左右是否有差異。</li>
                  <li>觀察自然光、室內光與不同角度下，深色感是否改變。</li>
                  <li>若有乾癢、脫皮、紅腫、疼痛或視力變化，先尋求醫療專業意見。</li>
                </ul>
                <a className="text-link" href={darkCirclesPath} data-ga-event="content_navigation" data-ga-cta-location="knowledge_article">回到黑眼圈頁面開頭 <span aria-hidden="true">↑</span></a>
              </section>

              <section className="knowledge-article-section knowledge-article-faq" id="faq" aria-labelledby="faq-title">
                <div className="section-label">06 / 常見問題</div>
                <h2 id="faq-title">關於黑眼圈，<br /><em>先問清楚。</em></h2>
                <div className="faq-list knowledge-faq-list">
                  {faqs.map(({ question, answer }) => <details key={question}><summary>{question}<span>＋</span></summary><div className="faq-answer"><p>{answer}</p></div></details>)}
                </div>
              </section>

              <section className="knowledge-article-sources" aria-labelledby="sources-title">
                <div className="section-label">資料來源</div>
                <h2 id="sources-title">這些內容從哪裡來？</h2>
                <p>本頁內容依公開研究與醫療機構資料整理，涵蓋黑眼圈的多因素分類、眼袋與陰影，以及過敏性黑眼圈；品牌服務內容則以雙和店目前公開的服務範圍為準。</p>
                <ul>{sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.name}<span aria-hidden="true">↗</span></a></li>)}</ul>
              </section>
            </div>

            <aside className="knowledge-article-aside" aria-label="雙和店資訊與聯絡方式">
              <div className="knowledge-aside-card">
                <span className="knowledge-card-label">雙和店 / 新北中和</span>
                <h2>想了解自己的眼周狀態？</h2>
                <p>可以先整理在意的顏色、左右差異與照片，再向雙和店說明想了解的方向。</p>
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

export default function DarkCirclesPage() {
  return <DarkCirclesContent />;
}
