import React from "react";
import AndesCard from "./AndesCard";
import AndesMoney from "./AndesMoney";
import AndesButton from "./AndesButton";

interface AndesMeliCardProps {
  tag: string;
  title: string;
  originalPrice?: number;
  price: number;
  priceCents?: string;
  discount?: string;
  periodText: string;
  listItems: React.ReactNode[];
  buttonText: string;
  offerText?: string;
  className?: string;
}

const AndesMeliCard: React.FC<AndesMeliCardProps> = ({
  tag,
  title,
  originalPrice,
  price,
  priceCents,
  discount,
  periodText,
  listItems,
  buttonText,
  offerText,
  className,
}) => {
  return (
    <AndesCard className={`meli-card ${className || ""}`}>
      {offerText && (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            background: "#e6f7ef",
            color: "#00a650",
            fontSize: "10px",
            padding: "3px 6px",
            borderBottomLeftRadius: "6px",
            fontWeight: 700,
          }}
        >
          {offerText}
        </div>
      )}
      <div className="meli-header">
        <span className="meli-tag">{tag}</span>{" "}
        <span style={{ fontWeight: 700, marginLeft: "5px" }}>{title}</span>
      </div>
      <div className="meli-price-box">
        {originalPrice && (
          <AndesMoney
            amount={originalPrice}
            strikeThrough
            className="andes-money-strike"
          />
        )}
        <AndesMoney
          amount={price}
          cents={priceCents}
          discount={discount}
          style={{ fontSize: "28px" }}
        />
        <div style={{ fontSize: "12px", color: "#666" }}>{periodText}</div>
      </div>
      <ul className="meli-list">
        {listItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div style={{ padding: "20px" }}>
        <AndesButton variant="primary" fullWidth>
          {buttonText}
        </AndesButton>
      </div>
    </AndesCard>
  );
};

export default AndesMeliCard;
