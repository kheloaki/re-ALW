"use client";

import dynamic from "next/dynamic";
import { forwardRef, useImperativeHandle, useRef } from "react";

const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false });

type FlipState = "user_fold" | "fold_corner" | "flipping" | "read";

type FlipBookRef = {
  pageFlip: () => {
    flipNext: () => void;
    flipPrev: () => void;
    flip: (page: number) => void;
    getCurrentPageIndex: () => number;
  } | undefined;
};

export type PageFlipHandle = {
  flipNext: () => void;
  flipPrev: () => void;
  flip: (page: number) => void;
  getCurrentPage: () => number;
};

type PageFlipAdapterProps = {
  width: number;
  height: number;
  usePortrait?: boolean;
  showCover?: boolean;
  startPage?: number;
  disableFlipByClick?: boolean;
  onFlip?: (page: number) => void;
  onFlipStateChange?: (state: FlipState) => void;
  children: React.ReactNode;
};

export const PageFlipAdapter = forwardRef<PageFlipHandle, PageFlipAdapterProps>(
  function PageFlipAdapter(
    {
      width,
      height,
      usePortrait = false,
      showCover = true,
      startPage = 0,
      disableFlipByClick = false,
      onFlip,
      onFlipStateChange,
      children,
    },
    ref,
  ) {
    const bookRef = useRef<FlipBookRef>(null);

    useImperativeHandle(ref, () => ({
      flipNext: () => bookRef.current?.pageFlip()?.flipNext(),
      flipPrev: () => bookRef.current?.pageFlip()?.flipPrev(),
      flip: (page: number) => bookRef.current?.pageFlip()?.flip(page),
      getCurrentPage: () => bookRef.current?.pageFlip()?.getCurrentPageIndex() ?? 0,
    }));

    return (
      <HTMLFlipBook
        key={`book-${width}-${height}`}
        ref={bookRef}
        width={width}
        height={height}
        size="fixed"
        minWidth={width}
        maxWidth={width}
        minHeight={height}
        maxHeight={height}
        drawShadow
        flippingTime={900}
        usePortrait={usePortrait}
        startPage={startPage}
        showCover={showCover}
        mobileScrollSupport
        startZIndex={0}
        autoSize={false}
        maxShadowOpacity={0.72}
        clickEventForward
        useMouseEvents
        swipeDistance={24}
        showPageCorners
        disableFlipByClick={disableFlipByClick}
        className="walima-flipbook"
        style={{}}
        onFlip={(event: { data: number }) => onFlip?.(event.data)}
        onChangeState={(event: { data: FlipState }) => onFlipStateChange?.(event.data)}
      >
        {children}
      </HTMLFlipBook>
    );
  },
);
