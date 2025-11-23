import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

const CASES_BASE_PATH = path.join(
  process.cwd(),
  "src",
  "app",
  "pesquisa",
  "Mercado-Livre-Behance",
);

const IMAGE_CONTENT_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

const getContentType = (fileName: string): string => {
  const extension = path.extname(fileName).toLowerCase();
  return IMAGE_CONTENT_TYPES[extension] ?? "application/octet-stream";
};

export async function GET(
  _request: Request,
  { params }: { params: { case: string; image: string } },
) {
  const caseSlug = params.case;
  const imageName = params.image;

  const casePath = path.join(CASES_BASE_PATH, caseSlug);
  const normalizedCasePath = path.normalize(casePath);

  if (!normalizedCasePath.startsWith(CASES_BASE_PATH)) {
    return NextResponse.json({ message: "Case inválido" }, { status: 400 });
  }

  const imagePath = path.join(normalizedCasePath, imageName);
  const normalizedImagePath = path.normalize(imagePath);

  if (!normalizedImagePath.startsWith(normalizedCasePath)) {
    return NextResponse.json({ message: "Imagem inválida" }, { status: 400 });
  }

  try {
    const file = await fs.readFile(normalizedImagePath);
    const contentType = getContentType(imageName);

    return new NextResponse(file, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Erro ao servir imagem do case:", error);
    return NextResponse.json({ message: "Imagem não encontrada" }, { status: 404 });
  }
}
