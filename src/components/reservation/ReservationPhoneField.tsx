"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  countryFlagEmoji,
  DEFAULT_PHONE_REGION,
  findCountryByRegion,
  PHONE_COUNTRIES,
} from "@/lib/phoneCountries";

const INPUT_CLASS =
  "w-full rounded-xl border border-[#c59a54]/65 bg-[#5a544c]/85 px-4 text-[#f8e8c0] placeholder:text-[#d6c7aa]/90 outline-none transition focus:border-[#e4c47a]/80 focus:ring-2 focus:ring-[#d6ad63]/25";

type ReservationPhoneFieldProps = {
  countryRegion: string;
  localPhone: string;
  onCountryRegionChange: (region: string) => void;
  onLocalPhoneChange: (value: string) => void;
  label: string;
  placeholder: string;
  searchPlaceholder: string;
  disabled?: boolean;
};

function matchesSearch(query: string, label: string, code: string, region: string): boolean {
  const haystack = `${label} ${code} ${region}`.toLowerCase();
  return haystack.includes(query);
}

export function ReservationPhoneField({
  countryRegion,
  localPhone,
  onCountryRegionChange,
  onLocalPhoneChange,
  label,
  placeholder,
  searchPlaceholder,
  disabled = false,
}: ReservationPhoneFieldProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const selected = findCountryByRegion(countryRegion);

  const filteredCountries = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return PHONE_COUNTRIES;
    return PHONE_COUNTRIES.filter((country) =>
      matchesSearch(query, country.label, country.code, country.region),
    );
  }, [search]);

  useEffect(() => {
    if (!open) {
      setSearch("");
      return;
    }

    const frame = requestAnimationFrame(() => searchRef.current?.focus());

    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="reservation-field">
      <span className="reservation-field__label mb-1.5 block text-left text-xs font-semibold uppercase tracking-[0.08em] text-[#d6c7aa]">
        {label}
      </span>
      <div className="reservation-phone flex gap-2">
        <div ref={rootRef} className="reservation-phone__code relative shrink-0">
          <button
            type="button"
            className={`${INPUT_CLASS} reservation-phone__code-trigger flex h-11 min-w-[6.75rem] items-center justify-between gap-1.5 px-2.5 sm:h-12 lg:h-[50px] ${
              open ? "border-[#e4c47a]/80 ring-2 ring-[#d6ad63]/25" : ""
            }`}
            aria-label={`${label}: ${selected.label} ${selected.code}`}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={listId}
            disabled={disabled}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="flex min-w-0 items-center gap-1.5">
              <span className="reservation-phone__flag shrink-0 text-base leading-none" aria-hidden>
                {countryFlagEmoji(selected.region)}
              </span>
              <span className="truncate text-sm font-semibold tracking-wide">{selected.code}</span>
            </span>
            <span
              className={`shrink-0 text-[#d6ad63] transition-transform ${open ? "rotate-180" : ""}`}
              aria-hidden
            >
              ▾
            </span>
          </button>

          {open ? (
            <div className="reservation-phone__code-menu absolute start-0 top-[calc(100%+6px)] z-50 w-[min(18rem,calc(100vw-2.5rem))] overflow-hidden rounded-xl border border-[#c59a54]/45 bg-[#3d3832]/98 shadow-[0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur-md">
              <div className="border-b border-[#c59a54]/25 p-2">
                <input
                  ref={searchRef}
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={searchPlaceholder}
                  className={`${INPUT_CLASS} reservation-phone__search h-10 px-3 text-sm`}
                  aria-label={searchPlaceholder}
                />
              </div>
              <ul
                id={listId}
                role="listbox"
                aria-label={label}
                className="max-h-60 overflow-y-auto py-1"
              >
                {filteredCountries.length ? (
                  filteredCountries.map((country) => {
                    const isSelected = country.region === countryRegion;
                    return (
                      <li key={country.region} role="option" aria-selected={isSelected}>
                        <button
                          type="button"
                          className={`reservation-phone__code-option flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm transition hover:bg-[#5a544c]/90 ${
                            isSelected ? "bg-[#5a544c]/75 text-[#fff8e8]" : "text-[#f0dfb8]"
                          }`}
                          onClick={() => {
                            onCountryRegionChange(country.region);
                            setOpen(false);
                          }}
                        >
                          <span
                            className="reservation-phone__flag shrink-0 text-base leading-none"
                            aria-hidden
                          >
                            {countryFlagEmoji(country.region)}
                          </span>
                          <span className="min-w-0 flex-1 truncate">{country.label}</span>
                          <span className="shrink-0 font-semibold tracking-wide text-[#e4c47a]">
                            {country.code}
                          </span>
                        </button>
                      </li>
                    );
                  })
                ) : (
                  <li className="px-3 py-4 text-center text-sm text-[#c4b8a4]">—</li>
                )}
              </ul>
            </div>
          ) : null}
        </div>
        <input
          className={`${INPUT_CLASS} reservation-phone__local min-w-0 flex-1 h-11 sm:h-12 lg:h-[50px]`}
          type="tel"
          name="phoneLocal"
          value={localPhone}
          onChange={(event) => onLocalPhoneChange(event.target.value)}
          placeholder={placeholder}
          autoComplete="tel-national"
          inputMode="tel"
          required
          minLength={6}
          maxLength={16}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export { DEFAULT_PHONE_REGION };
