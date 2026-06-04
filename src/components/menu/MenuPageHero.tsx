import Image from "next/image";
import type { Dictionary } from "@/i18n/types";

type MenuPageHeroProps = {
  dict: Dictionary["menuPage"];
};

export function MenuPageHero({ dict }: MenuPageHeroProps) {
  return (
    <section className="menu-hero relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/assets/gallery-tajine-chicken.avif"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
          aria-hidden
        />
        <div className="absolute inset-0 bg-[#120e0c]/75" aria-hidden />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 100%, rgba(214,173,99,0.18) 0%, transparent 55%), linear-gradient(180deg, rgba(18,14,12,0.4) 0%, rgba(18,14,12,0.92) 100%)",
          }}
          aria-hidden
        />
      </div>

      <div className="menu-hero-ornament pointer-events-none absolute inset-0 opacity-[0.14]" aria-hidden />

      <div className="section-shell relative z-10 px-5 pb-14 pt-28 sm:px-10 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-36">
        <div className="mx-auto max-w-[900px] text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#f1d28a]/50 bg-[#1f1c18]/60 text-2xl text-[#f1d28a] shadow-[0_0_40px_rgba(214,173,99,0.35)] backdrop-blur-sm sm:h-16 sm:w-16 sm:text-[30px]">
            ✶
          </div>
          <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.28em] text-[#f1d28a]/90 sm:text-xs">
            {dict.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-[42px] leading-[0.92] text-[#fdf6e3] sm:text-5xl lg:text-[80px]">
            {dict.title}
          </h1>
          <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-relaxed text-[#e8dcc8] sm:text-base lg:text-lg">
            {dict.intro}
          </p>
          <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-4">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#d6ad63]/60" aria-hidden />
            <span className="font-display text-sm tracking-[0.2em] text-[#d6ad63] sm:text-base">DH</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#d6ad63]/60" aria-hidden />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#141210] to-transparent" aria-hidden />
    </section>
  );
}
