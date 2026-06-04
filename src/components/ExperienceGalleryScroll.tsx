"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  gallerySectionHeightVh,
  galleryVisualProgress,
  useGalleryScrollProgress,
} from "@/hooks/useGalleryScrollProgress";
import { SectionTitle } from "./ui/SectionTitle";

export type GallerySlide = {
  src: string;
  alt: string;
};

type ExperienceGalleryScrollProps = {
  title: string;
  slides: GallerySlide[];
};

type TriptychState = {
  opacity: number;
  blur: number;
  offsetPct: number;
  scale: number;
  zIndex: number;
};

const TRIPTYCH_CENTER: TriptychState = {
  opacity: 1,
  blur: 0,
  offsetPct: 0,
  scale: 1,
  zIndex: 30,
};

const TRIPTYCH_SIDE: TriptychState = {
  opacity: 0.75,
  blur: 8,
  offsetPct: 0,
  scale: 0.8,
  zIndex: 12,
};

const TRIPTYCH_LEFT: TriptychState = { ...TRIPTYCH_SIDE, offsetPct: -52 };
const TRIPTYCH_RIGHT: TriptychState = { ...TRIPTYCH_SIDE, offsetPct: 52 };
const TRIPTYCH_HIDDEN: TriptychState = {
  opacity: 0,
  blur: 14,
  offsetPct: 0,
  scale: 0.68,
  zIndex: 1,
};

function lerpTriptych(a: TriptychState, b: TriptychState, t: number): TriptychState {
  return {
    opacity: a.opacity + (b.opacity - a.opacity) * t,
    blur: a.blur + (b.blur - a.blur) * t,
    offsetPct: a.offsetPct + (b.offsetPct - a.offsetPct) * t,
    scale: a.scale + (b.scale - a.scale) * t,
    zIndex: Math.round(a.zIndex + (b.zIndex - a.zIndex) * t),
  };
}

function triptychMotion(index: number, scrollIndex: number): TriptychState {
  const d = scrollIndex - index;

  if (d <= -2) return { ...TRIPTYCH_HIDDEN, offsetPct: 58 };
  if (d <= -1) return lerpTriptych({ ...TRIPTYCH_HIDDEN, offsetPct: 58 }, TRIPTYCH_RIGHT, d + 2);
  if (d <= 0) return lerpTriptych(TRIPTYCH_RIGHT, TRIPTYCH_CENTER, d + 1);
  if (d <= 1) return lerpTriptych(TRIPTYCH_CENTER, TRIPTYCH_LEFT, d);
  if (d <= 2) return lerpTriptych(TRIPTYCH_LEFT, { ...TRIPTYCH_HIDDEN, offsetPct: -58 }, d - 1);
  return { ...TRIPTYCH_HIDDEN, offsetPct: -58 };
}

function triptychStyle(state: TriptychState) {
  return {
    opacity: state.opacity,
    filter: state.blur > 0 ? `blur(${state.blur}px)` : "none",
    transform: `translateX(calc(-50% + ${state.offsetPct}%)) translateY(-50%) scale(${state.scale})`,
    zIndex: state.zIndex,
  };
}

export function GalleryPanel({
  title,
  slides,
  scrollIndex,
  activeDot,
  animated = true,
  showTitle = true,
}: {
  title: string;
  slides: GallerySlide[];
  scrollIndex: number;
  activeDot: number;
  animated?: boolean;
  showTitle?: boolean;
}) {
  const activeIndex = Math.min(slides.length - 1, Math.max(0, Math.round(scrollIndex)));

  return (
    <div className="experience-gallery-scroll__panel flex w-full flex-col">
      {showTitle ? (
        <SectionTitle title={title} className="shrink-0 text-3xl text-[#d6ad63] sm:text-5xl lg:text-[70px]" />
      ) : null}

      <div className="experience-gallery-scroll__stage mx-auto mt-3 w-full shrink-0 sm:mt-4">
        {slides.map((slide, index) => {
          const delta = scrollIndex - index;
          if (animated && Math.abs(delta) > 2.05) return null;

          const state = animated
            ? triptychMotion(index, scrollIndex)
            : index === activeIndex
              ? TRIPTYCH_CENTER
              : null;

          if (!state) return null;

          const style = animated ? triptychStyle(state) : triptychStyle(TRIPTYCH_CENTER);

          return (
            <div
              key={slide.src}
              className={`experience-gallery-scroll__slide${state.zIndex >= 30 ? " is-center" : ""}`}
              style={style}
              aria-hidden={index !== activeDot}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 55vw, 420px"
                priority={index === 0}
              />
            </div>
          );
        })}
      </div>

      <div className="mx-auto mt-3 flex shrink-0 justify-center gap-2 sm:mt-4" aria-hidden>
        {slides.map((_, index) => (
          <span
            key={index}
            className={`experience-gallery-scroll__dot ${index === activeDot ? "is-active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

export function ExperienceGalleryScroll({ title, slides }: ExperienceGalleryScrollProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const count = slides.length;
  const lastIndex = Math.max(0, count - 1);
  const [reducedMotion, setReducedMotion] = useState(false);
  const progress = useGalleryScrollProgress(trackRef, count, !reducedMotion);
  const sectionVh = gallerySectionHeightVh(count);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const scrollIndex = useMemo(() => {
    if (count <= 1) return 0;
    return galleryVisualProgress(progress, count) * lastIndex;
  }, [progress, count, lastIndex]);

  const activeDot = Math.min(lastIndex, Math.round(scrollIndex));

  if (count <= 1) {
    return (
      <section id="gallery" className="experience-gallery-scroll bg-[#1a1a1a] pb-12 pt-10 sm:pt-14 lg:pt-16">
        <div className="section-shell px-4 sm:px-6 lg:px-10">
          <div className="experience-gallery-scroll__flow-panel mx-auto max-w-[980px]">
            <GalleryPanel title={title} slides={slides} scrollIndex={0} activeDot={0} animated={false} />
          </div>
        </div>
      </section>
    );
  }

  if (reducedMotion) {
    return (
      <section id="gallery" className="bg-[#1a1a1a] pb-10 pt-10 sm:pb-14 sm:pt-14 lg:pt-[100px]">
        <div className="section-shell px-4 sm:px-6 lg:px-10">
          <SectionTitle title={title} className="text-3xl text-[#d6ad63] sm:text-5xl lg:text-[70px]" />
          <div className="mx-auto mt-6 grid w-full max-w-[980px] grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2">
            {slides.map((slide) => (
              <div
                key={slide.src}
                className="relative aspect-[4/3] overflow-hidden rounded-[12px]"
              >
                <Image src={slide.src} alt={slide.alt} fill className="object-cover" sizes="(max-width: 1024px) 45vw, 480px" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="gallery"
      className="experience-gallery-scroll bg-[#1a1a1a]"
      aria-label={title}
    >
      <div
        ref={trackRef}
        className="experience-gallery-scroll__track"
        style={{ height: `${sectionVh}dvh` }}
      >
        <div className="experience-gallery-scroll__sticky">
          <div className="section-shell experience-gallery-scroll__shell flex min-h-0 flex-col px-4 sm:px-6 lg:px-10">
            <GalleryPanel
              title={title}
              slides={slides}
              scrollIndex={scrollIndex}
              activeDot={activeDot}
              animated
            />
          </div>
        </div>
      </div>
    </section>
  );
}
