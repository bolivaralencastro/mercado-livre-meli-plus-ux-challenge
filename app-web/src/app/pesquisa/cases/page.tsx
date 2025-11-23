import { redirect } from "next/navigation";
import { getCases } from "@/lib/cases";

export default async function CasesIndexPage() {
  const cases = await getCases();

  if (cases.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900">Cases de Pesquisa</h1>
        <p className="mt-4 text-gray-700">
          Nenhum case foi encontrado na pasta de referência.
        </p>
      </div>
    );
  }

  const [firstCase] = cases;
  redirect(`/pesquisa/cases/${firstCase.slug}`);
}
