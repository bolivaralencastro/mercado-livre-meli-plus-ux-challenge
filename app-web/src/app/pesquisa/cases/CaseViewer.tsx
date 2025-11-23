"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { CaseEntry, CaseImage } from "@/lib/cases";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

interface CaseViewerProps {
  cases: CaseEntry[];
  currentCaseSlug: string;
  images: CaseImage[];
}

const CaseViewer = ({ cases, currentCaseSlug, images }: CaseViewerProps) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const index = cases.findIndex((c) => c.slug === currentCaseSlug);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [currentCaseSlug, cases]);

  const navigateToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      const prevCase = cases[currentIndex - 1];
      router.push(`/pesquisa/cases/${prevCase.slug}`);
    }
  }, [currentIndex, cases, router]);

  const navigateToNext = useCallback(() => {
    if (currentIndex < cases.length - 1) {
      const nextCase = cases[currentIndex + 1];
      router.push(`/pesquisa/cases/${nextCase.slug}`);
    }
  }, [currentIndex, cases, router]);

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

  const currentCase = cases[currentIndex];

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
          
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 text-2xl font-medium text-gray-900 hover:text-gray-700"
            >
              {currentCase?.title || "Case"}
              <ChevronDown size={20} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-lg py-2 z-50 max-h-96 overflow-y-auto">
                {cases.map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => {
                      router.push(`/pesquisa/cases/${c.slug}`);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                      c.slug === currentCaseSlug ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700"
                    }`}
                  >
                    {c.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-600">
            {currentIndex + 1} / {cases.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={navigateToPrevious}
              disabled={currentIndex === 0}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Case anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={navigateToNext}
              disabled={currentIndex === cases.length - 1}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Próximo case"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Content area com grid de 2 colunas - abaixo do header */}
      <div className="flex-1 grid grid-cols-12 pt-[73px] overflow-hidden">
        {/* Coluna Esquerda - Resumo (Placeholder) - 4 colunas */}
        <div className="col-span-4 h-full overflow-y-auto bg-white border-r border-gray-200 p-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Resumo do Case</h2>
            <div className="p-6 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-gray-500 text-center">
              <p>Conteúdo do resumo será inserido aqui.</p>
              <p className="text-sm mt-2">(Marcação placeholder)</p>
            </div>
            
            {/* Exemplo de estrutura que poderia vir do MD depois */}
            <div className="mt-8 space-y-6 opacity-50 pointer-events-none filter blur-[1px]">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">O Desafio</h3>
                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Solução</h3>
                <p className="text-gray-600">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Coluna Direita - Imagens - 8 colunas */}
        <div className="col-span-8 h-full overflow-y-auto bg-gray-100 p-8">
          <div className="flex flex-col gap-6 max-w-4xl mx-auto">
            {images.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center text-gray-500">
                Nenhuma imagem encontrada para este case.
              </p>
            ) : (
              images.map((image, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                  <Image
                    src={image.url}
                    alt={`${currentCase?.title} - Imagem ${idx + 1}`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto"
                    unoptimized
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseViewer;
