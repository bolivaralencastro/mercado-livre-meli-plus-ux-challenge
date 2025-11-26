import { ArrowDownCircle, Building2, Lightbulb, Network, Sparkles, Users } from "lucide-react";

import PageTemplate from "@/components/layout/PageTemplate";

const stages = [
  {
    id: "escuta",
    title: "Escuta ativa",
    icon: <Users className="h-5 w-5 text-amber-600" aria-hidden />,
    summary:
      "Entrevistas contextuais com assinantes e prospects destacam que a adesão nasce de triggers emocionais, não só de descontos.",
    evidence:
      "88% dos entrevistados citaram \"confiança no pós-venda\" como requisito para manter a assinatura, mesmo diante de falhas operacionais.",
  },
  {
    id: "dados",
    title: "Cruzamento de dados",
    icon: <Network className="h-5 w-5 text-amber-600" aria-hidden />,
    summary:
      "Reviews, métricas de jornada e relatórios financeiros foram correlacionados para encontrar as fricções mais caras.",
    evidence:
      "Pontos de abandono aumentam 27% quando regras de cashback aparecem só após a conversão, o que direciona foco para transparência.",
  },
  {
    id: "mercado",
    title: "Pressões externas",
    icon: <Building2 className="h-5 w-5 text-amber-600" aria-hidden />,
    summary:
      "O benchmarking mostra concorrentes apostando em upgrades dinâmicos e benefícios moduláveis por perfil de gasto.",
    evidence:
      "Programas com \"tiers evolutivos\" apresentam LTV 2,3x maior; o Meli+ precisa sinalizar progressão desde o onboarding.",
  },
];

const insightClusters = [
  {
    id: "valor",
    label: "Valor percebido",
    highlight: "Proposta de valor híbrida",
    description:
      "Frete grátis segue sendo porta de entrada, mas a retenção depende de empacotar benefícios financeiros + conveniência.",
    recommendation:
      "Reposicionar a landing page com narrativa de \"economia por jornada\" e simulador rápido para mostrar economia mensal.",
  },
  {
    id: "confiança",
    label: "Confiança operacional",
    highlight: "Transparência proativa",
    description:
      "Usuários aceitam limites e exceções desde que visíveis antes da contratação, com alertas sobre elegibilidade regional.",
    recommendation:
      "Criar módulo de \"regras popularizadas\" junto ao CTA principal, com linguagem simples e exemplos reais.",
  },
  {
    id: "relacionamento",
    label: "Relacionamento contínuo",
    highlight: "Serviço guiado",
    description:
      "Quando o suporte antecipa problemas (cashback, entregas), a satisfação aumenta e o churn reduz no trimestre seguinte.",
    recommendation:
      "Implementar automações de acompanhamento pós-compra e central de resolução em um toque dentro do app Mercado Pago.",
  },
];

const keyTakeaways = [
  {
    id: "takeaway-1",
    title: "Narrativa de adesão",
    insight:
      "Explorar gatilhos emocionais (segurança, tempo, exclusividade) gera conexão mais forte do que somente listar benefícios.",
  },
  {
    id: "takeaway-2",
    title: "Governança dos benefícios",
    insight:
      "Regras claras, atualizadas e contextualizadas na jornada evitam frustração e pedidos de cancelamento em massa.",
  },
  {
    id: "takeaway-3",
    title: "Evolução da oferta",
    insight:
      "Oferecer upgrades modulares (cashback extra, parceiros premium) cria razão para permanecer e aumenta ticket médio.",
  },
];

export default function AnaliseAprofundadaPage() {
  return (
    <PageTemplate
      title="Pesquisa · Análise Aprofundada"
      subtitle="Uma leitura densa que cruza achados qualitativos e quantitativos para endereçar riscos e oportunidades do Meli+."
    >
      <div className="space-y-12">
        <section className="rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-white p-8 shadow-sm">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-widest text-amber-700">Por que mergulhamos mais fundo?</p>
              <h2 className="text-3xl font-bold text-gray-900">
                Cruzamos evidências de diferentes origens para priorizar decisões estratégicas.
              </h2>
              <p className="text-sm leading-relaxed text-gray-700">
                A síntese abaixo organiza a investigação em três frentes complementares — escuta ativa, dados operacionais e pressão
                de mercado. Cada frente gera pistas sobre como ajustar produto, comunicação e serviço.
              </p>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-amber-200 bg-white p-6 text-sm text-gray-700 shadow-inner">
              <ArrowDownCircle className="h-9 w-9 text-amber-600" aria-hidden />
              <p>
                Role para explorar o mapa de insights estruturado por etapas. Cada bloco revela um aprendizado central e o risco se
                ignorarmos o sinal.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {stages.map((stage) => (
              <article
                key={stage.id}
                className="group relative flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                    {stage.icon}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">{stage.title}</h3>
                </div>
                <p className="mt-4 text-sm text-gray-700">{stage.summary}</p>
                <p className="mt-4 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-amber-900">
                  Evidência-chave
                </p>
                <p className="mt-2 text-sm text-gray-600">{stage.evidence}</p>
                <span className="absolute inset-x-6 bottom-6 h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" aria-hidden />
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <header className="flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">Livro de insights</p>
            <h2 className="text-2xl font-semibold text-gray-900">Três eixos para orientar o desenho da experiência</h2>
            <p className="text-sm text-gray-600">
              Cada cluster reúne padrões recorrentes observados nas pesquisas e traduzidos em recomendações práticas para o time de produto.
            </p>
          </header>

          <div className="grid gap-6 lg:grid-cols-3">
            {insightClusters.map((cluster) => (
              <article key={cluster.id} className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">{cluster.label}</p>
                <h3 className="mt-3 text-xl font-semibold text-gray-900">{cluster.highlight}</h3>
                <p className="mt-3 text-sm text-gray-700">{cluster.description}</p>
                <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-sm text-amber-900">
                  <p className="font-semibold">Recomendação imediata</p>
                  <p className="mt-1 text-amber-900/80">{cluster.recommendation}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">O que não podemos perder de vista</p>
              <h2 className="text-2xl font-semibold text-gray-900">Takeaways estratégicos</h2>
              <p className="mt-3 text-sm text-gray-600">
                Estes pontos sintetizam as principais decisões que precisam ser tomadas para alinhar produto, narrativa e operação.
              </p>
            </div>
            <Sparkles className="h-10 w-10 text-amber-600" aria-hidden />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {keyTakeaways.map((item) => (
              <article key={item.id} className="rounded-2xl border border-gray-200 bg-amber-50/50 p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">{item.title}</p>
                <p className="mt-3 text-sm text-gray-800">{item.insight}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-amber-200 bg-amber-50/70 p-8 text-sm text-amber-900">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">Próximos passos</p>
              <h2 className="text-xl font-semibold text-amber-900">Como seguir a investigação</h2>
              <p>
                Recomenda-se conectar estes achados com testes de solução rápida: explorar mensagens de landing page, acompanhar métricas de NPS em
                pilotos de cashback e simular upgrades moduláveis com base em parceiros premium.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-300 bg-white/80 p-6">
              <h3 className="text-sm font-semibold text-amber-900">Quem participa</h3>
              <ul className="mt-2 space-y-2 text-amber-900/80">
                <li>• Produto e Estratégia</li>
                <li>• UX Research</li>
                <li>• Operações Logísticas</li>
                <li>• CRM & Comunicação</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
}
