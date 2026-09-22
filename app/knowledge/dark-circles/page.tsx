/* eslint-disable @next/next/no-html-link-for-pages -- static HTML links avoid Vinext client-router hydration issues. */
import type { Metadata } from "next";
import { facebookUrl, googleMapsSearchUrl, knowledgeImageUrl, knowledgeIndexPath, lineUrl, organizationId, phoneNumber, scarsCamouflageKnowledgePath, sharedOrganizationEntity, siteAddressLine, siteBusinessHours, siteCanonicalUrl, siteEmail, siteName, siteServiceArea, siteTransitInfo, siteUrl, striaeKnowledgePath, stretchMarksKnowledgePath } from "../../site";
import { darkCirclesUrl, servicePath } from "../../services";
import { KnowledgeContactCta } from "../../knowledge-contact";
import { SiteNavigation } from "../../site-navigation";

export const dynamic = "force-static";
export const dynamicParams = false;

const parentSlug = "beauty-education";
const pageTitle = "黑眼圈怎麼看？成因、分類與外觀評估";
const pageDescription = "整理黑眼圈四大類型（色素型、血管型、結構型、混合型）成因與外觀辨析表。介紹眼下皮膚拉平測試、處置途徑三方客觀比對與諮詢前評估重點。";
const publishedAt = "2026-08-30";
const updatedAt = "2026-09-22";

