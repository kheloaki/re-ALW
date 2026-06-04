import Image from "next/image";
import { menuLabel, menuSecondaryLine, type MenuItemLabels } from "@/lib/menu";
import type { Locale } from "@/i18n/config";
import { MenuPrice } from "./MenuPrice";

type MenuItemRowProps = {
  name: MenuItemLabels;
  description?: MenuItemLabels;
  priceDh: number;
  image: string;
  signature?: boolean;
  signatureBadge: string;
  locale: Locale;
};

export function MenuItemRow({
  name,
  description,
  priceDh,
  image,
  signature,
  signatureBadge,
  locale,
}: MenuItemRowProps) {
  const primary = menuLabel(name, locale);
  const secondary = menuSecondaryLine(name, locale);

  return (
    <article className="menu-item-feature overflow-hidden rounded-2xl border border-[#d6ad63]/25 bg-[#1a1612]">
      <div className="flex flex-col md:flex-row">
        <div className="relative aspect-[5/3] w-full md:aspect-auto md:h-[min(180px,100%)] md:min-h-[160px] md:w-[38%] lg:w-[34%]">
          <Image
            src={image}
            alt={primary}
            fill
            sizes="(max-width: 768px) 100vw, 280px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0806]/90 via-[#0a0806]/20 to-transparent md:bg-gradient-to-r md:from-[#0a0806]/95 md:via-[#0a0806]/40 md:to-transparent" />
          {signature && (
            <span className="absolute start-3 top-3 rounded-md border border-[#f1d28a]/55 bg-[#1e170f]/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#f1d28a]">
              {signatureBadge}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6 md:justify-center">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-[1.35rem] leading-tight text-[#faf3e3] sm:text-[1.65rem]">
                {primary}
              </h3>
              {secondary && (
                <p
                  className="mt-1.5 hidden text-[12px] leading-snug text-[#9a8f78] sm:block"
                  dir={locale === "ar" ? "ltr" : undefined}
                >
                  {secondary}
                </p>
              )}
            </div>
            <MenuPrice priceDh={priceDh} size="lg" />
          </div>
          {description && (
            <p className="text-[14px] leading-relaxed text-[#c9bcaa] sm:text-[15px]">
              {menuLabel(description, locale)}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
