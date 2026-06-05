"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getScrollBehavior, scrollToHash } from "@/lib/smoothScroll";

/** Smooth scroll for in-page anchors and /path#section links (Next.js hash navigation). */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const run = () => scrollToHash(hash);
    const id = window.requestAnimationFrame(run);
    const retry = window.setTimeout(run, 120);

    return () => {
      window.cancelAnimationFrame(id);
      window.clearTimeout(retry);
    };
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => scrollToHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target && anchor.target !== "_self") return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (!url.hash) return;

      const current = new URL(window.location.href);
      if (url.pathname !== current.pathname || url.search !== current.search) return;

      const id = decodeURIComponent(url.hash.slice(1));
      const el = document.getElementById(id);
      if (!el) return;

      event.preventDefault();
      const behavior = getScrollBehavior();
      history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
      el.scrollIntoView({ behavior, block: "start" });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
