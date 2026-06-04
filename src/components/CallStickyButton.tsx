"use client";

import { useLocale } from "@/components/LocaleProvider";
import { VENUE } from "@/lib/venue";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="call-sticky__icon" fill="none" aria-hidden>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
      />
    </svg>
  );
}

export function CallStickyButton() {
  const { dict } = useLocale();
  const c = dict.stickyCall;

  return (
    <a
      href={`tel:${VENUE.phoneTel}`}
      className="call-sticky"
      aria-label={c.label}
      title={c.label}
    >
      <PhoneIcon />
      <span className="call-sticky__pulse" aria-hidden />
    </a>
  );
}
