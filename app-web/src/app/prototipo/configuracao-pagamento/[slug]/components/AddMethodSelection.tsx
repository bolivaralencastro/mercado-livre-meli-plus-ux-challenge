"use client";

import React from 'react';
import { ArrowLeft, CreditCard, Plus, ChevronRight } from 'lucide-react';
import { PaymentMethod } from '../types';

interface AddMethodSelectionProps {
  onBack: () => void;
  availableMethods: PaymentMethod[];
  onSelectMethod: (method: PaymentMethod) => void;
  onAddNewCard: () => void;
}

export const AddMethodSelection: React.FC<AddMethodSelectionProps> = ({ 
  onBack, 
  availableMethods, 
  onSelectMethod, 
  onAddNewCard 
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f5] animate-slide-in-right font-sans">
      {/* Header */}
      <div className="bg-[#f5f5f5] px-4 h-14 flex items-center justify-between sticky top-0 z-20 text-[#333333]">
        <button onClick={onBack} className="p-1 -ml-2 hover:bg-black/5 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-medium">Adicionar forma de pagamento</h1>
        <div className="w-6"></div>
      </div>

      <div className="px-4 pb-8 flex-1 pt-2">
        <h2 className="text-sm font-bold text-gray-500 uppercase mb-4 pl-2">Opções disponíveis</h2>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            
            {/* Generic Add Card Option */}
            <div 
                onClick={onAddNewCard}
                className="flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors group"
            >
                 <div className="w-12 h-8 rounded border border-gray-200 flex items-center justify-center bg-gray-50 flex-shrink-0 mr-4 text-[#333333]">
                    <Plus size={18} />
                 </div>
                 <div className="flex-1">
                    <div className="text-sm font-medium text-[#333333]">Cartão de crédito ou débito</div>
                    <div className="text-xs text-gray-500">Novo cartão</div>
                 </div>
                 <ChevronRight size={20} className="text-gray-300 group-hover:text-gray-500" />
            </div>

            {/* List of Recoverable/Available Methods */}
            {availableMethods.map((method, index) => (
                <div 
                    key={method.id}
                    onClick={() => onSelectMethod(method)}
                    className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors group ${
                        index !== availableMethods.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                >
                     <div className="w-12 h-8 rounded border border-gray-200 flex items-center justify-center bg-white flex-shrink-0 mr-4 shadow-sm">
                        {/* Simple Icon Logic matching PaymentManagement */}
                        {method.type === 'pix' && <span className="text-[10px] font-bold text-[#32BCAD]">PIX</span>}
                        {method.type === 'pix_recurring' && <span className="text-[10px] font-bold text-[#32BCAD]">PIX R</span>}
                        {method.type === 'boleto' && <span className="text-[10px] font-bold text-gray-600">BOL</span>}
                        {method.type === 'paypal' && <span className="text-[10px] font-bold text-[#003087] italic">Pay</span>}
                        {method.type === 'ticket' && <span className="text-[10px] font-bold text-red-600">TICKET</span>}
                        {(method.type === 'mastercard' || method.type === 'visa' || method.type === 'debit_account') && (
                            <CreditCard size={16} className="text-gray-400" />
                        )}
                     </div>
                     <div className="flex-1">
                        <div className="text-sm font-medium text-[#333333]">{method.title}</div>
                        {method.subtitle && <div className="text-xs text-gray-500">{method.subtitle}</div>}
                     </div>
                     <ChevronRight size={20} className="text-gray-300 group-hover:text-gray-500" />
                </div>
            ))}
        </div>
        
        {availableMethods.length === 0 && (
            <p className="text-xs text-gray-400 mt-4 px-2 text-center">
                Não há formas de pagamento antigas para restaurar.
            </p>
        )}

      </div>
    </div>
  );
};
