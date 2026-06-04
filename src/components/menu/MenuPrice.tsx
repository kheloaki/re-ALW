import { formatPriceDh, formatPriceParts } from "@/lib/menu";

type MenuPriceProps = {
  priceDh: number;
  size?: "md" | "lg";
};

export function MenuPrice({ priceDh, size = "md" }: MenuPriceProps) {
  const { amount, currency } = formatPriceParts(priceDh);

  return (
    <div
      className={`menu-price menu-price--${size}`}
      role="text"
      aria-label={formatPriceDh(priceDh)}
    >
      <span className="menu-price__amount">{amount}</span>
      <span className="menu-price__currency">{currency}</span>
    </div>
  );
}
