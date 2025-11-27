import PageTemplate from "@/components/layout/PageTemplate";

export default function ApresentacaoPage() {
  return (
    <PageTemplate
      title="Apresentação"
      subtitle="Apresentação interativa do projeto Meli+ UX Challenge"
    >
      <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="rounded-xl bg-[#fafafa] p-8 text-center">
          <h2 className="text-2xl font-semibold text-[#333333] mb-4">
            Em construção
          </h2>
          <p className="text-sm text-[#4a4a4a] max-w-2xl mx-auto">
            Esta página está sendo desenvolvida para apresentar o projeto de forma interativa e envolvente.
            Enquanto isso, você pode consultar o roteiro da apresentação que foi documentado separadamente.
          </p>
        </div>
      </div>
    </PageTemplate>
  );
}
