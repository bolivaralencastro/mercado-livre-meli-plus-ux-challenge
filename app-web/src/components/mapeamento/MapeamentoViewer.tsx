'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MapeamentoFlow } from '@/lib/mapeamento-flows';
import { Search, ArrowLeft, Layout, Eye, MousePointerClick, CreditCard, AlertTriangle, ChevronDown, ChevronUp, Lightbulb, AlertCircle, CheckCircle2, Grid3x3, ChevronLeft, ChevronRight } from 'lucide-react';
import assinaturasImage from '@/assets/images/assinaturas-meli-mais.png';
import lpMobileHero from '@/assets/images/lp-mobile-meli-plus-01-hero.png';
import lpMobilePlanos from '@/assets/images/lp-mobile-meli-plus-02-planos.png';
import lpMobileStreaming from '@/assets/images/lp-mobile-meli-plus-03-streaming.png';
import lpMobileFaq from '@/assets/images/lp-mobile-meli-plus-04-faq.png';
import configPagamento01 from '@/assets/images/config-pagamento-01-inbox.png';
import configPagamento02 from '@/assets/images/config-pagamento-02-notificacoes.png';
import configPagamento03 from '@/assets/images/config-pagamento-03-detalhe.png';
import configPagamento04 from '@/assets/images/config-pagamento-04-detalhe-tooltip.png';
import configPagamento05 from '@/assets/images/config-pagamento-05-alterar-pagamento.png';
import configPagamento06 from '@/assets/images/config-pagamento-06-detalhe-mudar.png';
import configPagamento07 from '@/assets/images/config-pagamento-07-detalhe-menu.png';
import configPagamento08 from '@/assets/images/config-pagamento-08-administrar.png';
import configPagamento09 from '@/assets/images/config-pagamento-09-detalhe-final.png';
import configPagamento10 from '@/assets/images/config-pagamento-10-detalhe-success.png';
import mapeamentoAnalysis from '@/lib/mapeamento-analysis.json';

const iconMap: Record<string, React.ElementType> = {
  Layout,
  Eye,
  MousePointerClick,
  CreditCard,
  AlertTriangle,
  Search,
  Lightbulb,
  AlertCircle,
  CheckCircle2
};

// Tipo para as análises detalhadas
interface AnalysisPonto {
  titulo: string;
  critica: string;
  melhoria: string;
}

interface AnalysisSecao {
  titulo: string;
  icone: string;
  corIcone: string;
  problemasPrincipais: string;
  pontos: AnalysisPonto[];
}

interface AnalysisAcao {
  prioridade: string;
  area: string;
  acao: string;
}

interface DetailedAnalysis {
  titulo: string;
  subtitulo: string;
  secoes: AnalysisSecao[];
  acoesPrioritarias: AnalysisAcao[];
  veredito: string;
}

type MapeamentoAnalysisData = {
  [key: string]: DetailedAnalysis;
};

interface MapeamentoViewerProps {
  flows: MapeamentoFlow[];
  currentSlug: string;
}

