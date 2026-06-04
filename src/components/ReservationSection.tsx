import type { Locale } from "@/i18n/config";
import { ReservationExperience } from "@/components/reservation/ReservationExperience";

export async function ReservationSection({ locale }: { locale: Locale }) {
  return <ReservationExperience locale={locale} variant="embed" />;
}
