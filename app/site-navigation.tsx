import { facebookUrl, darkCirclesKnowledgePath, knowledgeIndexPath, scarsCamouflageKnowledgePath, stretchMarksKnowledgePath, striaeKnowledgePath } from "./site";
import { servicePath, services } from "./services";

type SiteNavigationProps = {
  isHome?: boolean;
  faqHref?: string;
};

export function SiteNavigation({ isHome = false, faqHref }: SiteNavigationProps) {
  const anchor = (hash: string) => (isHome ? hash : `/${hash}`);
  const homePath = isHome ? "#top" : "/#top";
  const faqPath = faqHref ?? anchor("#faq");

  return (
    <nav className="site-nav" aria-label="主要導覽">
      <a className="wordmark" href={homePath} aria-label="新北雙和店｜瑪菲斯皮膚覆蓋專家首頁"><span className="wordmark-mark">M</span><span>新北雙和店｜瑪菲斯皮膚覆蓋專家</span></a>
      <div className="nav-links"><a href={anchor("#about")}>品牌理念</a><a href={anchor("#services")}>服務內容</a><a href={knowledgeIndexPath}>肌膚知識</a><a href={faqPath}>常見問題</a></div>
      <a className="nav-cta" href={facebookUrl} target="_blank" rel="noreferrer" data-ga-event="contact_click" data-ga-contact-method="facebook" data-ga-cta-location="navigation">Facebook 私訊</a>
      <details className="nav-menu">
        <summary><span className="nav-menu-label-open">選單</span><span className="nav-menu-label-close">關閉</span></summary>
        <div className="nav-menu-panel">
          <a href={anchor("#about")}>品牌理念</a><a href={anchor("#services")}>服務內容</a><a href={knowledgeIndexPath}>肌膚知識</a><a href={faqPath}>常見問題</a>
          <span className="nav-menu-divider">知識專題</span>
          <a href={knowledgeIndexPath} data-ga-event="content_navigation" data-ga-cta-location="nav_menu">知識中心首頁</a>
          <a href={stretchMarksKnowledgePath} data-ga-event="content_navigation" data-ga-cta-location="nav_menu">妊娠紋知識</a>
          <a href={darkCirclesKnowledgePath} data-ga-event="content_navigation" data-ga-cta-location="nav_menu">黑眼圈知識</a>
          <a href={striaeKnowledgePath} data-ga-event="content_navigation" data-ga-cta-location="nav_menu">肥胖紋與生長紋</a>
          <a href={scarsCamouflageKnowledgePath} data-ga-event="content_navigation" data-ga-cta-location="nav_menu">疤痕外觀修飾</a>
          <span className="nav-menu-divider">服務內容</span>
          {services.map((service) => <a href={servicePath(service.slug)} key={service.slug} data-ga-event="content_navigation" data-ga-cta-location="nav_menu">{service.title}</a>)}
        </div>
      </details>
    </nav>
  );
}
