'use client';

import React, { useRef, useState, useEffect } from "react";

interface CarouselItem {
  id: string;
  label: string;
  image?: string;
  icon?: React.ReactNode;
}

interface AndesOffersCarouselProps {
  title: string;
  subtitle?: string;
  items: CarouselItem[];
  selectedId?: string;
  onItemClick?: (itemId: string) => void;
  className?: string;
}

const AndesOffersCarousel: React.FC<AndesOffersCarouselProps> = ({
  title,
  subtitle,
  items,
  selectedId,
  onItemClick,
  className,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);

  const updateScrollButtons = () => {
    if (trackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
      setShowPrev(scrollLeft > 0);
      setShowNext(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    updateScrollButtons();
  }, [items]);

  const scroll = (direction: 'prev' | 'next') => {
    if (trackRef.current) {
      const scrollAmount = direction === 'prev' ? -300 : 300;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(updateScrollButtons, 300);
    }
  };

  const handleItemClick = (itemId: string) => {
    if (onItemClick) {
      onItemClick(itemId);
    }
  };

  const baseClass = "selectors-container";
  const combinedClassName = [baseClass, className].filter(Boolean).join(" ");

  return (
    <div className={combinedClassName}>
      <div className="selectors-header">
        <h2 className="selectors-header__title">{title}</h2>
        {subtitle && (
          <span className="selectors-header__subtitle">{subtitle}</span>
        )}
      </div>

      <div className="selectors-carousel-wrapper">
        {showPrev && (
          <button
            className="carousel-control carousel-control--prev"
            onClick={() => scroll('prev')}
            aria-label="Anterior"
          >
            <svg viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
        )}

        <div
          ref={trackRef}
          className="carousel-track"
          onScroll={updateScrollButtons}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className={`carousel-item ${
                selectedId === item.id ? 'carousel-item--selected' : ''
              }`}
              onClick={() => handleItemClick(item.id)}
            >
              {item.image ? (
                <div className="carousel-item__image">
                  <img src={item.image} alt={item.label} />
                </div>
              ) : item.icon ? (
                <div className="carousel-item__icon">{item.icon}</div>
              ) : null}
              <span className="carousel-item__label">{item.label}</span>
            </div>
          ))}
        </div>

        {showNext && (
          <button
            className="carousel-control carousel-control--next"
            onClick={() => scroll('next')}
            aria-label="Próximo"
          >
            <svg viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default AndesOffersCarousel;
