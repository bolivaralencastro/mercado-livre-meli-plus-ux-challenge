import type { JSX } from "react";

export type ArtigoInsight = {
  id: string;
  title: string;
  description: string;
  application: string;
  highlightId?: string;
};

export const categorias = [
  "UX & Narrativa",
  "Pagamentos",
  "Fidelização",
  "Comportamento",
  "Estratégia",
] as const;

export const tags = [
  "storytelling",
  "content-first",
  "experiência do usuário",
  "débito automático",
  "pix",
  "recorrência",
  "assinaturas",
  "meli+",
  "integração",
  "wallets",
  "regulamentação",
  "persona",
  "jornada",
] as const;

export type Categoria = (typeof categorias)[number];
export type Tag = (typeof tags)[number];

export type Artigo = {
  id: string;
  slug: string;
  titulo: string;
  autor: string;
  dataPublicacao: string;
  tempoLeitura: string;
  resumo: string;
  tags: Tag[];
  categoria: Categoria;
  insights: ArtigoInsight[];
  RenderConteudo: () => JSX.Element;
};

type ArtigoMetadataJson = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  publication_date: string;
  publication_display?: string;
  read_time: string;
  summary: string;
  categoria: Categoria;
  tags: Tag[];
};

type ArtigoJson = {
  article_metadata: ArtigoMetadataJson;
  insights: ArtigoInsight[];
};

type ArtigoContentModule = {
  default: () => JSX.Element;
};

type RequireWithContext = NodeRequire & {
  context: <T>(
    path: string,
    recursive: boolean,
    pattern: RegExp
  ) => {
    keys(): string[];
    (id: string): T;
  };
};

const loadArtigosFromJson = (): ArtigoJson[] => {
  const artigosContext = (require as RequireWithContext).context<ArtigoJson>(
    "../app/pesquisa/artigo",
    false,
    /\.json$/
  );

  return artigosContext
    .keys()
    .map((key) => artigosContext(key))
    .sort((a, b) => a.article_metadata.slug.localeCompare(b.article_metadata.slug));
};

const artigosJson: ArtigoJson[] = loadArtigosFromJson();

const loadArtigoComponents = (): Map<string, () => JSX.Element> => {
  const conteudoContext = (require as RequireWithContext).context<ArtigoContentModule>(
    "../app/pesquisa/artigo/conteudos",
    false,
    /\.tsx$/
  );

  return conteudoContext.keys().reduce((acc, key) => {
    const componentModule = conteudoContext(key);
    const slug = key.replace("./", "").replace(/\.tsx$/, "");
    acc.set(slug, componentModule.default);
    return acc;
  }, new Map<string, () => JSX.Element>());
};

const artigoComponents = loadArtigoComponents();

const mapJsonToArtigo = (data: ArtigoJson): Artigo => ({
  id: data.article_metadata.id,
  slug: data.article_metadata.slug,
  titulo: data.article_metadata.title,
  autor: data.article_metadata.author,
  dataPublicacao: data.article_metadata.publication_display ?? data.article_metadata.publication_date,
  tempoLeitura: data.article_metadata.read_time,
  resumo: data.article_metadata.summary,
  tags: data.article_metadata.tags,
  categoria: data.article_metadata.categoria,
  insights: data.insights,
  RenderConteudo:
    artigoComponents.get(data.article_metadata.slug) ??
    (() => (
      <div className="prose max-w-none text-sm text-muted-foreground">
        <p>
          Conteúdo do artigo não disponível. Inclua um componente TSX em
          /app/pesquisa/artigo/conteudos.
        </p>
      </div>
    )),
});

export const artigos: Artigo[] = artigosJson.map(mapJsonToArtigo);

export function getArtigoBySlug(slug: string): Artigo | undefined {
  return artigos.find((a) => a.slug === slug);
}

export function getArtigosPorCategoria(categoria: Categoria): Artigo[] {
  return artigos.filter((a) => a.categoria === categoria);
}

export function getArtigosPorTag(tag: Tag): Artigo[] {
  return artigos.filter((a) => a.tags.includes(tag));
}

export function getAllTags(): { tag: Tag; count: number }[] {
  const tagCount = new Map<Tag, number>();
  artigos.forEach((artigo) => {
    artigo.tags.forEach((tag) => {
      tagCount.set(tag as Tag, (tagCount.get(tag as Tag) || 0) + 1);
    });
  });
  return Array.from(tagCount.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllCategorias(): { categoria: Categoria; count: number }[] {
  const catCount = new Map<Categoria, number>();
  artigos.forEach((artigo) => {
    catCount.set(artigo.categoria as Categoria, (catCount.get(artigo.categoria as Categoria) || 0) + 1);
  });
  return Array.from(catCount.entries())
    .map(([categoria, count]) => ({ categoria, count }))
    .sort((a, b) => b.count - a.count);
}
