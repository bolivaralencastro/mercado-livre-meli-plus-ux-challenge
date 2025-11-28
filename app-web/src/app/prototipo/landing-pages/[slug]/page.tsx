"use client";

import { useRouter, useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Info, X, Monitor, Smartphone } from "lucide-react";
import { landingPages, getLandingPageBySlug, LandingPageEntry } from "@/lib/landing-pages";
import OfertaMonoliticaPage from "@/components/landing-pages/OfertaMonolitica";
import CinemaPage from "@/components/landing-pages/Cinema";
import FinancasPage from "@/components/landing-pages/Financas";
import LogisticaPage from "@/components/landing-pages/Logistica";

type ViewMode = "desktop" | "mobile";

export default function LandingPageViewerPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
  const [currentLandingPage, setCurrentLandingPage] = useState<LandingPageEntry | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hideHeader, setHideHeader] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");

  useEffect(() => {
    const lp = getLandingPageBySlug(slug);
    if (lp) {
      setCurrentLandingPage(lp);
      const index = landingPages.findIndex((p) => p.slug === slug);
      setCurrentIndex(index >= 0 ? index : 0);
    } else {
      router.push("/prototipo");
    }
  }, [slug, router]);

  const navigateTo = useCallback((direction: "prev" | "next") => {
    const newIndex = direction === "prev" 
      ? (currentIndex - 1 + landingPages.length) % landingPages.length
      : (currentIndex + 1) % landingPages.length;
    
    router.push(`/prototipo/landing-pages/${landingPages[newIndex].slug}`);
  }, [currentIndex, router]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsInfoPanelOpen(false);
    } else if (e.key === "ArrowLeft") {
      navigateTo("prev");
    } else if (e.key === "ArrowRight") {
      navigateTo("next");
    } else if (e.key === "i" || e.key === "I") {
      setIsInfoPanelOpen((prev) => !prev);
    } else if (e.key === "h" || e.key === "H") {
      setHideHeader((prev) => !prev);
    } else if (e.key === "m" || e.key === "M") {
      setViewMode((prev) => prev === "desktop" ? "mobile" : "desktop");
    }
  }, [navigateTo]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!currentLandingPage) {
    return null;
  }

  const getCategoryLabel = (category: LandingPageEntry["category"]) => {
    const labels = {
      aquisicao: "Aquisição",
      retencao: "Retenção",
      upgrade: "Upgrade",
    };
    return labels[category];
  };

  const getStatusStyles = (status: LandingPageEntry["status"]) => {
    const styles = {
      draft: "bg-gray-500/20 text-gray-300",
      ready: "bg-green-500/20 text-green-400",
      testing: "bg-yellow-500/20 text-yellow-400",
    };
    return styles[status];
  };

  const getStatusLabel = (status: LandingPageEntry["status"]) => {
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
                {currentLandingPage.title}
              </h1>
              <p className="text-gray-500 text-sm">
                Landing Page • {getCategoryLabel(currentLandingPage.category)}
              </p>
            </div>
          </div>

          {/* Right: View mode toggle, Info button, pagination, and navigation */}
          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("desktop")}
                className={`
                  p-2 rounded-md transition-all duration-200 flex items-center gap-1.5
                  ${viewMode === "desktop" 
                    ? "bg-white text-[#2D3277] shadow-sm" 
                    : "text-gray-500 hover:text-gray-700"
                  }
                `}
                aria-label="Visualizar em desktop"
                title="Desktop (M para alternar)"
              >
                <Monitor className="w-4 h-4" />
                <span className="text-xs font-medium hidden sm:inline">Desktop</span>
              </button>
              <button
                onClick={() => setViewMode("mobile")}
                className={`
                  p-2 rounded-md transition-all duration-200 flex items-center gap-1.5
                  ${viewMode === "mobile" 
                    ? "bg-white text-[#2D3277] shadow-sm" 
                    : "text-gray-500 hover:text-gray-700"
                  }
                `}
                aria-label="Visualizar em mobile"
                title="Mobile (M para alternar)"
              >
                <Smartphone className="w-4 h-4" />
                <span className="text-xs font-medium hidden sm:inline">Mobile</span>
              </button>
            </div>

            <div className="h-6 w-px bg-gray-200" />

            {/* Keyboard shortcuts info */}
            <div className="hidden lg:flex items-center gap-2 text-xs text-gray-500 mr-2">
              <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300 font-mono">H</kbd>
              <span>Esconder</span>
              <span className="text-gray-300">|</span>
              <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300 font-mono">M</kbd>
              <span>Mobile</span>
              <span className="text-gray-300">|</span>
              <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300 font-mono">I</kbd>
              <span>Info</span>
              <span className="text-gray-300">|</span>
              <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300 font-mono">←</kbd>
              <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300 font-mono">→</kbd>
              <span>Navegar</span>
            </div>

            <div className="h-6 w-px bg-gray-200 hidden lg:block" />

            {/* Info button */}
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

            <div className="h-6 w-px bg-gray-200" />

            {/* Pagination */}
            <span className="text-gray-500 text-sm tabular-nums">
              {currentIndex + 1} / {landingPages.length}
            </span>

            {/* Navigation arrows */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => navigateTo("prev")}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                aria-label="Anterior"
                title="Seta esquerda"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigateTo("next")}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                aria-label="Próxima"
                title="Seta direita"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main 
        className={`
          w-full min-h-screen transition-all duration-300
          ${viewMode === "mobile" 
            ? "bg-[#1a1a2e] flex items-start justify-center py-8 px-4" 
            : "bg-white overflow-y-auto"
          }
        `}
      >
        {viewMode === "desktop" ? (
          /* Desktop view - Full width */
          <div className="w-full">
            {currentLandingPage.slug === 'oferta-monolitica' && <OfertaMonoliticaPage />}
            {currentLandingPage.slug === 'cinema' && <CinemaPage />}
            {currentLandingPage.slug === 'financas' && <FinancasPage />}
            {currentLandingPage.slug === 'logistica' && <LogisticaPage />}
          </div>
        ) : (
          /* Mobile view - Phone frame */
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
                  src={`/prototipo/landing-pages/${currentLandingPage.slug}/standalone`}
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
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(currentLandingPage.status)}`}>
                {getStatusLabel(currentLandingPage.status)}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-600">
                {getCategoryLabel(currentLandingPage.category)}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-[#2D3277] text-xl font-bold mb-3">
              {currentLandingPage.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {currentLandingPage.description}
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
