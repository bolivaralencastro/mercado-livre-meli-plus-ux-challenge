import fs from "node:fs/promises";
import path from "node:path";
import { PERSONAS_BASE_PATH, ALLOWED_IMAGE_EXTENSIONS } from "./personas-config";

export interface PersonaEntry {
  slug: string;
  title: string;
}

export interface PersonaData {
  slug: string;
  title: string;
  htmlPath: string;
  images: string[];
}

const normalizeTitle = (slug: string): string =>
  slug
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export const getPersonas = async (): Promise<PersonaEntry[]> => {
  const entries = await fs.readdir(PERSONAS_BASE_PATH, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({
      slug: entry.name,
      title: normalizeTitle(entry.name),
    }))
    .sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
};

export const getPersonaBySlug = async (personaSlug: string): Promise<PersonaEntry | null> => {
  const personas = await getPersonas();
  return personas.find((entry) => entry.slug === personaSlug) ?? null;
};

export const getPersonaImages = async (personaSlug: string): Promise<string[]> => {
  const personaPath = path.join(PERSONAS_BASE_PATH, personaSlug);
  const normalizedPersonaPath = path.normalize(personaPath);

  if (!normalizedPersonaPath.startsWith(PERSONAS_BASE_PATH)) {
    throw new Error("Caminho de persona inválido.");
  }

  const files = await fs.readdir(normalizedPersonaPath, { withFileTypes: true });

  return files
    .filter((file) => file.isFile())
    .map((file) => file.name)
    .filter((fileName) => ALLOWED_IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
};

export const getPersonaHtmlContent = async (personaSlug: string): Promise<string> => {
  const personaPath = path.join(PERSONAS_BASE_PATH, personaSlug);
  const normalizedPersonaPath = path.normalize(personaPath);

  if (!normalizedPersonaPath.startsWith(PERSONAS_BASE_PATH)) {
    throw new Error("Caminho de persona inválido.");
  }

  const htmlPath = path.join(normalizedPersonaPath, `${personaSlug}.html`);
  
  try {
    const htmlContent = await fs.readFile(htmlPath, "utf-8");
    return htmlContent;
  } catch (error) {
    throw new Error(`HTML file not found for persona: ${personaSlug}`);
  }
};
