export function getScrollBehavior(): ScrollBehavior {
  if (typeof window === "undefined") return "auto";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

export function scrollToHash(hash: string, behavior?: ScrollBehavior): boolean {
  if (!hash || hash === "#") return false;
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  if (!id) return false;

  const el = document.getElementById(id);
  if (!el) return false;

  el.scrollIntoView({
    behavior: behavior ?? getScrollBehavior(),
    block: "start",
  });
  return true;
}
