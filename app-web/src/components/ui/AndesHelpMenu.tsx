import React from "react";

interface HelpMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

interface AndesHelpMenuProps {
  items: HelpMenuItem[];
  className?: string;
}

const AndesHelpMenu: React.FC<AndesHelpMenuProps> = ({
  items,
  className,
}) => {
  const baseClass = "andes-card";
  const combinedClassName = [baseClass, className].filter(Boolean).join(" ");

  return (
    <div className={combinedClassName}>
      <ul className="andes-list">
        {items.map((item) => (
          <li key={item.id} className="andes-list__item">
            <a
              href={item.href || "#"}
              className="andes-list__item-actionable"
              aria-label={item.label}
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault();
                  item.onClick();
                }
              }}
            ></a>

            <div className="andes-list__item-content-wrapper">
              {item.icon && (
                <div className="andes-list__item-asset">{item.icon}</div>
              )}

              <div className="andes-list__item-text">{item.label}</div>

              <div className="andes-list__item-chevron">
                <svg width="8" height="12" viewBox="0 0 8 12" fill="currentColor">
                  <path d="M1.41 0L0 1.41 4.58 6 0 10.59 1.41 12 7.41 6z" />
                </svg>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AndesHelpMenu;
