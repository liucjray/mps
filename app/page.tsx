/* eslint-disable @next/next/no-img-element -- Cloudflare serves these public assets directly. */
import { facebookUrl, instagramUrl, lineUrl, phoneNumber, siteDescription, siteName, siteUrl } from "./site";

const phoneUrl = `tel:${phoneNumber}`;

const services = [
  { number: "01", title: "瑪菲斯草本撫紋", text: "針對妊娠紋、肥胖紋、成長紋等常見紋路，先辨識狀態，再討論適合的美化方向。", tag: "HERBAL STRETCH CARE" },
  { number: "02", title: "皮膚覆蓋術", text: "針對紋路與各類疤痕造成的色澤、紋理落差，透過評估了解適合的覆蓋方式。", tag: "SKIN CAMOUFLAGE" },
  { number: "03", title: "科技測色", text: "以膚色比對與專業判斷，協助找到更貼近個人肌膚狀態的色彩選擇。", tag: "COLOUR MATCHING" },
  { number: "04", title: "局部美學與科普", text: "分享黑眼圈、淚溝、泡泡眼與輪廓線等困擾的美學知識，讓你少走一點彎路。", tag: "BEAUTY EDUCATION" },
];

const processSteps = [
  { number: "01", title: "說明你的困擾", text: "透過雙和店 Facebook 私訊或電話，描述紋路、疤痕或局部色澤困擾；若方便，也可以先準備清楚的照片。" },
  { number: "02", title: "評估紋路與膚色", text: "了解紋路類型、部位與膚色狀態，需要時搭配科技測色，讓後續討論更有依據。" },
  { number: "03", title: "討論美化方向", text: "依個人狀況說明可行方向與注意事項，再由你決定是否進一步安排。" },
];

const faqs = [
  ["瑪菲斯草本撫紋適合哪些紋路？", "常見諮詢包含妊娠紋、肥胖紋、成長紋與不同類型的紋路。每個人的狀況不同，建議先提供照片或透過雙和店聯絡方式諮詢。"],
  ["皮膚覆蓋術是在做什麼？", "皮膚覆蓋是針對紋路、疤痕或局部色澤落差，透過色彩與肌膚狀態評估，討論外觀美化方向的服務。"],
  ["為什麼需要科技測色？", "不同人的膚色、部位與紋路狀態不一樣。測色能協助縮小色彩選擇範圍，讓後續討論更有依據。"],
  ["需要先預約或準備什麼？", "請先透過雙和店 Facebook 私訊或電話聯絡，說明想了解的紋路或部位；若方便，也可準備清楚照片，讓初步溝通更有效率。"],
  ["肌膚美學資訊可以取代看醫生嗎？", "不可以。本站內容是一般肌膚美學與外觀照護資訊；若有皮膚疾病、傷口、發炎、疼痛或其他醫療疑慮，請先諮詢合格醫療專業人員。"],
  ["可以先看案例與專業分享嗎？", "可以。Facebook 粉絲團會持續分享紋路類型、案例心得、保養觀念與局部美學知識，歡迎先追蹤了解。"],
  ["如何聯絡新北雙和店？", "可以透過雙和店 Facebook 粉絲團私訊，或撥打 0981-756-111 了解服務內容與預約方式。"],
];

