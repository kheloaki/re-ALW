import { PHONE_COUNTRIES_DATA } from "@/lib/phoneCountriesData";

export type PhoneCountry = {
  code: string;
  label: string;
  region: string;
};

export const DEFAULT_PHONE_COUNTRY = "+212";
export const DEFAULT_PHONE_REGION = "MA";

export function countryFlagEmoji(region: string): string {
  const code = region.toUpperCase();
  if (!/^[A-Z]{2}$/.test(code)) return "";
  return String.fromCodePoint(
    ...[...code].map((char) => 0x1f1e6 - 65 + char.charCodeAt(0)),
  );
}

/** Morocco first, then alphabetical by country name. */
export const PHONE_COUNTRIES: PhoneCountry[] = PHONE_COUNTRIES_DATA;

export function findCountryByRegion(region: string): PhoneCountry {
  return (
    PHONE_COUNTRIES.find((country) => country.region === region) ??
    PHONE_COUNTRIES.find((country) => country.region === DEFAULT_PHONE_REGION) ??
    PHONE_COUNTRIES[0]
  );
}

export function findCountryByCode(code: string): PhoneCountry {
  return (
    PHONE_COUNTRIES.find((country) => country.code === code) ??
    findCountryByRegion(DEFAULT_PHONE_REGION)
  );
}

export function formatPhoneForSubmit(countryCode: string, local: string): string {
  const digits = local.replace(/\D/g, "");
  if (digits.length < 6) return "";
  const national = digits.startsWith("0") ? digits.slice(1) : digits;
  return `${countryCode} ${national}`.trim();
}

export function isValidSubmittedPhone(phone: string): boolean {
  const compact = phone.replace(/[\s().-]/g, "");
  if (!/^\+[1-9]\d{7,17}$/.test(compact)) return false;
  return true;
}
