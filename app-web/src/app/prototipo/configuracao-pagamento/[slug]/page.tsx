"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Info, X } from "lucide-react";
import { getPaymentFlowBySlug, PaymentFlowEntry } from "@/lib/payment-flows";
import PaymentConfigPrototype from "./PaymentConfigPrototype";

export default function PaymentFlowViewerPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
  const [currentPaymentFlow, setCurrentPaymentFlow] = useState<PaymentFlowEntry | null>(null);
  const [hideHeader, setHideHeader] = useState(false);

  useEffect(() => {
    const pf = getPaymentFlowBySlug(slug);
    if (pf) {
      setCurrentPaymentFlow(pf);
    } else {
      router.push("/prototipo");
    }
  }, [slug, router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsInfoPanelOpen(false);
      } else if (e.key === "i" || e.key === "I") {
        setIsInfoPanelOpen((prev) => !prev);
      } else if (e.key === "h" || e.key === "H") {
        setHideHeader((prev) => !prev);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!currentPaymentFlow) {
    return null;
  }

  const getStatusStyles = (status: PaymentFlowEntry["status"]) => {
    const styles = {
      draft: "bg-gray-500/20 text-gray-300",
      ready: "bg-green-500/20 text-green-400",
      testing: "bg-yellow-500/20 text-yellow-400",
    };
    return styles[status];
  };

  const getStatusLabel = (status: PaymentFlowEntry["status"]) => {
    const labels = {
      draft: "Rascunho",
      ready: "Pronto",
      testing: "Em teste",
    };
    return labels[status];
  };

  return (
    <div className="bg-[#2D3277] min-h-screen relative overflow-hidden">
      {/* Header - Press H to toggle visibility */}
      <header 
        className={`bg-white/95 backdrop-blur-sm border-b border-gray-200 ${hideHeader ? 'hidden' : ''}`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left: Back button and title */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/prototipo")}
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 w-10 h-10 text-gray-700 transition hover:bg-gray-50"
              aria-label="Voltar para protótipos"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <div className="h-6 w-px bg-gray-200" />
            
            <div>
              <h1 className="text-[#2D3277] font-semibold text-lg leading-tight">
                {currentPaymentFlow.title}
              </h1>
              <p className="text-gray-500 text-sm">
                Protótipo • Configuração de Pagamento
              </p>
            </div>
          </div>

          {/* Right: Info button */}
          <div className="flex items-center gap-3">
            {/* Keyboard shortcuts info */}
            <div className="hidden md:flex items-center gap-2 text-xs text-gray-500 mr-2">
              <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300 font-mono">H</kbd>
              <span>Esconder</span>
              <span className="text-gray-300">|</span>
              <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300 font-mono">I</kbd>
              <span>Info</span>
            </div>

            <div className="h-6 w-px bg-gray-200 hidden md:block" />

            <button
              onClick={() => setIsInfoPanelOpen(!isInfoPanelOpen)}
              className={`
                p-2 rounded-lg transition-all duration-200
                ${isInfoPanelOpen 
                  ? "bg-[#FFE600] text-[#2D3277]" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }
              `}
              aria-label={isInfoPanelOpen ? "Fechar informações" : "Abrir informações"}
              title="Pressione 'I' para alternar"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="w-full bg-white overflow-y-auto min-h-screen">
        {/* Prototype display area - Full width */}
        <div className="w-full">
          <PaymentConfigPrototype />
        </div>
      </main>

      {/* Floating Info Panel - Overlays on the right */}
      <div
        className={`
          fixed right-0 w-[400px] max-w-[90vw]
          bg-white/95 backdrop-blur-md border-l border-gray-200
          transform transition-all duration-300 ease-out z-[2000]
          ${isInfoPanelOpen ? "translate-x-0" : "translate-x-full"}
          top-0 h-screen
        `}
      >
          {/* Panel Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-[#2D3277] font-semibold">Informações</h2>
            <button
              onClick={() => setIsInfoPanelOpen(false)}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-[#2D3277] transition-colors"
              aria-label="Fechar painel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Panel Content */}
          <div className="p-6 overflow-y-auto h-[calc(100%-57px)] no-scrollbar">
            {/* Status badge */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(currentPaymentFlow.status)}`}>
                {getStatusLabel(currentPaymentFlow.status)}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-600">
                Protótipo Interativo
              </span>
            </div>

            {/* Title */}
            <h3 className="text-[#2D3277] text-xl font-bold mb-3">
              {currentPaymentFlow.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {currentPaymentFlow.description}
            </p>
        </div>
      </div>

      {/* Overlay backdrop when panel is open (mobile) */}
      {isInfoPanelOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setIsInfoPanelOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
