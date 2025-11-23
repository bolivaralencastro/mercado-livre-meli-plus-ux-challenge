import PageTemplate from "@/components/layout/PageTemplate";

const prototypeSteps = [
  {
    title: "Cenários prioritários",
    description: "Assinatura, upgrades e resgate de benefícios com foco em conversão.",
  },
  {
    title: "Fluxos críticos",
    description: "Entrada no Meli+, alteração de plano e gestão de pagamento recorrente.",
  },
  {
    title: "Validação rápida",
    description: "Teste remoto para medir clareza da proposta de valor e facilidade de uso.",
  },
];

export default function PrototipoPage() {
  return (
    <PageTemplate
      title="Protótipo"
      subtitle="Protótipos navegáveis criados para validar hipóteses, coletar feedback e iterar com agilidade."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {prototypeSteps.map((step) => (
          <div
            key={step.title}
            className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-[#333333]">{step.title}</h3>
            <p className="mt-2 text-sm text-[#4a4a4a]">{step.description}</p>
          </div>
        ))}
      </div>
    </PageTemplate>
  );
}
