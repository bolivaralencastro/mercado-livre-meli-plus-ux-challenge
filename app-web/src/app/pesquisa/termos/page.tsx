"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

type Documento = {
  id: string;
  titulo: string;
  arquivo: string;
};

const documentos: Documento[] = [
  {
    id: "contratacao-assinatura",
    titulo: "Contratação de Assinatura",
    arquivo: "termos-e-condições-da-contratação-de-assinatura.md",
  },
  {
    id: "descontos-frete",
    titulo: "Descontos de Frete",
    arquivo: "Termos-e-Condições-de-Descontos-de-Frete-Frete-Grátis-e-Carrinho.md",
  },
  {
    id: "meli-dolar",
    titulo: "Meli Dólar",
    arquivo: "Termos-e-condições-de-uso-do-Meli-Dolar.md",
  },
  {
    id: "mercado-pago",
    titulo: "Mercado Pago",
    arquivo: "Termos-e-Condições-de-Uso-do-Mercado-Pago.md",
  },
  {
    id: "rendimento-conta",
    titulo: "Rendimento da Conta",
    arquivo: "Termos-e-Condições-para-o-Melhor-Rendimento-da-Conta-e-dos-Cofrinhos.md",
  },
  {
    id: "servicos-ripio",
    titulo: "Serviços Ripio",
    arquivo: "Termos-e-Condições-Gerais-de-Uso-dos-Serviços-Ripio.md",
  },
];

type Insight = {
  id: string;
  title: string;
  description: string;
  docId: string;
  highlightId: string;
};

const insights: Insight[] = [
  {
    id: "frete-essencial",
    title: "Frete grátis vira argumento de entrada",
    description:
      "O plano Essencial garante frete gratuito em milhares de produtos a partir de R$ 19 — reforça adesão pelo benefício logístico imediato.",
    docId: "contratacao-assinatura",
    highlightId: "highlight-frete-essencial",
  },
  {
    id: "cashback-meli-dollar",
    title: "Cashback com limites mensais claros",
    description:
      "Até 3% em Meli Dólar no ecossistema, com teto de R$ 5 por compra e R$ 15/mês. Transparência evita promessa exagerada na comunicação.",
    docId: "contratacao-assinatura",
    highlightId: "highlight-cashback-limites",
  },
  {
    id: "gatilho-frete",
    title: "Ticket mínimo adaptável por região",
    description:
      "Carrinho com frete grátis usa referência de R$ 79, ajustes por região e rotas. Insight para ofertas dinâmicas de benefício.",
    docId: "descontos-frete",
    highlightId: "highlight-ticket-minimo",
  },
  {
    id: "menores-representados",
    title: "Família como cluster prioritário",
    description:
      "Menores podem usar Mercado Pago desde que representados. Permite explorar pacotes familiares e guardian experiences no Meli+.",
    docId: "mercado-pago",
    highlightId: "highlight-menores",
  },
  {
    id: "rendimento-115",
    title: "Rendimento como incentivo de recorrência",
    description:
      "Conta turbinada exige aporte mensal de R$ 1.000 para manter 105% do CDI (saldo) e 115% (cofrinhos). Gatilho para assinatura ativa.",
    docId: "rendimento-conta",
    highlightId: "highlight-rendimento",
  },
  {
    id: "ripio-restricoes",
    title: "Oferta cripto exige qualificação",
    description:
      "Ripio restringe uso a maiores de 18 e proíbe residentes dos EUA. Sinaliza necessidade de messaging sobre elegibilidade e compliance.",
    docId: "servicos-ripio",
    highlightId: "highlight-ripio",
  },
];

type HighlightRule = {
  highlightId: string;
  trigger: string;
};

const highlightRules: Record<string, HighlightRule[]> = {
  "contratacao-assinatura": [
    {
      highlightId: "highlight-frete-essencial",
      trigger:
        "O Assinante do MELI+ poderá ter o benefício do frete grátis em milhares produtos a partir de R$19",
    },
    {
      highlightId: "highlight-cashback-limites",
      trigger:
        "O máximo de cashback em Meli Dólar que um Assinante do MELI+ poderá receber por compra",
    },
  ],
  "descontos-frete": [
    {
      highlightId: "highlight-ticket-minimo",
      trigger:
        "Nos casos em que a distância de envio e as dimensões do produto permitirem, o Comprador poderá acessar o benefício do frete grátis",
    },
  ],
  "mercado-pago": [
    {
      highlightId: "highlight-menores",
      trigger:
        "Os Usuários Menores de Idade poderão, desde que devidamente representados ou assistidos pelo seu representante legal",
    },
  ],
  "rendimento-conta": [
    {
      highlightId: "highlight-rendimento",
      trigger: " 105% do CDI",
    },
  ],
  "servicos-ripio": [
    {
      highlightId: "highlight-ripio",
      trigger: "Pessoas físicas **maiores de 18 anos**, com capacidade legal para contratar",
    },
  ],
};

