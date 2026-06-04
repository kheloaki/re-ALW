"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { localeNames, localePath, locales, stripLocaleFromPathname, type Locale } from "@/i18n/config";
import { useLocale } from "./LocaleProvider";

type LanguageSwitcherProps = {
  variant?: "navbar" | "footer";
};

function localeCode(locale: Locale): string {
  return locale.toUpperCase();
}

export function LanguageSwitcher({ variant = "footer" }: LanguageSwitcherProps) {
  const { locale, dict } = useLocale();
  const pathname = usePathname();
  const { pathname: pathWithoutLocale } = stripLocaleFromPathname(pathname);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const isNavbar = variant === "navbar";

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const otherLocales = locales.filter((code) => code !== locale);

  return (
    <div ref={rootRef} className={`relative ${isNavbar ? "shrink-0" : "w-full max-w-[88px]"}`}>
      {!isNavbar && (
        <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-[#c9a85c]/80">
          {dict.nav.language}
        </span>
      )}

      <button
        type="button"
        className={`lang-switcher-trigger flex items-center justify-center gap-1 rounded-xl border border-[#d6ad63]/35 font-semibold uppercase tracking-wide text-[#f5ecd8] transition hover:border-[#d6ad63]/55 ${
          isNavbar
            ? "h-10 min-w-[3.25rem] bg-white/[0.06] px-2.5 text-[13px] backdrop-blur-md hover:bg-white/[0.1]"
            : "h-11 w-full bg-[#2a241f]/90 px-2.5 text-sm hover:bg-[#352c22]"
        } ${open ? "border-[#d6ad63]/55 ring-1 ring-[#d6ad63]/25" : ""}`}
        aria-label={`${dict.nav.language}: ${localeNames[locale]}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{localeCode(locale)}</span>
        <span className={`shrink-0 text-[#d6ad63] transition-transform ${open ? "rotate-180" : ""}`} aria-hidden>
          ▾
        </span>
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={dict.nav.language}
          className={`lang-switcher-menu absolute z-50 overflow-hidden rounded-xl border border-[#d6ad63]/30 bg-[#1c1714]/98 py-1 shadow-[0_16px_48px_rgba(0,0,0,0.55)] backdrop-blur-md ${
            isNavbar ? "end-0 top-[calc(100%+6px)] min-w-[3.25rem]" : "start-0 top-[calc(100%+6px)] w-full min-w-[3.25rem]"
          }`}
        >
          {otherLocales.map((code) => (
            <li key={code} role="option" aria-selected={false}>
              <Link
                href={localePath(code, pathWithoutLocale)}
                hrefLang={code}
                title={localeNames[code as Locale]}
                className="flex items-center justify-center px-3 py-2.5 text-[13px] font-semibold uppercase tracking-wide text-[#e8dcc8] transition hover:bg-[#3a3028] hover:text-[#faf3e3]"
                onClick={() => setOpen(false)}
              >
                {localeCode(code)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
