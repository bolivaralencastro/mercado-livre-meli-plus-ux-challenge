"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Info, X, Monitor, Smartphone, Workflow, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { getPaymentFlowBySlug, PaymentFlowEntry } from "@/lib/payment-flows";
import PaymentConfigPrototype from "./PaymentConfigPrototype";

type ViewMode = "desktop" | "mobile" | "flowchart";

// Simple Zoom/Pan component for Flowchart
function FlowchartViewer({ url }: { url: string }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="w-full h-full overflow-hidden bg-[#f0f2f5] cursor-move relative flex items-center justify-center"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="absolute top-8 right-8 flex flex-col gap-2 z-10">
        <div className="bg-white rounded-lg shadow-lg p-1 flex flex-col gap-1">
          <button 
            onClick={() => setScale(s => Math.min(s + 0.1, 5))} 
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-gray-600"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <div className="h-px bg-gray-200 mx-1" />
          <button 
            onClick={() => setScale(s => Math.max(0.1, s - 0.1))} 
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-gray-600"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <div className="h-px bg-gray-200 mx-1" />
          <button 
            onClick={() => { setScale(1); setPosition({x:0,y:0}); }} 
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-gray-600"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
        <div className="bg-white/80 backdrop-blur px-2 py-1 rounded text-xs font-medium text-center shadow-sm">
          {Math.round(scale * 100)}%
        </div>
      </div>
      
      <div 
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: 'center center',
          transition: isDragging ? 'none' : 'transform 0.1s ease-out'
        }}
        className="flex items-center justify-center min-w-full min-h-full p-20"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={url} 
          alt="Flowchart" 
          className="max-w-none pointer-events-none shadow-2xl bg-white rounded-lg"
          draggable={false}
        />
      </div>
    </div>
  );
}

