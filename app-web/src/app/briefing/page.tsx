import PageTemplate from "@/components/layout/PageTemplate";
import { 
  Target, 
  Users, 
  FileText, 
  CreditCard, 
  Layout, 
  Lightbulb, 
  BookOpen,
  CheckCircle2,
  AlertTriangle
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
        <div className="andes-card">
          <div className="mb-6 border-b border-gray-100 pb-4">
            <h2 className="text-xl font-semibold text-[#333333]">O Produto: Meli+</h2>
            <p className="text-sm text-[#666666]">Novo programa de benefícios (assinatura mensal) do Mercado Livre e Mercado Pago.</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {/* Plano Básico */}
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-[#333333]">Plano Básico</h3>
              </div>
              <ul className="space-y-2 text-sm text-[#666666]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-0.5 text-green-500 shrink-0" />
                  <span>Frete grátis/vantajoso em todas as compras</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-0.5 text-green-500 shrink-0" />
                  <span>Parcelas extras sem juros</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-0.5 text-green-500 shrink-0" />
                  <span>Cashback em criptomoedas</span>
                </li>
              </ul>
            </div>

            {/* Plano Premium */}
            <div className="rounded-lg border border-blue-100 bg-blue-50/30 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-[#3483fa]">Plano Premium</h3>
                <span className="rounded-full bg-[#3483fa] px-2 py-0.5 text-[10px] font-bold text-white">RECOMENDADO</span>
              </div>
              <ul className="space-y-2 text-sm text-[#666666]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-0.5 text-[#3483fa] shrink-0" />
                  <span>Todos os benefícios do plano básico</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-0.5 text-[#3483fa] shrink-0" />
                  <span>Acesso a conteúdos de streaming (Disney+, Star+, etc)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-0.5 text-[#3483fa] shrink-0" />
                  <span>Grandes descontos promocionais exclusivos</span>
                </li>
              </ul>
            </div>
          </div>
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
              <div className="rounded bg-gray-50 p-2 text-xs text-[#666666]">
                <strong>Requisito:</strong> Visual impactante, quebra de padrões, despertar desejo.
              </div>
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
              <div className="rounded bg-gray-50 p-2 text-xs text-[#666666]">
                <strong>Métrica:</strong> Usuário não perder acesso por falha no cartão principal.
              </div>
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
