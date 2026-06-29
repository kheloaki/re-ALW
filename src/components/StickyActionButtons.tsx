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

function MenuBookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="sticky-action__icon" fill="none" aria-hidden>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 7v13"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 7c-2.2-2-6-2-8 0v12.5c0 .6.4 1 1.2 1 1.8 0 4-.8 6.8-2.5"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 7c2.2-2 6-2 8 0v12.5c0 .6-.4 1-1.2 1-1.8 0-4-.8-6.8-2.5"
      />
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M7.5 11h3" />
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M7.5 14h4" />
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M7.5 17h2.5" />
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
        <MenuBookIcon />
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
