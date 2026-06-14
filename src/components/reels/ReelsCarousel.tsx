"use client";

import type { CSSProperties } from "react";
import type { ReelVideo } from "@/lib/reels";
import { ReelVideoCard } from "./ReelVideoCard";

export type ReelCarouselItem = {
  reel: ReelVideo;
  title: string;
};

type ReelsCarouselProps = {
  items: ReelCarouselItem[];
};

export function ReelsCarousel({ items }: ReelsCarouselProps) {
  if (items.length === 0) return null;

  const desktopDurationSec = Math.max(42, items.length * 5);
  const mobileDurationSec = Math.max(22, items.length * 2.75);
  const loopItems = [...items, ...items];

  return (
    <div className="instagram-reels-marquee">
      <div className="instagram-reels-marquee__viewport">
        <div
          className="instagram-reels-marquee__track"
          style={
            {
              "--reels-duration-mobile": `${mobileDurationSec}s`,
              "--reels-duration-desktop": `${desktopDurationSec}s`,
            } as CSSProperties
          }
        >
          {loopItems.map(({ reel, title }, index) => (
            <ReelVideoCard
              key={`${reel.id}-loop-${index}`}
              reel={reel}
              title={title}
              ariaHidden={index >= items.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
