"use client";

import { useLocale } from "@/components/LocaleProvider";

/** Enough copies to fill ultra-wide screens; duplicated again for seamless −50% loop */
const REPEAT = 12;

const wordGlow = {
  color: "#e6d1a2",
  textShadow: `
    0 0 12px rgba(214, 173, 99, 0.75),
    0 0 28px rgba(184, 137, 63, 0.4),
    0 1px 0 rgba(62, 48, 28, 0.85)
  `,
} as const;

function DividerWordmark({ line1, line2 }: { line1: string; line2: string }) {
  const lineClass = "font-display leading-[1.05] text-[#e6d1a2] text-[1.35rem] sm:text-[1.65rem] lg:text-[1.85rem]";

  return (
    <div className="divider-wordmark-item shrink-0 px-6 text-center sm:px-9 lg:px-11">
      <span className={`block ${lineClass}`} style={wordGlow}>
        {line1}
      </span>
      <span className={`mt-0.5 block ${lineClass}`} style={wordGlow}>
        {line2}
      </span>
    </div>
  );
}

function WordmarkStrip({ line1, line2 }: { line1: string; line2: string }) {
  return (
    <div className="divider-wordmark-strip">
      {Array.from({ length: REPEAT }, (_, i) => (
        <DividerWordmark key={i} line1={line1} line2={line2} />
      ))}
    </div>
  );
}

export function MoroccanDivider() {
  const { dict } = useLocale();
  const { line1, line2 } = dict.divider;

  return (
    <div className="section-shell w-full bg-[#1f1a16]">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d6ad63]/35 to-transparent" aria-hidden />
      <div className="divider-wordmark-viewport relative py-3 sm:py-4 lg:py-5">
        <span className="sr-only">
          {line1} {line2}
        </span>
        <div className="divider-wordmark-track" aria-hidden>
          <WordmarkStrip line1={line1} line2={line2} />
          <WordmarkStrip line1={line1} line2={line2} />
        </div>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d6ad63]/25 to-transparent" aria-hidden />
    </div>
  );
}
