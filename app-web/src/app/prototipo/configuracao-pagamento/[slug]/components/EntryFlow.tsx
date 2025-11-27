"use client";

import React, { useState } from 'react';
import { ArrowLeft, Bell, Mail } from 'lucide-react';

interface EntryFlowProps {
  onEnter: () => void;
}

export const EntryFlow: React.FC<EntryFlowProps> = ({ onEnter }) => {
  const [mode, setMode] = useState<'notification' | 'email'>('notification');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative font-sans">
      
      {/* Dev Switcher - Placed outside the mobile interface */}
      <div className="fixed top-6 right-6 z-[100] flex gap-3 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg border border-gray-200">
        <button 
            onClick={() => setMode('notification')}
            className={`p-2.5 rounded-full transition-all duration-300 hover:scale-105 ${mode === 'notification' ? 'bg-[#3483fa] text-white shadow-md' : 'text-gray-400 hover:bg-gray-100'}`}
            title="Simular Notificação"
        >
            <Bell size={20} />
        </button>
        <button 
            onClick={() => setMode('email')}
            className={`p-2.5 rounded-full transition-all duration-300 hover:scale-105 ${mode === 'email' ? 'bg-[#3483fa] text-white shadow-md' : 'text-gray-400 hover:bg-gray-100'}`}
            title="Simular Email"
        >
            <Mail size={20} />
        </button>
      </div>

      {mode === 'notification' ? (
        // === MODE: NOTIFICATION ===
        <div className="flex-1 bg-white animate-fade-in">
           {/* Android Status Bar Sim */}
           <div className="h-6 bg-[#f5d400] flex justify-between items-center px-4 text-xs font-medium text-black/70">
              <span>09:41</span>
              <div className="flex gap-1.5">
                  <span className="opacity-80">5G</span>
                  <div className="w-3 h-3 bg-black/70 rounded-full opacity-60"></div>
              </div>
           </div>

           {/* App Header */}
           <div className="bg-[#ffe600] h-14 flex items-center px-4 shadow-sm text-[#333333]">
              <ArrowLeft size={24} className="mr-6 cursor-pointer opacity-80" />
              <span className="text-lg font-medium">Notificações</span>
           </div>

           {/* Notification List */}
           <div className="bg-gray-50 min-h-[calc(100vh-80px)]">
              
              {/* Target Notification */}
              <div 
                onClick={onEnter}
                className="bg-white p-4 border-b border-gray-100 cursor-pointer active:bg-blue-50 transition-colors flex gap-4"
              >
                 <div className="w-10 h-10 rounded-full bg-[#8e24aa] flex items-center justify-center shrink-0">
                    <span className="text-white font-bold italic text-xs">meli+</span>
                 </div>
                 <div className="flex-1">
                    <h3 className="text-sm font-semibold text-[#333333] mb-1">Mantenha sua assinatura ativa</h3>
                    <p className="text-sm text-gray-500 leading-snug">
                        Adicione outro meio de pagamento em caso de problemas com o principal.
                    </p>
                    <div className="mt-2 text-xs text-gray-400 font-medium">Agora</div>
                 </div>
              </div>

           </div>
        </div>
      ) : (
        // === MODE: EMAIL ===
        <div className="flex-1 bg-[#f5f5f5] overflow-y-auto animate-fade-in">
           {/* Email Client Header Sim */}
           <div className="bg-white p-4 shadow-sm border-b border-gray-200 flex items-center gap-3 sticky top-0 z-10">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs font-bold">ML</div>
              <div className="flex-1">
                  <div className="text-sm font-bold text-[#333333]">Mercado Livre</div>
                  <div className="text-xs text-gray-500 truncate">Mantenha sua assinatura ativa adicionando...</div>
              </div>
              <div className="text-xs text-gray-400">10:23</div>
           </div>

           {/* Email Content */}
           <div className="p-4 flex justify-center">
              <div className="bg-white w-full max-w-md rounded-lg shadow-sm overflow-hidden">
                  
                  {/* ML Header */}
                  <div className="bg-[#ffe600] p-4 flex items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#2d3277] rounded-full flex items-center justify-center relative overflow-hidden">
                            <div className="text-white text-xs">🤝</div>
                        </div>
                        <span className="font-medium text-[#2d3277]">mercado<br/><span className="font-light">libre</span></span>
                      </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 md:p-8">
                      <div className="flex items-center justify-between mb-6">
                        <h1 className="text-xl md:text-2xl font-semibold text-gray-800 leading-tight max-w-[80%]">
                            Mantenha sua assinatura ativa adicionando outro meio de pagamento
                        </h1>
                        <div className="bg-[#8e24aa] text-white text-[10px] font-bold italic px-2 py-1 rounded">meli+</div>
                      </div>

                      <div className="text-gray-600 text-sm leading-relaxed space-y-4 mb-8">
                          <p>
                              Agora você pode adicionar um meio de pagamento alternativo para sua assinatura do Meli+.
                          </p>
                          <p>
                              Só vamos usá-lo se houver algum problema com o meio de pagamento que você escolheu no momento da assinatura.
                          </p>
                          <p>
                              Assim, ela estará sempre ativa e você continua aproveitando os benefícios do Meli+.
                          </p>
                      </div>

                      <button 
                        onClick={onEnter}
                        className="w-full bg-[#3483fa] text-white font-semibold py-3.5 rounded-md hover:bg-blue-600 transition-colors shadow-sm mb-8"
                      >
                          Adicionar outro meio de pagamento
                      </button>

                      <div className="border-t border-gray-100 pt-6 text-center">
                          <p className="text-xs text-gray-400 mb-1">
                              Dúvidas? <span className="text-[#3483fa] cursor-pointer">Estamos aqui para ajudar</span>.
                          </p>
                          <p className="text-xs text-gray-400">
                              Promoção sujeita aos <span className="text-[#3483fa] cursor-pointer">Termos e condições do Meli+</span>.
                          </p>
                      </div>
                  </div>

                  {/* Footer */}
                  <div className="bg-[#f9f9f9] p-6 text-center border-t border-gray-100">
                      <p className="text-[10px] text-gray-400 leading-normal">
                          Enviamos este e-mail para <span className="text-[#3483fa]">user@mail.com</span>.<br/>
                          <span className="text-[#3483fa] cursor-pointer">Administrar preferências de e-mails</span>.<br/>
                          Saiba <span className="text-[#3483fa] cursor-pointer">como cuidamos da sua Privacidade</span> e consulte os <span className="text-[#3483fa] cursor-pointer">Termos e condições do Mercado Livre</span>.
                      </p>
                  </div>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};
