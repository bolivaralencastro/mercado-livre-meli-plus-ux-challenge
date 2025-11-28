import PageTemplate from "@/components/layout/PageTemplate";
import AndesMeliPlusPlans from "@/components/ui/AndesMeliPlusPlans";
import Link from "next/link";
import { 
  Target, 
  Users, 
  FileText, 
  CreditCard, 
  Layout, 
  Lightbulb, 
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  ExternalLink
} from "lucide-react";

export default function BriefingPage() {
  return (
    <PageTemplate
      title="Briefing do Desafio"
      subtitle="Contexto estratégico, objetivos de negócio e definição do produto Meli+ para o UX Challenge."
    >
      <div className="space-y-8">
        
        {/* Seção 1: Contexto e Metodologia */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Card de Contexto */}
          <div className="andes-card">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <FileText size={20} />
              </div>
              <h2 className="text-lg font-semibold text-[#333333]">Contexto do Projeto</h2>
            </div>
            <p className="mb-4 text-sm text-[#666666]">
              Exercício prático de design e UX writing para avaliação técnica, focado na criação de valor para o novo programa de benefícios.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="andes-badge andes-badge--new">Simulação</span>
              <span className="andes-badge andes-badge--promo">UX Challenge</span>
            </div>
          </div>

          {/* Card de Metodologia */}
          <div className="andes-card">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-50 text-yellow-600">
                <BookOpen size={20} />
              </div>
              <h2 className="text-lg font-semibold text-[#333333]">Metodologia Referência</h2>
            </div>
            <h3 className="mb-2 text-sm font-semibold text-[#333333]">&quot;Content-First Design&quot;</h3>
            <p className="mb-4 text-sm text-[#666666]">
              A experiência deve ser linear e baseada em uma narrativa. Definimos a história completa que conecta as ações do usuário antes de criar wireframes.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#999999]">
              <span className="font-medium">Autor:</span> Emiliano Cosenza
            </div>
          </div>
        </div>

        {/* Seção 2: O Produto Meli+ */}
        <div className="rounded-lg bg-gray-100 p-6">
          <h2 className="mb-2 text-xl font-semibold text-[#333333]">O Produto: Meli+</h2>
          <p className="mb-6 text-sm text-[#666666]">Novo programa de benefícios (assinatura mensal) do Mercado Livre e Mercado Pago.</p>
          <AndesMeliPlusPlans
            plans={[
              {
                id: "essencial",
                name: "ESSENCIAL",
                price: 9.9,
                period: "mês",
                badge: {
                  type: "current",
                  label: "PLANO ATUAL"
                },
                features: [
                  "Frete grátis rápido em milhões de produtos a partir de R$ 19.",
                  "Até 3% de cashback no Mercado Livre e até 10% em outras lojas e sites com o Cartão de Crédito Mercado Pago.",
                  "Seu dinheiro rende 120% do CDI em Cofrinhos.",
                ],
                buttonLabel: "Mudar para Meli+ Essencial",
                buttonDisabled: true,
              },
              {
                id: "total",
                name: "TOTAL",
                price: 24.9,
                period: "mês",
                features: [
                  "Entretenimento incluído",
                  "Frete grátis rápido em milhões de produtos a partir de R$ 19.",
                  "Até 3% de cashback no Mercado Livre e até 10% em outras lojas e sites com o Cartão de Crédito Mercado Pago.",
                  "Seu dinheiro rende 120% do CDI em Cofrinhos.",
                  "70% OFF na HBO Max Padrão por 6 meses e 30% OFF no Universal+, Paramount+ e Globoplay Premium.",
                ],
                streamingLogos: ["disney"],
                buttonLabel: "Mudar para Meli+ Total",
                buttonHref: "#upgrade-total"
              },
              {
                id: "mega",
                name: "MEGA",
                price: 39.9,
                oldPrice: 74.9,
                discount: "46% OFF",
                period: "mês",
                periodNote: "por 2 meses",
                badge: {
                  type: "offer",
                  label: "OFERTA ESPECIAL"
                },
                features: [
                  "Entretenimento incluído",
                  "Frete grátis rápido em milhões de produtos a partir de R$ 19.",
                  "Até 3% de cashback no Mercado Livre e até 10% em outras lojas e sites com o Cartão de Crédito Mercado Pago.",
                  "Seu dinheiro rende 120% do CDI em Cofrinhos.",
                  "30% OFF no Universal+, Paramount+ e Globoplay Premium.",
                ],
                streamingLogos: ["disney", "netflix", "hbomax", "appletv"],
                buttonLabel: "Mudar para Meli+ Mega",
                buttonHref: "#upgrade-mega"
              },
            ]}
          />
        </div>

        {/* Seção 3: Objetivos Estratégicos */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="andes-card bg-gradient-to-br from-white to-gray-50">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Target size={20} />
              </div>
              <h2 className="text-lg font-semibold text-[#333333]">Objetivos de Negócio</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-[#333333] mb-1">Aquisição</h4>
                <p className="text-sm text-[#666666]">Aumentar a adesão de novos assinantes do Meli+ através de uma proposta de valor clara.</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#333333] mb-1">Retenção (Crítico)</h4>
                <p className="text-sm text-[#666666]">Reduzir cancelamentos involuntários causados por falhas no pagamento (churn involuntário).</p>
              </div>
            </div>
          </div>

          <div className="andes-card bg-gradient-to-br from-white to-gray-50">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <Users size={20} />
              </div>
              <h2 className="text-lg font-semibold text-[#333333]">Objetivos de UX</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-[#333333] mb-1">Clareza na Decisão</h4>
                <p className="text-sm text-[#666666]">Garantir que usuários compreendam e escolham o plano mais conveniente para seu perfil.</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#333333] mb-1">Segurança no Pagamento</h4>
                <p className="text-sm text-[#666666]">Facilitar a inclusão de meios de pagamento alternativos (backup) para evitar interrupção.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Seção 4: Entregáveis (Tasks) */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-[#333333]">Entregáveis do Desafio</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Task 1 */}
            <div className="andes-card border-t-4 border-t-[#ffe600]">
              <div className="mb-3 flex items-center justify-between">
                <Layout className="text-[#333333]" size={24} />
                <span className="text-xs font-bold text-[#999999]">TASK 1</span>
              </div>
              <h3 className="mb-2 font-semibold text-[#333333]">Landing Page Meli+</h3>
              <p className="mb-4 text-sm text-[#666666]">
                Criar uma proposta inovadora e persuasiva para incentivar a inscrição.
              </p>
              <div className="rounded bg-gray-50 p-2 text-xs text-[#666666] mb-4">
                <strong>Requisito:</strong> Visual impactante, quebra de padrões, despertar desejo.
              </div>
              <Link 
                href="/prototipo/landing-pages/oferta-monolitica" 
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#3483fa] hover:underline"
              >
                Ver protótipo <ExternalLink size={14} />
              </Link>
            </div>

            {/* Task 2 */}
            <div className="andes-card border-t-4 border-t-[#3483fa]">
              <div className="mb-3 flex items-center justify-between">
                <CreditCard className="text-[#3483fa]" size={24} />
                <span className="text-xs font-bold text-[#999999]">TASK 2</span>
              </div>
              <h3 className="mb-2 font-semibold text-[#333333]">Configuração de Pagamento</h3>
              <p className="mb-4 text-sm text-[#666666]">
                Desenvolver fluxo para adicionar meio de pagamento secundário na área de gestão.
              </p>
              <div className="rounded bg-gray-50 p-2 text-xs text-[#666666] mb-4">
                <strong>Métrica:</strong> Usuário não perder acesso por falha no cartão principal.
              </div>
              <Link 
                href="/prototipo/mobile" 
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#3483fa] hover:underline"
              >
                Ver protótipo <ExternalLink size={14} />
              </Link>
            </div>

            {/* Task 3 */}
            <div className="andes-card border-t-4 border-t-[#00a650]">
              <div className="mb-3 flex items-center justify-between">
                <Lightbulb className="text-[#00a650]" size={24} />
                <span className="text-xs font-bold text-[#999999]">TASK 3</span>
              </div>
              <h3 className="mb-2 font-semibold text-[#333333]">Racional de Priorização</h3>
              <p className="mb-4 text-sm text-[#666666]">
                Propor uma ordem de iterações e justificar a hierarquização das tarefas.
              </p>
              <div className="rounded bg-gray-50 p-2 text-xs text-[#666666]">
                <strong>Output:</strong> Defesa estratégica das decisões de design.
              </div>
            </div>
          </div>
        </div>

      </div>
    </PageTemplate>
  );
}
