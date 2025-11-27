export interface LandingPageEntry {
  slug: string;
  title: string;
  description: string;
  htmlFile?: string;
  isNative?: boolean; // Se true, a página é um componente TSX nativo
  category: "aquisicao" | "retencao" | "upgrade";
  status: "draft" | "ready" | "testing";
}

export const landingPages: LandingPageEntry[] = [
  {
    slug: "oferta-monolitica",
    title: "Oferta Monolítica",
    description: "Versão com foco em mensagem única e conversão direta, priorizando narrativa de benefícios e CTA imediato. Ideal para campanhas de mídia paga com audiência qualificada.",
    isNative: true,
    category: "aquisicao",
    status: "ready",
  },
  {
    slug: "cinema",
    title: "Cinema Experience",
    description: "Landing page com hero cinematográfico e transições suaves. Explora o storytelling visual para destacar os benefícios de streaming incluídos no Meli+.",
    isNative: true,
    category: "aquisicao",
    status: "ready",
  },
  {
    slug: "financas",
    title: "Finanças Inteligentes",
    description: "Foco nos benefícios financeiros: cashback, rendimento da conta e economia em fretes. Abordagem mais racional e orientada a números.",
    isNative: true,
    category: "aquisicao",
    status: "ready",
  },
  {
    slug: "logistica",
    title: "Logística Premium",
    description: "Destaque para os benefícios de frete grátis e entrega rápida. Ideal para usuários frequentes que valorizam conveniência.",
    isNative: true,
    category: "aquisicao",
    status: "ready",
  },
];

export function getLandingPageBySlug(slug: string): LandingPageEntry | undefined {
  return landingPages.find((lp) => lp.slug === slug);
}

export function getLandingPages(): LandingPageEntry[] {
  return landingPages;
}
