import fs from "node:fs/promises";
import path from "node:path";
import { PERSONAS_BASE_PATH, PERSONAS_MANIFEST } from "./personas-config";

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
  // Use manifest as source of truth for available personas
  const personaSlugs = Object.keys(PERSONAS_MANIFEST.personas);

  return personaSlugs
    .map((slug) => ({
      slug,
      title: normalizeTitle(slug),
    }))
    .sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
};

export const getPersonaBySlug = async (personaSlug: string): Promise<PersonaEntry | null> => {
  const personas = await getPersonas();
  return personas.find((entry) => entry.slug === personaSlug) ?? null;
};

export const getPersonaImages = async (personaSlug: string): Promise<string[]> => {
  // Get images from manifest
  const persona = PERSONAS_MANIFEST.personas[personaSlug];
  
  if (!persona) {
    return [];
  }

  return Object.keys(persona.images).sort((a, b) => 
    a.localeCompare(b, undefined, { numeric: true })
  );
};

export const getPersonaHtmlContent = async (personaSlug: string): Promise<string> => {
  const personaPath = path.join(PERSONAS_BASE_PATH, personaSlug);
  const normalizedPersonaPath = path.normalize(personaPath);

  if (!normalizedPersonaPath.startsWith(PERSONAS_BASE_PATH)) {
    throw new Error("Invalid persona path");
  }

  const htmlPath = path.join(normalizedPersonaPath, `${personaSlug}.html`);
  
  try {
    const htmlContent = await fs.readFile(htmlPath, "utf-8");
    return htmlContent;
  } catch (error) {
    throw new Error("Persona content not found");
  }
};
