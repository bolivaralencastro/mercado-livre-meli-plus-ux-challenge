"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function MeliDesignSystemPage() {
  const [pricingPeriod, setPricingPeriod] = useState("monthly");
  const [isDarkMode, setIsDarkMode] = useState(true);

  const prices = {
    monthly: {
      essential: { val: "R$ 9,90", old: null, tag: null, suffix: "/mês" },
      total: { val: "R$ 24,90", old: null, tag: null, suffix: "/mês" },
      mega: { val: "R$ 39,90", old: "R$ 74,90", tag: "46% OFF", suffix: "/mês" }
    },
    quarterly: {
      essential: { val: "R$ 27,90", old: "R$ 29,70", tag: "6% OFF", suffix: "/tri" },
      total: { val: "R$ 69,90", old: "R$ 74,70", tag: "7% OFF", suffix: "/tri" },
      mega: { val: "R$ 109,90", old: "R$ 224,70", tag: "51% OFF", suffix: "/tri" }
    },
    yearly: {
      essential: { val: "R$ 99,90", old: "R$ 118,80", tag: "16% OFF", suffix: "/ano" },
      total: { val: "R$ 249,00", old: "R$ 298,80", tag: "17% OFF", suffix: "/ano" },
      mega: { val: "R$ 399,00", old: "R$ 898,80", tag: "55% OFF", suffix: "/ano" }
    }
  };

  const bgClass = isDarkMode ? "bg-[#0E0B18]" : "bg-[#F6F4F1]";
  const textClass = isDarkMode ? "text-[#F6F4F1]" : "text-[#050505]";
  const panelClass = isDarkMode ? "bg-[#18142A]" : "bg-white";
  const borderClass = isDarkMode ? "border-white/10" : "border-black/8";

  useEffect(() => {
    // 2. Scroll Animations Observer
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-up, .reveal-scale').forEach((el) => observer.observe(el));

    // 3. Special Effects Lazy Activation
    const specialEffectsSection = document.getElementById('special-effects');
    let effectsObserver: IntersectionObserver | null = null;

    if (specialEffectsSection) {
        effectsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    specialEffectsSection.classList.add('effects-active');
                } else {
                    specialEffectsSection.classList.remove('effects-active');
                }
            });
        }, { threshold: 0.3, rootMargin: '0px 0px -10%' });
        effectsObserver.observe(specialEffectsSection);
    }
    
    return () => {
        observer.disconnect();
        if (effectsObserver) effectsObserver.disconnect();
    }
  }, []);

  return (
    <div className={`flex flex-col h-screen overflow-hidden ${bgClass}`}>
      <style jsx global>{`
        @property --angle {
          syntax: "<angle>";
          inherits: true;
          initial-value: 0turn;
        }
        @keyframes spin {
          to { --angle: 1turn; }
        }
        @keyframes liquidMove {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-10%, -10%) rotate(10deg); }
        }
        @keyframes auroraFloat {
          from { transform: translate3d(-8%, -6%, 0) rotate(-4deg); }
          to { transform: translate3d(10%, 8%, 0) rotate(6deg); }
        }
        @keyframes auroraRotate {
          to { transform: rotate(360deg); }
        }
        .cta-btn-3d::after {
          content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transform: skewX(-20deg); transition: 0.5s; pointer-events: none;
        }
        .cta-btn-3d:hover::after { left: 150%; transition: 0.7s ease-in-out; }

        /* Scroll Animations */
        .reveal-up, .reveal-scale { opacity: 0; transition: all 1s cubic-bezier(0.5, 0, 0, 1); will-change: transform, opacity; }
        .reveal-up { transform: translateY(40px); }
        .reveal-scale { transform: scale(0.8); }
        .in-view { opacity: 1; transform: translate(0) scale(1); }
        .delay-100 { transition-delay: 0.1s; }
        .delay-200 { transition-delay: 0.2s; }
        .delay-300 { transition-delay: 0.3s; }

        /* Border Animated Wrapper */
        .border-animated-wrapper {
            position: relative;
            width: 100%;
            height: 100%;
            flex: 1;
            border-radius: 16px;
            z-index: 0;
        }
        .border-animated-wrapper::before,
        .border-animated-wrapper::after {
            content: "";
            position: absolute;
            z-index: -1;
            border-radius: inherit;
            background-image: conic-gradient(
                from var(--angle),
                #800080 0deg,
                #E84A2E 90deg,
                #FF7F50 180deg,
                #4A004A 270deg,
                #800080 360deg
            );
            animation: spin var(--speed, 3s) linear infinite;
            animation-play-state: paused;
        }
        .border-animated-wrapper::after { inset: -1px; }
        .border-animated-wrapper::before {
            inset: -1px;
            filter: blur(10px);
            opacity: 0.6;
        }
        .border-animated-wrapper.speed-slow { --speed: 6s; }
        .border-animated-wrapper.speed-medium { --speed: 3s; }
        .border-animated-wrapper.speed-fast { --speed: 1.5s; }

        /* Aurora Card */
        .aurora-card {
            position: relative;
            border-radius: 22px;
            overflow: hidden;
            isolation: isolate;
        }
        .aurora-card::before,
        .aurora-card::after {
            content: "";
            position: absolute;
            inset: -40%;
            border-radius: 50%;
            filter: blur(60px);
            opacity: 0.85;
            pointer-events: none;
            animation-play-state: paused;
        }
        .aurora-card::before {
            mix-blend-mode: screen;
            animation: auroraFloat var(--aurora-duration, 8s) ease-in-out infinite alternate;
        }
        .aurora-card::after {
            background: conic-gradient(from 180deg, rgba(255,255,255,0.08), transparent 40%, rgba(255,255,255,0.12) 80%, transparent 100%);
            mix-blend-mode: overlay;
            animation: auroraRotate calc(var(--aurora-duration, 8s) * 1.3) linear infinite;
        }
        .aurora-card[data-tone="purple"]::before {
            background: radial-gradient(50% 55% at 20% 30%, rgba(128,0,128,0.55), transparent 65%),
                        radial-gradient(45% 50% at 70% 60%, rgba(74,0,74,0.5), transparent 70%),
                        radial-gradient(60% 60% at 45% 80%, rgba(232,74,46,0.25), transparent 78%);
        }
        .aurora-card[data-tone="orange"]::before {
            background: radial-gradient(50% 55% at 20% 30%, rgba(232,74,46,0.55), transparent 65%),
                        radial-gradient(45% 50% at 70% 60%, rgba(255,127,80,0.45), transparent 70%),
                        radial-gradient(60% 60% at 45% 80%, rgba(128,0,128,0.3), transparent 78%);
        }
        .aurora-card[data-tone="pulse"]::before {
            background: radial-gradient(45% 45% at 20% 25%, rgba(128,0,128,0.55), transparent 65%),
                        radial-gradient(50% 60% at 80% 70%, rgba(232,74,46,0.4), transparent 70%),
                        radial-gradient(55% 55% at 40% 80%, rgba(255,127,80,0.35), transparent 75%);
            --aurora-duration: 5.5s;
        }
        .aurora-card[data-tone="pulse"]::after {
            --aurora-duration: 5.5s;
        }

        /* Effects Active State - Enables Animations */
        .effects-active .border-animated-wrapper::before,
        .effects-active .border-animated-wrapper::after,
        .effects-active .aurora-card::before,
        .effects-active .aurora-card::after {
            animation-play-state: running;
        }
      `}</style>

      {/* Sidebar */}
      <aside className={`w-64 h-screen ${panelClass} border-r ${borderClass} border-l-[4px] border-l-[#800080] fixed top-0 left-0 flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] z-[100]`}>
        <nav className="pt-7 px-3 pb-5">
          <div className="mb-8 px-2 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#800080] to-[#E84A2E] rounded-lg shadow-[0_0_20px_rgba(128,0,128,0.5)]"></div>
            <div className={`text-lg font-bold ${textClass}`}>MELI+ DS</div>
          </div>
          
          <div className="mb-6 flex flex-col gap-0.5">
            <a href="/ui-design" className={`flex items-center w-full h-[42px] px-3 no-underline ${textClass} text-sm font-normal rounded-md cursor-pointer transition-colors hover:bg-black/[0.04]`}>
              <span className="flex-grow ml-4">← UI Design</span>
            </a>
          </div>
          
          {/* Navigation Menu */}
          <div className="mb-6 flex flex-col gap-0.5">
            <p className={`${isDarkMode ? 'text-white/55' : 'text-black/55'} text-xs font-semibold ml-8 mb-1 uppercase`}>Seções</p>
            <a href="#logos" className={`flex items-center w-full h-[42px] px-3 text-sm font-normal rounded-md cursor-pointer transition-colors border-none no-underline ${textClass} hover:bg-black/[0.04]`}>
              <span className="flex-grow text-left ml-4">00. Logos & Brand</span>
            </a>
            <a href="#colors" className={`flex items-center w-full h-[42px] px-3 text-sm font-normal rounded-md cursor-pointer transition-colors border-none no-underline ${textClass} hover:bg-black/[0.04]`}>
              <span className="flex-grow text-left ml-4">01. Cores</span>
            </a>
            <a href="#typography" className={`flex items-center w-full h-[42px] px-3 text-sm font-normal rounded-md cursor-pointer transition-colors border-none no-underline ${textClass} hover:bg-black/[0.04]`}>
              <span className="flex-grow text-left ml-4">02. Tipografia</span>
            </a>
            <a href="#components" className={`flex items-center w-full h-[42px] px-3 text-sm font-normal rounded-md cursor-pointer transition-colors border-none no-underline ${textClass} hover:bg-black/[0.04]`}>
              <span className="flex-grow text-left ml-4">03. Componentes</span>
            </a>
            <a href="#animations" className={`flex items-center w-full h-[42px] px-3 text-sm font-normal rounded-md cursor-pointer transition-colors border-none no-underline ${textClass} hover:bg-black/[0.04]`}>
              <span className="flex-grow text-left ml-4">04. Animações</span>
            </a>
            <a href="#pricing" className={`flex items-center w-full h-[42px] px-3 text-sm font-normal rounded-md cursor-pointer transition-colors border-none no-underline ${textClass} hover:bg-black/[0.04]`}>
              <span className="flex-grow text-left ml-4">05. Pricing Module</span>
            </a>
            <a href="#special-effects" className={`flex items-center w-full h-[42px] px-3 text-sm font-normal rounded-md cursor-pointer transition-colors border-none no-underline ${textClass} hover:bg-black/[0.04]`}>
              <span className="flex-grow text-left ml-4">06. Special Effects</span>
            </a>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`ml-64 mt-0 p-0 w-[calc(100%-16rem)] h-screen overflow-y-auto ${bgClass} scroll-smooth`}>
        <div className="w-full max-w-[1200px] mx-auto pt-12 pb-32 px-8">
          
          {/* Header */}
          <header className={`mb-20 border-b ${borderClass} pb-10`}>
            <div className="flex items-center justify-between gap-5 flex-wrap mb-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#800080] to-[#E84A2E] rounded-lg shadow-[0_0_20px_rgba(128,0,128,0.5)]"></div>
                <span className={`text-xl font-bold ${textClass}`}>MELI+ DS</span>
              </div>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border ${borderClass} ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} ${textClass} text-sm font-semibold cursor-pointer transition-colors`}
              >
                <span className="text-lg">{isDarkMode ? '🌙' : '☀️'}</span>
                <span>{isDarkMode ? 'Modo claro' : 'Modo escuro'}</span>
              </button>
            </div>
            <h1 className={`text-5xl font-black mb-3 ${textClass}`} style={{letterSpacing: '-1px'}}>Design System</h1>
            <p className={`text-xl ${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} opacity-80`}>
              Documentação oficial dos componentes, cores e organismos.
            </p>
          </header>

          {/* 00. LOGO & BRAND IDENTITY */}
          <section id="logos" className="mb-32 scroll-mt-10">
            <div className="mb-10">
              <h2 className={`text-3xl font-bold ${textClass} mb-2 flex items-center gap-3`}>
                <span className="text-[#800080] opacity-60">#</span>
                00. Logo & Brand Identity
              </h2>
              <p className={`${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} opacity-60`}>
                Logotipo oficial 3D e variações da marca Meli+.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-start">
              {/* Logo Text Normal */}
              <div className={`${panelClass} border ${borderClass} rounded-2xl p-10 text-center hover:border-white/30 transition-colors`}>
                <span className={`block text-xs ${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} opacity-60 uppercase tracking-wider mb-5`}>Logo Text Normal</span>
                <div className={`${isDarkMode ? 'bg-white/5' : 'bg-black/5'} rounded-xl p-10 flex items-center justify-center min-h-[200px] relative overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.35)]`}>
                  <div className="absolute inset-[-20%] bg-[radial-gradient(circle_at_30%_30%,rgba(128,0,128,0.35),transparent_60%),radial-gradient(circle_at_70%_60%,rgba(232,74,46,0.3),transparent_70%)] opacity-45 blur-[10px] pointer-events-none"></div>
                  <Image 
                    src="https://smolljrfjqknp6nm.public.blob.vercel-storage.com/assets/meli-mais-text-normal.webp" 
                    alt="Meli+ Text Logo" 
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-auto h-auto max-h-[120px] relative mix-blend-screen" 
                  />
                </div>
                <div className={`mt-5 p-4 ${isDarkMode ? 'bg-black/30' : 'bg-black/5'} rounded-lg text-left`}>
                  <div className={`text-sm ${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} opacity-80 mb-2`}>
                    <strong>Uso:</strong> Navegação, footers, versão horizontal
                  </div>
                  <div className="text-xs font-mono text-[#E84A2E] opacity-70">src: meli-mais-text-normal.webp</div>
                </div>
              </div>

              {/* Logo Container */}
              <div className={`${panelClass} border ${borderClass} rounded-2xl p-10 text-center hover:border-white/30 transition-colors`}>
                <span className={`block text-xs ${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} opacity-60 uppercase tracking-wider mb-5`}>Logo Container (Badge)</span>
                <div className={`${isDarkMode ? 'bg-white/5' : 'bg-black/5'} rounded-xl p-10 flex items-center justify-center min-h-[200px] relative overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.35)]`}>
                  <div className="absolute inset-[-20%] bg-[radial-gradient(circle_at_30%_30%,rgba(128,0,128,0.35),transparent_60%),radial-gradient(circle_at_70%_60%,rgba(232,74,46,0.3),transparent_70%)] opacity-45 blur-[10px] pointer-events-none"></div>
                  <Image 
                    src="https://smolljrfjqknp6nm.public.blob.vercel-storage.com/assets/logo-container.webp" 
                    alt="Meli+ Logo Container" 
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-auto h-auto max-h-[160px] relative mix-blend-screen" 
                  />
                </div>
                <div className={`mt-5 p-4 ${isDarkMode ? 'bg-black/30' : 'bg-black/5'} rounded-lg text-left`}>
                  <div className={`text-sm ${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} opacity-80 mb-2`}>
                    <strong>Uso:</strong> Badges, ícones de app, favicons
                  </div>
                  <div className="text-xs font-mono text-[#E84A2E] opacity-70">src: logo-container.webp</div>
                </div>
              </div>

              {/* Logo 3D Principal */}
              <div className={`${panelClass} border ${borderClass} rounded-2xl p-10 text-center hover:border-white/30 transition-colors`}>
                <span className={`block text-xs ${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} opacity-60 uppercase tracking-wider mb-5`}>Logo 3D Principal</span>
                <div className={`${isDarkMode ? 'bg-white/5' : 'bg-black/5'} rounded-xl p-10 flex items-center justify-center min-h-[200px] relative overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.35)]`}>
                  <div className="absolute inset-[-20%] bg-[radial-gradient(circle_at_30%_30%,rgba(128,0,128,0.35),transparent_60%),radial-gradient(circle_at_70%_60%,rgba(232,74,46,0.3),transparent_70%)] opacity-45 blur-[10px] pointer-events-none"></div>
                  <Image 
                    src="https://smolljrfjqknp6nm.public.blob.vercel-storage.com/assets/logo-meli-mais-3d-normal.webp" 
                    alt="Meli+ Logo 3D" 
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-auto h-auto max-h-[180px] relative mix-blend-screen" 
                  />
                </div>
                <div className={`mt-5 p-4 ${isDarkMode ? 'bg-black/30' : 'bg-black/5'} rounded-lg text-left`}>
                  <div className={`text-sm ${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} opacity-80 mb-2`}>
                    <strong>Uso:</strong> Hero sections, headers principais
                  </div>
                  <div className="text-xs font-mono text-[#E84A2E] opacity-70">src: logo-meli-mais-3d-normal.webp</div>
                </div>
              </div>
            </div>

            {/* Variações Tipográficas */}
            <h3 className={`text-xl font-bold ${textClass} mb-5 opacity-80`}>Variações Tipográficas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Brand Lockup Pill */}
              <div className={`${panelClass} border ${borderClass} rounded-xl p-8 text-center`}>
                <span className={`block text-xs ${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} opacity-50 mb-4 uppercase`}>BRAND LOCKUP PILL</span>
                <div className={`inline-flex items-center ${isDarkMode ? 'bg-black/40' : 'bg-black/5'} border ${isDarkMode ? 'border-white/10' : 'border-black/10'} rounded-full px-5 py-2.5 gap-2.5`}>
                  <span className="font-black text-xl" style={{background: 'linear-gradient(90deg, #800080, #E84A2E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px'}}>meli+</span>
                  <span className={`text-xs font-semibold uppercase tracking-widest ${textClass} pl-2.5 border-l ${isDarkMode ? 'border-white/15' : 'border-black/15'} pt-0.5`}>TOTAL</span>
                </div>
                <div className={`mt-4 text-xs ${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} opacity-60`}>Componente para headers e badges</div>
              </div>

              {/* Text Gradient */}
              <div className={`${panelClass} border ${borderClass} rounded-xl p-8 text-center`}>
                <span className={`block text-xs ${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} opacity-50 mb-4 uppercase`}>TEXT GRADIENT</span>
                <div className="text-4xl font-black" style={{background: 'linear-gradient(90deg, #800080, #E84A2E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-1px'}}>
                  meli+
                </div>
                <div className={`mt-4 text-xs ${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} opacity-60`}>Para títulos e destaque</div>
              </div>

              {/* Simple Text */}
              <div className={`${panelClass} border ${borderClass} rounded-xl p-8 text-center`}>
                <span className={`block text-xs ${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} opacity-50 mb-4 uppercase`}>SIMPLE TEXT</span>
                <div className={`text-4xl font-black ${textClass}`} style={{letterSpacing: '-1px'}}>
                  meli+
                </div>
                <div className={`mt-4 text-xs ${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} opacity-60`}>Para navegação e UI</div>
              </div>
            </div>
          </section>

          {/* 01. CORES */}
          <section id="colors" className="mb-32 scroll-mt-10">
            <div className="mb-10">
              <h2 className={`text-3xl font-bold ${textClass} mb-2 flex items-center gap-3`}>
                <span className="text-[#800080] opacity-60">#</span>
                01. Colors
              </h2>
              <p className={`${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} opacity-60`}>
                Paleta de cores completa com brand colors, neutrals e escalas dinâmicas.
              </p>
            </div>

            {/* Brand Palette */}
            <h3 className={`text-xl font-bold ${textClass} mb-5 opacity-80`}>Brand Palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
              {[
                { name: 'Meli Purple', hex: '#800080' },
                { name: 'Deep Purple', hex: '#4A004A' },
                { name: 'Meli Orange', hex: '#E84A2E' },
                { name: 'Sunset Orange', hex: '#FF7F50' }
              ].map((color) => (
                <div key={color.hex} className={`${panelClass} border ${borderClass} rounded-xl p-4 flex flex-col gap-4 hover:-translate-y-1 transition-transform`}>
                  <div style={{ backgroundColor: color.hex }} className="h-20 rounded-lg border border-white/10"></div>
                  <div>
                    <strong className={`block text-sm ${textClass} mb-1`}>{color.name}</strong>
                    <span className={`text-xs ${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} opacity-60 font-mono`}>{color.hex}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Dark Mode & Neutrals */}
            <h3 className={`text-xl font-bold ${textClass} mb-5 opacity-80`}>Dark Mode & Neutrals</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
              {[
                { name: 'Background Dark', hex: '#050505', bg: '#050505' },
                { name: 'Background Panel', hex: '#121212', bg: '#121212' },
                { name: 'White Chalk', hex: '#F6F4F1', bg: '#F6F4F1' },
                { name: 'Silver Haze', hex: '#E2E4E7', bg: '#E2E4E7' }
              ].map((color) => (
                <div key={color.hex} className={`${panelClass} border ${borderClass} rounded-xl p-4 flex flex-col gap-4 hover:-translate-y-1 transition-transform`}>
                  <div style={{ backgroundColor: color.bg }} className="h-20 rounded-lg border border-white/10"></div>
                  <div>
                    <strong className={`block text-sm ${textClass} mb-1`}>{color.name}</strong>
                    <span className={`text-xs ${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} opacity-60 font-mono`}>{color.hex}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Color Steps */}
            <h3 className={`text-xl font-bold ${textClass} mb-5 opacity-80`}>Color Steps (Tints & Shades)</h3>
            <p className={`${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} mb-5 text-sm opacity-70`}>
              Escalas geradas dinamicamente misturando a cor base com Branco (Tint) e Preto (Shade).
            </p>

            <div className="mb-8">
              <span className={`block text-sm font-semibold ${textClass} mb-2 opacity-80`}>Meli Purple Scale</span>
              <div className={`flex w-full h-[60px] rounded-lg overflow-hidden border ${borderClass}`}>
                {[80, 60, 40, 20].map(v => (
                  <div key={v} className="flex-1 flex items-center justify-center text-[10px] font-mono font-bold text-black/50" style={{backgroundColor: `color-mix(in srgb, #800080, white ${v}%)`}}>{100 + (80-v)/20 * 100}</div>
                ))}
                <div className="flex-1 flex items-center justify-center text-[10px] font-mono font-bold text-white/70 bg-[#800080]">500</div>
                {[20, 40, 60, 80].map(v => (
                  <div key={v} className="flex-1 flex items-center justify-center text-[10px] font-mono font-bold text-white/70" style={{backgroundColor: `color-mix(in srgb, #800080, black ${v}%)`}}>{500 + v/20 * 100}</div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <span className={`block text-sm font-semibold ${textClass} mb-2 opacity-80`}>Meli Orange Scale</span>
              <div className={`flex w-full h-[60px] rounded-lg overflow-hidden border ${borderClass}`}>
                {[80, 60, 40, 20].map(v => (
                  <div key={v} className="flex-1 flex items-center justify-center text-[10px] font-mono font-bold text-black/50" style={{backgroundColor: `color-mix(in srgb, #E84A2E, white ${v}%)`}}>{100 + (80-v)/20 * 100}</div>
                ))}
                <div className="flex-1 flex items-center justify-center text-[10px] font-mono font-bold text-white/70 bg-[#E84A2E]">500</div>
                {[20, 40, 60, 80].map(v => (
                  <div key={v} className="flex-1 flex items-center justify-center text-[10px] font-mono font-bold text-white/70" style={{backgroundColor: `color-mix(in srgb, #E84A2E, black ${v}%)`}}>{500 + v/20 * 100}</div>
                ))}
              </div>
            </div>

            {/* Gradients */}
            <h3 className={`text-xl font-bold ${textClass} mb-5 opacity-80`}>Gradients</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className={`${panelClass} border ${borderClass} rounded-2xl p-5`}>
                <span className={`block text-sm font-semibold ${textClass} mb-3`}>Brand Horizontal</span>
                <div className="h-[100px] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] mb-3" style={{background: 'linear-gradient(90deg, #800080, #E84A2E)'}}></div>
                <div className={`text-xs ${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} opacity-70 font-mono`}>linear-gradient(90deg, #800080, #E84A2E)</div>
              </div>

              <div className={`${panelClass} border ${borderClass} rounded-2xl p-5`}>
                <span className={`block text-sm font-semibold ${textClass} mb-3`}>CTA Button (3D)</span>
                <div className="h-[100px] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] mb-3" style={{background: 'linear-gradient(180deg, #800080 0%, #4A004A 100%)'}}></div>
                <div className={`text-xs ${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} opacity-70 font-mono`}>linear-gradient(180deg, #800080, #4A004A)</div>
              </div>

              <div className={`${panelClass} border ${borderClass} rounded-2xl p-5`}>
                <span className={`block text-sm font-semibold ${textClass} mb-3`}>Liquid Glass Blob (Card Hover Effect)</span>
                <div className="h-[100px] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] mb-3 relative overflow-hidden bg-black/50">
                  <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-40" style={{
                    background: 'radial-gradient(circle at 50% 50%, #800080, #4A004A, transparent 60%)',
                    animation: 'liquidMove 6s infinite alternate'
                  }}></div>
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} opacity-70 font-mono`}>Usado no ::before dos cards com animação</div>
              </div>

              <div className={`${panelClass} border ${borderClass} rounded-2xl p-5`}>
                <span className={`block text-sm font-semibold ${textClass} mb-3`}>Hero Overlay (Cinematic)</span>
                <div className="h-[100px] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] mb-3" style={{background: 'linear-gradient(90deg, #050505 0%, rgba(5,5,5,0.95) 40%, rgba(74,0,74,0.1) 100%)'}}></div>
                <div className={`text-xs ${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} opacity-70 font-mono`}>linear-gradient(90deg, #050505, rgba(5,5,5,0.95), rgba(74,0,74,0.1))</div>
              </div>
            </div>
          </section>

          {/* 02. TYPOGRAPHY */}
          <section id="typography" className="mb-32 scroll-mt-10">
            <div className="mb-10">
              <h2 className={`text-3xl font-bold ${textClass} mb-2 flex items-center gap-3`}>
                <span className="text-[#800080] opacity-60">#</span>
                02. Typography
              </h2>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-[120px_1fr] items-baseline border-b border-white/10 pb-8">
                <span className="text-[#E84A2E] text-xs font-mono uppercase">Heading XL</span>
                <div className={`text-5xl font-black ${textClass}`}>Assine Meli+</div>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-baseline border-b border-white/10 pb-8">
                <span className="text-[#E84A2E] text-xs font-mono uppercase">Heading LG</span>
                <div className={`text-3xl font-bold ${textClass}`}>Nossos Planos</div>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-baseline border-b border-white/10 pb-8">
                <span className="text-[#E84A2E] text-xs font-mono uppercase">Body</span>
                <div className={`text-base ${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'}`}>Texto padrão para leitura confortável em fundo escuro.</div>
              </div>
            </div>
          </section>

          {/* 03. COMPONENTS */}
          <section id="components" className="mb-32 scroll-mt-10">
            <div className="mb-10">
              <h2 className={`text-3xl font-bold ${textClass} mb-2 flex items-center gap-3`}>
                <span className="text-[#800080] opacity-60">#</span>
                03. Components
              </h2>
              <p className={`${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} opacity-60`}>
                Use o botão de tema do cabeçalho para inspecionar os mesmos componentes em dark ou light sem duplicar marcação.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primary CTA */}
              <div className={`${isDarkMode ? 'bg-white/[0.02]' : 'bg-black/[0.04]'} border ${borderClass} rounded-2xl p-10 flex flex-col items-center justify-center gap-5 relative min-h-[200px]`}>
                <span className={`absolute top-4 left-5 text-xs ${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} opacity-40 uppercase tracking-wider`}>Primary CTA</span>
                <button className="cta-btn-3d inline-flex justify-center items-center px-8 py-4 bg-gradient-to-b from-[#800080] to-[#4A004A] text-white text-base font-bold cursor-pointer rounded-xl border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_15px_rgba(0,0,0,0.5)] transition-all hover:brightness-115 hover:-translate-y-1 w-full max-w-xs relative overflow-hidden">
                  Assinar Agora
                </button>
              </div>

              {/* Brand Lockup */}
              <div className={`${isDarkMode ? 'bg-white/[0.02]' : 'bg-black/[0.04]'} border ${borderClass} rounded-2xl p-10 flex flex-col items-center justify-center gap-5 relative min-h-[200px]`}>
                <span className={`absolute top-4 left-5 text-xs ${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} opacity-40 uppercase tracking-wider`}>Brand Lockup Pill</span>
                <div className={`inline-flex items-center ${isDarkMode ? 'bg-black/40' : 'bg-black/5'} border ${isDarkMode ? 'border-white/10' : 'border-black/10'} rounded-full px-4 py-2 gap-2`}>
                  <span className="font-black text-lg" style={{background: 'linear-gradient(90deg, #800080, #E84A2E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px'}}>meli+</span>
                  <span className={`text-xs font-semibold uppercase tracking-widest ${textClass} pl-2 border-l ${isDarkMode ? 'border-white/15' : 'border-black/15'} pt-0.5`}>TOTAL</span>
                </div>
              </div>
            </div>
          </section>

          {/* 04. ANIMATIONS */}
          <section id="animations" className="mb-32 scroll-mt-10">
            <div className="mb-10">
              <h2 className={`text-3xl font-bold ${textClass} mb-2 flex items-center gap-3`}>
                <span className="text-[#800080] opacity-60">#</span>
                04. Scroll Animations
              </h2>
            </div>
            <div className={`min-h-[200px] flex items-center justify-center gap-5 border border-dashed ${borderClass} rounded-xl p-5`}>
              <div className={`w-20 h-20 ${isDarkMode ? 'bg-[#F6F4F1] text-[#0E0B18]' : 'bg-[#0E0B18] text-[#F6F4F1]'} rounded-xl flex items-center justify-center font-bold text-sm reveal-up`}>Fade Up</div>
              <div className={`w-20 h-20 ${isDarkMode ? 'bg-[#F6F4F1] text-[#0E0B18]' : 'bg-[#0E0B18] text-[#F6F4F1]'} rounded-xl flex items-center justify-center font-bold text-sm reveal-scale delay-100`}>Scale</div>
              <div className={`w-20 h-20 ${isDarkMode ? 'bg-[#F6F4F1] text-[#0E0B18]' : 'bg-[#0E0B18] text-[#F6F4F1]'} rounded-xl flex items-center justify-center font-bold text-sm reveal-up delay-200`}>Stagger</div>
            </div>
          </section>

          {/* 05. PRICING MODULE */}
          <section id="pricing" className="mb-32 scroll-mt-10">
            <div className="mb-10">
              <h2 className={`text-3xl font-bold ${textClass} mb-2 flex items-center gap-3`}>
                <span className="text-[#800080] opacity-60">#</span>
                05. Pricing Module
              </h2>
              <p className={`${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} opacity-60`}>
                Organismo complexo com Toggle de 3 estados, lógica de features riscadas e efeito Liquid Glass.
              </p>
            </div>

            <div className={`${isDarkMode ? 'bg-[#0E0B18]' : 'bg-white'} p-16 rounded-3xl border border-dashed ${borderClass} flex flex-col items-center relative overflow-hidden`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(74,0,74,0.2)_0%,transparent_60%)] pointer-events-none"></div>
              
              {/* Toggle */}
              <div className={`relative grid grid-cols-3 ${isDarkMode ? 'bg-black/40' : 'bg-black/5'} rounded-full p-1 mb-10 border ${borderClass} w-full max-w-sm z-10`}>
                <div className={`absolute top-1 bottom-1 w-[calc(33.33%-4px)] ${isDarkMode ? 'bg-white/12 border-white/10' : 'bg-white border-black/10'} rounded-full transition-transform duration-300 z-[1]`} style={{
                  transform: pricingPeriod === 'monthly' ? 'translateX(2px)' : pricingPeriod === 'quarterly' ? 'translateX(calc(100% + 4px))' : 'translateX(calc(200% + 6px))'
                }}></div>
                {['monthly', 'quarterly', 'yearly'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setPricingPeriod(period)}
                    className={`bg-transparent border-none py-2.5 text-sm font-medium cursor-pointer z-[2] transition-colors ${
                      pricingPeriod === period ? 'text-white font-bold' : isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'
                    }`}
                  >
                    {period === 'monthly' ? 'Mensal' : period === 'quarterly' ? 'Trimestral' : 'Anual'}
                  </button>
                ))}
              </div>

              {/* Pricing Cards */}
              <div className="flex gap-5 flex-wrap justify-center w-full z-10">
                {(['essential', 'total', 'mega'] as const).map((plan) => {
                  const priceData = prices[pricingPeriod as keyof typeof prices][plan];
                  const isMega = plan === 'mega';
                  const delayClass = plan === 'essential' ? 'delay-100' : plan === 'total' ? 'delay-200' : 'delay-300';
                  
                  return (
                    <article key={plan} className={`relative w-full max-w-[320px] rounded-2xl p-6 flex flex-col ${isDarkMode ? 'bg-white/[0.02] backdrop-blur-[30px]' : 'bg-white/95'} border ${isMega ? 'border-white/30' : borderClass} shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-400 hover:-translate-y-2.5 hover:border-white/30 overflow-hidden group reveal-up ${delayClass}`}>
                      {/* Liquid Effect on Hover */}
                      <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_50%_50%,#800080,#4A004A,transparent_60%)] opacity-0 scale-80 transition-all duration-500 -z-10 group-hover:opacity-40 group-hover:scale-100 group-hover:animate-[liquidMove_6s_infinite_alternate]"></div>

                      {isMega && (
                        <div className="absolute -top-px -right-px bg-[#E84A2E] text-white px-2.5 py-1.5 rounded-bl-xl text-[10px] font-black uppercase z-10">
                          OFERTA
                        </div>
                      )}
                      
                      <div className="relative z-[2] h-full flex flex-col">
                        <div className="mb-5 flex justify-start">
                          <div className={`inline-flex items-center ${isDarkMode ? 'bg-black/40' : 'bg-black/5'} border ${isDarkMode ? 'border-white/10' : 'border-black/10'} rounded-full px-4 py-2 gap-2`}>
                            <span className="font-black text-lg" style={{background: 'linear-gradient(90deg, #800080, #E84A2E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>meli+</span>
                            <span className={`text-xs font-semibold uppercase tracking-widest ${textClass} pl-2 border-l ${isDarkMode ? 'border-white/15' : 'border-black/15'}`}>
                              {plan.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mb-4 min-h-[90px] flex flex-col justify-center">
                          {priceData.old && (
                            <div className={`text-sm ${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} line-through mb-1 opacity-70`}>
                              {priceData.old} <span className="text-[#FF7F50] font-bold ml-1.5">{priceData.tag}</span>
                            </div>
                          )}
                          <div className="flex items-baseline gap-1">
                            <span className={`text-4xl font-bold ${textClass}`} style={{letterSpacing: '-1px'}}>{priceData.val}</span>
                            <span className={`text-sm ${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'}`}>{priceData.suffix}</span>
                          </div>
                        </div>
                        
                        <ul className="list-none p-0 m-0 flex-grow mb-5">
                          {[
                            { label: 'Frete Grátis Rápido', included: true },
                            { label: 'Cashback ML', included: true },
                            { label: 'Disney+ e Deezer', included: plan !== 'essential' },
                            { label: 'HBO Max', included: plan === 'mega' }
                          ].map((benefit, idx) => (
                            <li key={idx} className={`relative py-2.5 text-sm ${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} border-b ${isDarkMode ? 'border-white/6' : 'border-black/6'} flex items-center gap-2.5 ${!benefit.included && 'opacity-40 line-through'}`}>
                              <span className={`text-base ${benefit.included ? 'text-[#00a650]' : 'text-red-500'}`}>
                                {benefit.included ? '✓' : '✕'}
                              </span>
                              {benefit.label}
                            </li>
                          ))}
                        </ul>
                        
                        <button className="cta-btn-3d inline-flex justify-center items-center px-8 py-4 bg-gradient-to-b from-[#800080] to-[#4A004A] text-white text-base font-bold cursor-pointer rounded-xl border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_15px_rgba(0,0,0,0.5)] transition-all hover:brightness-115 hover:-translate-y-1 w-full relative overflow-hidden">
                          Assinar
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 06. SPECIAL EFFECTS */}
          <section id="special-effects" className="mb-32 scroll-mt-10">
            <div className="mb-10">
              <h2 className={`text-3xl font-bold ${textClass} mb-2 flex items-center gap-3`}>
                <span className="text-[#800080] opacity-60">#</span>
                06. Special Effects
              </h2>
              <p className={`${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} opacity-60`}>
                Demonstração de efeitos avançados usando gradientes animados para bordas ultra finas e painéis com halo aurora.
              </p>
            </div>

            <h3 className={`text-xl font-bold ${textClass} mb-5 opacity-80`}>Bordas Ultra Finas</h3>
            <p className={`${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} mb-6 text-sm opacity-70`}>
              Ative o toggle global para testar o mesmo componente sobre superfícies claras e escuras.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { label: 'Slow (Ambient)', speedClass: 'speed-slow', title: 'Plano Mega', desc: 'Borda fina e suave para destaque premium. Ideal para planos de assinatura.', actionType: 'button' },
                { label: 'Medium (Default)', speedClass: 'speed-medium', title: 'Promoção', desc: 'Velocidade média para cards de oferta e destaque em carrosséis. Texto mais longo demonstra alinhamento em altura.', actionType: 'icons' },
                { label: 'Fast (Alert)', speedClass: 'speed-fast', title: 'Oferta Relâmpago', desc: 'Alta velocidade para criar senso de urgência imediata.', actionType: 'cta' }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-4 h-full">
                  <div className={`text-xs ${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} uppercase tracking-widest opacity-70`}>{item.label}</div>
                  <div className={`border-animated-wrapper ${item.speedClass}`}>
                    <div className={`${isDarkMode ? 'bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]' : 'bg-gradient-to-br from-white to-[#F6F4F1]'} p-8 rounded-2xl h-full flex flex-col gap-4 relative z-10`}>
                      <h3 className={`text-2xl font-bold ${textClass}`}>{item.title}</h3>
                      <p className={`text-sm ${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} opacity-80 flex-grow leading-relaxed`}>{item.desc}</p>
                      {item.actionType === 'button' && (
                        <button className={`mt-5 px-5 py-3 ${isDarkMode ? 'bg-white/10 border border-white/20 text-white' : 'bg-black/5 border border-black/10 text-black'} rounded-lg text-sm font-semibold w-full hover:bg-[#800080] hover:border-[#800080] hover:text-white transition-colors`}>Ver detalhes</button>
                      )}
                      {item.actionType === 'icons' && (
                        <div className="mt-1 text-2xl">🦄 ✨</div>
                      )}
                      {item.actionType === 'cta' && (
                        <button className="mt-5 px-5 py-3 bg-[#E84A2E] border-none text-white rounded-lg text-sm font-semibold w-full">Comprar agora</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h3 className={`text-xl font-bold ${textClass} mb-5 opacity-80`}>Aurora Halo Panels</h3>
            <p className={`${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} mb-6 text-sm opacity-70`}>
              Use as variações de halo para comunicar foco, energia e status contínuo em seções críticas.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { tone: 'purple', tag: 'Modo foco', title: 'Área de Criadores', desc: 'Halo roxo frio para dashboards, ferramentas analíticas e controles avançados.', link: 'Configurar agora →' },
                { tone: 'orange', tag: 'Evento ao vivo', title: 'Live Shopping', desc: 'Blend quente enfatiza energia e conversão. Ideal para lançamentos sazonais.', link: 'Adicionar à vitrine →' },
                { tone: 'pulse', tag: 'Status OK', title: 'Serviços 24/7', desc: 'Combinações pulsantes comunicam estabilidade contínua para cartões de suporte.', link: 'Ver monitoramento →' }
              ].map((card, idx) => (
                <article 
                  key={idx} 
                  className={`aurora-card p-8 border ${borderClass} min-h-[240px] flex flex-col gap-5 ${isDarkMode ? 'bg-gradient-to-br from-[#121212]/92 to-[#050505]/96' : 'bg-gradient-to-br from-white/96 to-[#F6F4F1]/98'}`}
                  data-tone={card.tone}
                >
                  <span className={`self-start px-3 py-1.5 rounded-full border ${isDarkMode ? 'border-white/15 bg-white/5 text-[#E2E4E7]' : 'border-black/10 bg-black/5 text-[#4A4A4A]'} text-[11px] font-semibold uppercase tracking-widest z-10`}>{card.tag}</span>
                  <h3 className={`text-2xl font-bold ${textClass} z-10`}>{card.title}</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-[#E2E4E7]' : 'text-[#4A4A4A]'} opacity-80 leading-relaxed flex-1 z-10`}>{card.desc}</p>
                  <a href="#" className={`inline-flex items-center gap-2 font-semibold text-sm ${textClass} opacity-90 hover:opacity-100 transition-opacity z-10`}>{card.link}</a>
                </article>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
