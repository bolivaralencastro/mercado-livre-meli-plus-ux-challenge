'use client';

import React, { useEffect, useRef, useState } from "react";

interface MenuItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

interface MenuSection {
  title?: string;
  items?: MenuItem[];
  groups?: MenuGroup[];
}

interface AndesDropdownMenuProps {
  label: React.ReactNode;
  sections: MenuSection[];
  className?: string;
  ariaLabel?: string;
}

const AndesDropdownMenu: React.FC<AndesDropdownMenuProps> = ({
  label,
  sections,
  className,
  ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleItemClick = (item: MenuItem, e: React.MouseEvent) => {
    if (item.onClick) {
      e.preventDefault();
      item.onClick();
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const baseClass = "nav-item nav-item--has-menu";
  const combinedClassName = [baseClass, className].filter(Boolean).join(" ");

  return (
    <div
      ref={containerRef}
      className={combinedClassName}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className="flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3483fa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#ffe600]"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={ariaLabel}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {label}
        <svg
          className={`nav-arrow transition-transform duration-200 ${isOpen ? "-rotate-180" : "rotate-0"}`}
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>

      {isOpen && (
        <div className="dropdown-menu" role="menu">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="dropdown-section space-y-3">
              {section.title ? (
                <div className="dropdown-section__title">{section.title}</div>
              ) : null}

              {section.groups?.map((group) => (
                <div key={group.title} className="space-y-1 px-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-[#666666]">
                    {group.title}
                  </div>
                  <ul className="dropdown-section__list space-y-0.5">
                    {group.items.map((item) => (
                      <li key={item.id} className="ml-2">
                        <a
                          href={item.href || "#"}
                          className="dropdown-item"
                          role="menuitem"
                          onClick={(e) => handleItemClick(item, e)}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {section.items ? (
                <ul className="dropdown-section__list">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <a
                        href={item.href || "#"}
                        className="dropdown-item"
                        role="menuitem"
                        onClick={(e) => handleItemClick(item, e)}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AndesDropdownMenu;
