"use client";

import { useEffect, useState } from "react";
import {
  BRAND_LOGO_SRC,
  HOME_LOADER_SESSION_KEY,
  preloadHomeAssets,
} from "@/lib/homePreloadAssets";

const MIN_VISIBLE_MS = 400;
const MAX_WAIT_MS = 5000;
const FADE_MS = 450;

type Phase = "loading" | "exiting" | "hidden";

type HomeInitialLoaderProps = {
  assetUrls: string[];
};

export function HomeInitialLoader({ assetUrls }: HomeInitialLoaderProps) {
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (sessionStorage.getItem(HOME_LOADER_SESSION_KEY) === "1") {
      setPhase("hidden");
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("home-loader-active");

    let cancelled = false;
    let done = false;
    const started = performance.now();

    const finish = () => {
      if (cancelled || done) return;
      done = true;
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
        preloadHomeAssets(assetUrls),
        new Promise<void>((resolve) => {
          if (document.readyState === "complete") resolve();
          else window.addEventListener("load", () => resolve(), { once: true });
        }),
      ]);

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
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="home-initial-loader__inner">
        <img
          src={BRAND_LOGO_SRC}
          alt=""
          className="home-initial-loader__mark"
          width={160}
          height={160}
          decoding="async"
          fetchPriority="high"
        />
      </div>
    </div>
  );
}
