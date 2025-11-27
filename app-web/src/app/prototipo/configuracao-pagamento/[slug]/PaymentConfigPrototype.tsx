"use client";

import React, { useState } from 'react';
import { ViewState, PaymentMethod } from './types';
import { PaymentDetails } from './components/PaymentDetails';
import { AddCardForm } from './components/AddCardForm';
import { PaymentManagement } from './components/PaymentManagement';
import { MethodInfo } from './components/MethodInfo';
import { AddBalance } from './components/AddBalance';
import { AddMethodSelection } from './components/AddMethodSelection';
import { EntryFlow } from './components/EntryFlow';
import { Toast } from './components/ui/Toast';

// Mock Initial Data - Replicating Uber Wallet Variety
const INITIAL_METHODS: PaymentMethod[] = [
    {
      id: 'account-balance',
      type: 'account',
      title: 'Saldo Mercado Pago',
      subtitle: 'Disponível'
    },
    {
      id: 'apple-pay',
      type: 'apple_pay',
      title: 'Apple Pay',
    },
    {
      id: 'visa-0169',
      type: 'visa',
      title: 'Visa **** 0169',
      last4: '0169'
    },
    {
      id: 'pix-rec',
      type: 'pix_recurring',
      title: 'Pix Recorrente',
      subtitle: 'Cobrança automática'
    },
    {
      id: 'debit-bradesco',
      type: 'debit_account',
      title: 'Débito em conta',
      subtitle: 'Banco Bradesco'
    },
    {
      id: 'pix',
      type: 'pix',
      title: 'Pix',
      subtitle: 'Pagamento instantâneo'
    },
    {
      id: 'boleto',
      type: 'boleto',
      title: 'Boleto Bancário',
      subtitle: 'Recarga de saldo'
    }
];

// Mock Potential Methods (Available but not active)
const POTENTIAL_METHODS: PaymentMethod[] = [
    {
        id: 'paypal',
        type: 'paypal',
        title: 'PayPal',
        subtitle: 'Conectar conta'
    },
    {
        id: 'ticket-restaurant',
        type: 'ticket',
        title: 'Ticket Restaurante',
        subtitle: 'Adicionar vale'
    }
];

