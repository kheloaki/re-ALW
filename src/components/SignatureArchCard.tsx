import Image from "next/image";
import { useId } from "react";

/** Card fill — keep in sync with SVG arch + image fade + text panel */
const CARD_BG = "#0a0806";

type SignatureArchCardProps = {
  title: string;
  description: string;
  price: string;
  image?: string;
  size: "large" | "medium";
  width?: number;
  height?: number;
  variant?: "poster" | "stacked";
};

/** Pointed Moroccan arch: vertical jambs, smooth horseshoe shoulders, shallow apex. */
function buildArchPaths(width: number, height: number) {
  const m = Math.max(14, Math.round(width * 0.036));
  const b = height - m;
  const x0 = m;
  const x1 = width - m;
  const xm = width / 2;
  const apex = Math.max(11, Math.round(height * 0.02));
  const shoulderY = Math.round(height * 0.138);
  const wing = Math.round(width * 0.248);
  const outer = `M ${x0} ${b} L ${x0} ${shoulderY} C ${x0} ${shoulderY - 28} ${x0 + 20} ${shoulderY - 50} ${x0 + 46} ${shoulderY - 60} L ${xm - wing} ${apex + 9} C ${xm - wing * 0.56} ${apex - 3} ${xm - 20} ${apex} ${xm} ${apex} C ${xm + 20} ${apex} ${xm + wing * 0.56} ${apex - 3} ${xm + wing} ${apex + 9} L ${x1 - 46} ${shoulderY - 60} C ${x1 - 20} ${shoulderY - 50} ${x1} ${shoulderY - 28} ${x1} ${shoulderY} L ${x1} ${b} Z`;

  return { outer };
}

export function SignatureArchCard({
  title,
  description,
  price,
  image,
  size,
  width: widthProp,
  height: heightProp,
  variant = "poster",
}: SignatureArchCardProps) {
  const isLarge = size === "large";
  const isStacked = variant === "stacked";
  const clipId = `sig-arch-${useId().replace(/[:]/g, "")}`;

  const width =
    widthProp ?? (isStacked ? (isLarge ? 262 : 248) : isLarge ? 500 : 360);
  const height =
    heightProp ?? (isStacked ? (isLarge ? 418 : 382) : isLarge ? 820 : 600);

  const { outer } = buildArchPaths(width, height);
  const shadowFilterId = `${clipId}-shadow`;

  const imageBandPct = image
    ? isStacked
      ? isLarge
        ? 58
        : 56
      : isLarge
        ? 60
        : 58
    : 0;
  const imageGradientHeight = isStacked ? "52%" : "62%";
  const imageFade = `linear-gradient(to top, ${CARD_BG} 0%, ${CARD_BG}f2 18%, ${CARD_BG}cc 38%, ${CARD_BG}66 58%, transparent 100%)`;

  const titleClass = isStacked
    ? isLarge
      ? "text-[26px]"
      : "text-[20px]"
    : isLarge
      ? "text-[46px]"
      : "text-[34px]";
  const descClass = isStacked
    ? isLarge
      ? "max-w-[260px] text-[13px]"
      : "max-w-[230px] text-[11px]"
    : isLarge
      ? "max-w-[400px] text-[18px]"
      : "max-w-[300px] text-[14px]";
  const priceClass = isStacked ? (isLarge ? "text-[24px]" : "text-[20px]") : isLarge ? "text-[38px]" : "text-[26px]";
  const textPad = image
    ? isStacked
      ? isLarge
        ? "pt-2.5 px-3.5"
        : "pt-2 px-3"
      : isLarge
        ? "pt-5 px-5"
        : "pt-4 px-5"
    : isStacked
      ? isLarge
        ? "pt-10 px-3.5"
        : "pt-8 px-3"
      : isLarge
        ? "pt-16 px-5"
        : "pt-12 px-5";

  return (
    <article className="relative overflow-visible" style={{ width, height }}>
      <svg viewBox={`0 0 ${width} ${height}`} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <filter id={shadowFilterId} x="-25%" y="-15%" width="150%" height="145%">
            <feDropShadow dx="0" dy="28" stdDeviation="26" floodColor="#000000" floodOpacity="0.58" />
            <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#1c120c" floodOpacity="0.42" />
          </filter>
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
            <path d={outer} />
          </clipPath>
        </defs>
        <path
          d={outer}
          fill={CARD_BG}
          stroke="#e0bc6a"
          strokeWidth={8}
          strokeLinejoin="round"
          filter={`url(#${shadowFilterId})`}
        />
      </svg>

      <div
        className="absolute inset-0 flex flex-col"
        style={{ clipPath: `url(#${clipId})`, backgroundColor: CARD_BG }}
      >
        {image ? (
          <div className="relative shrink-0" style={{ height: `${imageBandPct}%` }}>
            <Image
              src={image}
              alt={title.replace("\n", " ")}
              fill
              sizes="(max-width: 1024px) 90vw, 500px"
              className="object-cover object-center"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0"
              style={{ height: imageGradientHeight, background: imageFade }}
            />
          </div>
        ) : null}
        <div
          className={`flex flex-1 flex-col justify-center text-center ${textPad}`}
          style={{ backgroundColor: CARD_BG }}
        >
          <h3 className={`font-display leading-[0.95] text-[#f0d78c] ${titleClass} whitespace-pre-line`}>{title}</h3>
          <p className={`mx-auto mt-1.5 text-[#d8ccb8] ${descClass} leading-snug`}>{description}</p>
          <p className={`mt-2 font-display font-semibold text-[#f1d28a] ${priceClass}`}>{price}</p>
        </div>
      </div>
    </article>
  );
}
