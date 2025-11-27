"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ChevronUp, Target, Users, Lightbulb, Layers, ArrowRight, ExternalLink, Sparkles, Zap, TrendingUp, Check, Play, Pause } from "lucide-react";

// Section navigation data
const sections = [
  { id: "hero", label: "Início", icon: Sparkles },
  { id: "abertura", label: "Abertura", icon: Target },
  { id: "pesquisa", label: "Pesquisa", icon: Users },
  { id: "estrategia", label: "Estratégia", icon: Lightbulb },
  { id: "design", label: "Design", icon: Layers },
];

// Content cards for each section
const aberturaCards = [
  { icon: Target, title: "Objetivos do Projeto", description: "Aumentar adesão e retenção do Meli+ através de uma experiência de valor clara" },
  { icon: Zap, title: "Critérios de Sucesso", description: "Métricas de engajamento, conversão e satisfação do usuário" },
  { icon: TrendingUp, title: "Riscos e Restrições", description: "Mapeamento de obstáculos e limitações técnicas identificadas" },
];

const pesquisaCards = [
  { icon: Users, title: "Personas", description: "Perfis detalhados baseados em entrevistas e análise de comportamento", href: "/pesquisa/personas" },
  { icon: Lightbulb, title: "Insights", description: "Principais descobertas sobre dores e expectativas dos usuários", href: "/pesquisa" },
  { icon: Layers, title: "Benchmarking", description: "Análise comparativa com concorrentes e referências de mercado", href: "/pesquisa/benchmarking" },
];

const estrategiaCards = [
  { icon: Target, title: "Hipóteses", description: "Suposições validadas e priorizadas para guiar o design", href: "/estrategia" },
  { icon: TrendingUp, title: "Métricas", description: "KPIs ligados à retenção e satisfação do assinante", href: "/estrategia" },
  { icon: Sparkles, title: "Princípios", description: "Diretrizes de experiência que norteiam todas as decisões", href: "/ideacao" },
];

const designCards = [
  { icon: Layers, title: "UI Kit", description: "Componentes reutilizáveis seguindo o Andes Design System", href: "/ui-design" },
  { icon: Play, title: "Protótipo", description: "Fluxos navegáveis para validação com usuários reais", href: "/prototipo" },
  { icon: Check, title: "Entrega", description: "Materiais finais organizados para handoff técnico", href: "/entrega" },
];

