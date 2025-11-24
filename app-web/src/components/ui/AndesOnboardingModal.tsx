"use client";

import { useState, useEffect } from "react";
import AndesButton from "./AndesButton";

export interface OnboardingSlide {
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
  isFinal?: boolean;
}

interface AndesOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: OnboardingSlide[];
  finalButtonText?: string;
  width?: string;
}

export default function AndesOnboardingModal({
  isOpen,
  onClose,
  slides,
  finalButtonText = "Entendi",
  width = "600px",
}: AndesOnboardingModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Reset slide quando abrir o modal
  useEffect(() => {
    if (isOpen) {
      setCurrentSlide(0);
    }
  }, [isOpen]);

  // Navegação por teclado
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      } else if (e.key === "ArrowRight" && currentSlide < slides.length - 1) {
        setCurrentSlide(currentSlide + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentSlide, slides.length, onClose]);

  if (!isOpen) return null;

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const currentSlideData = slides[currentSlide];
  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: width,
          background: "white",
          borderRadius: "8px",
          position: "relative",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#999",
            zIndex: 10,
            fontSize: "24px",
            lineHeight: 1,
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#666")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#999")}
        >
          ×
        </button>

        {/* Slide Atual */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            animation: "fadeSlide 0.3s ease",
          }}
        >
          {/* Imagem */}
          <div
            style={{
              width: "100%",
              height: "320px",
              backgroundColor: currentSlideData.isFinal ? "#ffe600" : "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderBottom: "1px solid #f5f5f5",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              overflow: "hidden",
            }}
          >
            {currentSlideData.isFinal ? (
              <div style={{ fontSize: "48px", fontWeight: 900, color: "#333" }}>
                Sucesso!
              </div>
            ) : (
              <img
                src={currentSlideData.imageUrl}
                alt={currentSlideData.imageAlt}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                }}
              />
            )}
          </div>

          {/* Conteúdo */}
          <div style={{ padding: "40px 60px", textAlign: "center" }}>
            <h3
              style={{
                fontSize: "24px",
                fontWeight: 600,
                marginBottom: "16px",
                color: "#333",
                lineHeight: 1.25,
              }}
            >
              {currentSlideData.title}
            </h3>
            <p
              style={{
                fontSize: "16px",
                color: "#666",
                lineHeight: 1.5,
                fontWeight: 400,
                marginBottom: isLastSlide ? "24px" : "0",
              }}
            >
              {currentSlideData.description}
            </p>

            {/* Botão final (apenas no último slide) */}
            {isLastSlide && (
              <AndesButton variant="primary" onClick={onClose}>
                {finalButtonText}
              </AndesButton>
            )}
          </div>
        </div>

        {/* Navegação - Seta Anterior */}
        {currentSlide > 0 && (
          <button
            onClick={handlePrev}
            style={{
              position: "absolute",
              left: "-28px",
              top: "55%",
              transform: "translateY(-50%)",
              width: "56px",
              height: "56px",
              background: "white",
              borderRadius: "50%",
              border: "none",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              color: "#3483fa",
              fontSize: "24px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-50%) scale(1.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(-50%) scale(1)")
            }
          >
            ‹
          </button>
        )}

        {/* Navegação - Seta Próximo */}
        {currentSlide < slides.length - 1 && (
          <button
            onClick={handleNext}
            style={{
              position: "absolute",
              right: "-28px",
              top: "55%",
              transform: "translateY(-50%)",
              width: "56px",
              height: "56px",
              background: "white",
              borderRadius: "50%",
              border: "none",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              color: "#3483fa",
              fontSize: "24px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-50%) scale(1.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(-50%) scale(1)")
            }
          >
            ›
          </button>
        )}

        {/* Paginação (Dots) */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            padding: "20px",
            paddingTop: "0",
          }}
        >
          {slides.map((_, index) => (
            <div
              key={index}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: index === currentSlide ? "#3483fa" : "#ddd",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translateX(10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

