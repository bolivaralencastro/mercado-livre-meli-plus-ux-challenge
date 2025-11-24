import React from 'react';
import { notFound } from 'next/navigation';
import { mapeamentoFlows } from '@/lib/mapeamento-flows';
import MapeamentoViewer from '@/components/mapeamento/MapeamentoViewer';

interface MapeamentoPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return mapeamentoFlows.map((flow) => ({
    slug: flow.slug,
  }));
}

export default function MapeamentoDetailPage({ params }: MapeamentoPageProps) {
  const flow = mapeamentoFlows.find((f) => f.slug === params.slug);

  if (!flow) {
    notFound();
  }

  return (
    <MapeamentoViewer 
      flows={mapeamentoFlows} 
      currentSlug={params.slug} 
    />
  );
}
