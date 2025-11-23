'use client';

import React from "react";

interface AndesHighlightedFilterProps {
  title: string;
  subtitle?: React.ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  icon?: React.ReactNode;
  className?: string;
  id?: string;
}

const AndesHighlightedFilter: React.FC<AndesHighlightedFilterProps> = ({
  title,
  subtitle,
  checked = false,
  onChange,
  icon,
  className,
  id = "highlighted_filter",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  const baseClass = "ui-search-filter-highlighted__container";
  const combinedClassName = [baseClass, className].filter(Boolean).join(" ");

  return (
    <div className={combinedClassName}>
      <label className="andes-switch ui-search-filter-highlighted__switch">
        <span className="andes-switch__label">
          <span className="ui-label-builder ui-search-filter-highlighted__title">
            {icon && icon}
            {title}
          </span>
          {subtitle && (
            <span className="ui-label-builder">{subtitle}</span>
          )}
        </span>

        <input
          className="andes-switch__input"
          id={id}
          type="checkbox"
          role="switch"
          checked={checked}
          onChange={handleChange}
        />

        <div className="andes-switch__slider"></div>
      </label>
    </div>
  );
};

export default AndesHighlightedFilter;
