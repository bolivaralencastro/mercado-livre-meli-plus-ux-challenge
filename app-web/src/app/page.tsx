import Link from "next/link";

import PageTemplate from "@/components/layout/PageTemplate";

const sectionLinks = [
  {
    title: "Programação",
    description:
      "Cronograma das entregas e marcos do projeto para manter o ritmo de evolução.",
    href: "/programacao",
  },
  {
    title: "Briefing",
    description:
      "Contexto do desafio, objetivos de negócio e expectativas da assinatura Meli+.",
    href: "/briefing",
  },
  {
    title: "Pesquisa",
    description:
      "Insights de usuários, benchmarking e referências que fundamentam as decisões.",
    href: "/pesquisa",
  },
  {
    title: "Estratégia",
    description:
      "Direcionadores, métricas e hipóteses que guiam o roadmap do produto.",
    href: "/estrategia",
  },
  {
    title: "Ideação",
    description:
      "Conceitos, fluxos e jornadas propostas para resolver as dores priorizadas.",
    href: "/ideacao",
  },
  {
    title: "UI Design",
    description:
      "Explorações visuais, componentes e telas que traduzem a experiência do Meli+.",
    href: "/ui-design",
  },
  {
    title: "Protótipo",
    description:
      "Versões navegáveis para validar rapidamente com usuários e stakeholders.",
    href: "/prototipo",
  },
  {
    title: "Apresentação",
    description:
      "Narrativa do case, principais achados e próximos passos sugeridos.",
    href: "/apresentacao",
  },
  {
    title: "Entrega",
    description:
      "Materiais finais organizados para handoff e continuidade do time.",
    href: "/entrega",
  },
];

export default function Home() {
  return (
    <PageTemplate
      title="Product Design Research"
      subtitle="Visão consolidada do estudo para o Meli+, destacando as entregas de cada etapa e facilitando o acesso rápido ao material."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sectionLinks.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-semibold text-[#333333]">{section.title}</h2>
              <span className="text-xl text-[#3483fa] transition-transform group-hover:translate-x-1">
                →
              </span>
            </div>
            <p className="mt-2 text-sm text-[#4a4a4a]">{section.description}</p>
          </Link>
        ))}
      </div>
    </PageTemplate>
  );
}
