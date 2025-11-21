import React from "react";
import AndesCard from "./AndesCard";
import AndesMoney from "./AndesMoney";
import AndesButton from "./AndesButton";

interface AndesPdpCardProps {
  statusText?: string;
  title: string;
  price: number;
  priceCents?: string;
  benefitText: React.ReactNode;
  buyButtonText?: string;
  addButtonText?: string;
  className?: string;
}

const AndesPdpCard: React.FC<AndesPdpCardProps> = ({
  statusText,
  title,
  price,
  priceCents,
  benefitText,
  buyButtonText = "Comprar agora",
  addButtonText = "Adicionar ao carrinho",
  className,
}) => {
  return (
    <AndesCard className={`pdp-card ${className || ""}`}>
      {statusText && (
        <span style={{ fontSize: "12px", color: "#666" }}>{statusText}</span>
      )}
      <h1 style={{ fontSize: "20px", lineHeight: "1.2", margin: "0" }}>
        {title}
      </h1>

      <AndesMoney
        amount={price}
        cents={priceCents}
        size="large"
        style={{ fontSize: "36px" }}
      />

      <div className="pdp-benefit">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z" />
        </svg>
        <span>{benefitText}</span>
      </div>

      <AndesButton variant="primary" fullWidth>
        {buyButtonText}
      </AndesButton>
      <AndesButton variant="transparent" fullWidth>
        {addButtonText}
      </AndesButton>
    </AndesCard>
  );
};

export default AndesPdpCard;
