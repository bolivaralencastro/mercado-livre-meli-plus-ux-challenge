import PageTemplate from "@/components/layout/PageTemplate";

const designFocus = [
  {
    title: "Identidade Meli",
    description: "Aplicação consistente das cores institucionais, tipografia e componentes Andes.",
  },
  {
    title: "Sinalização clara",
    description: "Hierarquia visual para destacar benefícios, preços e estados de assinatura.",
  },
  {
    title: "Acessibilidade",
    description: "Contraste adequado, espaçamento confortável e feedback em todas as interações.",
  },
];

export default function UiDesignPage() {
  return (
    <PageTemplate
      title="UI Design"
      subtitle="Explorações visuais, componentes e telas alinhadas ao Andes Design System para o ecossistema Meli+."
    >
      <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[#333333]">Diretrizes visuais</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {designFocus.map((item) => (
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
