import article from "../debito-automatico.json";

type Processo = { etapa: string; descricao: string };
type Banco = { codigo: string; nome: string; observacoes: string };
type Wallet = { nome: string; descricao: string };
type ApiItem = { nome: string; descricao: string };
type Custo = { tipo: string; valor: string };

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

const ProcessoList = ({ items }: { items: Processo[] }) => (
  <div className="grid gap-3 md:grid-cols-3">
    {items.map((item) => (
      <div key={item.etapa} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">{item.etapa}</p>
        <p className="mt-2 text-gray-700">{item.descricao}</p>
      </div>
    ))}
  </div>
);

const BancoTable = ({ bancos }: { bancos: Banco[] }) => (
  <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
    <table className="min-w-full divide-y divide-gray-200 text-left">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 text-sm font-semibold text-gray-700">Código</th>
          <th className="px-4 py-3 text-sm font-semibold text-gray-700">Banco</th>
          <th className="px-4 py-3 text-sm font-semibold text-gray-700">Observações</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 bg-white">
        {bancos.map((banco) => (
          <tr key={banco.codigo}>
            <td className="px-4 py-3 text-sm text-gray-700">{banco.codigo}</td>
            <td className="px-4 py-3 text-sm font-medium text-gray-900">{banco.nome}</td>
            <td className="px-4 py-3 text-sm text-gray-700">{banco.observacoes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const CardList = ({ items, title }: { items: Wallet[] | ApiItem[]; title: string }) => (
  <div className="space-y-3">
    <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">{title}</p>
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <div key={item.nome} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-lg font-semibold text-gray-900">{item.nome}</p>
          <p className="mt-2 text-gray-700">{item.descricao}</p>
        </div>
      ))}
    </div>
  </div>
);

const CostList = ({ custos }: { custos: Custo[] }) => (
  <div className="space-y-3">
    {custos.map((custo) => (
      <div key={custo.tipo} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <p className="text-lg font-semibold text-gray-900">{custo.tipo}</p>
        <p className="mt-1 text-gray-700">{custo.valor}</p>
      </div>
    ))}
  </div>
);

export default function DebitoAutomaticoConteudo() {
  const { article_metadata: metadata, content } = article;

  return (
    <article className="prose max-w-none">
      <header className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900">{metadata.title}</h1>
        <p className="text-xl text-gray-600">{metadata.subtitle}</p>
        <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-500">
          <span>{metadata.author}</span>
          <span>•</span>
          <span>{metadata.publication_date}</span>
          <span>•</span>
          <span>{metadata.read_time}</span>
        </div>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">{content.introduction.heading}</h2>
        <Paragraphs items={content.introduction.text_body} />
      </section>

      <section className="mt-8 space-y-5">
        <h2 className="text-2xl font-semibold text-gray-900">{content.section_funcionamento.heading}</h2>
        <Paragraphs items={content.section_funcionamento.text_body} />
        <ProcessoList items={content.section_funcionamento.processo} />
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Novidades 2025</p>
          <BulletList items={content.section_funcionamento.novidades_2025} />
        </div>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">{content.section_bancos.heading}</h2>
        <Paragraphs items={content.section_bancos.text_body} />
        <BancoTable bancos={content.section_bancos.bancos} />
        <p className="text-sm text-gray-600">{content.section_bancos.fonte}</p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">{content.section_wallets.heading}</h2>
        <Paragraphs items={content.section_wallets.text_body} />
        <CardList items={content.section_wallets.wallets} title="Wallets em destaque" />
        <p className="text-sm text-gray-700">{content.section_wallets.destaque}</p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">{content.section_integracoes.heading}</h2>
        <Paragraphs items={content.section_integracoes.text_body} />
        <ProcessoList items={content.section_integracoes.fluxo} />
        <CardList items={content.section_integracoes.apis} title="APIs relevantes" />
        <p className="text-sm text-gray-700">{content.section_integracoes.observacao}</p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">{content.section_custos.heading}</h2>
        <p className="text-gray-700">{content.section_custos.para_consumidor}</p>
        <CostList custos={content.section_custos.para_empresas} />
        <p className="text-sm font-medium text-gray-800">{content.section_custos.resumo}</p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900">{content.conclusion.heading}</h2>
        <Paragraphs items={content.conclusion.text_body} />
        <p className="text-sm text-gray-600">{content.conclusion.fontes}</p>
      </section>
    </article>
  );
}