const docIndexById = documentos.reduce<Record<string, number>>((acc, doc, index) => {
  acc[doc.id] = index;
  return acc;
}, {});

const docTitleById = documentos.reduce<Record<string, string>>((acc, doc) => {
  acc[doc.id] = doc.titulo;
  return acc;
}, {});

const renderInline = (value: string, keyPrefix: string): ReactNode[] => {
  const parts: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  // Parse lightweight markdown emphasis tokens without exposing raw HTML.
  while ((match = pattern.exec(value)) !== null) {
    const [token] = match;
    if (match.index > lastIndex) {
      parts.push(
        <span key={`${keyPrefix}-text-${key}`}>{value.slice(lastIndex, match.index)}</span>
      );
      key += 1;
    }

    if (token.startsWith("**")) {
      parts.push(
        <strong key={`${keyPrefix}-strong-${key}`}>{token.slice(2, -2)}</strong>
      );
    } else if (token.startsWith("*")) {
      parts.push(<em key={`${keyPrefix}-em-${key}`}>{token.slice(1, -1)}</em>);
    } else {
      parts.push(<code key={`${keyPrefix}-code-${key}`}>{token.slice(1, -1)}</code>);
    }
    key += 1;
    lastIndex = match.index + token.length;
  }

  if (lastIndex < value.length) {
    parts.push(
      <span key={`${keyPrefix}-text-${key}`}>{value.slice(lastIndex)}</span>
    );
  }

  return parts;
};

const renderMarkdown = (markdown: string, docId: string): ReactNode[] => {
  const lines = markdown.split("\n");
  const highlights = [...(highlightRules[docId] ?? [])];

  const takeHighlight = (text: string) => {
    const index = highlights.findIndex((rule) => text.includes(rule.trigger));
    if (index >= 0) {
      return highlights.splice(index, 1)[0];
    }
    return undefined;
  };

  const nodes: ReactNode[] = [];
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) {
      nodes.push(<div key={`space-${index}`} className="h-3" />);
      return;
    }

    if (trimmed === "---") {
      nodes.push(<hr key={`rule-${index}`} className="my-6 border-gray-300" />);
      return;
    }

    const highlight = takeHighlight(line);
    const keyBase = `line-${index}`;

    if (trimmed.startsWith("# ")) {
      const content = trimmed.replace(/^#\s+/, "");
      const inlineChildren = renderInline(content, `${keyBase}-h1`);
      nodes.push(
        <h1 key={`h1-${index}`} id={highlight?.highlightId} className="mt-10 mb-6 text-3xl font-bold text-gray-900">
          {highlight ? <mark className="bg-yellow-200 px-1 rounded">{inlineChildren}</mark> : inlineChildren}
        </h1>
      );
      return;
    }

    if (trimmed.startsWith("## ")) {
      const content = trimmed.replace(/^##\s+/, "");
      const inlineChildren = renderInline(content, `${keyBase}-h2`);
      nodes.push(
        <h2
          key={`h2-${index}`}
          id={highlight?.highlightId}
          className="mt-8 mb-4 text-2xl font-semibold text-gray-900"
        >
          {highlight ? <mark className="bg-yellow-200 px-1 rounded">{inlineChildren}</mark> : inlineChildren}
        </h2>
      );
      return;
    }

    if (trimmed.startsWith("### ")) {
      const content = trimmed.replace(/^###\s+/, "");
      const inlineChildren = renderInline(content, `${keyBase}-h3`);
      nodes.push(
        <h3
          key={`h3-${index}`}
          id={highlight?.highlightId}
          className="mt-6 mb-3 text-xl font-semibold text-gray-900"
        >
          {highlight ? <mark className="bg-yellow-200 px-1 rounded">{inlineChildren}</mark> : inlineChildren}
        </h3>
      );
      return;
    }

    if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
      const content = trimmed.replace(/^[-*]\s+/, "");
      const inlineChildren = renderInline(content, `${keyBase}-bullet`);
      nodes.push(
        <p
          key={`bullet-${index}`}
          id={highlight?.highlightId}
          className="relative mb-2 pl-6 text-gray-700 before:absolute before:left-0 before:text-gray-500 before:content-['•']"
        >
          {highlight ? <mark className="bg-yellow-200 px-1 rounded">{inlineChildren}</mark> : inlineChildren}
        </p>
      );
      return;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      const content = trimmed.replace(/^\d+\.\s+/, "");
      const inlineChildren = renderInline(content, `${keyBase}-numbered`);
      nodes.push(
        <p
          key={`number-${index}`}
          id={highlight?.highlightId}
          className="relative mb-2 pl-6 text-gray-700 before:absolute before:left-0 before:text-gray-500 before:content-['›']"
        >
          {highlight ? <mark className="bg-yellow-200 px-1 rounded">{inlineChildren}</mark> : inlineChildren}
        </p>
      );
      return;
    }

    const inlineChildren = renderInline(trimmed, `${keyBase}-paragraph`);
    nodes.push(
      <p key={`paragraph-${index}`} id={highlight?.highlightId} className="mb-4 text-gray-700">
        {highlight ? <mark className="bg-yellow-200 px-1 rounded">{inlineChildren}</mark> : inlineChildren}
      </p>
    );
  });

  return nodes;
};

