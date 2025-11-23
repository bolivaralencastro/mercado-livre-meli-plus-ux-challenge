'use client';

import React, { useState } from "react";

interface AndesSortOption {
  id: string;
  label: string;
}

interface AndesSortMenuProps {
  options: AndesSortOption[];
  selectedId?: string;
  onChange?: (optionId: string) => void;
  className?: string;
}

const AndesSortMenu: React.FC<AndesSortMenuProps> = ({
  options,
  selectedId,
  onChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(opt => opt.id === selectedId) || options[0];

  const handleSelect = (optionId: string) => {
    if (onChange) {
      onChange(optionId);
    }
    setIsOpen(false);
  };

  const baseClass = "ui-search-sort-filter";
  const combinedClassName = [baseClass, className].filter(Boolean).join(" ");

  return (
    <div className={combinedClassName}>
      <span className="ui-search-view-options__title">Ordenar por</span>
      
      <details className="andes-dropdown" open={isOpen}>
        <summary
          className="andes-dropdown__trigger"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
          }}
        >
          <span className="andes-dropdown__display-values">
            {selectedOption?.label}
          </span>
          <svg className="andes-dropdown__arrow" viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </summary>

        {isOpen && (
          <div className="andes-floating-menu">
            <ul className="andes-floating-menu__list">
              {options.map((option) => (
                <li key={option.id} className="andes-list__item">
                  <a
                    href="#"
                    className={`andes-list__item-anchor ${
                      option.id === selectedId ? 'andes-list__item-anchor--selected' : ''
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSelect(option.id);
                    }}
                  >
                    {option.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </details>
    </div>
  );
};

export default AndesSortMenu;
