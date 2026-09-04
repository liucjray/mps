/* eslint-disable @next/next/no-html-link-for-pages -- static HTML links avoid Vinext client-router hydration issues. */
import type { Metadata } from "next";
import { darkCirclesKnowledgePath, facebookUrl, googleMapsSearchUrl, knowledgeImageUrl, knowledgeIndexPath, lineUrl, organizationId, phoneNumber, sharedOrganizationEntity, siteAddressLine, siteBusinessHours, siteCanonicalUrl, siteEmail, siteName, siteServiceArea, siteTransitInfo, siteUrl, striaeKnowledgePath, striaeKnowledgeUrl, stretchMarksKnowledgePath } from "../../site";
import { servicePath } from "../../services";

export const dynamic = "force-static";

const pageUrl = striaeKnowledgeUrl;
const pageTitle = "肥胖紋、成長紋與妊娠紋怎麼分？成因差異與外觀評估";
const pageDescription = "整理妊娠紋、肥胖紋與生長紋（萎縮紋）成因、好發部位、紅紋與白紋演變差異，並了解非醫療外觀修飾與雙和店諮詢評估方向。";
const updatedAt = "2026-09-04";

const faqs = [
  {
    question: "肥胖紋、生長紋與妊娠紋本質上是一樣的嗎？",
    answer: "在醫學分類上，它們同屬於「皮膚擴張紋（Striae Distensae）」，都是真皮層彈性纖維與膠原纖維在短時間內受到過度拉扯或荷爾蒙影響而受損產生的線狀紋路。只是發生的誘發時期（懷孕、青春期生長突增、體重增減）與好發部位有所不同。",
  },
  {
    question: "體重瘦下來後，肥胖紋會自己消失嗎？",
    answer: "不會完全消失。減重雖然能減少脂肪組織對皮膚的張力，但已經受損斷裂的真皮纖維結構無法自然完全癒合。隨著時間推移，紅紋多會轉變為淺白色的萎縮白紋，外觀變得較不明顯，但仍會保留在皮膚上。",
  },
  {
    question: "紅色紋路（紅紋）跟白色紋路（白紋）有什麼差別？",
    answer: "紅紋（Striae Rubrae）是紋路形成的早期階段，此時真皮微血管擴張或伴隨微弱發炎，呈現紫紅或粉紅色；白紋（Striae Albae）則是成熟期，微血管退化且膠原結構萎縮，呈現銀白色、淡白或微凹陷的細線。不同階段在醫學與外觀修飾上的討論方向完全不同。",
  },
  {
    question: "生長紋或肥胖紋可以用草本撫紋或皮膚覆蓋修飾嗎？",
    answer: "成熟穩定的白色線狀紋路是外觀修飾常見的討論對象之一。諮詢時會先評估部位、紋理與膚色狀態，若適合則著重於調整紋路與周圍健康肌膚的視覺色階落差。此類服務屬於非醫療美容外觀美化，不具醫療效能，不能宣稱改變真皮層生理構造或保證紋路完全消除。",
  },
  {
    question: "什麼情況應該先尋求合格皮膚科醫師協助？",
    answer: "如果皮膚紋路伴隨非預期的局部疼痛、發炎、破皮傷口、異常發癢，或在沒有明顯體重與成長變化下廣泛出現紫紅色粗寬條紋（需排除內分泌或皮質醇問題），應優先尋求皮膚科或新陳代謝專科醫師診斷。",
  },
];

