import React from "react";

interface AndesMoneyProps extends React.HTMLAttributes<HTMLDivElement> {
  amount: string | number;
  currencySymbol?: string;
  cents?: string | number;
  discount?: string;
  strikeThrough?: boolean;
  size?: "small" | "medium" | "large"; // Example of adding size prop if needed
}

const AndesMoney: React.FC<AndesMoneyProps> = ({
  amount,
  currencySymbol = "R$",
  cents,
  discount,
  strikeThrough = false,
  size = "medium", // Default size
  className,
  ...props
}) => {
  const baseClass = "andes-money";
  const fraction = typeof amount === "number" ? amount.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : amount;
  const displayCents = cents !== undefined ? (typeof cents === "number" ? cents.toString().padStart(2, '0') : cents) : null;
  
  // Apply size styling if defined in CSS, otherwise default.
  // For now, let's keep it simple and just use a style prop if needed for specific sizes,
  // or rely on parent context for font-size.
  // The original CSS has font-size directly on .andes-money so we might need to adjust.

  return (
    <>
      {strikeThrough && (
        <span className="andes-money-strike">
          {currencySymbol} {fraction}
          {displayCents && `,${displayCents}`}
        </span>
      )}
      <div className={`${baseClass} ${className || ""}`} {...props} style={size === "large" ? { fontSize: "32px" } : undefined}>
        <span className="andes-money__symbol">{currencySymbol}</span>
        <span className="andes-money__fraction">{fraction}</span>
        {displayCents && <span className="andes-money__cents">{displayCents}</span>}
        {discount && <span className="andes-money-discount">{discount}</span>}
      </div>
    </>
  );
};

export default AndesMoney;
