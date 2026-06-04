import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { ExperienceGalleryScroll, type GallerySlide } from "@/components/ExperienceGalleryScroll";
import { InstagramReelsScroll } from "@/components/InstagramReelsScroll";
import { getInstagramHandleLabel, getInstagramProfileUrl } from "@/lib/instagram";
import { GALLERY_ASSET_PATHS } from "@/lib/homePreloadAssets";
import { getReelVideos } from "@/lib/reels";

const galleryImages = {
  tableSpread: GALLERY_ASSET_PATHS[0],
  tajinePrunes: GALLERY_ASSET_PATHS[1],
  ambiance: GALLERY_ASSET_PATHS[2],
  salad: GALLERY_ASSET_PATHS[3],
  instagram: GALLERY_ASSET_PATHS[4],
  platter: GALLERY_ASSET_PATHS[5],
  rfissa: GALLERY_ASSET_PATHS[6],
  seffa: GALLERY_ASSET_PATHS[7],
  paella: GALLERY_ASSET_PATHS[8],
  teaPour: GALLERY_ASSET_PATHS[9],
  beetSalad: GALLERY_ASSET_PATHS[10],
  tagineBread: GALLERY_ASSET_PATHS[11],
  pastilla: GALLERY_ASSET_PATHS[12],
};

export async function ExperienceGallery({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const g = dict.gallery;
  const ig = dict.instagramReels;
  const profileUrl = getInstagramProfileUrl();
  const handle = getInstagramHandleLabel();
  const videos = getReelVideos();

  const slides: GallerySlide[] = [
    { src: galleryImages.tableSpread, alt: g.alts.tableSpread },
    { src: galleryImages.tajinePrunes, alt: g.alts.tajinePrunes },
    { src: galleryImages.ambiance, alt: g.alts.ambiance },
    { src: galleryImages.platter, alt: g.alts.platter },
    { src: galleryImages.seffa, alt: g.alts.seffa },
    { src: galleryImages.rfissa, alt: g.alts.rfissa },
    { src: galleryImages.salad, alt: g.alts.salad },
    { src: galleryImages.instagram, alt: g.alts.instagram },
    { src: galleryImages.paella, alt: g.alts.paella },
    { src: galleryImages.teaPour, alt: g.alts.teaPour },
    { src: galleryImages.beetSalad, alt: g.alts.beetSalad },
    { src: galleryImages.tagineBread, alt: g.alts.tagineBread },
    { src: galleryImages.pastilla, alt: g.alts.pastilla },
  ];

  const reelItems = videos.map((reel, index) => ({
    reel,
    title: `${ig.reelLabel} ${index + 1}`,
  }));

  const followHref = profileUrl || "https://www.instagram.com/";

  return (
    <>
      <ExperienceGalleryScroll title={g.title} slides={slides} />
      <InstagramReelsScroll
        title={ig.title}
        subtitle={ig.subtitle}
        followCta={ig.followCta.replace("{handle}", handle)}
        handle={handle}
        followHref={followHref}
        profileUrl={profileUrl}
        emptyTitle={ig.emptyTitle}
        emptyHint={ig.emptyHint}
        items={reelItems}
      />
    </>
  );
}
