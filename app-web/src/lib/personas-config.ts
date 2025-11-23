import path from "node:path";

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
