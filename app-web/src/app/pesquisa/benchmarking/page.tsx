import { redirect } from "next/navigation";
import { getBenchmarkEntries } from "@/lib/benchmarking";

export default async function BenchmarkingIndexPage() {
  const entries = await getBenchmarkEntries();

  if (entries.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900">Benchmarking</h1>
        <p className="mt-4 text-gray-700">
          Nenhum dado de benchmarking foi encontrado em <code>Bench.json</code>.
        </p>
      </div>
    );
  }

  const [firstEntry] = entries;
  redirect(`/pesquisa/benchmarking/${firstEntry.slug}`);
}
