import { ContactQr } from "./contact-qr";
import { facebookUrl, instagramUrl, lineUrl } from "./site";

type KnowledgeContactCtaProps = {
  title?: string;
  description?: string;
};

export function KnowledgeContactCta({ title = "想先了解自己的狀況？", description = "先用文字描述在意的部位、形成時間與外觀變化，再由雙和店說明可以討論的方向。你也可以選擇直接加入聯絡方式。" }: KnowledgeContactCtaProps) {
  return (
    <section className="knowledge-contact section-shell" aria-labelledby="knowledge-quick-contact-title">
      <div className="knowledge-contact-copy">
        <div className="section-label">新北中和・南勢角站 / 預約方式</div>
        <h2 id="knowledge-quick-contact-title">{title}</h2>
        <p>{description}</p>
        <a className="button button-dark" href={lineUrl} target="_blank" rel="noreferrer" data-ga-event="contact_click" data-ga-contact-method="line" data-ga-cta-location="knowledge_contact">LINE 預約諮詢 <span aria-hidden="true">↗</span></a>
      </div>
      <div className="contact-qr-grid" aria-label="掃描加入雙和店聯絡方式">
        <ContactQr href={lineUrl} image="/qr-line.svg" eyebrow="SCAN TO CONNECT" title="LINE 預約" description="掃描加入好友" kind="line" />
        <ContactQr href={facebookUrl} image="/qr-facebook.svg" eyebrow="FOLLOW & MESSAGE" title="Facebook" description="查看最新分享" kind="facebook" />
        <ContactQr href={instagramUrl} image="/qr-instagram.svg" eyebrow="FOLLOW & MESSAGE" title="Instagram" description="查看日常分享" kind="instagram" />
      </div>
    </section>
  );
}
