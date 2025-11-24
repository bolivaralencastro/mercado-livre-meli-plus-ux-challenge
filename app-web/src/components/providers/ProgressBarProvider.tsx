'use client';

import Router from 'next/router';
import { ReactNode, useEffect, useRef, useState } from 'react';

const ProgressBarProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);
  const startTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const clearIntervalRef = () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const clearHideTimeout = () => {
      if (hideTimeoutRef.current !== null) {
        window.clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    };

    const clearDelayedStart = () => {
      if (startTimeoutRef.current !== null) {
        window.clearTimeout(startTimeoutRef.current);
        startTimeoutRef.current = null;
      }
    };

    const handleStart = () => {
      clearHideTimeout();
      clearIntervalRef();
      clearDelayedStart();

      startTimeoutRef.current = window.setTimeout(() => {
        setIsVisible(true);
        setProgress(10);

        intervalRef.current = window.setInterval(() => {
          setProgress((prev) => {
            if (prev >= 90) {
              return prev;
            }
            const increment = Math.max((100 - prev) * 0.12, 1.5);
            return Math.min(prev + increment, 90);
          });
        }, 160);
      }, 120);
    };

    const handleStop = () => {
      clearDelayedStart();
      clearIntervalRef();
      setProgress(100);

      hideTimeoutRef.current = window.setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
        clearHideTimeout();
      }, 220);
    };

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleStop);
    Router.events.on('routeChangeError', handleStop);

    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleStop);
      Router.events.off('routeChangeError', handleStop);
      clearDelayedStart();
      clearIntervalRef();
      clearHideTimeout();
    };
  }, []);

  const scale = isVisible ? Math.max(progress, 5) / 100 : 0;

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[10000] h-1"
      >
        <div
          className="h-full origin-left rounded-full bg-[#ffe600] shadow-[0_0_8px_rgba(0,0,0,0.22)] transition-[transform,opacity] duration-200 ease-out"
          style={{
            transform: `scaleX(${scale})`,
            opacity: isVisible ? 1 : 0,
          }}
        />
      </div>
      {children}
    </>
  );
};

export default ProgressBarProvider;
