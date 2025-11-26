"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  artigos,
  getAllTags,
  getAllCategorias,
  getArtigosPorCategoria,
  getArtigosPorTag,
  type Artigo,
  type ArtigoInsight,
  type Categoria,
  type Tag,
} from "@/lib/artigos";

function ArtigosContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedArtigoId, setSelectedArtigoId] = useState<string | null>(null);
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<"all" | "categoria" | "tag">("all");
  const [filterValue, setFilterValue] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const allTags = useMemo(() => getAllTags(), []);
  const allCategorias = useMemo(() => getAllCategorias(), []);

  const filteredArtigos = useMemo(() => {
    if (filterType === "categoria" && filterValue) {
      return getArtigosPorCategoria(filterValue as Categoria);
    }
    if (filterType === "tag" && filterValue) {
      return getArtigosPorTag(filterValue as Tag);
    }
    return artigos;
  }, [filterType, filterValue]);

  const selectedArtigo = useMemo(() => {
    if (!selectedArtigoId) return artigos[0] || null;
    return artigos.find((a) => a.id === selectedArtigoId) || null;
  }, [selectedArtigoId]);

  useEffect(() => {
    const artigoParam = searchParams.get("artigo");
    if (artigoParam) {
      setSelectedArtigoId(artigoParam);
    } else if (!selectedArtigoId && artigos.length > 0) {
      setSelectedArtigoId(artigos[0].id);
    }
  }, [searchParams, selectedArtigoId]);

  useEffect(() => {
    if (selectedArtigo && selectedArtigo.insights.length > 0 && !selectedInsight) {
      setSelectedInsight(selectedArtigo.insights[0].id);
    }
  }, [selectedArtigo, selectedInsight]);

  const handleSelectArtigo = useCallback(
    (artigo: Artigo) => {
      setSelectedArtigoId(artigo.id);
      setSelectedInsight(artigo.insights[0]?.id || null);
      setIsDropdownOpen(false);
      router.push(`/pesquisa/artigos?artigo=${artigo.id}`, { scroll: false });
    },
    [router]
  );

  const handleFilterCategoria = useCallback((categoria: string) => {
    setFilterType("categoria");
    setFilterValue(categoria);
  }, []);

  const handleFilterTag = useCallback((tag: string) => {
    setFilterType("tag");
    setFilterValue(tag);
  }, []);

  const handleClearFilter = useCallback(() => {
    setFilterType("all");
    setFilterValue(null);
  }, []);

  const scrollToInsight = useCallback((insight: ArtigoInsight) => {
    setSelectedInsight(insight.id);
    if (insight.highlightId) {
      const element = document.getElementById(insight.highlightId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isDropdownOpen) {
          setIsDropdownOpen(false);
        } else if (isFullscreen) {
          setIsFullscreen(false);
        } else if (filterType !== "all") {
          handleClearFilter();
        } else {
          router.push("/pesquisa");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, isFullscreen, isDropdownOpen, filterType, handleClearFilter]);

  // Encontrar índice atual para navegação
  const currentIndex = artigos.findIndex((a) => a.id === selectedArtigoId);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < artigos.length - 1;

  const navigatePrevious = useCallback(() => {
    if (hasPrevious) {
      handleSelectArtigo(artigos[currentIndex - 1]);
    }
  }, [hasPrevious, currentIndex, handleSelectArtigo]);

  const navigateNext = useCallback(() => {
    if (hasNext) {
      handleSelectArtigo(artigos[currentIndex + 1]);
    }
  }, [hasNext, currentIndex, handleSelectArtigo]);

  return (
    <div className="flex h-screen w-screen flex-col bg-gray-100">
      {/* Header com seletor de artigos */}
      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex flex-1 items-center gap-4">
          <button
            onClick={() => router.push("/pesquisa")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-gray-700 transition hover:bg-gray-50"
            aria-label="Voltar"
          >
            <span aria-hidden className="text-xl">
              ←
            </span>
          </button>

          {/* Dropdown de seleção de artigo */}
          <div className="relative min-w-0">
            <button
              onClick={() => setIsDropdownOpen((v) => !v)}
              className="flex items-center gap-2 truncate text-2xl font-semibold text-gray-900 hover:text-gray-700"
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
            >
              {selectedArtigo?.titulo ?? "Selecione um artigo"}
              <ChevronDown size={18} />
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 top-full z-40 mt-2 max-h-80 w-96 overflow-y-auto rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                {artigos.map((artigo) => (
                  <button
                    key={artigo.id}
                    onClick={() => handleSelectArtigo(artigo)}
                    className={`flex w-full flex-col px-4 py-3 text-left transition ${
                      artigo.id === selectedArtigoId
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-xs text-gray-500">{artigo.categoria}</span>
                    <span className="font-medium">{artigo.titulo}</span>
                    <span className="mt-1 text-xs text-gray-500">
                      {artigo.autor} • {artigo.tempoLeitura}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="whitespace-nowrap text-sm font-medium text-gray-600">
            {currentIndex + 1} / {artigos.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={navigatePrevious}
              disabled={!hasPrevious}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Artigo anterior"
            >
              ← Anterior
            </button>
            <button
              onClick={navigateNext}
              disabled={!hasNext}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Próximo artigo"
            >
              Próximo →
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="grid min-h-0 flex-1 grid-cols-12 overflow-hidden pt-[73px]">
        {/* Left Column - Resumo, Insights, Tags/Categorias */}
        <div
          className={`col-span-4 h-full overflow-y-auto border-r border-gray-200 bg-white p-8 no-scrollbar ${isFullscreen ? "hidden" : ""}`}
        >
          {/* Filtro ativo - Lista de artigos */}
          {filterType !== "all" && filterValue && (
            <div className="mb-8">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Filtrado por {filterType === "categoria" ? "categoria" : "tag"}
                  </p>
                  <p className="mt-1 text-lg font-bold text-blue-700">{filterValue}</p>
                </div>
                <button
                  onClick={handleClearFilter}
                  className="rounded-lg border border-gray-300 px-3 py-1 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
                >
                  ✕ Limpar
                </button>
              </div>

              <div className="space-y-2">
                {filteredArtigos.map((artigo) => (
                  <button
                    key={artigo.id}
                    onClick={() => handleSelectArtigo(artigo)}
                    className={`w-full rounded-lg border p-3 text-left transition ${
                      selectedArtigoId === artigo.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <p className="text-xs text-gray-500">{artigo.categoria}</p>
                    <p className="text-sm font-semibold text-gray-900">{artigo.titulo}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      {artigo.autor} • {artigo.tempoLeitura}
                    </p>
                  </button>
                ))}
              </div>

              <hr className="my-6 border-gray-200" />
            </div>
          )}

          {/* Artigo selecionado - Resumo e Insights */}
          {selectedArtigo && (
            <div className="mb-8">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                  {selectedArtigo.categoria}
                </p>
                <h2 className="mt-1 text-xl font-bold text-gray-900">{selectedArtigo.titulo}</h2>
                <p className="mt-2 text-sm text-gray-600">{selectedArtigo.resumo}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                  <span>{selectedArtigo.autor}</span>
                  <span>•</span>
                  <span>{selectedArtigo.tempoLeitura}</span>
                </div>
              </div>

              {/* Tags do artigo */}
              <div className="mb-6 flex flex-wrap gap-2">
                {selectedArtigo.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleFilterTag(tag)}
                    className="rounded-full border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                  >
                    #{tag}
                  </button>
                ))}
              </div>

              {/* Insights */}
              {selectedArtigo.insights.length > 0 && (
                <div className="mb-8">
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-700">
                    💡 Insights para o Meli+
                  </h3>
                  <div className="space-y-3">
                    {selectedArtigo.insights.map((insight) => (
                      <button
                        key={insight.id}
                        onClick={() => scrollToInsight(insight)}
                        className={`w-full rounded-lg border p-4 text-left transition ${
                          selectedInsight === insight.id
                            ? "border-gray-400 bg-gray-100"
                            : "border-gray-200 bg-gray-50 hover:border-gray-300"
                        }`}
                      >
                        <h4 className="mb-1 text-sm font-semibold text-gray-900">
                          {insight.title}
                        </h4>
                        <p className="text-xs text-gray-600">{insight.description}</p>
                        {selectedInsight === insight.id && (
                          <div className="mt-3 rounded border-l-4 border-blue-500 bg-white p-3">
                            <p className="text-xs font-medium text-blue-900">
                              💼 Aplicação no Meli+:
                            </p>
                            <p className="mt-1 text-xs text-blue-700">{insight.application}</p>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Divider */}
          <hr className="my-6 border-gray-200" />

          {/* Navegação: Categorias */}
          <div className="mb-6">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
              📂 Categorias
            </h3>
            <div className="space-y-1">
              {allCategorias.map(({ categoria, count }) => (
                <button
                  key={categoria}
                  onClick={() => handleFilterCategoria(categoria)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                    filterType === "categoria" && filterValue === categoria
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>{categoria}</span>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                    {count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Navegação: Tags */}
          <div className="mb-6">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
              🏷️ Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map(({ tag, count }) => (
                <button
                  key={tag}
                  onClick={() => handleFilterTag(tag)}
                  className={`rounded-full border px-2 py-1 text-xs transition ${
                    filterType === "tag" && filterValue === tag
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {tag} ({count})
                </button>
              ))}
            </div>
          </div>

          <p className="mt-8 text-xs text-gray-400">
            Use <kbd className="rounded border border-gray-300 bg-gray-100 px-1">Esc</kbd> para
            limpar filtros ou voltar.
          </p>
        </div>

        {/* Right Column - Article Content */}
        <div
          className={`${isFullscreen ? "col-span-12" : "col-span-8"} h-full overflow-y-auto bg-gray-100 p-8 no-scrollbar`}
        >
          {selectedArtigo ? (
            <div className="mx-auto flex max-w-3xl flex-col gap-6">
              <div className="relative rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
                {/* Fullscreen toggle */}
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-gray-700 transition hover:bg-gray-50"
                  aria-label={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
                  title={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
                >
                  {isFullscreen ? (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      />
                    </svg>
                  )}
                </button>

                {/* Article content */}
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedArtigo.conteudo }}
                />
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-500">Selecione um artigo para visualizar.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ArtigosPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
          <p className="text-gray-500">Carregando artigos...</p>
        </div>
      }
    >
      <ArtigosContent />
    </Suspense>
  );
}
