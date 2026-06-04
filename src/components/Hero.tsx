"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { routesFor } from "@/lib/routes";
import { GoldButton } from "./ui/GoldButton";

export function Hero() {
  const { locale, dict } = useLocale();
  const routes = routesFor(locale);
  const h = dict.hero;

  return (
    <section className="relative pt-0">
      <div className="section-shell hero-section-height relative overflow-hidden border border-[#8b6f4a]/65 bg-[#2a221c]">
        <div className="pointer-events-none absolute inset-0 lg:inset-x-0 lg:bottom-0 lg:top-[100px]">
          <div className="relative h-full w-full">
            <Image
              src="/assets/hero-facade.avif"
              alt={h.imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
              priority
              fetchPriority="high"
              quality={75}
              className="object-cover object-[center_18%] sm:object-[center_20%] lg:object-[center_22%]"
              style={{
                filter: "brightness(1.03) contrast(1.04) saturate(1.06) sepia(0.06) hue-rotate(-4deg)",
              }}
            />
          </div>
        </div>
        <div aria-hidden className="absolute inset-0 bg-[rgba(0,0,0,0.35)]" />
        <div
          aria-hidden
          className="absolute inset-0 max-lg:bg-[linear-gradient(180deg,transparent_0%,transparent_48%,rgba(0,0,0,0.35)_58%,rgba(0,0,0,0.82)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 max-lg:hidden"
          style={{
            background:
              "radial-gradient(ellipse 92% 62% at 50% 76%, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.52) 38%, rgba(0,0,0,0.22) 58%, transparent 80%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              "radial-gradient(ellipse 100% 55% at 50% 32%, rgba(0,0,0,0.25) 0%, transparent 55%), radial-gradient(ellipse 90% 50% at 50% 88%, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 40%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black lg:to-[rgba(0,0,0,0.92)]"
        />
        <div className="relative z-10 flex min-h-[680px] flex-col items-center justify-end px-4 pb-9 pt-[5.5rem] text-center sm:min-h-[720px] sm:px-6 sm:pb-10 sm:pt-[6rem] lg:h-[820px] lg:min-h-[820px] lg:justify-center lg:px-6 lg:pb-0 lg:pt-[318px]">
          <h1 className="hero-headline font-display max-w-[900px] text-[38px] font-semibold leading-[0.95] text-[#f3d79a] drop-shadow-[0_4px_32px_rgba(0,0,0,0.98)] sm:text-[42px] lg:text-[78px]">
            {h.titleLine1}
            <br />
            {h.titleLine2}
            <br />
            {h.titleLine3}
          </h1>
          <p className="hero-subtitle mt-4 max-w-[820px] text-[15px] leading-[1.4] text-[#f8f0e0] drop-shadow-[0_2px_14px_rgba(0,0,0,0.88)] sm:mt-5 sm:text-base lg:mt-6 lg:text-[22px]">
            {h.subtitle}
          </p>
          <div className="hero-actions mt-6 sm:mt-7 lg:mt-10">
            <Link
              href={routes.menu}
              className="gold-btn inline-flex h-[50px] w-full items-center justify-center text-[15px] lg:h-[58px] lg:w-auto lg:shrink-0 lg:whitespace-nowrap lg:px-10 lg:text-[18px]"
            >
              {h.viewMenu}
            </Link>
            <GoldButton
              href={routes.reservation}
              outline
              className="inline-flex h-[50px] w-full items-center justify-center text-[15px] lg:h-[58px] lg:w-auto lg:shrink-0 lg:whitespace-nowrap lg:px-10 lg:text-[18px]"
            >
              {h.bookNow}
            </GoldButton>
          </div>
        </div>
      </div>
    </section>
  );
}
