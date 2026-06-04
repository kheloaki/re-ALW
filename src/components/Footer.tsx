"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLocale } from "@/components/LocaleProvider";
import { localePath } from "@/i18n/config";
import { FOOTER_SEO_BLURB, FOOTER_SEO_LISTS } from "@/lib/footerSeo";
import { routesFor } from "@/lib/routes";
import { getGoogleMapsPlaceUrl, LOCAL } from "@/lib/local";
import { getVenueDirectionsUrl, VENUE } from "@/lib/venue";

function CornerOrnament({ className = "", flipX = false }: { className?: string; flipX?: boolean }) {
  return (
    <svg
      className={className}
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
      style={flipX ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="M8 92 C 28 72 22 48 8 28 C 18 38 32 42 42 32 C 52 22 48 8 28 8 C 48 12 62 28 72 42 C 82 56 88 72 92 88"
        stroke="rgba(214,173,99,0.35)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M18 88 C 32 74 30 58 22 44 M 38 82 C 48 70 46 58 40 50"
        stroke="rgba(214,173,99,0.22)"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <circle cx="24" cy="24" r="3" fill="rgba(214,173,99,0.2)" />
    </svg>
  );
}

function MoroccanRule({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 10" fill="none" aria-hidden>
      <path
        d="M0 5h80M320 5h80M190 0.5l10 4.5-10 4.5-10-4.5 10-4.5z"
        stroke="rgba(214,173,99,0.35)"
        strokeWidth="1"
      />
      <path
        d="M100 5c20-7 40-7 60 0s40 7 60 0 40-7 60 0"
        stroke="rgba(214,173,99,0.22)"
        strokeWidth="0.8"
        fill="none"
      />
    </svg>
  );
}

export function Footer() {
  const { locale, dict } = useLocale();
  const f = dict.footer;
  const routes = routesFor(locale);
  const menuHref = localePath(locale, "/menu");

  const infoLinks = [
    { label: f.links.menu, href: routes.menu },
    { label: f.links.reservations, href: routes.reservation },
    { label: f.links.reviews, href: `${routes.home}#reviews` },
    { label: f.links.contact, href: `${routes.home}#contact` },
  ] as const;

  return (
    <footer className="relative min-h-0 overflow-visible border-t border-[#d6ad63]/40 bg-[#252220] py-8 sm:py-14 lg:py-20">
      <CornerOrnament className="pointer-events-none absolute left-3 top-4 h-[64px] w-[64px] opacity-90 sm:left-8 sm:top-10 sm:h-[100px] sm:w-[100px]" />
      <CornerOrnament className="pointer-events-none absolute bottom-4 right-3 h-[64px] w-[64px] opacity-90 sm:bottom-10 sm:right-8 sm:h-[100px] sm:w-[100px]" flipX />
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d6ad63]/35 to-transparent"
        aria-hidden
      />
      <div className="section-shell px-5 sm:px-10 lg:px-14">
        <MoroccanRule className="mx-auto mb-6 hidden h-2.5 w-[min(100%,400px)] lg:mb-8 lg:block" />
        <div className="mx-auto grid w-full max-w-[1000px] grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-28 xl:gap-32">
          <div className="space-y-0 border-b border-[#d6ad63]/15 pb-6 lg:border-b-0 lg:pb-0">
            <BrandLogo href={routes.home} variant="footer" />
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#d8cbb0] sm:mt-3 sm:text-[15px] sm:leading-[1.6] lg:text-[17px]">
              {f.brandText}
            </p>
          </div>
          <div className="space-y-0 border-b border-[#d6ad63]/15 pb-6 lg:border-b-0 lg:pb-0">
            <h3 className="font-display text-2xl tracking-tight text-[#e4c47a] sm:text-3xl lg:text-[40px]">{f.findUs}</h3>
            <address className="mt-2 text-sm not-italic leading-relaxed text-[#d8cbb0] sm:mt-3 sm:text-[15px] sm:leading-[1.6] lg:text-[17px]">
              <span className="font-display text-[#e4c47a]">{LOCAL.businessName}</span>
              <br />
              {LOCAL.streetAddress}
              <br />
              {LOCAL.addressLine2}
              <br />
              {LOCAL.postalCode} {LOCAL.locality}, {LOCAL.countryCode}
              <br />
              <a href={`tel:${LOCAL.phoneTel}`} className="venue-phone-link venue-phone-link--footer mt-2 text-[#d6ad63] hover:underline">
                {LOCAL.phone}
              </a>
            </address>
            <p className="mt-2">
              <a
                href={getGoogleMapsPlaceUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#a89a82] underline decoration-[#d6ad63]/35 underline-offset-2 hover:text-[#d6ad63] sm:text-[15px]"
              >
                Google Maps — {LOCAL.neighborhood}, {LOCAL.locality}
              </a>
            </p>
            <div className="mt-4 grid max-w-sm grid-cols-1 gap-2.5 sm:mt-5 sm:max-w-none sm:grid-cols-2 sm:gap-3 lg:flex lg:flex-wrap">
              <a
                href={`tel:${VENUE.phoneTel}`}
                className="gold-btn inline-flex h-11 w-full items-center justify-center px-5 py-2 text-sm sm:h-12 sm:px-8"
              >
                {f.call}
              </a>
              <a
                href={getVenueDirectionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-outline-btn inline-flex h-11 w-full items-center justify-center px-5 py-2 text-sm sm:h-12 sm:px-8"
              >
                {f.directions}
              </a>
            </div>
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="font-display text-2xl tracking-tight text-[#e4c47a] sm:text-3xl lg:text-[40px]">{f.info}</h3>
            <ul className="mt-2 space-y-2 text-sm leading-relaxed text-[#d8cbb0] sm:mt-3 sm:space-y-2.5 sm:text-[15px] sm:leading-[1.6] lg:text-[17px]">
              {infoLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="transition hover:text-[#f5ecd8]">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5 lg:mt-6">
              <LanguageSwitcher variant="footer" />
            </div>
          </div>
        </div>

        <section
          className="mx-auto mt-8 max-w-[1000px] border-t border-[#d6ad63]/20 pt-6 sm:mt-10 sm:pt-8"
          aria-labelledby="footer-seo-heading"
        >
          <h4
            id="footer-seo-heading"
            className="font-display text-lg tracking-tight text-[#c9a85c]/90 sm:text-xl"
          >
            {f.seoTitle}
          </h4>
          <p className="mt-3 text-[11px] leading-relaxed text-[#9a8f78] sm:text-xs sm:leading-[1.65]">
            {FOOTER_SEO_BLURB}
          </p>
          <nav className="mt-5 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-8" aria-label={f.seoTitle}>
            {FOOTER_SEO_LISTS.map((group) => (
              <div key={group.heading}>
                <h5 className="font-display text-base tracking-tight text-[#c9a85c]/85 sm:text-[17px]">
                  {group.heading}
                </h5>
                <ul className="mt-2 list-disc space-y-2 pl-4 marker:text-[#d6ad63]/45 sm:mt-2.5 sm:space-y-2.5">
                  {group.pages.map((page) => (
                    <li
                      key={page.slug}
                      className="text-[13px] leading-snug text-[#b5a690] sm:text-[14px] sm:leading-[1.45]"
                    >
                      <Link href={menuHref} className="transition hover:text-[#e8d4a8]">
                        {page.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </section>

        <p className="mx-auto mt-6 max-w-[1000px] text-center text-[10px] text-[#7a7268] sm:mt-8 sm:text-[11px]">
          © {new Date().getFullYear()} {VENUE.name} — {VENUE.line2}, Maroc. {f.rights}
        </p>
        <p className="mx-auto mt-2 max-w-[1000px] text-center text-[10px] text-[#6e665c] sm:text-[11px]">
          {f.developedBy}{" "}
          <a
            href="https://itagroupe.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#a89a82] underline decoration-[#d6ad63]/35 underline-offset-2 transition hover:text-[#d6ad63]"
          >
            ITAGROUPE.com
          </a>
        </p>

        <MoroccanRule className="mx-auto mt-6 h-2.5 w-[min(100%,400px)] opacity-80 lg:hidden" />
      </div>
    </footer>
  );
}
