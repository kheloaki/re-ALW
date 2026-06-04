import { ReactNode } from "react";

type PaperCardProps = {
  children: ReactNode;
  className?: string;
  /** Overrides inner parchment padding (e.g. tighter desktop fit). */
  innerClassName?: string;
};

export function PaperCard({ children, className = "", innerClassName = "" }: PaperCardProps) {
  return (
    <div
      className={`relative rounded-[22px] border border-[#d6ad63]/45 paper-texture p-2 shadow-[0_35px_80px_rgba(48,34,24,0.45)] ${className}`}
    >
      <div className="absolute -right-7 -top-6 -z-10 h-full w-full rotate-[2deg] rounded-[22px] border border-[#d6ad63]/30 bg-[#ddceb1]/78" />
      <div className="absolute -left-6 -bottom-7 -z-20 h-full w-full -rotate-[2deg] rounded-[22px] border border-[#a97935]/28 bg-[#ccb994]/52" />
      <div
        className={`double-gold-border relative rounded-[20px] border border-[#be9a64]/70 px-5 py-6 md:px-8 md:py-7 lg:px-8 lg:py-6 ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
