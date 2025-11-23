import Link from "next/link";

export default function PesquisaPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-10">
        <p className="text-sm uppercase tracking-wide text-blue-600">Pesquisa</p>
        <h1 className="mt-2 text-4xl font-bold text-gray-900">Insights e referências</h1>
        <p className="mt-4 text-lg text-gray-700">
          Acesse estudos, benchmarks e inspirações que embasam as decisões de produto.
        </p>
      </header>

      <section className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Cases Behance</h2>
              <p className="mt-2 text-gray-700">
                Explore a coleção de cases do Mercado Livre disponíveis no Behance, organizados por pasta e
                exibidos em tela cheia.
              </p>
            </div>
            <Link
              href="/pesquisa/cases"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Abrir cases
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Personas</h2>
              <p className="mt-2 text-gray-700">
                Conheça as personas criadas para entender melhor os usuários do Meli+. Navegue entre elas em
                visualização fullscreen com todas as informações detalhadas.
              </p>
            </div>
            <Link
              href="/pesquisa/personas"
              className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700"
            >
              Abrir personas
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
