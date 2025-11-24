'use client';

import React from "react";
import { CheckCircle2 } from "lucide-react";
import AndesButton from "./AndesButton";

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  priceCents: string;
  originalPrice?: number;
  discount?: string;
  period?: string;
  highlight?: boolean;
  badge?: string;
  badgeColor?: string;
  features: string[];
  buttonText: string;
  buttonVariant?: "action" | "primary" | "transparent" | "link";
}

interface AndesMeliPricingComparisonProps {
  title: string;
  subtitle?: string;
  plans: PricingPlan[];
  className?: string;
}

const AndesMeliPricingComparison: React.FC<AndesMeliPricingComparisonProps> = ({
  title,
  subtitle,
  plans,
  className,
}) => {
  return (
    <div className={className}>
      {/* Container cinza com os cards */}
      <div className="rounded-lg bg-gray-100 p-6">
        {/* Título e Subtítulo dentro do container cinza */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#333333]">{title}</h2>
          {subtitle && (
            <p className="text-sm text-[#666666]">{subtitle}</p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="rounded-lg bg-white p-6"
            >
              {/* Header com Título e Badge */}
              <div className="mb-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-[#333333]">{plan.name}</h3>
                  {plan.badge && (
                    <span
                      className={`inline-block rounded px-2 py-1 text-xs font-bold text-white ${
                        plan.badgeColor || "bg-[#ff3333]"
                      }`}
                    >
                      {plan.badge}
                    </span>
                  )}
                </div>

                {/* Preço */}
                <div className="mb-2">
                  {plan.originalPrice && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm line-through text-[#999999]">
                        R$ {plan.originalPrice.toFixed(2).replace(".", ",")}
                      </span>
                      {plan.discount && (
                        <span className="text-sm font-bold text-[#00a650]">
                          {plan.discount}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-[#333333]">
                      R$ {plan.price}
                    </span>
                    <span className="text-xs text-[#999999]">
                      ,{plan.priceCents}
                    </span>
                    {plan.period && (
                      <span className="text-xs text-[#999999]">{plan.period}</span>
                    )}
                  </div>
                </div>

                {/* Descrição do período se houver */}
                {plan.period && (
                  <p className="text-xs text-[#999999]">
                    {plan.price} reais com {plan.priceCents} centavos por mês
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6 text-sm text-[#666666]">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-[#3483fa]"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Botão */}
              <button
                className="w-full rounded-lg bg-[#3483fa] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2a68d9]"
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AndesMeliPricingComparison;
