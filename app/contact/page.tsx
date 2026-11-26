/* eslint-disable @next/next/no-html-link-for-pages -- static HTML links avoid Vinext client-router hydration issues. */
import type { Metadata } from "next";
import { ContactConsultationGuide } from "../contact-guide";
import { ContactQr } from "../contact-qr";
import { servicePath, services } from "../services";
import { SiteNavigation } from "../site-navigation";
import {
  contactUrl,
  darkCirclesKnowledgePath,
  facebookUrl,
  googleMapsSearchUrl,
  instagramUrl,
  knowledgeIndexPath,
  lineUrl,
  organizationId,
  phoneNumber,
  scarsCamouflageKnowledgePath,
  sharedOrganizationEntity,
  siteAddressLine,
  siteBusinessHours,
  siteCanonicalUrl,
  siteEmail,
  siteName,
  siteServiceArea,
  siteTransitInfo,
  siteUrl,
  stretchMarksKnowledgePath,
  striaeKnowledgePath,
} from "../site";

export const dynamic = "force-static";

const pageUrl = contactUrl;
const pageTitle = "聯絡與預約諮詢";
const pageDescription = `瑪菲斯新北雙和店提供妊娠紋、肥胖紋、成長紋、疤痕與局部色差的外觀修飾諮詢。可透過 LINE、Facebook、Instagram 或電話聯絡。${siteServiceArea}。`;
const updatedAt = "2026-11-27";

const knowledgeTopics = [
  {
    label: "妊娠紋",
    title: "妊娠紋是什麼？產後變化與保養",
    href: stretchMarksKnowledgePath,
  },
  {
    label: "萎縮紋比較",
    title: "生長紋、肥胖紋與妊娠紋差別",
    href: striaeKnowledgePath,
  },
  {
    label: "白色疤痕",
    title: "白色疤痕與手術痕跡外觀修飾指南",
    href: scarsCamouflageKnowledgePath,
  },
  {
    label: "眼周外觀",
    title: "黑眼圈怎麼看？成因與分類評估",
    href: darkCirclesKnowledgePath,
  },
];

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: `${pageTitle}｜${siteName}`,
    description: pageDescription,
    type: "website",
    locale: "zh_TW",
    url: pageUrl,
    siteName,
    images: [],
  },
  twitter: {
    card: "summary",
    title: `${pageTitle}｜${siteName}`,
    description: pageDescription,
    images: [],
  },
};

const websiteId = `${siteCanonicalUrl}#website`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteCanonicalUrl,
      name: siteName,
      inLanguage: "zh-Hant-TW",
      publisher: { "@id": organizationId },
    },
    sharedOrganizationEntity,
    {
      "@type": ["ContactPage", "WebPage"],
      "@id": `${pageUrl}#contactpage`,
      url: pageUrl,
      name: `${pageTitle}｜${siteName}`,
      description: pageDescription,
      inLanguage: "zh-Hant-TW",
      dateModified: updatedAt,
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": organizationId },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首頁", item: siteUrl },
        { "@type": "ListItem", position: 2, name: pageTitle, item: pageUrl },
      ],
    },
  ],
};

