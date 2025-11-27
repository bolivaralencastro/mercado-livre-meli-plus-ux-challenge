"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import PageTemplate from "@/components/layout/PageTemplate";
import { Button } from "@/components/ui/Button";

type StepLink = {
  label: string;
  href: string;
};

type PresentationStep = {
  id: string;
  title: string;
  summary: string;
  focus: string;
  deliverables: string[];
  links: StepLink[];
  mood: string;
};

const steps: PresentationStep[] = [
  {
    id: "briefing",
    title: "Abertura e briefing",
    summary: "Contexto do desafio, premissas de negócio e tensão inicial sobre adesão e retenção.",
    focus: "Apresentar o problema e alinhar a promessa de valor do Meli+ antes de mostrar telas.",
    deliverables: [
      "Objetivos do projeto e critérios de sucesso",
      "Riscos percebidos e restrições de execução",
      "Mapa rápido dos stakeholders envolvidos",
    ],
    links: [
      { label: "Ver briefing", href: "/briefing" },
      { label: "Cronograma", href: "/programacao" },
    ],
    mood: "Instaurar a narrativa e convidar o público para a jornada (story-first).",
  },
  {
    id: "pesquisa",
    title: "Pesquisa e descobertas",
    summary: "Evidenciar dores, expectativas e emoções coletadas em entrevistas, reviews e benchmarking.",
    focus: "Conectar sentimentos das pessoas com os pontos de fricção da jornada atual.",
    deliverables: [
      "Mapa de insights por persona e momento",
      "Principais achados de benchmark e referências",
      "Jornadas e termos que afetam a confiança",
    ],
    links: [
      { label: "Visão geral da pesquisa", href: "/pesquisa" },
      { label: "Personas e jornadas", href: "/pesquisa/personas" },
      { label: "Benchmarking", href: "/pesquisa/benchmarking" },
    ],
    mood: "Explorar emoções e fricções para preparar o terreno da solução (user feelings).",
  },
  {
    id: "estrategia",
    title: "Estratégia e direcionadores",
    summary: "Hipóteses priorizadas, métricas-alvo e princípios de experiência que guiam o desenho.",
    focus: "Mostrar como a narrativa vira critérios de decisão antes de protótipos.",
    deliverables: [
      "Hipóteses e métricas ligadas à retenção",
      "Princípios de design e mensagens-chave",
      "Checklist de elegibilidade e riscos",
    ],
    links: [
      { label: "Estratégia", href: "/estrategia" },
      { label: "Ideação", href: "/ideacao" },
    ],
    mood: "Conteúdo primeiro: alinhar mensagem e métricas antes das telas (content-first).",
  },
  {
    id: "design",
    title: "Design, protótipo e validação",
    summary: "Fluxos, interfaces e protótipos que materializam a promessa e reduzem atritos.",
    focus: "Mostrar o percurso completo, do onboarding ao uso recorrente, com feedbacks claros.",
    deliverables: [
      "UI Kit e componentes reutilizados",
      "Protótipos navegáveis e estados críticos",
      "Aprendizados de testes e próximos ajustes",
    ],
    links: [
      { label: "UI Design", href: "/ui-design" },
      { label: "Protótipo", href: "/prototipo" },
      { label: "Entrega", href: "/entrega" },
    ],
    mood: "Criar imersão contínua e progressão suave (immersion).",
  },
];

export default function ApresentacaoPage() {
  const [activeStepId, setActiveStepId] = useState<string>(steps[0]?.id);

  const activeStep = useMemo(() => {
    return steps.find((step) => step.id === activeStepId) ?? steps[0];
  }, [activeStepId]);

  const currentIndex = useMemo(
    () => steps.findIndex((step) => step.id === activeStep?.id),
    [activeStep?.id],
  );

  const nextStepId = useMemo(() => {
    if (currentIndex === -1) return undefined;
    const nextStep = steps[currentIndex + 1];
    return nextStep?.id;
  }, [currentIndex]);

  return (
    <PageTemplate
      title="Roteiro da apresentação"
      subtitle="Wireframe de navegação vertical que encadeia todas as fases do projeto em uma narrativa contínua."
    >
      <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="rounded-xl bg-[#fafafa] p-4">
          <p className="text-sm font-semibold text-[#333333]">Por onde começamos</p>
          <p className="mt-2 text-sm text-[#4a4a4a]">
            A história é contada em sequência: começamos pelo problema, mergulhamos nas evidências de pesquisa,
            conectamos hipóteses e só então mostramos telas. Cada etapa abaixo referencia os conteúdos já produzidos
            e mantém uma lógica linear de apresentação.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-3 rounded-xl border border-gray-100 bg-[#fafafa] p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[#333333]">Linha do tempo interativa</p>
              <span className="text-xs font-medium text-[#666666]">{steps.length} etapas</span>
            </div>
            <p className="text-sm text-[#4a4a4a]">
              Clique para navegar pela sequência. Use o botão de próximo passo para manter o ritmo da história.
            </p>
            <div className="space-y-2">
              {steps.map((step, index) => {
                const isActive = step.id === activeStep?.id;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveStepId(step.id)}
                    className={`w-full rounded-lg border px-3 py-3 text-left transition ${
                      isActive
                        ? "border-[#3483fa] bg-white shadow-sm"
                        : "border-transparent bg-white/70 hover:border-gray-200"
                    }`}
                    aria-current={isActive ? "step" : undefined}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                          isActive ? "bg-[#3483fa] text-white" : "bg-[#e6e6e6] text-[#333333]"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-[#333333]">{step.title}</p>
                        <p className="text-xs text-[#4a4a4a]">{step.summary}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-xl border border-gray-100 bg-[#fafafa] p-4">
              <p className="text-xs uppercase tracking-wide text-[#666666]">Foco narrativo</p>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[#333333]">{activeStep?.title}</h2>
                  <p className="mt-1 text-sm text-[#4a4a4a]">{activeStep?.focus}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#3483fa]">
                  {activeStep?.mood}
                </span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-gray-100 bg-[#fafafa] p-4">
                <p className="text-sm font-semibold text-[#333333]">O que mostrar</p>
                <ul className="mt-2 space-y-2">
                  {activeStep?.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#4a4a4a]">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#3483fa]" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-gray-100 bg-[#fafafa] p-4">
                <p className="text-sm font-semibold text-[#333333]">Referências rápidas</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeStep?.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-full border border-[#3483fa]/30 bg-white px-3 py-1 text-xs font-medium text-[#3483fa] transition hover:border-[#3483fa] hover:text-[#2463c5]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <p className="mt-3 text-xs text-[#666666]">
                  Todos os links mantêm a navegação vertical em uma única página, abrindo os materiais na ordem recomendada.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-[#fafafa] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#333333]">Próximo passo</p>
                <p className="text-sm text-[#4a4a4a]">
                  {nextStepId
                    ? "Avance para manter a linearidade da narrativa e preparar o contexto da próxima seção."
                    : "Última etapa: finalize reforçando resultados e handoff."}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentIndex <= 0}
                  onClick={() =>
                    setActiveStepId(steps[Math.max(currentIndex - 1, 0)]?.id ?? steps[0]?.id)
                  }
                >
                  Anterior
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    if (nextStepId) {
                      setActiveStepId(nextStepId);
                    }
                  }}
                  disabled={!nextStepId}
                >
                  {nextStepId ? "Próximo" : "Revisar sequência"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
