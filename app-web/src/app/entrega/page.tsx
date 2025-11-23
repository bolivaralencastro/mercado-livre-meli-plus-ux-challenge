import PageTemplate from "@/components/layout/PageTemplate";

const deliveryItems = [
  {
    title: "Documentação",
    description: "Guia de decisão, critérios de sucesso e referências utilizados nas soluções.",
  },
  {
    title: "Assets",
    description: "Telas finais, componentes e bibliotecas para handoff do time de produto.",
  },
  {
    title: "Próximas iterações",
    description: "Ajustes recomendados pós-teste e oportunidades para evolução contínua.",
  },
];

export default function EntregaPage() {
  return (
    <PageTemplate
      title="Entrega"
      subtitle="Resumo do material final do case Meli+, organizado para facilitar o handoff e continuidade do projeto."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {deliveryItems.map((item) => (
          <div
            key={item.title}
            className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-[#333333]">{item.title}</h3>
            <p className="mt-2 text-sm text-[#4a4a4a]">{item.description}</p>
          </div>
        ))}
      </div>
    </PageTemplate>
  );
}
