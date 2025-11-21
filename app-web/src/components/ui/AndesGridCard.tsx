import React from "react";
import AndesCard from "./AndesCard";
import AndesMoney from "./AndesMoney";
import AndesBadge from "./AndesBadge";

interface AndesGridCardProps {
  imageUrl: string;
  badgeText?: string;
  title: string;
  price: number;
  priceCents?: string;
  discount?: string;
  shippingText: string;
  className?: string;
}

const AndesGridCard: React.FC<AndesGridCardProps> = ({
  imageUrl,
  badgeText,
  title,
  price,
  priceCents,
  discount,
  shippingText,
  className,
}) => {
  return (
    <AndesCard className={`grid-card ${className || ""}`}>
      <div className="grid-card__img">
        {badgeText && (
          <div style={{ position: "absolute", top: "10px", left: "10px" }}>
            <AndesBadge variant="bestseller">{badgeText}</AndesBadge>
          </div>
        )}
        <img src={imageUrl} alt={title} />
      </div>
      <div className="grid-card__content">
        <div className="grid-card__title">{title}</div>
        <AndesMoney
          amount={price}
          cents={priceCents}
          discount={discount}
          size="small" // Assuming a smaller size for grid
          style={{ fontSize: "20px" }}
        />
        <div className="grid-card__shipping">{shippingText}</div>
      </div>
    </AndesCard>
  );
};

export default AndesGridCard;
