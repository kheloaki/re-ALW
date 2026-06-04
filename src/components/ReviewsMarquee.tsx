import { fetchGoogleMapsReviewsForMarquee, type MarqueeReview } from "@/lib/googleReviews";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

function ReviewChip({ quote, author, rating, reviewByLabel }: MarqueeReview & { reviewByLabel: string }) {
  return (
    <div
      className="mx-3 inline-flex max-w-[340px] shrink-0 flex-col rounded-2xl border border-[#d6ad63]/35 bg-[#1f1c18]/95 px-5 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.35)] sm:mx-4 sm:max-w-[380px]"
      role="group"
      aria-label={`${reviewByLabel} ${author}`}
    >
      {typeof rating === "number" ? (
        <p className="mb-1.5 text-[13px] text-[#d6ad63]/90" aria-hidden>
          {Array.from({ length: 5 }, (_, i) => (i < rating ? "★" : "☆")).join("")}
        </p>
      ) : null}
      <p className="text-[15px] leading-snug text-[#f0e6d4] sm:text-base">&ldquo;{quote}&rdquo;</p>
      <p className="mt-2.5 font-display text-sm font-medium tracking-wide text-[#d6ad63] sm:text-[15px]">— {author}</p>
    </div>
  );
}

function MarqueeTrack({
  reviews,
  direction,
  durationSec,
  reviewByLabel,
}: {
  reviews: MarqueeReview[];
  direction: "to-left" | "to-right";
  durationSec: number;
  reviewByLabel: string;
}) {
  const keyBase = direction;
  const items = reviews.map((r, i) => (
    <ReviewChip key={`${keyBase}-${r.author}-${i}-${r.quote.slice(0, 24)}`} {...r} reviewByLabel={reviewByLabel} />
  ));

  return (
    <div className="reviews-marquee-mask relative w-full overflow-hidden py-1">
      <div
        className={direction === "to-left" ? "reviews-marquee-track-left" : "reviews-marquee-track-right"}
        style={{ animationDuration: `${durationSec}s` }}
      >
        <div className="flex w-max items-stretch">{items}</div>
        <div className="flex w-max items-stretch" aria-hidden>
          {items}
        </div>
      </div>
    </div>
  );
}

export async function ReviewsMarquee({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const r = dict.reviews;
  const { rowLeft, rowRight, googleMapsUrl } = await fetchGoogleMapsReviewsForMarquee();

  return (
    <section
      id="reviews"
      className="border-y border-[#d6ad63]/20 bg-[#181512] py-10 sm:py-12"
      aria-labelledby="reviews-marquee-heading"
    >
      <div className="section-shell px-4 sm:px-6 lg:px-10">
        <h2 id="reviews-marquee-heading" className="mb-1 text-center font-display text-2xl text-[#d6ad63] sm:text-3xl lg:text-4xl">
          {r.title}
        </h2>
        <p className="mb-6 text-center text-sm text-[#c4b8a4] sm:mb-8 sm:text-base">{r.subtitle}</p>
      </div>
      <MarqueeTrack reviews={rowLeft} direction="to-left" durationSec={48} reviewByLabel={r.reviewBy} />
      <div className="h-4 sm:h-5" aria-hidden />
      <MarqueeTrack reviews={rowRight} direction="to-right" durationSec={54} reviewByLabel={r.reviewBy} />
      {googleMapsUrl ? (
        <div className="section-shell mt-6 px-4 sm:px-6 lg:px-10">
          <p className="text-center text-[11px] leading-relaxed text-[#8a7d6a] sm:text-xs">
            {r.fromGoogle}{" "}
            <a
              href={googleMapsUrl}
              className="underline decoration-[#d6ad63]/50 underline-offset-2 hover:text-[#d6ad63]"
              target="_blank"
              rel="noopener noreferrer"
            >
              {r.googleLink}
            </a>
            . {r.disclaimer}
          </p>
        </div>
      ) : null}
    </section>
  );
}
