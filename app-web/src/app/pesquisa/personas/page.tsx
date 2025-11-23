import { redirect } from "next/navigation";
import { getPersonas } from "@/lib/personas";

export default async function PersonasIndexPage() {
  const personas = await getPersonas();

  if (personas.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900">Personas de Pesquisa</h1>
        <p className="mt-4 text-gray-700">
          Nenhuma persona foi encontrada na pasta de referência.
        </p>
      </div>
    );
  }

  const [firstPersona] = personas;
  redirect(`/pesquisa/personas/${firstPersona.slug}`);
}
