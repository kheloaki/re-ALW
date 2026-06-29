"use client";

import Link from "next/link";
import { useMemo, useRef } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { SIGNATURE_DISHES } from "@/lib/menu";
import { routesFor } from "@/lib/routes";
import { ScrollReveal } from "./ScrollReveal";
import { SignatureArchCard } from "./SignatureArchCard";
import { useSectionScrollProgress } from "@/hooks/useSectionScrollProgress";

/** Desktop poster: mint tea bottom = 700 + 820 */
const POSTER_CANVAS_H = 1520;

/** Mobile arch cards — same shape as desktop, no overlap */
const MOBILE_LARGE = { width: 280, height: 459 };
const MOBILE_MEDIUM = { width: 268, height: 447 };

function signatureImage(dish: (typeof SIGNATURE_DISHES)[keyof typeof SIGNATURE_DISHES]) {
  return "image" in dish ? dish.image : undefined;
}

function buildDishes(signatures: ReturnType<typeof useLocale>["dict"]["signatures"]) {
  return {
    tajine: {
      title: signatures.dishes.tajine.title,
      description: signatures.dishes.tajine.description,
      price: SIGNATURE_DISHES.tajine.price,
      image: signatureImage(SIGNATURE_DISHES.tajine),
      size: SIGNATURE_DISHES.tajine.size,
    },
    couscous: {
      title: signatures.dishes.couscous.title,
      description: signatures.dishes.couscous.description,
      price: SIGNATURE_DISHES.couscous.price,
      image: signatureImage(SIGNATURE_DISHES.couscous),
      size: SIGNATURE_DISHES.couscous.size,
    },
    brochettes: {
      title: signatures.dishes.brochettes.title,
      description: signatures.dishes.brochettes.description,
      price: SIGNATURE_DISHES.brochettes.price,
      image: signatureImage(SIGNATURE_DISHES.brochettes),
      size: SIGNATURE_DISHES.brochettes.size,
    },
    the: {
      title: signatures.dishes.tea.title,
      description: signatures.dishes.tea.description,
      price: SIGNATURE_DISHES.the.price,
      image: signatureImage(SIGNATURE_DISHES.the),
      size: SIGNATURE_DISHES.the.size,
    },
  };
}

const POSTER_PARALLAX = [
  { key: "tajine", yFactor: -32, xFactor: 0 },
  { key: "couscous", yFactor: 22, xFactor: 8 },
  { key: "brochettes", yFactor: -18, xFactor: -6 },
  { key: "the", yFactor: 28, xFactor: 10 },
] as const;

function parallaxOffset(progress: number, yFactor: number, xFactor: number) {
  const delta = progress - 0.5;
  return {
    x: delta * xFactor,
    y: delta * yFactor,
  };
}

type SignaturePosterDesktopProps = {
  scrollProgress: number;
};

function SignaturePosterDesktop({
  scrollProgress,
  dishes,
}: SignaturePosterDesktopProps & {
  dishes: ReturnType<typeof buildDishes>;
}) {
  const slots = [
    { dish: dishes.tajine, className: "absolute left-[40px] top-0", ...POSTER_PARALLAX[0], direction: "left" as const, delay: 0 },
    {
      dish: dishes.couscous,
      className: "absolute right-[60px] top-[130px]",
      ...POSTER_PARALLAX[1],
      direction: "right" as const,
      delay: 120,
    },
    {
      dish: dishes.brochettes,
      className: "absolute left-[120px] top-[800px]",
      ...POSTER_PARALLAX[2],
      direction: "left" as const,
      delay: 220,
    },
    {
      dish: dishes.the,
      className: "absolute right-[40px] top-[700px]",
      ...POSTER_PARALLAX[3],
      direction: "right" as const,
      delay: 320,
    },
  ] as const;

  return (
    <>
      {slots.map(({ dish, className, yFactor, xFactor, direction, delay }) => {
        const { x, y } = parallaxOffset(scrollProgress, yFactor, xFactor);
        const isLarge = dish.size === "large";
        return (
          <ScrollReveal
            key={dish.title}
            className={className}
            direction={direction}
            delayMs={delay}
            threshold={0.08}
          >
            <div
              className="sig-poster-parallax"
              style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
            >
              <SignatureArchCard
                title={dish.title}
                description={dish.description}
                price={dish.price}
                image={dish.image}
                size={dish.size}
                width={isLarge ? 500 : 360}
                height={isLarge ? 820 : 600}
              />
            </div>
          </ScrollReveal>
        );
      })}
    </>
  );
}

export function SignatureDishesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useSectionScrollProgress(sectionRef);
  const { locale, dict } = useLocale();
  const routes = routesFor(locale);
  const dishes = useMemo(() => buildDishes(dict.signatures), [dict.signatures]);
  const mobileDishes = useMemo(
    () => [
      { ...dishes.tajine, ...MOBILE_LARGE },
      { ...dishes.couscous, ...MOBILE_MEDIUM },
      { ...dishes.brochettes, ...MOBILE_MEDIUM },
      { ...dishes.the, ...MOBILE_LARGE },
    ],
    [dishes],
  );

  return (
    <section
      ref={sectionRef}
      className="signature-section-height relative overflow-x-hidden overflow-y-clip bg-[#1a1a1a] lg:pb-6"
    >
      <div className="section-shell relative z-10 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-[1000px] pt-5 lg:max-w-none lg:pt-[70px]">
          <ScrollReveal className="flex flex-col items-center" direction="down" delayMs={0}>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#d6ad63]/90 bg-[#1f1c18]/80 text-[32px] text-[#d6ad63] shadow-[0_0_28px_rgba(214,173,99,0.25)] sm:h-[72px] sm:w-[72px] sm:text-[40px]">
              ✶
            </div>
          <h2 className="mt-2 text-center font-display text-4xl leading-none text-[#d6ad63] sm:text-5xl lg:mt-3 lg:text-[76px]">
            {dict.signatures.title}
          </h2>
          </ScrollReveal>

          <div className="mx-auto mt-6 flex w-full max-w-[300px] flex-col items-center gap-7 pb-4 sm:max-w-[320px] lg:hidden">
            {mobileDishes.map((d, i) => (
              <ScrollReveal
                key={d.title}
                direction={i % 2 === 0 ? "left" : "right"}
                delayMs={i * 100}
                threshold={0.15}
              >
                <SignatureArchCard
                  title={d.title}
                  description={d.description}
                  price={d.price}
                  image={d.image}
                  size={d.size}
                  width={d.width}
                  height={d.height}
                  variant="stacked"
                />
              </ScrollReveal>
            ))}
          </div>

          <div
            className="relative mx-auto mt-[90px] hidden w-full max-w-[1000px] lg:block"
            style={{ height: POSTER_CANVAS_H }}
          >
            <SignaturePosterDesktop scrollProgress={scrollProgress} dishes={dishes} />
          </div>

          <ScrollReveal className="relative z-30 mt-6 pb-10 text-center lg:mt-10 lg:pb-12" direction="up" delayMs={80}>
            <Link
              href={routes.menu}
              className="gold-btn relative z-30 inline-flex h-[56px] w-full max-w-[280px] items-center justify-center text-base shadow-[0_8px_32px_rgba(0,0,0,0.55)] sm:h-[62px] sm:w-[260px] sm:text-[18px]"
            >
              {dict.signatures.viewFullMenu}
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
