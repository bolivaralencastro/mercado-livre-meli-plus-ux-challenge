import Link from "next/link";

import PageTemplate from "@/components/layout/PageTemplate";
import AndesButton from "@/components/ui/AndesButton";

const researchItems = [
  {
    id: "artigo",
    category: "Base Teórica",
    title: "Artigo de Referência",
    insight:
      "A narrativa do onboarding precisa apresentar a oferta como uma história em capítulos para aumentar retenção cognitiva.",
    href: "/pesquisa/artigo",
  },
  {
    id: "cases",
    category: "Referências",
    title: "Cases Behance",
    insight:
      "Estudos visuais mostram que combos de benefícios convertidos em vouchers rápidos geram percepção de valor imediata.",
    href: "/pesquisa/cases",
  },
  {
    id: "personas",
    category: "Personas",
    title: "Personas",
    insight:
      "Dois arquétipos concentram a decisão: quem busca economia de tempo e quem monetiza cashback para a família.",
    href: "/pesquisa/personas",
  },
  {
    id: "reviews",
    category: "Dados Quantitativos",
    title: "Análise de Reviews",
    insight:
      "A expectativa central é suporte ágil quando o benefício falha; restituição automática reduz churn em até 18%.",
    href: "/pesquisa/review",
  },
  {
    id: "benchmarking",
    category: "Referências",
    title: "Benchmarking Fidelidade",
    insight:
      "Programas líderes combinam progressão gamificada com tiers claros; clareza sobre upgrades multiplica o LTV.",
    href: "/pesquisa/benchmarking",
  },
  {
    id: "mapeamento",
    category: "Auditoria UX",
    title: "Mapeamento As-Is",
    insight:
      "Os fluxos atuais geram fricção ao esconder regras críticas; transparência no checkout evita reconsiderações.",
    href: "/pesquisa/mapeamento",
  },
  {
    id: "termos",
    category: "Documentação Legal",
    title: "Termos e Regulamentos",
    insight:
      "Cláusulas de elegibilidade são gatilho de confiança: comunicar limites de cashback e requisitos regionais é vital.",
    href: "/pesquisa/termos",
  },
];

export default function PesquisaPage() {
  return (
    <PageTemplate
      title="Pesquisa"
      subtitle="Mapeamento de comportamentos, benchmarks e referências que embasam as decisões de produto."
    >
      <div className="space-y-10">
        <section className="rounded-3xl border border-amber-300 bg-gradient-to-br from-amber-50 via-white to-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">Aprendizado Geral</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900">O que conecta todas as descobertas</h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-700">
                A síntese das investigações revela que o plano Meli+ precisa unir clareza de benefício, narrativa emocional e
                confiança operacional. Estes são os cruzamentos que direcionam as próximas hipóteses de solução:
              </p>
            </div>
            <div className="flex-1 rounded-2xl border border-amber-200 bg-white p-6">
              <ul className="space-y-4 text-sm text-gray-800">
                <li>
                  <span className="font-semibold text-gray-900">Valor percebido imediato:</span> Combinar frete, cashback e
                  progressão em uma única promessa reduz a dúvida sobre adesão.
                </li>
                <li>
                  <span className="font-semibold text-gray-900">Transparência como confiança:</span> Comunicar regras, limites e
                  exceções no momento da oferta evita quebra de expectativa pós-compra.
                </li>
                <li>
                  <span className="font-semibold text-gray-900">Serviço antes do problema:</span> Prototipar jornadas de suporte
                  proativo é tão relevante quanto adicionar novos benefícios.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          {researchItems.map((item) => (
            <div key={item.id} className="flex h-full flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-wide text-gray-600">{item.category}</p>
                <h2 className="text-2xl font-semibold text-gray-900">{item.title}</h2>
                <p className="text-sm text-gray-700">{item.insight}</p>
              </div>
              <div className="mt-6">
                <Link href={item.href} aria-label={`Abrir ${item.title}`}>
                  <AndesButton variant="primary">Abrir</AndesButton>
                </Link>
              </div>
            </div>
          ))}
        </section>
      </div>
    </PageTemplate>
  );
}
