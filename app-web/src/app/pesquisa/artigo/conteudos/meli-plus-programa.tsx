import article from "../meli-plus.json";

const Paragraphs = ({ items }: { items: string[] }) => (
  <div className="space-y-3">
    {items.map((item) => (
      <p key={item} className="text-gray-700">
        {item}
      </p>
    ))}
  </div>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="list-disc space-y-2 pl-5 text-gray-700">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

export default function MeliPlusConteudo() {
  const { article_metadata: metadata, content } = article;

  return (
    <article className="prose max-w-none">
      <header className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900">{metadata.title}</h1>
        <p className="text-xl text-gray-600">{metadata.subtitle}</p>
        <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-500">
          <span>{metadata.author}</span>
          <span>•</span>
          <span>{metadata.publication_display ?? metadata.publication_date}</span>
          <span>•</span>
          <span>{metadata.read_time}</span>
        </div>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">{content.overview.heading}</h2>
        <Paragraphs items={content.overview.text_body} />
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">{content.como_funciona.heading}</h2>
        <Paragraphs items={content.como_funciona.text_body} />
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-900">Planos disponíveis</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {(
            [
              { label: "Meli+ Essencial", data: content.planos.essencial },
              { label: "Meli+ Total", data: content.planos.total },
            ] as const
          ).map(({ label, data }) => (
            <div key={label} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">{label}</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{data.mensalidade}</p>
              <BulletList items={data.beneficios} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900">{content.condicoes.heading}</h2>
        <BulletList items={content.condicoes.pontos} />
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900">{content.passos_assinatura.heading}</h2>
        <ol className="list-decimal space-y-2 pl-5 text-gray-700">
          {content.passos_assinatura.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900">{content.beneficios.heading}</h2>
        <BulletList items={content.beneficios.itens} />
      </section>
    </article>
  );
}
