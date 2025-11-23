/* eslint-disable @next/next/no-img-element */
import CaseSelector from "../CaseSelector";
import { getCaseBySlug, getCaseImages, getCases } from "@/lib/cases";
import { notFound } from "next/navigation";

interface CasePageProps {
  params: {
    case: string;
  };
}

const formatCaseCount = (count: number): string => `${count} imagem${count === 1 ? "" : "s"}`;

export default async function CaseDetailPage({ params }: CasePageProps) {
  const [cases, currentCase] = await Promise.all([
    getCases(),
    getCaseBySlug(params.case),
  ]);

  const currentCaseData = currentCase ?? notFound();

  const images = await getCaseImages(params.case);

  return (
    <div className="mx-auto max-w-6xl pb-16">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur">
        <div className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Pesquisa / Cases</p>
            <h1 className="text-2xl font-bold text-gray-900">{currentCaseData.title}</h1>
            <p className="text-sm text-gray-600">{formatCaseCount(images.length)}</p>
          </div>
          <CaseSelector cases={cases} currentCaseSlug={currentCaseData.slug} />
        </div>
      </header>

      <div className="flex flex-col gap-0">
        {images.length === 0 ? (
          <p className="px-6 py-8 text-gray-600">Nenhuma imagem encontrada para este case.</p>
        ) : (
          images.map((image) => (
            <img
              key={image}
              src={`/pesquisa/cases/${currentCaseData.slug}/assets/${image}`}
              alt={`${currentCaseData.title} - ${image}`}
              className="w-full"
              loading="lazy"
            />
          ))
        )}
      </div>
    </div>
  );
}
