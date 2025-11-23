import PageTemplate from "@/components/layout/PageTemplate";

const concepts = [
  {
    title: "Jornadas simplificadas",
    description: "Fluxos curtos e contextuais para assinatura, resgate de benefícios e upgrades.",
  },
  {
    title: "Narrativas de valor",
    description: "Mensagens que reforçam economia, conveniência e benefícios exclusivos do Meli+.",
  },
  {
    title: "Estados transparentes",
    description: "Feedback claro sobre progresso, próximos passos e elegibilidade de benefícios.",
  },
];

export default function IdeacaoPage() {
  return (
    <PageTemplate
      title="Ideação"
      subtitle="Hipóteses de solução, fluxos e conceitos visuais explorados a partir dos insights de pesquisa."
    >
      <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[#333333]">Principais direções</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {concepts.map((concept) => (
            <div
              key={concept.title}
              className="rounded-xl border border-gray-100 bg-[#fafafa] p-4 shadow-sm"
            >
              <p className="text-sm font-semibold text-[#333333]">{concept.title}</p>
              <p className="mt-2 text-sm text-[#4a4a4a]">{concept.description}</p>
            </div>
          ))}
        </div>
      </div>
    </PageTemplate>
  );
}
