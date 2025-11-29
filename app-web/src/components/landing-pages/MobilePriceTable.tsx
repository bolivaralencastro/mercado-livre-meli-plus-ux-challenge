"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Info } from "lucide-react";

// ============ TYPES ============
interface PlanPricing {
  price: string;
  originalPrice?: string;
  discount?: string;
  period: string;
}

interface Plan {
  id: string;
  name: string;
  slug: string;
  monthly: PlanPricing;
  annual: PlanPricing;
  description: string;
  highlighted?: boolean;
  badge?: string;
}

// ============ PLAN DATA ============
const mobilePlans: Plan[] = [
  {
    id: "card-essencial",
    name: "Essencial",
    slug: "essencial",
    monthly: {
      price: "R$ 9,90",
      period: "/mês",
    },
    annual: {
      price: "R$ 8,25",
      originalPrice: "R$ 9,90",
      discount: "17% OFF",
      period: "/mês (cobrado anualmente)",
    },
    description: "A porta de entrada. Frete Grátis em milhões de produtos.",
  },
  {
    id: "card-total",
    name: "Total",
    slug: "total",
    monthly: {
      price: "R$ 24,90",
      period: "/mês",
    },
    annual: {
      price: "R$ 20,75",
      originalPrice: "R$ 24,90",
      discount: "17% OFF",
      period: "/mês (cobrado anualmente)",
    },
    description: "Inclui Disney+ Padrão com Anúncios e Deezer Premium.",
  },
  {
    id: "card-mega",
    name: "Mega",
    slug: "mega",
    monthly: {
      price: "R$ 39,90",
      originalPrice: "R$ 74,90",
      discount: "46% OFF",
      period: "/mês por 2 meses",
    },
    annual: {
      price: "R$ 33,25",
      originalPrice: "R$ 39,90",
      discount: "17% OFF",
      period: "/mês (cobrado anualmente)",
    },
    description: "A experiência definitiva. Disney+, Max, Netflix (Padrão) e mais.",
    highlighted: true,
    badge: "OFERTA ESPECIAL",
  },
];

// ============ DIMENSÕES FIXAS (Baseado no modelo HTML) ============
const HEADER_HEIGHT = 70;      // Altura do header de cada card
const TAB_HEIGHT = 50;         // Altura visual do botão tab
const TAB_MARGIN = 30;         // Espaço acima/abaixo da tab
const TOP_AREA_SPACE = 90;     // Onde o primeiro card deve travar

