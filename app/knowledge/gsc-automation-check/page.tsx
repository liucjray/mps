/* eslint-disable @next/next/no-html-link-for-pages -- static HTML links avoid Vinext client-router hydration issues. */
import type { Metadata } from "next";
import { KnowledgeContactCta } from "../../knowledge-contact";
import { SiteNavigation } from "../../site-navigation";
import { knowledgeIndexPath, organizationId, sharedOrganizationEntity, siteCanonicalUrl, siteName, siteUrl } from "../../site";

export const dynamic = "force-static";

const pageUrl = `${siteUrl}/knowledge/gsc-automation-check`;
const pageTitle = "網站自動同步驗證頁｜GSC／SEO／AEO";
const pageDescription = "這是新北雙和店用來驗證部署後 sitemap、GSC、SEO 與 AEO 自動同步流程的公開技術頁面，不代表服務或索引保證。";
const publishedAt = "2026-09-19";
const updatedAt = "2026-09-20";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  authors: [{ name: siteName, url: siteCanonicalUrl }],
  creator: siteName,
  publisher: siteName,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "article",
    locale: "zh_TW",
    url: pageUrl,
    siteName,
  },
  twitter: { card: "summary", title: pageTitle, description: pageDescription },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    sharedOrganizationEntity,
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
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: pageTitle,
      description: pageDescription,
      inLanguage: "zh-Hant-TW",
      dateModified: updatedAt,
      isPartOf: { "@id": `${siteCanonicalUrl}#website` },
      author: { "@id": organizationId },
      publisher: { "@id": organizationId },
      mainEntity: { "@id": `${pageUrl}#article` },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    },
    {
      "@type": "Article",
      "@id": `${pageUrl}#article`,
      headline: pageTitle,
      description: pageDescription,
      datePublished: publishedAt,
      dateModified: updatedAt,
      inLanguage: "zh-Hant-TW",
      author: { "@id": organizationId },
      publisher: { "@id": organizationId },
      mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
      articleSection: "網站技術與自動同步說明",
      keywords: ["Google Search Console", "SEO", "AEO", "sitemap", "自動部署"],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: siteName, item: siteCanonicalUrl },
        { "@type": "ListItem", position: 2, name: "知識中心", item: `${siteCanonicalUrl}${knowledgeIndexPath}` },
        { "@type": "ListItem", position: 3, name: "自動同步驗證頁", item: pageUrl },
      ],
    },
  ],
};

export default function GscAutomationCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <a className="skip-link" href="#main-content">跳至主要內容</a>
      <SiteNavigation faqHref="/#faq" />

      <main id="main-content" tabIndex={-1}>
        <nav className="service-breadcrumb section-shell" aria-label="麵包屑導覽">
          <a href="/">首頁</a><span aria-hidden="true">/</span><a href={knowledgeIndexPath}>知識中心</a><span aria-hidden="true">/</span><span aria-current="page">自動同步驗證頁</span>
        </nav>

        <article className="knowledge-article section-shell">
          <header className="knowledge-article-hero">
            <div className="knowledge-article-copy">
              <div className="section-label">網站技術 / 自動同步驗證</div>
              <h1>確認網站部署後，<br /><em>SEO 與 GSC 是否能自動同步。</em></h1>
              <p>{pageDescription}</p>
              <div className="knowledge-article-meta"><span>內容整理：{siteName}</span><span>最後更新：{updatedAt}</span></div>
            </div>
            <div className="knowledge-article-facts" aria-label="自動同步驗證重點">
              <span className="knowledge-card-label">這頁測試三件事</span>
              <ol>
                <li><strong>公開路由</strong><span>這個頁面是否成功部署並回應 HTTP 200。</span></li>
                <li><strong>搜尋訊號</strong><span>canonical、metadata、sitemap 與 JSON-LD 是否一致。</span></li>
                <li><strong>自動通知</strong><span>新增公開 URL 後，GitHub Actions 是否依條件提交 sitemap。</span></li>
              </ol>
            </div>
          </header>

          <div className="knowledge-article-notice">這是網站技術驗證頁，不是服務頁，也不代表 Google 必然收錄或立即更新搜尋結果。</div>

          <div className="knowledge-article-body">
            <div className="knowledge-article-main">
              <section className="knowledge-article-section" aria-labelledby="purpose-title">
                <div className="section-label">01 / 驗證目的</div>
                <h2 id="purpose-title">為什麼需要一個公開測試頁？</h2>
                <p className="knowledge-lede">只有實際新增一個可抓取、可索引、列在 sitemap 的公開 URL，才能驗證部署流程是否真的呼叫 Google Search Console API，而不是只確認 GitHub Actions 顯示成功。</p>
                <p>本次驗證版本：2026-09-20，預期 workflow 會因公開內容變更自動執行 GSC sitemap submit。</p>
                <p>這個頁面會留在網站上，讓未來可以持續檢查自動化結果；它不承載服務價格、資格、案例或醫療宣稱。</p>
              </section>

              <section className="knowledge-article-section" aria-labelledby="flow-title">
                <div className="section-label">02 / 自動流程</div>
                <h2 id="flow-title">這次 push 會發生什麼？</h2>
                <ol className="knowledge-check-list">
                  <li><strong>Build 與 SEO/AEO gate</strong>：檢查頁面輸出、sitemap、robots、llms、canonical 與結構化資料。</li>
                  <li><strong>部署公開頁面</strong>：Cloudflare Worker 部署完成後，再驗證正式網址。</li>
                  <li><strong>條件式 GSC submit</strong>：因為公開頁面內容與 sitemap `lastmod` 變更，分類器會觸發 `sitemaps.submit`。</li>
                  <li><strong>留下報告</strong>：GitHub Actions Summary 與 artifact 會記錄 GSC、IndexNow 與 SEO/AEO 結果。</li>
                </ol>
              </section>

              <section className="knowledge-article-section" id="scope" aria-labelledby="scope-title">
                <div className="section-label">03 / 範圍與限制</div>
                <h2 id="scope-title">自動提交不等於保證收錄</h2>
                <p className="knowledge-lede">GSC API 只會通知 Google sitemap 有更新；Google 何時重新抓取、是否收錄，以及搜尋結果如何呈現，仍由 Google 的排程與品質系統決定。</p>
                <p>這個測試頁的用途是確認自動化授權與部署流程，不是要求 Google 強制索引。一般頁面仍應維持清楚內容、內部連結、正確 canonical 與可抓取狀態。</p>
              </section>
            </div>
          </div>
        </article>

        <KnowledgeContactCta />
      </main>
    </>
  );
}
