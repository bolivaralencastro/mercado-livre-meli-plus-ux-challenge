import article from "../ux-ui-planos-pagamento.json";

type KeyPoint = { title: string; description: string };
type Component = { name: string; description: string };
type LayoutModel = { type: string; description: string };
type ComparisonRow = {
  modelo: string;
  pros: string;
  contras: string;
  ideal_para: string;
  exemplo: string;
};
type Metric = { name: string; description: string };
type MetricTableRow = {
  metrica: string;
  descricao: string;
  correlacao: string;
  fonte: string;
};
type CaseStudy = { company: string; finding: string };
type RecommendationCategory = { category: string; items: string[] };
type ToolTableRow = {
  categoria: string;
  exemplos: string;
  funcionalidades: string;
  preco: string;
  caso_uso: string;
};
type CognitiveSection = {
  name: string;
  reference: string;
  reference_url: string;
  study: string;
  application_ui: string[];
};
type AdvancedUISection = {
  name: string;
  description: string;
  recommendation?: string;
  css?: string;
  requirements?: string[];
};
type NNGSection = {
  name: string;
  description?: string;
  recommendation?: string;
  problems?: string[];
  recommendations?: string[];
};
type PaddleMetric = {
  metrica: string;
  correlacao: string;
  dados: string;
  fonte: string;
};
type ChecklistItem = { item: string; description: string };
type RecommendedTool = {
  ferramenta: string;
  foco: string;
  preco: string;
  beneficio: string;
};
type Reference = {
  author: string;
  year: string;
  title: string;
  url: string;
};
type Link = { name: string; url: string };

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900">{children}</h2>
);

const SubHeading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-800">{children}</h3>
);

const Paragraphs = ({ items }: { items: string[] }) => (
  <div className="space-y-3">
    {items.map((item, idx) => (
      <p key={idx} className="leading-relaxed text-gray-700">
        {item}
      </p>
    ))}
  </div>
);

const KeyPointsGrid = ({ items }: { items: KeyPoint[] }) => (
  <div className="grid gap-4 md:grid-cols-2">
    {items.map((item) => (
      <div
        key={item.title}
        className="rounded-lg border border-blue-100 bg-blue-50 p-4"
      >
        <p className="font-semibold text-blue-900">{item.title}</p>
        <p className="mt-2 text-sm text-blue-800">{item.description}</p>
      </div>
    ))}
  </div>
);

const ComponentCards = ({ items }: { items: Component[] }) => (
  <div className="grid gap-4 md:grid-cols-2">
    {items.map((item) => (
      <div
        key={item.name}
        className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
      >
        <p className="font-semibold text-gray-900">{item.name}</p>
        <p className="mt-2 text-sm text-gray-700">{item.description}</p>
      </div>
    ))}
  </div>
);

const LayoutModelCards = ({ items }: { items: LayoutModel[] }) => (
  <div className="space-y-3">
    {items.map((item) => (
      <div
        key={item.type}
        className="rounded-lg border border-gray-200 bg-gray-50 p-4"
      >
        <p className="font-semibold text-gray-900">{item.type}</p>
        <p className="mt-2 text-sm text-gray-700">{item.description}</p>
      </div>
    ))}
  </div>
);

