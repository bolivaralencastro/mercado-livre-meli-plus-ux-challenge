"use client";

import React, { useEffect } from "react";

interface AndesModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const AndesModal: React.FC<AndesModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close only if the overlay itself is clicked, not its children
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="andes-modal-overlay"
      onClick={handleOverlayClick}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      style={{ display: "flex" }} // Override display: none
    >
      <div className="andes-modal" role="document">
        {children}
      </div>
    </div>
  );
};

export default AndesModal;
