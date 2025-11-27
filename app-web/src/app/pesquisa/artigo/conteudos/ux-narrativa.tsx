import article from "../artigo-referencia.json";

const paragraphs = (items: string[]) =>
  items.map((text) => (
    <p key={text} className="text-gray-700">
      {text}
    </p>
  ));

const BenefitsList = ({
  items,
}: {
  items: { title: string; description: string }[];
}) => (
  <div className="space-y-4">
    {items.map((benefit) => (
      <div key={benefit.title} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
        <p className="mt-2 text-gray-700">{benefit.description}</p>
      </div>
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

export default function UxNarrativaConteudo() {
  const { content, article_metadata: metadata } = article;
  const { introduction, section_why_story, techniques, conclusion } = content;

  return (
    <article className="prose max-w-none">
      <header className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900">{metadata.title}</h1>
        <p className="text-xl text-gray-600">{metadata.subtitle}</p>
        <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-500">
          <span>Por {metadata.author}</span>
          <span>•</span>
          <span>{metadata.publication_date}</span>
          <span>•</span>
          <span>{metadata.read_time}</span>
        </div>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">{introduction.heading}</h2>
        {paragraphs(introduction.text_body)}
      </section>

      <section className="mt-10 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">{section_why_story.heading}</h2>
        <blockquote className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 text-gray-800">
          <p className="text-base font-medium">“{section_why_story.interview_insight.quote}”</p>
          <footer className="mt-2 text-sm text-gray-700">
            — {section_why_story.interview_insight.source}
          </footer>
        </blockquote>
        <p className="text-gray-700">{section_why_story.interview_insight.conclusion}</p>
        <BenefitsList items={section_why_story.benefits} />
      </section>

      <section className="mt-10 space-y-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Guia prático</p>
          <h2 className="text-2xl font-semibold text-gray-900">{techniques.intro}</h2>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900">{techniques.technique_1.name}</h3>
            <p className="mt-2 text-gray-700">{techniques.technique_1.concept}</p>
            <p className="mt-2 text-gray-700">{techniques.technique_1.action}</p>
            <BulletList items={techniques.technique_1.benefits} />
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{techniques.technique_2.name}</h3>
              <p className="mt-2 text-gray-700">{techniques.technique_2.concept}</p>
            </div>
            <div className="space-y-4">
              {techniques.technique_2.key_questions.map((question) => (
                <div key={question.question} className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                  <p className="font-semibold text-gray-900">{question.question}</p>
                  {question.purpose && <p className="text-gray-700">{question.purpose}</p>}
                  {question.sub_categories && (
                    <div className="mt-3 space-y-3">
                      {question.sub_categories.map((sub) => (
                        <div key={sub.name} className="rounded-lg border border-gray-200 bg-white p-3">
                          <p className="font-semibold text-gray-900">{sub.name}</p>
                          <p className="text-gray-700">{sub.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900">{techniques.technique_3.name}</h3>
            <p className="mt-2 text-gray-700">{techniques.technique_3.concept}</p>
            <BulletList items={techniques.technique_3.benefits} />
            <div className="mt-4 space-y-2">
              <p className="font-semibold text-gray-900">Como criar</p>
              <BulletList items={techniques.technique_3.steps_to_create} />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">{conclusion.heading}</h2>
        <p className="text-gray-700">{conclusion.reference}</p>
        <p className="text-gray-800 font-medium">{conclusion.final_argument}</p>
        <p className="text-gray-700">{conclusion.call_to_action}</p>
      </section>
    </article>
  );
}
