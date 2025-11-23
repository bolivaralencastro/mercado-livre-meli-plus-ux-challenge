'use client';

import React, { useState, useEffect } from "react";

interface AndesFlashOfferTagProps {
  endTime: Date;
  className?: string;
}

interface TimeRemaining {
  hours: number;
  minutes: number;
  seconds: number;
}

const AndesFlashOfferTag: React.FC<AndesFlashOfferTagProps> = ({
  endTime,
  className,
}) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const end = endTime.getTime();
      const distance = end - now;

      if (distance > 0) {
        setTimeRemaining({
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeRemaining({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  const baseClass = "highlight-countdown";
  const combinedClassName = [baseClass, className].filter(Boolean).join(" ");

  return (
    <div className={combinedClassName} role="timer" aria-label="Oferta termina em breve">
      <span className="highlight-countdown__text">OFERTA RELÂMPAGO</span>
      
      <div className="highlight-countdown__timer">
        {/* Horas */}
        <div className="timer-block">
          <div className="timer-digits">
            <span className="digit">{formatNumber(timeRemaining.hours)}</span>
          </div>
        </div>
        
        <span className="timer-separator">:</span>
        
        {/* Minutos */}
        <div className="timer-block">
          <div className="timer-digits">
            <span className="digit">{formatNumber(timeRemaining.minutes)}</span>
          </div>
        </div>
        
        <span className="timer-separator">:</span>
        
        {/* Segundos */}
        <div className="timer-block">
          <div className="timer-digits">
            <span className="digit">{formatNumber(timeRemaining.seconds)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AndesFlashOfferTag;