const sources = [
  { name: "美國皮膚科醫學會 AAD：Stretch marks - Why they appear & treatment", url: "https://www.aad.org/public/cosmetic/scars-stretch-marks/stretch-marks-why-appear" },
  { name: "美國梅約診所 Mayo Clinic：Stretch marks (Striae distensae)", url: "https://www.mayoclinic.org/diseases-conditions/stretch-marks/symptoms-causes/syc-20351144" },
  { name: "英國 NHS：Stretch marks causes and care", url: "https://www.nhs.uk/pregnancy/common-symptoms/stretch-marks/" },
  { name: "台灣食藥署：使用化粧品真的能讓紋路消失嗎？", url: "https://www.fda.gov.tw/tc/newsContent.aspx?id=28618" },
  { name: "Cochrane 系統性回顧：Topical preparations for stretch marks", url: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD000066.pub2/pdf/CDSR/CD000066/CD000066_abstract.pdf" },
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

const websiteId = `${siteCanonicalUrl}#website`;
const pageId = `${pageUrl}#webpage`;
const articleId = `${pageUrl}#article`;
const faqId = `${pageUrl}#faq`;

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
      articleSection: "紋路比較與肌膚美學知識",
      keywords: ["肥胖紋", "成長紋", "生長紋", "妊娠紋", "萎縮紋", "新北皮膚覆蓋", "雙和外觀修飾"],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: siteName, item: siteCanonicalUrl },
        { "@type": "ListItem", position: 2, name: "知識中心", item: `${siteCanonicalUrl}${knowledgeIndexPath}` },
        { "@type": "ListItem", position: 3, name: "肥胖紋與成長紋", item: pageUrl },
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

export default function StriaeComparisonKnowledgePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <a className="skip-link" href="#main-content">跳至主要內容</a>
      <nav className="site-nav" aria-label="主要導覽">
        <a className="wordmark" href="/#top" aria-label="新北雙和店｜瑪菲斯皮膚覆蓋專家首頁"><span className="wordmark-mark">M</span><span>新北雙和店｜瑪菲斯皮膚覆蓋專家</span></a>
        <div className="nav-links"><a href="/#about">品牌理念</a><a href="/#services">服務內容</a><a href={knowledgeIndexPath}>肌膚知識</a><a href="#faq">常見問題</a></div>
        <a className="nav-cta" href={facebookUrl} target="_blank" rel="noreferrer" data-ga-event="contact_click" data-ga-contact-method="facebook" data-ga-cta-location="navigation">Facebook 私訊</a>
        <details className="nav-menu">
          <summary><span className="nav-menu-label-open">選單</span><span className="nav-menu-label-close">關閉</span></summary>
          <div className="nav-menu-panel">
            <a href="/#about">品牌理念</a><a href="/#services">服務內容</a><a href={knowledgeIndexPath}>肌膚知識</a><a href="#faq">常見問題</a>
            <span className="nav-menu-divider">知識專題</span>
            <a href={knowledgeIndexPath} data-ga-event="content_navigation" data-ga-cta-location="nav_menu">知識中心首頁</a>
            <a href={stretchMarksKnowledgePath} data-ga-event="content_navigation" data-ga-cta-location="nav_menu">妊娠紋知識</a>
            <a href={darkCirclesKnowledgePath} data-ga-event="content_navigation" data-ga-cta-location="nav_menu">黑眼圈知識</a>
            <a href={striaeKnowledgePath} data-ga-event="content_navigation" data-ga-cta-location="nav_menu">肥胖紋與生長紋</a>
          </div>
        </details>
      </nav>

      <main id="main-content" tabIndex={-1}>
        <nav className="service-breadcrumb section-shell" aria-label="麵包屑導覽">
          <a href="/">首頁</a><span aria-hidden="true">/</span><a href={knowledgeIndexPath}>知識中心</a><span aria-hidden="true">/</span><span aria-current="page">肥胖紋與生長紋</span>
        </nav>

        <article className="knowledge-article section-shell">
          <header className="knowledge-article-hero">
            <div className="knowledge-article-copy">
              <div className="section-label">雙和店 / 紋路比較知識</div>
              <h1>肥胖紋、成長紋與妊娠紋，<br /><em>究竟有何不同？</em></h1>
              <p>無論是因為青春期發育、體重起伏或懷孕，身體各處出現的條狀細紋常讓人感到困擾。本篇整理醫學上的皮膚擴張紋成因、好發部位與紅白演變差異，讓你在尋求外觀修飾前清楚理解。</p>
              <div className="knowledge-article-meta"><span>內容整理：{siteName}</span><span>最後更新：{updatedAt}</span></div>
            </div>
            <div className="knowledge-article-facts" aria-label="紋路重點摘要">
              <span className="knowledge-card-label">先知道三件事</span>
              <ol>
                <li><strong>同源機轉</strong><span>三者在醫學上同屬擴張紋，主因為真皮彈性纖維受外力或荷爾蒙拉扯。</span></li>
                <li><strong>紅白差異</strong><span>紅紋屬早期充血反應；白紋為成熟期微血管消退後的萎縮痕跡。</span></li>
                <li><strong>修飾邊界</strong><span>外觀美化注重視覺色差修飾，非醫療治療，不保證深層纖維完全復原。</span></li>
              </ol>
            </div>
          </header>

          <div className="knowledge-article-notice">本站提供一般肌膚美學與外觀照護科普資訊，不取代合格醫療專業人員之診斷或治療建議；若有健康疑慮，請先諮詢醫療專業人員。</div>

          <div className="knowledge-article-body">
            <div className="knowledge-article-main">
              <section className="knowledge-article-section" aria-labelledby="origin-title">
                <div className="section-label">01 / 醫學原理與成因</div>
                <h2 id="origin-title">什麼是皮膚擴張紋（Striae Distensae）？</h2>
                <p className="knowledge-lede">皮膚擴張紋（俗稱萎縮紋）是真皮層中的彈性纖維與膠原蛋白結構，在皮膚迅速受到拉伸擴張、或荷爾蒙（如皮質醇）改變結締組織彈性時，發生局部撕裂與結構改變而形成的線狀疤痕樣紋理。</p>
                <p>雖然日常生活常依發生情境賦予不同名稱，但病理生理學上具有高度相似性：</p>
                <ul className="knowledge-check-list">
                  <li><strong>生長紋（Striae Pubertatis）</strong>：青少年發育期快速抽高，骨骼與肌肉成長速度超過皮膚擴張極限時產生，好發於膝蓋上方、大腿內外側、臀部或腰背部。</li>
                  <li><strong>肥胖紋（Striae Distensae）</strong>：短時間內體重快速攀升或脂肪迅速堆積，使深層真皮結締組織承受過度張力牽拉，常見於下腹部、大腿、臀部、手臂蝴蝶袖處。</li>
                  <li><strong>妊娠紋（Striae Gravidarum）</strong>：孕期子宮迅速膨大牽拉腹壁，同時伴隨體內雌激素、鬆弛素與腎上腺皮質素變化，好發於下腹、胸部周圍與臀部。</li>
                </ul>
              </section>

              <section className="knowledge-article-section" aria-labelledby="stages-title">
                <div className="section-label">02 / 顏色的演變進程</div>
                <h2 id="stages-title">紅紋（Striae Rubrae）與白紋（Striae Albae）</h2>
                <p className="knowledge-lede">擴張紋的視覺外觀並非一成不變，而是經歷從初期充血到後期萎縮的過程。</p>
                <div className="knowledge-callout">
                  <strong>紅紋階段（早期）</strong>
                  <p>真皮微血管擴張，局部可見微弱發炎反應，外觀呈現粉紅、紫紅或暗紅色。此時紋路可能觸感微突或平整，若有醫療介入（如染料雷射或皮膚科醫師處方外用藥），通常在此階段效果較具討論空間。</p>
                </div>
                <div className="knowledge-callout" style={{ marginTop: "16px" }}>
                  <strong>白紋階段（成熟期）</strong>
                  <p>經過數月至數年後，局部發炎反應消退，微血管萎縮，真皮膠原纖維與彈性結構退化萎縮，上方表皮層失去深層支撐而變薄，呈現銀白色或淡白色條紋，觸感常有微小凹陷或細微皺褶。</p>
                </div>
              </section>

              <section className="knowledge-article-section" aria-labelledby="clarify-title">
                <div className="section-label">03 / 常見名詞混淆釐清</div>
                <h2 id="clarify-title">容易與擴張紋混淆的外觀困擾</h2>
                <p className="knowledge-lede">在評估肌膚美學方案前，釐清自己的皮膚狀況究竟屬於何種型態十分重要：</p>
                <ul className="knowledge-check-list">
                  <li><strong>妊娠線（Linea Nigra）</strong>：懷孕期間荷爾蒙增加刺激黑色素細胞，使腹中線色素沉澱變黑。這是單純色素沉積，真皮結構並未受損，產後通常數月至一年會自然漸褪，不屬於擴張紋。</li>
                  <li><strong>橘皮組織（Cellulite）</strong>：皮下脂肪細胞向真皮層結締組織突出所形成的團塊凹凸不平（海綿狀外觀），與真皮纖維撕裂產生的線狀紋理不同。</li>
                  <li><strong>手術或外傷疤痕</strong>：皮膚受外力切割破壞至真皮深層後的癒合產物，其纖維化硬度與色澤演變路徑與單純張力擴張紋不同。</li>
                </ul>
              </section>

              <section className="knowledge-article-section" aria-labelledby="care-title">
                <div className="section-label">04 / 外觀修飾與日常照護</div>
                <h2 id="care-title">保養品的極限與美學修飾方向</h2>
                <p className="knowledge-lede">許多人發現紋路後會嘗試大量塗抹精油或緊緻乳霜，但必須建立正確的期待：</p>
                <p>醫學文獻（如 Cochrane 系統性回顧）指出，一般的保濕霜或油脂能改善角質層乾燥與舒緩緊繃感，但難以穿透真皮層以逆轉已受損斷裂的彈力纖維。減重後，肥胖紋也不會憑空消失，而是轉為穩定的白紋。</p>
                <p>若想了解成熟穩定的白色線狀紋路是否適合討論外觀修飾，雙和店在諮詢時會先從在意的部位、紋理與膚色狀態開始評估，說明目前能討論的美化方向與限制：</p>
                <ul className="knowledge-check-list">
                  <li><strong>色彩與明暗對比</strong>：著重於透過科技測色比對周邊自然膚色，微調白紋與底色之色階落差。</li>
                  <li><strong>尊重自然膚況</strong>：不強求填平凹凸微結構，而是追求在日常社交光線下的視覺和諧感。</li>
                  <li><strong>非醫療美學邊界</strong>：屬於外觀修飾服務，不宣稱醫療診斷或治療效能，亦不保證讓紋路完全消除。實際適用條件與服務細節需在預約前向雙和店確認。</li>
                </ul>
                <div style={{ marginTop: "24px" }}>
                  <a className="text-link" href="/services/skin-camouflage" data-ga-event="content_navigation" data-ga-cta-location="knowledge_article">認識雙和店的皮膚覆蓋技術 <span aria-hidden="true">↗</span></a>
                </div>
              </section>

              <section className="knowledge-article-section" id="faq" aria-labelledby="faq-title">
                <div className="section-label">05 / 常見問題</div>
                <h2 id="faq-title">關於肥胖紋與生長紋，<br /><em>先問清楚。</em></h2>
                <div className="faq-list knowledge-faq-list">
                  {faqs.map(({ question, answer }) => (
                    <details key={question}>
                      <summary>{question}<span>＋</span></summary>
                      <div className="faq-answer"><p>{answer}</p></div>
                    </details>
                  ))}
                </div>
              </section>

              <section className="knowledge-article-sources" aria-labelledby="sources-title">
                <div className="section-label">資料來源</div>
                <h2 id="sources-title">這些內容從哪裡來？</h2>
                <p>本頁彙整國際皮膚科醫學期刊、公共衛生資訊與專業醫學組織共識；外觀修飾美學原則則以雙和店現行公開服務界線為準。來源可能隨醫學進展更新。</p>
                <ul>{sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.name}<span aria-hidden="true">↗</span></a></li>)}</ul>
              </section>
            </div>

            <aside className="knowledge-article-aside" aria-label="雙和店資訊與聯絡方式">
              <div className="knowledge-aside-card">
                <span className="knowledge-card-label">雙和店 / 新北中和</span>
                <h2>想了解自己的紋路型態？</h2>
                <p>私訊諮詢前可先準備：① 在意部位 ② 出現時間與狀態 ③ 自然光清楚近照，讓初次溝通更精準。</p>
                <a className="button button-dark" href={facebookUrl} target="_blank" rel="noreferrer" data-ga-event="contact_click" data-ga-contact-method="facebook" data-ga-cta-location="knowledge_aside">雙和店 Facebook 私訊 <span aria-hidden="true">↗</span></a>
                <a className="text-link" href={lineUrl} target="_blank" rel="noreferrer" data-ga-event="contact_click" data-ga-contact-method="line" data-ga-cta-location="knowledge_aside">LINE 預約諮詢 <span aria-hidden="true">↗</span></a>
              </div>
              <div className="service-aside-links">
                <span className="knowledge-card-label">相關閱讀與主題</span>
                <a href={stretchMarksKnowledgePath} data-ga-event="content_navigation" data-ga-cta-location="knowledge_aside_related">妊娠紋是什麼？產後保養 <span aria-hidden="true">↗</span></a>
                <a href={darkCirclesKnowledgePath} data-ga-event="content_navigation" data-ga-cta-location="knowledge_aside_related">黑眼圈成因與外觀評估 <span aria-hidden="true">↗</span></a>
                <a href={knowledgeIndexPath} data-ga-event="content_navigation" data-ga-cta-location="knowledge_aside_related">知識中心全專題 <span aria-hidden="true">↗</span></a>
                <a href={servicePath("skin-camouflage")} data-ga-event="content_navigation" data-ga-cta-location="knowledge_aside_related">皮膚覆蓋術專頁 <span aria-hidden="true">↗</span></a>
              </div>
              <div className="knowledge-aside-details">
                <span className="knowledge-card-label">CONTACT</span>
                <p>{siteServiceArea}。</p>
                <address>{siteAddressLine}{" "}<a className="contact-map-link" href={googleMapsSearchUrl} target="_blank" rel="noreferrer" data-ga-event="contact_click" data-ga-contact-method="map" data-ga-cta-location="knowledge_contact">地圖導航 <span aria-hidden="true">↗</span></a><br />{siteTransitInfo}<br />{siteBusinessHours}<br /><a href={`tel:${phoneNumber}`} data-ga-event="contact_click" data-ga-contact-method="phone" data-ga-cta-location="knowledge_contact">{phoneNumber.replace("+886", "0")}</a><br /><a href={`mailto:${siteEmail}`} data-ga-event="contact_click" data-ga-contact-method="email" data-ga-cta-location="knowledge_contact">{siteEmail}</a></address>
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
