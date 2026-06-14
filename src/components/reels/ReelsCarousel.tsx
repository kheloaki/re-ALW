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
  posterOnly = false,
}: {
  items: ReelCarouselItem[];
  posterOnly?: boolean;
}) {
  return (
    <div
      className={`instagram-reels-marquee__strip flex shrink-0 items-stretch gap-4 sm:gap-5${posterOnly ? " pointer-events-none" : ""}`}
      aria-hidden={posterOnly || undefined}
    >
      {items.map(({ reel, title }, index) => (
        <ReelVideoCard
          key={`${reel.id}-${posterOnly ? "dup" : "a"}-${index}`}
          reel={reel}
          title={title}
          posterOnly={posterOnly}
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
          <ReelStrip items={items} posterOnly />
        </div>
      </div>
    </div>
  );
}
