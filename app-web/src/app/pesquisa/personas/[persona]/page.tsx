import { getPersonaBySlug, getPersonaHtmlContent, getPersonas } from "@/lib/personas";
import { notFound } from "next/navigation";
import PersonaViewer from "../PersonaViewer";

interface PersonaPageProps {
  params: {
    persona: string;
  };
}

export default async function PersonaDetailPage({ params }: PersonaPageProps) {
  const [personas, currentPersona] = await Promise.all([
    getPersonas(),
    getPersonaBySlug(params.persona),
  ]);

  const currentPersonaData = currentPersona ?? notFound();

  let htmlContent = "";
  let images: string[] = [];

  try {
    htmlContent = await getPersonaHtmlContent(params.persona);
  } catch (error) {
    // Log error without exposing file system details
    console.error("Error loading persona content:", params.persona);
    return (
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900">Erro ao carregar persona</h1>
        <p className="mt-4 text-gray-700">
          Não foi possível carregar o conteúdo da persona {currentPersonaData.title}.
        </p>
      </div>
    );
  }

  return (
    <PersonaViewer
      personas={personas}
      currentPersonaSlug={currentPersonaData.slug}
      htmlContent={htmlContent}
      images={images}
    />
  );
}
