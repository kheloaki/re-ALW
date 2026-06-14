"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { ReelVideo } from "@/lib/reels";

type ReelVideoCardProps = {
  reel: ReelVideo;
  title: string;
  /** Decorative duplicate in the marquee — poster only, no video download. */
  posterOnly?: boolean;
};

export function ReelVideoCard({ reel, title, posterOnly = false }: ReelVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (posterOnly) return;

    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [posterOnly]);

  if (posterOnly) {
    return (
      <article className="instagram-reel-card shrink-0 snap-center pointer-events-none">
        <div className="instagram-reel-card__frame">
          {reel.poster ? (
            <Image
              src={reel.poster}
              alt=""
              fill
              sizes="(max-width: 640px) 82vw, 280px"
              className="instagram-reel-card__image"
              aria-hidden
            />
          ) : null}
        </div>
      </article>
    );
  }

  return (
    <article className="instagram-reel-card shrink-0 snap-center">
      <div className="instagram-reel-card__frame" aria-label={title}>
        <video
          ref={videoRef}
          className="instagram-reel-card__video"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster={reel.poster}
        >
          <source src={reel.video} type="video/webm" />
        </video>
      </div>
    </article>
  );
}
