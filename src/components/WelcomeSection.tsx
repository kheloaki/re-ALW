"use client";

import { useLocale } from "@/components/LocaleProvider";
import { ArchFeatureCard } from "./ArchFeatureCard";
import { OrnamentBackground } from "./OrnamentBackground";
import { PaperCard } from "./PaperCard";

export function WelcomeSection() {
  const { dict } = useLocale();
  const w = dict.welcome;

  return (
    <section className="-mt-2 welcome-section-height relative bg-[#1a1a1a]">
      <OrnamentBackground />
      <div className="pointer-events-none absolute right-2 top-8 text-[100px] leading-none text-[#d6ad63]/12 sm:right-8 sm:top-1/4 sm:text-[180px]">
        ❧
      </div>
      <div className="section-shell relative z-10 px-4 pb-3 pt-[72px] sm:px-6 sm:pb-4 sm:pt-[80px] lg:px-10 lg:pb-5 lg:pt-[100px]">
        <PaperCard
          className="mx-auto h-auto min-h-0 w-[calc(100%-32px)] max-w-[1000px] max-lg:p-1.5 lg:mt-0 lg:h-[650px] lg:w-[1000px] lg:max-w-none lg:p-2"
          innerClassName="max-lg:!px-4 max-lg:!py-4 lg:py-5"
        >
          <h2 className="font-display text-center text-4xl leading-[0.95] text-[#1c1711] sm:text-5xl lg:text-[62px]">
            {w.titleLine1}
            <br />
            {w.titleLine2}
          </h2>
          <p className="mx-auto mt-2 max-w-[760px] px-1 text-center text-base leading-[1.35] text-[#30251b] sm:mt-2.5 sm:text-lg lg:mt-3 lg:text-[21px]">
            {w.subtitle}
          </p>
          <div className="mt-3 flex flex-col items-center gap-5 sm:mt-4 sm:gap-6 lg:mt-4 lg:flex-row lg:flex-nowrap lg:items-end lg:justify-center lg:gap-7">
            {w.features.map((feature) => (
              <ArchFeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
        </PaperCard>
      </div>
    </section>
  );
}
