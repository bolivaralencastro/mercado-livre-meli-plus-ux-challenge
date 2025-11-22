import React from "react";

interface AndesAuthItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  className?: string;
}

const AndesAuthItem: React.FC<AndesAuthItemProps> = ({
  icon,
  title,
  description,
  href = "#",
  className,
}) => {
  return (
    <a href={href} className={`auth-item ${className || ""}`}>
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <div className="auth-icon-box">{icon}</div>
        <div>
          <div style={{ fontWeight: 500 }}>{title}</div>
          <div style={{ fontSize: "13px", color: "#666" }}>{description}</div>
        </div>
      </div>
      <div style={{ color: "#ccc" }}>›</div>
    </a>
  );
};

export default AndesAuthItem;
