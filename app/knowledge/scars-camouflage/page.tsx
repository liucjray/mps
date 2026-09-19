/* eslint-disable @next/next/no-html-link-for-pages -- static HTML links avoid Vinext client-router hydration issues. */
import type { Metadata } from "next";
import { darkCirclesKnowledgePath, facebookUrl, googleMapsSearchUrl, knowledgeImageUrl, knowledgeIndexPath, lineUrl, organizationId, phoneNumber, scarsCamouflageKnowledgeUrl, sharedOrganizationEntity, siteAddressLine, siteBusinessHours, siteCanonicalUrl, siteEmail, siteName, siteServiceArea, siteTransitInfo, siteUrl, striaeKnowledgePath, stretchMarksKnowledgePath } from "../../site";
import { servicePath } from "../../services";
import { KnowledgeContactCta } from "../../knowledge-contact";
import { SiteNavigation } from "../../site-navigation";

export const dynamic = "force-static";

const pageUrl = scarsCamouflageKnowledgeUrl;
const pageTitle = "白色疤痕與手術痕跡外觀修飾指南";
const pageDescription = "整理白色成熟疤痕與手術痕跡之外觀修飾評估重點。說明疤痕色階調和原理、非醫療安全界線與醫師諮詢原則，提供雙北顧客客觀清楚的美學評估資訊。";
const updatedAt = "2026-09-19";

const faqs = [
  {
    question: "手術或外傷留下的疤痕，大概需要多久才能了解外觀修飾？",
    answer: "皮膚醫學文獻指出，每個人疤痕成熟演變的時間因體質、受傷深度、張力與照護方式而異，通常需要數月至一年以上，待微血管充血退去、外觀轉為穩定淡白。若傷口仍在發紅、腫痛或由醫師追蹤照護中，請配合醫囑；若對成熟與修復狀況有疑慮，建議優先尋求專科醫師評估。雙和店在外觀修飾前，會個別了解在意部位的目前狀態與期望，再說明可能的方向與限制。",
  },
  {
    question: "做完外觀修飾後，疤痕的凹陷或凸起會變平嗎？",
    answer: "不會。美學修飾專注於「視覺色階的平衡」，改善白色疤痕因黑色素缺乏造成的高對比度，無法改變或填補真皮組織的凹凸結構。若有結構性嚴重凹陷或突起，應先諮詢整形外科或皮膚科專科醫師評估醫療處置。",
  },
  {
    question: "所有疤痕都適合皮膚覆蓋嗎？",
    answer: "不能先用單一標準判定。疤痕的型態、顏色、部位與肌膚穩定度各有不同。若傷口尚未完全癒合、伴隨紅腫發炎、疼痛，或具有蟹足腫等異常增生體質疑慮與特殊病史，應優先尋求皮膚科專科醫師診斷評估。雙和店僅提供非醫療美學外觀諮詢，實際適用性需在預約前個別向雙和店確認。",
  },
  {
    question: "外觀修飾後需要注意什麼？",
    answer: "外觀修飾著重於整體視覺色階的調和平衡。由於日曬會使周圍原生正常肌膚加深，進而產生相對視覺落差，日常建議做好常規防曬保護；至於具體的個別說明與注意事項，會在諮詢時依個人膚況進一步溝通。",
  },
  {
    question: "疤痕外觀修飾與一般刺青遮蓋有何不同？",
    answer: "傳統刺青通常使用濃重圖案與色料進行覆蓋遮蔽，視覺存在感較強；雙和店所規劃之皮膚覆蓋術重點在於對照個人周邊原生膚色，進行細緻的色澤對比調和，目標在於降低白疤視覺突兀感，呈現自然的裸膚觀感。",
  },
];

const sources = [
  { name: "美國皮膚科醫學會 AAD：Scars overview & prevention", url: "https://www.aad.org/public/cosmetic/scars-stretch-marks" },
  { name: "美國梅約診所 Mayo Clinic：Keloid scar symptoms and causes", url: "https://www.mayoclinic.org/diseases-conditions/keloid-scar/symptoms-causes/syc-20352090" },
  { name: "美國克利夫蘭醫學中心 Cleveland Clinic：Scars overview & management", url: "https://my.clevelandclinic.org/health/diseases/11030-scars" },
  { name: "英國 NHS：Scars treatments and overview", url: "https://www.nhs.uk/conditions/scars/" },
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
      articleSection: "疤痕外觀評估與肌膚美學知識",
      keywords: ["剖腹產疤痕", "白色疤痕", "手術疤痕", "皮膚覆蓋", "新北疤痕修飾", "中和皮膚覆蓋", "外觀遮瑕"],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: siteName, item: siteCanonicalUrl },
        { "@type": "ListItem", position: 2, name: "知識中心", item: `${siteCanonicalUrl}${knowledgeIndexPath}` },
        { "@type": "ListItem", position: 3, name: "疤痕外觀修飾", item: pageUrl },
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

export default function ScarsCamouflageKnowledgePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <a className="skip-link" href="#main-content">跳至主要內容</a>
      <SiteNavigation faqHref="#faq" />

      <main id="main-content" tabIndex={-1}>
        <nav className="service-breadcrumb section-shell" aria-label="麵包屑導覽">
          <a href="/">首頁</a><span aria-hidden="true">/</span><a href={knowledgeIndexPath}>知識中心</a><span aria-hidden="true">/</span><span aria-current="page">疤痕外觀修飾</span>
        </nav>

        <article className="knowledge-article section-shell">
          <header className="knowledge-article-hero">
            <div className="knowledge-article-copy">
              <div className="section-label">雙和店 / 疤痕外觀評估</div>
              <h1>白色疤痕與手術痕跡外觀修飾，<br /><em>先看懂成熟時機與界線。</em></h1>
              <p>手術痕跡或外傷縫合癒合後留下的淡白色痕跡，常因色差對比而引人注目。本篇解析疤痕生理演變、客觀處置比對與非醫療安全界線，讓你在諮詢前掌握完整資訊。</p>
              <div className="knowledge-article-meta"><span>內容整理：{siteName}</span><span>最後更新：{updatedAt}</span></div>
            </div>
            <div className="knowledge-article-facts" aria-label="疤痕評估核心重點">
              <span className="knowledge-card-label">先知道三件事</span>
              <ol>
                <li><strong>成熟期</strong><span>疤痕成熟時間因人而異；美學修飾主要針對穩定淡白痕跡，若有紅腫發炎應優先尋求專科醫師評估。</span></li>
                <li><strong>調色澤</strong><span>美學修飾著重於平衡白疤與正常膚色之視覺落差，無法改變深層凹凸或消除纖維結構。</span></li>
                <li><strong>看狀態</strong><span>疤痕狀態、穩定度與體質各異，若有醫療疑慮應優先尋求專科醫師評估。</span></li>
              </ol>
            </div>
          </header>

          <div className="knowledge-article-notice">本站提供一般肌膚美學與外觀照護科普資訊，不取代合格醫療專業人員之診斷或治療建議；若有健康疑慮，請先諮詢醫療專業人員。</div>

          <div className="knowledge-article-body">
            <div className="knowledge-article-main">
              <section className="knowledge-article-section" aria-labelledby="physiology-title">
                <div className="section-label">01 / 疤痕的生理演變</div>
                <h2 id="physiology-title">紅疤與白疤有何不同？</h2>
                <p className="knowledge-lede">當皮膚受傷或手術切口深及真皮層時，人體會啟動修復機制合成膠原蛋白進行填補，排列較緊密的纖維結締組織便形成了疤痕。</p>
                <div className="knowledge-callout">
                  <strong>早期充血期（紅疤）</strong>
                  <p>傷口剛癒合的初期，微血管新生充血以輸送養分，外觀呈現鮮紅或紫紅色。臨床醫學常由專科醫師在此階段指導使用醫療級矽膠產品或評估血管雷射介入；美學色階調和主要討論成熟後的淡白痕跡，若疤痕仍在充血發紅，建議優先遵從專科醫師醫囑照護。</p>
                </div>
                <div className="knowledge-callout knowledge-callout-stack">
                  <strong>成熟穩定期（白疤）</strong>
                  <p>歷經數月至一年以上，微血管逐漸萎縮退去，局部黑色素細胞缺乏，留下平整或微萎縮的淡白痕跡。因反射光線與周圍正常膚色產生明顯對比，這正是美學視覺修飾常討論的情境。</p>
                </div>
              </section>

              <section className="knowledge-article-section" aria-labelledby="csection-title">
                <div className="section-label">02 / 手術痕跡評估</div>
                <h2 id="csection-title">常見手術痕跡的照護時間與考量</h2>
                <p className="knowledge-lede">以常見的剖腹產等腹部手術痕跡為例，多位於下腹部恥骨上方，受到日常腹部張力與衣物摩擦影響，組織完全成熟需要充足時間與細心照護。</p>
                <ul className="knowledge-check-list">
                  <li><strong>傷口照護期</strong>：嚴格遵從主治專科醫師醫囑，保持傷口清潔乾燥，按指示使用合規護理耗材。</li>
                  <li><strong>修復觀察期</strong>：注意組織是否有持續異常紅腫、發癢、隆起或硬塊；若有異常反應應優先回診專科醫師。</li>
                  <li><strong>成熟演變期</strong>：醫學文獻指出，疤痕演變因個人體質而異，通常需經歷充足修復期微血管才會逐漸退去。若對修復狀態有疑慮，建議先諮詢專科醫師。</li>
                  <li><strong>個別評估考量</strong>：每個人手術痕跡的狀態與修復進程不同，美學修飾著重於整體視覺協調，需視個別當下肌膚狀態與期望進行溝通。</li>
                </ul>
              </section>

              <section className="knowledge-article-section" aria-labelledby="comparison-title">
                <div className="section-label">03 / 處置途徑客觀比對</div>
                <h2 id="comparison-title">常見疤痕處理方式比較</h2>
                <p className="knowledge-lede">面對成熟白疤或手術痕跡，釐清不同方式的定位有助於建立健康客觀的期待：</p>
                <div className="knowledge-table-wrap" role="region" aria-label="疤痕處理途徑三方客觀比對表" tabIndex={0}>
                  <table className="knowledge-table" aria-label="疤痕處理途徑三方客觀比對表">
                    <thead>
                      <tr>
                        <th scope="col">評估維度</th>
                        <th scope="col">醫療級矽膠產品／外用凝膠</th>
                        <th scope="col">皮膚專科醫療處置（雷射／手術）</th>
                        <th scope="col">雙和店美學外觀修飾</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">主要定位</th>
                        <td>傷口早期保濕封閉、減少張力牽拉</td>
                        <td>組織重整、抑制血管充血或切除修整</td>
                        <td>視覺色階調和、外觀輔助遮瑕</td>
                      </tr>
                      <tr>
                        <th scope="row">作用原理</th>
                        <td>物理封閉保護角質層水份與平整</td>
                        <td>光熱破壞刺激新生或外科重整處置</td>
                        <td>依膚色特質輔助平衡白疤表面視覺對比</td>
                      </tr>
                      <tr>
                        <th scope="row">介入性質</th>
                        <td>醫療器材或外用照護（依產品許可說明）</td>
                        <td>醫療處置（需由合格專科醫師於院所施作）</td>
                        <td>非醫療美容美化與外觀照護</td>
                      </tr>
                      <tr>
                        <th scope="row">主要限制</th>
                        <td>對陳年已成熟之白疤色差改善有限</td>
                        <td>費用與療程因人而異、需承擔醫療風險</td>
                        <td>無法改變真皮凹凸結構，需個別了解適用性</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="knowledge-article-section" aria-labelledby="boundary-title">
                <div className="section-label">04 / 醫療邊界與觀察重點</div>
                <h2 id="boundary-title">什麼情況應優先尋求醫療專業意見？</h2>
                <p className="knowledge-lede">為維護肌膚健康與建立客觀期待，若有以下狀況，建議先諮詢專科醫師或理性評估：</p>
                <ul className="knowledge-check-list">
                  <li><strong>傷口、發炎或異常不適</strong>：若局部仍有分泌物、破損、微血管充血鮮紅、發熱或明顯刺癢者，應優先尋求醫療專業意見，由專科醫師評估修復狀態。</li>
                  <li><strong>蟹足腫（Keloid）與肥厚性疤痕</strong>：醫學文獻指出，蟹足腫或肥厚性疤痕屬於特殊體質表現；若有相關體質疑慮或病史，建議優先尋求皮膚科專科醫師進行專業醫療評估與處置。</li>
                  <li><strong>期待組織凹凸完全消失</strong>：美學修飾著重於改善局部色差對比，無法消除真皮凹凸結構或取代醫療處置；實際服務條件與個別適用性，請於預約前直接向雙和店確認。</li>
                </ul>
              </section>

              <section className="knowledge-article-section" aria-labelledby="process-title">
                <div className="section-label">05 / 諮詢規劃</div>
                <h2 id="process-title">雙和店如何了解您的狀況？</h2>
                <p className="knowledge-lede">雙和店採純預約制，注重個別溝通與隱私保護。諮詢會先從在意的部位與狀態開始了解，再說明目前能討論的方向與限制：</p>
                <ul className="knowledge-check-list">
                  <li><strong>先看色澤與紋理</strong>：初步諮詢會釐清在意的是顏色差異、組織凹凸，或是疤痕與周圍肌膚的視覺落差。</li>
                  <li><strong>不把覆蓋當成醫療治療</strong>：皮膚覆蓋是外觀美化方向的討論，不等同於治療皮膚疾病、傷口或疤痕本身；若有醫療疑慮，應先尋求合格醫療專業意見。</li>
                  <li><strong>依個人狀態說明</strong>：了解部位與肌膚狀態後，再說明可能的方向、限制與注意事項，由您自行決定是否進一步安排。</li>
                </ul>
                <div className="knowledge-article-action">
                  <a className="text-link" href={servicePath("skin-camouflage")} data-ga-event="content_navigation" data-ga-cta-location="knowledge_article">進一步了解皮膚覆蓋術服務專頁 <span aria-hidden="true">↗</span></a>
                </div>
              </section>

              <section className="knowledge-article-section" id="faq" aria-labelledby="faq-title">
                <div className="section-label">06 / 常見問題</div>
                <h2 id="faq-title">關於疤痕修飾，<br /><em>先問清楚。</em></h2>
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
                <p>本頁彙整國際皮膚科醫學會公共衛生資訊與專業臨床共識；外觀修飾美學原則則以雙和店現行公開服務界線為準。來源可能隨醫學進展更新。</p>
                <ul>{sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.name}<span aria-hidden="true">↗</span></a></li>)}</ul>
              </section>
            </div>

            <aside className="knowledge-article-aside" aria-label="雙和店資訊與聯絡方式">
              <div className="knowledge-aside-card">
                <span className="knowledge-card-label">雙和店 / 新北中和</span>
                <h2>想了解自己的疤痕狀態？</h2>
                <p>私訊諮詢前可先整理：① 在意的疤痕或痕跡部位 ② 形成時間與目前是否已平整穩定 ③ 自我觀察到的色差困擾，讓初次溝通更具體。</p>
                <a className="button button-dark" href={facebookUrl} target="_blank" rel="noreferrer" data-ga-event="contact_click" data-ga-contact-method="facebook" data-ga-cta-location="knowledge_aside">雙和店 Facebook 私訊 <span aria-hidden="true">↗</span></a>
                <a className="text-link" href={lineUrl} target="_blank" rel="noreferrer" data-ga-event="contact_click" data-ga-contact-method="line" data-ga-cta-location="knowledge_aside">LINE 預約諮詢 <span aria-hidden="true">↗</span></a>
              </div>
              <div className="service-aside-links">
                <span className="knowledge-card-label">相關閱讀與主題</span>
                <a href={stretchMarksKnowledgePath} data-ga-event="content_navigation" data-ga-cta-location="knowledge_aside_related">妊娠紋是什麼？產後保養 <span aria-hidden="true">↗</span></a>
                <a href={striaeKnowledgePath} data-ga-event="content_navigation" data-ga-cta-location="knowledge_aside_related">肥胖紋與生長紋比對 <span aria-hidden="true">↗</span></a>
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
        <KnowledgeContactCta title="想了解自己的疤痕狀態？" description="先用文字描述痕跡的位置、形成時間與目前是否穩定，再由雙和店說明可以討論的外觀方向；若有紅腫、疼痛或傷口，請先諮詢醫師。" />
      </main>

      <footer className="site-footer section-shell"><a className="wordmark" href="/#top" aria-label="新北雙和店｜瑪菲斯皮膚覆蓋專家首頁"><span className="wordmark-mark">M</span><span>新北雙和店｜瑪菲斯皮膚覆蓋專家</span></a><span>紋路美化・科技測色・肌膚知識</span><span>© 2026</span></footer>
      <a className="mobile-sticky-cta" href={facebookUrl} target="_blank" rel="noreferrer" data-ga-event="contact_click" data-ga-contact-method="facebook" data-ga-cta-location="mobile_sticky">Facebook 私訊預約</a>
    </>
  );
}
