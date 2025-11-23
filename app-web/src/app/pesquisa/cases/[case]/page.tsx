/* eslint-disable @next/next/no-img-element */
import { CaseEntry, getCaseBySlug, getCaseImages, getCases } from "@/lib/cases";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CasePageProps {
  params: {
    case: string;
  };
}

const formatCaseCount = (count: number): string => `${count} imagem${count === 1 ? "" : "s"}`;

const CaseSidebar = ({
  cases,
  currentCaseSlug,
}: {
  cases: CaseEntry[];
  currentCaseSlug: string;
}) => (
  <nav className="sticky top-24">
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-4 py-3">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">Navegação</p>
          <p className="text-sm font-semibold text-gray-900">Cases</p>
        </div>
        <Link
          href="/pesquisa"
          className="inline-flex items-center gap-2 rounded-lg border border-blue-100 px-3 py-1.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
        >
          <span aria-hidden>←</span>
          Voltar
        </Link>
      </div>

      <ul className="divide-y divide-gray-100">
        {cases.map((caseItem) => {
          const isActive = caseItem.slug === currentCaseSlug;
          return (
            <li key={caseItem.slug}>
              <Link
                href={`/pesquisa/cases/${caseItem.slug}`}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-start gap-3 px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-800"
                    : "text-gray-800 hover:bg-gray-50"
                }`}
              >
                <span
                  className={`mt-1 h-2 w-2 rounded-full ${
                    isActive ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  aria-hidden
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold leading-5">{caseItem.title}</span>
                  <span className="text-xs text-gray-500">{caseItem.slug}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  </nav>
);

export default async function CaseDetailPage({ params }: CasePageProps) {
  const [cases, currentCase] = await Promise.all([
    getCases(),
    getCaseBySlug(params.case),
  ]);

  const currentCaseData = currentCase ?? notFound();

  const images = await getCaseImages(params.case);

  return (
    <div className="mx-auto max-w-screen-2xl px-4 pb-16 sm:px-6 lg:px-10">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur">
        <div className="flex items-start justify-between gap-4 px-1 py-4 sm:px-0">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Pesquisa / Cases</p>
            <h1 className="text-2xl font-bold text-gray-900">{currentCaseData.title}</h1>
            <p className="text-sm text-gray-600">{formatCaseCount(images.length)}</p>
          </div>
        </div>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <CaseSidebar cases={cases} currentCaseSlug={currentCaseData.slug} />

        <section className="flex flex-col gap-6">
          {images.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center text-gray-600">
              Nenhuma imagem encontrada para este case.
            </p>
          ) : (
            images.map((image) => (
              <img
                key={image}
                src={`/pesquisa/cases/${currentCaseData.slug}/assets/${image}`}
                alt={`${currentCaseData.title} - ${image}`}
                className="h-auto w-full rounded-2xl border border-gray-100 bg-white shadow-sm"
                loading="lazy"
              />
            ))
          )}
        </section>
      </div>
    </div>
  );
}
