import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { ALLOWED_IMAGE_EXTENSIONS, getPersonaImageUrl } from "@/lib/personas-config";

interface RouteParams {
  params: {
    persona: string;
    image: string;
  };
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { persona, image } = params;

  // Check if file extension is allowed
  const ext = path.extname(image).toLowerCase();
  if (!ALLOWED_IMAGE_EXTENSIONS.has(ext)) {
    return new NextResponse("Invalid file type", { status: 400 });
  }

  // Get image URL from manifest
  const imageUrl = getPersonaImageUrl(persona, image);
  
  if (!imageUrl) {
    return new NextResponse("Image not found", { status: 404 });
  }

  // Redirect to Vercel Blob Storage URL
  return NextResponse.redirect(imageUrl, 308);
}
