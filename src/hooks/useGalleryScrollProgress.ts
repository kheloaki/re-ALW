"use client";

import { useEffect, useState, type RefObject } from "react";

/** Header offset — matches pinned section shell padding */
export const PINNED_HEADER_OFFSET_PX = 78;

/** Scroll distance (vh) per slide transition while the panel is sticky */
export const GALLERY_TRANSITION_VH = 34;
/** Sticky viewport (vh) — one full screen of gallery before slide transitions */
export const GALLERY_VIEWPORT_VH = 100;

export function galleryTrackHeightVh(slideCount: number): number {
  if (slideCount <= 1) return GALLERY_VIEWPORT_VH;
  return GALLERY_VIEWPORT_VH + (slideCount - 1) * GALLERY_TRANSITION_VH;
}

export function gallerySectionHeightVh(slideCount: number): number {
  return galleryTrackHeightVh(slideCount);
}

function readPinLine(): number {
  const headerEl = document.querySelector(".site-header");
  return headerEl
    ? headerEl.getBoundingClientRect().bottom
    : PINNED_HEADER_OFFSET_PX;
}

/**
 * Sticky-track gallery scroll (no fixed overlay).
 * Progress runs over (track height − sticky viewport).
 */
export function useGalleryScrollProgress(
  trackRef: RefObject<HTMLElement | null>,
  slideCount: number,
  enabled = true,
): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!enabled || slideCount <= 1) return;

    const trackEl = trackRef.current;
    if (!trackEl) return;

    let raf = 0;

    const update = () => {
      const node = trackRef.current;
      if (!node) return;

      const vh = window.innerHeight;
      const pinLine = readPinLine();
      const rect = node.getBoundingClientRect();
      const trackPx = node.offsetHeight;
      const stickyPx = Math.max(1, vh - pinLine);
      const scrollSpan = Math.max(1, trackPx - stickyPx);
      const scrolled = Math.max(0, pinLine - rect.top);
      const transitionProgress = Math.min(1, scrolled / scrollSpan);

      if (rect.bottom < pinLine || rect.top > vh) {
        setProgress(rect.top > vh ? 0 : 1);
        return;
      }

      setProgress(transitionProgress);
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
  }, [trackRef, slideCount, enabled]);

  return progress;
}

/** Maps scroll progress 0→1 to slide index 0→1 (first and last slides fully visible). */
export function galleryVisualProgress(progress: number, slideCount: number): number {
  if (slideCount <= 1) return 0;
  return Math.min(1, Math.max(0, progress));
}

/** Scroll the page so the gallery track sits at the given 0→1 progress. */
export function scrollGalleryToProgress(
  trackEl: HTMLElement,
  progress: number,
  behavior: ScrollBehavior = "smooth",
): void {
  const vh = window.innerHeight;
  const pinLine = readPinLine();
  const trackPx = trackEl.offsetHeight;
  const stickyPx = Math.max(1, vh - pinLine);
  const scrollSpan = Math.max(1, trackPx - stickyPx);
  const targetScrolled = Math.min(1, Math.max(0, progress)) * scrollSpan;
  const rect = trackEl.getBoundingClientRect();
  const currentScrolled = Math.min(scrollSpan, Math.max(0, pinLine - rect.top));
  const delta = targetScrolled - currentScrolled;

  if (Math.abs(delta) < 1) return;

  window.scrollTo({ top: window.scrollY + delta, behavior });
}
