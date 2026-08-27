import { GoogleAnalyticsTracker } from "./google-analytics-tracker";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";
const validMeasurementId = /^G-[A-Z0-9]+$/i.test(measurementId) ? measurementId : null;

export function GoogleAnalytics() {
  if (!validMeasurementId) return null;

  const configScript = `
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", "${validMeasurementId}");
  `;

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${validMeasurementId}`} />
      <script dangerouslySetInnerHTML={{ __html: configScript }} />
      <GoogleAnalyticsTracker />
    </>
  );
}
