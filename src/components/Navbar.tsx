"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLocale } from "@/components/LocaleProvider";
import { stripLocaleFromPathname } from "@/i18n/config";
import { routesFor } from "@/lib/routes";
import { BrandLogo } from "@/components/BrandLogo";
import { GoldButton } from "./ui/GoldButton";

const SCROLL_SHRINK_AT = 64;
const SCROLL_EXPAND_AT = 24;

function isNavActive(pathname: string, href: string): boolean {
  const { pathname: path } = stripLocaleFromPathname(pathname);
  const { pathname: target } = stripLocaleFromPathname(href);
  return path === target;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { locale, dict } = useLocale();
  const routes = routesFor(locale);

  const links = [
    { label: dict.nav.home, href: routes.home },
    { label: dict.nav.menu, href: routes.menu },
    { label: dict.nav.reservation, href: routes.reservation },
    { label: dict.nav.gallery, href: `${routes.home}#gallery` },
    { label: dict.nav.reviews, href: `${routes.home}#reviews` },
    { label: dict.nav.contact, href: `${routes.home}#contact` },
  ] as const;

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      setScrolled((prev) => {
        if (!prev && y > SCROLL_SHRINK_AT) return true;
        if (prev && y < SCROLL_EXPAND_AT) return false;
        return prev;
      });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (scrolled) setOpen(false);
  }, [scrolled]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      data-shrunk={scrolled && !open ? "" : undefined}
      data-menu-open={open ? "" : undefined}
      className="site-header pointer-events-none fixed inset-x-0 top-0 z-40 w-full"
    >
      <nav className="site-navbar site-navbar-glass site-navbar--desktop pointer-events-auto hidden lg:flex">
        <BrandLogo href={routes.home} variant="navbar" />
        <ul className="site-navbar__links flex min-w-0 flex-1 list-none items-center justify-center gap-5 whitespace-nowrap text-[#e1cfac] xl:gap-6">
          {links.map(({ label, href }) => (
            <li key={label} className="relative shrink-0">
              <Link href={href} className="transition-colors duration-300 hover:text-[#f3dfb5]">
                {label}
              </Link>
              {isNavActive(pathname, href) && (
                <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-[#cba566]" />
              )}
            </li>
          ))}
        </ul>
        <div className="site-navbar__actions flex shrink-0 items-center gap-3">
          <LanguageSwitcher variant="navbar" />
          <GoldButton href={routes.reservation} navCta className="site-navbar__cta">
            {dict.nav.bookTable}
          </GoldButton>
        </div>
      </nav>

      <nav
        className={`site-navbar site-navbar-glass site-navbar--mobile pointer-events-auto flex flex-col lg:hidden ${open ? "site-navbar-glass--menu" : ""}`}
      >
        <div className="site-navbar__mobile-bar">
          <BrandLogo href={routes.home} variant="navbarMobile" className="site-navbar__mobile-brand min-w-0" />
          <button
            type="button"
            className="site-navbar__menu-btn shrink-0"
            aria-expanded={open}
            aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`site-navbar__menu-bars ${open ? "is-open" : ""}`} aria-hidden>
              <span className="site-navbar__menu-bar" />
              <span className="site-navbar__menu-bar" />
              <span className="site-navbar__menu-bar" />
            </span>
          </button>
        </div>
        {open && (
          <div className="site-navbar__mobile-menu">
            <ul className="site-navbar__mobile-links">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="site-navbar__mobile-link"
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="site-navbar__mobile-footer">
              <LanguageSwitcher variant="footer" />
              <GoldButton href={routes.reservation} navCta className="site-navbar__mobile-cta w-full !max-w-none">
                {dict.nav.bookTable}
              </GoldButton>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
