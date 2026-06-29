import type { MenuCategory } from "@/lib/menu";
import { menuLabel } from "@/lib/menu";
import { resolveMenuItemImage } from "@/lib/menuImages";
import type { Locale } from "@/i18n/config";
import { MenuItemRow } from "./MenuItemRow";

type MenuCategoryPanelProps = {
  category: MenuCategory;
  locale: Locale;
  index: number;
  signatureBadge: string;
  dishColumn: string;
  priceColumn: string;
};

export function MenuCategoryPanel({
  category,
  locale,
  index,
  signatureBadge,
  dishColumn,
  priceColumn,
}: MenuCategoryPanelProps) {
  const title = menuLabel(category.title, locale);
  const itemCount = category.items.length;

  return (
    <section
      id={`menu-${category.id}`}
      className="menu-category scroll-mt-[7.5rem] sm:scroll-mt-32"
      aria-labelledby={`menu-heading-${category.id}`}
    >
      <div className="menu-category-panel">
        <header className="menu-category-panel__header">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="menu-category-panel__index">{String(index + 1).padStart(2, "0")}</p>
              <h2 id={`menu-heading-${category.id}`} className="menu-category-panel__title">
                {title}
              </h2>
              {category.subtitle && (
                <p className="menu-category-panel__subtitle">{menuLabel(category.subtitle, locale)}</p>
              )}
            </div>
            <span className="menu-category-panel__count" aria-hidden>
              {itemCount}
            </span>
          </div>
        </header>

        <div
          className="menu-category-panel__columns hidden sm:grid"
          aria-hidden
        >
          <span>{dishColumn}</span>
          <span className="text-end">{priceColumn}</span>
        </div>

        <ul className="menu-category-panel__list">
          {category.items.map((item) => (
            <li key={item.id}>
              <MenuItemRow
                name={item.name}
                description={item.description}
                priceDh={item.priceDh}
                image={resolveMenuItemImage(item.id)}
                signature={item.signature}
                signatureBadge={signatureBadge}
                locale={locale}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
