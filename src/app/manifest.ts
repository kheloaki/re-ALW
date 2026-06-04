import type { MetadataRoute } from "next";
import { getSiteUrl, SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  const base = getSiteUrl();

  return {
    name: `${SITE.name} — Restaurant Marocain à Agadir`,
    short_name: SITE.name,
    description:
      "Restaurant marocain à Agadir : tajines, couscous, grillades et hospitalité au Jardin Lalla Meryem.",
    start_url: "/fr",
    scope: "/",
    display: "standalone",
    background_color: "#141210",
    theme_color: "#141210",
    lang: "fr",
    dir: "ltr",
    icons: [
      {
        src: `${base}${SITE.logo}`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${base}${SITE.logo}`,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