// ============ COMPONENT ============
export default function MobilePriceTable() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [stuckCards, setStuckCards] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  // Check which cards are stuck - seguindo o modelo HTML
  const checkSticky = useCallback(() => {
    const cards = document.querySelectorAll('[data-mobile-plan-card]');
    const newStuckCards = new Set<string>();
    
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(card);
      const topValue = parseFloat(computedStyle.top);
      
      // Card is stuck when its top position is at or near the sticky top value
      if (rect.top <= topValue) {
        const id = card.getAttribute('data-mobile-plan-card');
        if (id) {
          newStuckCards.add(id);
        }
      }
    });
    
    setStuckCards(newStuckCards);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', checkSticky, { passive: true });
    window.addEventListener('resize', checkSticky);
    checkSticky();
    
    return () => {
      window.removeEventListener('scroll', checkSticky);
      window.removeEventListener('resize', checkSticky);
    };
  }, [checkSticky]);

  // Calculate top position for each card - EXATAMENTE como o HTML
  const getCardTop = (index: number): number => {
    switch (index) {
      case 0: return TOP_AREA_SPACE;                                    // Card 1
      case 1: return TOP_AREA_SPACE + HEADER_HEIGHT;                   // Card 2
      case 2: return TOP_AREA_SPACE + HEADER_HEIGHT + HEADER_HEIGHT;   // Card 3
      default: return TOP_AREA_SPACE + (HEADER_HEIGHT * index);
    }
  };

  // Z-index para empilhamento correto (cards superiores ficam por cima)
  const getCardZIndex = (index: number): number => {
    return index + 1;
  };

  return (
    <div 
      ref={containerRef}
      className="relative"
      style={{ paddingBottom: '100vh' }} // Espaço extra para scroll como no HTML
    >
      {/* Pricing Toggle - Sticky at top, z-index 0 (abaixo dos cards) */}
      <div 
        className="sticky flex justify-center pointer-events-none"
        style={{ 
          top: '20px',
          zIndex: 0,
          height: `${TAB_HEIGHT}px`,
          marginBottom: `${TAB_MARGIN}px`,
        }}
      >
        <div 
          className="flex p-1 rounded-full shadow-sm pointer-events-auto"
          style={{ background: '#e0e0e0' }}
        >
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`
              px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center
              ${billingCycle === "monthly" 
                ? "bg-white text-black shadow-md" 
                : "bg-transparent text-gray-500"
              }
            `}
          >
            Mensal
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`
              px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-1.5
              ${billingCycle === "annual" 
                ? "bg-white text-black shadow-md" 
                : "bg-transparent text-gray-500"
              }
            `}
          >
            Anual
            <span className="text-[#00A650] font-normal text-[11px]">15% OFF</span>
          </button>
        </div>
      </div>

      {/* Stack Container */}
      <div className="px-4 max-w-[500px] mx-auto">
        {mobilePlans.map((plan, index) => {
          const isStuck = stuckCards.has(plan.id);
          const pricing = billingCycle === "monthly" ? plan.monthly : plan.annual;
          const cardTop = getCardTop(index);
          const cardZIndex = getCardZIndex(index);
          const isMega = plan.highlighted;
          
          return (
            <div
              key={plan.id}
              data-mobile-plan-card={plan.id}
              className={`
                sticky bg-white rounded-3xl overflow-hidden
                flex flex-col mb-4
                ${isMega ? "border border-[#A90F90]" : "border border-black/[0.08]"}
              `}
              style={{
                top: `${cardTop}px`,
                zIndex: cardZIndex,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
            >
              {/* Card Header */}
              <div 
                className={`
                  px-5 flex items-center justify-between border-b border-gray-100
                  cursor-pointer transition-all duration-300 shrink-0
                  ${isStuck ? "bg-[#f5f5f5]" : "bg-[#fafafa]"}
                `}
                style={{ height: `${HEADER_HEIGHT}px` }}
              >
                <div className="flex items-center gap-2">
                  <span className="font-extrabold italic text-[#A90F90]">meli+</span>
                  <span className="font-bold text-[#2D3277] uppercase text-sm">{plan.name}</span>
                </div>
                
                <div className="text-right flex items-center justify-end">
                  {isMega ? (
                    // Mega card always shows badge
                    <span className="text-[#00A650] font-bold text-xs uppercase block">
                      {plan.badge}
                    </span>
                  ) : (
                    // Other cards show price when stuck
                    <span 
                      className={`
                        text-base font-bold text-gray-800 transition-all duration-300
                        ${isStuck ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2.5"}
                      `}
                    >
                      {pricing.price}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 bg-white flex-1 flex flex-col">
                {/* Pricing Display */}
                {isMega ? (
                  // Mega pricing with promo - seguindo exatamente o HTML
                  <div className="mb-2">
                    <div className="flex items-center gap-2.5 mb-1">
                      <span className="line-through text-gray-400 text-base">
                        {pricing.originalPrice}
                      </span>
                      <span className="text-[#00A650] font-bold text-base">
                        {pricing.discount}
                      </span>
                    </div>
                    <div className="text-[42px] font-semibold text-gray-800 leading-none">
                      {pricing.price}
                      <span className="text-base font-normal text-gray-500 ml-1">
                        {pricing.period}
                      </span>
                    </div>
                  </div>
                ) : (
                  // Standard pricing
                  <div className="mb-2">
                    {pricing.originalPrice && (
                      <div className="flex items-center gap-2.5 mb-1">
                        <span className="line-through text-gray-400 text-base">
                          {pricing.originalPrice}
                        </span>
                        <span className="text-[#00A650] font-bold text-base">
                          {pricing.discount}
                        </span>
                      </div>
                    )}
                    <div className="text-[42px] font-semibold text-gray-800 leading-none">
                      {pricing.price}
                      <span className="text-base font-normal text-gray-500 ml-1">
                        {pricing.period}
                      </span>
                    </div>
                  </div>
                )}

                {/* Description */}
                <p className="text-gray-500 leading-relaxed mb-0 text-[15px]">
                  {plan.description}
                </p>

                {/* CTA Button and Details */}
                <div className="flex items-center gap-3 mt-6">
                  <button 
                    className="flex-none w-[54px] h-[54px] rounded-xl border-2 border-[#3483FA] text-[#3483FA] flex items-center justify-center shrink-0 hover:bg-[#3483FA]/5 transition-colors"
                    title="Ver detalhes"
                  >
                    <Info className="w-6 h-6" />
                  </button>
                  <a
                    href={`https://www.mercadolivre.com.br/assinaturas/melimais/planos?plan_selected=${plan.slug.toUpperCase()}#origin=redirect-vdp-meliplus`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-b from-[#65a5ff] to-[#3483fa] text-white py-4 rounded-xl font-semibold text-base text-center block shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    Assinar {plan.name}
                  </a>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Card Espaçador invisível - garante scroll suficiente como no HTML */}
        <div 
          className="sticky opacity-0 pointer-events-none"
          style={{
            top: `${TOP_AREA_SPACE + (HEADER_HEIGHT * 3)}px`,
            zIndex: 4,
            height: '200px',
          }}
        />
      </div>
    </div>
  );
}
