import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { MenuPageContent } from "@/components/menu/MenuPageContent";
import { MenuPageHero } from "@/components/menu/MenuPageHero";
import { MoroccanDivider } from "@/components/MoroccanDivider";
import { Navbar } from "@/components/Navbar";
import { JsonLd } from "@/components/seo/JsonLd";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { FOOTER_SEO_KEYWORDS } from "@/lib/footerSeo";
import { getLocalSeoKeywords } from "@/lib/seo/local";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getMenuPageSchemas } from "@/lib/seo/schema";
import { SITE } from "@/lib/site";
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
    path: "/menu",
    title: dict.menuPage.metaTitle,
    description: dict.menuPage.metaDescription,
    keywords: [...FOOTER_SEO_KEYWORDS, ...getLocalSeoKeywords(raw), "carte restaurant Agadir", "menu Al Walima"],
  });
}

export default async function MenuPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="site-shell main-wrapper">
      <JsonLd
        data={getMenuPageSchemas(
          locale,
          dict.menuPage.metaTitle,
          dict.menuPage.metaDescription,
          SITE.name,
          dict.menuPage.title,
        )}
      />
      <Navbar />
      <main className="bg-[#141210]">
        <MenuPageHero dict={dict.menuPage} />

        <section className="section-shell relative px-5 py-10 sm:px-10 sm:py-12 lg:py-14">
          <div className="mx-auto max-w-[1100px]">
            <MenuPageContent />
          </div>
        </section>

        <MoroccanDivider />
      </main>
      <Footer />
    </div>
  );
}
