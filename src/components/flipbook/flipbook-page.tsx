"use client";

import { forwardRef } from "react";

type FlipbookPageProps = {
  src: string;
  alt: string;
  density?: "soft" | "hard";
  priority?: boolean;
};

export const FlipbookPage = forwardRef<HTMLDivElement, FlipbookPageProps>(function FlipbookPage(
  { src, alt, density = "soft", priority = false },
  ref,
) {
  return (
    <div
      ref={ref}
      className="walima-flipbook-page h-full w-full overflow-hidden"
      data-density={density}
    >
      <img
        src={src}
        alt={alt}
        className="walima-flipbook-page__image block h-full w-full object-cover object-center"
        draggable={false}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
    </div>
  );
});
