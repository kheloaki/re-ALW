import { useId } from "react";

type ArchFeatureCardProps = {
  title: string;
  description: string;
  icon: string;
};

function ArchSvg({
  W,
  H,
  outer,
  inner,
  clipId,
  strokeOuter,
}: {
  W: number;
  H: number;
  outer: string;
  inner: string;
  clipId: string;
  strokeOuter: number;
}) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
          <path d={outer} />
        </clipPath>
      </defs>
      <path d={outer} fill="#17181a" stroke="#b8893f" strokeWidth={strokeOuter} />
      <path d={inner} fill="none" stroke="#f0d9a0" strokeOpacity="0.88" strokeWidth="1.15" />
    </svg>
  );
}

function ArchFeatureContent({
  clipId,
  icon,
  title,
  description,
  size,
}: {
  clipId: string;
  icon: string;
  title: string;
  description: string;
  size: "mobile" | "desktop";
}) {
  const titleLines = title.split("\n");

  return (
    <div className={`arch-feature__clip arch-feature__clip--${size}`} style={{ clipPath: `url(#${clipId})` }}>
      <div className="arch-feature__inner">
        <div className="arch-feature__icon" aria-hidden>
          {icon}
        </div>
        <h3 className="arch-feature__title">
          {titleLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h3>
        <p className="arch-feature__desc">{description}</p>
      </div>
    </div>
  );
}

export function ArchFeatureCard({ title, description, icon }: ArchFeatureCardProps) {
  const clipMobile = `feature-m-${useId().replace(/[:]/g, "")}`;
  const clipDesktop = `feature-d-${useId().replace(/[:]/g, "")}`;

  const outerM =
    "M10 268 L10 108 Q10 86 24 70 L82 22 Q94 10 110 8 Q126 10 138 22 L196 70 Q210 86 210 108 L210 268 Z";
  const innerM =
    "M22 252 L22 118 Q22 98 34 86 L88 40 Q98 32 110 30 Q122 32 132 40 L186 86 Q198 98 198 118 L198 252 Z";

  const outerD =
    "M12 418 L12 162 Q12 128 30 108 L102 38 Q114 22 127.5 16 Q141 22 153 38 L225 108 Q243 128 243 162 L243 418 Z";
  const innerD =
    "M26 402 L26 172 Q26 142 40 126 L108 56 Q118 44 127.5 38 Q137 44 147 56 L215 126 Q229 142 229 172 L229 402 Z";

  return (
    <>
      <div className="arch-feature arch-feature--mobile mx-auto max-w-full lg:hidden">
        <div className="arch-feature__frame arch-feature__frame--mobile">
          <ArchSvg W={220} H={280} outer={outerM} inner={innerM} clipId={clipMobile} strokeOuter={3.5} />
          <ArchFeatureContent
            clipId={clipMobile}
            icon={icon}
            title={title}
            description={description}
            size="mobile"
          />
        </div>
      </div>
      <div className="arch-feature arch-feature--desktop mx-auto hidden max-w-full lg:block">
        <div className="arch-feature__frame arch-feature__frame--desktop">
          <ArchSvg W={255} H={430} outer={outerD} inner={innerD} clipId={clipDesktop} strokeOuter={4} />
          <ArchFeatureContent
            clipId={clipDesktop}
            icon={icon}
            title={title}
            description={description}
            size="desktop"
          />
        </div>
      </div>
    </>
  );
}
