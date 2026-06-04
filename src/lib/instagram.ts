import { SITE } from "@/lib/site";

export function getInstagramProfileUrl(): string {
  const fromSite = SITE.instagramUrl.trim();
  if (fromSite) return fromSite.replace(/\/$/, "");

  const handle = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE?.trim().replace(/^@/, "");
  if (handle) return `https://www.instagram.com/${handle}/`;

  return "";
}

export function getInstagramHandleLabel(): string {
  const handle = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE?.trim();
  if (handle) return handle.startsWith("@") ? handle : `@${handle}`;

  const url = SITE.instagramUrl.trim();
  if (url) {
    try {
      const path = new URL(url).pathname.replace(/^\/|\/$/g, "");
      if (path && !["reel", "p", "tv"].includes(path.split("/")[0] ?? "")) {
        return `@${path.split("/")[0]}`;
      }
    } catch {
      /* ignore */
    }
  }

  return "@alwalima";
}
