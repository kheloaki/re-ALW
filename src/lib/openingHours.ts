import type { Dictionary } from "@/i18n/types";

export type OpeningHoursRow = {
  day: string;
  hours: string;
};

const MONDAY_FIRST_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;

type WeekdayKey = (typeof MONDAY_FIRST_KEYS)[number];

/** Day label (any locale) → index 0 = Monday … 6 = Sunday. */
const DAY_NAME_TO_INDEX: Record<string, WeekdayKey> = {
  mon: "mon",
  monday: "mon",
  lundi: "mon",
  lun: "mon",
  tue: "tue",
  tuesday: "tue",
  mardi: "tue",
  mar: "tue",
  wed: "wed",
  wednesday: "wed",
  mercredi: "wed",
  mer: "wed",
  thu: "thu",
  thursday: "thu",
  jeudi: "thu",
  jeu: "thu",
  fri: "fri",
  friday: "fri",
  vendredi: "fri",
  ven: "fri",
  sat: "sat",
  saturday: "sat",
  samedi: "sat",
  sam: "sat",
  sun: "sun",
  sunday: "sun",
  dimanche: "sun",
  dim: "sun",
  lunes: "mon",
  martes: "tue",
  miercoles: "wed",
  jueves: "thu",
  viernes: "fri",
  sabado: "sat",
  domingo: "sun",
};

function normalizeDayToken(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^\p{L}]/gu, "");
}

function dayLabelToKey(day: string): WeekdayKey | null {
  const token = normalizeDayToken(day);
  const key = DAY_NAME_TO_INDEX[token];
  return key ?? null;
}

function weekdayKeyToIndex(key: WeekdayKey): number {
  return MONDAY_FIRST_KEYS.indexOf(key);
}

function normalizeHoursText(hours: string): string {
  return hours
    .replace(/\s*–\s*/g, " – ")
    .replace(/\s*-\s*/g, " – ")
    .trim();
}

/** Parse Google `weekday_text` lines ("Lundi: 12:00–00:00"). Order may vary by locale. */
export function parseGoogleWeekdayHours(
  lines: string[],
  weekdayLabels: Dictionary["map"]["weekdays"],
): OpeningHoursRow[] | null {
  if (lines.length < 7) return null;

  const parsed = lines.slice(0, 7).map((line) => {
    const colon = line.indexOf(":");
    const dayRaw = colon === -1 ? line.trim() : line.slice(0, colon).trim();
    const hours = colon === -1 ? "" : normalizeHoursText(line.slice(colon + 1));
    return { hours, key: dayLabelToKey(dayRaw) };
  });

  if (!parsed.every((row) => row.hours && row.key)) return null;

  const order = new Map(parsed.map((row) => [weekdayKeyToIndex(row.key!), row.hours]));
  if (order.size !== 7) return null;

  return MONDAY_FIRST_KEYS.map((key) => ({
    day: weekdayLabels[key],
    hours: order.get(weekdayKeyToIndex(key))!,
  }));
}

export function getOpeningHoursSchedule(
  dict: Dictionary,
  googleWeekdayText: string[] = [],
): OpeningHoursRow[] {
  const fromGoogle = parseGoogleWeekdayHours(googleWeekdayText, dict.map.weekdays);
  if (fromGoogle) return fromGoogle;

  const { weekdays, hoursTime } = dict.map;

  return MONDAY_FIRST_KEYS.map((key) => ({
    day: weekdays[key],
    hours: hoursTime,
  }));
}
