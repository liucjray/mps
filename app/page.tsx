/* eslint-disable @next/next/no-img-element -- Cloudflare serves these public assets directly. */
import { facebookUrl, heroImageUrl, introImageUrl, knowledgeImageUrl, phoneNumber, siteAddress, siteCanonicalUrl, siteDescription, siteEmail, siteLastModified, siteName, siteUrl } from "./site";
import { serviceUrl, services } from "./services";

export const dynamic = "force-static";

const phoneUrl = `tel:${phoneNumber}`;

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

const beautyImage = heroImageUrl;
const introImage = introImageUrl;
const knowledgeImage = knowledgeImageUrl;
const organizationId = `${siteCanonicalUrl}#organization`;
const servedAreas = [
  { "@type": "AdministrativeArea", name: "新北市" },
  { "@type": "AdministrativeArea", name: "中和區" },
];
const serviceEntities = services.map((service) => ({
  "@type": "Service",
  "@id": `${siteCanonicalUrl}#service-${service.slug}`,
  name: service.title,
  description: service.text,
  serviceType: service.title,
  alternateName: service.tag,
  url: serviceUrl(service.slug),
  provider: { "@id": organizationId },
  areaServed: servedAreas,
}));
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": organizationId,
      name: siteName,
      alternateName: ["Mavis pure skin", "MAVIS PURE SKIN"],
      description: siteDescription,
      email: siteEmail,
      address: siteAddress,
      url: siteCanonicalUrl,
      telephone: phoneNumber,
      image: [`${siteUrl}${beautyImage}`, `${siteUrl}${introImage}`, `${siteUrl}${knowledgeImage}`],
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
        contentUrl: `${siteUrl}/logo.png`,
        width: 512,
        height: 512,
      },
      sameAs: [facebookUrl],
      brand: { "@type": "Brand", name: "Mavis pure skin" },
      areaServed: servedAreas,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: phoneNumber,
        email: siteEmail,
        contactType: "customer service",
        areaServed: servedAreas,
        availableLanguage: ["zh-Hant-TW"],
      },
      knowsAbout: ["妊娠紋", "肥胖紋", "成長紋", "各類疤痕", "皮膚覆蓋術", "科技測色", "肌膚美學"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "瑪菲斯肌膚美學服務",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: { "@id": `${siteCanonicalUrl}#service-${service.slug}` },
        })),
      },
    },
    ...serviceEntities,
    {
      "@type": "WebSite",
      "@id": `${siteCanonicalUrl}#website`,
      url: siteCanonicalUrl,
      name: siteName,
      inLanguage: "zh-Hant-TW",
      publisher: { "@id": organizationId },
    },
    {
      "@type": "WebPage",
      "@id": `${siteCanonicalUrl}#webpage`,
      url: siteCanonicalUrl,
      name: siteName,
      description: siteDescription,
      inLanguage: "zh-Hant-TW",
      dateModified: siteLastModified,
      isPartOf: { "@id": `${siteCanonicalUrl}#website` },
      author: { "@id": organizationId },
      publisher: { "@id": organizationId },
      about: { "@id": organizationId },
      mainEntity: { "@id": organizationId },
      primaryImageOfPage: { "@type": "ImageObject", url: `${siteUrl}${beautyImage}`, width: 1536, height: 1024 },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteCanonicalUrl}#faq`,
      inLanguage: "zh-Hant-TW",
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
          <div className="eyebrow"><span className="eyebrow-line" />瑪菲斯 / 新北雙和店</div>
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

      <section className="intro section-shell" id="about" aria-labelledby="about-title">
        <div className="section-label">品牌理念</div>
        <div className="intro-content"><h2 id="about-title">不只是遮住，<br /><span>先把紋路看懂。</span></h2><div className="intro-copy"><p className="large-copy">先理解肌膚，再選擇適合自己的美化方式。</p><p>瑪菲斯把紋路分類、膚色判斷與案例經驗整理成容易理解的內容，讓你在做選擇以前，先知道自己正在面對什麼。</p><a className="text-link" href={facebookUrl} target="_blank" rel="noreferrer">閱讀雙和店 Facebook 分享</a></div><div className="intro-media"><div className="intro-photo"><img src={introImage} alt="自然光下的肌膚諮詢桌面，包含筆記本、陶瓷器皿與放大鏡" width={1024} height={1536} loading="lazy" decoding="async" /></div><span>01 / 先理解肌膚</span></div></div>
      </section>

      <section className="services section-shell" id="services" aria-labelledby="services-title">
        <div className="section-heading"><div><div className="section-label">服務內容</div><h2 id="services-title">從紋路，到肌膚美學。</h2></div><p>瑪菲斯提供草本撫紋、皮膚覆蓋術、科技測色與局部美學教育；<br />每一種狀態不同，先評估，再找到方向。</p></div>
        <div className="service-list">{services.map((service) => <article className="service-row" key={service.number}><span className="service-number">{service.number}</span><div className="service-title-wrap"><h3><a href={serviceUrl(service.slug)}>{service.title}</a></h3><span>{service.tag}</span></div><p>{service.text}</p></article>)}</div>
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

      <section className="faq section-shell" id="faq" aria-labelledby="faq-title"><div className="section-label">常見問題</div><div className="faq-layout"><h2 id="faq-title">先把想問的，<br /><span>問清楚。</span></h2><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>＋</span></summary><div className="faq-answer"><p>{answer}</p></div></details>)}</div></div></section>

      <section className="contact section-shell" id="contact" aria-labelledby="contact-title"><div className="contact-copy"><div className="section-label">新北市中和區・雙和店</div><h2 id="contact-title">想了解你的紋路，<br /><em>可以從這裡開始。</em></h2><p>歡迎透過雙和店 Facebook 私訊，或直接致電 0981-756-111，先聊聊你的狀況。</p><address className="contact-details"><span>地址</span>{siteAddress.addressRegion}{siteAddress.addressLocality}{siteAddress.streetAddress}<br /><span>Email</span><a href={`mailto:${siteEmail}`}>{siteEmail}</a></address></div><div className="contact-actions"><a className="contact-button" href={facebookUrl} target="_blank" rel="noreferrer"><span>前往雙和店 Facebook<br /><small>了解最新案例與預約方式</small></span></a><a className="contact-secondary" href={phoneUrl}>電話諮詢 0981-756-111</a></div></section>
      </main>

      <footer className="site-footer section-shell"><a className="wordmark" href="#top"><span className="wordmark-mark">M</span><span>瑪菲斯</span></a><span>瑪菲斯皮膚覆蓋專家｜新北雙和店</span><span>© 2026</span></footer>
      <a className="mobile-sticky-cta" href={facebookUrl} target="_blank" rel="noreferrer">雙和店 Facebook 私訊</a>
    </>
  );
}
