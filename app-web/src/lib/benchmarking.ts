import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

export interface BenchmarkEntry {
  slug: string;
  company: string;
  program: string;
  bundlingDescription: string;
  mechanics: string;
  landingPage?: string | null;
  screenshots: string[];
}

const BENCHMARK_SOURCE_PATH = path.join(
  process.cwd(),
  "src",
  "app",
  "pesquisa",
  "benchmarking",
  "Bench.json",
);
const BENCHMARK_SCREENSHOTS_DIR = path.join(
  process.cwd(),
  "public",
  "benchmarking-screenshots",
);

const SCREENSHOT_FILE_PATTERN = /\.(png|jpe?g|webp)$/i;

const slugify = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .trim();

type RawBenchmarkEntry = {
  company?: string;
  program?: string;
  bundlingDescription?: string;
  mechanics?: string;
  landingPage?: string | null;
};

const ensureString = (value: unknown): string =>
  typeof value === "string" ? value : "";

const sanitizeLandingPage = (value?: string | null): string | null => {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed || trimmed.toLowerCase() === "link") {
    return null;
  }

  try {
    const url = new URL(trimmed);
    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.toString();
    }
  } catch (error) {
    // Ignore invalid URLs silently
  }

  return null;
};

const parseBenchmarkContent = (content: string): BenchmarkEntry[] => {
  let parsedContent: unknown;

  try {
    parsedContent = JSON.parse(content);
  } catch (error) {
    return [];
  }

  if (!Array.isArray(parsedContent)) {
    return [];
  }

  const usedSlugs = new Map<string, number>();

  return (parsedContent as RawBenchmarkEntry[]).reduce<BenchmarkEntry[]>(
    (accumulator, entry) => {
      const company = ensureString(entry.company);
      const program = ensureString(entry.program);
      const bundlingDescription = ensureString(entry.bundlingDescription);
      const mechanics = ensureString(entry.mechanics);
      const landingPageRaw = entry.landingPage ?? null;

      if (!company) {
        return accumulator;
      }

      let baseSlug = slugify(company);
      if (!baseSlug) {
        baseSlug = slugify(`${company}-${program}`);
      }

      if (!baseSlug) {
        return accumulator;
      }

      const slugCount = usedSlugs.get(baseSlug) ?? 0;
      usedSlugs.set(baseSlug, slugCount + 1);

      const slug = slugCount === 0 ? baseSlug : `${baseSlug}-${slugCount + 1}`;

      accumulator.push({
        slug,
        company,
        program,
        bundlingDescription,
        mechanics,
        landingPage: sanitizeLandingPage(landingPageRaw),
        screenshots: [],
      });

      return accumulator;
    },
    [],
  );
};

const resolveScreenshots = async (slug: string): Promise<string[]> => {
  const entryDir = path.join(BENCHMARK_SCREENSHOTS_DIR, slug);

  try {
    const files = await fs.readdir(entryDir);
    return files
      .filter((file) => SCREENSHOT_FILE_PATTERN.test(file))
      .sort((a, b) => a.localeCompare(b, "pt-BR"))
      .map((file) => `/benchmarking-screenshots/${slug}/${file}`);
  } catch (error) {
    return [];
  }
};

export const getBenchmarkEntries = cache(async (): Promise<BenchmarkEntry[]> => {
  const fileContent = await fs.readFile(BENCHMARK_SOURCE_PATH, "utf8");
  const entries = parseBenchmarkContent(fileContent);

  const entriesWithAssets = await Promise.all(
    entries.map(async (entry) => ({
      ...entry,
      screenshots: await resolveScreenshots(entry.slug),
    })),
  );

  return entriesWithAssets.sort((a, b) => a.company.localeCompare(b.company, "pt-BR"));
});

export const getBenchmarkEntryBySlug = async (
  slug: string,
): Promise<BenchmarkEntry | null> => {
  if (!slug) {
    return null;
  }

  const entries = await getBenchmarkEntries();
  return entries.find((entry) => entry.slug === slug) ?? null;
};
