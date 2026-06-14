"use client";

import type { ReelVideo } from "@/lib/reels";
import { ReelVideoCard } from "./ReelVideoCard";

export type ReelCarouselItem = {
  reel: ReelVideo;
  title: string;
};

type ReelsCarouselProps = {
  items: ReelCarouselItem[];
};

function ReelStrip({
  items,
  ariaHidden = false,
}: {
  items: ReelCarouselItem[];
  ariaHidden?: boolean;
}) {
  return (
    <div
      className={`instagram-reels-marquee__strip flex shrink-0 items-stretch gap-4 sm:gap-5${ariaHidden ? " pointer-events-none" : ""}`}
      aria-hidden={ariaHidden || undefined}
    >
      {items.map(({ reel, title }, index) => (
        <ReelVideoCard
          key={`${reel.id}-${ariaHidden ? "dup" : "a"}-${index}`}
          reel={reel}
          title={title}
        />
      ))}
    </div>
  );
}

export function ReelsCarousel({ items }: ReelsCarouselProps) {
  if (items.length === 0) return null;

  const durationSec = Math.max(72, items.length * 11);

  return (
    <div className="instagram-reels-marquee">
      <div className="instagram-reels-marquee__viewport">
        <div
          className="instagram-reels-marquee__track"
          style={{ animationDuration: `${durationSec}s` }}
        >
          <ReelStrip items={items} />
          <ReelStrip items={items} ariaHidden />
        </div>
      </div>
    </div>
  );
}
