import React from 'react';
import { Plus, ChevronRight, ShieldCheck, CreditCard } from 'lucide-react';

export default function PaymentRegistrationFlow() {
  return (
    <div className="bg-[#f5f5f5] font-sans w-full max-w-md mx-auto border border-gray-200 shadow-sm min-h-[600px] relative">
      {/* Header Mobile Style */}
      <div className="bg-[#009ee3] h-14 px-4 flex items-center gap-4 shadow-md relative z-10">
        <div className="w-6 cursor-pointer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </div>
        <h1 className="font-medium text-lg text-white">Meus cartões</h1>
      </div>

      <div className="p-4 max-w-md mx-auto">
        
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 mt-2 ml-1">Cartões salvos</h2>

        {/* Current Cards */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden divide-y divide-gray-100">
            <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-[#1a1f71] rounded flex items-center justify-center text-[8px] text-white font-bold tracking-widest shadow-sm">VISA</div>
                    <div className="flex flex-col">
                        <span className="text-gray-800 text-sm font-medium">Visa terminado em 1234</span>
                        <span className="text-gray-400 text-xs">Vencimento 12/28</span>
                    </div>
                </div>
                <ChevronRight className="text-gray-300 w-5 h-5" />
            </div>
            <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-[#eb001b] rounded flex items-center justify-center text-[8px] text-white font-bold tracking-widest shadow-sm">MASTER</div>
                    <div className="flex flex-col">
                        <span className="text-gray-800 text-sm font-medium">Mastercard terminado em 5678</span>
                        <span className="text-gray-400 text-xs">Vencimento 05/26</span>
                    </div>
                </div>
                <ChevronRight className="text-gray-300 w-5 h-5" />
            </div>
        </div>

        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 ml-1">Adicionar meio de pagamento</h2>

        {/* Add New Card Button */}
        <button className="w-full bg-white p-4 rounded-lg shadow-sm flex items-center justify-between group active:bg-gray-50 transition-colors hover:shadow-md">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#009ee3]">
                    <Plus className="w-6 h-6" />
                </div>
                <div className="flex flex-col items-start">
                    <span className="text-[#009ee3] font-medium">Adicionar novo cartão de crédito</span>
                    <span className="text-gray-400 text-xs">Crédito ou Débito</span>
                </div>
            </div>
            <ChevronRight className="text-gray-300 w-5 h-5" />
        </button>

        {/* Security Note */}
        <div className="mt-8 flex gap-3 px-2 items-start">
            <ShieldCheck className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-500 leading-relaxed">
                Seus dados estão protegidos. Cumprimos com os mais altos padrões de segurança da indústria (PCI-DSS) e não compartilhamos seus dados reais com os vendedores.
            </p>
        </div>
      </div>
    </div>
  );
}