export default function MapeamentoViewer({ flows, currentSlug }: MapeamentoViewerProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({});
  const [configPagamentoImageIndex, setConfigPagamentoImageIndex] = useState(0);
  const [galleryMode, setGalleryMode] = useState(false);

  // Obter análise detalhada do JSON se disponível
  const analysisData = (mapeamentoAnalysis as MapeamentoAnalysisData)[currentSlug];

  // Array de imagens para o fluxo de configuração de pagamento
  const configPagamentoImages = [
    configPagamento01,
    configPagamento02,
    configPagamento03,
    configPagamento04,
    configPagamento05,
    configPagamento06,
    configPagamento07,
    configPagamento08,
    configPagamento09,
    configPagamento10,
  ];

  const toggleSection = (index: number) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  useEffect(() => {
    const index = flows.findIndex((f) => f.slug === currentSlug);
    if (index !== -1) {
      setCurrentIndex(index);
    }
    // Reset expanded sections when changing flow
    setExpandedSections({});
    setConfigPagamentoImageIndex(0);
    setGalleryMode(false);
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
        return (
          <div className="w-full overflow-y-auto max-h-[calc(100vh-200px)]">
            <Image 
              src={assinaturasImage}
              alt="Assinaturas Meli Mais - Landing Page"
              className="w-full h-auto"
              priority
            />
          </div>
        );
      case 'configuracao-pagamento':
        const currentImage = configPagamentoImages[configPagamentoImageIndex];
        
        if (galleryMode) {
          // MODO GALERIA: Fotos lado a lado com scroll horizontal
          return (
            <div className="w-full h-full overflow-x-auto no-scrollbar">
              <div className="flex gap-4 p-4 h-full">
                {configPagamentoImages.map((img, idx) => (
                  <div 
                    key={idx}
                    className="shrink-0 h-full bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
                    onClick={() => {
                      setConfigPagamentoImageIndex(idx);
                      setGalleryMode(false);
                    }}
                  >
                    <Image 
                      src={img}
                      alt={`Config Pagamento - Imagem ${idx + 1}`}
                      className="h-full w-auto object-contain"
                      priority={idx === configPagamentoImageIndex}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        }
        
        // MODO NORMAL: Visualizador com paginação
        return (
          <div className="flex flex-col h-full w-full">
            {/* Image Container */}
            <div className="flex-1 flex items-center justify-center bg-gray-50 overflow-hidden relative">
              <Image 
                src={currentImage}
                alt={`Config Pagamento - Imagem ${configPagamentoImageIndex + 1}`}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </div>
        );
      case 'redesign-meli-plus':
        return (
          <div className="flex flex-col h-full w-full overflow-y-auto no-scrollbar">
            <Image 
              src={lpMobileHero}
              alt="Meli+ LP Mobile - Hero"
              className="w-full h-auto"
              priority
            />
            <Image 
              src={lpMobilePlanos}
              alt="Meli+ LP Mobile - Planos"
              className="w-full h-auto"
            />
            <Image 
              src={lpMobileStreaming}
              alt="Meli+ LP Mobile - Streaming"
              className="w-full h-auto"
            />
            <Image 
              src={lpMobileFaq}
              alt="Meli+ LP Mobile - FAQ"
              className="w-full h-auto"
            />
          </div>
        );
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
          <div className={`col-span-9 h-full border-r border-gray-200 shadow-inner bg-gray-100 relative ${currentFlow.type === 'desktop' ? 'overflow-y-auto no-scrollbar p-8' : 'flex items-center justify-center p-4 overflow-hidden'}`}>
            
            {/* Controles de visualização (apenas para configuracao-pagamento) */}
            {currentFlow.slug === 'configuracao-pagamento' && (
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10 bg-white rounded-lg border border-gray-200 shadow-sm p-2">
                {/* Botão de visualização em galeria */}
                <button
                  onClick={() => setGalleryMode(!galleryMode)}
                  className={`p-2 rounded transition ${
                    galleryMode 
                      ? 'bg-blue-50 border border-blue-300 text-blue-700' 
                      : 'hover:bg-gray-100 text-gray-700 border border-transparent'
                  }`}
                  title={galleryMode ? 'Voltar à visualização normal' : 'Ver galeria de fotos'}
                >
                  <Grid3x3 size={18} />
                </button>

                {/* Navegação (apenas em modo normal) */}
                {!galleryMode && (
                  <>
                    <div className="h-6 w-px bg-gray-200"></div>
                    <button
                      onClick={() => setConfigPagamentoImageIndex(prev => Math.max(0, prev - 1))}
                      disabled={configPagamentoImageIndex === 0}
                      className="p-2 rounded border border-gray-300 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                      title="Imagem anterior"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    
                    <span className="text-xs font-medium text-gray-600 px-2 min-w-max">
                      {configPagamentoImageIndex + 1}/{configPagamentoImages.length}
                    </span>

                    <button
                      onClick={() => setConfigPagamentoImageIndex(prev => Math.min(configPagamentoImages.length - 1, prev + 1))}
                      disabled={configPagamentoImageIndex === configPagamentoImages.length - 1}
                      className="p-2 rounded border border-gray-300 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                      title="Próxima imagem"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
              </div>
            )}
            
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
                <>
                  {galleryMode ? (
                    /* Modo Galeria: Sem frame de celular, apenas imagens lado a lado */
                    <div className="w-full h-full flex items-center justify-center">
                      {renderComponent()}
                    </div>
                  ) : (
                    /* Modo Normal: Com frame de celular */
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
                </>
            )}
          </div>

          {/* --- COLUNA 2 (DIREITA - 25%): PAINEL DE ANÁLISE --- */}
          <div className="col-span-3 h-full overflow-y-auto no-scrollbar bg-white p-6 border-l border-gray-200">
            <div className="space-y-5">
                
                {/* Se temos análise detalhada do JSON */}
                {analysisData ? (
                  <>
                    {/* Header da Análise */}
                    <div className="pb-4 border-b border-gray-100">
                      <h2 className="text-base font-bold text-gray-900 mb-1">
                        {analysisData.titulo}
                      </h2>
                      <p className="text-xs text-gray-500">
                        {analysisData.subtitulo}
                      </p>
                    </div>

                    {/* Seções de Análise */}
                    {analysisData.secoes.map((secao, secaoIdx) => {
                      const SecaoIcon = iconMap[secao.icone] || Eye;
                      const isExpanded = expandedSections[secaoIdx] ?? false;
                      
                      return (
                        <div key={secaoIdx} className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                          {/* Header da Seção - Clicável */}
                          <button
                            onClick={() => toggleSection(secaoIdx)}
                            className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <SecaoIcon className={`w-4 h-4 ${secao.corIcone}`} />
                              <span className="text-sm font-semibold text-gray-900">
                                {secao.titulo}
                              </span>
                            </div>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-gray-400" />
                            )}
                          </button>

                          {/* Conteúdo Expandido */}
                          {isExpanded && (
                            <div className="px-4 pb-4 space-y-4">
                              {/* Problema Principal */}
                              <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                                <p className="text-xs font-medium text-red-700">
                                  <AlertCircle className="w-3 h-3 inline mr-1" />
                                  {secao.problemasPrincipais}
                                </p>
                              </div>

                              {/* Pontos de Análise */}
                              {secao.pontos.map((ponto, pontoIdx) => (
                                <div key={pontoIdx} className="bg-white rounded-lg p-3 border border-gray-100 space-y-2">
                                  <h4 className="text-xs font-bold text-gray-900">
                                    {ponto.titulo}
                                  </h4>
                                  <div className="space-y-2">
                                    <div className="flex gap-2">
                                      <AlertTriangle className="w-3 h-3 text-orange-500 shrink-0 mt-0.5" />
                                      <p className="text-[11px] text-gray-600 leading-relaxed">
                                        {ponto.critica}
                                      </p>
                                    </div>
                                    <div className="flex gap-2">
                                      <Lightbulb className="w-3 h-3 text-green-500 shrink-0 mt-0.5" />
                                      <p className="text-[11px] text-gray-600 leading-relaxed">
                                        {ponto.melhoria}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Ações Prioritárias */}
                    <div className="bg-blue-50 rounded-xl border border-blue-100 p-4">
                      <h3 className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Ações Prioritárias
                      </h3>
                      <div className="space-y-2">
                        {analysisData.acoesPrioritarias.map((acao, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                              acao.prioridade === 'Crítica' || acao.prioridade === 'Alta' 
                                ? 'bg-red-100 text-red-700' 
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {acao.prioridade}
                            </span>
                            <p className="text-[11px] text-gray-700 leading-relaxed">
                              <span className="font-semibold">{acao.area}:</span> {acao.acao}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Veredito */}
                    <div className="bg-purple-50 rounded-xl border border-purple-100 p-4">
                      <h3 className="text-sm font-bold text-purple-900 mb-2">
                        Veredito
                      </h3>
                      <p className="text-xs text-purple-800 leading-relaxed">
                        {analysisData.veredito}
                      </p>
                    </div>
                  </>
                ) : (
                  /* Fallback para análise simples (flows sem dados detalhados) */
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
                )}

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
