"use client";

import React from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  children?: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  children,
  onConfirm,
  onCancel,
  confirmText = 'Sim',
  cancelText = 'Cancelar'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-[320px] rounded-lg p-6 text-center shadow-lg animate-fade-in">
        <h3 className="text-lg font-medium mb-2 text-[#333333]">{title}</h3>
        {children && <div className="text-gray-600 text-base mb-6">{children}</div>}
        
        <button
          onClick={onConfirm}
          className="w-full bg-[#3483fa] text-white font-bold py-3 rounded-md text-base mb-3 hover:bg-blue-600 transition-colors"
        >
          {confirmText}
        </button>
        
        <button
          onClick={onCancel}
          className="w-full bg-transparent text-[#3483fa] font-medium text-base hover:bg-gray-50 py-2 transition-colors"
        >
          {cancelText}
        </button>
      </div>
    </div>
  );
};
