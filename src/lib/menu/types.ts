import type { Locale } from "@/i18n/config";

export type MenuItemLabels = Partial<Record<Locale, string>> & {
  fr: string;
  en: string;
  ar: string;
};

export type MenuItem = {
  id: string;
  name: MenuItemLabels;
  description?: MenuItemLabels;
  priceDh: number;
  image?: string;
  signature?: boolean;
};

export type MenuCategory = {
  id: string;
  title: MenuItemLabels;
  subtitle?: MenuItemLabels;
  items: MenuItem[];
};
