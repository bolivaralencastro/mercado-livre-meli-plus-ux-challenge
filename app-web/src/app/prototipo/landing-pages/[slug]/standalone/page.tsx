"use client";

import { useParams } from "next/navigation";
import OfertaMonoliticaPage from "@/components/landing-pages/OfertaMonolitica";
import CinemaPage from "@/components/landing-pages/Cinema";
import FinancasPage from "@/components/landing-pages/Financas";
import LogisticaPage from "@/components/landing-pages/Logistica";

export default function StandaloneLandingPage() {
  const params = useParams();
  const slug = params.slug as string;

  if (slug === 'oferta-monolitica') return <OfertaMonoliticaPage />;
  if (slug === 'cinema') return <CinemaPage />;
  if (slug === 'financas') return <FinancasPage />;
  if (slug === 'logistica') return <LogisticaPage />;

  return <div>Página não encontrada</div>;
}
