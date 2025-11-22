import React from "react";

interface AndesUserPillProps {
  avatar?: React.ReactNode;
  primaryText: string;
  secondaryAction: React.ReactNode; // e.g., a link
  className?: string;
}

const AndesUserPill: React.FC<AndesUserPillProps> = ({
  avatar,
  primaryText,
  secondaryAction,
  className,
}) => {
  return (
    <div className={`user-pill ${className || ""}`}>
      {avatar && <div className="user-avatar">{avatar}</div>}
      <div>
        <div style={{ fontSize: "13px", fontWeight: 500 }}>{primaryText}</div>
        {secondaryAction}
      </div>
    </div>
  );
};

export default AndesUserPill;
