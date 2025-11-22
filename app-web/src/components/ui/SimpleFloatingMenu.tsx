'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

interface MenuItem {
  label: string;
  href: string;
  icon: string;
}

interface Position {
  x: number;
  y: number;
}

const SimpleFloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 }); // Valor inicial temporário
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState<{ x: number; y: number } | null>(null);
  const [selectedPage, setSelectedPage] = useState('Página Inicial');
  const [isClient, setIsClient] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);

  const menuItems: MenuItem[] = [
    { label: 'Página Inicial', href: '/', icon: '🏠' },
    { label: 'Briefing', href: '/briefing', icon: '📋' },
    { label: 'Pesquisa', href: '/pesquisa', icon: '🔍' },
    { label: 'Estratégia', href: '/estrategia', icon: '🎯' },
    { label: 'Ideação', href: '/ideacao', icon: '💡' },
    { label: 'UI Design', href: '/ui-design', icon: '🎨' },
    { label: 'Protótipo', href: '/prototipo', icon: '🧪' },
    { label: 'Apresentação', href: '/apresentacao', icon: '📊' },
    { label: 'Entrega', href: '/entrega', icon: '📦' },
    { label: 'Programação', href: '/programacao', icon: '💻' },
  ];

  // Definir posição inicial após montagem do componente
  useEffect(() => {
    setIsClient(true);
    setPosition({ x: window.innerWidth - 250, y: 20 });

    const handleResize = () => {
      setPosition({ x: window.innerWidth - 250, y: 20 });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Funções de arrasto
  const handleMouseDown = (e: React.MouseEvent) => {
    if (dragHandleRef.current?.contains(e.target as Node)) {
      setDragging(true);
      setOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (dragging && offset) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  }, [dragging, offset]);

  const handleMouseUp = useCallback(() => {
    setDragging(false);
    setOffset(null);
  }, []);

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, handleMouseMove, handleMouseUp]);

  // Gerenciar clique fora do menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Navegar para página selecionada
  const navigateToPage = (href: string) => {
    window.location.href = href;
  };

  // Navegar para próxima página
  const goToNextPage = () => {
    const currentIndex = menuItems.findIndex(item => item.label === selectedPage);
    const nextIndex = (currentIndex + 1) % menuItems.length;
    const nextPage = menuItems[nextIndex];
    setSelectedPage(nextPage.label);
    navigateToPage(nextPage.href);
  };

  // Navegar para página anterior
  const goToPrevPage = () => {
    const currentIndex = menuItems.findIndex(item => item.label === selectedPage);
    const prevIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
    const prevPage = menuItems[prevIndex];
    setSelectedPage(prevPage.label);
    navigateToPage(prevPage.href);
  };

  // Não renderizar nada durante a renderização do servidor
  if (!isClient) {
    return null;
  }

  // Encontrar o item atual
  const currentPageItem = menuItems.find(item => item.label === selectedPage);

  return (
    <div
      ref={menuRef}
      className="fixed bg-white rounded-lg shadow-lg border border-gray-200 z-50 flex items-center p-2 space-x-2"
      style={{
        left: position.x,
        top: position.y,
        cursor: dragging ? 'grabbing' : 'default',
      }}
    >
      {/* Botão de arrasto */}
      <div
        ref={dragHandleRef}
        className="cursor-move p-2 rounded hover:bg-gray-100"
        onMouseDown={handleMouseDown}
        aria-label="Arrastar menu"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 8h3v3h-3zM13 8h3v3h-3zM8 13h3v3h-3zM13 13h3v3h-3z" fill="currentColor"/>
        </svg>
      </div>

      {/* Botão de seta para trás */}
      <button
        onClick={goToPrevPage}
        className="p-1 rounded hover:bg-gray-100"
        aria-label="Página anterior"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Dropdown com nome da página atual */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-2 py-1 rounded hover:bg-gray-100"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <span>{currentPageItem?.icon}</span>
          <span>{selectedPage}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
            <ul>
              {menuItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      setSelectedPage(item.label);
                      navigateToPage(item.href);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-blue-100 flex items-center space-x-2 ${
                      item.label === selectedPage ? 'bg-blue-100' : ''
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Botão de seta para frente */}
      <button
        onClick={goToNextPage}
        className="p-1 rounded hover:bg-gray-100"
        aria-label="Próxima página"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

export default SimpleFloatingMenu;