import React from "react";
import AndesCard from "./AndesCard";
import AndesButton from "./AndesButton";

interface SummaryRowData {
  label: string;
  value: string;
}

interface AndesSummaryCardProps {
  title: string;
  rows: SummaryRowData[];
  totalLabel: string;
  totalValue: string;
  buttonText: string;
  className?: string;
}

const AndesSummaryCard: React.FC<AndesSummaryCardProps> = ({
  title,
  rows,
  totalLabel,
  totalValue,
  buttonText,
  className,
}) => {
  return (
    <AndesCard className={`summary-card ${className || ""}`}>
      <div style={{ fontWeight: 600, marginBottom: "20px" }}>{title}</div>
      {rows.map((row, index) => (
        <div className="summary-row" key={index}>
          <span>{row.label}</span>
          <span>{row.value}</span>
        </div>
      ))}
      <div className="summary-divider"></div>
      <div className="summary-total">
        <span>{totalLabel}</span>
        <span>{totalValue}</span>
      </div>
      <AndesButton variant="primary" fullWidth>
        {buttonText}
      </AndesButton>
    </AndesCard>
  );
};

export default AndesSummaryCard;
