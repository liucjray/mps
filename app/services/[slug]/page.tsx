/* eslint-disable @next/next/no-img-element -- Cloudflare serves these public assets directly. */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { facebookUrl, lineUrl, phoneNumber, siteAddress, siteBusinessHours, siteCanonicalUrl, siteDescription, siteEmail, siteLastModified, siteName, siteUrl, socialImageUrl } from "../../site";
import { serviceUrl, services, type Service } from "../../services";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

function findService(slug: string): Service {
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  return service;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  const url = serviceUrl(service.slug);

  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${service.title}｜${siteName}`,
      description: service.description,
      type: "website",
      locale: "zh_TW",
      url,
      siteName,
      images: [{ url: socialImageUrl, type: "image/jpeg", width: 1536, height: 1024, alt: service.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title}｜${siteName}`,
      description: service.description,
      images: [{ url: socialImageUrl, alt: service.imageAlt }],
    },
  };
}

function getStructuredData(service: Service) {
  const url = serviceUrl(service.slug);
  const serviceId = `${siteCanonicalUrl}#service-${service.slug}`;
  const organizationId = `${siteCanonicalUrl}#organization`;
  const websiteId = `${siteCanonicalUrl}#website`;
  const pageId = `${url}#webpage`;
  const faqId = `${url}#faq`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": organizationId,
        name: siteName,
        url: siteCanonicalUrl,
        description: siteDescription,
        email: siteEmail,
        address: siteAddress,
        telephone: phoneNumber,
        logo: `${siteUrl}/logo.png`,
        sameAs: [facebookUrl, lineUrl],
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: service.title,
        description: service.description,
        serviceType: service.title,
        alternateName: service.tag,
        url,
        image: `${siteUrl}${service.image}`,
        provider: { "@id": organizationId },
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
        url,
        name: `${service.title}｜${siteName}`,
        description: service.description,
        inLanguage: "zh-Hant-TW",
        dateModified: siteLastModified,
        isPartOf: { "@id": websiteId },
        author: { "@id": organizationId },
        publisher: { "@id": organizationId },
        about: { "@id": serviceId },
        mainEntity: { "@id": serviceId },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        primaryImageOfPage: { "@type": "ImageObject", url: `${siteUrl}${service.image}`, width: service.imageWidth, height: service.imageHeight, caption: service.imageAlt },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: siteName, item: siteCanonicalUrl },
          { "@type": "ListItem", position: 2, name: "服務內容", item: `${siteCanonicalUrl}#services` },
          { "@type": "ListItem", position: 3, name: service.title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": faqId,
        inLanguage: "zh-Hant-TW",
        mainEntity: service.faqs.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = findService(slug);
  const structuredData = getStructuredData(service);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <nav className="site-nav" aria-label="主要導覽">
        <a className="wordmark" href={`${siteCanonicalUrl}#top`} aria-label="瑪菲斯首頁"><span className="wordmark-mark">M</span><span>瑪菲斯</span></a>
        <div className="nav-links"><a href={`${siteCanonicalUrl}#about`}>品牌理念</a><a href={`${siteCanonicalUrl}#services`}>服務內容</a><a href={`${siteCanonicalUrl}#faq`}>常見問題</a></div>
        <a className="nav-cta" href={facebookUrl} target="_blank" rel="noreferrer">雙和店</a>
      </nav>

      <main id="main-content">
        <nav className="service-breadcrumb section-shell" aria-label="麵包屑導覽">
          <a href={siteCanonicalUrl}>首頁</a><span aria-hidden="true">/</span><a href={`${siteCanonicalUrl}#services`}>服務內容</a><span aria-hidden="true">/</span><span aria-current="page">{service.title}</span>
        </nav>

        <article className="service-detail section-shell">
          <header className="service-detail-hero">
            <div className="service-detail-copy">
              <div className="section-label">{service.tag}</div>
              <h1>{service.title}</h1>
              <p className="service-detail-lede">{service.description}</p><p className="service-detail-location">新北市中和區、捷運南勢角站附近；服務中和、永和、雙和地區，也接受台北市與北部地區預約。</p>
              <div className="hero-actions"><a className="button button-primary" href={facebookUrl} target="_blank" rel="noreferrer">向雙和店詢問</a><a className="text-link" href={lineUrl} target="_blank" rel="noreferrer">LINE 預約</a></div>
            </div>
            <div className="service-detail-image"><img src={service.image} alt={service.imageAlt} width={service.imageWidth} height={service.imageHeight} loading="eager" fetchPriority="high" decoding="async" /></div>
          </header>

          <div className="service-detail-body">
            <div className="service-detail-main">
              <section aria-labelledby="service-overview-title"><div className="section-label">服務說明</div><h2 id="service-overview-title">先理解狀態，<br /><em>再討論適合的方向。</em></h2><p className="service-detail-overview">{service.overview}</p><p className="service-detail-note">本站提供一般肌膚美學與外觀照護資訊，不取代醫療診斷或治療建議。若有皮膚疾病、傷口、發炎、疼痛或其他疑慮，請先諮詢合格醫療專業人員。</p></section>
              <section className="service-detail-points" aria-labelledby="service-points-title"><div className="section-label">如何了解</div><h2 id="service-points-title">把每一步說清楚。</h2><div className="service-detail-point-list">{service.sections.map((section, index) => <article key={section.title}><span>0{index + 1}</span><h3>{section.title}</h3><p>{section.text}</p></article>)}</div></section>
              <section className="service-detail-faq" aria-labelledby="service-faq-title"><div className="section-label">常見問題</div><h2 id="service-faq-title">關於{service.title}，<br /><em>先問清楚。</em></h2><div className="faq-list">{service.faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>＋</span></summary><div className="faq-answer"><p>{answer}</p></div></details>)}</div></section>
            </div>
            <aside className="service-detail-aside" aria-label="其他服務與聯絡方式">
              <div className="service-aside-card"><span className="knowledge-card-label">MAVIS PURE SKIN</span><p>每個人的肌膚狀態不同，先從清楚溝通開始。</p><a className="text-link" href={facebookUrl} target="_blank" rel="noreferrer">Facebook 私訊諮詢</a><a className="text-link" href={lineUrl} target="_blank" rel="noreferrer">LINE 預約諮詢</a></div>
              <div className="service-aside-links"><span className="knowledge-card-label">EXPLORE SERVICES</span>{services.map((other) => <a className={other.slug === service.slug ? "is-current" : ""} aria-current={other.slug === service.slug ? "page" : undefined} href={serviceUrl(other.slug)} key={other.slug}>{other.title}<span aria-hidden="true">↗</span></a>)}</div>
            </aside>
          </div>
        </article>

        <section className="contact service-detail-contact section-shell" id="contact" aria-labelledby="service-contact-title"><div className="contact-copy"><div className="section-label">新北中和・南勢角站 / 服務雙和與雙北</div><h2 id="service-contact-title">想了解這項服務，<br /><em>可以從這裡開始。</em></h2><p>歡迎透過雙和店 Facebook 私訊、LINE 或手機預約，先聊聊你的狀況。</p><address className="contact-details"><span>地址</span>{siteAddress.addressRegion}{siteAddress.addressLocality}{siteAddress.streetAddress}<br /><span>時間</span>{siteBusinessHours}<br /><span>預約</span>手機、LINE 或 Facebook 私訊<br /><span>Email</span><a href={`mailto:${siteEmail}`}>{siteEmail}</a></address></div><div className="contact-actions"><a className="contact-button" href={facebookUrl} target="_blank" rel="noreferrer"><span>前往雙和店 Facebook<br /><small>了解最新案例與預約方式</small></span></a><a className="contact-secondary" href={lineUrl} target="_blank" rel="noreferrer">LINE 預約諮詢</a><a className="contact-secondary" href={`tel:${phoneNumber}`}>電話預約 0981-756-111</a></div></section>
      </main>

      <footer className="site-footer section-shell"><a className="wordmark" href={siteCanonicalUrl}><span className="wordmark-mark">M</span><span>瑪菲斯</span></a><span>瑪菲斯皮膚覆蓋專家｜新北雙和店</span><span>© 2026</span></footer>
      <a className="mobile-sticky-cta" href={facebookUrl} target="_blank" rel="noreferrer">雙和店 Facebook 私訊</a>
    </>
  );
}
