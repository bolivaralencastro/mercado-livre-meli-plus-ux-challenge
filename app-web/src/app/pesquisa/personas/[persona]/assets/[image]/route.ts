import fs from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: {
    persona: string;
    image: string;
  };
}

const PERSONAS_BASE_PATH = path.join(
  process.cwd(),
  "..",
  "02-pesquisa",
  "personas",
);

const ALLOWED_IMAGE_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
]);

const CONTENT_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { persona, image } = params;

  const personaPath = path.join(PERSONAS_BASE_PATH, persona);
  const imagePath = path.join(personaPath, image);
  const normalizedImagePath = path.normalize(imagePath);

  // Security check: ensure the path is within the personas directory
  if (!normalizedImagePath.startsWith(PERSONAS_BASE_PATH)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // Check if file extension is allowed
  const ext = path.extname(image).toLowerCase();
  if (!ALLOWED_IMAGE_EXTENSIONS.has(ext)) {
    return new NextResponse("Invalid file type", { status: 400 });
  }

  try {
    const fileBuffer = await fs.readFile(normalizedImagePath);
    const contentType = CONTENT_TYPES[ext] || "application/octet-stream";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error reading image file:", error);
    return new NextResponse("Image not found", { status: 404 });
  }
}
