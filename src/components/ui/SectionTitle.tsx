type SectionTitleProps = {
  title: string;
  className?: string;
  id?: string;
};

export function SectionTitle({ title, className = "", id }: SectionTitleProps) {
  return (
    <h2
      id={id}
      className={`font-display text-center text-[62px] leading-[0.95] font-semibold tracking-wide text-[#d6ad63] ${className}`}
    >
      {title}
    </h2>
  );
}