export default function PaymentConfigPrototype() {
  // Navigation State
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.ENTRY);
  const [addCardOrigin, setAddCardOrigin] = useState<'MANAGEMENT' | 'BACKUP_FLOW'>('MANAGEMENT');
  const [selectedMethodForInfo, setSelectedMethodForInfo] = useState<PaymentMethod | null>(null);

  // Data State
  const [allMethods, setAllMethods] = useState<PaymentMethod[]>(INITIAL_METHODS);
  const [availableMethods, setAvailableMethods] = useState<PaymentMethod[]>(POTENTIAL_METHODS);
  const [primaryId, setPrimaryId] = useState<string>('visa-0169');
  const [secondaryId, setSecondaryId] = useState<string | null>(null);
  
  // Toast State
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // --- Actions ---

  const handleSetSecondary = (id: string) => {
    setSecondaryId(id);
    setToastMessage('Backup definido com sucesso!');
    setShowToast(true);
  };

  const handleRemoveSecondary = () => {
    setSecondaryId(null);
    setToastMessage('Backup removido.');
    setShowToast(true);
  };

  const handleSetPrimary = (id: string) => {
    // If the new primary was the secondary, clear secondary
    if (id === secondaryId) {
        setSecondaryId(null);
    }
    setPrimaryId(id);
    setToastMessage('Forma de pagamento principal atualizada!');
    setShowToast(true);
  };

  const handleDeleteMethod = (id: string) => {
    if (id === primaryId) {
        setToastMessage('Não é possível excluir o cartão principal.');
        setShowToast(true);
        return;
    }
    if (id === secondaryId) {
        setSecondaryId(null);
    }
    
    // Find the method being removed
    const methodToRemove = allMethods.find(m => m.id === id);
    
    // Remove from active list
    setAllMethods(prev => prev.filter(m => m.id !== id));

    // Add to available list (so it appears in "Add Payment Method" screen)
    if (methodToRemove) {
        setAvailableMethods(prev => [...prev, methodToRemove]);
    }

    setToastMessage('Forma de pagamento removida da carteira.');
    setShowToast(true);
  };

  const handleSaveNewCard = (newCard: PaymentMethod) => {
    setAllMethods(prev => [...prev, newCard]);
    
    if (addCardOrigin === 'BACKUP_FLOW') {
        // If added via Backup flow, automatically set as secondary
        setSecondaryId(newCard.id);
        setToastMessage('Novo cartão salvo e definido como backup!');
        setCurrentView(ViewState.DETAILS);
    } else {
        // If added via Management, just go back to list
        setToastMessage('Cartão adicionado à carteira.');
        setCurrentView(ViewState.MANAGEMENT);
    }
    setShowToast(true);
  };

  const handleRestoreMethod = (method: PaymentMethod) => {
      // Remove from available
      setAvailableMethods(prev => prev.filter(m => m.id !== method.id));
      // Add to active
      setAllMethods(prev => [...prev, method]);
      
      setToastMessage('Forma de pagamento readicionada!');
      setShowToast(true);
      setCurrentView(ViewState.MANAGEMENT);
  };

  // --- Navigation Handlers ---

  const goToAddCardFromBackup = () => {
      setAddCardOrigin('BACKUP_FLOW');
      setCurrentView(ViewState.ADD_CARD);
  };

  const goToAddCardFromManagement = () => {
      // New flow: Go to Selection first, not directly to Form
      setAddCardOrigin('MANAGEMENT');
      setCurrentView(ViewState.ADD_METHOD_SELECTION);
  };

  const handleMethodSelect = (method: PaymentMethod) => {
      setSelectedMethodForInfo(method);
      setCurrentView(ViewState.METHOD_INFO);
  };

  const goToAddBalance = () => {
      setCurrentView(ViewState.ADD_BALANCE);
  };

  const handleCloseAddBalance = () => {
      // Simulate success and go back to wallet
      setToastMessage('Solicitação de saldo criada com sucesso!');
      setShowToast(true);
      setCurrentView(ViewState.MANAGEMENT);
  };

  const renderView = () => {
      switch (currentView) {
          case ViewState.ENTRY:
              return <EntryFlow onEnter={() => setCurrentView(ViewState.DETAILS)} />;
          
          case ViewState.DETAILS:
              return (
                <PaymentDetails 
                    allMethods={allMethods}
                    primaryId={primaryId}
                    secondaryId={secondaryId}
                    onNavigateToManagement={() => setCurrentView(ViewState.MANAGEMENT)}
                    onSetSecondary={handleSetSecondary}
                    onRemoveSecondary={handleRemoveSecondary}
                    onAddNewForBackup={goToAddCardFromBackup}
                />
              );
          
          case ViewState.MANAGEMENT:
              return (
                  <PaymentManagement 
                      methods={allMethods}
                      primaryId={primaryId}
                      secondaryId={secondaryId}
                      onBack={() => setCurrentView(ViewState.DETAILS)}
                      onAddCard={goToAddCardFromManagement}
                      onSetPrimary={handleSetPrimary}
                      onDelete={handleDeleteMethod}
                      onAddBalance={() => {
                         // Find Pix or Boleto for direct balance addition
                         const topUpMethod = allMethods.find(m => m.type === 'pix') || allMethods.find(m => m.type === 'boleto');
                         if (topUpMethod) {
                            setSelectedMethodForInfo(topUpMethod);
                            setCurrentView(ViewState.ADD_BALANCE);
                         } else {
                            setToastMessage('Método de recarga indisponível');
                            setShowToast(true);
                         }
                      }}
                      onMethodSelect={handleMethodSelect}
                      onSetSecondary={handleSetSecondary}
                  />
              );
          
          case ViewState.ADD_METHOD_SELECTION:
              return (
                  <AddMethodSelection 
                      availableMethods={availableMethods}
                      onBack={() => setCurrentView(ViewState.MANAGEMENT)}
                      onSelectMethod={handleRestoreMethod}
                      onAddNewCard={() => setCurrentView(ViewState.ADD_CARD)}
                  />
              );

          case ViewState.METHOD_INFO:
              if (!selectedMethodForInfo) return null;
              return (
                  <MethodInfo 
                    method={selectedMethodForInfo}
                    onBack={() => setCurrentView(ViewState.MANAGEMENT)}
                    onAddBalance={goToAddBalance}
                    onRemove={() => {
                        handleDeleteMethod(selectedMethodForInfo.id);
                        setCurrentView(ViewState.MANAGEMENT);
                    }}
                  />
              );

          case ViewState.ADD_BALANCE:
               if (!selectedMethodForInfo) return null;
               return (
                  <AddBalance 
                    method={selectedMethodForInfo}
                    onClose={handleCloseAddBalance}
                  />
               );

          case ViewState.ADD_CARD:
              return (
                <AddCardForm 
                    onBack={() => {
                        // Return to selection if we came from management, or details if from backup
                        if (addCardOrigin === 'MANAGEMENT') {
                             setCurrentView(ViewState.ADD_METHOD_SELECTION);
                        } else {
                             setCurrentView(ViewState.DETAILS);
                        }
                    }}
                    onSave={handleSaveNewCard}
                />
              );
              
          // Legacy support (though currently unused in this new flow structure)
          case ViewState.SELECTION:
              return null; 

          default:
              return null;
      }
  };

  return (
    <div className="min-h-screen w-full bg-[#eee] flex justify-center font-sans">
      {/* Mobile Container Simulation */}
      <div className="w-full max-w-[420px] bg-[#f5f5f5] min-h-screen shadow-2xl relative overflow-x-hidden">
        
        {renderView()}

        {/* Global Toast */}
        <Toast 
          message={toastMessage} 
          isVisible={showToast} 
          onClose={() => setShowToast(false)} 
        />
        
      </div>
    </div>
  );
}
