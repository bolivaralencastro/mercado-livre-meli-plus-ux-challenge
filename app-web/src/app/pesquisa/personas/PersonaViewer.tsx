"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useMemo } from "react";
import DOMPurify from "dompurify";
import { PersonaEntry } from "@/lib/personas";

interface PersonaViewerProps {
  personas: PersonaEntry[];
  currentPersonaSlug: string;
  htmlContent: string;
  images: string[];
}

const PersonaViewer = ({ personas, currentPersonaSlug, htmlContent, images }: PersonaViewerProps) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Find the current persona index
  useEffect(() => {
    const index = personas.findIndex((p) => p.slug === currentPersonaSlug);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [currentPersonaSlug, personas]);

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

  // Process HTML content to fix image paths and sanitize
  const processedHtml = useMemo(() => {
    const html = htmlContent
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
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['div', 'section', 'img', 'h1', 'h2', 'h3', 'h4', 'p', 'span', 'ul', 'li', 'blockquote', 'strong', 'em', 'br'],
      ALLOWED_ATTR: ['class', 'style', 'src', 'alt', 'id'],
      ALLOW_DATA_ATTR: false,
      ALLOW_UNKNOWN_PROTOCOLS: false,
    });
  }, [htmlContent, currentPersonaSlug]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gray-100">
      {/* Header with navigation */}
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/pesquisa")}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            <span aria-hidden>←</span>
            Voltar
          </button>
          <div className="border-l border-gray-300 pl-4">
            <p className="text-xs uppercase tracking-wide text-gray-500">Personas</p>
            <h1 className="text-lg font-bold text-gray-900">
              {personas[currentIndex]?.title || "Persona"}
            </h1>
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

      {/* Persona content - full viewport */}
      <div className="relative flex-1 overflow-auto">
        <div
          className="persona-content h-full w-full"
          dangerouslySetInnerHTML={{ __html: processedHtml }}
        />
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

        .persona-content .persona-visual {
          position: sticky;
          top: 0;
          height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }

        .persona-content .persona-image {
          width: 100%;
          max-width: 500px;
          height: auto;
          border-radius: var(--andes-radius-l);
          box-shadow: 0 20px 60px rgba(0,0,0,.3);
        }

        .persona-content .persona-content {
          background-color: var(--andes-bg-page);
          padding: 40px 60px;
          overflow-y: auto;
        }

        .persona-content .andes-card {
          background-color: var(--andes-neutral-0);
          border-radius: var(--andes-radius-l);
          padding: 24px;
          box-shadow: var(--andes-shadow-sm);
        }

        .persona-content .persona-name {
          font-size: var(--andes-font-size-xxl);
          font-weight: 900;
          color: var(--andes-neutral-900);
          margin-bottom: 8px;
        }

        .persona-content .persona-role {
          font-size: var(--andes-font-size-l);
          font-weight: 500;
          color: var(--andes-neutral-600);
          margin-bottom: 16px;
        }

        .persona-content .persona-quote {
          font-size: var(--andes-font-size-m);
          font-style: italic;
          color: var(--andes-neutral-800);
          background-color: var(--andes-neutral-100);
        }

        .persona-content h2 {
          font-size: var(--andes-font-size-xl);
          font-weight: 700;
          color: var(--andes-neutral-900);
          margin-bottom: 8px;
        }

        .persona-content h3 {
          font-size: var(--andes-font-size-s);
          font-weight: 400;
          color: var(--andes-neutral-600);
          margin-bottom: 16px;
        }

        .persona-content .story-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          align-items: start;
        }

        .persona-content .story-content img {
          width: 100%;
          height: auto;
          border-radius: var(--andes-radius-m);
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
