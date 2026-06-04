"use client";

import { useEffect } from "react";
import { HomeInitialLoader } from "@/components/HomeInitialLoader";
import { HOME_CRITICAL_PRELOAD, HOME_DEFERRED_PRELOAD, preloadHomeAssets } from "@/lib/homePreloadAssets";

type HomePageShellProps = {
  children: React.ReactNode;
};

export function HomePageShell({ children }: HomePageShellProps) {
  useEffect(() => {
    const id = window.setTimeout(() => {
      void preloadHomeAssets(HOME_DEFERRED_PRELOAD);
    }, 1200);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <>
      <HomeInitialLoader assetUrls={HOME_CRITICAL_PRELOAD} />
      {children}
    </>
  );
}
