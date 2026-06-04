import type { Locale } from "@/i18n/config";
import { getSeoFaq, getSeoFaqUi } from "@/lib/seo/content";

type FaqSectionProps = {
  locale: Locale;
};

/** FAQ visible + alignée sur le schéma FAQPage (AEO) */
export function FaqSection({ locale }: FaqSectionProps) {
  const faqs = getSeoFaq(locale);
  const ui = getSeoFaqUi(locale);

  return (
    <section
      id="faq"
      className="border-t border-[#d6ad63]/20 bg-[#141210] py-14 sm:py-16"
      aria-labelledby="faq-heading"
    >
      <div className="section-shell px-5 sm:px-10">
        <div className="mx-auto max-w-[800px]">
          <h2
            id="faq-heading"
            className="text-center font-display text-3xl text-[#e4c47a] sm:text-4xl"
          >
            {ui.faqTitle}
          </h2>
          <p className="mt-2 text-center text-sm text-[#c4b8a4] sm:text-base">{ui.faqSubtitle}</p>

          <div className="mt-8 space-y-3">
            {faqs.map((item, index) => (
              <details
                key={index}
                className="group rounded-2xl border border-[#d6ad63]/18 bg-[#1c1814]/80 open:border-[#d6ad63]/35"
              >
                <summary className="cursor-pointer list-none px-5 py-4 font-display text-lg text-[#f0d78c] marker:content-none sm:text-xl [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-4">
                    <span>{item.question}</span>
                    <span
                      className="mt-1 shrink-0 text-[#d6ad63] transition group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </span>
                </summary>
                <div className="border-t border-[#d6ad63]/12 px-5 pb-4 pt-3 text-sm leading-relaxed text-[#d8cbb0] sm:text-[15px]">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
