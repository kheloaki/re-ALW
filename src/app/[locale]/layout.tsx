import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Amiri, Cormorant_Garamond, Dancing_Script, Inter, Noto_Naskh_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import { LocaleProvider } from "@/components/LocaleProvider";
import { StickyActionButtons } from "@/components/StickyActionButtons";
import { SmoothScroll } from "@/components/SmoothScroll";
import { JsonLd } from "@/components/seo/JsonLd";
import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getPlaceLocalSeo } from "@/lib/googlePlaceLocal";
import { getGlobalSchemas } from "@/lib/seo/schema";
import { getSiteUrl } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-playfair",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const dividerScript = Dancing_Script({
  variable: "--font-divider-script",
  weight: ["700"],
  subsets: ["latin"],
  display: "swap",
});

/** Arabic hero & display — Cormorant has no Arabic glyphs */
const amiri = Amiri({
  variable: "--font-arabic-display",
  weight: ["400", "700"],
  subsets: ["arabic"],
  display: "swap",
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  variable: "--font-arabic-body",
  weight: ["400", "500", "600", "700"],
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#141210",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const placeLocal = getPlaceLocalSeo(locale);
  const dir = locale === "ar" ? "rtl" : "ltr";
  const fontVars =
    locale === "ar"
      ? `${inter.variable} ${cormorant.variable} ${dividerScript.variable} ${amiri.variable} ${notoNaskhArabic.variable}`
      : `${inter.variable} ${cormorant.variable} ${dividerScript.variable}`;

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`${fontVars} h-full scroll-smooth antialiased`}
    >
      <body
        suppressHydrationWarning
        className="flex min-h-full flex-col overflow-x-hidden"
      >
        {/* JSON-LD in body — avoids head scripts rewritten by browser extensions before hydrate */}
        <JsonLd data={getGlobalSchemas(locale, placeLocal)} />
        <LocaleProvider locale={locale} dict={dict}>
          <SmoothScroll />
          {children}
          <StickyActionButtons />
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}
