'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface FloatingMenuProps {
  menuItems: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
  }>;
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar se é mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Função para alternar o menu
  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Função para fechar o menu
  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Efeito para detectar a tecla "M"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'm') {
        toggleMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleMenu]);

  return (
    <>
      {/* Botão flutuante que também ativa o menu */}
      <button
        onClick={toggleMenu}
        className="andes-fab-menu__toggle"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isOpen}
      >
        <svg 
          className={`andes-fab-menu__toggle-icon ${isOpen ? 'andes-fab-menu__toggle-icon--close' : ''}`}
          width="24" 
          height="24" 
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            // Ícone de fechar (X)
            <>
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </>
          ) : (
            // Ícone de menu (hamburger)
            <>
              <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </>
          )}
        </svg>
      </button>

      {/* Overlay para fechar o menu ao clicar fora */}
      {isOpen && (
        <div 
          className="andes-fab-menu__overlay"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Menu colapsável */}
      <div 
        className={`andes-fab-menu__container ${isOpen ? 'andes-fab-menu__container--open' : 'andes-fab-menu__container--closed'}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
      >
        <div className="andes-fab-menu__header">
          <h3 className="andes-fab-menu__title">Menu de Navegação</h3>
          {isMobile && (
            <button 
              className="andes-fab-menu__close-button"
              onClick={closeMenu}
              aria-label="Fechar menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>
        
        <nav className="andes-fab-menu__nav">
          <ul className="andes-fab-menu__list">
            {menuItems.map((item, index) => (
              <li key={index} className="andes-fab-menu__list-item">
                {item.href ? (
                  <a 
                    href={item.href}
                    className="andes-fab-menu__link"
                    onClick={(e) => {
                      if (item.onClick) {
                        item.onClick();
                      }
                      closeMenu();
                      e.preventDefault();
                    }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    className="andes-fab-menu__button"
                    onClick={() => {
                      if (item.onClick) {
                        item.onClick();
                      }
                      closeMenu();
                    }}
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="andes-fab-menu__footer">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <p className="andes-fab-menu__hint">Pressione 'M' para {isOpen ? "fechar" : "abrir"} o menu</p>
        </div>
      </div>
    </>
  );
};

export default FloatingMenu;