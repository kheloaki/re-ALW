"use client";

import { useLocale } from "@/components/LocaleProvider";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Locale } from "@/i18n/config";

const AWARD_HREF = "https://restaurantguru.com/Restaurant-Al-walima-Agadir";
const GURU_HREF = "https://restaurantguru.com";
const AWARD_CSS = "https://awards.infcdn.net/2024/r_gold.css";

const AWARD_LANG: Record<Locale, string> = {
  en: "rg-award-lang-en_US",
  fr: "rg-award-lang-fr_FR",
  es: "rg-award-lang-es_ES",
  de: "rg-award-lang-de_DE",
  pl: "rg-award-lang-pl_PL",
  ar: "rg-award-lang-en_US",
};

function GuruBadge({ locale }: { locale: Locale }) {
  return (
    <div
      id="b-gold"
      className={AWARD_LANG[locale]}
      role="link"
      tabIndex={0}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("a")) return;
        window.open(AWARD_HREF, "_blank", "noopener,noreferrer");
      }}
      onKeyDown={(event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        window.open(AWARD_HREF, "_blank", "noopener,noreferrer");
      }}
    >
      <a href={AWARD_HREF} className="b-gold_r-link" target="_blank" rel="noopener noreferrer">
        Restaurant Al Walima
      </a>
      <p className="b-gold_center">Best seffa</p>
      <a href={GURU_HREF} className="b-gold__link" target="_blank" rel="noopener noreferrer">
        Restaurant Guru
      </a>
      <p className="b-gold_year">2026</p>
    </div>
  );
}

export function RestaurantGuruAward() {
  const { locale, dict } = useLocale();
  const a = dict.award;

  return (
    <section
      id="award"
      className="restaurant-guru-award relative overflow-hidden border-t border-[#d6ad63]/20 bg-[#181512] py-12 sm:py-14 lg:py-16"
      aria-labelledby="award-heading"
    >
      <link rel="stylesheet" href={AWARD_CSS} precedence="default" />

      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,173,99,0.14)_0%,transparent_58%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 font-display text-[7rem] leading-none text-[#d6ad63]/[0.07] sm:top-6 sm:text-[9rem] lg:text-[11rem]"
        aria-hidden
      >
        ❦
      </div>

      <div className="section-shell relative z-10 px-4 sm:px-6 lg:px-10">
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.28em] text-[#d6ad63]/85 sm:text-xs">
          {a.eyebrow}
        </p>
        <SectionTitle
          id="award-heading"
          title={a.title}
          className="mt-3 !text-[2.35rem] sm:!text-5xl lg:!text-[3.75rem]"
        />
        <p className="mx-auto mt-4 max-w-[34rem] text-center text-[15px] leading-relaxed text-[#c4b8a4] sm:mt-5 sm:text-base lg:text-lg">
          {a.subtitle}
        </p>

        <div className="mx-auto mt-8 flex max-w-[28rem] flex-col items-center sm:mt-10">
          <div className="restaurant-guru-award__badge-scale flex justify-center py-2">
            <GuruBadge locale={locale} />
          </div>
          <p className="mt-6 max-w-[26rem] text-center text-sm leading-relaxed text-[#9a8f78] sm:text-[15px]">
            {a.caption}
          </p>
          <a
            href={AWARD_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center border-b border-[#d6ad63]/55 pb-0.5 font-display text-base tracking-wide text-[#d6ad63] transition hover:border-[#f1d28a] hover:text-[#f1d28a] sm:text-lg"
          >
            {a.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
