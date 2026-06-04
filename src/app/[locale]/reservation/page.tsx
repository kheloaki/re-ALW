import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ReservationExperience } from "@/components/reservation/ReservationExperience";
import { JsonLd } from "@/components/seo/JsonLd";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getLocalSeoKeywords } from "@/lib/seo/local";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getReservationPageSchemas } from "@/lib/seo/schema";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw);

  return buildPageMetadata({
    locale: raw,
    path: "/reservation",
    title: dict.reservationPage.metaTitle,
    description: dict.reservationPage.metaDescription,
    keywords: [
      ...getLocalSeoKeywords(raw),
      "réserver table Agadir",
      "reservation restaurant Al Walima",
    ],
  });
}

export default async function ReservationPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="site-shell main-wrapper">
      <JsonLd
        data={getReservationPageSchemas(
          locale,
          dict.reservationPage.metaTitle,
          dict.reservationPage.metaDescription,
          undefined,
          dict.reservation.sectionTitle,
        )}
      />
      <Navbar />
      <main>
        <ReservationExperience locale={locale} variant="page" />
      </main>
      <Footer />
    </div>
  );
}
