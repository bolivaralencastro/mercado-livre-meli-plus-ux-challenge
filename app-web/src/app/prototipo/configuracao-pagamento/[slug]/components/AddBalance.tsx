"use client";

import React, { useState } from 'react';
import { X, ArrowLeft, Plus, Repeat, Gift, ChevronRight } from 'lucide-react';
import { PaymentMethod } from '../types';

interface AddBalanceProps {
  onClose: () => void;
  method: PaymentMethod;
}

export const AddBalance: React.FC<AddBalanceProps> = ({ onClose, method }) => {
  const [view, setView] = useState<'MENU' | 'AMOUNT'>('MENU');
  const [amount, setAmount] = useState<string>('');
  
  const handlePreset = (value: string) => {
      setAmount(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Simple currency mask logic
      const val = e.target.value.replace(/\D/g, '');
      if (val) {
        const num = parseInt(val) / 100;
        setAmount(num.toLocaleString('pt-BR', { minimumFractionDigits: 2 }));
      } else {
        setAmount('');
      }
  };

  if (view === 'MENU') {
      return (
        <div className="flex flex-col min-h-screen bg-[#f5f5f5] animate-slide-up font-sans">
            <div className="bg-[#f5f5f5] px-4 h-14 flex items-center justify-between sticky top-0 z-20 text-[#333333]">
                 <div className="w-6"></div> {/* Spacer */}
                 <button onClick={onClose} className="p-1 -mr-2 hover:bg-black/5 rounded-full transition-colors">
                    <X size={24} />
                 </button>
            </div>

            <div className="px-4 pb-8 flex-1 flex flex-col pt-2">
                <h1 className="text-2xl font-bold text-[#333333] mb-6 px-2">Adicionar saldo</h1>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div 
                        onClick={() => setView('AMOUNT')}
                        className="flex items-center p-5 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors group"
                    >
                         <div className="mr-4 text-[#333333]">
                            <Plus size={24} />
                         </div>
                         <div className="flex-1 text-base font-medium text-[#333333]">Compra única</div>
                         <ChevronRight size={20} className="text-gray-300 group-hover:text-gray-500" />
                    </div>

                     <div className="flex items-center p-5 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors group">
                         <div className="mr-4 text-[#333333]">
                            <Repeat size={24} />
                         </div>
                         <div className="flex-1 text-base font-medium text-[#333333]">Recarga automática</div>
                         <ChevronRight size={20} className="text-gray-300 group-hover:text-gray-500" />
                    </div>

                     <div className="flex items-center p-5 hover:bg-gray-50 cursor-pointer transition-colors group">
                         <div className="mr-4 text-[#333333]">
                            <Gift size={24} />
                         </div>
                         <div className="flex-1 text-base font-medium text-[#333333]">Gift Card</div>
                         <ChevronRight size={20} className="text-gray-300 group-hover:text-gray-500" />
                    </div>
                </div>
            </div>
        </div>
      );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f5] animate-slide-in-right font-sans">
      {/* Header */}
      <div className="bg-[#f5f5f5] px-4 h-14 flex items-center justify-between sticky top-0 z-20 text-[#333333]">
        <button onClick={() => setView('MENU')} className="p-1 -ml-2 hover:bg-black/5 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <button onClick={onClose} className="p-1 -mr-2 hover:bg-black/5 rounded-full transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="px-6 pt-2 pb-8 flex-1 flex flex-col">
        
        <h1 className="text-2xl font-bold text-[#333333] mb-6">Compra única</h1>
        
        <p className="text-base text-gray-600 mb-8 font-medium">
            Quanto você quer adicionar ao seu saldo do Mercado Pago usando {method.title}?
        </p>

        <div className="bg-white rounded-lg px-4 py-3 border border-gray-200 mb-2 shadow-sm focus-within:border-[#3483fa] focus-within:ring-2 focus-within:ring-blue-50 transition-all">
            <div className="flex items-center">
                <span className="text-gray-400 font-medium mr-2">R$</span>
                <input 
                    type="text"
                    value={amount}
                    onChange={handleChange}
                    placeholder="0,00"
                    className="w-full text-lg font-medium text-[#333333] outline-none placeholder-gray-300"
                    autoFocus
                />
            </div>
        </div>
        <p className="text-xs text-gray-500 mb-6 pl-1">Digite um valor entre R$ 50,00 e R$ 2.000,00</p>

        <div className="flex gap-3 mb-8">
            {['50,00', '100,00', '200,00'].map((val) => (
                <button
                    key={val}
                    onClick={() => handlePreset(val)}
                    className="px-4 py-2 rounded-full border border-gray-300 text-sm font-medium text-[#333333] hover:bg-gray-100 hover:border-gray-400 transition-colors"
                >
                    R$ {val}
                </button>
            ))}
        </div>

        <button className="text-xs text-[#3483fa] font-medium hover:underline mb-auto self-start">
            Promoção sujeita a termos e condições.
        </button>

        {/* Footer */}
        <div className="mt-6 flex items-center gap-3 border-t border-gray-200 pt-6">
             <div className="w-8 h-8 rounded border border-gray-200 bg-white flex items-center justify-center shrink-0 shadow-sm">
                  {method.type === 'pix' && <div className="text-[10px] font-bold text-[#32BCAD]">PIX</div>}
                  {method.type === 'boleto' && <div className="text-[10px] font-bold text-gray-600">BOL</div>}
                  {!['pix', 'boleto'].includes(method.type) && <div className="w-4 h-2 bg-gray-400 rounded-sm"></div>}
             </div>
             <div className="flex-1 text-sm font-medium text-[#333333]">
                 {method.title}
             </div>
        </div>

        <button 
            disabled={!amount}
            onClick={onClose}
            className={`w-full mt-6 py-3.5 rounded-lg font-bold text-white text-base transition-all ${
                amount ? 'bg-[#3483fa] hover:bg-blue-600 shadow-sm' : 'bg-gray-300 cursor-not-allowed'
            }`}
        >
            Adicionar saldo
        </button>

      </div>
    </div>
  );
};
