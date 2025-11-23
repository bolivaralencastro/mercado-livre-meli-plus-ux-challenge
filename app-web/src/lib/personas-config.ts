import path from "node:path";
import personasManifest from "./personas-manifest.json";

// Base path for personas data
export const PERSONAS_BASE_PATH = path.join(
  process.cwd(),
  "..",
  "02-pesquisa",
  "personas",
);

// Allowed image extensions for personas
export const ALLOWED_IMAGE_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
]);

// Content types for image files
export const IMAGE_CONTENT_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

// Personas manifest with Vercel Blob Storage URLs
export const PERSONAS_MANIFEST = personasManifest;

// Helper to get image URL from manifest
export const getPersonaImageUrl = (personaSlug: string, imageName: string): string | null => {
  const persona = PERSONAS_MANIFEST.personas[personaSlug];
  if (!persona) return null;
  return persona.images[imageName] || null;
};
