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

// ============ STYLES ============
const styles = {
  // CSS Variables
  primaryBlue: "#3483FA",
  primaryPurple: "#A90F90",
  meliGreen: "#00A650",
  bgGray: "#EFEFEF",
  white: "#FFFFFF",
  cardRadius: "24px",
  headerHeight: 56, // Altura do header de cada card
  toggleHeight: 48, // Altura do toggle sticky (reduced)
  
  // Stuck offsets para empilhamento mais compacto
  stuckOffset1: 0,
  stuckOffset2: -8,
  stuckOffset3: -16,
};

// ============ COMPONENT ============
export default function MobilePriceTable() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [stuckCards, setStuckCards] = useState<Set<string>>(new Set());
  const [allStuck, setAllStuck] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLElement | Window | null>(null);

  // Find the scrollable parent container - improved detection
  const findScrollContainer = useCallback((element: HTMLElement | null): HTMLElement | Window => {
    if (!element) return window;
    
    let current: HTMLElement | null = element.parentElement;
    while (current && current !== document.body && current !== document.documentElement) {
      const style = window.getComputedStyle(current);
      const overflowY = style.overflowY;
      const hasScroll = current.scrollHeight > current.clientHeight;
      
      if ((overflowY === 'auto' || overflowY === 'scroll') && hasScroll) {
        return current;
      }
      current = current.parentElement;
    }
    return window;
  }, []);

  // Check which cards are stuck - improved detection
  const checkSticky = useCallback(() => {
    const cards = document.querySelectorAll('[data-mobile-plan-card]');
    const newStuckCards = new Set<string>();
    let stuckCount = 0;
    
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(card);
      const topValue = parseFloat(computedStyle.top);
      
      // Card is stuck when its top position is at or near the sticky top value
      // Adding a tolerance of 10px for better detection in different scroll contexts
      if (rect.top <= topValue + 10) {
        const id = card.getAttribute('data-mobile-plan-card');
        if (id) {
          newStuckCards.add(id);
          stuckCount++;
        }
      }
    });
    
    setStuckCards(newStuckCards);
    // When all 3 cards are stuck, they should move together
    setAllStuck(stuckCount === 3);
  }, []);

  useEffect(() => {
    // Find and store scroll container
    scrollContainerRef.current = findScrollContainer(containerRef.current);
    
    const scrollTarget = scrollContainerRef.current;
    
    // Add scroll listener to the correct container
    if (scrollTarget === window) {
      window.addEventListener('scroll', checkSticky, { passive: true });
    } else if (scrollTarget instanceof HTMLElement) {
      scrollTarget.addEventListener('scroll', checkSticky, { passive: true });
    }
    
    // Initial check
    checkSticky();
    
    // Cleanup
    return () => {
      if (scrollTarget === window) {
        window.removeEventListener('scroll', checkSticky);
      } else if (scrollTarget instanceof HTMLElement) {
        scrollTarget.removeEventListener('scroll', checkSticky);
      }
    };
  }, [checkSticky, findScrollContainer]);

  // Calculate top position for each card
  // Cards stack below the toggle (which is at top: 0)
  const getCardTop = (index: number) => {
    // Base offset for the first card (toggle height + smaller spacing)
    const baseOffset = styles.toggleHeight + 12;
    // Each subsequent card is offset by the header height of the previous cards
    return baseOffset + (styles.headerHeight * index);
  };

  const getStuckOffset = (index: number) => {
    switch (index) {
      case 0: return styles.stuckOffset1;
      case 1: return styles.stuckOffset2;
      case 2: return styles.stuckOffset3;
      default: return 0;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="pb-4"
    >
      {/* Pricing Toggle - Sticky at top */}
      <div 
        className={`sticky top-0 z-[100] py-2 flex justify-center transition-colors duration-200 ${allStuck ? 'bg-white' : 'bg-transparent'}`}
        style={{ height: `${styles.toggleHeight}px` }}
      >
        <div className="flex bg-white border border-gray-200 p-1 rounded-full shadow-sm items-center">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`
              px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center
              ${billingCycle === "monthly" 
                ? "bg-[#EFEFEF] text-gray-900" 
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
                ? "bg-[#EFEFEF] text-gray-900" 
                : "bg-transparent text-gray-500"
              }
            `}
          >
            Anual
            <span className="text-[#00A650] font-bold text-xs">15% OFF</span>
          </button>
        </div>
      </div>

      {/* Stack Container */}
      <div className="px-4 max-w-[500px] mx-auto">
        {mobilePlans.map((plan, index) => {
          const isStuck = stuckCards.has(plan.id);
          const isLast = index === mobilePlans.length - 1;
          const pricing = billingCycle === "monthly" ? plan.monthly : plan.annual;
          const cardTop = getCardTop(index);
          
          return (
            <div
              key={plan.id}
              data-mobile-plan-card={plan.id}
              className={`
                sticky bg-white rounded-3xl shadow-lg overflow-hidden
                flex flex-col transition-transform duration-200
                ${plan.highlighted ? "border-2 border-[#A90F90]" : "border border-gray-200"}
                ${isLast ? "mb-6" : "mb-3"}
              `}
              style={{
                top: `${cardTop}px`,
                zIndex: (index + 1) * 10,
                minHeight: isLast ? 'auto' : `calc(${styles.headerHeight}px + 200px)`,
                transform: isStuck ? `translateY(${getStuckOffset(index)}px)` : 'translateY(0)',
                boxShadow: isStuck 
                  ? '0 10px 40px rgba(0,0,0,0.15)' 
                  : '0 4px 12px rgba(0,0,0,0.08)',
              }}
            >
              {/* Card Header */}
              <div 
                className={`
                  px-5 flex items-center justify-between border-b border-gray-100
                  cursor-pointer transition-all duration-300
                  ${isStuck ? "bg-gray-100" : "bg-gray-50"}
                `}
                style={{ height: `${styles.headerHeight}px` }}
              >
                <div className="flex items-center gap-2">
                  <span className="font-extrabold italic text-[#A90F90]">meli+</span>
                  <span className="font-bold text-[#2D3277] uppercase text-sm">{plan.name}</span>
                </div>
                
                <div className="text-right flex items-center justify-end">
                  {plan.highlighted ? (
                    // Mega card always shows badge
                    <span className="text-[#00A650] font-bold text-xs uppercase">
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
                {plan.highlighted ? (
                  // Mega pricing with promo
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
                <p className="text-gray-500 leading-relaxed mb-6 text-[15px]">
                  {plan.description}
                </p>

                {/* CTA Button and Details */}
                <div className="flex items-center gap-3">
                  <button 
                    className="w-12 h-12 rounded-xl border-2 border-[#3483FA] text-[#3483FA] flex items-center justify-center shrink-0 hover:bg-[#3483FA]/5 transition-colors"
                    title="Ver detalhes"
                  >
                    <Info className="w-5 h-5" />
                  </button>
                  <a
                    href={`https://www.mercadolivre.com.br/assinaturas/melimais/planos?plan_selected=${plan.slug.toUpperCase()}#origin=redirect-vdp-meliplus`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#3483FA] text-white py-4 rounded-xl font-semibold text-base text-center block hover:bg-[#2968c8] transition-colors"
                  >
                    Assinar {plan.name}
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
