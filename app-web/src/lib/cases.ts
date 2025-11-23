import fs from "node:fs/promises";
import path from "node:path";

export interface CaseEntry {
  slug: string;
  title: string;
}

export interface CaseImage {
  fileName: string;
  url: string;
}

interface CaseManifestItem extends CaseEntry {
  images: CaseImage[];
}

interface CasesManifest {
  baseUrl: string;
  generatedAt: string;
  cases: CaseManifestItem[];
}

const LOCAL_MANIFEST_PATH = path.join(
  process.cwd(),
  "src",
  "lib",
  "cases-manifest.json",
);

const loadManifest = async (): Promise<CasesManifest> => {
  if (process.env.CASES_MANIFEST_URL) {
    const response = await fetch(process.env.CASES_MANIFEST_URL, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Não foi possível carregar o manifesto remoto de cases.");
    }

    return response.json() as Promise<CasesManifest>;
  }

  const file = await fs.readFile(LOCAL_MANIFEST_PATH, "utf8");
  return JSON.parse(file) as CasesManifest;
};

export const getCases = async (): Promise<CaseEntry[]> => {
  const manifest = await loadManifest();
  return manifest.cases.map(({ slug, title }) => ({ slug, title }));
};

export const getCaseImages = async (caseSlug: string): Promise<CaseImage[]> => {
  const manifest = await loadManifest();
  const caseEntry = manifest.cases.find(({ slug }) => slug === caseSlug);
  return caseEntry?.images ?? [];
};

export const getCaseBySlug = async (caseSlug: string): Promise<CaseEntry | null> => {
  const manifest = await loadManifest();
  const caseEntry = manifest.cases.find(({ slug }) => slug === caseSlug);
  return caseEntry ? { slug: caseEntry.slug, title: caseEntry.title } : null;
};
