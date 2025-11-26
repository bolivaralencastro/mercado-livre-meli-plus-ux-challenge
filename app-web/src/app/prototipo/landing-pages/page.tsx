import Link from "next/link";

import PageTemplate from "@/components/layout/PageTemplate";
import AndesButton from "@/components/ui/AndesButton";

const landingPages = [
  {
    id: "lp-monolitica",
    title: "Landing page: oferta monolítica",
    description:
      "Versão com foco em mensagem única e conversão direta, priorizando narrativa de benefícios e CTA imediato.",
    href: "/prototipo/meli-lp-monolitica.html",
  },
  {
    id: "lp-design-system",
    title: "Landing page: biblioteca Andes",
    description:
      "Exploração baseada em componentes customizados a partir do Andes Design System para validar consistência visual.",
    href: "/prototipo/meli-deisgn-system.html",
  },
];

export default function PrototipoLandingPages() {
  return (
    <PageTemplate
      title="Protótipo · Landing Pages"
      subtitle="Conjunto de páginas de aquisição usadas para validar posicionamentos de oferta, narrativa e hierarquia de benefícios."
    >
      <div className="space-y-8">
        <section className="grid gap-6 md:grid-cols-2">
          {landingPages.map((page) => (
            <div key={page.id} className="flex h-full flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Experimento</p>
                <h2 className="text-2xl font-semibold text-gray-900">{page.title}</h2>
                <p className="text-sm leading-relaxed text-gray-700">{page.description}</p>
              </div>
              <div className="mt-6">
                <Link href={page.href} target="_blank" rel="noreferrer noopener" aria-label={`Abrir ${page.title}`}>
                  <AndesButton variant="primary">Abrir</AndesButton>
                </Link>
              </div>
            </div>
          ))}
        </section>

        <aside className="rounded-2xl border border-amber-200 bg-amber-50/60 p-6">
          <h3 className="text-lg font-semibold text-amber-900">Como adicionar novas landing pages</h3>
          <p className="mt-2 text-sm text-amber-900/80">
            Exporte o HTML do protótipo para esta pasta (`app/prototipo`) e referencie o arquivo na lista acima. Para revisar o padrão
            completo de rotas, consulte o documento <code>FORMATO_PAGINAS.md</code> recém-adicionado.
          </p>
        </aside>
      </div>
    </PageTemplate>
  );
}
