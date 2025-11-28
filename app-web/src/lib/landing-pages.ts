export interface LandingPageEntry {
  slug: string;
  title: string;
  description: string;
  htmlFile?: string;
  isNative?: boolean;
  category: "aquisicao" | "retencao" | "upgrade";
  status: "draft" | "ready" | "testing";
  flowchartUrl?: string;
}

export const landingPages: LandingPageEntry[] = [
  {
    slug: "oferta-monolitica",
    title: "Landing Page: Oferta Geral",
    description: "Esta é uma landing page mais genérica e abrangente, que comunica a proposta de valor completa do Meli+. Ela aborda de forma sucinta todos os principais benefícios do programa, como frete grátis, entretenimento (streaming) e vantagens financeiras. É desenhada para ser um ponto de entrada versátil para usuários que vêm de diferentes contextos e ainda não têm uma necessidade específica em mente, oferecendo uma visão geral do ecossistema de vantagens.",
    isNative: true,
    category: "aquisicao",
    status: "ready",
    flowchartUrl: "https://smolljrfjqknp6nm.public.blob.vercel-storage.com/fluxogramas/fluxograma-de-compra-meli-mais.svg",
  },
  {
    slug: "cinema",
    title: "Hero Section: Vantagem em Streaming",
    description: "Este componente é uma seção 'hero' interativa, projetada para ser usada em uma landing page focada no benefício de entretenimento. O seu principal objetivo é demonstrar numericamente ao usuário o quanto ele economiza ao ter acesso a plataformas de streaming (como Disney+ e Star+) através da assinatura Meli+, em comparação com a assinatura dos mesmos serviços de forma avulsa. A interatividade busca provar de forma clara e personalizada que o Meli+ é a opção mais vantajosa para quem consome conteúdo.",
    isNative: true,
    category: "aquisicao",
    status: "ready",
  },
  {
    slug: "financas",
    title: "Hero Section: Vantagem em Rendimentos",
    description: "Este componente é uma seção 'hero' interativa, focada em demonstrar o benefício financeiro direto da assinatura Meli+. Por meio de um cálculo simples e personalizado, a ferramenta mostra ao usuário o potencial de rendimento extra que ele pode obter através dos benefícios da conta digital inclusos no programa. O objetivo é apelar para o lado racional do usuário, provando com números que, além das economias, a assinatura Meli+ pode ativamente gerar um retorno financeiro, tornando-se um investimento inteligente.",
    isNative: true,
    category: "aquisicao",
    status: "ready",
  },
  {
    slug: "logistica",
    title: "Hero Section: Vantagem em Frete",
    description: "Este componente é uma seção 'hero' interativa, criada para ser o destaque de uma landing page focada na dor do custo de frete. A ferramenta permite que o usuário calcule, com base em seu comportamento de compra, o quanto ele economizaria em fretes ao se tornar um assinante Meli+. O objetivo é demonstrar de forma inequívoca e numérica que, para compradores recorrentes do Mercado Livre, a assinatura não é um custo, mas sim uma fonte de economia direta e imediata, eliminando uma das maiores fricções do e-commerce.",
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
