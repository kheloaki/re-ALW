"use client";

import { useEffect, useRef } from "react";
import type { ReelVideo } from "@/lib/reels";

type ReelVideoCardProps = {
  reel: ReelVideo;
  title: string;
};

function tryPlay(video: HTMLVideoElement) {
  void video.play().catch(() => {});
}

export function ReelVideoCard({ reel, title }: ReelVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onReady = () => tryPlay(video);
    video.addEventListener("loadeddata", onReady);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay(video);
        else video.pause();
      },
      { threshold: 0.2 },
    );

    observer.observe(video);
    tryPlay(video);

    return () => {
      video.removeEventListener("loadeddata", onReady);
      observer.disconnect();
    };
  }, [reel.video]);

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
          preload="metadata"
        >
          <source src={reel.video} type="video/webm" />
        </video>
      </div>
    </article>
  );
}
