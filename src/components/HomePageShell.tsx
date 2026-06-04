"use client";

import { useMemo } from "react";
import { HomeInitialLoader } from "@/components/HomeInitialLoader";
import { HOME_PRELOAD_ASSETS } from "@/lib/homePreloadAssets";

type HomePageShellProps = {
  children: React.ReactNode;
  reelPosterUrls?: string[];
};

export function HomePageShell({ children, reelPosterUrls = [] }: HomePageShellProps) {
  const assetUrls = useMemo(
    () => [...HOME_PRELOAD_ASSETS, ...reelPosterUrls.filter(Boolean)],
    [reelPosterUrls],
  );

  return (
    <>
      <HomeInitialLoader assetUrls={assetUrls} />
      {children}
    </>
  );
}
