"use client";

import { HomeInitialLoader } from "@/components/HomeInitialLoader";
import { HOME_PRELOAD_ASSETS } from "@/lib/homePreloadAssets";

type HomePageShellProps = {
  children: React.ReactNode;
};

export function HomePageShell({ children }: HomePageShellProps) {
  return (
    <>
      <HomeInitialLoader assetUrls={HOME_PRELOAD_ASSETS} />
      {children}
    </>
  );
}
