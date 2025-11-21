"use client";

import React, { useRef } from "react";

interface AndesCarouselProps {
  children: React.ReactNode;
  className?: string;
}

const AndesCarousel: React.FC<AndesCarouselProps> = ({
  children,
  className,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (trackRef.current) {
      const scrollAmount = 260; // Based on .grid-card width + gap
      const newScrollLeft =
        trackRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      trackRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className={`carousel-wrapper ${className || ""}`}>
      <button className="carousel-btn c-prev" onClick={() => handleScroll("left")}>
        ‹
      </button>
      <div className="carousel-track" ref={trackRef}>
        {children}
      </div>
      <button className="carousel-btn c-next" onClick={() => handleScroll("right")}>
        ›
      </button>
    </div>
  );
};

export default AndesCarousel;
