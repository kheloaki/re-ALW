"use client";

import { useEffect, useState } from "react";
import {
  BRAND_LOGO_SRC,
  HOME_LOADER_SESSION_KEY,
  preloadHomeAssetsWithProgress,
} from "@/lib/homePreloadAssets";

const MIN_VISIBLE_MS = 750;
const MAX_WAIT_MS = 9000;
const FADE_MS = 450;

type Phase = "loading" | "exiting" | "hidden";

type HomeInitialLoaderProps = {
  assetUrls: string[];
};

export function HomeInitialLoader({ assetUrls }: HomeInitialLoaderProps) {
  const [phase, setPhase] = useState<Phase>("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (sessionStorage.getItem(HOME_LOADER_SESSION_KEY) === "1") {
      setPhase("hidden");
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("home-loader-active");
    setProgress(0);

    let cancelled = false;
    let done = false;
    const started = performance.now();

    const finish = () => {
      if (cancelled || done) return;
      done = true;
      setProgress(100);
      sessionStorage.setItem(HOME_LOADER_SESSION_KEY, "1");
      setPhase("exiting");
      window.setTimeout(() => {
        if (!cancelled) {
          document.documentElement.classList.remove("home-loader-active");
          setPhase("hidden");
        }
      }, reduced ? 120 : FADE_MS);
    };

    const maxTimer = window.setTimeout(finish, MAX_WAIT_MS);

    const run = async () => {
      await Promise.all([
        preloadHomeAssetsWithProgress(assetUrls, setProgress),
        new Promise<void>((resolve) => {
          if (document.readyState === "complete") resolve();
          else window.addEventListener("load", () => resolve(), { once: true });
        }),
      ]);

      setProgress(100);

      const elapsed = performance.now() - started;
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
      window.setTimeout(() => {
        window.clearTimeout(maxTimer);
        finish();
      }, remaining);
    };

    void run();

    return () => {
      cancelled = true;
      window.clearTimeout(maxTimer);
      document.documentElement.classList.remove("home-loader-active");
    };
  }, [assetUrls]);

  if (phase === "hidden") return null;

  return (
    <div
      className={`home-initial-loader ${phase === "exiting" ? "is-exiting" : ""}`}
      role="progressbar"
      aria-live="polite"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      aria-label={`Loading ${progress}%`}
    >
      <div className="home-initial-loader__cluster">
        <div className="home-initial-loader__logo-wrap">
          <img
            src={BRAND_LOGO_SRC}
            alt=""
            className="home-initial-loader__mark"
            width={200}
            height={200}
            decoding="async"
            fetchPriority="high"
          />
        </div>
        <div className="home-initial-loader__percent font-display" aria-hidden>
          <span className="home-initial-loader__value">{progress}</span>
          <span className="home-initial-loader__symbol">%</span>
        </div>
        <div className="home-initial-loader__track" aria-hidden>
          <div
            className="home-initial-loader__bar"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
