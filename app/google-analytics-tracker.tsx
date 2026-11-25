"use client";

import { useEffect } from "react";
import { getAnalyticsLinkDetails } from "./google-analytics-link";

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

export function GoogleAnalyticsTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLElement>("[data-ga-event]");
      if (!link || !window.gtag) return;

      const eventName = link.dataset.gaEvent;
      if (!eventName) return;

      window.gtag("event", eventName, {
        page_path: window.location.pathname,
        ...getAnalyticsLinkDetails(link instanceof HTMLAnchorElement ? link.href : undefined, link.textContent),
        contact_method: link.dataset.gaContactMethod,
        cta_location: link.dataset.gaCtaLocation,
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
