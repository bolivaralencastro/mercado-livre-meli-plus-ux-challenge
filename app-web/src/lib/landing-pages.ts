export interface LandingPageEntry {
  slug: string;
  title: string;
  description: string;
  htmlFile?: string;
  isNative?: boolean;
  category: "aquisicao" | "retencao" | "upgrade";
  status: "draft" | "ready" | "testing";
}

export const landingPages: LandingPageEntry[] = [
  {
    slug: "oferta-monolitica",
    title: "Oferta Monolítica",
    description: "Uma abordagem direta e focada na conversão, ideal para usuários que já possuem alguma familiaridade com o Meli+ ou que são impactados por campanhas de marketing. O objetivo é apresentar a proposta de valor de forma clara e objetiva, incentivando a assinatura imediata com um call-to-action proeminente. Esta versão busca responder à necessidade de clareza e simplicidade, eliminando distrações e focando nos benefícios principais.",
    isNative: true,
    category: "aquisicao",
    status: "ready",
  },
  {
    slug: "cinema",
    title: "Cinema Experience",
    description: "Esta versão apela para o lado emocional do usuário, utilizando uma narrativa visual inspirada no universo do cinema para destacar os benefícios de entretenimento do Meli+. O público-alvo são os consumidores de streaming, que buscam uma solução completa de entretenimento. A página explora o desejo do usuário por acesso a um vasto catálogo de filmes e séries, posicionando o Meli+ como a escolha ideal para os amantes da sétima arte.",
    isNative: true,
    category: "aquisicao",
    status: "ready",
  },
  {
    slug: "financas",
    title: "Finanças Inteligentes",
    description: "Com uma abordagem mais racional, esta página é direcionada para usuários que buscam otimizar seus gastos e aproveitar ao máximo os benefícios financeiros do Meli+. A comunicação é focada em dados e economia, destacando o cashback, o rendimento da conta e a economia com fretes. O objetivo é demonstrar, de forma tangível, como a assinatura pode se pagar e gerar economia a longo prazo, atraindo um público mais analítico e consciente financeiramente.",
    isNative: true,
    category: "aquisicao",
    status: "ready",
  },
  {
    slug: "logistica",
    title: "Logística Premium",
    description: "Focada nos compradores frequentes do Mercado Livre, esta página destaca a conveniência e a economia proporcionadas pelo frete grátis e pelas entregas rápidas. A proposta de valor é centrada na agilidade e na economia de tempo, mostrando como o Meli+ pode transformar a experiência de compra online. O objetivo é atrair usuários que já são clientes da plataforma e que podem ver na assinatura uma oportunidade de otimizar ainda mais suas compras.",
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
