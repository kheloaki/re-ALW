"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";

const LOGO_SRC = "/assets/logo-alwalima.png";

type BrandLogoProps = {
  href?: string;
  variant?: "navbar" | "navbarMobile" | "footer";
  className?: string;
};

const LINE_CLASS = "font-display leading-[1.05] text-[#e6d1a2] whitespace-nowrap";

export function BrandLogo({ href, variant = "navbar", className = "" }: BrandLogoProps) {
  const { dict } = useLocale();
  const { line1, line2 } = dict.divider;
  const label = `${line1} ${line2}`;

  const variantClass =
    variant === "navbar"
      ? "brand-logo--nav"
      : variant === "navbarMobile"
        ? "brand-logo--nav-mobile"
        : "brand-logo--footer";

  const lineSize =
    variant === "footer"
      ? "text-[30px] sm:text-[34px]"
      : variant === "navbarMobile"
        ? "text-[17px] leading-[1.08] sm:text-[19px]"
        : "text-[28px] xl:text-[32px]";

  const inner = (
    <span className={`brand-logo inline-flex min-w-0 items-center self-center ${variantClass} ${className}`}>
      <span className="brand-logo__mark-wrap shrink-0">
        <img
          src={LOGO_SRC}
          alt=""
          className="brand-logo__mark block w-auto bg-transparent object-contain"
          decoding="async"
        />
      </span>
      <span
        className={`brand-logo__text flex min-w-0 flex-col justify-center gap-0.5 ${variant === "navbar" ? "brand-logo__text--desktop-collapse" : ""} ${variant === "navbarMobile" ? "brand-logo__text--mobile" : ""}`}
      >
        <span className={`${LINE_CLASS} ${lineSize} ${variant === "navbarMobile" ? "brand-logo__line--primary" : ""}`}>
          {line1}
        </span>
        <span className={`${LINE_CLASS} ${lineSize} ${variant === "navbarMobile" ? "brand-logo__line--secondary" : ""}`}>
          {line2}
        </span>
      </span>
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="brand-logo__link inline-flex shrink-0 items-center transition-opacity duration-300 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6ad63]/60"
        aria-label={label}
      >
        {inner}
      </Link>
    );
  }

  return inner;
}