export default function ApresentacaoPage() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  // Track scroll position and active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
      setIsNavVisible(scrollTop > 300);

      // Determine active section
      Object.entries(sectionsRef.current).forEach(([id, element]) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    sectionsRef.current[id]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#ededed] overflow-x-hidden">
      {/* Progress bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#ffe600] via-[#3483fa] to-[#00a650] z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Floating navigation */}
      <nav 
        className={`fixed right-6 top-1/2 -translate-y-1/2 z-40 transition-all duration-500 ${
          isNavVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
        }`}
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-full py-4 px-2 shadow-lg border border-gray-200">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`block p-2 rounded-full transition-all duration-300 group relative ${
                  activeSection === section.id 
                    ? "bg-[#3483fa] text-white scale-110" 
                    : "text-gray-400 hover:text-[#3483fa] hover:bg-gray-100"
                }`}
                title={section.label}
              >
                <Icon className="w-5 h-5" />
                <span className={`absolute right-full mr-3 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap transition-all duration-200 ${
                  activeSection === section.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}>
                  {section.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={(el) => { sectionsRef.current["hero"] = el; }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#ffe600] via-[#fff176] to-[#ededed]">
          {/* Floating shapes with parallax */}
          <div 
            className="absolute top-20 left-10 w-32 h-32 bg-[#3483fa]/10 rounded-full blur-xl animate-pulse"
            style={{ transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)` }}
          />
          <div 
            className="absolute top-40 right-20 w-48 h-48 bg-[#00a650]/10 rounded-full blur-2xl animate-pulse delay-300"
            style={{ transform: `translate(${mousePosition.x * -1.5}px, ${mousePosition.y * -1.5}px)` }}
          />
          <div 
            className="absolute bottom-40 left-1/4 w-40 h-40 bg-[#ffe600]/30 rounded-full blur-xl animate-pulse delay-500"
            style={{ transform: `translate(${mousePosition.x * 1}px, ${mousePosition.y * 1}px)` }}
          />
          <div 
            className="absolute bottom-20 right-1/3 w-24 h-24 bg-[#3483fa]/20 rounded-full blur-lg animate-pulse delay-700"
            style={{ transform: `translate(${mousePosition.x * -2}px, ${mousePosition.y * -2}px)` }}
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div 
            className="mb-8 animate-fade-in-scale"
            style={{ transform: `translateY(${mousePosition.y * -0.5}px)` }}
          >
            <Image
              src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.6.152/mercadolibre/pt_logo_large_plus@2x.webp"
              alt="Meli+"
              width={180}
              height={40}
              className="mx-auto mb-6"
            />
          </div>
          
          <h1 
            className="text-5xl md:text-7xl font-bold text-[#333333] mb-6 animate-slide-up"
            style={{ transform: `translateY(${mousePosition.y * -0.3}px)` }}
          >
            UX Challenge
          </h1>
          
          <p 
            className="text-xl md:text-2xl text-[#4a4a4a] mb-8 animate-slide-up delay-100"
            style={{ animationDelay: "200ms", transform: `translateY(${mousePosition.y * -0.2}px)` }}
          >
            Uma jornada de descoberta e design para transformar a experiência do programa de assinatura
          </p>

          <div 
            className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in"
            style={{ animationDelay: "400ms" }}
          >
            <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-[#333333] shadow-sm border border-gray-200">
              Product Design
            </span>
            <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-[#333333] shadow-sm border border-gray-200">
              UX Research
            </span>
            <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-[#333333] shadow-sm border border-gray-200">
              Prototipagem
            </span>
          </div>

          <button
            onClick={() => scrollToSection("abertura")}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-[#3483fa] text-white rounded-full font-semibold text-lg shadow-lg hover:bg-[#2968c8] transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in"
            style={{ animationDelay: "600ms" }}
          >
            Iniciar Jornada
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-[#333333]/50" />
        </div>
      </section>

      {/* Section 1: Abertura e Briefing */}
      <section 
        ref={(el) => { sectionsRef.current["abertura"] = el; }}
        className="relative py-24 md:py-32"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3483fa]/10 rounded-full text-[#3483fa] text-sm font-medium mb-6">
              <Target className="w-4 h-4" />
              Capítulo 1
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#333333] mb-6">
              Abertura e Briefing
            </h2>
            <p className="text-lg text-[#4a4a4a] max-w-2xl mx-auto">
              Contexto do desafio, premissas de negócio e tensão inicial sobre adesão e retenção.
            </p>
          </div>

          {/* Content cards with stagger animation */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {aberturaCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div 
                  key={card.title}
                  className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#ffe600] to-[#ffd000] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-[#333333]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#333333] mb-2">{card.title}</h3>
                  <p className="text-[#4a4a4a]">{card.description}</p>
                </div>
              );
            })}
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/briefing"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full text-[#333333] font-medium shadow-sm border border-gray-200 hover:border-[#3483fa] hover:text-[#3483fa] transition-all duration-300"
            >
              Ver Briefing
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/programacao"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full text-[#333333] font-medium shadow-sm border border-gray-200 hover:border-[#3483fa] hover:text-[#3483fa] transition-all duration-300"
            >
              Ver Cronograma
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-96 bg-gradient-to-l from-[#ffe600]/20 to-transparent rounded-l-full blur-3xl -z-10" />
      </section>

      {/* Section 2: Pesquisa e Descobertas */}
      <section 
        ref={(el) => { sectionsRef.current["pesquisa"] = el; }}
        className="relative py-24 md:py-32 bg-gradient-to-b from-[#ededed] to-white"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00a650]/10 rounded-full text-[#00a650] text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              Capítulo 2
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#333333] mb-6">
              Pesquisa e Descobertas
            </h2>
            <p className="text-lg text-[#4a4a4a] max-w-2xl mx-auto">
              Evidências de dores, expectativas e emoções coletadas em entrevistas, reviews e benchmarking.
            </p>
          </div>

          {/* Interactive cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {pesquisaCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Link 
                  key={card.title}
                  href={card.href}
                  className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00a650] to-[#00d35c] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00a650]/20 to-[#00a650]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-[#00a650]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#333333] mb-2">{card.title}</h3>
                  <p className="text-[#4a4a4a] mb-4">{card.description}</p>
                  <span className="inline-flex items-center gap-1 text-[#00a650] font-medium text-sm group-hover:gap-2 transition-all">
                    Explorar <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Stats section with counter animation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "50+", label: "Entrevistas" },
              { value: "200+", label: "Reviews analisados" },
              { value: "15", label: "Competidores" },
              { value: "8", label: "Personas" },
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-200"
              >
                <div className="text-3xl md:text-4xl font-bold text-[#3483fa] mb-2">{stat.value}</div>
                <div className="text-sm text-[#4a4a4a]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute left-0 top-1/4 w-1/4 h-64 bg-gradient-to-r from-[#00a650]/20 to-transparent rounded-r-full blur-3xl -z-10" />
      </section>

      {/* Section 3: Estratégia e Direcionadores */}
      <section 
        ref={(el) => { sectionsRef.current["estrategia"] = el; }}
        className="relative py-24 md:py-32 bg-white"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#8e24aa]/10 rounded-full text-[#8e24aa] text-sm font-medium mb-6">
              <Lightbulb className="w-4 h-4" />
              Capítulo 3
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#333333] mb-6">
              Estratégia e Direcionadores
            </h2>
            <p className="text-lg text-[#4a4a4a] max-w-2xl mx-auto">
              Hipóteses priorizadas, métricas-alvo e princípios de experiência que guiam o desenho.
            </p>
          </div>

          {/* Strategy cards with hover effects */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {estrategiaCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Link 
                  key={card.title}
                  href={card.href}
                  className="group relative bg-gradient-to-br from-[#f8f4ff] to-white rounded-2xl p-6 shadow-sm border border-[#8e24aa]/10 hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#8e24aa] to-[#ab47bc] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#333333] mb-2">{card.title}</h3>
                  <p className="text-[#4a4a4a] mb-4">{card.description}</p>
                  <span className="inline-flex items-center gap-1 text-[#8e24aa] font-medium text-sm group-hover:gap-2 transition-all">
                    Ver mais <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Timeline/process visualization */}
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#8e24aa] to-[#3483fa] -translate-x-1/2" />
            {[
              { step: "01", title: "Identificar Dores", description: "Mapear pontos de fricção na jornada atual" },
              { step: "02", title: "Priorizar Oportunidades", description: "Selecionar iniciativas de maior impacto" },
              { step: "03", title: "Definir Métricas", description: "Estabelecer critérios de sucesso mensuráveis" },
            ].map((item, index) => (
              <div 
                key={item.step}
                className={`relative flex items-center gap-6 mb-8 ${index % 2 === 0 ? "" : "flex-row-reverse"}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                  <div className="inline-block bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                    <div className="text-sm font-bold text-[#8e24aa] mb-1">Passo {item.step}</div>
                    <div className="font-semibold text-[#333333]">{item.title}</div>
                    <div className="text-sm text-[#4a4a4a]">{item.description}</div>
                  </div>
                </div>
                <div className="w-4 h-4 bg-[#8e24aa] rounded-full border-4 border-white shadow-lg z-10" />
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute right-0 bottom-0 w-1/3 h-80 bg-gradient-to-tl from-[#8e24aa]/10 to-transparent rounded-tl-full blur-3xl -z-10" />
      </section>

      {/* Section 4: Design, Protótipo e Validação */}
      <section 
        ref={(el) => { sectionsRef.current["design"] = el; }}
        className="relative py-24 md:py-32 bg-gradient-to-b from-white to-[#ededed]"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3483fa]/10 rounded-full text-[#3483fa] text-sm font-medium mb-6">
              <Layers className="w-4 h-4" />
              Capítulo 4
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#333333] mb-6">
              Design, Protótipo e Validação
            </h2>
            <p className="text-lg text-[#4a4a4a] max-w-2xl mx-auto">
              Fluxos, interfaces e protótipos que materializam a promessa e reduzem atritos.
            </p>
          </div>

          {/* Design showcase cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {designCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Link 
                  key={card.title}
                  href={card.href}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3483fa]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="p-6 relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#3483fa] to-[#2968c8] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#333333] mb-2">{card.title}</h3>
                    <p className="text-[#4a4a4a] mb-4">{card.description}</p>
                    <span className="inline-flex items-center gap-1 text-[#3483fa] font-medium text-sm group-hover:gap-2 transition-all">
                      Acessar <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* CTA section */}
          <div className="relative bg-gradient-to-r from-[#3483fa] to-[#2968c8] rounded-3xl p-8 md:p-12 text-center overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Pronto para explorar o protótipo?
              </h3>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Navegue pelos fluxos interativos e experimente a nova proposta de valor do Meli+ em primeira mão.
              </p>
              <Link 
                href="/prototipo"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-[#3483fa] rounded-full font-semibold text-lg shadow-lg hover:bg-[#ffe600] hover:text-[#333333] transition-all duration-300 hover:scale-105"
              >
                <Play className="w-5 h-5" />
                Ver Protótipo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-[#ededed]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-4">
            Obrigado por explorar o case!
          </h2>
          <p className="text-[#4a4a4a] mb-8">
            Quer saber mais sobre o processo ou discutir os próximos passos?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/entrega"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#333333] text-white rounded-full font-medium hover:bg-[#1a1a1a] transition-all duration-300"
            >
              Ver Materiais de Entrega
            </Link>
            <button
              onClick={() => scrollToSection("hero")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#333333] rounded-full font-medium border border-gray-200 hover:border-[#3483fa] hover:text-[#3483fa] transition-all duration-300"
            >
              <ChevronUp className="w-4 h-4" />
              Voltar ao início
            </button>
          </div>
        </div>
      </section>

      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in-scale {
          animation: fadeInScale 0.8s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .delay-100 {
          animation-delay: 100ms;
        }
        
        .delay-300 {
          animation-delay: 300ms;
        }
        
        .delay-500 {
          animation-delay: 500ms;
        }
        
        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </div>
  );
}
