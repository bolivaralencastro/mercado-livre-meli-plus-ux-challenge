import fs from "node:fs/promises";
import path from "node:path";

export interface CaseContent {
  title: string;
  slug: string;
  summary: string;
  description: string;
  insights: string[];
  tags: string[];
  impact: string;
}

interface CasesContentData {
  cases: Record<string, CaseContent>;
}

const CONTENT_PATH = path.join(
  process.cwd(),
  "src",
  "lib",
  "cases-content.json",
);

const loadCasesContent = async (): Promise<CasesContentData> => {
  try {
    const file = await fs.readFile(CONTENT_PATH, "utf8");
    return JSON.parse(file) as CasesContentData;
  } catch (error) {
    console.error("Erro ao carregar cases-content.json:", error);
    return { cases: {} };
  }
};

/**
 * Obtém o conteúdo de um case específico pelo slug
 */
export const getCaseContent = async (
  caseSlug: string,
): Promise<CaseContent | null> => {
  const data = await loadCasesContent();
  return data.cases[caseSlug] || null;
};

/**
 * Obtém todos os cases com conteúdo
 */
export const getAllCasesContent = async (): Promise<CaseContent[]> => {
  const data = await loadCasesContent();
  return Object.values(data.cases);
};

/**
 * Obtém o resumo de um case
 */
export const getCaseSummary = async (
  caseSlug: string,
): Promise<string | null> => {
  const content = await getCaseContent(caseSlug);
  return content?.summary || null;
};

/**
 * Obtém os insights de um case
 */
export const getCaseInsights = async (
  caseSlug: string,
): Promise<string[] | null> => {
  const content = await getCaseContent(caseSlug);
  return content?.insights || null;
};
