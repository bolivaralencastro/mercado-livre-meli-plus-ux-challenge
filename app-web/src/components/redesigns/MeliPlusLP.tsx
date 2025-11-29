'use client';

import React from 'react';
import AndesMeliPlusPlans from '@/components/ui/AndesMeliPlusPlans';
import { Truck, Play, Wallet, ChevronDown } from 'lucide-react';

export default function MeliPlusLP() {
  return (
    <div className="bg-white font-sans w-full overflow-hidden">
      {/* --- HERO SECTION --- */}
      <section className="bg-[#240046] text-white pt-16 pb-20 px-6 relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-xs font-semibold mb-6 tracking-wide border border-white/20">
            NOVO PROGRAMA DE BENEFÍCIOS
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            O seu nível de <br className="hidden md:block" />
            <span className="text-[#a90f90] bg-white px-2 rounded-md ml-2">benefícios</span> superiores
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-xl mx-auto font-light leading-relaxed">
            Frete grátis em milhões de produtos, filmes, séries e música por um preço que cabe no bolso.
          </p>
          <button className="bg-[#a90f90] hover:bg-[#8a0c75] text-white font-bold py-3 px-8 rounded-md text-lg transition-colors shadow-lg">
            Assinar o Meli+
          </button>
        </div>
      </section>

      {/* --- BENEFÍCIOS PRINCIPAIS --- */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-800">Tudo o que você ganha sendo Meli+</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-md transition-all text-center group">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Truck className="w-8 h-8 text-[#00a650]" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Frete Grátis e Rápido</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Em milhões de produtos a partir de R$ 29. Receba suas compras em até 24h.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-md transition-all text-center group">
            <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-[#a90f90]" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Streaming Incluso</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Disney+ Padrão com Anúncios e Deezer Premium por 12 meses grátis.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-md transition-all text-center group">
            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Wallet className="w-8 h-8 text-[#3483fa]" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Benefícios Financeiros</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Até 3% de cashback e rendimento de 120% do CDI na conta Mercado Pago.
            </p>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO DE PLANOS --- */}
      <section className="bg-gray-100 py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
           <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Escolha o plano ideal</h2>
              <p className="text-gray-600">Sem fidelidade. Cancele quando quiser.</p>
           </div>
           
           <div className="flex justify-center">
             <AndesMeliPlusPlans 
                plans={[
                  {
                    id: "essencial",
                    name: "ESSENCIAL",
                    price: 9.9,
                    period: "mês",
                    badge: {
                      type: "current",
                      label: "PLANO ATUAL"
                    },
                    features: [
                      "Frete grátis rápido em milhões de produtos a partir de R$ 19.",
                      "Até 3% de cashback no Mercado Livre e até 10% em outras lojas e sites com o Cartão de Crédito Mercado Pago.",
                      "Seu dinheiro rende 120% do CDI em Cofrinhos.",
                    ],
                    buttonLabel: "Mudar para Meli+ Essencial",
                    buttonDisabled: true,
                  },
                  {
                    id: "total",
                    name: "TOTAL",
                    price: 24.9,
                    period: "mês",
                    features: [
                      "Entretenimento incluído",
                      "Frete grátis rápido em milhões de produtos a partir de R$ 19.",
                      "Até 3% de cashback no Mercado Livre e até 10% em outras lojas e sites com o Cartão de Crédito Mercado Pago.",
                      "Seu dinheiro rende 120% do CDI em Cofrinhos.",
                      "70% OFF na HBO Max Padrão por 6 meses e 30% OFF no Universal+, Paramount+ e Globoplay Premium.",
                    ],
                    streamingLogos: ["disney"],
                    buttonLabel: "Mudar para Meli+ Total",
                    buttonHref: "#upgrade-total"
                  },
                  {
                    id: "mega",
                    name: "MEGA",
                    price: 39.9,
                    oldPrice: 74.9,
                    discount: "46% OFF",
                    period: "mês",
                    periodNote: "por 2 meses",
                    badge: {
                      type: "offer",
                      label: "OFERTA ESPECIAL"
                    },
                    features: [
                      "Entretenimento incluído",
                      "Frete grátis rápido em milhões de produtos a partir de R$ 19.",
                      "Até 3% de cashback no Mercado Livre e até 10% em outras lojas e sites com o Cartão de Crédito Mercado Pago.",
                      "Seu dinheiro rende 120% do CDI em Cofrinhos.",
                      "30% OFF no Universal+, Paramount+ e Globoplay Premium.",
                    ],
                    streamingLogos: ["disney", "netflix", "hbomax", "appletv"],
                    buttonLabel: "Mudar para Meli+ Mega",
                    buttonHref: "#upgrade-mega"
                  },
                ]}
             />
           </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="py-16 px-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-8 text-center">Dúvidas frequentes</h2>
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-center font-semibold text-gray-700 text-sm">
              Como funciona o frete grátis?
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-center font-semibold text-gray-700 text-sm">
              Posso cancelar a qualquer momento?
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
