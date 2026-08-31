import { preload } from "react-dom";
import { ExperienceGallery } from "@/components/ExperienceGallery";
import { HomePageShell } from "@/components/HomePageShell";
import { HERO_IMAGE_SRC } from "@/lib/homePreloadAssets";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { MoroccanDivider } from "@/components/MoroccanDivider";
import { Navbar } from "@/components/Navbar";
import { ReservationSection } from "@/components/ReservationSection";
import { RestaurantMapSection } from "@/components/RestaurantMapSection";
import { RestaurantGuruAward } from "@/components/RestaurantGuruAward";
import { ReviewsMarquee } from "@/components/ReviewsMarquee";
import { SignatureDishesSection } from "@/components/SignatureDishesSection";
import { WelcomeSection } from "@/components/WelcomeSection";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { FOOTER_SEO_KEYWORDS } from "@/lib/footerSeo";
import { getLocalSeoKeywords } from "@/lib/seo/local";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getHomePageSchemas } from "@/lib/seo/schema";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw);

  return buildPageMetadata({
    locale: raw,
    path: "/",
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: [...FOOTER_SEO_KEYWORDS, ...getLocalSeoKeywords(raw)],
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  preload(HERO_IMAGE_SRC, { as: "image", fetchPriority: "high" });

  return (
    <HomePageShell>
      <div className="site-shell main-wrapper">
        <JsonLd data={getHomePageSchemas(locale, dict.meta.title, dict.meta.description)} />
        <Navbar />
        <main>
          <Hero />
          <MoroccanDivider />
          <WelcomeSection />
          <RestaurantGuruAward />
          <ReviewsMarquee locale={locale} />
          <SignatureDishesSection />
          <div className="gallery-reservation-footer-height">
            <ExperienceGallery locale={locale} />
            <ReservationSection locale={locale} />
          </div>
          <RestaurantMapSection locale={locale} />
          <FaqSection locale={locale} />
        </main>
        <Footer />
      </div>
    </HomePageShell>
  );
}
