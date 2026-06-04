import { Resend } from "resend";
import { isLocale, type Locale } from "@/i18n/config";
import { getSiteUrl } from "@/lib/site";
import { VENUE } from "@/lib/venue";

export type ReservationPayload = {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests: string;
  locale: Locale;
};

const PHONE_RE = /^[\d\s+().-]{8,24}$/;

function asTrimmedString(value: unknown, maxLen: number): string | null {
  if (typeof value !== "string") return null;
  const s = value.trim();
  if (!s || s.length > maxLen) return null;
  return s;
}

function isValidDateString(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const [y, m, d] = date.split("-").map(Number);
  const parsed = new Date(y, m - 1, d);
  return parsed.getFullYear() === y && parsed.getMonth() === m - 1 && parsed.getDate() === d;
}

function isNotPastDate(date: string): boolean {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Casablanca",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  return date >= today;
}

export function parseReservationBody(
  body: unknown,
): { ok: true; data: ReservationPayload } | { ok: false; message: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, message: "invalid_body" };
  }

  const raw = body as Record<string, unknown>;

  if (typeof raw.company === "string" && raw.company.trim()) {
    return { ok: false, message: "spam" };
  }

  const name = asTrimmedString(raw.name, 120);
  const phone = asTrimmedString(raw.phone, 32);
  const date = asTrimmedString(raw.date, 10);
  const time = asTrimmedString(raw.time, 8);
  const specialRequests = asTrimmedString(raw.specialRequests ?? "", 2000) ?? "";

  if (!name || name.length < 2) return { ok: false, message: "invalid_name" };
  if (!phone || !PHONE_RE.test(phone)) return { ok: false, message: "invalid_phone" };
  if (!date || !isValidDateString(date) || !isNotPastDate(date)) {
    return { ok: false, message: "invalid_date" };
  }
  if (!time || !/^\d{2}:\d{2}$/.test(time)) return { ok: false, message: "invalid_time" };

  const guestsNum = Number(raw.guests);
  if (!Number.isInteger(guestsNum) || guestsNum < 1 || guestsNum > 30) {
    return { ok: false, message: "invalid_guests" };
  }

  const localeRaw = typeof raw.locale === "string" ? raw.locale : "fr";
  const locale: Locale = isLocale(localeRaw) ? localeRaw : "fr";

  return {
    ok: true,
    data: {
      name,
      phone,
      date,
      time,
      guests: guestsNum,
      specialRequests,
      locale,
    },
  };
}

function formatDateForEmail(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Africa/Casablanca",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(y, m - 1, d));
}

function buildEmailContent(data: ReservationPayload) {
  const siteUrl = getSiteUrl();
  const dateLabel = formatDateForEmail(data.date);
  const requests = data.specialRequests || "—";

  const subjectByLocale: Record<Locale, string> = {
    fr: `Nouvelle réservation — ${data.name} — ${data.date}`,
    en: `New reservation — ${data.name} — ${data.date}`,
    ar: `حجز جديد — ${data.name} — ${data.date}`,
    de: `Neue Reservierung — ${data.name} — ${data.date}`,
    pl: `Nowa rezerwacja — ${data.name} — ${data.date}`,
  };

  const heading = "Nouvelle demande de réservation";

  const rows: { label: string; value: string }[] = [
    { label: "Nom", value: data.name },
    { label: "Téléphone", value: data.phone },
    { label: "Date", value: dateLabel },
    { label: "Heure", value: data.time },
    { label: "Convives", value: String(data.guests) },
    { label: "Requêtes spéciales", value: requests },
    { label: "Langue du formulaire", value: data.locale.toUpperCase() },
  ];

  const rowsHtml = rows
    .map(
      (r) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#6b5a42;font-size:13px;font-weight:600;">${escapeHtml(r.label)}</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#1a130c;font-size:15px;">${escapeHtml(r.value)}</td></tr>`,
    )
    .join("");

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#1a130c;">
      <p style="margin:0 0 8px;font-size:13px;color:#8b6a3e;text-transform:uppercase;letter-spacing:0.08em;">${VENUE.name}</p>
      <h1 style="margin:0 0 20px;font-size:22px;color:#3d2e1a;">${heading}</h1>
      <table style="width:100%;border-collapse:collapse;background:#faf6ee;border-radius:8px;overflow:hidden;">${rowsHtml}</table>
      <p style="margin:20px 0 0;font-size:13px;color:#6b5a42;">${siteUrl}/reservation</p>
    </div>
  `;

  const text = rows.map((r) => `${r.label}: ${r.value}`).join("\n");

  return { subject: subjectByLocale[data.locale], html, text };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendReservationEmail(data: ReservationPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.RESERVATION_OWNER_EMAIL?.trim();
  const from =
    process.env.RESEND_FROM_EMAIL?.trim() || `Al Walima <onboarding@resend.dev>`;

  if (!apiKey || !to) {
    throw new Error("RESEND_NOT_CONFIGURED");
  }

  const { subject, html, text } = buildEmailContent(data);
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject: `[Al Walima] ${subject}`,
    html,
    text,
  });

  if (error) {
    throw new Error("RESEND_SEND_FAILED");
  }
}
