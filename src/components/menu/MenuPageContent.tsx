"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { MENU_CATEGORIES, menuLabel } from "@/lib/menu";
import { routesFor } from "@/lib/routes";
import { VENUE } from "@/lib/venue";
import { MenuCategoryPanel } from "./MenuCategoryPanel";

export function MenuPageContent() {
  const { locale, dict } = useLocale();
  const m = dict.menuPage;
  const routes = routesFor(locale);
  const [activeId, setActiveId] = useState(MENU_CATEGORIES[0]?.id ?? "");

  useEffect(() => {
    const sections = MENU_CATEGORIES.map((c) => document.getElementById(`menu-${c.id}`)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0]?.target.id.replace("menu-", "");
        if (top) setActiveId(top);
      },
      { rootMargin: "-12% 0px -62% 0px", threshold: [0, 0.12, 0.3] },
    );

    sections.forEach((el) => observer.observe(el!));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string) => {
    setActiveId(id);
  };

  return (
    <div className="menu-page-body">
      {/* Mobile: sticky category bar */}
      <div className="menu-mobile-nav lg:hidden">
        <p className="menu-mobile-nav__label">{m.categoriesNav}</p>
        <p className="menu-mobile-nav__hint">{m.scrollHint}</p>
        <div className="menu-mobile-nav__scroll">
          <ul className="menu-mobile-nav__list">
            {MENU_CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <a
                  href={`#menu-${cat.id}`}
                  onClick={() => handleNavClick(cat.id)}
                  className={`menu-mobile-nav__chip ${activeId === cat.id ? "menu-mobile-nav__chip--active" : ""}`}
                >
                  {menuLabel(cat.title, locale)}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="menu-mobile-nav__price-note">{m.priceNote}</p>
      </div>

      <div className="menu-layout">
        {/* Desktop sidebar */}
        <aside className="menu-sidebar hidden lg:block">
          <p className="menu-sidebar__label">{m.categoriesNav}</p>
          <nav aria-label={m.categoriesNav}>
            <ul className="menu-sidebar__list">
              {MENU_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <a
                    href={`#menu-${cat.id}`}
                    onClick={() => handleNavClick(cat.id)}
                    className={`menu-sidebar__link ${activeId === cat.id ? "menu-sidebar__link--active" : ""}`}
                  >
                    <span className="menu-sidebar__link-text">{menuLabel(cat.title, locale)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="menu-sidebar__note">{m.priceNote}</p>
        </aside>

        <div className="menu-content">
          {MENU_CATEGORIES.map((category, index) => (
            <MenuCategoryPanel
              key={category.id}
              category={category}
              locale={locale}
              index={index}
              signatureBadge={m.signatureBadge}
              dishColumn={m.dishColumn}
              priceColumn={m.priceColumn}
            />
          ))}

          <div className="menu-cta">
            <p className="menu-cta__title">{m.bookTable}</p>
            <p className="menu-cta__address">
              {VENUE.name} — {VENUE.line1}, {VENUE.line2}
            </p>
            <div className="menu-cta__actions">
              <Link href={routes.reservation} className="gold-btn menu-cta__btn">
                {m.bookTable}
              </Link>
              <a href={`tel:${VENUE.phoneTel}`} className="gold-outline-btn menu-cta__btn">
                {dict.map.call} — {VENUE.phone}
              </a>
              <Link href={routes.home} className="gold-outline-btn menu-cta__btn">
                {m.backHome}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
