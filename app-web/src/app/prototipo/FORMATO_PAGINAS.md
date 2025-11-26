# Guia de Formatação de Páginas do Protótipo

Este guia explica o que uma nova página precisa conter para funcionar corretamente dentro do app (`app-web`) e como organizar os arquivos na pasta `app/prototipo`.

## 1. Estrutura mínima da rota

Cada página do Next.js App Router é representada por uma pasta contendo um arquivo `page.tsx` que exporta, por padrão, um componente React.

```plaintext
app/
└── prototipo/
    ├── nova-pagina/
    │   └── page.tsx
    └── page.tsx
```

### Requisitos do `page.tsx`

1. **Exportação padrão (`export default`)** com um componente React.
2. **Uso do `PageTemplate`** (`@/components/layout/PageTemplate`) para manter título, subtítulo e identidade visual.
3. **Conteúdo dentro do `PageTemplate`** (cards, grids, embeds etc.).
4. **Opcional**: exportar `metadata` do Next.js se precisar alterar título/descrição da aba.

Exemplo base:

```tsx
import PageTemplate from "@/components/layout/PageTemplate";

export default function MinhaPagina() {
  return (
    <PageTemplate title="Nome da página" subtitle="Frase que explica o conteúdo.">
      {/* Conteúdo da página */}
    </PageTemplate>
  );
}
```

## 2. Atualização da navegação

O menu global é configurado em `src/components/layout/PageTemplate.tsx`. Sempre que uma nova página precisar aparecer no menu, adicione um item no cluster correspondente:

```tsx
{
  label: "Design & Entrega",
  items: [
    { id: "prototipo", label: "Protótipo", href: "/prototipo" },
    { id: "prototipo-landing", label: "Landing Pages", href: "/prototipo/landing-pages" },
  ],
}
```

> **Dica:** mantenha o `id` sem espaços, em `kebab-case`, e atualize também o rótulo usado no botão/link da página principal quando fizer sentido.

## 3. Arquivos estáticos de prototipação

- Prototipagens complexas podem ser incluídas como arquivos `.html` dentro de `app/prototipo`.
- Esses arquivos ficam acessíveis diretamente via URL (ex.: `/prototipo/meli-lp-monolitica.html`).
- Recomenda-se linká-los a partir de uma página Next (grid/cards) para garantir contexto.

## 4. Assets e dependências

- Imagens específicas do protótipo podem ficar em `public/` ou em subpastas dentro de `app/prototipo` (quando usadas apenas ali).
- Scripts externos devem ser carregados dentro do HTML estático ou com componentes client-side usando `useEffect`.
- Evite bibliotecas adicionais: reutilize os estilos utilitários já presentes (Tailwind / Andes tokens).

## 5. Checklist antes de abrir PR

- [ ] Criou a pasta da rota com `page.tsx` exportando `PageTemplate`.
- [ ] Adicionou o item no menu (`PageTemplate.tsx`) se a página for navegável.
- [ ] Garantiu que os botões usem rótulos consistentes (ex.: "Abrir").
- [ ] Validou no `npm run dev` se a rota carrega sem erros.
- [ ] Atualizou a documentação/README se necessário.

Seguindo estes passos, qualquer nova página na pasta `prototipo` fica alinhada ao padrão visual e técnico do app.``