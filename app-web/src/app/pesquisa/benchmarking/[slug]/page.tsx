import { notFound } from "next/navigation";

import BenchmarkingViewer from "../BenchmarkingViewer";
import { getBenchmarkEntries } from "@/lib/benchmarking";

type BenchmarkingEntryPageProps = {
  params: {
    slug: string;
  };
};

export default async function BenchmarkingEntryPage({
  params,
}: BenchmarkingEntryPageProps) {
  const entries = await getBenchmarkEntries();

  if (entries.length === 0) {
    notFound();
  }

  const currentEntry = entries.find((entry) => entry.slug === params.slug);

  if (!currentEntry) {
    notFound();
  }

  return <BenchmarkingViewer entries={entries} currentSlug={currentEntry.slug} />;
}

export async function generateStaticParams() {
  const entries = await getBenchmarkEntries();

  return entries.map((entry) => ({
    slug: entry.slug,
  }));
}
