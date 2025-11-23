"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { CaseEntry } from "@/lib/cases";

interface CaseSelectorProps {
  cases: CaseEntry[];
  currentCaseSlug: string;
}

const CaseSelector = ({ cases, currentCaseSlug }: CaseSelectorProps) => {
  const router = useRouter();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const nextSlug = event.target.value;
      router.push(`/pesquisa/cases/${nextSlug}`);
    },
    [router],
  );

  return (
    <label className="flex items-center gap-3 text-sm font-medium text-gray-900">
      <span>Cases</span>
      <select
        value={currentCaseSlug}
        onChange={handleChange}
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        {cases.map((caseItem) => (
          <option key={caseItem.slug} value={caseItem.slug}>
            {caseItem.title}
          </option>
        ))}
      </select>
    </label>
  );
};

export default CaseSelector;
