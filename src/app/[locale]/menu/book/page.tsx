import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WalimaMenuFlipbook } from "@/components/flipbook/WalimaMenuFlipbook";
import { JsonLd } from "@/components/seo/JsonLd";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getMenuFlipbookPages } from "@/lib/menuFlipbook";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getSiteUrl, SITE } from "@/lib/site";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw);

  return buildPageMetadata({
    locale: raw,
    path: "/menu/book",
    title: dict.menuFlipbook.metaTitle,
    description: dict.menuFlipbook.metaDescription,
    keywords: ["menu Al Walima", "carte restaurant Agadir", "menu QR Al Walima"],
  });
}

export default async function MenuFlipbookPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const f = dict.menuFlipbook;
  const pages = getMenuFlipbookPages();

  return (
    <div className="menu-flipbook-page flex h-[100dvh] flex-col overflow-hidden bg-[#141210] text-[#f8e8c0]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Menu",
          name: f.title,
          description: f.metaDescription,
          url: `${getSiteUrl()}${localePath(locale, "/menu/book")}`,
          inLanguage: locale,
          provider: {
            "@type": "Restaurant",
            name: SITE.name,
          },
        }}
      />

      <header className="menu-flipbook-page__header border-b border-[#d6ad63]/20 bg-[#141210]/95 px-4 py-3 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-display text-lg text-[#d6ad63] sm:text-xl">{SITE.name}</p>
            <h1 className="truncate text-sm text-[#d6c7aa] sm:text-base">{f.title}</h1>
          </div>
          <Link
            href={localePath(locale, "/")}
            className="menu-flipbook-page__back shrink-0 rounded-full border border-[#d6ad63]/45 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#f0dfb8] transition hover:border-[#e4c47a]/75 hover:text-[#fff8e8] sm:px-4 sm:text-sm"
          >
            {f.back}
          </Link>
        </div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col">
        <WalimaMenuFlipbook
          pages={pages}
          labels={{
            page: f.pageLabel,
            previous: f.previous,
            next: f.next,
            open: f.open,
            zoomReset: f.zoomReset,
            pinchHint: f.pinchHint,
          }}
        />
      </main>
    </div>
  );
}