const beautyImage = "/hero-skin-atelier.png";
const introImage = "/intro-skin-consultation.png";
const knowledgeImage = "/knowledge-skin-palette.png";
const localBusinessId = `${siteUrl}/#localbusiness`;
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BeautySalon",
      "@id": localBusinessId,
      name: siteName,
      description: siteDescription,
      url: siteUrl,
      telephone: phoneNumber,
      image: [`${siteUrl}${beautyImage}`, `${siteUrl}${introImage}`, `${siteUrl}${knowledgeImage}`],
      logo: `${siteUrl}/favicon.svg`,
      sameAs: [facebookUrl, instagramUrl, lineUrl],
      areaServed: { "@type": "AdministrativeArea", name: "新北市" },
      availableLanguage: ["zh-Hant-TW"],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: phoneNumber,
        contactType: "customer service",
        areaServed: "TW",
        availableLanguage: ["zh-Hant-TW"],
      },
      knowsAbout: ["妊娠紋", "肥胖紋", "成長紋", "各類疤痕", "皮膚覆蓋術", "科技測色", "肌膚美學"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "瑪菲斯肌膚美學服務",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.text,
            serviceType: service.title,
            alternateName: service.tag,
            provider: { "@id": localBusinessId },
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      inLanguage: "zh-Hant-TW",
      publisher: { "@id": localBusinessId },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      inLanguage: "zh-Hant-TW",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": localBusinessId },
      mainEntity: { "@id": localBusinessId },
      primaryImageOfPage: { "@type": "ImageObject", url: `${siteUrl}${beautyImage}`, width: 1536, height: 1024 },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <nav className="site-nav" aria-label="主要導覽">
        <a className="wordmark" href="#top" aria-label="瑪菲斯首頁"><span className="wordmark-mark">M</span><span>瑪菲斯</span></a>
        <div className="nav-links"><a href="#about">品牌理念</a><a href="#services">服務內容</a><a href="#faq">常見問題</a></div>
        <a className="nav-cta" href={facebookUrl} target="_blank" rel="noreferrer">雙和店</a>
      </nav>

      <main id="main-content">
      <section className="hero section-shell" id="top">
        <div className="hero-copy">
          <h1><span className="hero-title-line">讓肌膚的故事，</span><span className="hero-title-line hero-title-accent">被溫柔理解。</span></h1>
          <p className="hero-lede">從妊娠紋、肥胖紋、成長紋，到疤痕與局部色澤困擾，瑪菲斯用專業評估、科技測色與清楚說明，陪你找到適合自己的美化方向。</p>
          <div className="hero-actions"><a className="button button-primary" href={facebookUrl} target="_blank" rel="noreferrer">雙和店 Facebook 私訊</a><a className="text-link" href="#services">查看服務內容</a></div>
        </div>
        <div className="hero-visual">
          <div className="hero-image">
            <img src={beautyImage} alt="自然光下展示肌膚紋理的女性肩背" width={1536} height={1024} loading="eager" fetchPriority="high" decoding="async" />
          </div>
          <div className="image-caption"><span>MAPHIS PURE SKIN</span><span>Skin stories, understood.</span></div>
        </div>
      </section>

      <section className="trust-strip" aria-label="服務關鍵字"><div className="section-shell trust-inner"><span className="trust-label">WHAT WE HELP YOU UNDERSTAND</span><span><b>01</b> 妊娠紋</span><span><b>02</b> 肥胖紋</span><span><b>03</b> 疤痕與色澤</span></div></section>

      <section className="intro section-shell">
        <div className="section-label section-anchor" id="about">品牌理念</div>
        <div className="intro-content"><h2>不只是遮住，<br /><span>先把紋路看懂。</span></h2><div className="intro-copy"><p className="large-copy">先理解肌膚，再選擇適合自己的美化方式。</p><p>瑪菲斯把紋路分類、膚色判斷與案例經驗整理成容易理解的內容，讓你在做選擇以前，先知道自己正在面對什麼。</p><a className="text-link" href={facebookUrl} target="_blank" rel="noreferrer">閱讀雙和店 Facebook 分享</a></div><div className="intro-media"><div className="intro-photo"><img src={introImage} alt="自然光下的肌膚諮詢桌面，包含筆記本、陶瓷器皿與放大鏡" width={1024} height={1536} loading="lazy" decoding="async" /></div><span>01 / 先理解肌膚</span></div></div>
      </section>

      <section className="services section-shell" id="services">
        <div className="section-heading"><div><div className="section-label">服務內容</div><h2>從紋路，到肌膚美學。</h2></div><p>瑪菲斯提供草本撫紋、皮膚覆蓋術、科技測色與局部美學教育；<br />每一種狀態不同，先評估，再找到方向。</p></div>
        <div className="service-list">{services.map((service) => <article className="service-row" key={service.number}><span className="service-number">{service.number}</span><div className="service-title-wrap"><h3>{service.title}</h3><span>{service.tag}</span></div><p>{service.text}</p></article>)}</div>
      </section>

      <section className="process section-shell" id="process" aria-labelledby="process-title">
        <div className="section-heading"><div><div className="section-label">了解流程</div><h2 id="process-title">先理解，再決定。</h2></div><p>每個人的肌膚狀態不同，<br />先從清楚溝通開始。</p></div>
        <ol className="process-list">{processSteps.map((step) => <li className="process-step" key={step.number}><span className="process-number">{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
      </section>

      <section className="knowledge section-shell">
        <div className="knowledge-copy"><div className="section-label">Mavis pure skin</div><h2>把專業，<br /><em>說得更容易懂。</em></h2><p>從瑪菲斯同名色乳、膚色判斷，到不同紋路的形成與照護，Facebook 會持續整理真實案例與實用知識。先看懂，再決定要不要開始。</p><p className="content-note">本站提供一般肌膚美學資訊，不取代醫療診斷或治療建議。</p><a className="text-link" href={facebookUrl} target="_blank" rel="noreferrer">前往雙和店 Facebook</a></div>
        <div className="knowledge-card"><div className="knowledge-photo"><img src={knowledgeImage} alt="肌膚教育與科技測色使用的膚色色彩樣本與保養瓶" width={1448} height={1086} loading="lazy" decoding="async" /></div><div className="knowledge-topics"><span className="knowledge-card-label">TOPICS WE COVER</span><div className="topic-list"><span>妊娠紋</span><span>肥胖紋</span><span>成長紋</span><span>各類疤痕</span><span>草本撫紋</span><span>科技測色</span><span>黑眼圈</span><span>輪廓美學</span></div></div><span className="knowledge-card-note">Mavis pure skin / professional skin education</span></div>
      </section>

      <section className="manifesto"><div className="manifesto-inner section-shell"><div className="manifesto-mark">M</div><h2>每一種肌膚狀態，<br /><em>都值得被好好對待。</em></h2><div className="manifesto-bottom"><span>瑪菲斯 / 新北雙和店</span><span>紋路美化・科技測色・肌膚知識</span></div></div></section>

      <section className="faq section-shell" id="faq"><div className="section-label">常見問題</div><div className="faq-layout"><h2>先把想問的，<br /><span>問清楚。</span></h2><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>＋</span></summary><div className="faq-answer"><p>{answer}</p></div></details>)}</div></div></section>

      <section className="contact section-shell" id="contact"><div className="contact-copy"><div className="section-label">新北雙和店</div><h2>想了解你的紋路，<br /><em>可以從這裡開始。</em></h2><p>歡迎透過雙和店 Facebook 私訊，或直接致電 0981-756-111，先聊聊你的狀況。</p></div><div className="contact-actions"><a className="contact-button" href={facebookUrl} target="_blank" rel="noreferrer"><span>前往雙和店 Facebook<br /><small>了解最新案例與預約方式</small></span></a><a className="contact-secondary" href={phoneUrl}>電話諮詢 0981-756-111</a><a className="contact-secondary" href={instagramUrl} target="_blank" rel="noreferrer">Instagram @mavis_pure_skin</a><a className="contact-secondary" href={lineUrl} target="_blank" rel="noreferrer">LINE 官方帳號</a></div></section>
      </main>

      <footer className="site-footer section-shell"><a className="wordmark" href="#top"><span className="wordmark-mark">M</span><span>瑪菲斯</span></a><span>瑪菲斯皮膚覆蓋專家｜新北雙和店</span><span>© 2026</span></footer>
      <a className="mobile-sticky-cta" href={facebookUrl} target="_blank" rel="noreferrer">雙和店 Facebook 私訊</a>
    </>
  );
}
