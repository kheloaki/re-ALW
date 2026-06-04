import { ReelsCarousel } from "@/components/reels/ReelsCarousel";
import type { ReelCarouselItem } from "@/components/reels/ReelsCarousel";
import { SectionTitle } from "./ui/SectionTitle";

export type InstagramReelsScrollProps = {
  title: string;
  subtitle: string;
  followCta: string;
  handle: string;
  followHref: string;
  profileUrl: string | null;
  emptyTitle: string;
  emptyHint: string;
  items: ReelCarouselItem[];
};

export function InstagramReelsScroll({
  title,
  subtitle,
  followCta,
  handle,
  followHref,
  profileUrl,
  emptyTitle,
  emptyHint,
  items,
}: InstagramReelsScrollProps) {
  const showCarousel = items.length > 0;

  return (
    <section
      id="reels"
      className="instagram-reels-section scroll-mt-[5.5rem] border-y border-[#d6ad63]/15 bg-[#141210] py-10 sm:py-12 lg:py-14"
      aria-labelledby="instagram-reels-heading"
    >
      <div className="section-shell px-4 sm:px-6 lg:px-10">
        <SectionTitle
          id="instagram-reels-heading"
          title={title}
          className="!text-[2rem] text-[#d6ad63] sm:!text-[2.75rem] lg:!text-[3.5rem]"
        />
        <p className="mx-auto mt-3 max-w-[640px] text-center text-sm leading-relaxed text-[#c4b8a4] sm:text-base">
          {subtitle}
        </p>

        {showCarousel ? (
          <div className="mt-6 sm:mt-7">
            <ReelsCarousel items={items} />
          </div>
        ) : (
          <div className="instagram-reels-empty mx-auto mt-6 max-w-[520px] rounded-2xl border border-[#d6ad63]/30 bg-[#1c1814]/90 px-6 py-8 text-center sm:mt-7">
            <p className="font-display text-xl text-[#e6d1a2] sm:text-2xl">{emptyTitle}</p>
            <p className="mt-3 text-sm leading-relaxed text-[#b8aa94] sm:text-base">{emptyHint}</p>
          </div>
        )}

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
          <a
            href={followHref}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-btn inline-flex h-12 min-w-[220px] items-center justify-center px-8 text-sm font-bold uppercase tracking-wide sm:h-[52px] sm:text-base"
          >
            {followCta}
          </a>
          {profileUrl ? (
            <span className="font-display text-lg text-[#d6ad63]/90 sm:text-xl">{handle}</span>
          ) : null}
        </div>
      </div>
    </section>
  );
}
