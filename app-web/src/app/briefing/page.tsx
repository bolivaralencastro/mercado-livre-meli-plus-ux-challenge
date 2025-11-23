import PageTemplate from "@/components/layout/PageTemplate";

const scopeHighlights = [
  "Entender barreiras de adoção do Meli+ e oportunidades de retenção.",
  "Propor fluxos que comuniquem valor e reduzam dúvidas durante a assinatura.",
  "Garantir consistência com o Andes Design System em todas as entregas.",
];

export default function BriefingPage() {
  return (
    <PageTemplate
      title="Briefing"
      subtitle="Contexto do desafio, objetivos estratégicos e critérios de sucesso que nortearam as decisões do estudo."
    >
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[#333333]">Escopo e prioridades</h2>
        <ul className="mt-4 space-y-3 text-sm text-[#4a4a4a]">
          {scopeHighlights.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#3483fa]" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </PageTemplate>
  );
}
