"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Globe,
  Layers,
  Zap,
  Link as LinkIcon,
  Info,
} from "lucide-react";
import type { BenchmarkEntry } from "@/lib/benchmarking";

interface BenchmarkingViewerProps {
  entries: BenchmarkEntry[];
  currentSlug: string;
}

const isValidUrl = (url?: string | null): string | null => {
  if (!url) {
    return null;
  }

  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:" ? parsed.toString() : null;
  } catch (error) {
    return null;
  }
};

const BenchmarkingViewer = ({ entries, currentSlug }: BenchmarkingViewerProps) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const index = entries.findIndex((entry) => entry.slug === currentSlug);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [currentSlug, entries]);

  const navigateToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      const previous = entries[currentIndex - 1];
      router.push(`/pesquisa/benchmarking/${previous.slug}`);
    }
  }, [currentIndex, entries, router]);

  const navigateToNext = useCallback(() => {
    if (currentIndex < entries.length - 1) {
      const next = entries[currentIndex + 1];
      router.push(`/pesquisa/benchmarking/${next.slug}`);
    }
  }, [currentIndex, entries, router]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        navigateToPrevious();
      }

      if (event.key === "ArrowRight") {
        navigateToNext();
      }

      if (event.key === "Escape") {
        router.push("/pesquisa");
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigateToNext, navigateToPrevious, router]);

  const currentEntry = entries[currentIndex];

  const landingPageUrl = useMemo(() => isValidUrl(currentEntry?.landingPage), [currentEntry]);
  const hasScreenshots = Boolean(currentEntry?.screenshots?.length);

  const iframeKey = currentEntry ? `${currentEntry.slug}-${landingPageUrl ?? "no-link"}` : "iframe";

  return (
    <div className="flex h-screen w-full flex-col bg-gray-100">
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex flex-1 items-center gap-4">
          <button
            onClick={() => router.push("/pesquisa")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-gray-700 transition hover:bg-gray-50"
            aria-label="Voltar para pesquisa"
          >
            <span aria-hidden className="text-xl">←</span>
          </button>

          <div className="relative min-w-0">
            <button
              onClick={() => setIsDropdownOpen((value) => !value)}
              className="flex items-center gap-2 truncate text-2xl font-semibold text-gray-900 hover:text-gray-700"
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
            >
              {currentEntry?.company ?? "Benchmark"}
              <ChevronDown size={18} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 z-40 mt-2 w-72 max-h-80 overflow-y-auto rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                {entries.map((entry) => (
                  <button
                    key={entry.slug}
                    onClick={() => {
                      router.push(`/pesquisa/benchmarking/${entry.slug}`);
                      setIsDropdownOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition ${
                      entry.slug === currentEntry?.slug
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="font-medium">{entry.company}</span>
                    {entry.slug === currentEntry?.slug && (
                      <span className="text-xs font-semibold uppercase">Atual</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="whitespace-nowrap text-sm font-medium text-gray-600">
            {currentIndex + 1} / {entries.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={navigateToPrevious}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Benchmark anterior"
            >
              <ChevronLeft size={18} />
              Anterior
            </button>
            <button
              onClick={navigateToNext}
              disabled={currentIndex === entries.length - 1}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Próximo benchmark"
            >
              Próximo
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="grid flex-1 grid-cols-12 overflow-hidden pt-[73px]">
        <aside className="col-span-4 h-full overflow-y-auto border-r border-gray-200 bg-white">
          {currentEntry ? (
            <div className="flex h-full flex-col">
              {/* Header da Coluna */}
              <div className="border-b border-gray-100 px-8 py-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl font-bold text-blue-600 shadow-sm">
                    {currentEntry.company.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold leading-tight text-gray-900">
                      {currentEntry.program}
                    </h2>
                    <p className="text-sm font-medium text-gray-500">{currentEntry.company}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-gray-600">
                  Análise detalhada da estrutura de fidelização e mecânicas de engajamento.
                </p>
              </div>

              {/* Conteúdo Scrollável */}
              <div className="flex-1 space-y-8 overflow-y-auto px-8 py-8">
                {/* Bundling */}
                <section>
                  <div className="mb-3 flex items-center gap-2 text-blue-700">
                    <Layers size={20} />
                    <h3 className="text-sm font-bold uppercase tracking-wider">
                      Estrutura de Bundling
                    </h3>
                  </div>
                  <div className="whitespace-pre-line rounded-xl border border-gray-100 bg-gray-50 p-5 text-sm leading-relaxed text-gray-700 shadow-sm">
                    {currentEntry.bundlingDescription}
                  </div>
                </section>

                {/* Mecânicas */}
                <section>
                  <div className="mb-3 flex items-center gap-2 text-amber-600">
                    <Zap size={20} />
                    <h3 className="text-sm font-bold uppercase tracking-wider">
                      Mecânicas & Gamificação
                    </h3>
                  </div>
                  <div className="whitespace-pre-line rounded-xl border border-amber-100 bg-amber-50 p-5 text-sm leading-relaxed text-gray-800 shadow-sm">
                    {currentEntry.mechanics}
                  </div>
                </section>

                {/* Links e Recursos */}
                <section className="border-t border-gray-100 pt-6">
                  <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Recursos Adicionais
                  </h3>

                  <div className="space-y-3">
                    {landingPageUrl ? (
                      <a
                        href={landingPageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex w-full items-center justify-between rounded-lg border border-gray-200 p-3 transition-all hover:border-blue-300 hover:bg-blue-50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="rounded-md bg-gray-100 p-2 text-gray-600 transition-colors group-hover:bg-white group-hover:text-blue-600">
                            <LinkIcon size={18} />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700">
                              Landing Page Oficial
                            </p>
                            <p className="max-w-[200px] truncate text-xs text-gray-500">
                              {landingPageUrl}
                            </p>
                          </div>
                        </div>
                        <ExternalLink
                          size={16}
                          className="text-gray-400 group-hover:text-blue-500"
                        />
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-3">
                        <Info size={18} className="text-gray-400" />
                        <p className="text-xs text-gray-500">Link oficial não disponível</p>
                      </div>
                    )}

                    <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">
                      <div className="rounded-md bg-gray-100 p-2 text-gray-600">
                        <Globe size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Capturas de Tela</p>
                        <p className="text-xs text-gray-500">
                          {hasScreenshots
                            ? `${currentEntry.screenshots.length} imagens capturadas`
                            : "Nenhuma captura automática"}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-gray-600">
                Selecione um benchmark para visualizar os detalhes.
              </p>
            </div>
          )}
        </aside>

        <section className="col-span-8 h-full overflow-y-auto bg-gray-100 px-8 py-10">
          {hasScreenshots ? (
            <div className="mx-auto flex max-w-4xl flex-col">
              {currentEntry?.screenshots.map((src, index) => (
                <div
                  key={src}
                  className={
                    index === 0
                      ? index === currentEntry.screenshots.length - 1
                        ? "overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                        : "overflow-hidden rounded-t-2xl border border-gray-200 bg-white shadow-sm border-b-0"
                      : index === currentEntry.screenshots.length - 1
                        ? "overflow-hidden rounded-b-2xl border border-gray-200 bg-white shadow-sm"
                        : "overflow-hidden border border-gray-200 bg-white shadow-sm border-t-0"
                  }
                >
                  <Image
                    src={src}
                    alt={`${currentEntry.company} - captura ${index + 1}`}
                    width={1920}
                    height={1080}
                    sizes="100vw"
                    className="h-auto w-full"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          ) : landingPageUrl ? (
            <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Globe size={16} />
                  <span className="truncate">{landingPageUrl}</span>
                </div>
                <span className="text-xs text-gray-500">Visualização incorporada da landing page</span>
              </div>
              <iframe
                key={iframeKey}
                src={landingPageUrl}
                title={`Landing page ${currentEntry?.company ?? ""}`}
                className="flex-1 border-0"
                loading="lazy"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              />
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4 px-10 text-center">
              <div className="rounded-full bg-blue-50 p-3 text-blue-600">
                <Globe size={28} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Nenhuma referência visual disponível</h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  Adicione capturas em <code>public/benchmarking-screenshots/{currentEntry?.slug}</code> ou informe uma landing page válida em <code>Bench.json</code> para enriquecer a análise.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default BenchmarkingViewer;
