import PageTemplate from "@/components/layout/PageTemplate";
import Link from "next/link";

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
      <div className="space-y-6">
        {/* Design System */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#333333] mb-4">Andes Design System</h2>
          <p className="text-sm text-[#4a4a4a] mb-4">
            Sistema de design completo com tokens, componentes e padrões de interface do Mercado Livre.
          </p>
          <Link
            href="/ui-design/andes-design-system"
            className="inline-flex items-center gap-2 rounded-lg bg-[#3483fa] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2968c8]"
          >
            Acessar Design System
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </Link>
        </div>

        {/* Diretrizes visuais */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#333333] mb-4">Diretrizes visuais</h2>
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
      </div>
    </PageTemplate>
  );
}
