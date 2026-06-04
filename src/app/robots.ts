import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  const isProd = process.env.NODE_ENV === "production";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: isProd ? [] : ["/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
