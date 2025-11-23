"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useMemo } from "react";
import DOMPurify from "isomorphic-dompurify";
import { PersonaEntry } from "@/lib/personas";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface PersonaViewerProps {
  personas: PersonaEntry[];
  currentPersonaSlug: string;
  htmlContent: string;
  images: string[];
}

const ValuesCard = ({ values, quotes }: { values: string[], quotes: string[] }) => {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    if (quotes.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="andes-card values-card-interactive">
      {/* Quotes Slider Section */}
      <div className="quotes-slider-section">
        <div className="quote-icon-container">
          <Quote size={32} className="text-andes-secondary opacity-20" />
        </div>
        
        <div className="slider-content">
          <div className="quote-display">
            <p className="quote-text">&quot;{quotes[currentQuote]}&quot;</p>
          </div>
        </div>

        {quotes.length > 1 && (
          <div className="slider-dots">
            {quotes.map((_, idx) => (
              <span 
                key={idx} 
                className={`dot ${idx === currentQuote ? 'active' : ''}`}
                onClick={() => setCurrentQuote(idx)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Values Hashtags Section */}
      <div className="values-hashtags-section">
        <h3 className="values-title">O que busca em um serviço:</h3>
        <div className="hashtags-container">
          {values.map((value, idx) => (
            <span key={idx} className="hashtag">
              #{value}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .values-card-interactive {
          background-color: #e5e5e5;
          border-radius: var(--andes-radius-l);
          padding: 40px;
          margin-top: 0;
          display: flex;
          flex-direction: column;
          gap: 32px;
          box-shadow: none;
        }

        .quotes-slider-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          min-height: 160px;
          justify-content: center;
        }

        .quote-icon-container {
          margin-bottom: 16px;
        }

        .slider-content {
          display: flex;
          align-items: center;
          width: 100%;
          gap: 16px;
        }

        .quote-display {
          flex: 1;
          text-align: center;
        }

        .quote-text {
          font-size: 32px;
          font-weight: 300;
          font-style: italic;
          color: var(--andes-neutral-800);
          line-height: 1.4;
          margin: 0;
        }

        .slider-dots {
          display: flex;
          gap: 8px;
          margin-top: 24px;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--andes-neutral-600);
          cursor: pointer;
          transition: all 0.2s;
        }

        .dot.active {
          background-color: var(--andes-secondary);
          transform: scale(1.2);
        }

        .values-hashtags-section {
          border-top: 1px solid rgba(0,0,0,0.05);
          padding-top: 24px;
          text-align: center;
        }

        .values-title {
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--andes-neutral-600);
          margin-bottom: 16px;
          font-weight: 600;
        }

        .hashtags-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
        }

        .hashtag {
          font-size: 16px;
          color: var(--andes-neutral-700);
          font-weight: 500;
          background-color: rgba(255,255,255,0.5);
          padding: 8px 16px;
          border-radius: 100px;
          transition: all 0.2s;
        }

        .hashtag:hover {
          background-color: #fff;
          color: var(--andes-secondary);
          transform: translateY(-2px);
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
      `}</style>
    </div>
  );
};

const PersonaViewer = ({ personas, currentPersonaSlug, htmlContent, images }: PersonaViewerProps) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomScale, setZoomScale] = useState(1);

  // Find the current persona index
  useEffect(() => {
    const index = personas.findIndex((p) => p.slug === currentPersonaSlug);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [currentPersonaSlug, personas]);

  // Zoom effect on scroll
  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      const scrollTop = target.scrollTop;
      const scrollHeight = target.scrollHeight - target.clientHeight;
      const scrollProgress = Math.min(scrollTop / scrollHeight, 1);
      // Zoom from 1 to 1.2 based on scroll progress
      const scale = 1 + (scrollProgress * 0.2);
      setZoomScale(scale);
    };

    const contentArea = document.querySelector('.persona-content-scroll');
    if (contentArea) {
      contentArea.addEventListener('scroll', handleScroll);
      return () => contentArea.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const navigateToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      const prevPersona = personas[currentIndex - 1];
      router.push(`/pesquisa/personas/${prevPersona.slug}`);
    }
  }, [currentIndex, personas, router]);

  const navigateToNext = useCallback(() => {
    if (currentIndex < personas.length - 1) {
      const nextPersona = personas[currentIndex + 1];
      router.push(`/pesquisa/personas/${nextPersona.slug}`);
    }
  }, [currentIndex, personas, router]);

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

  // Extract persona role and quote from HTML
  const { personaRole, personaQuote } = useMemo(() => {
    if (typeof window === 'undefined') return { personaRole: '', personaQuote: '' };
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    const roleElement = doc.querySelector('.persona-role');
    const quoteElement = doc.querySelector('.persona-quote');
    
    return {
      personaRole: roleElement?.textContent?.trim() || '',
      personaQuote: quoteElement?.textContent?.trim() || '',
    };
  }, [htmlContent]);

  // Extract Values Card Data separately
  const valuesCardData = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // Find the card with "Valores Essenciais"
    const cards = Array.from(doc.querySelectorAll('.andes-card'));
    const valuesCard = cards.find(card => card.querySelector('h2')?.textContent?.includes('Valores Essenciais'));
    
    if (valuesCard) {
      // Extract Values
      const p = valuesCard.querySelector('p');
      const values = p?.textContent?.split(',').map(v => v.trim()).filter(Boolean) || [];
      
      // Extract Quotes
      const lis = Array.from(valuesCard.querySelectorAll('li'));
      const quotes = lis.map(li => li.textContent?.replace(/^["“]|["”]$/g, '').trim()).filter(Boolean) as string[];
      
      return { values, quotes };
    }
    return null;
  }, [htmlContent]);

  // Process HTML content to fix image paths and sanitize
  const processedHtml = useMemo(() => {
    let html = htmlContent
      .replace(/<img /g, '<img loading="lazy" ')
      .replace(/src="([^"]+\.(webp|png|jpg|jpeg|gif))"/gi, (match, imagePath) => {
        // Only process paths that are relative and don't start with /, //, http, or https
        if (!imagePath.startsWith('http') && !imagePath.startsWith('/')) {
          return `src="/pesquisa/personas/${encodeURIComponent(currentPersonaSlug)}/assets/${encodeURIComponent(imagePath)}"`;
        }
        return match;
      })
      .replace(/<link rel="stylesheet" href="\.\.\/personas\.css">/g, '')
      .replace(/<script src="\.\.\/personas\.js"><\/script>/g, '');
    
    // Sanitize HTML to prevent XSS
    const sanitized = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['div', 'section', 'img', 'h1', 'h2', 'h3', 'h4', 'p', 'span', 'ul', 'li', 'blockquote', 'strong', 'em', 'br'],
      ALLOWED_ATTR: ['class', 'style', 'src', 'alt', 'id', 'loading'],
      ALLOW_DATA_ATTR: false,
      ALLOW_UNKNOWN_PROTOCOLS: false,
    });

    // Inject quote card after first visible card (second card, since first is hidden)
    if (personaQuote) {
      const quoteCard = `
        <div class="quote-card-injected" style="margin: 0 -60px 24px -60px; padding: 48px 60px; background-color: #e5e5e5; display: flex; align-items: center; justify-content: center; min-height: 200px;">
          <blockquote style="font-size: 32px; font-weight: 300; font-style: italic; color: #333333; text-align: center; line-height: 1.4; max-width: 800px;">
            "${personaQuote}"
          </blockquote>
        </div>
      `;
      
      // Find and replace: insert after the second visible card (third card total)
      // Match the first card (hidden), second card (Quem é?), then insert before third card
      const parts = sanitized.split(/<div class="andes-card"/);
      if (parts.length >= 4) {
        // Reconstruct: parts[0] + card1 + card2 + quoteCard + card3...
        let finalHtml = parts[0] + 
               '<div class="andes-card"' + parts[1] + 
               '<div class="andes-card"' + parts[2] + 
               quoteCard +
               '<div class="andes-card"' + parts.slice(3).join('<div class="andes-card"');

        // Remove the last card (Valores Essenciais) from HTML string because we will render it as a React component
        const lastCardIndex = finalHtml.lastIndexOf('<div class="andes-card"');
        if (lastCardIndex !== -1) {
          const lastCardContent = finalHtml.substring(lastCardIndex);
          if (lastCardContent.includes('Valores Essenciais')) {
            return finalHtml.substring(0, lastCardIndex);
          }
        }
        
        return finalHtml;
      }
    }

    return sanitized;
  }, [htmlContent, currentPersonaSlug, personaQuote]);

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100">
      {/* Header fixo no topo */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={() => router.push("/pesquisa")}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 w-10 h-10 text-gray-700 transition hover:bg-gray-50"
            aria-label="Voltar"
          >
            <span aria-hidden className="text-xl">←</span>
          </button>
          
          <div>
            <div className="flex items-baseline gap-3">
              <h1 className="text-2xl font-medium text-gray-900">
                {personas[currentIndex]?.title || "Persona"}
              </h1>
              <p className="text-base text-gray-600">
                {personaRole}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-600">
            {currentIndex + 1} / {personas.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={navigateToPrevious}
              disabled={currentIndex === 0}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Persona anterior"
            >
              ‹
            </button>
            <button
              onClick={navigateToNext}
              disabled={currentIndex === personas.length - 1}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Próxima persona"
            >
              ›
            </button>
          </div>
        </div>
      </header>

      {/* Content area com grid de 12 colunas - abaixo do header */}
      <div className="flex-1 grid grid-cols-12 pt-[73px] overflow-hidden">
        {/* Fotografia - 4 colunas, fixa, não scrolla, sem padding, com zoom */}
        <div className="col-span-4 h-full overflow-hidden">
          <div
            className="persona-visual-area w-full h-full"
            style={{ 
              transform: `scale(${zoomScale})`,
              transition: 'transform 0.1s ease-out'
            }}
            dangerouslySetInnerHTML={{ __html: processedHtml }}
          />
        </div>
        
        {/* Área de texto - 8 colunas, scrollável */}
        <div className="col-span-8 h-full overflow-y-auto bg-gray-100 persona-content-scroll">
          <div
            className="persona-content-area"
            dangerouslySetInnerHTML={{ __html: processedHtml }}
          />
          {valuesCardData && (
            <div className="px-[60px] pb-[40px] bg-[#ededed]">
              <ValuesCard values={valuesCardData.values} quotes={valuesCardData.quotes} />
            </div>
          )}
        </div>
      </div>

      {/* Add personas.css styles inline */}
      <style jsx global>{`
        /* Personas CSS - imported inline */
        :root {
          --andes-primary: #ffe600;
          --andes-primary-dark: #e6cf00;
          --andes-secondary: #3483fa;
          --andes-secondary-dark: #2968c8;
          --andes-secondary-bg: rgba(65,137,230,.15);
          --andes-success: #00a650;
          --andes-warning: #ff7733;
          --andes-error: #f23d4f;
          --andes-purple-meli: #8e24aa;
          --andes-neutral-0: #ffffff;
          --andes-neutral-100: #f5f5f0;
          --andes-neutral-200: #ebebeb;
          --andes-neutral-300: #e6e6e6;
          --andes-neutral-600: #999999;
          --andes-neutral-800: #333333;
          --andes-neutral-900: #000000;
          --andes-bg-page: #ededed;
          --andes-bg-auth: #f5f5f5;
          --andes-font-family: 'Roboto', sans-serif;
          --andes-font-size-xs: 12px;
          --andes-font-size-s: 14px;
          --andes-font-size-m: 16px;
          --andes-font-size-l: 18px;
          --andes-font-size-xl: 24px;
          --andes-font-size-xxl: 32px;
          --andes-radius-s: 4px;
          --andes-radius-m: 6px;
          --andes-radius-l: 8px;
          --andes-radius-pill: 2rem;
          --andes-shadow-sm: 0 1px 2px 0 rgba(0,0,0,.1);
          --andes-shadow-md: 0 4px 8px 0 rgba(0,0,0,.12);
          --andes-transition: all .2s ease;
        }

        .persona-content .persona-section {
          min-height: 100%;
          display: grid;
          grid-template-columns: 35% 65%;
          overflow: auto;
          background: var(--andes-bg-page);
        }

        /* Área visual - apenas a imagem */
        .persona-visual-area .persona-section {
          display: block;
        }

        .persona-visual-area .persona-visual {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          height: 100%;
          width: 100%;
        }

        .persona-visual-area .persona-content {
          display: none;
        }

        /* Ocultar a área visual na coluna de texto */
        .persona-content-area .persona-visual {
          display: none;
        }

        /* Container dos cards com grid */
        .persona-content-area .persona-content {
          background-color: var(--andes-bg-page);
          padding: 40px 60px 24px 60px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        /* 1. Card Oculto (Hidden) */
        .persona-content .andes-card:nth-child(1) {
          display: none;
        }

        /* 2. Quem é? - Horizontal, Texto Esquerda, Imagem Direita */
        .persona-content .andes-card:nth-child(2) {
          grid-column: 1 / -1;
          background-color: var(--andes-neutral-0);
          border-radius: var(--andes-radius-l);
          box-shadow: var(--andes-shadow-sm);
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto 1fr;
          padding: 0;
        }
        .persona-content .andes-card:nth-child(2) h2 { grid-column: 1; grid-row: 1; padding: 32px 32px 0; margin: 0; z-index: 1; font-size: var(--andes-font-size-xl); font-weight: 500; color: var(--andes-neutral-900); }
        .persona-content .andes-card:nth-child(2) h3 { grid-column: 1; grid-row: 2; padding: 8px 32px 0; margin: 0; z-index: 1; font-size: var(--andes-font-size-s); font-weight: 400; color: var(--andes-neutral-600); }
        .persona-content .andes-card:nth-child(2) .story-content { grid-column: 1 / -1; grid-row: 1 / -1; display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
        .persona-content .andes-card:nth-child(2) .story-content > *:not(img) { padding: 100px 32px 32px; }
        .persona-content .andes-card:nth-child(2) .story-content img { width: 100%; height: 100%; object-fit: cover; }

        /* 3. Quote Card Injetado */
        .quote-card-injected {
          grid-column: 1 / -1;
        }

        /* 4. Comportamento - Horizontal, Imagem Esquerda, Texto Direita */
        .persona-content .andes-card:nth-child(4) {
          grid-column: 1 / -1;
          background-color: var(--andes-neutral-0);
          border-radius: var(--andes-radius-l);
          box-shadow: var(--andes-shadow-sm);
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto 1fr;
          padding: 0;
        }
        .persona-content .andes-card:nth-child(4) h2 { grid-column: 2; grid-row: 1; padding: 32px 32px 0; margin: 0; z-index: 1; font-size: var(--andes-font-size-xl); font-weight: 500; color: var(--andes-neutral-900); }
        .persona-content .andes-card:nth-child(4) h3 { grid-column: 2; grid-row: 2; padding: 8px 32px 0; margin: 0; z-index: 1; font-size: var(--andes-font-size-s); font-weight: 400; color: var(--andes-neutral-600); }
        .persona-content .andes-card:nth-child(4) .story-content { grid-column: 1 / -1; grid-row: 1 / -1; display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
        .persona-content .andes-card:nth-child(4) .story-content img { order: -1; width: 100%; height: 100%; object-fit: cover; }
        .persona-content .andes-card:nth-child(4) .story-content > *:not(img) { padding: 100px 32px 32px; }

        /* Card 4 List Styling (Dividers) */
        .persona-content .andes-card:nth-child(4) ul { list-style: none; padding: 0; margin: 0; }
        .persona-content .andes-card:nth-child(4) li { padding: 12px 0; border-bottom: 1px solid var(--andes-neutral-200); color: var(--andes-neutral-800); line-height: 1.5; }
        .persona-content .andes-card:nth-child(4) li:last-child { border-bottom: none; }
        .persona-content .andes-card:nth-child(4) li::before { content: none; }

        /* 5 & 6. Dores e Oportunidades - Vertical, Lado a Lado */
        .persona-content .andes-card:nth-child(5),
        .persona-content .andes-card:nth-child(6) {
          grid-column: span 1;
          background-color: var(--andes-neutral-0);
          border-radius: var(--andes-radius-l);
          box-shadow: var(--andes-shadow-sm);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          padding: 0;
        }

        /* Unwrap story-content to reorder children */
        .persona-content .andes-card:nth-child(5) .story-content,
        .persona-content .andes-card:nth-child(6) .story-content {
          display: contents;
        }

        /* Image Positioning for Cards 5 & 6 */
        /* Card 5 (Dores): Image at BOTTOM */
        .persona-content .andes-card:nth-child(5) img {
          order: 10;
          width: 100%;
          min-height: 250px;
          flex-grow: 1;
          object-fit: cover;
          display: block;
          margin: 0;
        }

        /* Card 6 (Oportunidades): Image at TOP */
        .persona-content .andes-card:nth-child(6) img {
          order: -1;
          width: 100%;
          height: 250px;
          object-fit: cover;
        }

        /* Title and Subtitle */
        .persona-content .andes-card:nth-child(5) h2,
        .persona-content .andes-card:nth-child(6) h2 {
          order: 0;
          padding: 24px 24px 0;
          margin: 0;
          font-size: var(--andes-font-size-xl);
          font-weight: 500;
          color: var(--andes-neutral-900);
        }

        .persona-content .andes-card:nth-child(5) h3,
        .persona-content .andes-card:nth-child(6) h3 {
          order: 1;
          padding: 8px 24px 16px;
          margin: 0;
          font-size: var(--andes-font-size-s);
          font-weight: 400;
          color: var(--andes-neutral-600);
        }

        /* Content styling (Lists with dividers) */
        .persona-content .andes-card:nth-child(5) ul,
        .persona-content .andes-card:nth-child(6) ul {
          order: 2;
          list-style: none;
          padding: 0 24px 24px;
          margin: 0;
        }

        .persona-content .andes-card:nth-child(5) li,
        .persona-content .andes-card:nth-child(6) li {
          padding: 16px 0;
          border-bottom: 1px solid var(--andes-neutral-200);
          color: var(--andes-neutral-800);
          line-height: 1.5;
        }

        .persona-content .andes-card:nth-child(5) li:last-child,
        .persona-content .andes-card:nth-child(6) li:last-child {
          border-bottom: none;
        }
        
        /* Ensure no bullets */
        .persona-content .andes-card:nth-child(5) li::before,
        .persona-content .andes-card:nth-child(6) li::before {
          content: none;
        }

        /* 7. Valores Essenciais - Redesigned */
        .persona-content .andes-card:nth-child(7) {
          grid-column: 1 / -1;
          background-color: #e0e0e0;
          border-radius: var(--andes-radius-l);
          box-shadow: none;
          padding: 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }

        /* Header area spans full width if needed, but let's keep it on left for now or split */
        .persona-content .andes-card:nth-child(7) h2 { 
          grid-column: 1 / -1;
          font-size: var(--andes-font-size-xl); 
          font-weight: 500; 
          color: var(--andes-neutral-900); 
          margin-bottom: 8px; 
        }
        .persona-content .andes-card:nth-child(7) h3 { 
          grid-column: 1 / -1;
          font-size: var(--andes-font-size-s); 
          font-weight: 400; 
          color: var(--andes-neutral-600); 
          margin-bottom: 32px; 
        }

        /* Left Column: Values Tags */
        .values-tags-container {
          grid-column: 1;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-content: start;
        }

        .value-tag {
          background-color: var(--andes-primary);
          color: var(--andes-neutral-900);
          padding: 12px 24px;
          border-radius: var(--andes-radius-pill);
          font-weight: 600;
          font-size: var(--andes-font-size-m);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: transform 0.2s ease;
        }
        
        .value-tag:hover {
          transform: translateY(-2px);
        }

        /* Right Column: Quote Section */
        .values-quote-section {
          grid-column: 2;
          background-color: var(--andes-neutral-0);
          padding: 24px;
          border-radius: var(--andes-radius-m);
          border-left: 4px solid var(--andes-secondary);
        }

        .values-quote-section h4 {
          font-size: var(--andes-font-size-s);
          font-weight: 700;
          color: var(--andes-neutral-800);
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .values-quote-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .values-quote-section li {
          position: relative;
          padding-left: 20px;
          margin-bottom: 12px;
          font-style: italic;
          color: var(--andes-neutral-600);
          line-height: 1.5;
        }

        .values-quote-section li::before {
          content: "“";
          position: absolute;
          left: 0;
          font-size: 24px;
          line-height: 1;
          color: var(--andes-secondary);
          top: -4px;
        }

        .persona-content .profile-data-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid var(--andes-neutral-200);
        }

        .persona-content .profile-data-row:last-child {
          border-bottom: none;
        }

        .persona-content .profile-label {
          font-weight: 700;
          color: var(--andes-neutral-800);
        }

        .persona-content .andes-list {
          list-style: none;
          padding-left: 0;
        }

        .persona-content .andes-list li {
          position: relative;
          padding-left: 24px;
          margin-bottom: 12px;
          line-height: 1.6;
        }

        .persona-content .andes-list li::before {
          content: "•";
          position: absolute;
          left: 8px;
          color: var(--andes-secondary);
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .persona-content .persona-section {
            grid-template-columns: 1fr;
          }

          .persona-content .persona-visual {
            position: relative;
            height: auto;
            min-height: 400px;
          }

          .persona-content .story-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default PersonaViewer;
