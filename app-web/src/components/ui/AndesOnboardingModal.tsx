"use client";

import React, { useState, useEffect } from "react";
import AndesButton from "./AndesButton";

interface OnboardingSlideData {
  imageUrl: string;
  title: string;
  text: string;
  isFinal?: boolean;
  finalButtonText?: string;
}

interface AndesOnboardingModalProps {
  slides: OnboardingSlideData[];
  isOpen: boolean;
  onClose: () => void;
}

const AndesOnboardingModal: React.FC<AndesOnboardingModalProps> = ({
  slides,
  isOpen,
  onClose,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Reset to first slide when modal is opened
    if (isOpen) {
      setCurrentSlide(0);
    }
  }, [isOpen]);

  const changeSlide = (direction: number) => {
    const newSlideIndex = currentSlide + direction;
    if (newSlideIndex >= 0 && newSlideIndex < slides.length) {
      setCurrentSlide(newSlideIndex);
    }
  };

  const handleEsc = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  const totalSlides = slides.length;
  const activeSlide = slides[currentSlide];

  return (
    <div
      className="andes-modal-overlay"
      style={{ display: "flex" }}
      // Clicking overlay does not close this specific modal type in the example
    >
      <div className="ob-modal-container">
        <button className="ob-close" onClick={onClose}>
          ×
        </button>

        <div className="ob-slides-wrapper">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`ob-slide ${index === currentSlide ? "active" : ""}`}
              data-index={index}
            >
              <div className="ob-image-box">
                <img src={slide.imageUrl} alt={slide.title} />
              </div>
              <div className="ob-content-box">
                <h3 className="ob-title">{slide.title}</h3>
                <p className="ob-text">{slide.text}</p>
                {slide.isFinal && (
                  <AndesButton
                    variant="primary"
                    className="ob-btn-final"
                    onClick={onClose}
                  >
                    {slide.finalButtonText || "Entendi"}
                  </AndesButton>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          className="ob-nav-btn ob-prev"
          onClick={() => changeSlide(-1)}
          disabled={currentSlide === 0}
          style={{ opacity: currentSlide === 0 ? 0 : 1 }}
        >
          ‹
        </button>
        <button
          className="ob-nav-btn ob-next"
          onClick={() => changeSlide(1)}
          disabled={currentSlide === totalSlides - 1}
          style={{ opacity: currentSlide === totalSlides - 1 ? 0 : 1 }}
        >
          ›
        </button>

        {/* Pagination */}
        <div className="ob-pagination">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`ob-dot ${index === currentSlide ? "active" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AndesOnboardingModal;
