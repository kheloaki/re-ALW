"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { FlipbookPage } from "@/components/flipbook/flipbook-page";
import { PageFlipAdapter, type PageFlipHandle } from "@/components/flipbook/page-flip-adapter";
import { isSoloCoverSpread } from "@/lib/flipbook/cover-phase";
import type { PageDimensions } from "@/lib/flipbook/dimensions";
import { COVER_SLIDE_MS } from "@/lib/flipbook/viewport-fit";
import type { MenuFlipbookPage } from "@/lib/menuFlipbook";

type FlipState = "user_fold" | "fold_corner" | "flipping" | "read";

type CoverMotion =
  | "center-rest"
  | "slide-to-right"
  | "right-rest"
  | "opening"
  | "spread"
  | "right-after-close"
  | "slide-to-center";

type WalimaSpreadViewerProps = {
  pages: MenuFlipbookPage[];
  coverLayout: PageDimensions;
  spreadLayout: PageDimensions;
  labels: {
    page: string;
    open: string;
  };
  currentPage?: number;
  interactionLocked?: boolean;
  onFlip?: (page: number) => void;
};

export const WalimaSpreadViewer = forwardRef<PageFlipHandle, WalimaSpreadViewerProps>(
  function WalimaSpreadViewer(
    { pages, coverLayout, spreadLayout, labels, currentPage = 0, interactionLocked = false, onFlip },
    ref,
  ) {
    const bookRef = useRef<PageFlipHandle>(null);
    const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
    const sequencingRef = useRef(false);

    const [isFlipping, setIsFlipping] = useState(false);
    const [coverMotion, setCoverMotion] = useState<CoverMotion>(() =>
      currentPage === 0 ? "center-rest" : "spread",
    );

    const slideOffset = spreadLayout.width / 2;

    const coverScale = useMemo(
      () =>
        Math.min(
          coverLayout.width / spreadLayout.width,
          coverLayout.height / spreadLayout.height,
        ),
      [coverLayout.height, coverLayout.width, spreadLayout.height, spreadLayout.width],
    );

    const onFrontCoverRest = currentPage === 0 && isSoloCoverSpread(0, pages.length);
    const inCoverScale = onFrontCoverRest && !isFlipping && coverMotion !== "opening";

    const centerOffset = -slideOffset * (inCoverScale ? coverScale : 1);

    const stageTranslateX = useMemo(() => {
      if (coverMotion === "opening" || coverMotion === "spread" || currentPage > 0) {
        return 0;
      }
      if (
        coverMotion === "right-rest" ||
        coverMotion === "slide-to-right" ||
        coverMotion === "right-after-close"
      ) {
        return 0;
      }
      return centerOffset;
    }, [centerOffset, coverMotion, currentPage]);

    const stageScale = inCoverScale ? coverScale : 1;

    const clearTimers = () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };

    const schedule = (fn: () => void, delay: number) => {
      const id = setTimeout(fn, delay);
      timersRef.current.push(id);
    };

    useEffect(() => clearTimers, []);

    useEffect(() => {
      if (sequencingRef.current) return;
      const live = bookRef.current?.getCurrentPage();
      if (live === undefined || live === currentPage) return;
      bookRef.current?.flip(currentPage);
    }, [currentPage]);

    useEffect(() => {
      if (sequencingRef.current) return;
      if (currentPage === 0) {
        setCoverMotion((motion) =>
          motion === "right-after-close" || motion === "slide-to-center" ? motion : "center-rest",
        );
      } else if (currentPage > 0) {
        setCoverMotion("spread");
      }
    }, [currentPage]);

    const runCloseToCenter = useCallback(() => {
      clearTimers();
      sequencingRef.current = true;
      setCoverMotion("right-after-close");

      schedule(() => {
        setCoverMotion("slide-to-center");
      }, 40);

      schedule(() => {
        setCoverMotion("center-rest");
        sequencingRef.current = false;
      }, COVER_SLIDE_MS + 40);
    }, []);

    const startOpenSequence = useCallback(() => {
      if (sequencingRef.current || currentPage !== 0) return;
      clearTimers();
      sequencingRef.current = true;
      setCoverMotion("slide-to-right");

      schedule(() => {
        setCoverMotion("opening");
        bookRef.current?.flipNext();
      }, COVER_SLIDE_MS);

      schedule(() => {
        setCoverMotion("spread");
        sequencingRef.current = false;
      }, COVER_SLIDE_MS + 950);
    }, [currentPage]);

    const handleFlip = useCallback(
      (page: number) => {
        if (page === 0) {
          runCloseToCenter();
        } else if (page > 0) {
          setCoverMotion("spread");
        }
        onFlip?.(page);
      },
      [onFlip, runCloseToCenter],
    );

    const handleFlipStateChange = useCallback(
      (state: FlipState) => {
        const flipping =
          state === "flipping" || state === "user_fold" || state === "fold_corner";
        setIsFlipping(flipping);

        if (
          state === "user_fold" &&
          currentPage === 0 &&
          coverMotion === "center-rest" &&
          !sequencingRef.current
        ) {
          startOpenSequence();
        }
      },
      [coverMotion, currentPage, startOpenSequence],
    );

    useImperativeHandle(
      ref,
      () => ({
        flipNext: () => {
          if (currentPage === 0 && coverMotion === "center-rest" && !sequencingRef.current) {
            startOpenSequence();
            return;
          }
          bookRef.current?.flipNext();
        },
        flipPrev: () => bookRef.current?.flipPrev(),
        flip: (page: number) => {
          if (page === 0 && currentPage > 0) {
            bookRef.current?.flip(0);
            return;
          }
          if (page === 0 && currentPage === 0) return;
          bookRef.current?.flip(page);
        },
        getCurrentPage: () => bookRef.current?.getCurrentPage() ?? currentPage,
      }),
      [coverMotion, currentPage, startOpenSequence],
    );

    const blockNativeCoverFlip =
      !interactionLocked &&
      currentPage === 0 &&
      (coverMotion === "center-rest" || coverMotion === "slide-to-center");

    if (!pages.length) return null;

    const stageClass = [
      "immersive-book-stage",
      "walima-flipbook-book",
      "relative",
      "mx-auto",
      isFlipping || coverMotion === "opening" ? "immersive-book-stage--flipping" : "",
      coverMotion === "slide-to-right" ||
      coverMotion === "slide-to-center" ||
      coverMotion === "right-after-close"
        ? "immersive-book-stage--shifting"
        : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        <div
          className={stageClass}
          style={{
            width: spreadLayout.width * 2,
            height: spreadLayout.height,
            transform: `translateX(${stageTranslateX}px) scale(${stageScale})`,
          }}
        >
        <div className={interactionLocked ? "pointer-events-none" : undefined}>
          <PageFlipAdapter
            ref={bookRef}
            width={spreadLayout.width}
            height={spreadLayout.height}
            usePortrait={false}
            showCover
            startPage={currentPage}
            disableFlipByClick={blockNativeCoverFlip || interactionLocked}
            onFlip={handleFlip}
            onFlipStateChange={handleFlipStateChange}
          >
            {pages.map((page, index) => (
              <FlipbookPage
                key={page.id}
                src={page.src}
                alt={`${labels.page} ${page.pageNumber}`}
                density={index === 0 || index === pages.length - 1 ? "hard" : "soft"}
                priority={index < 3}
              />
            ))}
          </PageFlipAdapter>
        </div>
        </div>

        {blockNativeCoverFlip ? (
          <button
            type="button"
            aria-label={labels.open}
            className="absolute inset-0 z-10 cursor-pointer border-0 bg-transparent p-0"
            onClick={(event) => {
              event.stopPropagation();
              startOpenSequence();
            }}
          />
        ) : null}
      </div>
    );
  },
);
