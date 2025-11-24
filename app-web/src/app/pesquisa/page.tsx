import Link from "next/link";

import PageTemplate from "@/components/layout/PageTemplate";
import AndesButton from "@/components/ui/AndesButton";

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
          <p className="text-sm uppercase tracking-wide text-gray-600">Referências</p>
          <h2 className="mt-1 text-2xl font-semibold text-gray-900">Cases Behance</h2>
          <p className="mt-2 max-w-2xl text-sm text-gray-600">
            Explore a coleção de cases do Mercado Livre disponíveis no Behance, organizados por pasta e exibidos em
            tela cheia.
          </p>
        </div>
        <Link href="/pesquisa/cases">
          <AndesButton variant="primary" size="medium">
            Abrir cases
          </AndesButton>
        </Link>
      </div>
    </div>

    {/* Card – Personas */}
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-gray-600">Personas</p>
          <h2 className="mt-1 text-2xl font-semibold text-gray-900">Personas</h2>
          <p className="mt-2 max-w-2xl text-sm text-gray-600">
            Conheça as personas criadas para entender melhor os usuários do Meli+. Navegue entre elas em visualização
            fullscreen com todas as informações detalhadas.
          </p>
        </div>
        <Link href="/pesquisa/personas">
          <AndesButton variant="primary" size="medium">
            Abrir personas
          </AndesButton>
        </Link>
      </div>
    </div>

    {/* Card – Reviews */}
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-gray-600">Dados Quantitativos</p>
          <h2 className="mt-1 text-2xl font-semibold text-gray-900">Análise de Reviews</h2>
          <p className="mt-2 max-w-2xl text-sm text-gray-600">
            Insights extraídos de ~42 milhões de avaliações públicas do Mercado Livre e Mercado Pago nas stores e Reclame Aqui.
          </p>
        </div>
        <Link href="/pesquisa/review">
          <AndesButton variant="primary" size="medium">
            Ver reviews
          </AndesButton>
        </Link>
      </div>
    </div>

    {/* Card – Benchmarking */}
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-gray-600">Referências</p>
          <h2 className="mt-1 text-2xl font-semibold text-gray-900">Benchmarking Fidelidade</h2>
          <p className="mt-2 max-w-2xl text-sm text-gray-600">
            Compare programas de fidelidade relevantes, suas mecânicas de jogo e principais ofertas para inspirar decisões estratégicas.
          </p>
        </div>
        <Link href="/pesquisa/benchmarking">
          <AndesButton variant="primary" size="medium">
            Abrir benchmarking
          </AndesButton>
        </Link>
      </div>
    </div>

    {/* Card – Mapeamento As-Is */}
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-gray-600">Auditoria UX</p>
          <h2 className="mt-1 text-2xl font-semibold text-gray-900">Mapeamento As-Is</h2>
          <p className="mt-2 max-w-2xl text-sm text-gray-600">
            Análise heurística e reprodução fiel da Landing Page atual do Meli+ e fluxos de pagamento para identificação de fricções.
          </p>
        </div>
        <Link href="/pesquisa/mapeamento">
          <AndesButton variant="primary" size="medium">
            Ver mapeamento
          </AndesButton>
        </Link>
      </div>
    </div>
  </section>
</PageTemplate>
  
  );
}
