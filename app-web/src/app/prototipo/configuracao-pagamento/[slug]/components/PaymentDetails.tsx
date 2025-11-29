"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, MoreVertical, ChevronRight, Plus, CreditCard, AlertTriangle, X } from 'lucide-react';
import { PaymentMethod } from '../types';
import { Modal } from './ui/Modal';

interface PaymentDetailsProps {
  allMethods: PaymentMethod[];
  primaryId: string;
  secondaryId: string | null;
  onNavigateToManagement: () => void;
  onSetSecondary: (id: string) => void;
  onRemoveSecondary: () => void;
  onAddNewForBackup: () => void;
}

export const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  allMethods,
  primaryId,
  secondaryId,
  onNavigateToManagement,
  onSetSecondary,
  onRemoveSecondary,
  onAddNewForBackup
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLDivElement>(null);

  // Derived state
  const primaryMethod = allMethods.find(m => m.id === primaryId);
  const secondaryPayment = secondaryId ? allMethods.find(m => m.id === secondaryId) : null;
  
  // Available methods for backup (excluding primary and current secondary)
  const availableForBackup = allMethods.filter(m => m.id !== primaryId && m.id !== secondaryId);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDeleteClick = () => {
    setIsMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onRemoveSecondary();
    setIsDeleteModalOpen(false);
  };

  const openSelectionModal = () => {
      setIsSelectionModalOpen(true);
  };

  const selectBackupMethod = (id: string) => {
      onSetSecondary(id);
      setIsSelectionModalOpen(false);
  };

  const goToAddNew = () => {
      setIsSelectionModalOpen(false);
      onAddNewForBackup();
  };

  return (
    <div className="flex flex-col min-h-full bg-[#f5f5f5]">
      {/* Header */}
      <div className="bg-[#ffe600] px-4 h-14 flex items-center justify-between sticky top-0 z-20 shadow-sm text-[#333333]">
        <button className="p-1 -ml-2 hover:bg-black/5 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-medium">Assinaturas</h1>
        <div className="w-6"></div> 
      </div>

      <div className="p-4 space-y-6 pb-10">
        
        {/* Cluster 1: Top Subscription Info */}
        <section className="bg-white rounded-lg p-5 shadow-sm">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-base font-semibold text-[#333333]">Meli+ | Mega</h2>
                <button className="text-[#3483fa] text-sm font-medium hover:bg-blue-50 px-2 py-1 rounded transition-colors">
                    Alterar
                </button>
            </div>

            <div className="h-px bg-gray-100 mb-4 w-full"></div>
            
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-base font-medium text-[#333333]">Assinatura mensal</span>
              <span className="text-base font-medium text-[#333333]">R$ 24,90/mês</span>
            </div>
            <div className="text-sm text-gray-400 font-light">Próxima fatura: 23 de dezembro</div>
        </section>

        {/* Cluster 2: Services List */}
        <section>
          <h2 className="text-base font-semibold text-[#333333] mb-3 pl-1">Streamings contratados</h2>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">

             {/* Services */}
             <div>
               {/* Netflix */}
               <div className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-[#E50914] font-bold text-lg">N</div>
                     <div>
                        <div className="text-sm font-medium text-[#333333]">Netflix</div>
                        <div className="text-xs text-[#999999]">Padrão com anúncios</div>
                     </div>
                  </div>
                  <ChevronRight size={18} className="text-[#3483fa]" />
               </div>

               {/* Disney+ */}
               <div className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                        <span className="font-bold text-xs text-[#113CCF]">Disney+</span>
                     </div>
                     <div>
                        <div className="text-sm font-medium text-[#333333]">Disney+</div>
                        <div className="text-xs text-[#999999]">Padrão com anúncios</div>
                     </div>
                  </div>
                  <button className="bg-[#3483fa] text-white text-xs font-bold px-4 py-1.5 rounded-md hover:bg-blue-600 transition-colors">
                    Ativar
                  </button>
               </div>

               {/* HBO Max */}
               <div className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold text-[10px]">HBO</div>
                     <div>
                        <div className="text-sm font-medium text-[#333333]">HBO Max</div>
                        <div className="text-xs text-[#999999]">Básico com anúncios</div>
                     </div>
                  </div>
                  <ChevronRight size={18} className="text-[#3483fa]" />
               </div>

               {/* Apple TV */}
               <div className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-[#1c1c1c] flex items-center justify-center text-white font-bold text-xs">tv</div>
                     <div>
                        <div className="text-sm font-medium text-[#333333]">Apple TV</div>
                        <div className="text-xs text-[#999999]">Sem anúncios</div>
                     </div>
                  </div>
                  <ChevronRight size={18} className="text-[#3483fa]" />
               </div>
             </div>
             
             {/* Footer Link */}
             <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors flex justify-between items-center">
                 <span className="text-sm font-medium text-gray-400">Alterar combo</span>
                 <ChevronRight size={16} className="text-gray-300" />
             </div>

          </div>
        </section>

        {/* Cluster 3: Payment Methods */}
        <section>
          <h2 className="text-base font-semibold text-[#333333] mb-3 pl-1">Meios de pagamento</h2>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            
            {/* Primary Method */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm shrink-0">
                   {primaryMethod?.type === 'mastercard' && (
                        <div className="flex relative">
                            <div className="w-3 h-3 rounded-full bg-[#eb001b] opacity-90 translate-x-1"></div>
                            <div className="w-3 h-3 rounded-full bg-[#f79e1b] opacity-90 -translate-x-1"></div>
                        </div>
                   )}
                   {primaryMethod?.type === 'visa' && <span className="text-[10px] font-bold text-[#1a1f71] italic">VISA</span>}
                   {primaryMethod?.type === 'account' && <span className="text-xs">🤝</span>}
                </div>
                <div>
                  <div className="text-sm font-medium text-[#333333]">{primaryMethod?.title || 'Selecione...'}</div>
                  <div className="text-xs text-[#999999]">Principal</div>
                </div>
              </div>
            </div>

            <div className="h-px bg-gray-100 mx-4"></div>

            {/* Alternative Method */}
            <div className="p-4 relative">
              
              {!secondaryPayment ? (
                // State: Empty - Persuasive Anti-Churn Design
                <div className="bg-orange-50/60 border border-orange-100 rounded-lg p-4 animate-fade-in">
                    <div className="flex gap-3 mb-3">
                        <div className="p-2 bg-white rounded-full h-fit text-orange-500 shadow-sm border border-orange-100">
                            <AlertTriangle size={18} />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-800 mb-1">Evite a suspensão do serviço</h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Adicione um meio de pagamento reserva para garantir que sua assinatura continue ativa se o pagamento principal falhar.
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={openSelectionModal}
                        className="w-full bg-white border border-gray-200 text-[#3483fa] font-bold text-sm py-3 rounded-lg hover:bg-gray-50 hover:border-blue-200 transition-all shadow-sm flex items-center justify-center active:bg-blue-50"
                    >
                        <Plus size={16} className="mr-2" />
                        Adicionar backup
                    </button>
                </div>
              ) : (
                // State: Selected
                <div className="flex items-start justify-between animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 rounded bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                       {secondaryPayment.type === 'mastercard' && (
                          <div className="flex relative">
                            <div className="w-3 h-3 rounded-full bg-[#eb001b] opacity-90 translate-x-1"></div>
                            <div className="w-3 h-3 rounded-full bg-[#f79e1b] opacity-90 -translate-x-1"></div>
                          </div>
                       )}
                       {secondaryPayment.type === 'visa' && <span className="text-[10px] font-bold text-[#1a1f71]">VISA</span>}
                       {secondaryPayment.type === 'account' && <span>🤝</span>}
                       {secondaryPayment.type === 'new' && <CreditCard size={16} className="text-gray-600" />}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#333333]">{secondaryPayment.title}</div>
                      {secondaryPayment.subtitle && <div className="text-xs text-[#999999]">{secondaryPayment.subtitle}</div>}
                    </div>
                  </div>

                  {/* Context Menu Trigger */}
                  <div className="relative">
                    <div 
                      ref={menuButtonRef}
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="p-1 text-gray-400 hover:text-[#333333] hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                    >
                      <MoreVertical size={20} />
                    </div>

                    {isMenuOpen && (
                       <div 
                          ref={menuRef}
                          className="absolute right-0 top-8 bg-white shadow-xl rounded-lg border border-gray-100 z-50 w-48 py-1 animate-scale-in origin-top-right overflow-hidden"
                       >
                           <button 
                              onClick={() => {
                                setIsMenuOpen(false);
                                openSelectionModal();
                              }}
                              className="w-full text-left px-4 py-3 text-sm text-[#333333] hover:bg-gray-50 transition-colors flex items-center gap-2"
                           >
                               <CreditCard size={16} />
                               Trocar método
                           </button>
                           <button 
                              onClick={handleDeleteClick}
                              className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                           >
                               <AlertTriangle size={16} />
                               Excluir backup
                           </button>
                       </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="h-px bg-gray-100 mx-4"></div>

            {/* Manage Link */}
            <div 
                onClick={onNavigateToManagement}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors flex justify-between items-center rounded-b-lg group"
            >
                <span className="text-sm font-medium text-[#3483fa] group-hover:underline">Gerenciar meios de pagamento</span>
                <ChevronRight size={16} className="text-[#3483fa]" />
            </div>

          </div>
        </section>

        {/* Footer Info */}
        <div className="px-2 pt-4 pb-8 text-center">
            <p className="text-xs text-[#999999] mb-4">Você pode cancelar sua assinatura quando quiser.</p>
            
            <button className="w-full bg-[#e3edfb] text-[#3483fa] font-semibold py-3 rounded-lg text-sm mb-4 hover:bg-blue-100 transition-colors">
              Eu quero cancelar minha assinatura
            </button>
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={isDeleteModalOpen}
        title="Excluir meio de pagamento"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        confirmText="Sim, excluir"
        cancelText="Manter"
      >
        <p>Ao remover o backup, você corre o risco de perder acesso aos streamings caso seu pagamento principal falhe.</p>
      </Modal>

      {/* Quick Select Modal (Bottom Sheet style) */}
      {isSelectionModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 animate-fade-in">
              <div className="bg-white w-full max-w-[420px] rounded-t-xl p-6 animate-slide-up shadow-2xl relative">
                  <button 
                    onClick={() => setIsSelectionModalOpen(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
                  >
                      <X size={24} />
                  </button>

                  <h3 className="text-lg font-semibold text-[#333333] mb-6">Escolha o meio de pagamento</h3>

                  <div className="space-y-3 max-h-[60vh] overflow-y-auto no-scrollbar">
                      {availableForBackup.map(method => (
                          <div 
                            key={method.id}
                            onClick={() => selectBackupMethod(method.id)}
                            className="flex items-center p-4 border border-gray-100 rounded-lg hover:bg-blue-50 hover:border-blue-200 cursor-pointer transition-all"
                          >
                                <div className="w-12 h-8 rounded border border-gray-200 flex items-center justify-center bg-white flex-shrink-0 mr-4">
                                    {method.type === 'mastercard' && (
                                    <div className="flex relative">
                                        <div className="w-3 h-3 rounded-full bg-[#eb001b] opacity-90 translate-x-1"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#f79e1b] opacity-90 -translate-x-1"></div>
                                    </div>
                                    )}
                                    {method.type === 'visa' && <span className="text-[10px] font-bold text-[#1a1f71] italic">VISA</span>}
                                    {method.type === 'account' && <span className="text-lg">🤝</span>}
                                    {method.type === 'apple_pay' && <span className="text-lg"></span>}
                                    {method.type === 'pix' && <span className="text-sm">🔷</span>}
                                    {method.type === 'pix_recurring' && <span className="text-sm">🔷🔄</span>}
                                    {method.type === 'boleto' && <span className="text-xs">📄</span>}
                                    {method.type === 'debit_account' && <span className="text-xs">🏦</span>}
                                    {method.type === 'paypal' && <span className="text-[10px] font-bold text-[#003087]">PayPal</span>}
                                    {method.type === 'ticket' && <span className="text-xs">🎫</span>}
                                    {!['mastercard', 'visa', 'account', 'apple_pay', 'pix', 'pix_recurring', 'boleto', 'debit_account', 'paypal', 'ticket'].includes(method.type) && <CreditCard size={16} className="text-gray-400" />}
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-[#333333]">{method.title}</div>
                                    {method.subtitle && <div className="text-xs text-[#999999]">{method.subtitle}</div>}
                                </div>
                          </div>
                      ))}

                      {availableForBackup.length === 0 && (
                          <div className="text-center text-gray-500 text-sm py-4">
                              Você não tem outros cartões salvos.
                          </div>
                      )}

                      <button 
                        onClick={goToAddNew}
                        className="w-full flex items-center justify-center p-4 border border-dashed border-[#3483fa]/40 rounded-lg text-[#3483fa] font-semibold hover:bg-blue-50 transition-colors mt-2"
                      >
                          <Plus size={20} className="mr-2" />
                          Cadastrar novo cartão
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
