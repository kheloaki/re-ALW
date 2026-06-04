import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { VENUE } from "@/lib/venue";
import { PaperCard } from "@/components/PaperCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ReservationForm } from "@/components/reservation/ReservationForm";

type ReservationExperienceProps = {
  locale: Locale;
  variant?: "embed" | "page";
};

export async function ReservationExperience({ locale, variant = "embed" }: ReservationExperienceProps) {
  const dict = await getDictionary(locale);
  const r = dict.reservation;
  const isPage = variant === "page";

  const sectionClass = isPage
    ? "reservation-page relative min-h-[100dvh] overflow-visible"
    : "relative min-h-0 overflow-visible py-6 lg:h-[1160px] lg:min-h-[1160px] lg:py-0";

  const shellClass = isPage
    ? "reservation-page__inner section-shell px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:px-10 lg:pb-24 lg:pt-32"
    : "section-shell px-4 pb-8 pt-20 sm:px-6 sm:pb-10 sm:pt-24 lg:px-10 lg:pb-12 lg:pt-[132px]";

  const titleClass = isPage
    ? "!text-[2rem] sm:!text-[2.75rem] lg:!text-[4rem] lg:leading-[1.08]"
    : "!text-[1.85rem] leading-[1.15] text-[#d6ad63] sm:!text-4xl lg:!text-[64px] lg:leading-[1.1]";

  return (
    <section
      id="reservation"
      className={sectionClass}
      style={{
        backgroundImage:
          "linear-gradient(165deg, rgba(38,30,24,0.58) 0%, rgba(28,22,18,0.45) 42%, rgba(32,26,20,0.72) 100%), url('/assets/reservation-riad.jpg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: isPage ? "fixed" : "scroll",
      }}
    >
      <div className={shellClass}>
        <div className="mx-auto max-w-[1000px] px-1 text-center lg:px-4">
          <SectionTitle title={r.sectionTitle} className={titleClass} />
        </div>

        <div className="relative mx-auto mt-8 w-full max-w-[1000px] lg:mt-14 lg:min-h-[720px]">
          <PaperCard
            className="relative z-10 mx-auto w-full max-w-[min(100%,640px)] max-lg:p-1.5 lg:absolute lg:left-[48px] lg:top-[32px] lg:mx-0 lg:max-w-[700px] lg:p-2"
            innerClassName="max-lg:!px-4 max-lg:!py-5 lg:px-10 lg:py-7"
          >
            <h3 className="text-center font-display text-xl font-semibold uppercase tracking-wide text-[#231a12] max-lg:!py-0 sm:text-2xl lg:text-[42px]">
              {r.cardTitle}
            </h3>

            <ReservationForm labels={r} />
          </PaperCard>

          <aside className="reservation-concierge relative z-20 mx-auto mt-8 w-full max-w-[340px] rounded-[18px] border border-[#d6ad63]/40 paper-texture p-1.5 shadow-[0_20px_48px_rgba(48,34,24,0.42)] sm:max-w-[360px] sm:p-2 lg:absolute lg:right-[8px] lg:top-[200px] lg:mt-0 lg:w-[360px] lg:max-w-[360px] lg:rotate-[3deg]">
            <div className="double-gold-border flex min-h-[280px] flex-col items-center justify-center rounded-[16px] border border-[#d6ad63]/70 px-4 py-8 text-center text-[#251c13] sm:min-h-[320px] sm:px-6 lg:h-[460px] lg:min-h-0 lg:py-10">
              <h4 className="font-display text-[1.75rem] leading-[0.95] whitespace-pre-line sm:text-4xl lg:text-[3.25rem]">
                {r.conciergeService}
              </h4>
              <p className="mt-4 font-display text-lg leading-tight sm:text-2xl lg:text-[1.65rem]">{r.phoneBooking}</p>
              <p className="mt-3 text-2xl text-[#6b5a42]" aria-hidden>
                ☎
              </p>
              <a
                href={`tel:${VENUE.phoneTel}`}
                className="venue-phone-link reservation-concierge__phone mt-2"
              >
                {VENUE.phone}
              </a>
              {r.conciergeText ? (
                <p className="mt-4 max-w-[220px] text-sm leading-snug text-[#4a4035]/85">{r.conciergeText}</p>
              ) : null}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
