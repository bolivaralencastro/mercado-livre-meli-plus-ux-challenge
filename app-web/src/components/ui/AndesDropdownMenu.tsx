'use client';

import React, { useState, useRef } from "react";
import Link from "next/link";

export interface MenuItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  description?: string;
  children?: MenuItem[]; // Nível 3
}

interface AndesDropdownMenuProps {
  label: React.ReactNode;
  items: MenuItem[]; // Nível 2
  className?: string;
  ariaLabel?: string;
}

const AndesDropdownMenu: React.FC<AndesDropdownMenuProps> = ({
  label,
  items,
  className,
  ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center h-full ${className || ""}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* NÍVEL 1: Botão Principal */}
      <button
        type="button"
        className="flex items-center gap-1 px-2 py-2 text-sm font-medium text-[#333333] hover:text-[#3483fa] focus:outline-none transition-colors duration-200"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={ariaLabel}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {label}
        <svg
          className={`w-2.5 h-2.5 ml-1 fill-current transition-transform duration-200 ${
            isOpen ? "-rotate-180" : "rotate-0"
          }`}
          viewBox="0 0 12 12"
          aria-hidden
        >
          <path d="M9.35229 3.70447L6.00004 7.05672L2.64779 3.70447L1.85229 4.49996L6.00004 8.64771L10.1478 4.49996L9.35229 3.70447Z" />
        </svg>
      </button>

      {/* NÍVEL 2: Dropdown Vertical */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-[280px] bg-white shadow-[0_4px_16px_0_rgba(0,0,0,0.2)] rounded-md z-50 py-2 animate-in fade-in zoom-in-95 duration-100">
          {/* Ponte invisível para o mouse não escapar entre o botão e o menu */}
          <div className="absolute -top-4 left-0 w-full h-4 bg-transparent" />
          
          {/* Seta superior (Triângulo) */}
          <div className="absolute -top-1.5 left-8 w-3 h-3 bg-white rotate-45 shadow-[-2px_-2px_2px_-1px_rgba(0,0,0,0.05)] z-[51]" />

          <ul className="relative">
            {items.map((item) => (
              <li
                key={item.id}
                className="group flex items-center px-5 py-3 text-sm text-[#333333] hover:bg-[#f5f5f5] hover:text-[#3483fa] cursor-pointer relative hover:rounded-r-none rounded-md transition-colors"
              >
                {/* Ícone do Item (Opcional) */}
                {item.icon && (
                  <span className="mr-3 w-6 h-6 flex items-center justify-center text-gray-400 group-hover:text-[#3483fa]">
                    {item.icon}
                  </span>
                )}

                {/* Link ou Texto do Item */}
                {item.href ? (
                  <Link href={item.href} className="flex-1 block">
                    {item.label}
                  </Link>
                ) : (
                  <span className="flex-1 block">{item.label}</span>
                )}

                {/* Seta indicando Submenu (se houver children) */}
                {item.children && item.children.length > 0 && (
                  <svg
                    className="w-3 h-3 ml-auto fill-[#999999] group-hover:fill-[#3483fa]"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                  </svg>
                )}

                {/* NÍVEL 3: Painel Lateral */}
                {item.children && item.children.length > 0 && (
                  <div className="hidden group-hover:block absolute left-full top-[-10px] w-[300px] min-h-[calc(100%+20px)] bg-white shadow-[0_4px_16px_0_rgba(0,0,0,0.2)] rounded-r-md p-6 z-40 -ml-[1px]">
                    {/* Ponte lateral invisível */}
                    <div className="absolute top-0 -left-2.5 w-2.5 h-full bg-transparent" />

                    <span className="block text-base font-semibold text-[#333333] mb-1">
                      {item.label}
                    </span>
                    
                    {item.href && (
                      <Link
                        href={item.href}
                        className="block text-sm font-semibold text-[#3483fa] hover:text-[#2968c8] mb-4"
                      >
                        Ver tudo em {item.label}
                      </Link>
                    )}

                    <hr className="border-t border-[#ededed] my-4" />

                    <ul className="space-y-3">
                      {item.children.map((subItem) => (
                        <li key={subItem.id}>
                          <Link
                            href={subItem.href || "#"}
                            className="block text-sm text-[#333333] hover:text-[#3483fa]"
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AndesDropdownMenu;