export default function PaymentFlowViewerPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
  const [currentPaymentFlow, setCurrentPaymentFlow] = useState<PaymentFlowEntry | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const [hideHeader, setHideHeader] = useState(false);

  useEffect(() => {
    const pf = getPaymentFlowBySlug(slug);
    if (pf) {
      setCurrentPaymentFlow(pf);
      // Default to mobile if desktop is not supported
      if (pf.supportedModes && !pf.supportedModes.includes("desktop")) {
        setViewMode("mobile");
      }
    } else {
      router.push("/prototipo");
    }
  }, [slug, router]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '1' && (!currentPaymentFlow?.supportedModes || currentPaymentFlow.supportedModes.includes('desktop'))) setViewMode('desktop');
      if (e.key === '2' && (!currentPaymentFlow?.supportedModes || currentPaymentFlow.supportedModes.includes('mobile'))) setViewMode('mobile');
      if (e.key === '3' && (!currentPaymentFlow?.supportedModes || currentPaymentFlow.supportedModes.includes('flowchart'))) setViewMode('flowchart');
      
      if (e.key === 'm' || e.key === 'M') {
         // Toggle logic needs to be smarter if desktop is disabled
         if (currentPaymentFlow?.supportedModes && !currentPaymentFlow.supportedModes.includes('desktop')) {
            // If desktop is disabled, maybe toggle between mobile and flowchart? Or just do nothing for 'm' (which usually toggles desktop/mobile)
         } else {
            setViewMode((prev) => prev === "desktop" ? "mobile" : "desktop");
         }
      }
      if (e.key === "Escape") setIsInfoPanelOpen(false);
      if (e.key === "i" || e.key === "I") setIsInfoPanelOpen((prev) => !prev);
      if (e.key === "h" || e.key === "H") setHideHeader((prev) => !prev);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPaymentFlow?.supportedModes]);

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
    <div className="min-h-screen bg-gray-100 flex flex-col relative overflow-hidden">
      {/* Header */}
      <header className={`bg-white px-6 py-3 border-b border-gray-200 flex items-center justify-between sticky top-0 z-50 ${hideHeader ? 'hidden' : ''}`}>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push("/prototipo")}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Voltar para lista"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="font-semibold text-gray-900">{currentPaymentFlow.title}</h1>
            <p className="text-xs text-gray-500">Protótipo de Configuração de Pagamento</p>
          </div>
        </div>

        {/* View Mode Toggles */}
        <div className="flex bg-gray-100 p-1 rounded-lg gap-1">
          <button
            onClick={() => setViewMode("desktop")}
            disabled={currentPaymentFlow.supportedModes?.includes("desktop") === false}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === "desktop" 
                ? "bg-white text-blue-600 shadow-sm" 
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
            } ${currentPaymentFlow.supportedModes?.includes("desktop") === false ? "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-gray-500" : ""}`}
            title="Visualização Desktop (1)"
          >
            <Monitor className="w-4 h-4" />
            <span className="hidden sm:inline">Web</span>
          </button>
          <button
            onClick={() => setViewMode("mobile")}
            disabled={currentPaymentFlow.supportedModes?.includes("mobile") === false}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === "mobile" 
                ? "bg-white text-blue-600 shadow-sm" 
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
            } ${currentPaymentFlow.supportedModes?.includes("mobile") === false ? "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-gray-500" : ""}`}
            title="Visualização Mobile (2)"
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
          <button
            onClick={() => setViewMode("flowchart")}
            disabled={currentPaymentFlow.supportedModes?.includes("flowchart") === false}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === "flowchart" 
                ? "bg-white text-blue-600 shadow-sm" 
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
            } ${currentPaymentFlow.supportedModes?.includes("flowchart") === false ? "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-gray-500" : ""}`}
            title="Visualizar Fluxograma (3)"
          >
            <Workflow className="w-4 h-4" />
            <span className="hidden sm:inline">Fluxo</span>
          </button>
        </div>

        <button 
          onClick={() => setIsInfoPanelOpen(!isInfoPanelOpen)}
          className={`p-2 rounded-full transition-colors ${isInfoPanelOpen ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100 text-gray-500'}`}
          title="Informações do fluxo"
        >
          <Info className="w-5 h-5" />
        </button>
      </header>

      {/* Main Content Area */}
      <main 
        className={`
          flex-1 relative overflow-hidden flex flex-col transition-all duration-300
          ${viewMode === "mobile" 
            ? "bg-[#1a1a2e] items-center justify-center py-8 px-4" 
            : viewMode === "flowchart"
              ? "bg-[#f0f2f5]"
              : "bg-gray-100"
          }
        `}
      >
        {viewMode === "desktop" && (
          <div className="flex-1 overflow-auto bg-gray-100 w-full">
            <div className="min-h-full">
              <PaymentConfigPrototype />
            </div>
          </div>
        )}

        {viewMode === "mobile" && (
          <div className="flex flex-col items-center">
            {/* Phone Frame */}
            <div 
              className="relative bg-[#1c1c1e] rounded-[50px] p-3 shadow-2xl"
              style={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.1)",
              }}
            >
              {/* Notch / Dynamic Island */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-[#1c1c1e] rounded-b-3xl z-10 flex items-center justify-center">
                <div className="w-[80px] h-[25px] bg-black rounded-full" />
              </div>
              
              {/* Screen */}
              <div 
                className="bg-white rounded-[38px] overflow-hidden relative"
                style={{
                  width: "375px",
                  height: "calc(100vh - 180px)",
                  maxHeight: "812px",
                  minHeight: "600px",
                }}
              >
                <iframe
                  src={`/prototipo/configuracao-pagamento/${slug}/standalone`}
                  className="w-full h-full border-none"
                  title="Mobile Preview"
                />
              </div>
              
              {/* Home Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-white/30 rounded-full" />
            </div>
            
            {/* Device label */}
            <p className="mt-4 text-gray-400 text-sm">
              iPhone 14 Pro • 375 × 812
            </p>
          </div>
        )}

        {viewMode === "flowchart" && (
          <div className="flex-1 bg-white relative w-full h-full">
            {currentPaymentFlow.flowchartUrl ? (
              <FlowchartViewer url={currentPaymentFlow.flowchartUrl} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
                <Workflow className="w-16 h-16 opacity-20" />
                <p>Fluxograma não disponível para este protótipo</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Floating Info Panel - Overlays on the right */}
      <div
        className={`
          fixed right-0 w-[400px] max-w-[90vw]
          bg-white/95 backdrop-blur-md border-l border-gray-200
          transform transition-all duration-300 ease-out z-[2000]
          ${isInfoPanelOpen ? "translate-x-0" : "translate-x-full"}
          top-0 h-screen shadow-2xl
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

            <div className="grid grid-cols-1 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="font-medium text-gray-900 block mb-1">Cenário</span>
                <span className="text-gray-600">{currentPaymentFlow.scenario}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="font-medium text-gray-900 block mb-1">Objetivo</span>
                <span className="text-gray-600">{currentPaymentFlow.objective}</span>
              </div>
            </div>
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