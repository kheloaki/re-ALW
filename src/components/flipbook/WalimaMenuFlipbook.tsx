"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { WalimaSpreadViewer } from "@/components/flipbook/WalimaSpreadViewer";
import type { PageFlipHandle } from "@/components/flipbook/page-flip-adapter";
import { usePinchPanZoom } from "@/hooks/usePinchPanZoom";
import {
  fitPageToViewport,
  fitSpreadToViewport,
  getLayoutChrome,
  resolvePageDimensions,
} from "@/lib/flipbook/dimensions";
import type { MenuFlipbookPage } from "@/lib/menuFlipbook";

type WalimaMenuFlipbookProps = {
  pages: MenuFlipbookPage[];
  labels: {
    page: string;
    previous: string;
    next: string;
    open: string;
    zoomReset: string;
    pinchHint: string;
  };
};

export function WalimaMenuFlipbook({ pages, labels }: WalimaMenuFlipbookProps) {
  const flipRef = useRef<PageFlipHandle>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [coverLayout, setCoverLayout] = useState({ width: 320, height: 452 });
  const [spreadLayout, setSpreadLayout] = useState({ width: 160, height: 226 });
  const { containerRef, transform, isZoomed, reset, handlers } = usePinchPanZoom();

  const pageDimensions = useMemo(() => resolvePageDimensions(pages), [pages]);

  const updateLayout = useCallback(() => {
    const chrome = getLayoutChrome();
    setCoverLayout(fitPageToViewport(pageDimensions.width, pageDimensions.height, chrome));
    setSpreadLayout(fitSpreadToViewport(pageDimensions.width, pageDimensions.height, chrome));
  }, [pageDimensions.height, pageDimensions.width]);

  useEffect(() => {
    updateLayout();
    window.addEventListener("resize", updateLayout);
    window.visualViewport?.addEventListener("resize", updateLayout);
    return () => {
      window.removeEventListener("resize", updateLayout);
      window.visualViewport?.removeEventListener("resize", updateLayout);
    };
  }, [updateLayout]);

  useEffect(() => {
    reset();
  }, [currentPage, reset]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isZoomed) return;
      if (event.key === "ArrowRight") flipRef.current?.flipNext();
      if (event.key === "ArrowLeft") flipRef.current?.flipPrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isZoomed]);

  if (!pages.length) {
    return (
      <div className="flex min-h-[50dvh] items-center justify-center px-6 text-center text-[#d6c7aa]">
        Menu pages are not available yet.
      </div>
    );
  }

  return (
    <div className="walima-menu-flipbook flex min-h-0 flex-1 flex-col">
      <div
        ref={containerRef}
        className="flipbook-pinch-zoom relative flex min-h-0 flex-1 touch-none select-none overflow-hidden px-0 py-1 sm:px-3 sm:py-2"
        data-zoomed={isZoomed ? "true" : "false"}
        {...handlers}
      >
        <div
          className="flipbook-pinch-zoom__surface flex h-full w-full items-center justify-center"
          style={{
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scale})`,
            transformOrigin: "center center",
            transition: isZoomed ? "none" : "transform 0.25s ease",
          }}
        >
          <WalimaSpreadViewer
            ref={flipRef}
            pages={pages}
            coverLayout={coverLayout}
            spreadLayout={spreadLayout}
            labels={{ page: labels.page, open: labels.open }}
            currentPage={currentPage}
            interactionLocked={isZoomed}
            onFlip={setCurrentPage}
          />
        </div>
      </div>

      <div className="walima-menu-flipbook__controls flex flex-col items-center gap-1 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2">
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            className="walima-menu-flipbook__nav"
            onClick={() => flipRef.current?.flipPrev()}
            disabled={isZoomed}
            aria-label={labels.previous}
          >
            ‹
          </button>
          <span className="walima-menu-flipbook__counter">
            {currentPage + 1} / {pages.length}
          </span>
          <button
            type="button"
            className="walima-menu-flipbook__nav"
            onClick={() => flipRef.current?.flipNext()}
            disabled={isZoomed}
            aria-label={labels.next}
          >
            ›
          </button>
          {isZoomed ? (
            <button
              type="button"
              className="walima-menu-flipbook__zoom-reset"
              onClick={reset}
              aria-label={labels.zoomReset}
            >
              {labels.zoomReset}
            </button>
          ) : null}
        </div>
        <p className="walima-menu-flipbook__pinch-hint sm:hidden">{labels.pinchHint}</p>
      </div>
    </div>
  );
}
