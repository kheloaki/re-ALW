import Script from "next/script";
import { Suspense } from "react";
import { GoogleAnalyticsPageView } from "@/components/analytics/GoogleAnalyticsPageView";

type GoogleAnalyticsProps = {
  measurementId: string;
};

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', { send_page_view: false });
        `}
      </Script>
      <Suspense fallback={null}>
        <GoogleAnalyticsPageView measurementId={measurementId} />
      </Suspense>
    </>
  );
}
