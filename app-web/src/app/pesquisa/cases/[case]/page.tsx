import { getCaseBySlug, getCaseImages, getCases } from "@/lib/cases";
import { getCaseContent } from "@/lib/cases-content";
import { notFound } from "next/navigation";
import CaseViewer from "../CaseViewer";

interface CasePageProps {
  params: {
    case: string;
  };
}

export default async function CaseDetailPage({ params }: CasePageProps) {
  const [cases, currentCase, caseContent] = await Promise.all([
    getCases(),
    getCaseBySlug(params.case),
    getCaseContent(params.case),
  ]);

  const currentCaseData = currentCase ?? notFound();
  const images = await getCaseImages(params.case);

  return (
    <CaseViewer
      cases={cases}
      currentCaseSlug={currentCaseData.slug}
      images={images}
      caseContent={caseContent}
    />
  );
}