export default function TermosPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [conteudo, setConteudo] = useState("");
  const [selectedInsight, setSelectedInsight] = useState(insights[0]?.id ?? "");
  const [pendingHighlight, setPendingHighlight] = useState<string | null>(insights[0]?.highlightId ?? null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentDoc = documentos[currentIndex];
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < documentos.length - 1;

  const insightsByDoc = useMemo(() => {
    return insights.reduce<Record<string, Insight[]>>((acc, insight) => {
      if (!acc[insight.docId]) {
        acc[insight.docId] = [];
      }
      acc[insight.docId].push(insight);
      return acc;
    }, {});
  }, []);

  useEffect(() => {
    let isMounted = true;

    const carregarDocumento = async () => {
      try {
        const response = await fetch(`/api/termos/${encodeURIComponent(currentDoc.arquivo)}`);
        if (!response.ok) {
          throw new Error(`Erro ao carregar documento: ${response.status}`);
        }
        const text = await response.text();
        if (isMounted) {
          setConteudo(text);
        }
      } catch (error) {
        console.error("Erro ao carregar documento:", error);
        if (isMounted) {
          setConteudo("# Erro ao carregar documento\n\nNão foi possível carregar o documento solicitado.");
        }
      }
    };

    carregarDocumento();

    return () => {
      isMounted = false;
    };
  }, [currentDoc.arquivo]);

  useEffect(() => {
    const timedHighlight = window.setTimeout(() => {
      if (!pendingHighlight) return;
      const element = document.getElementById(pendingHighlight);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setPendingHighlight(null);
    }, 160);

    return () => window.clearTimeout(timedHighlight);
  }, [conteudo, pendingHighlight]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && hasPrevious) {
        setPendingHighlight(null);
        setCurrentIndex((index) => Math.max(0, index - 1));
        setIsDropdownOpen(false);
      } else if (event.key === "ArrowRight" && hasNext) {
        setPendingHighlight(null);
        setCurrentIndex((index) => Math.min(documentos.length - 1, index + 1));
        setIsDropdownOpen(false);
      } else if (event.key === "Escape") {
        router.push("/pesquisa");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasNext, hasPrevious, router]);

  useEffect(() => {
    const docId = currentDoc.id;
    const insightAtual = insights.find((item) => item.id === selectedInsight);
    if (!insightAtual || insightAtual.docId !== docId) {
      const fallback = insightsByDoc[docId]?.[0];
      if (fallback) {
        setSelectedInsight(fallback.id);
        setPendingHighlight(fallback.highlightId);
      }
    } else if (!pendingHighlight) {
      setPendingHighlight(insightAtual.highlightId);
    }
  }, [currentDoc.id, insightsByDoc, pendingHighlight, selectedInsight]);

  const navigateToInsight = (insight: Insight) => {
    setSelectedInsight(insight.id);
    setPendingHighlight(insight.highlightId);
    const targetIndex = docIndexById[insight.docId];
    if (targetIndex !== undefined && targetIndex !== currentIndex) {
      setCurrentIndex(targetIndex);
    }
    setIsDropdownOpen(false);
  };

  const handlePrevious = () => {
    if (!hasPrevious) return;
    setPendingHighlight(null);
    setCurrentIndex((index) => Math.max(index - 1, 0));
    setIsDropdownOpen(false);
  };

  const handleNext = () => {
    if (!hasNext) return;
    setPendingHighlight(null);
    setCurrentIndex((index) => Math.min(documentos.length - 1, index + 1));
    setIsDropdownOpen(false);
  };

  const docInsights = insightsByDoc[currentDoc.id] ?? [];
  const renderedMarkdown = useMemo(() => {
    if (!conteudo) {
      return [];
    }
    return renderMarkdown(conteudo, currentDoc.id);
  }, [conteudo, currentDoc.id]);

  return (
    <div className="flex h-screen w-screen flex-col bg-gray-100">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex flex-1 items-center gap-4">
          <button
            onClick={() => router.push("/pesquisa")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-gray-700 transition hover:bg-gray-50"
            aria-label="Voltar"
          >
            <span aria-hidden className="text-xl">←</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen((open) => !open)}
              className="flex items-center gap-2 text-2xl font-medium text-gray-900 transition hover:text-gray-700"
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
            >
              {currentDoc.titulo}
              <span className="text-lg">▼</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 z-10 mt-2 w-80 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                {documentos.map((doc, idx) => (
                  <button
                    key={doc.id}
                    onClick={() => {
                      setPendingHighlight(null);
                      setCurrentIndex(idx);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm transition hover:bg-gray-100 ${
                      idx === currentIndex ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700"
                    }`}
                    role="option"
                    aria-selected={idx === currentIndex}
                  >
                    {doc.titulo}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-600">
            {currentIndex + 1} / {documentos.length}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevious}
              disabled={!hasPrevious}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border transition ${
                hasPrevious
                  ? "border-gray-300 text-gray-700 hover:bg-gray-50"
                  : "cursor-not-allowed border-gray-200 text-gray-300"
              }`}
              aria-label="Documento anterior"
            >
              <span className="text-xl">←</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!hasNext}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border transition ${
                hasNext
                  ? "border-gray-300 text-gray-700 hover:bg-gray-50"
                  : "cursor-not-allowed border-gray-200 text-gray-300"
              }`}
              aria-label="Próximo documento"
            >
              <span className="text-xl">→</span>
            </button>
          </div>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-12 overflow-hidden pt-[73px]">
        <div className="col-span-4 h-full overflow-y-auto border-r border-gray-200 bg-white p-8 no-scrollbar">
          <div className="prose max-w-none">
            <h2 className="mb-3 text-xl font-bold text-gray-900">💡 Insights dos regulamentos</h2>
            <p className="mb-6 text-sm text-gray-600">
              Conectamos cláusulas críticas dos termos com proposições de valor para o Meli+. Clique e navegue entre documentos e trechos marcados.
            </p>
          </div>

          <div className="space-y-4">
            {insights.map((insight) => {
              const isActive = selectedInsight === insight.id;
              const docTitulo = docTitleById[insight.docId] ?? "";

              return (
                <button
                  key={insight.id}
                  onClick={() => navigateToInsight(insight)}
                  className={`w-full rounded-lg border p-4 text-left transition ${
                    isActive
                      ? "border-blue-500 bg-blue-50 shadow-sm"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {docTitulo}
                  </p>
                  <h3 className="mt-2 text-base font-semibold text-gray-900">{insight.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{insight.description}</p>
                </button>
              );
            })}
          </div>

          <p className="mt-8 text-xs text-gray-400">
            Use os atalhos • <kbd className="rounded border border-gray-300 bg-gray-100 px-1">←</kbd>
            <span className="mx-1">/</span>
            <kbd className="rounded border border-gray-300 bg-gray-100 px-1">→</kbd> • para trocar de documento
            rapidamente.
          </p>
        </div>

        <div className="col-span-8 h-full overflow-y-auto bg-gray-50 p-10 no-scrollbar">
          <div className="mx-auto flex h-full max-w-3xl flex-col">
            <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Documento em análise</p>
                  <h1 className="text-2xl font-bold text-gray-900">{currentDoc.titulo}</h1>
                </div>
                <p className="text-sm text-gray-600">
                  Destacamos automaticamente trechos relevantes para proposta de valor do Meli+. Use os insights para
                  navegar e aprofundar.
                </p>
                {docInsights.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {docInsights.map((insight) => (
                      <button
                        key={insight.id}
                        onClick={() => navigateToInsight(insight)}
                        className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                          selectedInsight === insight.id
                            ? "border-blue-500 bg-blue-50 text-blue-600"
                            : "border-gray-300 bg-gray-100 text-gray-600 hover:border-gray-400"
                        }`}
                      >
                        {insight.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <article className="prose prose-sm max-w-none flex-1 space-y-4 text-gray-800">
              {conteudo ? (
                renderedMarkdown
              ) : (
                <p className="text-sm text-gray-500">Carregando documento...</p>
              )}
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
