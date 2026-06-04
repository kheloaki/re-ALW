"use client";

import { useEffect, useState, type RefObject } from "react";

/** 0 when section top hits viewport bottom, 1 when section bottom leaves viewport top */
export function useSectionScrollProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0.5);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      if (total <= 0) return;
      const scrolled = vh - rect.top;
      const p = Math.min(1, Math.max(0, scrolled / total));
      setProgress(p);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);

  return progress;
}