const ComparisonTable = ({ rows }: { rows: ComparisonRow[] }) => (
  <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
    <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 font-semibold text-gray-700">Modelo</th>
          <th className="px-4 py-3 font-semibold text-gray-700">Prós</th>
          <th className="px-4 py-3 font-semibold text-gray-700">Contras</th>
          <th className="px-4 py-3 font-semibold text-gray-700">Ideal Para</th>
          <th className="px-4 py-3 font-semibold text-gray-700">Exemplo</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 bg-white">
        {rows.map((row) => (
          <tr key={row.modelo}>
            <td className="px-4 py-3 font-medium text-gray-900">{row.modelo}</td>
            <td className="px-4 py-3 text-gray-700">{row.pros}</td>
            <td className="px-4 py-3 text-gray-700">{row.contras}</td>
            <td className="px-4 py-3 text-gray-700">{row.ideal_para}</td>
            <td className="px-4 py-3 text-gray-600">{row.exemplo}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const MetricsGrid = ({ items }: { items: Metric[] }) => (
  <div className="grid gap-3 md:grid-cols-3">
    {items.map((item) => (
      <div
        key={item.name}
        className="rounded-lg border border-gray-200 bg-white p-4"
      >
        <p className="font-semibold text-gray-900">{item.name}</p>
        <p className="mt-1 text-sm text-gray-600">{item.description}</p>
      </div>
    ))}
  </div>
);

const MetricsTable = ({ rows }: { rows: MetricTableRow[] }) => (
  <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
    <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 font-semibold text-gray-700">Métrica</th>
          <th className="px-4 py-3 font-semibold text-gray-700">Descrição</th>
          <th className="px-4 py-3 font-semibold text-gray-700">Correlação</th>
          <th className="px-4 py-3 font-semibold text-gray-700">Fonte</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 bg-white">
        {rows.map((row) => (
          <tr key={row.metrica}>
            <td className="px-4 py-3 font-medium text-gray-900">{row.metrica}</td>
            <td className="px-4 py-3 text-gray-700">{row.descricao}</td>
            <td className="px-4 py-3 text-green-700">{row.correlacao}</td>
            <td className="px-4 py-3 text-gray-600">{row.fonte}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const CaseStudyCards = ({ items }: { items: CaseStudy[] }) => (
  <div className="grid gap-4 md:grid-cols-3">
    {items.map((item) => (
      <div
        key={item.company}
        className="rounded-lg border border-green-100 bg-green-50 p-4"
      >
        <p className="font-semibold text-green-900">{item.company}</p>
        <p className="mt-2 text-sm text-green-800">{item.finding}</p>
      </div>
    ))}
  </div>
);

const RecommendationsList = ({ categories }: { categories: RecommendationCategory[] }) => (
  <div className="space-y-4">
    {categories.map((cat) => (
      <div key={cat.category} className="rounded-lg border border-gray-200 bg-white p-4">
        <p className="font-semibold text-gray-900">{cat.category}</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
          {cat.items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const ToolsTable = ({ rows }: { rows: ToolTableRow[] }) => (
  <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
    <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 font-semibold text-gray-700">Categoria</th>
          <th className="px-4 py-3 font-semibold text-gray-700">Exemplos</th>
          <th className="px-4 py-3 font-semibold text-gray-700">Funcionalidades</th>
          <th className="px-4 py-3 font-semibold text-gray-700">Preço</th>
          <th className="px-4 py-3 font-semibold text-gray-700">Caso de Uso</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 bg-white">
        {rows.map((row) => (
          <tr key={row.categoria}>
            <td className="px-4 py-3 font-medium text-gray-900">{row.categoria}</td>
            <td className="px-4 py-3 text-gray-700">{row.exemplos}</td>
            <td className="px-4 py-3 text-gray-700">{row.funcionalidades}</td>
            <td className="px-4 py-3 text-gray-600">{row.preco}</td>
            <td className="px-4 py-3 text-gray-600">{row.caso_uso}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const CognitiveSections = ({ sections }: { sections: CognitiveSection[] }) => (
  <div className="space-y-6">
    {sections.map((section) => (
      <div
        key={section.name}
        className="rounded-lg border border-purple-100 bg-purple-50 p-5"
      >
        <h4 className="text-lg font-semibold text-purple-900">{section.name}</h4>
        <p className="mt-2 text-sm text-purple-800">
          <strong>Referência:</strong>{" "}
          <a
            href={section.reference_url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-purple-600"
          >
            {section.reference}
          </a>
        </p>
        <p className="mt-3 text-sm text-purple-800">{section.study}</p>
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-700">
            Aplicação na UI
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-purple-800">
            {section.application_ui.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    ))}
  </div>
);

const AdvancedUISections = ({ sections }: { sections: AdvancedUISection[] }) => (
  <div className="space-y-4">
    {sections.map((section) => (
      <div
        key={section.name}
        className="rounded-lg border border-gray-200 bg-white p-4"
      >
        <h4 className="font-semibold text-gray-900">{section.name}</h4>
        <p className="mt-2 text-sm text-gray-700">{section.description}</p>
        {section.recommendation && (
          <p className="mt-2 text-sm text-blue-700">
            <strong>Recomendação:</strong> {section.recommendation}
          </p>
        )}
        {section.css && (
          <code className="mt-2 block rounded bg-gray-100 px-3 py-2 text-sm text-gray-800">
            {section.css}
          </code>
        )}
        {section.requirements && (
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
            {section.requirements.map((req, idx) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        )}
      </div>
    ))}
  </div>
);

const NNGSections = ({ sections }: { sections: NNGSection[] }) => (
  <div className="space-y-4">
    {sections.map((section) => (
      <div
        key={section.name}
        className="rounded-lg border border-orange-100 bg-orange-50 p-4"
      >
        <h4 className="font-semibold text-orange-900">{section.name}</h4>
        {section.description && (
          <p className="mt-2 text-sm text-orange-800">{section.description}</p>
        )}
        {section.recommendation && (
          <p className="mt-2 text-sm text-orange-700">
            <strong>Recomendação:</strong> {section.recommendation}
          </p>
        )}
        {section.problems && (
          <div className="mt-2">
            <p className="text-xs font-semibold text-orange-700">Problemas:</p>
            <ul className="list-disc pl-5 text-sm text-orange-800">
              {section.problems.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
          </div>
        )}
        {section.recommendations && (
          <div className="mt-2">
            <p className="text-xs font-semibold text-orange-700">Soluções:</p>
            <ul className="list-disc pl-5 text-sm text-orange-800">
              {section.recommendations.map((r, idx) => (
                <li key={idx}>{r}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    ))}
  </div>
);

const PaddleMetricsTable = ({ rows }: { rows: PaddleMetric[] }) => (
  <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
    <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 font-semibold text-gray-700">Métrica</th>
          <th className="px-4 py-3 font-semibold text-gray-700">Correlação com Design</th>
          <th className="px-4 py-3 font-semibold text-gray-700">Dados 2025</th>
          <th className="px-4 py-3 font-semibold text-gray-700">Fonte</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 bg-white">
        {rows.map((row) => (
          <tr key={row.metrica}>
            <td className="px-4 py-3 font-medium text-gray-900">{row.metrica}</td>
            <td className="px-4 py-3 text-gray-700">{row.correlacao}</td>
            <td className="px-4 py-3 text-green-700">{row.dados}</td>
            <td className="px-4 py-3 text-gray-600">{row.fonte}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Checklist = ({ items }: { items: ChecklistItem[] }) => (
  <div className="space-y-2">
    {items.map((item) => (
      <div
        key={item.item}
        className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-3"
      >
        <span className="mt-0.5 text-green-600">✓</span>
        <div>
          <p className="font-medium text-gray-900">{item.item}</p>
          <p className="text-sm text-gray-600">{item.description}</p>
        </div>
      </div>
    ))}
  </div>
);

const RecommendedToolsTable = ({ rows }: { rows: RecommendedTool[] }) => (
  <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
    <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 font-semibold text-gray-700">Ferramenta</th>
          <th className="px-4 py-3 font-semibold text-gray-700">Foco Principal</th>
          <th className="px-4 py-3 font-semibold text-gray-700">Preço (2025)</th>
          <th className="px-4 py-3 font-semibold text-gray-700">Benefício em Pricing</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 bg-white">
        {rows.map((row) => (
          <tr key={row.ferramenta}>
            <td className="px-4 py-3 font-medium text-gray-900">{row.ferramenta}</td>
            <td className="px-4 py-3 text-gray-700">{row.foco}</td>
            <td className="px-4 py-3 text-gray-600">{row.preco}</td>
            <td className="px-4 py-3 text-gray-700">{row.beneficio}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ReferencesList = ({ references }: { references: Reference[] }) => (
  <div className="space-y-2">
    {references.map((ref) => (
      <div key={ref.title} className="text-sm text-gray-600">
        <span className="font-medium text-gray-800">{ref.author}</span> ({ref.year}).{" "}
        <a
          href={ref.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          {ref.title}
        </a>
      </div>
    ))}
  </div>
);

const LinksList = ({ links }: { links: Link[] }) => (
  <div className="flex flex-wrap gap-3">
    {links.map((link) => (
      <a
        key={link.name}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-700 hover:bg-blue-100"
      >
        {link.name} →
      </a>
    ))}
  </div>
);

export default function UxUiPlanosPagamentoConteudo() {
  const { article_metadata: metadata, content } = article;

  return (
    <article className="prose max-w-none">
      {/* Header */}
      <header className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900">{metadata.title}</h1>
        <p className="mt-2 text-xl text-gray-600">{metadata.subtitle}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-500">
          <span>{metadata.author}</span>
          <span>•</span>
          <span>{metadata.publication_display}</span>
          <span>•</span>
          <span>{metadata.read_time}</span>
        </div>
      </header>

      {/* Key Points */}
      <section id="highlight-paradoxo">
        <SectionHeading>{content.key_points.heading}</SectionHeading>
        <KeyPointsGrid items={content.key_points.items} />
      </section>

      {/* Organization */}
      <section>
        <SectionHeading>{content.organization.heading}</SectionHeading>
        <Paragraphs items={content.organization.text_body} />
        <p className="mt-3 text-sm text-gray-500">
          Fonte:{" "}
          <a
            href={content.organization.source}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Nielsen Norman Group
          </a>
        </p>
      </section>

      {/* Layouts */}
      <section>
        <SectionHeading>{content.layouts.heading}</SectionHeading>
        <Paragraphs items={content.layouts.text_body} />
      </section>

      {/* Success Metrics */}
      <section>
        <SectionHeading>{content.success_metrics.heading}</SectionHeading>
        <Paragraphs items={content.success_metrics.text_body} />
      </section>

      {/* Recommendations and Tools */}
      <section>
        <SectionHeading>{content.recommendations_tools.heading}</SectionHeading>
        <Paragraphs items={content.recommendations_tools.text_body} />
        <div className="mt-4">
          <LinksList links={content.recommendations_tools.links} />
        </div>
      </section>

      <hr className="my-10 border-gray-300" />

      {/* Detailed Exploration */}
      <section>
        <SectionHeading>{content.detailed_exploration.heading}</SectionHeading>
        <p className="text-gray-700">{content.detailed_exploration.introduction}</p>
      </section>

      {/* Essential Elements */}
      <section>
        <SectionHeading>{content.essential_elements.heading}</SectionHeading>
        <p className="mb-4 text-gray-700">{content.essential_elements.introduction}</p>
        <ComponentCards items={content.essential_elements.components} />
        <p className="mt-4 rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
          {content.essential_elements.organization_tips}
        </p>
      </section>

      {/* Layout Models */}
      <section id="highlight-mobile">
        <SectionHeading>{content.layout_models.heading}</SectionHeading>
        <p className="mb-4 text-gray-700">{content.layout_models.introduction}</p>
        
        <SubHeading>Modelos de Layout</SubHeading>
        <LayoutModelCards items={content.layout_models.models} />
        
        <SubHeading>Formatos de Preço</SubHeading>
        <LayoutModelCards items={content.layout_models.pricing_formats} />
        
        <p className="mt-4 text-sm text-gray-600">{content.layout_models.saas_note}</p>
        
        <SubHeading>Comparação de Layouts</SubHeading>
        <ComparisonTable rows={content.layout_models.comparison_table} />
      </section>

      {/* Metrics Correlations */}
      <section>
        <SectionHeading>{content.metrics_correlations.heading}</SectionHeading>
        <p className="mb-4 text-gray-700">{content.metrics_correlations.introduction}</p>
        <MetricsGrid items={content.metrics_correlations.common_metrics} />
        <p className="mt-4 text-sm text-gray-700">{content.metrics_correlations.research_findings}</p>
        <div className="mt-4">
          <MetricsTable rows={content.metrics_correlations.metrics_table} />
        </div>
      </section>

      {/* A/B Testing Insights */}
      <section>
        <SectionHeading>{content.ab_testing_insights.heading}</SectionHeading>
        
        <SubHeading>Estudos de Caso</SubHeading>
        <CaseStudyCards items={content.ab_testing_insights.case_studies} />
        
        <SubHeading>Impactos Visuais</SubHeading>
        <ul className="list-disc space-y-2 pl-5 text-gray-700">
          {content.ab_testing_insights.visual_impacts.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        
        <p className="mt-4 rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
          {content.ab_testing_insights.academic_insights}
        </p>
      </section>

      {/* Specific Recommendations */}
      <section id="highlight-restorff">
        <SectionHeading>{content.specific_recommendations.heading}</SectionHeading>
        <RecommendationsList categories={content.specific_recommendations.categories} />
      </section>

      {/* Tools */}
      <section>
        <SectionHeading>{content.tools.heading}</SectionHeading>
        
        <SubHeading>Prototipação</SubHeading>
        <ul className="list-disc pl-5 text-gray-700">
          {content.tools.prototyping.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        
        <SubHeading>Testes</SubHeading>
        <ul className="list-disc pl-5 text-gray-700">
          {content.tools.testing.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        
        <div className="mt-4">
          <ToolsTable rows={content.tools.tools_table} />
        </div>
      </section>

      <hr className="my-10 border-gray-300" />

      {/* Cognitive Psychology */}
      <section id="highlight-digito">
        <SectionHeading>{content.cognitive_psychology.heading}</SectionHeading>
        <p className="mb-4 text-gray-700">{content.cognitive_psychology.introduction}</p>
        <CognitiveSections sections={content.cognitive_psychology.sections} />
      </section>

      {/* Advanced UI */}
      <section id="highlight-wcag">
        <SectionHeading>{content.advanced_ui.heading}</SectionHeading>
        <AdvancedUISections sections={content.advanced_ui.sections} />
      </section>

      {/* NNG Insights */}
      <section>
        <SectionHeading>{content.nng_insights.heading}</SectionHeading>
        <p className="mb-4 text-gray-700">{content.nng_insights.introduction}</p>
        <NNGSections sections={content.nng_insights.sections} />
      </section>

      {/* Paddle Metrics */}
      <section>
        <SectionHeading>{content.paddle_metrics.heading}</SectionHeading>
        <p className="mb-4 text-gray-700">{content.paddle_metrics.introduction}</p>
        <PaddleMetricsTable rows={content.paddle_metrics.metrics_table} />
      </section>

      {/* Checklist */}
      <section id="highlight-aversao">
        <SectionHeading>{content.checklist.heading}</SectionHeading>
        <Checklist items={content.checklist.items} />
      </section>

      {/* Recommended Tools */}
      <section>
        <SectionHeading>{content.recommended_tools.heading}</SectionHeading>
        <RecommendedToolsTable rows={content.recommended_tools.tools_table} />
      </section>

      {/* References */}
      <section className="mt-10 rounded-lg border border-gray-200 bg-gray-50 p-6">
        <SectionHeading>{content.main_references.heading}</SectionHeading>
        <ReferencesList references={content.main_references.references} />
      </section>
    </article>
  );
}
