import PageTemplate from "@/components/layout/PageTemplate";

const milestones = [
  {
    label: "Planejamento",
    detail: "Kick-off do desafio, definição de escopo e alinhamento de expectativas.",
  },
  {
    label: "Descoberta",
    detail: "Pesquisa exploratória, entrevistas e consolidação de insights acionáveis.",
  },
  {
    label: "Ideação",
    detail: "Cocriação de fluxos, hipóteses de solução e priorização por impacto.",
  },
  {
    label: "Validação",
    detail: "Protótipos navegáveis, testes rápidos e ajustes de usabilidade.",
  },
  {
    label: "Entrega",
    detail: "Handoff de telas, especificações e narrativa final do case.",
  },
];

export default function ProgramacaoPage() {
  return (
    <PageTemplate
      title="Programação"
      subtitle="Cronograma macro das etapas do projeto, garantindo visibilidade sobre prazos, entregas e checkpoints decisivos."
    >
      <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[#333333]">Marcos principais</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {milestones.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-gray-100 bg-[#fafafa] p-4 shadow-sm"
            >
              <p className="text-sm font-semibold text-[#333333]">{item.label}</p>
              <p className="mt-2 text-sm text-[#4a4a4a]">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </PageTemplate>
  );
}
