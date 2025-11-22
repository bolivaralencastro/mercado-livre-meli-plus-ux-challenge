import React from "react";
import AndesCard from "./AndesCard";

interface AndesThematicCardProps {
  imageUrl: string;
  imageAlt?: string;
  title: string;
  className?: string;
}

const AndesThematicCard: React.FC<AndesThematicCardProps> = ({
  imageUrl,
  imageAlt,
  title,
  className,
}) => {
  return (
    <AndesCard
      className={`andes-card--flat andes-card--padding-0 andes-card--animated ${
        className || ""
      }`}
      style={{ width: "160px", height: "180px" }}
    >
      <div className="syi-product__card-container">
        <div className="syi-product__card-image">
          <img decoding="async" src={imageUrl} alt={imageAlt || title} />
        </div>
        <span className="andes-typography syi-product__card-title">
          {title}
        </span>
      </div>
    </AndesCard>
  );
};

export default AndesThematicCard;
