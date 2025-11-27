"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Plus, CreditCard, Trash2, CheckCircle2, ChevronRight, QrCode, Barcode, Repeat, Landmark, ShieldCheck } from 'lucide-react';
import { PaymentMethod } from '../types';
import { Modal } from './ui/Modal';

interface PaymentManagementProps {
  methods: PaymentMethod[];
  primaryId: string;
  secondaryId: string | null;
  onBack: () => void;
  onAddCard: () => void;
  onSetPrimary: (id: string) => void;
  onDelete: (id: string) => void;
  onMethodSelect: (method: PaymentMethod) => void;
  onSetSecondary: (id: string) => void;
  onAddBalance: () => void;
}

export const PaymentManagement: React.FC<PaymentManagementProps> = ({
  methods,
  primaryId,
  secondaryId,
  onBack,
  onAddCard,
  onSetPrimary,
  onDelete,
  onMethodSelect,
  onSetSecondary,
  onAddBalance
}) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDeleteRequest = (id: string) => {
    setActiveMenuId(null);
    setDeleteConfirmId(id);
  };

  const confirmDelete = () => {
    if (deleteConfirmId) {
      onDelete(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  // Find Account Method (Balance)
  const accountMethod = methods.find(m => m.type === 'account');
  const isAccountSecondary = accountMethod && secondaryId === accountMethod.id;
  const isAccountPrimary = accountMethod && primaryId === accountMethod.id;

  // Filter out account from main list to avoid duplication
  const listMethods = methods.filter(m => m.type !== 'account');

  // Helper to render icons based on type
  const renderIcon = (method: PaymentMethod) => {
     const baseClasses = "w-12 h-8 rounded border border-gray-200 flex items-center justify-center bg-white flex-shrink-0 shadow-sm";
     
     switch (method.type) {
         case 'mastercard':
             return (
                 <div className={baseClasses}>
                    <div className="flex relative">
                        <div className="w-3 h-3 rounded-full bg-[#eb001b] opacity-90 translate-x-1"></div>
                        <div className="w-3 h-3 rounded-full bg-[#f79e1b] opacity-90 -translate-x-1"></div>
                    </div>
                 </div>
             );
         case 'visa':
             return (
                 <div className={baseClasses}>
                    <span className="text-[10px] font-bold text-[#1a1f71] italic">VISA</span>
                 </div>
             );
         case 'apple_pay':
             return (
                 <div className="w-12 h-8 rounded border border-gray-200 flex items-center justify-center bg-black flex-shrink-0 shadow-sm">
                    <span className="text-white text-[10px] font-bold flex items-center gap-0.5">
                         <span className="text-base"></span>Pay
                    </span>
                 </div>
             );
         case 'pix':
         case 'pix_recurring':
             return (
                 <div className={baseClasses}>
                    <div className="relative">
                        <QrCode size={16} className="text-[#32BCAD]" />
                        {method.type === 'pix_recurring' && (
                             <div className="absolute -bottom-1 -right-2 bg-white rounded-full p-[1px]">
                                <Repeat size={10} className="text-[#32BCAD]" />
                             </div>
                        )}
                    </div>
                 </div>
             );
         case 'boleto':
             return (
                 <div className={baseClasses}>
                    <Barcode size={16} className="text-gray-600" />
                 </div>
             );
         case 'debit_account':
         case 'account':
             return (
                 <div className={baseClasses}>
                    <Landmark size={16} className="text-gray-600" />
                 </div>
             );
         case 'paypal':
             return (
                 <div className={baseClasses}>
                    <span className="text-[10px] font-bold text-[#003087] italic">Pay</span>
                 </div>
             );
         default:
             return (
                 <div className={baseClasses}>
                    <CreditCard size={16} className="text-gray-400" />
                 </div>
             );
     }
  };

  const handleRowClick = (method: PaymentMethod) => {
      // If it's a balance adder type, trigger selection to go to MethodInfo
      if (method.type === 'pix' || method.type === 'boleto') {
          onMethodSelect(method);
      } else {
          // Otherwise toggle menu
          setActiveMenuId(activeMenuId === method.id ? null : method.id);
      }
  };

  // Simple X icon component
  const XIcon = () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f5] animate-slide-in-right font-sans">
      {/* Header */}
      <div className="bg-[#f5f5f5] px-4 h-14 flex items-center justify-between sticky top-0 z-20 text-[#333333]">
        <button onClick={onBack} className="p-1 -ml-2 hover:bg-black/5 rounded-full transition-colors">
          <XIcon />
        </button>
        <h1 className="text-lg font-medium">Carteira</h1>
        <div className="w-6"></div>
      </div>

      <div className="px-4 pb-8 flex-1">
        
        {/* Balance Card (Light Style) */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-8 relative overflow-hidden">
             <div className="relative z-10">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-sm font-medium text-gray-500 mb-1">Saldo Mercado Pago</div>
                        <div className="text-3xl font-medium text-[#333333] mb-4 tracking-tight">R$ 1.250,00</div>
                    </div>
                    
                    {/* Backup Status Badge */}
                    {isAccountSecondary && (
                        <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-md border border-green-100">
                            <ShieldCheck size={14} />
                            <span className="text-[10px] font-bold uppercase">Backup Ativo</span>
                        </div>
                    )}
                </div>
                
                <div className="flex items-start gap-2 mb-6">
                    <div className="mt-0.5">
                        <div className="w-3.5 h-3.5 rounded-full border border-gray-400 flex items-center justify-center text-[8px] text-gray-500">i</div>
                    </div>
                    <p className="text-xs text-gray-500 leading-snug max-w-[90%]">
                        Rendimento anual de 105% do CDI. A recarga automática está desativada.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button 
                        onClick={onAddBalance}
                        className="bg-[#3483fa] text-white font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-blue-600 transition-colors shadow-sm"
                    >
                        + Adicionar saldo
                    </button>
                    
                    {!isAccountSecondary && !isAccountPrimary && accountMethod && (
                        <button 
                            onClick={() => onSetSecondary(accountMethod.id)}
                            className="text-[#3483fa] text-xs font-semibold hover:bg-blue-50 px-3 py-2 rounded-full transition-colors"
                        >
                            Ativar como backup
                        </button>
                    )}
                </div>
             </div>
        </div>

        {/* Payment Methods List */}
        <h2 className="text-lg font-bold text-[#333333] mb-4">Formas de pagamento</h2>

        {/* Removed overflow-hidden to fix dropdown clipping */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4">
          {listMethods.map((method, index) => {
            const isPrimary = method.id === primaryId;
            const isBalanceAdder = method.type === 'pix' || method.type === 'boleto';

            return (
              <div 
                key={method.id} 
                className={`relative p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group ${
                    index !== listMethods.length - 1 ? 'border-b border-gray-100' : ''
                } ${index === 0 ? 'rounded-t-xl' : ''} ${index === listMethods.length - 1 ? 'rounded-b-xl' : ''}`}
                onClick={() => handleRowClick(method)}
              >
                <div className="flex items-center gap-4">
                    {renderIcon(method)}
                    
                    <div>
                        <div className="text-sm font-medium text-[#333333]">{method.title}</div>
                        {method.subtitle && <div className="text-xs text-gray-500">{method.subtitle}</div>}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Primary Badge */}
                    {isPrimary && (
                        <span className="text-xs text-gray-400 font-medium mr-2">Principal</span>
                    )}

                    {/* Menu Trigger or Chevron */}
                    <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-500" />
                </div>

                {/* Dropdown Menu (hidden by default) - Not available for balance adders */}
                {activeMenuId === method.id && !isBalanceAdder && (
                     <div 
                        ref={menuRef}
                        className="absolute right-4 top-10 bg-white shadow-xl rounded-lg border border-gray-100 z-50 w-48 py-1 animate-scale-in origin-top-right overflow-hidden"
                     >
                         {!isPrimary && (
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onSetPrimary(method.id);
                                    setActiveMenuId(null);
                                }}
                                className="w-full text-left px-4 py-3 text-sm text-[#333333] hover:bg-gray-50 transition-colors flex items-center gap-2"
                            >
                                <CheckCircle2 size={16} className="text-[#3483fa]" />
                                Definir como principal
                            </button>
                         )}
                         
                         {/* Only show delete for Card types/Recurring/Others */}
                         {!isPrimary && (
                             <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteRequest(method.id);
                                }}
                                className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                            >
                                 <Trash2 size={16} />
                                 Excluir
                             </button>
                         )}
                     </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Add New Method - Separated Button with Unified Copy */}
        <div 
            onClick={onAddCard}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
        >
            <div className="w-12 h-8 rounded border border-gray-200 flex items-center justify-center bg-gray-50 flex-shrink-0">
                <Plus size={18} className="text-[#333333]" />
            </div>
            <div className="text-sm font-medium text-[#333333]">Adicionar forma de pagamento</div>
        </div>

      </div>

      <Modal 
        isOpen={!!deleteConfirmId}
        title="Excluir forma de pagamento?"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirmId(null)}
        confirmText="Sim, excluir"
        cancelText="Não"
      >
        <p>Você tem certeza que deseja remover esta forma de pagamento da sua carteira?</p>
      </Modal>
    </div>
  );
};
