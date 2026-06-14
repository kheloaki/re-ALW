"use client";

import Image from "next/image";
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
    video.addEventListener("canplay", onReady);

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
      video.removeEventListener("canplay", onReady);
      observer.disconnect();
    };
  }, [reel.video, reel.mp4]);

  return (
    <article className="instagram-reel-card shrink-0 snap-center">
      <div className="instagram-reel-card__frame" aria-label={title}>
        {reel.poster ? (
          <Image
            src={reel.poster}
            alt=""
            fill
            sizes="(max-width: 640px) 82vw, 280px"
            className="instagram-reel-card__poster"
            aria-hidden
          />
        ) : null}
        <video
          ref={videoRef}
          className="instagram-reel-card__video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          {reel.mp4 ? <source src={reel.mp4} type="video/mp4" /> : null}
          <source src={reel.video} type="video/webm" />
        </video>
      </div>
    </article>
  );
}
