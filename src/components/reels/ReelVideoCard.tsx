"use client";

import { useEffect, useRef } from "react";
import type { ReelVideo } from "@/lib/reels";

type ReelVideoCardProps = {
  reel: ReelVideo;
  title: string;
};

export function ReelVideoCard({ reel, title }: ReelVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
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
      { threshold: 0.4 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <article className="instagram-reel-card shrink-0 snap-center">
      <div className="instagram-reel-card__frame">
        <video
          ref={videoRef}
          className="instagram-reel-card__video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={reel.poster}
          aria-label={title}
        >
          {reel.webm.endsWith(".webm") ? <source src={reel.webm} type="video/webm" /> : null}
          {reel.mp4 ? (
            <source src={reel.mp4} type="video/mp4" />
          ) : reel.webm.endsWith(".mp4") ? (
            <source src={reel.webm} type="video/mp4" />
          ) : null}
        </video>
      </div>
    </article>
  );
}
