import PageTemplate from "@/components/layout/PageTemplate";

const pillars = [
  {
    title: "Conversão",
    description: "Diminuir atrito na jornada de assinatura com comunicação clara do valor do Meli+.",
  },
  {
    title: "Retenção",
    description: "Acompanhar momentos-chave da jornada para reduzir churn e aumentar recorrência.",
  },
  {
    title: "Eficiência",
    description: "Reutilizar padrões do Andes Design System para acelerar entrega e manutenção.",
  },
];

export default function EstrategiaPage() {
  return (
    <PageTemplate
      title="Estratégia"
      subtitle="Direcionadores, métricas e hipóteses que orientam as decisões de produto e priorização do roadmap."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-[#333333]">{pillar.title}</h3>
            <p className="mt-2 text-sm text-[#4a4a4a]">{pillar.description}</p>
          </div>
        ))}
      </div>
    </PageTemplate>
  );
}