export default function ContactPage() {
  return (
    <div id="top">
      <a className="skip-link" href="#main">跳到主要內容</a>
      <SiteNavigation />

      <main className="contact-landing" id="main">
        <header className="contact-landing-hero section-shell">
          <div className="contact-landing-hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-line" aria-hidden="true" />
              聯絡與預約 / 新北中和・南勢角站
            </div>
            <h1>
              紋路與疤痕，<br />
              <em>可以先聊聊。</em>
            </h1>
            <p className="contact-landing-hero-lede">
              瑪菲斯雙和店提供妊娠紋、肥胖紋、成長紋、疤痕與局部色差的外觀修飾諮詢。你可以先用 LINE 說說最在意的部位，再決定是否預約。
            </p>
            <div className="contact-landing-hero-actions">
              <a
                className="button button-primary"
                href={lineUrl}
                target="_blank"
                rel="noreferrer"
                data-ga-event="contact_click"
                data-ga-contact-method="line"
                data-ga-cta-location="contact_hero"
              >
                LINE 預約諮詢 <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <aside className="contact-landing-facts" aria-label="雙和店據點與預約資訊">
            <div className="contact-landing-portrait">
              {/* eslint-disable-next-line @next/next/no-img-element -- Cloudflare serves this small static asset. */}
              <img src="/contact-millie.jpg" alt="" width={64} height={64} decoding="async" />
              <div>
                <strong>Millie (小米)</strong>
                <span>瑪菲斯雙和店</span>
              </div>
            </div>
            <dl className="contact-landing-facts-list">
              <div>
                <dt>服務據點</dt>
                <dd>
                  {siteAddressLine}
                  <span className="contact-landing-facts-note">{siteTransitInfo}</span>
                </dd>
              </div>
              <div>
                <dt>可聯繫時段</dt>
                <dd>
                  {siteBusinessHours}
                  <span className="contact-landing-facts-note">有預約才到工作室，前往前請先線上聯繫</span>
                </dd>
              </div>
              <div>
                <dt>電子信箱</dt>
                <dd>
                  <a href={`mailto:${siteEmail}`}>{siteEmail}</a>
                </dd>
              </div>
              <div>
                <dt>路線參考</dt>
                <dd>
                  <a href={googleMapsSearchUrl} target="_blank" rel="noreferrer">
                    Google 地圖搜尋位置 ↗
                  </a>
                </dd>
              </div>
            </dl>
          </aside>
        </header>

        <section className="contact-landing-band section-shell" aria-labelledby="contact-channels-title">
          <div className="contact-landing-main">
            <h2 id="contact-channels-title">選擇你習慣的管道開始討論</h2>
            <p className="contact-landing-band-copy">
              可以用你方便的方式聯絡雙和店。第一次詢問時，先說說你在意哪個部位、想了解什麼，就能開始聊。
            </p>

            <div className="contact-landing-channels" aria-label="即時線上聯絡按鈕">
              <a
                className="contact-landing-channel contact-landing-channel-primary"
                href={lineUrl}
                target="_blank"
                rel="noreferrer"
                data-ga-event="contact_click"
                data-ga-contact-method="line"
                data-ga-cta-location="contact_channels"
              >
                <div>
                  <span className="contact-landing-channel-tag">推薦・可傳照片討論</span>
                  <strong>LINE 預約諮詢</strong>
                  <small>適合傳文字描述或自然光近照初步溝通</small>
                </div>
                <span className="contact-landing-channel-arrow" aria-hidden="true">↗</span>
              </a>

              <a
                className="contact-landing-channel"
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                data-ga-event="contact_click"
                data-ga-contact-method="facebook"
                data-ga-cta-location="contact_channels"
              >
                <div>
                  <strong>新北雙和店粉專私訊</strong>
                  <small>查看粉專分享並直接私訊詢問</small>
                </div>
                <span className="contact-landing-channel-arrow" aria-hidden="true">↗</span>
              </a>

              <a
                className="contact-landing-channel"
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                data-ga-event="contact_click"
                data-ga-contact-method="instagram"
                data-ga-cta-location="contact_channels"
              >
                <div>
                  <strong>Instagram @millie_711102</strong>
                  <small>從 Instagram 私訊聯絡</small>
                </div>
                <span className="contact-landing-channel-arrow" aria-hidden="true">↗</span>
              </a>

              <a
                className="contact-landing-channel"
                href={`tel:${phoneNumber}`}
                data-ga-event="contact_click"
                data-ga-contact-method="phone"
                data-ga-cta-location="contact_channels"
              >
                <div>
                  <strong>電話聯繫 0981-756-111</strong>
                  <small>適合直接確認預約時間或交通方向</small>
                </div>
                <span className="contact-landing-channel-arrow" aria-hidden="true">↗</span>
              </a>
            </div>

            <ContactConsultationGuide />
          </div>

          <div className="contact-landing-qr-wrap">
            <span className="contact-landing-qr-caption">用電腦瀏覽？手機掃描直接加入</span>
            <div className="contact-qr-grid" aria-label="掃描加入雙和店聯絡方式">
              <ContactQr href={lineUrl} image="/qr-line.svg" title="LINE 預約諮詢" description="掃描加入好友" kind="line" />
              <ContactQr href={facebookUrl} image="/qr-facebook.svg" title="Facebook" description="查看最新分享" kind="facebook" />
              <ContactQr href={instagramUrl} image="/qr-instagram.svg" title="Instagram" description="查看日常分享" kind="instagram" />
            </div>
          </div>
        </section>

        <section className="contact-landing-explore section-shell" aria-labelledby="contact-explore-title">
          <div className="contact-landing-explore-head">
            <h2 id="contact-explore-title">如果你是為了特定困擾點進來的</h2>
          </div>

          <div className="contact-landing-explore-grid">
            <div className="contact-landing-explore-group">
              <h3>常見科普指南</h3>
              <div className="contact-landing-link-cards">
                {knowledgeTopics.map((topic) => (
                  <a
                    className="contact-landing-link-card"
                    href={topic.href}
                    key={topic.href}
                    data-ga-event="content_navigation"
                    data-ga-cta-location="contact_knowledge"
                  >
                    <span>{topic.label}</span>
                    <strong>{topic.title}</strong>
                    <em aria-hidden="true">閱讀指南 ↗</em>
                  </a>
                ))}
              </div>
              <a
                className="text-link contact-landing-more-link"
                href={knowledgeIndexPath}
                data-ga-event="content_navigation"
                data-ga-cta-location="contact_knowledge"
              >
                前往肌膚知識中心全部文章 <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="contact-landing-explore-group">
              <h3>雙和店服務項目</h3>
              <div className="contact-landing-link-cards">
                {services.map((service) => (
                  <a
                    className="contact-landing-link-card"
                    href={servicePath(service.slug)}
                    key={service.slug}
                    data-ga-event="content_navigation"
                    data-ga-cta-location="contact_services"
                  >
                    <span>{service.subtitle}</span>
                    <strong>{service.title}</strong>
                    <em aria-hidden="true">查看說明 ↗</em>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="contact-landing-boundary section-shell" aria-labelledby="contact-boundary-title">
          <div className="contact-landing-boundary-box">
            <h2 id="contact-boundary-title">諮詢前的重要說明</h2>
            <ul>
              <li>本站與雙和店提供之草本撫紋、皮膚覆蓋術、科技測色與局部美學諮詢，皆屬於<strong>非醫療美容外觀美化與一般肌膚美學討論</strong>，不具醫療效能，亦不取代合格醫師之診斷與治療。</li>
              <li>每個人的膚質、紋路或疤痕形成時間與色階狀態不同，無法保證固定效果；實際評估方式與可討論方向需於一對一溝通後確認。</li>
              <li>若皮膚正處於紅腫、疼痛、發炎、破皮傷口、感染或伴隨其他健康疑慮，請優先尋求皮膚科或專科醫師協助。</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="site-footer section-shell">
        <div>
          <strong>新北雙和店｜瑪菲斯皮膚覆蓋專家</strong> · <span>{siteAddressLine}</span>
        </div>
        <div>
          <a href="/">回到首頁</a> · <a href={knowledgeIndexPath}>肌膚知識中心</a> · <span>更新日期：{updatedAt}</span>
        </div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </div>
  );
}
