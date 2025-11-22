'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface MenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface Position {
  x: number;
  y: number;
}

const DraggableFloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 }); // Valor inicial temporário
  const [isClient, setIsClient] = useState(false);

  // Definir posição inicial após montagem do componente
  useEffect(() => {
    setIsClient(true);
    setPosition({ x: window.innerWidth - 300, y: 100 });
  }, []);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState<{ x: number; y: number } | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const menuItems: MenuItem[] = [
    { label: 'Página Inicial', href: '/' },
    { label: 'Briefing', href: '/briefing' },
    { label: 'Pesquisa', href: '/pesquisa' },
    { label: 'Estratégia', href: '/estrategia' },
    { label: 'Ideação', href: '/ideacao' },
    { label: 'UI Design', href: '/ui-design' },
    { label: 'Protótipo', href: '/prototipo' },
    { label: 'Apresentação', href: '/apresentacao' },
    { label: 'Entrega', href: '/entrega' },
    { label: 'Programação', href: '/programacao' },
  ];

  const totalPages = Math.ceil(menuItems.length / 5); // 5 itens por página

  // Gerenciar eventos de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'm') {
        setIsOpen(prev => !prev);
      }
      
      if (isOpen) {
        if (e.key === 'ArrowLeft' && currentPage > 0) {
          setCurrentPage(prev => prev - 1);
        } else if (e.key === 'ArrowRight' && currentPage < totalPages - 1) {
          setCurrentPage(prev => prev + 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentPage, totalPages]);

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

  // Funções de arrasto
  const handleMouseDown = (e: React.MouseEvent) => {
    if (headerRef.current && headerRef.current.contains(e.target as Node)) {
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

  // Obter itens da página atual
  const currentPageItems = menuItems.slice(currentPage * 5, (currentPage + 1) * 5);

  // Não renderizar nada durante a renderização do servidor
  if (!isClient) {
    return null;
  }

  return (
    <>
      {/* Botão flutuante para abrir o menu */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg z-50 hover:bg-blue-600 transition-colors"
        style={{ left: position.x, top: position.y }}
        aria-label="Abrir menu flutuante"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6H20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4 12H20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4 18H20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Menu flutuante arrastável */}
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50 w-64 max-h-80 flex flex-col"
          style={{
            left: position.x,
            top: position.y + 60,
            transform: 'translateY(10px)',
            transition: 'transform 0.2s ease-out'
          }}
        >
          {/* Cabeçalho arrastável */}
          <div
            ref={headerRef}
            className="bg-gray-100 px-4 py-2 cursor-move flex justify-between items-center"
            onMouseDown={handleMouseDown}
          >
            <span className="font-medium text-gray-700">Menu de Navegação</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Fechar menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Conteúdo do menu */}
          <div className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-1">
              {currentPageItems.map((item, index) => (
                <li key={index}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded hover:text-blue-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <button
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded hover:text-blue-600 transition-colors"
                      onClick={() => {
                        if (item.onClick) item.onClick();
                        setIsOpen(false);
                      }}
                    >
                      {item.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>

            {/* Navegação por páginas */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                  disabled={currentPage === 0}
                  className={`p-2 rounded ${currentPage === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'}`}
                  aria-label="Página anterior"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <span className="text-sm text-gray-600">
                  {currentPage + 1} / {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                  disabled={currentPage === totalPages - 1}
                  className={`p-2 rounded ${currentPage === totalPages - 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'}`}
                  aria-label="Próxima página"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Dicas de teclado */}
          <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500 border-t border-gray-200">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Pressione 'M' para fechar | Setas para navegar
          </div>
        </div>
      )}
    </>
  );
};

export default DraggableFloatingMenu;