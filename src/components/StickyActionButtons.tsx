"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/LocaleProvider";
import { localePath } from "@/i18n/config";
import { MENU_FLIPBOOK_PATH } from "@/lib/menuFlipbook";
import { VENUE } from "@/lib/venue";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="sticky-action__icon" fill="none" aria-hidden>
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

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="sticky-action__icon" fill="none" aria-hidden>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 19.5A2.5 2.5 0 016.5 17H20M4 4.5A2.5 2.5 0 016.5 2H20M4 12A2.5 2.5 0 016.5 9.5H20"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6.5 17V20M6.5 2V5M6.5 9.5V12.5"
      />
    </svg>
  );
}

export function StickyActionButtons() {
  const pathname = usePathname();
  const { locale, dict } = useLocale();

  if (pathname.includes(MENU_FLIPBOOK_PATH)) {
    return null;
  }

  return (
    <div className="sticky-actions" aria-label={dict.stickyActions.groupLabel}>
      <Link
        href={localePath(locale, MENU_FLIPBOOK_PATH)}
        className="sticky-action sticky-action--menu"
        aria-label={dict.stickyMenu.label}
        title={dict.stickyMenu.label}
      >
        <MenuIcon />
      </Link>
      <a
        href={`tel:${VENUE.phoneTel}`}
        className="sticky-action sticky-action--call"
        aria-label={dict.stickyCall.label}
        title={dict.stickyCall.label}
      >
        <PhoneIcon />
        <span className="sticky-action__pulse" aria-hidden />
      </a>
    </div>
  );
}
