import React from "react";

interface AndesPayRowProps {
  icon: React.ReactNode;
  primaryText: string;
  secondaryText: string;
  action: React.ReactNode; // e.g., a link
  className?: string;
}

const AndesPayRow: React.FC<AndesPayRowProps> = ({
  icon,
  primaryText,
  secondaryText,
  action,
  className,
}) => {
  return (
    <div className={`pay-row ${className || ""}`}>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <div className="pay-icon">{icon}</div>
        <div>
          <div style={{ fontSize: "14px" }}>{primaryText}</div>
          <div style={{ fontSize: "12px", color: "#999" }}>{secondaryText}</div>
        </div>
      </div>
      {action}
    </div>
  );
};

export default AndesPayRow;
