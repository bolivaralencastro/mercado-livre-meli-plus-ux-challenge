"use client";

import React from 'react';
import { ArrowLeft, Plus, XCircle, Barcode, QrCode } from 'lucide-react';
import { PaymentMethod } from '../types';

interface MethodInfoProps {
  method: PaymentMethod;
  onBack: () => void;
  onAddBalance: () => void;
  onRemove: () => void;
}

export const MethodInfo: React.FC<MethodInfoProps> = ({ method, onBack, onAddBalance, onRemove }) => {
  
  const getIcon = () => {
      if (method.type === 'boleto') return <Barcode size={48} className="text-[#333333]" />;
      if (method.type === 'pix') return <QrCode size={48} className="text-[#32BCAD]" />;
      return null;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f5] animate-slide-in-right font-sans">
      {/* Header */}
      <div className="bg-[#f5f5f5] px-4 h-14 flex items-center sticky top-0 z-20 text-[#333333]">
        <button onClick={onBack} className="p-1 -ml-2 hover:bg-black/5 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="px-6 pt-4 pb-8 flex-1 flex flex-col">
        
        <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold text-[#333333]">{method.title}</h1>
            <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100">
                {getIcon()}
            </div>
        </div>

        <h2 className="text-lg font-semibold text-[#333333] mb-2 leading-tight">
            Use {method.title} como forma de pagamento.
        </h2>
        <p className="text-gray-500 text-sm mb-10 leading-relaxed">
            Você agora pode usar {method.title} para recarregar seu saldo do Mercado Pago e manter suas assinaturas ativas.
        </p>

        <div className="space-y-6">
            <button 
                onClick={onAddBalance}
                className="w-full flex items-center gap-4 group"
            >
                <div className="w-6 h-6 flex items-center justify-center">
                    <Plus size={24} className="text-[#333333]" />
                </div>
                <span className="text-base font-medium text-[#333333] group-hover:underline">Adicionar saldo</span>
            </button>

            <button 
                onClick={onRemove}
                className="w-full flex items-center gap-4 group"
            >
                <div className="w-6 h-6 flex items-center justify-center">
                    <XCircle size={20} className="text-red-600" />
                </div>
                <span className="text-base font-medium text-red-600 group-hover:underline">Remover forma de pagamento</span>
            </button>
        </div>

        <div className="mt-auto pt-10">
            <p className="text-xs text-gray-400 leading-relaxed">
                Ao usar essa forma de pagamento, seus dados serão processados de acordo com nossos Termos de Serviço e Política de Privacidade para garantir a segurança da transação.
            </p>
        </div>

      </div>
    </div>
  );
};