const faqs = [
  {
    question: "黑眼圈只有睡不飽造成的嗎？",
    answer: "不一定。黑眼圈是多因素共同作用的外觀呈現，包括遺傳體質、日曬、反覆搔抓、眼周微血管充血，以及隨年齡增長產生的眼窩脂肪凸出或凹陷；睡眠不足常使微血管淤血更明顯，但不是唯一的成因。",
  },
  {
    question: "黑眼圈和淚溝、眼袋是一樣的嗎？",
    answer: "不完全一樣。黑眼圈是指下眼瞼與眼周呈現暗沉的外觀表現，成因涵蓋表皮色素沉積、皮下微血管充血淤積，以及眼周骨骼或組織凹陷形成的立體陰影；淚溝與眼袋則特指皮下組織流失凹陷或眼眶脂肪膨出造成的立體輪廓落差。當光線由上方照射時，淚溝或眼袋的立體起伏會投射出陰影加深暗沉感，兩者經常同時存在。",
  },
  {
    question: "口語常說的「眼窩凹陷黑眼圈」是什麼意思？",
    answer: "「眼窩凹陷黑眼圈」是口語說法，多數情況指眼周因骨骼、淚溝或周圍組織凹陷形成的立體陰影，與本頁分類中的結構型黑眼圈屬於同一類外觀成因，但不是唯一可能。若凹陷是新近出現、單側、持續加重，或伴隨其他不適，可能屬於需要專科評估的健康變化，不宜逕自視為外觀成因，應優先尋求眼科或皮膚科專科醫師診斷。若眼周肌膚健康、沒有上述情形，也無紅腫發炎或不適，才可對照上方類型辨析表，或透過輕拉測試觀察光影變化作為輔助釐清；此觀察僅供個人初步理解，不可取代專科醫師診斷。",
  },
  {
    question: "過敏性鼻炎造成的黑眼圈，可以靠擦眼霜改善或淡化嗎？",
    answer: "一般外用保養品無法解決深層鼻塞與靜脈淤血問題。過敏性鼻炎引發的鼻腔充血常影響眼周靜脈回流，導致下眼瞼微血管血液淤積，外觀呈現青紫色的過敏性黑眼圈（醫學上常稱為 Allergic Shiners）；日常眼霜主要提供表皮角質滋潤，若想減輕血管型深色感，應優先遵從專科醫師醫囑控制過敏症狀。",
  },
  {
    question: "眼下有明顯淚溝或眼袋，外觀美學修飾看得出差別嗎？",
    answer: "淚溝與眼袋屬於皮下組織或骨骼架構的立體光影問題。美學修飾著重於平衡表面色澤深淺與社交距離下的視覺對比，無法改變或填平立體凹凸結構；若想實質改善立體輪廓，建議優先尋求整形外科或皮膚專科醫師評估醫療處置。",
  },
  {
    question: "黑眼圈可以做皮膚覆蓋嗎？",
    answer: "不能只看名稱判定。眼周皮膚極薄且周圍神經微血管密集，是否適合討論外觀色彩調和，取決於眼周肌膚的健康狀態、色素深淺與個人期待。雙和店採純預約制諮詢，會先個別了解在意部位與膚況，再說明能討論的方向與限制，不宣稱醫療效能。",
  },
  {
    question: "眼下只有一側變深或伴隨疼痛，需要看醫生嗎？",
    answer: "若眼周出現單側持續加重之深色變化，或同時伴隨紅腫、熱痛、明顯搔癢、皮疹、凸起硬塊或視力變化，應優先尋求皮膚科或眼科專科醫師診斷，切勿當成一般美容色差問題處理。",
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

const websiteId = `${siteCanonicalUrl}#website`;
const pageId = `${darkCirclesUrl}#webpage`;
const articleId = `${darkCirclesUrl}#article`;

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
      datePublished: publishedAt,
      dateModified: updatedAt,
      inLanguage: "zh-Hant-TW",
      author: { "@id": organizationId },
      publisher: { "@id": organizationId },
      mainEntityOfPage: { "@id": pageId },
      articleSection: "黑眼圈與眼周肌膚知識",
      keywords: [
        "黑眼圈",
        "黑眼圈成因",
        "過敏性黑眼圈",
        "色素型黑眼圈",
        "血管型黑眼圈",
        "結構型黑眼圈",
        "黑眼圈拉平測試",
        "黑眼圈外觀評估",
        "眼窩凹陷黑眼圈",
        "新北黑眼圈",
        "中和黑眼圈",
        "台北黑眼圈",
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${darkCirclesUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: siteName, item: siteCanonicalUrl },
        { "@type": "ListItem", position: 2, name: "知識中心", item: `${siteCanonicalUrl}${knowledgeIndexPath}` },
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
      <SiteNavigation faqHref="#faq" />

      <main id="main-content" tabIndex={-1}>
        <nav className="service-breadcrumb section-shell" aria-label="麵包屑導覽">
          <a href="/">首頁</a><span aria-hidden="true">/</span><a href={knowledgeIndexPath}>知識中心</a><span aria-hidden="true">/</span><span aria-current="page">黑眼圈外觀評估</span>
        </nav>

        <article className="knowledge-article section-shell">
          <header className="knowledge-article-hero">
            <div className="knowledge-article-copy">
              <div className="section-label">雙和店 / 黑眼圈知識</div>
              <h1>黑眼圈怎麼看？<br /><em>先分辨色澤、血管與立體陰影。</em></h1>
              <p>黑眼圈不一定只有一種成因，更不單純只是睡眠不足。本篇整理醫學文獻的四大類型辨析、眼下輕拉測試（Pinch Test）與客觀處置比對，讓你在諮詢前先把自己在意的困擾說清楚。</p>
              <div className="knowledge-article-meta"><span>內容整理：{siteName}</span><span>最後更新：{updatedAt}</span></div>
            </div>
            <div className="knowledge-article-facts" aria-label="黑眼圈重點摘要">
              <span className="knowledge-card-label">先知道三件事</span>
              <ol>
                <li><strong>多因素</strong><span>黑眼圈常為色素沉澱、血管充血或立體陰影多重因素交織。</span></li>
                <li><strong>拉測試</strong><span>輕拉眼下皮膚或仰頭觀察光線，可輔助辨析深色主要來源。</span></li>
                <li><strong>分界線</strong><span>美學修飾著重於表面視覺色階平衡，無法填平立體結構凹凸。</span></li>
              </ol>
            </div>
          </header>

          <div className="knowledge-article-notice">本站提供一般肌膚美學與外觀照護資訊，不取代醫療診斷或治療建議；若有單側持續變化、紅腫、疼痛、視力變化或其他健康疑慮，請先諮詢合格醫療專業人員。</div>

          <div className="knowledge-article-body">
            <div className="knowledge-article-main">
              <section className="knowledge-article-section" aria-labelledby="what-title">
                <div className="section-label">01 / 先把名詞說清楚</div>
                <h2 id="what-title">黑眼圈是什麼？成因與生理機制</h2>
                <p className="knowledge-lede">黑眼圈（Periorbital Dark Circles / Infraorbital Dark Circles）是在描述下眼瞼周圍皮膚比正常膚色顯得暗沉的視覺外觀，並非單一疾病或單純疲勞所致；其中若由黑色素過度沉積主導，在醫學上常稱為眼周色素沉著（Periorbital Hyperpigmentation, POH）。</p>
                <p>人體眼下皮膚厚度僅約 0.5 毫米，是全身皮膚中最薄的部位之一，皮下脂肪層極薄甚至缺乏。這意味著皮下的微血管網、深層色素沉著，或是眼眶骨骼的凹陷落差，都會極為敏銳地穿透或投射於外觀表面。因此，「表面色素顏色」、「微血管淤血深淺」與「骨骼眼袋光影」需要精確分開理解。</p>
              </section>

              <section className="knowledge-article-section" aria-labelledby="types-title">
                <div className="section-label">02 / 四大類型辨析</div>
                <h2 id="types-title">常見黑眼圈的四大類型特徵</h2>
                <p className="knowledge-lede">國際皮膚醫學文獻通常根據主導因素，將黑眼圈細分為四大表現型態：</p>
                <div className="knowledge-table-wrap" role="region" aria-label="黑眼圈四大類型成因與外觀辨析表" tabIndex={0}>
                  <table className="knowledge-table" aria-label="黑眼圈四大類型成因與外觀辨析表">
                    <thead>
                      <tr>
                        <th scope="col">類型名稱</th>
                        <th scope="col">主導成因</th>
                        <th scope="col">視覺外觀特徵</th>
                        <th scope="col">光線與角度反應</th>
                        <th scope="col">拉平皮膚測試反應</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">色素型（Pigmented）</th>
                        <td>真皮或表皮黑色素過度沉積、日曬紫外線刺激、異位性皮膚炎反覆搔抓摩擦</td>
                        <td>呈現茶褐色、咖啡色或灰黑色片狀斑塊，常圍繞上下眼瞼周圍</td>
                        <td>改變環境光源或觀察角度，深色痕跡無明顯明暗變化</td>
                        <td>輕拉眼下皮膚，深色痕跡依然清晰，顏色甚至隨皮膚變薄更集中</td>
                      </tr>
                      <tr>
                        <th scope="row">血管型（Vascular）</th>
                        <td>眼周皮下脂肪薄、微血管充血淤積、過敏性鼻炎、長期熬夜或眼部用眼過度</td>
                        <td>呈現青藍色、紫紅色或暗粉色，好發於內側眼角至眼球下方微血管密集處</td>
                        <td>在疲勞或鼻塞時顏色加深；局部皮膚溫熱放鬆時可能微幅變淺</td>
                        <td>輕拉眼下皮膚推開微血管時，紫藍感可能短暫稍微變淡</td>
                      </tr>
                      <tr>
                        <th scope="row">結構型（Structural）</th>
                        <td>眼眶骨骼或眼窩區域凹陷、淚溝凹溝、眼袋脂肪凸出造成之立體落差與光影投射</td>
                        <td>呈現陰影暗沉感，常伴隨眼袋浮腫或淚溝凹溝線條</td>
                        <td>光線由正上方照射時陰影最重；仰頭面朝光源時陰影明顯淡化或消失</td>
                        <td>撫平眼下凹凸或仰頭時，立體陰影隨之消失</td>
                      </tr>
                      <tr>
                        <th scope="row">混合型（Mixed）</th>
                        <td>同時合併兩種或多種因素（臨床上最為普遍，如過敏血管型伴隨眼窩凹陷陰影）</td>
                        <td>呈現紫棕色或複雜暗沉感，兼具立體陰影與表面色澤落差</td>
                        <td>具備多重光影特徵，在不同光源下深淺感受各有不同</td>
                        <td>拉平皮膚後部分色斑依然存在，但立體陰影部分減弱</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="knowledge-article-section" aria-labelledby="pinch-test-title">
                <div className="section-label">03 / 居家觀察工具</div>
                <h2 id="pinch-test-title">居家自我檢測：眼下皮膚「輕拉測試」</h2>
                <p className="knowledge-lede">國際皮膚醫學回顧文獻（如 PubMed: 27398005）在探討眼周外觀觀察時，提及可藉由角度光影轉換或極輕柔展開細紋輔助視診，但強調任何眼周肌膚在牽拉或受光角度改變時外觀皆會變化，無法取代專科醫師之皮膚鏡或伍氏燈（Wood&apos;s lamp）臨床鑑別：</p>
                <div className="knowledge-callout knowledge-callout-mb">
                  <strong>安全注意與非診斷原則</strong>
                  <p>若眼周肌膚正處於紅腫、發癢、脫屑、刺痛、急性發炎、結膜炎或有開放性傷口，<strong>請勿觸摸、拉扯或擠壓眼周皮膚</strong>，應立即優先尋求眼科或皮膚專科醫師診斷治療。以下觀察僅為健康無不適時梳理個人主觀感受之輔助，非醫學病因分類依據。</p>
                </div>
                <ul className="knowledge-check-list">
                  <li><strong>觀察色澤隨受光角度之視覺變化（無需碰觸眼周）</strong>：手持鏡子面朝上方光源或輕微轉動面部角度；若眼下深色感在特定光線角度下顯著轉淡，通常反映眼眶骨、淚溝或眼袋形成的立體陰影落差，但多數人同時合併色差與光影，難以單憑視覺切割。</li>
                  <li><strong>展開微細皺摺時之色斑分布觀察</strong>：在肌膚穩定無不適下照鏡，以指腹極輕柔展開下眼瞼細紋；若深色斑塊隨皮表紋理延展而顏色依然濃郁，文獻描述這類視覺表現常見於淺層或深層色素不均的情境，但薄透皮膚受拉扯時透光度皆會改變，切勿單憑此點推論病因。</li>
                  <li><strong>微血管受壓短暫反白（Blanching）之物理反應</strong>：若指腹極輕微碰觸時眼下青紫感短暫變淺，多為微血管血流受壓暫時排開之正常物理生理反應，亦受個人皮下組織厚薄影響，非單一血管病態之特異指標。</li>
                </ul>
                <p className="knowledge-observation-note">重要說明：眼周肌膚結構極為脆弱，且臨床上絕大多數人皆屬於多重因素交織，上述觀察僅供居家釐清自己在意的外觀感受，不可作為自我定性或取代專科醫師診斷之工具。</p>
              </section>

              <section className="knowledge-article-section" aria-labelledby="allergy-title">
                <div className="section-label">04 / 別漏掉過敏與生活因子</div>
                <h2 id="allergy-title">過敏性鼻炎與過敏性黑眼圈（Allergic Shiners）</h2>
                <p className="knowledge-lede">因過敏性鼻炎導致眼下呈現深暗色澤的外觀，在醫學文獻中常被稱為「過敏性黑眼圈（Allergic Shiners）」。</p>
                <p>臨床文獻指出，鼻過敏引發的鼻塞常伴隨鼻腔充血，並可能影響眼眶周圍靜脈回流，使下眼瞼微血管淤血擴張，在外觀呈現偏深紫藍色的暗沉感。若同時因眼周搔癢而頻繁揉眼，反覆物理摩擦更容易誘發表皮黑色素沉積，形成「血管型＋色素型」的複合困擾。此類問題若想減輕，應優先配合專科醫師醫囑控制過敏性鼻炎與避免揉眼。</p>
                <div className="knowledge-callout"><strong>先分清楚</strong><p>處理過敏、減少揉眼，與討論眼周外觀美化是不同事情。若症狀持續或影響生活，請先向醫師或過敏專業人員確認。</p></div>
              </section>

              <section className="knowledge-article-section" aria-labelledby="comparison-title">
                <div className="section-label">05 / 處置途徑客觀比對</div>
                <h2 id="comparison-title">常見眼周困擾改善途徑比較</h2>
                <p className="knowledge-lede">面對眼周色澤或陰影困擾，釐清不同途徑的定位有助於建立健康客觀的期待：</p>
                <div className="knowledge-table-wrap" role="region" aria-label="眼周困擾處置途徑三方客觀比對表" tabIndex={0}>
                  <table className="knowledge-table" aria-label="眼周困擾處置途徑三方客觀比對表">
                    <thead>
                      <tr>
                        <th scope="col">評估面向</th>
                        <th scope="col">市售日常眼霜／保養品</th>
                        <th scope="col">皮膚科／整外專科醫療處置</th>
                        <th scope="col">雙和店美學外觀修飾</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">主要定位</th>
                        <td>表面角質保濕滋潤、舒緩乾燥細紋</td>
                        <td>針對深層構造、血管擴張或黑色素之醫療處置</td>
                        <td>眼周局部表面色澤調和、外觀輔助修飾</td>
                      </tr>
                      <tr>
                        <th scope="row">常見方式</th>
                        <td>保濕成分、咖啡因、維生素 C 衍生精華</td>
                        <td>染料雷射、皮秒雷射、玻尿酸填補、手術處理眼袋</td>
                        <td>周圍原生膚色比對、視覺色階對比調和</td>
                      </tr>
                      <tr>
                        <th scope="row">介入性質</th>
                        <td>一般化粧品日常保養</td>
                        <td>醫療行為（需由合格專科醫師於院所施作）</td>
                        <td>非醫療美容美化與外觀照護</td>
                      </tr>
                      <tr>
                        <th scope="row">主要限制</th>
                        <td>無法改變深層微血管淤血、真皮色素或立體凹陷</td>
                        <td>費用與療程因人而異、需承擔醫療風險與恢復期</td>
                        <td>無法填平立體淚溝或眼袋凹凸，需個別了解適用性</td>
                      </tr>
                      <tr>
                        <th scope="row">合理期待</th>
                        <td>維持周圍肌膚水潤健康、預防乾燥紋理</td>
                        <td>由專科醫師評估組織結構改善或血管病灶減輕程度</td>
                        <td>在社交距離下降低表面色差帶來之疲倦視覺感</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="knowledge-article-action">
                  <a className="text-link" href={servicePath("skin-camouflage")} data-ga-event="content_navigation" data-ga-cta-location="knowledge_article">了解皮膚覆蓋術服務專頁 <span aria-hidden="true">↗</span></a>
                </div>
              </section>

              <section className="knowledge-article-section" aria-labelledby="prepare-title">
                <div className="section-label">06 / 諮詢前自我整理</div>
                <h2 id="prepare-title">把你的觀察，變成好溝通的資訊。</h2>
                <p className="knowledge-lede">預約前不需要替自己下診斷，可以先整理「什麼狀態下最明顯」與「伴隨的感受」：</p>
                <ul className="knowledge-check-list">
                  <li><strong>整理困擾出現時機</strong>：記下眼周暗沉是從小體質就有、在過敏換季時變深，或是近年隨熬夜作息加重。</li>
                  <li><strong>觀察光線與角度感受</strong>：注意深色感是在頂光下明顯、仰頭時是否淡化，或是不同光線下色差皆固定。</li>
                  <li><strong>留意伴隨症狀與文字描述</strong>：若有明顯搔癢、乾癢脫皮、紅腫熱痛或視力變化，應先就醫；若無醫療疑慮，可先以文字描述狀況進行初步了解。</li>
                </ul>
              </section>

              <section className="knowledge-article-section knowledge-article-faq" id="faq" aria-labelledby="faq-title">
                <div className="section-label">07 / 常見問題</div>
                <h2 id="faq-title">關於黑眼圈，<br /><em>先問清楚。</em></h2>
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
                <p>本頁內容依公開研究與醫療機構資料整理，涵蓋黑眼圈的多因素分類、眼袋與陰影，以及過敏性黑眼圈；品牌服務內容則以雙和店目前公開的服務範圍為準。</p>
                <ul>{sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.name}<span aria-hidden="true">↗</span></a></li>)}</ul>
              </section>
            </div>

            <aside className="knowledge-article-aside" aria-label="雙和店資訊與聯絡方式">
              <div className="knowledge-aside-card">
                <span className="knowledge-card-label">雙和店 / 新北中和</span>
                <h2>想了解自己的眼周狀態？</h2>
                <p>私訊諮詢前可先整理：① 在意部位 ② 出現時間與狀態 ③ 局部的色澤或光影感受，讓初次溝通更精準。</p>
                <a className="button button-dark" href={facebookUrl} target="_blank" rel="noreferrer" data-ga-event="contact_click" data-ga-contact-method="facebook" data-ga-cta-location="knowledge_aside">雙和店 Facebook 私訊 <span aria-hidden="true">↗</span></a>
                <a className="text-link" href={lineUrl} target="_blank" rel="noreferrer" data-ga-event="contact_click" data-ga-contact-method="line" data-ga-cta-location="knowledge_aside">LINE 預約諮詢 <span aria-hidden="true">↗</span></a>
              </div>
              <div className="service-aside-links">
                <span className="knowledge-card-label">相關閱讀與主題</span>
                <a href={stretchMarksKnowledgePath} data-ga-event="content_navigation" data-ga-cta-location="knowledge_aside_related">妊娠紋是什麼？產後變化與保養 <span aria-hidden="true">↗</span></a>
                <a href={striaeKnowledgePath} data-ga-event="content_navigation" data-ga-cta-location="knowledge_aside_related">肥胖紋與生長紋比較 <span aria-hidden="true">↗</span></a>
                <a href={scarsCamouflageKnowledgePath} data-ga-event="content_navigation" data-ga-cta-location="knowledge_aside_related">白色疤痕與手術痕跡修飾 <span aria-hidden="true">↗</span></a>
                <a href={knowledgeIndexPath} data-ga-event="content_navigation" data-ga-cta-location="knowledge_aside_related">知識中心全專題 <span aria-hidden="true">↗</span></a>
                <a href={servicePath(parentSlug)} data-ga-event="content_navigation" data-ga-cta-location="knowledge_aside_related">局部美學與科普專頁 <span aria-hidden="true">↗</span></a>
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
        <KnowledgeContactCta title="想先分辨自己的眼周困擾？" description="可以先記錄顏色、光線角度與是否伴隨不適，再用文字描述狀況；若有紅腫、疼痛或視力變化，請優先諮詢醫療專業人員。" />
      </main>

      <footer className="site-footer section-shell"><a className="wordmark" href="/#top" aria-label="新北雙和店｜瑪菲斯皮膚覆蓋專家首頁"><span className="wordmark-mark">M</span><span>新北雙和店｜瑪菲斯皮膚覆蓋專家</span></a><span>紋路美化・科技測色・肌膚知識</span><span>© 2026</span></footer>
      <a className="mobile-sticky-cta" href={facebookUrl} target="_blank" rel="noreferrer" data-ga-event="contact_click" data-ga-contact-method="facebook" data-ga-cta-location="mobile_sticky">Facebook 私訊預約</a>
    </>
  );
}

export default function DarkCirclesPage() {
  return <DarkCirclesContent />;
}
