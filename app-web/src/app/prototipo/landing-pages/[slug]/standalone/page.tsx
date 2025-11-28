"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import OfertaMonoliticaPage from "@/components/landing-pages/OfertaMonolitica";
import CinemaPage from "@/components/landing-pages/Cinema";
import FinancasPage from "@/components/landing-pages/Financas";
import LogisticaPage from "@/components/landing-pages/Logistica";

function StandaloneContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const isMobile = searchParams.get('mobile') === 'true';

  if (slug === 'oferta-monolitica') return <OfertaMonoliticaPage isMobileViewer={isMobile} />;
  if (slug === 'cinema') return <CinemaPage />;
  if (slug === 'financas') return <FinancasPage />;
  if (slug === 'logistica') return <LogisticaPage />;

  return <div>Página não encontrada</div>;
}

export default function StandaloneLandingPage() {
  return (
    <>
      <style>{`
        html, body {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        html::-webkit-scrollbar, body::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <Suspense fallback={<div>Carregando...</div>}>
        <StandaloneContent />
      </Suspense>
    </>
  );
}
