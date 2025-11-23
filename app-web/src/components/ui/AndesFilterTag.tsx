import React from "react";

interface AndesFilterTagProps {
  label: string;
  onRemove?: () => void;
  className?: string;
}

const AndesFilterTag: React.FC<AndesFilterTagProps> = ({
  label,
  onRemove,
  className,
}) => {
  const baseClass = "andes-tag";
  const combinedClassName = [baseClass, className].filter(Boolean).join(" ");

  return (
    <div className={combinedClassName}>
      <span className="andes-tag__label">{label}</span>
      {onRemove && (
        <button
          className="andes-tag__action"
          onClick={onRemove}
          aria-label={`Remover filtro ${label}`}
        >
          <svg className="andes-tag__icon" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default AndesFilterTag;
