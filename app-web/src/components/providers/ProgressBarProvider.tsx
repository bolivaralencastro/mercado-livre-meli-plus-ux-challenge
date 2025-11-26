'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect, useRef, useState, useCallback, Suspense } from 'react';

// Componente interno que usa useSearchParams (precisa estar em Suspense)
function ProgressBarListener({ 
  onRouteChange 
}: { 
  onRouteChange: () => void 
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Ignora a primeira renderização
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Notifica que a rota mudou (navegação completa)
    onRouteChange();
  }, [pathname, searchParams, onRouteChange]);

  return null;
}

// Hook para interceptar cliques em links
function useLinkClickInterceptor(onNavigationStart: () => void) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      
      // Ignora links externos, âncoras, e links com target
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('http') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        anchor.target === '_blank' ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey
      ) {
        return;
      }

      // É uma navegação interna - inicia o loading
      onNavigationStart();
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [onNavigationStart]);
}

const ProgressBarProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);
  const startTimeoutRef = useRef<number | null>(null);

  const clearAllTimers = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (hideTimeoutRef.current !== null) {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    if (startTimeoutRef.current !== null) {
      window.clearTimeout(startTimeoutRef.current);
      startTimeoutRef.current = null;
    }
  }, []);

  const handleStart = useCallback(() => {
    clearAllTimers();

    // Pequeno delay antes de mostrar (evita flash em navegações rápidas)
    startTimeoutRef.current = window.setTimeout(() => {
      setIsVisible(true);
      setProgress(10);

      intervalRef.current = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          const increment = Math.max((100 - prev) * 0.1, 1);
          return Math.min(prev + increment, 90);
        });
      }, 100);
    }, 80);
  }, [clearAllTimers]);

  const handleComplete = useCallback(() => {
    clearAllTimers();
    
    // Completa a barra rapidamente
    setProgress(100);

    hideTimeoutRef.current = window.setTimeout(() => {
      setIsVisible(false);
      setProgress(0);
    }, 300);
  }, [clearAllTimers]);

  // Intercepta cliques em links para iniciar o loading
  useLinkClickInterceptor(handleStart);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearAllTimers();
  }, [clearAllTimers]);

  const scale = isVisible ? Math.max(progress, 5) / 100 : 0;

  return (
    <>
      {/* Progress Bar */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[10000] h-1"
      >
        <div
          className="h-full origin-left bg-gradient-to-r from-[#ffe600] to-[#fff176] shadow-[0_0_10px_rgba(255,230,0,0.5)] transition-[transform,opacity] duration-150 ease-out"
          style={{
            transform: `scaleX(${scale})`,
            opacity: isVisible ? 1 : 0,
          }}
        />
      </div>

      {/* Overlay sutil durante carregamento */}
      {isVisible && (
        <div 
          className="pointer-events-none fixed inset-0 z-[9999] bg-black/5 transition-opacity duration-200"
          aria-hidden="true"
        />
      )}

      {/* Listener para detectar quando a navegação completa */}
      <Suspense fallback={null}>
        <ProgressBarListener onRouteChange={handleComplete} />
      </Suspense>

      {children}
    </>
  );
};

export default ProgressBarProvider;
