import type { Locale } from "@/i18n/config";

/** Restaurant booking — Africa/Casablanca. */
export const RESERVATION_SERVICE = {
  maxDaysAhead: 90,
} as const;

const TIME_RE = /^\d{2}:\d{2}$/;

export const RESERVATION_HOURS = Array.from({ length: 24 }, (_, index) => index);
export const RESERVATION_MINUTES = Array.from({ length: 60 }, (_, index) => index);

export function padTimeUnit(value: number): string {
  return String(value).padStart(2, "0");
}

export function composeReservationTime(hour: string, minute: string): string {
  if (!hour || !minute) return "";
  return `${padTimeUnit(Number(hour))}:${padTimeUnit(Number(minute))}`;
}

export function parseReservationTime(time: string): { hour: string; minute: string } {
  if (!TIME_RE.test(time)) return { hour: "", minute: "" };
  const [hour, minute] = time.split(":");
  return { hour, minute };
}

export function isAllowedReservationTime(time: string): boolean {
  if (!TIME_RE.test(time)) return false;
  const [hour, minute] = time.split(":").map(Number);
  return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59;
}

const LOCALE_TAG: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-GB",
  es: "es-ES",
  ar: "ar-MA",
  de: "de-DE",
  pl: "pl-PL",
};

export function getCasablancaDateString(date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Casablanca",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function getMaxReservationDateString(): string {
  const today = getCasablancaDateString();
  const [y, m, d] = today.split("-").map(Number);
  const max = new Date(y, m - 1, d + RESERVATION_SERVICE.maxDaysAhead);
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(max);
}

export const GUEST_COUNT_OPTIONS = Array.from({ length: 20 }, (_, i) => i + 1);

export type BookableDateOption = {
  value: string;
  weekday: string;
  day: string;
  month: string;
  isToday: boolean;
};

const LOCALE_TAG_SLOTS: Record<Locale, string> = LOCALE_TAG;

export function getBookableDateOptions(
  locale: Locale,
  minDate: string,
  maxDate: string,
  visibleDays = 28,
): BookableDateOption[] {
  const [minY, minM, minD] = minDate.split("-").map(Number);
  const [maxY, maxM, maxD] = maxDate.split("-").map(Number);
  const minTs = Date.UTC(minY, minM - 1, minD);
  const maxTs = Date.UTC(maxY, maxM - 1, maxD);
  const tag = LOCALE_TAG_SLOTS[locale];
  const todayValue = getCasablancaDateString();
  const options: BookableDateOption[] = [];

  for (let i = 0; i < visibleDays; i++) {
    const ts = minTs + i * 86_400_000;
    if (ts > maxTs) break;

    const date = new Date(ts);
    const value = new Intl.DateTimeFormat("en-CA", {
      timeZone: "UTC",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);

    options.push({
      value,
      weekday: new Intl.DateTimeFormat(tag, { timeZone: "UTC", weekday: "short" }).format(date),
      day: new Intl.DateTimeFormat(tag, { timeZone: "UTC", day: "numeric" }).format(date),
      month: new Intl.DateTimeFormat(tag, { timeZone: "UTC", month: "short" }).format(date),
      isToday: value === todayValue,
    });
  }

  return options;
}
