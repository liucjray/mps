/* eslint-disable @next/next/no-img-element -- QR assets are static public SVGs. */
type ContactQrProps = {
  href: string;
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  kind: "line" | "facebook" | "instagram";
};

function BrandIcon({ kind }: { kind: ContactQrProps["kind"] }) {
  if (kind === "line") {
    return (
      <svg viewBox="0 0 24 24" focusable="false">
        <path fill="currentColor" d="M12 3C6.477 3 2 6.782 2 11.444c0 2.671 1.518 5.094 4.036 6.592-.177.644-.642 2.333-.735 2.687-.116.44.161.434.339.317.14-.092 2.23-1.51 3.13-2.12.99.275 2.08.424 3.23.424 5.523 0 10-3.782 10-8.444S17.523 3 12 3Z" />
        <circle cx="8" cy="11.5" r="1" fill="#06c755" />
        <circle cx="12" cy="11.5" r="1" fill="#06c755" />
        <circle cx="16" cy="11.5" r="1" fill="#06c755" />
      </svg>
    );
  }

  if (kind === "facebook") {
    return (
      <svg viewBox="0 0 24 24" focusable="false">
        <path fill="currentColor" d="M13.62 20v-6.92h2.3l.35-2.7h-2.65V8.66c0-.78.217-1.31 1.337-1.31h1.427V4.93c-.247-.033-1.094-.11-2.082-.11-2.06 0-3.47 1.257-3.47 3.565v1.993H8.5v2.7h2.337V20h2.783Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" focusable="false">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function ContactQr({ href, image, eyebrow, title, description, kind }: ContactQrProps) {
  return (
    <a className="contact-qr-card" href={href} target="_blank" rel="noreferrer" aria-label={`${title} QR Code，點擊開啟連結`}>
      <span className="contact-qr-glow" aria-hidden="true" />
      <span className="contact-qr-spark contact-qr-spark-one" aria-hidden="true">✦</span>
      <span className="contact-qr-spark contact-qr-spark-two" aria-hidden="true">·</span>
      <span className="contact-qr-image"><img src={image} alt="" width="160" height="160" /></span>
      <span className="contact-qr-copy"><span className={`contact-qr-brand contact-qr-brand-${kind}`} aria-hidden="true"><BrandIcon kind={kind} /></span><span className="contact-qr-eyebrow">{eyebrow}</span><strong>{title}</strong><small>{description}</small><span className="contact-qr-arrow" aria-hidden="true">↗</span></span>
    </a>
  );
}
