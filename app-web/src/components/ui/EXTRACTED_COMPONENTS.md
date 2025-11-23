# Componentes Extraídos do HTML

Este documento lista os componentes que foram extraídos dos arquivos HTML e convertidos para React/TypeScript seguindo o Andes Design System.

## Componentes Criados

### 1. AndesFilterTag
Tag de filtro removível com ícone de fechar (X).

**Props:**
- `label: string` - Texto da tag
- `onRemove?: () => void` - Callback quando o usuário clica no X
- `className?: string` - Classes CSS adicionais

**Uso:**
```tsx
<AndesFilterTag label="Canon" onRemove={() => console.log('Removido')} />
```

---

### 2. AndesFlashOfferTag
Tag de oferta relâmpago com countdown timer animado.

**Props:**
- `endTime: Date` - Data/hora de término da oferta
- `className?: string` - Classes CSS adicionais

**Uso:**
```tsx
<AndesFlashOfferTag endTime={new Date('2024-12-31T23:59:59')} />
```

---

### 3. AndesSwitch
Switch toggle genérico reutilizável.

**Props:**
- `id: string` - ID do input
- `label: string` - Texto do switch
- `checked?: boolean` - Estado do switch
- `onChange?: (checked: boolean) => void` - Callback de mudança
- `className?: string` - Classes CSS adicionais

**Uso:**
```tsx
<AndesSwitch 
  id="free-shipping" 
  label="Frete grátis" 
  checked={isChecked}
  onChange={(checked) => setIsChecked(checked)}
/>
```

---

### 4. AndesHighlightedFilter
Filtro destacado com switch, ícone e descrição adicional.

**Props:**
- `title: string` - Título principal
- `subtitle?: React.ReactNode` - Descrição adicional
- `checked?: boolean` - Estado do switch
- `onChange?: (checked: boolean) => void` - Callback de mudança
- `icon?: React.ReactNode` - Ícone SVG
- `className?: string` - Classes CSS adicionais
- `id?: string` - ID do input

**Uso:**
```tsx
<AndesHighlightedFilter
  title="COMPRA INTERNACIONAL"
  subtitle={<><span className="highlight-green">Frete grátis</span> em carrinhos a partir de R$ 79</>}
  icon={<GlobeIcon />}
/>
```

---

### 5. AndesResultCard
Card de produto em grade com imagem e todos os detalhes.

**Props:**
- `image: string` - URL da imagem
- `title: string` - Nome do produto
- `seller?: string` - Nome do vendedor
- `isOfficialStore?: boolean` - Se é loja oficial
- `price: number | string` - Preço do produto
- `installments?: string` - Texto de parcelamento
- `tag?: string` - Tag de promoção/desconto
- `isInternational?: boolean` - Se é compra internacional
- `hasFreeShipping?: boolean` - Se tem frete grátis
- `origin?: string` - Origem do envio
- `className?: string` - Classes CSS adicionais
- `onClick?: () => void` - Callback de clique

**Uso:**
```tsx
<AndesResultCard
  image="https://example.com/product.jpg"
  title="Lente De Câmera Canon Ef 17-40mm"
  seller="nocnoc USA"
  isOfficialStore={true}
  price={4870}
  installments="12x R$ 468,14"
  tag="60% OFF Linha de crédito"
  isInternational={true}
  hasFreeShipping={true}
  origin="Envio dos EUA"
/>
```

---

### 6. AndesRecommendationCard
Card horizontal de recomendação com imagem e preço.

**Props:**
- `image: string` - URL da imagem
- `title: string` - Nome do produto
- `oldPrice?: number | string` - Preço antigo riscado
- `price: number | string` - Preço atual
- `discount?: string` - Texto de desconto
- `installments?: string` - Texto de parcelamento
- `hasFreeShipping?: boolean` - Se tem frete grátis
- `href?: string` - Link do produto
- `onClick?: () => void` - Callback de clique
- `className?: string` - Classes CSS adicionais

**Uso:**
```tsx
<AndesRecommendationCard
  image="https://example.com/product.jpg"
  title="Produto Recomendado"
  oldPrice={199.99}
  price={149.99}
  discount="25% OFF"
  installments="em até 6x"
  hasFreeShipping={true}
/>
```

---

### 7. AndesEmptyState
Estado vazio genérico com ícone e mensagem.

**Props:**
- `icon?: React.ReactNode` - Ícone SVG personalizado
- `title: string` - Título principal
- `description?: string` - Descrição adicional
- `className?: string` - Classes CSS adicionais

