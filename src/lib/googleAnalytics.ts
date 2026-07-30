const GA_MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/;

export function getGoogleAnalyticsMeasurementId(): string | null {
  const raw = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  if (!raw) return null;
  if (!GA_MEASUREMENT_ID_PATTERN.test(raw)) return null;
  return raw;
}
