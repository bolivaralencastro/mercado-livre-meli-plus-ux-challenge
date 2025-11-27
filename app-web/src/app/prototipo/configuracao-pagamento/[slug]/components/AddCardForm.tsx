"use client";

import React, { useState, useMemo } from 'react';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react';
import { PaymentMethod } from '../types';

interface AddCardFormProps {
  onBack: () => void;
  onSave: (cardData: PaymentMethod) => void;
}

export const AddCardForm: React.FC<AddCardFormProps> = ({ onBack, onSave }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cpf, setCpf] = useState('');
  const [focusedField, setFocusedField] = useState<string>('');

  // Detect Card Type logic
  const cardType = useMemo(() => {
    const cleanNum = cardNumber.replace(/\D/g, '');
    if (cleanNum.startsWith('4')) return 'visa';
    if (/^5[1-5]/.test(cleanNum) || /^2[2-7]/.test(cleanNum)) return 'mastercard';
    return 'unknown';
  }, [cardNumber]);

  const handleSave = () => {
    onSave({
      id: `new-${Date.now()}`,
      type: cardType === 'unknown' ? 'mastercard' : cardType as 'mastercard' | 'visa',
      title: `${cardType === 'visa' ? 'Visa' : 'Mastercard'} terminado em ${cardNumber.replace(/\D/g, '').slice(-4) || '0000'}`,
      subtitle: name || 'Novo cartão',
      last4: cardNumber.replace(/\D/g, '').slice(-4) || '0000',
      iconColor: cardType === 'mastercard' ? ['#eb001b', '#f79e1b'] : undefined
    });
  };

  const isFormValid = cardNumber.length >= 16 && name.length > 3 && expiry.length >= 4 && cvv.length >= 3;

  // Format Helpers
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const parts = [];
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substring(i, i + 4));
    }
    return parts.length > 1 ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
        return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f5] animate-slide-in-right">
       {/* Header */}
      <div className="bg-white px-4 h-14 flex items-center justify-between sticky top-0 z-20 shadow-sm text-[#333333]">
        <button onClick={onBack} className="p-1 -ml-2 hover:bg-black/5 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-medium">Adicionar cartão</h1>
        <div className="w-6"></div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        
        {/* Visual Card - Responsive to Input */}
        <div className={`w-full aspect-[1.586] rounded-xl shadow-lg p-6 mb-8 text-white relative overflow-hidden transition-all duration-500 transform hover:scale-[1.01] ${
            cardType === 'visa' 
            ? 'bg-gradient-to-br from-[#1a1f71] to-[#00509d]' 
            : 'bg-gradient-to-br from-[#1a1a1a] to-[#333]'
        }`}>
            {/* Chip */}
            <div className="w-11 h-8 bg-yellow-200/20 rounded mb-6 border border-yellow-100/20 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 border border-black/10 rounded"></div>
                <div className="w-full h-[1px] bg-black/10 absolute top-1/2 -translate-y-1/2"></div>
                <div className="h-full w-[1px] bg-black/10 absolute left-1/3"></div>
            </div>

            <div className="font-mono text-xl tracking-widest mb-6 h-8 flex items-center shadow-black drop-shadow-md">
                {cardNumber || '•••• •••• •••• ••••'}
            </div>

            <div className="flex justify-between items-end">
                <div className="flex-1 mr-4">
                    <div className="text-[9px] uppercase text-white/60 mb-1 tracking-wider">Nome do titular</div>
                    <div className="font-medium tracking-wide uppercase truncate h-5 text-sm">
                        {name || 'NOME COMPLETO'}
                    </div>
                </div>
                <div className="flex flex-col items-end">
                     <div className="text-[9px] uppercase text-white/60 mb-1 tracking-wider">Validade</div>
                     <div className="font-medium text-sm">{expiry || 'MM/AA'}</div>
                </div>
            </div>

            {/* Brand Logo Sim */}
            <div className="absolute top-5 right-6 flex items-center justify-center transition-all duration-300">
                 {cardType === 'visa' ? (
                     <div className="text-white font-bold text-2xl italic tracking-tighter opacity-90">VISA</div>
                 ) : (
                    <div className="flex">
                        <div className="w-8 h-8 rounded-full bg-red-500/90 mix-blend-screen"></div>
                        <div className="w-8 h-8 rounded-full bg-orange-500/90 -ml-3 mix-blend-screen"></div>
                    </div>
                 )}
            </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 bg-white p-5 rounded-lg shadow-sm border border-gray-100 flex-1">
             <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1">Número do cartão</label>
                <div className={`flex items-center border rounded-lg px-3 py-3 transition-all duration-200 ${focusedField === 'number' ? 'border-[#3483fa] ring-2 ring-[#3483fa]/10 shadow-sm' : 'border-gray-200'}`}>
                    <CreditCard size={20} className={`mr-3 transition-colors ${focusedField === 'number' ? 'text-[#3483fa]' : 'text-gray-400'}`} />
                    <input 
                        type="tel" 
                        maxLength={19}
                        placeholder="0000 0000 0000 0000"
                        className="w-full outline-none text-[#333333] font-medium text-base bg-transparent placeholder-gray-300"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        onFocus={() => setFocusedField('number')}
                        onBlur={() => setFocusedField('')}
                    />
                </div>
             </div>

             <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1">Nome impresso no cartão</label>
                <div className={`flex items-center border rounded-lg px-3 py-3 transition-all duration-200 ${focusedField === 'name' ? 'border-[#3483fa] ring-2 ring-[#3483fa]/10 shadow-sm' : 'border-gray-200'}`}>
                    <input 
                        type="text" 
                        placeholder="Como aparece no cartão"
                        className="w-full outline-none text-[#333333] font-medium text-base bg-transparent placeholder-gray-300 uppercase"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField('')}
                    />
                </div>
             </div>

             <div className="flex gap-4">
                 <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1">Validade</label>
                    <div className={`flex items-center border rounded-lg px-3 py-3 transition-all duration-200 ${focusedField === 'expiry' ? 'border-[#3483fa] ring-2 ring-[#3483fa]/10 shadow-sm' : 'border-gray-200'}`}>
                        <input 
                            type="tel" 
                            maxLength={5}
                            placeholder="MM/AA"
                            className="w-full outline-none text-[#333333] font-medium text-base bg-transparent placeholder-gray-300"
                            value={expiry}
                            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                            onFocus={() => setFocusedField('expiry')}
                            onBlur={() => setFocusedField('')}
                        />
                    </div>
                 </div>
                 <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1">CVV</label>
                    <div className={`flex items-center border rounded-lg px-3 py-3 transition-all duration-200 ${focusedField === 'cvv' ? 'border-[#3483fa] ring-2 ring-[#3483fa]/10 shadow-sm' : 'border-gray-200'}`}>
                        <Lock size={16} className={`mr-2 transition-colors ${focusedField === 'cvv' ? 'text-[#3483fa]' : 'text-gray-400'}`} />
                        <input 
                            type="tel" 
                            maxLength={4}
                            placeholder="123"
                            className="w-full outline-none text-[#333333] font-medium text-base bg-transparent placeholder-gray-300"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            onFocus={() => setFocusedField('cvv')}
                            onBlur={() => setFocusedField('')}
                        />
                    </div>
                 </div>
             </div>
             
             <div className="pt-1">
                 <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1">CPF do titular</label>
                 <div className={`flex items-center border rounded-lg px-3 py-3 transition-all duration-200 ${focusedField === 'cpf' ? 'border-[#3483fa] ring-2 ring-[#3483fa]/10 shadow-sm' : 'border-gray-200'}`}>
                    <input 
                        type="tel" 
                        maxLength={14}
                        placeholder="000.000.000-00"
                        className="w-full outline-none text-[#333333] font-medium text-base bg-transparent placeholder-gray-300"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        onFocus={() => setFocusedField('cpf')}
                        onBlur={() => setFocusedField('')}
                    />
                 </div>
             </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 sticky bottom-0 bg-[#f5f5f5] pt-2 pb-4">
            <button 
                onClick={handleSave}
                disabled={!isFormValid}
                className={`w-full py-3.5 rounded-lg font-bold text-white text-base transition-all duration-300 ${
                    isFormValid ? 'bg-[#3483fa] hover:bg-blue-600 shadow-md transform active:scale-[0.98]' : 'bg-gray-300 cursor-not-allowed'
                }`}
            >
                Salvar cartão
            </button>
            <div className="mt-3 flex justify-center items-center text-gray-400 gap-1.5 opacity-80">
                <Lock size={11} />
                <span className="text-[11px] font-medium">Suas informações estão criptografadas.</span>
            </div>
        </div>
      </div>
    </div>
  );
};
