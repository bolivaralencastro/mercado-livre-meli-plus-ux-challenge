import PageTemplate from "@/components/layout/PageTemplate";
import GanttChart from "@/components/ui/GanttChart";

const milestones = [
  {
    id: 1,
    label: "Planejamento",
    detail: "Kick-off do desafio, definição de escopo e alinhamento de expectativas.",
    date: "20/11",
    status: "Concluído",
  },
  {
    id: 2,
    label: "Descoberta",
    detail: "Pesquisa exploratória, entrevistas e consolidação de insights acionáveis.",
    date: "20-21/11",
    status: "Concluído",
  },
  {
    id: 3,
    label: "Estratégia",
    detail: "Definição de pilares, hipóteses e priorização.",
    date: "23/11",
    status: "Concluído",
  },
  {
    id: 4,
    label: "Ideação & Design",
    detail: "Wireframes, fluxos e UI Design de alta fidelidade.",
    date: "23-24/11",
    status: "Concluído",
  },
  {
    id: 5,
    label: "Entrega",
    detail: "Prototipagem, apresentação e submissão final.",
    date: "25-26/11",
    status: "Concluído",
  },
];

export default function ProgramacaoPage() {
  return (
    <PageTemplate
      title="Programação"
      subtitle="Cronograma detalhado das etapas do projeto, garantindo visibilidade sobre prazos, entregas e checkpoints decisivos."
    >
      <div className="space-y-8">
        
        {/* Seção de Marcos (Cards) - Agora vem PRIMEIRO */}
        <div className="rounded-2xl bg-[#f5f5f5] p-6">
          <h2 className="mb-6 text-xl font-semibold text-[#333333]">Marcos Principais</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {milestones.map((item) => (
              <div
                key={item.label}
                className="flex flex-col justify-between rounded-xl bg-white border border-gray-200 p-4 shadow-sm transition-all hover:shadow-md"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#333333] text-xs font-bold text-white">
                      {item.id}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      {item.date}
                    </span>
                  </div>
                  <h3 className="mb-2 font-bold text-[#333333]">{item.label}</h3>
                  <p className="text-sm text-gray-600">{item.detail}</p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs font-medium text-green-600">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                    {item.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seção do Gráfico de Gantt - Agora vem DEPOIS */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#333333]">Timeline do Projeto</h2>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
              7 Dias de Sprint
            </span>
          </div>
          
          <GanttChart />
          
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#00a650]"></span> Planejamento/Entrega
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#3483fa]"></span> Pesquisa/Protótipo
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#a90f90]"></span> Estratégia
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff7733]"></span> Design
            </div>
          </div>
        </div>

        {/* Seção de Detalhes (Texto) */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-[#333333]">Estratégia de Execução</h2>
          <div className="prose max-w-none text-gray-600">
            <p>
              O cronograma foi desenhado para maximizar a produtividade nos dias de maior disponibilidade (feriado e fim de semana), 
              reservando os dias úteis para tarefas de menor carga cognitiva ou finalizações.
            </p>
            <ul className="mt-4 list-disc pl-5 space-y-2">
              <li><strong>Foco Intensivo:</strong> 36h de trabalho concentrado nos dias de pico (75% do projeto).</li>
              <li><strong>Timeboxing:</strong> Uso rigoroso de limites de tempo para cada fase para evitar scope creep.</li>
              <li><strong>Priorização:</strong> Foco na qualidade das telas principais em vez de quantidade excessiva.</li>
            </ul>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
