import Link from "next/link";
import { ReactNode } from "react";

type GoldButtonProps = {
  children: ReactNode;
  href?: string;
  outline?: boolean;
  /** Stronger gradient + glow for the fixed navbar CTA (220×56). */
  navCta?: boolean;
  className?: string;
};

export function GoldButton({ children, href, outline = false, navCta = false, className = "" }: GoldButtonProps) {
  const variantClass = outline ? "gold-outline-btn" : navCta ? "navbar-gold-cta" : "gold-btn";
  const classes = `${variantClass} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <button type="button" className={classes}>{children}</button>;
}
