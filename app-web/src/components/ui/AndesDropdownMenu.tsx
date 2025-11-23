'use client';

import React, { useState } from "react";

interface MenuItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

interface MenuSection {
  title?: string;
  items: MenuItem[];
}

interface AndesDropdownMenuProps {
  label: string;
  sections: MenuSection[];
  className?: string;
}

const AndesDropdownMenu: React.FC<AndesDropdownMenuProps> = ({
  label,
  sections,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (item: MenuItem, e: React.MouseEvent) => {
    if (item.onClick) {
      e.preventDefault();
      item.onClick();
      setIsOpen(false);
    }
  };

  const baseClass = "nav-item nav-item--has-menu";
  const combinedClassName = [baseClass, className].filter(Boolean).join(" ");

  return (
    <div
      className={combinedClassName}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span>
        {label}
        <svg className="nav-arrow" viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </span>

      {isOpen && (
        <div className="dropdown-menu">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="dropdown-section">
              {section.title && (
                <div className="dropdown-section__title">{section.title}</div>
              )}
              <ul className="dropdown-section__list">
                {section.items.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href || "#"}
                      className="dropdown-item"
                      onClick={(e) => handleItemClick(item, e)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AndesDropdownMenu;
