import PageTemplate from "@/components/layout/PageTemplate";

const highlights = [
  {
    title: "Problema e oportunidade",
    description: "Contextualização do desafio Meli+, dores encontradas e potencial de negócio.",
  },
  {
    title: "Solução proposta",
    description: "Fluxos, telas e narrativa que conectam benefícios à assinatura e retenção.",
  },
  {
    title: "Próximos passos",
    description: "Evoluções recomendadas, métricas a acompanhar e roadmap sugerido.",
  },
];

export default function ApresentacaoPage() {
  return (
    <PageTemplate
      title="Apresentação"
      subtitle="Estrutura da apresentação final do case, destacando insights, soluções e recomendações futuras."
    >
      <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[#333333]">Narrativa do case</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-gray-100 bg-[#fafafa] p-4 shadow-sm"
            >
              <p className="text-sm font-semibold text-[#333333]">{item.title}</p>
              <p className="mt-2 text-sm text-[#4a4a4a]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </PageTemplate>
  );
}
