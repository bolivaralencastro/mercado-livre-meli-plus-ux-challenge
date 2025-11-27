"use client";

import { useState } from "react";
import { CreditCard, Calendar, Lock, ChevronRight, Plus } from "lucide-react";

export default function PaymentConfigPrototype() {
  const [selectedCard, setSelectedCard] = useState<string | null>("visa-1234");

  const savedCards = [
    { id: "visa-1234", brand: "Visa", last4: "1234", expiry: "12/28", color: "#1a1f71" },
    { id: "master-5678", brand: "Mastercard", last4: "5678", expiry: "05/26", color: "#eb001b" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Container */}
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg">
        {/* Header */}
        <div className="bg-[#fff159] p-4 sticky top-0 z-10 shadow-sm">
          <h1 className="text-[#2d3277] font-semibold text-lg">Configuração de Pagamento</h1>
          <p className="text-[#2d3277]/70 text-sm">Gerencie seus métodos de pagamento</p>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Current Subscription */}
          <section>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Assinatura Atual
            </h2>
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="inline-block bg-[#8e24aa] text-white px-3 py-1 rounded-full text-xs font-bold italic mb-2">
                    meli+
                  </span>
                  <h3 className="font-bold text-lg text-gray-900">Plano Mega</h3>
                  <p className="text-gray-600 text-sm">R$ 39,90/mês</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                    Ativa
                  </span>
                </div>
              </div>
              <div className="pt-3 border-t border-gray-100 text-sm text-gray-600">
                <p>Próxima cobrança: <span className="font-medium text-gray-900">15/12/2025</span></p>
              </div>
            </div>
          </section>

          {/* Saved Cards */}
          <section>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Cartões Salvos
            </h2>
            <div className="space-y-2">
              {savedCards.map((card) => (
                <div
                  key={card.id}
                  className={`
                    border rounded-xl p-4 cursor-pointer transition-all duration-200
                    ${selectedCard === card.id 
                      ? "border-[#3483fa] bg-blue-50/50 shadow-sm" 
                      : "border-gray-200 bg-white hover:border-gray-300"
                    }
                  `}
                  onClick={() => setSelectedCard(card.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-8 rounded flex items-center justify-center text-white text-[8px] font-bold tracking-widest shadow-sm"
                        style={{ backgroundColor: card.color }}
                      >
                        {card.brand.toUpperCase().slice(0, 6)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {card.brand} •••• {card.last4}
                        </p>
                        <p className="text-gray-500 text-xs flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {card.expiry}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedCard === card.id && (
                        <span className="text-xs font-medium text-[#3483fa] px-2 py-1 bg-blue-100 rounded">
                          Principal
                        </span>
                      )}
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Add New Card */}
          <section>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Adicionar Meio de Pagamento
            </h2>
            <button className="w-full bg-white border border-gray-200 rounded-xl p-4 hover:border-[#3483fa] hover:bg-blue-50/50 transition-all duration-200 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-[#3483fa] transition-colors">
                    <Plus className="w-6 h-6 text-[#3483fa] group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900 text-sm">Novo Cartão</p>
                    <p className="text-gray-500 text-xs">Adicionar cartão de crédito</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          </section>

          {/* Payment History */}
          <section>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Histórico de Pagamentos
            </h2>
            <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 shadow-sm">
              {[
                { date: "15/11/2025", amount: "R$ 39,90", status: "Aprovado", method: "Visa •••• 1234" },
                { date: "15/10/2025", amount: "R$ 39,90", status: "Aprovado", method: "Visa •••• 1234" },
                { date: "15/09/2025", amount: "R$ 39,90", status: "Aprovado", method: "Mastercard •••• 5678" },
              ].map((payment, idx) => (
                <div key={idx} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{payment.amount}</p>
                      <p className="text-gray-500 text-xs">{payment.date} • {payment.method}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-green-700 px-2 py-1 bg-green-100 rounded">
                        {payment.status}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Security Info */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-[#3483fa] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  Seus dados estão seguros
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Utilizamos criptografia de ponta a ponta para proteger suas informações de pagamento. 
                  Nenhum dado sensível é armazenado em nossos servidores.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Spacing */}
        <div className="h-8" />
      </div>
    </div>
  );
}
