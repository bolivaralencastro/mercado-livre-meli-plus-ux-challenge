import fs from "node:fs/promises";
import path from "node:path";

export interface CaseEntry {
  slug: string;
  title: string;
}

const CASES_BASE_PATH = path.join(
  process.cwd(),
  "src",
  "app",
  "pesquisa",
  "Mercado-Livre-Behance",
);

const ALLOWED_IMAGE_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
]);

const normalizeTitle = (slug: string): string =>
  slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export const getCases = async (): Promise<CaseEntry[]> => {
  const entries = await fs.readdir(CASES_BASE_PATH, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({
      slug: entry.name,
      title: normalizeTitle(entry.name),
    }))
    .sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
};

export const getCaseImages = async (caseSlug: string): Promise<string[]> => {
  const casePath = path.join(CASES_BASE_PATH, caseSlug);
  const normalizedCasePath = path.normalize(casePath);

  if (!normalizedCasePath.startsWith(CASES_BASE_PATH)) {
    throw new Error("Caminho de case inválido.");
  }

  const files = await fs.readdir(normalizedCasePath, { withFileTypes: true });

  return files
    .filter((file) => file.isFile())
    .map((file) => file.name)
    .filter((fileName) => ALLOWED_IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
};

export const getCaseBySlug = async (caseSlug: string): Promise<CaseEntry | null> => {
  const cases = await getCases();
  return cases.find((entry) => entry.slug === caseSlug) ?? null;
};
