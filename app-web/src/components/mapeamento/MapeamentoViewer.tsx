'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapeamentoFlow } from '@/lib/mapeamento-flows';
import { Search, ArrowLeft, Layout, Eye, MousePointerClick, CreditCard, AlertTriangle } from 'lucide-react';
import MeliPlusLP from '@/components/redesigns/MeliPlusLP';
import PaymentRegistrationFlow from '@/components/redesigns/PaymentRegistrationFlow';
import MeliPlusRedesign from '@/components/redesigns/MeliPlusRedesign';

const iconMap: Record<string, React.ElementType> = {
  Layout,
  Eye,
  MousePointerClick,
  CreditCard,
  AlertTriangle,
  Search
};

interface MapeamentoViewerProps {
  flows: MapeamentoFlow[];
  currentSlug: string;
}

export default function MapeamentoViewer({ flows, currentSlug }: MapeamentoViewerProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const index = flows.findIndex((f) => f.slug === currentSlug);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [currentSlug, flows]);

  const navigateToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      const prevFlow = flows[currentIndex - 1];
      router.push(`/pesquisa/mapeamento/${prevFlow.slug}`);
    }
  }, [currentIndex, flows, router]);

  const navigateToNext = useCallback(() => {
    if (currentIndex < flows.length - 1) {
      const nextFlow = flows[currentIndex + 1];
      router.push(`/pesquisa/mapeamento/${nextFlow.slug}`);
    }
  }, [currentIndex, flows, router]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        navigateToPrevious();
      } else if (e.key === "ArrowRight") {
        navigateToNext();
      } else if (e.key === "Escape") {
        router.push("/pesquisa");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigateToPrevious, navigateToNext, router]);

  const currentFlow = flows[currentIndex];

  if (!currentFlow) return null;

  const HeuristicsIcon = iconMap[currentFlow.analysis.heuristicsIcon] || Search;

  const renderComponent = () => {
    switch (currentFlow.slug) {
      case 'landing-page':
        return <MeliPlusLP />;
      case 'configuracao-pagamento':
        return (
            <div className="flex flex-col h-full bg-gray-50 w-full">
              {/* Status Bar simulation */}
              <div className="bg-[#009ee3] h-8 w-full shrink-0"></div>
              
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto no-scrollbar w-full">
                  <PaymentRegistrationFlow />
                  <div className="h-8"></div> {/* Spacer for home indicator */}
              </div>
            </div>
        );
      case 'redesign-meli-plus':
        return <MeliPlusRedesign />;
      default:
        return <div>Componente não encontrado</div>;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Header fixo no topo */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm h-[73px]">
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={() => router.push("/pesquisa")}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 w-10 h-10 text-gray-700 transition hover:bg-gray-50"
            aria-label="Voltar"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div>
            <div className="flex items-baseline gap-3">
              <h1 className="text-xl font-semibold text-gray-900">
                {currentFlow.title}
              </h1>
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase tracking-wide border border-gray-200">
                {currentFlow.subtitle}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-600">
            {currentIndex + 1} / {flows.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={navigateToPrevious}
              disabled={currentIndex === 0}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Anterior"
            >
              ‹
            </button>
            <button
              onClick={navigateToNext}
              disabled={currentIndex === flows.length - 1}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Próximo"
            >
              ›
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pt-[73px] h-full overflow-hidden min-h-0">
        <div className="grid grid-cols-12 h-full min-h-0">
          
          {/* --- COLUNA 1 (ESQUERDA - 75%): VISUAIS --- */}
          <div className={`col-span-9 h-full border-r border-gray-200 shadow-inner bg-gray-100 ${currentFlow.type === 'desktop' ? 'overflow-y-auto no-scrollbar p-8' : 'flex items-center justify-center p-4 overflow-hidden'}`}>
            {currentFlow.type === 'desktop' ? (
                <div className="max-w-6xl mx-auto w-full">
                    {/* Browser/Device Frame Header - Only for Desktop */}
                    <div className="bg-white rounded-t-xl border-t border-x border-gray-300 p-2 flex items-center gap-2 shadow-sm">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <div className="bg-gray-50 text-xs text-gray-500 px-3 py-1 rounded-md flex-1 text-center font-mono border border-gray-100">
                            mercadolivre.com.br/meli-plus
                        </div>
                    </div>
                    
                    {/* Component Render */}
                    <div className="border-x border-b border-gray-300 shadow-lg rounded-b-xl overflow-hidden bg-white">
                        {renderComponent()}
                    </div>
                </div>
            ) : (
                /* Mobile View - Render directly without browser frame */
                <div className="w-full h-full flex items-center justify-center p-4">
                    <div className="relative h-full max-h-[850px] aspect-[9/19.5] bg-white rounded-[2.5rem] border-[8px] border-gray-800 overflow-hidden shadow-2xl flex flex-col">
                        {/* Notch simulation */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-50 pointer-events-none"></div>
                        
                        {/* Screen Content */}
                        <div className="flex-1 w-full h-full overflow-hidden relative">
                            {renderComponent()}
                        </div>

                        {/* Home Indicator */}
                        <div className="absolute bottom-0 left-0 right-0 h-6 w-full flex justify-center items-center pb-2 pointer-events-none z-50">
                            <div className="w-32 h-1 bg-gray-300 rounded-full shadow-sm"></div>
                        </div>
                    </div>
                </div>
            )}
          </div>

          {/* --- COLUNA 2 (DIREITA - 25%): PAINEL DE ANÁLISE --- */}
          <div className="col-span-3 h-full overflow-y-auto no-scrollbar bg-white p-6 border-l border-gray-200">
            <div className="space-y-6">
                
                {/* Card de Heurísticas */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                    <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <HeuristicsIcon className="w-4 h-4 text-purple-600" />
                        {currentFlow.analysis.heuristicsTitle}
                    </h2>
                    
                    <ul className="space-y-4">
                        {currentFlow.analysis.heuristics.map((item, idx) => {
                            const ItemIcon = iconMap[item.icon] || Search;
                            return (
                                <li key={idx} className="flex gap-3 items-start text-xs text-gray-700 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <ItemIcon className={`w-4 h-4 shrink-0 mt-0.5 ${item.colorClass}`} />
                                    <div>
                                        <strong className="block text-gray-900 mb-1">{item.title}</strong>
                                        <span className="text-gray-600">{item.description}</span>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