**Uso:**
```tsx
<AndesEmptyState
  title="Nenhum resultado encontrado"
  description="Tente buscar por outros termos ou ajuste os filtros"
  icon={<SearchIcon />}
/>
```

---

### 8. AndesSortMenu
Menu dropdown de ordenação com opções selecionáveis.

**Props:**
- `options: AndesSortOption[]` - Array de opções (id, label)
- `selectedId?: string` - ID da opção selecionada
- `onChange?: (optionId: string) => void` - Callback de mudança
- `className?: string` - Classes CSS adicionais

**Uso:**
```tsx
<AndesSortMenu
  options={[
    { id: 'relevance', label: 'Mais relevantes' },
    { id: 'price-asc', label: 'Menor preço' },
    { id: 'price-desc', label: 'Maior preço' }
  ]}
  selectedId="relevance"
  onChange={(id) => console.log('Ordenar por:', id)}
/>
```

---

### 9. AndesLoyaltyWidget
Widget Meli+ com header e lista de benefícios.

**Props:**
- `title: string` - Título do widget
- `pillImage: string` - URL da imagem da pílula Meli+
- `ctaText: string` - Texto do botão de ação
- `ctaHref?: string` - Link do botão
- `onCtaClick?: () => void` - Callback do botão
- `benefits: LoyaltyBenefit[]` - Array de benefícios (image, text, alt)
- `className?: string` - Classes CSS adicionais

**Uso:**
```tsx
<AndesLoyaltyWidget
  title="VIVA TODA A EXPERIÊNCIA MERCADO LIVRE"
  pillImage="/meli-plus-pill.png"
  ctaText="Assinar a partir de R$ 9,90"
  benefits={[
    { image: '/benefit1.png', text: 'Frete grátis rápido', alt: 'Benefício 1' },
    { image: '/benefit2.png', text: 'Disney+ grátis', alt: 'Benefício 2' }
  ]}
/>
```

---

### 10. AndesHelpMenu
Menu de ajuda/FAQ com lista de itens navegáveis.

**Props:**
- `items: HelpMenuItem[]` - Array de itens (id, label, icon, href, onClick)
- `className?: string` - Classes CSS adicionais

**Uso:**
```tsx
<AndesHelpMenu
  items={[
    { id: '1', label: 'Fale Conosco', icon: <ChatIcon /> },
    { id: '2', label: 'Central de Ajuda', icon: <HelpIcon /> }
  ]}
/>
```

---

### 11. AndesOffersCarousel
Carrossel de ofertas com navegação e seleção de itens.

**Props:**
- `title: string` - Título do carrossel
- `subtitle?: string` - Subtítulo
- `items: CarouselItem[]` - Array de itens (id, label, image/icon)
- `selectedId?: string` - ID do item selecionado
- `onItemClick?: (itemId: string) => void` - Callback de clique
- `className?: string` - Classes CSS adicionais

**Uso:**
```tsx
<AndesOffersCarousel
  title="Ofertas do dia"
  subtitle="Aproveite descontos incríveis"
  items={[
    { id: '1', label: 'Eletrônicos', image: '/electronics.png' },
    { id: '2', label: 'Moda', image: '/fashion.png' }
  ]}
  onItemClick={(id) => console.log('Selecionado:', id)}
/>
```

---

### 12. AndesDropdownMenu
Menu dropdown de navegação com seções e itens.

**Props:**
- `label: string` - Texto do menu
- `sections: MenuSection[]` - Array de seções com título e itens
- `className?: string` - Classes CSS adicionais

**Uso:**
```tsx
<AndesDropdownMenu
  label="Ofertas"
  sections={[
    {
      title: 'Destaques',
      items: [
        { id: '1', label: 'Oferta do dia', href: '/ofertas/dia' },
        { id: '2', label: 'Cupons', href: '/cupons' }
      ]
    }
  ]}
/>
```

---

## Estilos CSS

Todos os estilos desses componentes foram adicionados ao arquivo `src/styles/andes-components.css` seguindo o Andes Design System com as variáveis CSS definidas em `src/app/globals.css`.

## TypeScript

Todos os componentes são totalmente tipados com TypeScript, incluindo props e tipos auxiliares.

## Uso no Projeto

Você pode importar os componentes de duas formas:

```tsx
// Importação individual
import AndesFilterTag from '@/components/ui/AndesFilterTag';

// Importação via index
import { AndesFilterTag, AndesResultCard } from '@/components/ui';
```
