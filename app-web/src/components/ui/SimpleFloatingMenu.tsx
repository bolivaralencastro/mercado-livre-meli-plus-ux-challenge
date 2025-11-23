"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

interface MenuItem {
  label: string;
  href: string;
  number: number;
}

interface SecondaryItem {
  label: string;
  href: string;
}

interface Position {
  x: number;
  y: number;
}

const MENU_STORAGE_KEY = "floatingMenuPosition";
const DEFAULT_MENU_WIDTH = 320;
const DEFAULT_MENU_HEIGHT = 64;
const VERTICAL_MARGIN = 16;
const BOTTOM_OFFSET = 32;
const KEYBOARD_ITEMS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"] as const;

type DropdownDirection = "up" | "down";

const SimpleFloatingMenu = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState<{ x: number; y: number } | null>(null);
  const [selectedPage, setSelectedPage] = useState("Home");
  const [menuWidth, setMenuWidth] = useState(DEFAULT_MENU_WIDTH);
  const [menuHeight, setMenuHeight] = useState(DEFAULT_MENU_HEIGHT);
  const [isClient, setIsClient] = useState(false);
  const [dropdownDirection, setDropdownDirection] = useState<DropdownDirection>("up");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const menuRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const menuItems = useMemo<MenuItem[]>(() => (
    [
      { label: "Home", href: "/", number: 1 },
      { label: "Programação", href: "/programacao", number: 2 },
      { label: "Briefing", href: "/briefing", number: 3 },
      { label: "Pesquisa", href: "/pesquisa", number: 4 },
      { label: "Estratégia", href: "/estrategia", number: 5 },
      { label: "Ideação", href: "/ideacao", number: 6 },
      { label: "UI Design", href: "/ui-design", number: 7 },
      { label: "Protótipo", href: "/prototipo", number: 8 },
      { label: "Apresentação", href: "/apresentacao", number: 9 },
      { label: "Entrega", href: "/entrega", number: 10 },
    ]
  ), []);

  const pesquisaSecondaryMenu = useMemo<SecondaryItem[]>(() => ([
    { label: "Visão geral", href: "/pesquisa" },
    { label: "Cases", href: "/pesquisa/cases" },
  ]), []);

  const isPesquisaSection = useMemo(() => pathname?.startsWith("/pesquisa") ?? false, [pathname]);

  const formatLabel = useCallback((item: MenuItem | undefined) => {
    if (!item) return "";
    return `${item.number}. ${item.label}`;
  }, []);

  const clampPosition = useCallback((nextPosition: Position): Position => {
    if (!isClient) {
      return nextPosition;
    }

    const maxX = Math.max(window.innerWidth - menuWidth, VERTICAL_MARGIN);
    const maxY = Math.max(window.innerHeight - menuHeight, VERTICAL_MARGIN);

    return {
      x: Math.min(Math.max(VERTICAL_MARGIN, nextPosition.x), maxX),
      y: Math.min(Math.max(VERTICAL_MARGIN, nextPosition.y), maxY),
    };
  }, [isClient, menuHeight, menuWidth]);

  const computeInitialPosition = useCallback((): Position => {
    const storedPosition = localStorage.getItem(MENU_STORAGE_KEY);

    if (storedPosition) {
      try {
        const parsed = JSON.parse(storedPosition) as Position;
        return clampPosition(parsed);
      } catch (error) {
        console.error("Erro ao ler posição do menu:", error);
      }
    }

    const centeredX = Math.max((window.innerWidth - menuWidth) / 2, VERTICAL_MARGIN);
    const verticalOffset = Math.max(window.innerHeight - menuHeight - BOTTOM_OFFSET, VERTICAL_MARGIN);

    return { x: centeredX, y: verticalOffset };
  }, [clampPosition, menuHeight, menuWidth]);

  useEffect(() => {
    setIsClient(true);
    setPosition(computeInitialPosition());

    const handleResize = () => {
      setPosition((prev) => clampPosition(prev));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [clampPosition, computeInitialPosition]);

  useEffect(() => {
    if (menuRef.current) {
      const measuredBox = menuRef.current.getBoundingClientRect();
      setMenuWidth(measuredBox.width || DEFAULT_MENU_WIDTH);
      setMenuHeight(measuredBox.height || DEFAULT_MENU_HEIGHT);
    }
  }, [isClient, selectedPage, isDropdownOpen, isPesquisaSection]);

  useEffect(() => {
    setPosition((prev) => clampPosition(prev));
  }, [clampPosition]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(position));
    }
  }, [isClient, position]);

  const handleMouseDown = (event: React.MouseEvent) => {
    if (dragHandleRef.current?.contains(event.target as Node)) {
      setDragging(true);
      setOffset({
        x: event.clientX - position.x,
        y: event.clientY - position.y,
      });
    }
  };

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (dragging && offset) {
      setPosition(clampPosition({
        x: event.clientX - offset.x,
        y: event.clientY - offset.y,
      }));
    }
  }, [clampPosition, dragging, offset]);

  const handleMouseUp = useCallback(() => {
    if (dragging) {
      setDragging(false);
      setOffset(null);
    }
  }, [dragging]);

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, handleMouseMove, handleMouseUp]);

  const updateDropdownDirection = useCallback(() => {
    if (!isClient || !menuRef.current || !dropdownRef.current) {
      return;
    }

    const barRect = menuRef.current.getBoundingClientRect();
    const dropdownRect = dropdownRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - barRect.bottom;
    const spaceAbove = barRect.top;

    const shouldOpenUp = spaceBelow < dropdownRect.height + VERTICAL_MARGIN && spaceAbove > spaceBelow;
    setDropdownDirection(shouldOpenUp ? "up" : "down");
  }, [isClient]);

  useEffect(() => {
    updateDropdownDirection();
  }, [position, updateDropdownDirection]);

  useEffect(() => {
    window.addEventListener("resize", updateDropdownDirection);
    return () => window.removeEventListener("resize", updateDropdownDirection);
  }, [updateDropdownDirection]);

  useEffect(() => {
    const currentPage = menuItems.find((item) => pathname === item.href);

    if (currentPage) {
      setSelectedPage(currentPage.label);
    }
    setIsDropdownOpen(false);
  }, [menuItems, pathname]);

  const navigateToPage = useCallback((href: string) => {
    router.push(href);
  }, [router]);

  const goToNextPage = useCallback(() => {
    const currentIndex = menuItems.findIndex((item) => item.label === selectedPage);
    const safeIndex = currentIndex === -1 ? 0 : currentIndex;
    const nextIndex = (safeIndex + 1) % menuItems.length;
    const nextPage = menuItems[nextIndex];
    setSelectedPage(nextPage.label);
    navigateToPage(nextPage.href);
  }, [menuItems, navigateToPage, selectedPage]);

  const goToPrevPage = useCallback(() => {
    const currentIndex = menuItems.findIndex((item) => item.label === selectedPage);
    const safeIndex = currentIndex === -1 ? 0 : currentIndex;
    const prevIndex = (safeIndex - 1 + menuItems.length) % menuItems.length;
    const prevPage = menuItems[prevIndex];
    setSelectedPage(prevPage.label);
    navigateToPage(prevPage.href);
  }, [menuItems, navigateToPage, selectedPage]);

  useEffect(() => {
    const handleNumberNavigation = (event: KeyboardEvent) => {
      const pressedKey = event.key as (typeof KEYBOARD_ITEMS)[number];
      if (!KEYBOARD_ITEMS.includes(pressedKey)) {
        return;
      }

      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }

      const itemIndex = KEYBOARD_ITEMS.indexOf(pressedKey);
      const targetItem = menuItems[itemIndex];
      if (targetItem) {
        setSelectedPage(targetItem.label);
        navigateToPage(targetItem.href);
      }
    };

    window.addEventListener("keydown", handleNumberNavigation);
    return () => window.removeEventListener("keydown", handleNumberNavigation);
  }, [menuItems, navigateToPage]);

  useEffect(() => {
    if (!isDropdownOpen) {
      return undefined;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isDropdownOpen]);

  const isActivePesquisaItem = (href: string): boolean => {
    if (!pathname) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  if (!isClient) {
    return null;
  }

  const currentPageItem = menuItems.find((item) => item.label === selectedPage);
  const dropdownPositionClass = dropdownDirection === "down" ? "top-full mt-2" : "bottom-full mb-2";

  return (
    <div
      ref={menuRef}
      className="fixed z-50 flex w-fit flex-col gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg"
      style={{
        left: position.x,
        top: position.y,
        cursor: dragging ? "grabbing" : "default",
      }}
    >
      <div className="flex items-center gap-2">
        <div
          ref={dragHandleRef}
          className="cursor-move rounded p-2 hover:bg-gray-100"
          onMouseDown={handleMouseDown}
          aria-label="Arrastar menu"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 8h3v3h-3zM13 8h3v3h-3zM8 13h3v3h-3zM13 13h3v3h-3z" fill="currentColor" />
          </svg>
        </div>

        <div className="h-10 w-px self-stretch bg-gray-200" aria-hidden="true" />

        <div className="flex items-center gap-1">
          <button
            onClick={goToPrevPage}
            className="rounded p-1 hover:bg-gray-100"
            aria-label="Página anterior"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={goToNextPage}
            className="rounded p-1 hover:bg-gray-100"
            aria-label="Próxima página"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="h-10 w-px self-stretch bg-gray-200" aria-hidden="true" />

        <div className="relative w-[112px]">
          <button
            type="button"
            onClick={() => {
              updateDropdownDirection();
              setIsDropdownOpen((prev) => !prev);
            }}
            className="flex w-full items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-left"
            aria-expanded={isDropdownOpen}
            aria-controls="floating-menu-dropdown"
          >
            <span className="font-medium text-gray-900">{formatLabel(currentPageItem)}</span>
            <span className="text-xs text-gray-500">⌄</span>
          </button>
          <div
            id="floating-menu-dropdown"
            ref={dropdownRef}
            className={`absolute ${dropdownPositionClass} w-full rounded-md border border-gray-200 bg-white shadow-lg max-h-64 overflow-y-auto transition transform ${
              isDropdownOpen ? "visible opacity-100 translate-y-0 pointer-events-auto" : "invisible opacity-0 translate-y-1 pointer-events-none"
            }`}
            aria-hidden={!isDropdownOpen}
          >
            <ul className="divide-y divide-gray-100">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => {
                      setSelectedPage(item.label);
                      navigateToPage(item.href);
                      setIsDropdownOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm hover:bg-blue-50 ${
                      item.label === selectedPage ? "bg-blue-100 font-semibold" : ""
                    }`}
                    aria-label={`Ir para ${formatLabel(item)}`}
                  >
                    <span className="text-gray-700">{item.number}</span>
                    <span className="text-gray-900">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {isPesquisaSection && (
        <div className="w-full rounded-md border border-blue-100 bg-blue-50 px-3 py-2 shadow-inner">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-blue-800">Pesquisa</div>
            <div className="flex flex-wrap items-center gap-2">
              {pesquisaSecondaryMenu.map((item) => (
                <button
                  key={item.href}
                  onClick={() => navigateToPage(item.href)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    isActivePesquisaItem(item.href)
                      ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                      : "border-blue-200 bg-white text-blue-800 hover:border-blue-400"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleFloatingMenu;
