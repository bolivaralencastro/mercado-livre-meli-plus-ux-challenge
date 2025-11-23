import Link from "next/link";

import PageTemplate from "@/components/layout/PageTemplate";

export default function PesquisaPage() {
  return (
<PageTemplate
  title="Pesquisa"
  subtitle="Mapeamento de comportamentos, benchmarks e referências que embasam as decisões de produto."
>
  <section className="space-y-6">
    {/* Card – Cases Behance */}
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-[#3483fa]">Referências</p>
          <h2 className="mt-1 text-2xl font-semibold text-[#333333]">Cases Behance</h2>
          <p className="mt-2 max-w-2xl text-sm text-[#4a4a4a]">
            Explore a coleção de cases do Mercado Livre disponíveis no Behance, organizados por pasta e exibidos em
            tela cheia.
          </p>
        </div>
        <Link
          href="/pesquisa/cases"
          className="inline-flex items-center gap-2 rounded-full bg-[#3483fa] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#2968c8]"
        >
          Abrir cases
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>

    {/* Card – Personas */}
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-[#9b51e0]">Personas</p>
          <h2 className="mt-1 text-2xl font-semibold text-[#333333]">Personas</h2>
          <p className="mt-2 max-w-2xl text-sm text-[#4a4a4a]">
            Conheça as personas criadas para entender melhor os usuários do Meli+. Navegue entre elas em visualização
            fullscreen com todas as informações detalhadas.
          </p>
        </div>
        <Link
          href="/pesquisa/personas"
          className="inline-flex items-center gap-2 rounded-full bg-[#9b51e0] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#7b3bbd]"
        >
          Abrir personas
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  </section>
</PageTemplate>
  
  );
}
