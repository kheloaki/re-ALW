"use client";

import { useEffect, useRef, useState } from "react";
import {
  BRAND_LOGO_SRC,
  HOME_LOADER_SESSION_KEY,
  preloadHomeAssetsWithProgress,
} from "@/lib/homePreloadAssets";

const MIN_VISIBLE_MS = 750;
const MAX_WAIT_MS = 9000;
const FADE_MS = 450;
const COUNT_STEP_MS = 26;

type Phase = "loading" | "exiting" | "hidden";

type HomeInitialLoaderProps = {
  assetUrls: string[];
};

export function HomeInitialLoader({ assetUrls }: HomeInitialLoaderProps) {
  const [phase, setPhase] = useState<Phase>("loading");
  const [display, setDisplay] = useState(0);
  const displayRef = useRef(0);
  const targetRef = useRef(0);

  const setDisplayProgress = (value: number) => {
    const next = Math.min(100, Math.max(0, Math.round(value)));
    displayRef.current = next;
    setDisplay(next);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (sessionStorage.getItem(HOME_LOADER_SESSION_KEY) === "1") {
      setPhase("hidden");
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("home-loader-active");
    targetRef.current = 0;
    setDisplayProgress(0);

    let cancelled = false;
    let done = false;
    let rafId = 0;
    const started = performance.now();
    let lastStepAt = started;

    const finish = () => {
      if (cancelled || done) return;
      done = true;
      setDisplayProgress(100);
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

    const onPreloadProgress = (percent: number) => {
      targetRef.current = Math.max(targetRef.current, percent);
      if (reduced) setDisplayProgress(targetRef.current);
    };

    const tick = (now: number) => {
      if (cancelled) return;

      const timeProgress = Math.min(94, Math.floor((now - started) / 38));
      const effectiveTarget = Math.max(targetRef.current, timeProgress);

      if (reduced) {
        setDisplayProgress(effectiveTarget);
      } else if (now - lastStepAt >= COUNT_STEP_MS && displayRef.current < effectiveTarget) {
        lastStepAt = now;
        setDisplayProgress(displayRef.current + 1);
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    const waitForDisplay = (goal: number) =>
      new Promise<void>((resolve) => {
        const check = () => {
          if (cancelled || displayRef.current >= goal) {
            resolve();
            return;
          }
          window.requestAnimationFrame(check);
        };
        check();
      });

    const run = async () => {
      await Promise.all([
        preloadHomeAssetsWithProgress(assetUrls, onPreloadProgress),
        new Promise<void>((resolve) => {
          if (document.readyState === "complete") resolve();
          else window.addEventListener("load", () => resolve(), { once: true });
        }),
      ]);

      targetRef.current = 100;
      if (reduced) {
        setDisplayProgress(100);
      } else {
        await waitForDisplay(100);
      }

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
      window.cancelAnimationFrame(rafId);
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
      aria-valuenow={display}
      aria-label={`Loading ${display}%`}
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
          <span className="home-initial-loader__value">{display}</span>
          <span className="home-initial-loader__symbol">%</span>
        </div>
        <div className="home-initial-loader__track" aria-hidden>
          <div
            className="home-initial-loader__bar"
            style={{ width: `${display}%` }}
          />
        </div>
      </div>
    </div>
  );
}
