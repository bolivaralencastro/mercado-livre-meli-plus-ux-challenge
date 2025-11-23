import React from "react";

interface AndesEmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
}

const AndesEmptyState: React.FC<AndesEmptyStateProps> = ({
  icon,
  title,
  description,
  className,
}) => {
  const baseClass = "c-empty-state--outline";
  const combinedClassName = [baseClass, className].filter(Boolean).join(" ");

  return (
    <div className={combinedClassName}>
      <div className="c-empty-state__container">
        {icon && <span className="c-empty-state__icon">{icon}</span>}
        
        <h2 className="c-empty-state__title">{title}</h2>
        
        {description && (
          <p className="c-empty-state__description">{description}</p>
        )}
      </div>
    </div>
  );
};

export default AndesEmptyState;
