# Guia de Referência - Andes Design System

Este documento serve como um guia técnico do Design System "Andes", extraído e adaptado para o projeto Meli+ UX Challenge. O objetivo é fornecer um conjunto de regras e padrões para uma IA generativa, a fim de traduzir imagens de componentes do Mercado Livre em código Next.js/React funcional e consistente.

## 1. Design Tokens (Variáveis Globais)

Os tokens de design são a base do sistema e devem ser usados para garantir consistência visual. Eles estão definidos como variáveis CSS no arquivo `app-web/src/app/globals.css`.

### Cores

As cores são divididas em institucionais e neutras.

```css
/* --- CORES INSTITUCIONAIS --- */
--andes-primary: #ffe600;           /* Amarelo ML */
--andes-primary-dark: #e6cf00;
--andes-secondary: #3483fa;         /* Azul Ação */
--andes-secondary-dark: #2968c8;
--andes-secondary-bg: rgba(65,137,230,.15);
--andes-success: #00a650;           /* Verde */
--andes-warning: #ff7733;           /* Laranja */
--andes-error: #f23d4f;             /* Vermelho */
--andes-purple-meli: #8e24aa;       /* Roxo Meli+ */

/* --- NEUTROS & FUNDOS --- */
--andes-neutral-0: #ffffff;
--andes-neutral-100: #f5f5f0;
--andes-neutral-200: #ebebeb;       /* Cinza Borda/Divider */
--andes-neutral-300: #e6e6e6;
--andes-neutral-600: #999999;       /* Texto fraco */
--andes-neutral-800: #333333;       /* Texto forte */
--andes-neutral-900: #000000;
--andes-bg-page: #ededed;           /* Fundo clássico */
--andes-bg-auth: #f5f5f5;           /* Fundo Auth/Checkout */
```

### Tipografia

| Variável              | Valor            | Uso Comum                |
| --------------------- | ---------------- | ------------------------ |
| `--andes-font-family` | `'Roboto', ...`  | Fonte principal          |
| `--andes-font-size-xs`| `12px`           | Textos muito pequenos, legendas |
| `--andes-font-size-s` | `14px`           | Texto de corpo, parágrafos |
| `--andes-font-size-m` | `16px`           | Texto de corpo, inputs   |
| `--andes-font-size-l` | `18px`           | Títulos menores          |
| `--andes-font-size-xl`| `24px`           | Títulos de seção         |
| `--andes-font-size-xxl`| `32px`          | Títulos principais       |

### Bordas (Radius)

| Variável            | Valor  | Uso Comum                     |
| ------------------- | ------ | ----------------------------- |
| `--andes-radius-s`  | `4px`  | Elementos pequenos (badges)   |
| `--andes-radius-m`  | `6px`  | Botões, Inputs                |
| `--andes-radius-l`  | `8px`  | Cards, Modais                 |
| `--andes-radius-pill`| `2rem`| Elementos com formato de pílula |

### Sombras (Shadows)

| Variável           | Valor                               | Uso Comum                  |
| ------------------ | ----------------------------------- | -------------------------- |
| `--andes-shadow-sm`| `0 1px 2px 0 rgba(0,0,0,.1)`        | Sombra sutil para cards    |
| `--andes-shadow-md`| `0 4px 8px 0 rgba(0,0,0,.12)`       | Sombra de elevação (hover) |

---

## 2. Princípios de Layout

### O Modelo de Container (`AndesCard`)

A maioria dos agrupamentos de conteúdo é feita dentro de um "container" que funciona como uma superfície elevada. O componente base para isso é o `AndesCard`.

- **Regra:** Elementos relacionados devem ser agrupados dentro de um `AndesCard` para criar separação visual da página.
- **CSS:** A classe `.andes-card` aplica fundo branco, bordas arredondadas (`--andes-radius-l`), sombra (`--andes-shadow-sm`) e uma borda sutil.

### Organização Interna com Flexbox

O layout dos elementos *dentro* de um container é governado por `flexbox`.

- **Regra:** Use `display: flex` para organizar os itens. A propriedade `gap` deve ser usada para garantir um espaçamento consistente entre os elementos.
- **Exemplo (Layout Vertical):**
  ```css
  .container-vertical {
    display: flex;
    flex-direction: column;
    gap: 16px; /* Espaçamento médio */
  }
  ```
- **Exemplo (Layout Horizontal):**
  ```css
  .container-horizontal {
    display: flex;
    align-items: center;
    gap: 12px; /* Espaçamento pequeno */
  }
  ```

---

## 3. Biblioteca de Componentes (React)

Todos os componentes estão localizados em `app-web/src/components/ui/` e os estilos estão em `app-web/src/styles/andes-components.css`.

### AndesButton

- **Descrição:** Botão de ação padrão.
- **Props Principais:** `variant`, `fullWidth`, `children`.
- **Variantes (`variant`):**
  - `primary`: Fundo azul, para ações secundárias.
  - `action`: Fundo amarelo, para ações primárias (CTA).
  - `transparent`: Fundo transparente com texto azul.
  - `link`: Apenas o texto em azul, sem fundo ou bordas.
- **Modificador:** A prop `fullWidth` aplica a classe `.andes-button--full` (`width: 100%`).
- **Exemplo (JSX):**
  ```jsx
  <AndesButton variant="action">Comprar agora</AndesButton>
  ```

### AndesCard

- **Descrição:** Container de superfície base.
- **Props Principais:** `children`, `className`.
- **CSS:** `.andes-card`.
- **Exemplo (JSX):**
  ```jsx
  <AndesCard>
    <p>Conteúdo do card.</p>
  </AndesCard>
  ```

### AndesBadge

- **Descrição:** Selos para destacar informações.
- **Props Principais:** `variant`, `children`.
- **Variantes (`variant`):** `promo`, `full`, `new`, `bestseller`.
- **Exemplo (JSX):**
  ```jsx
  <AndesBadge variant="bestseller">MAIS VENDIDO</AndesBadge>
  ```

### AndesInput / AndesFormGroup

- **Descrição:** Conjunto para criação de campos de formulário.
- **Componentes:**
  - `AndesLabel`: A etiqueta do campo.
  - `AndesInput`: O campo de texto.
  - `AndesFormGroup`: Agrupa `AndesLabel` e `AndesInput`, adicionando espaçamento correto e um ícone opcional.
- **Exemplo (JSX):**
  ```jsx
  <AndesFormGroup label="E-mail ou telefone" htmlFor="user">
    <AndesInput id="user" name="user" />
  </AndesFormGroup>
  ```

### AndesModal

- **Descrição:** Janela modal para exibir conteúdo sobreposto à página.
- **Props Principais:** `isOpen` (boolean), `onClose` (function), `children`.
- **Funcionamento:** É um componente cliente (`'use client'`). O estado de visibilidade (`isOpen`) deve ser controlado pelo componente pai.
- **Exemplo (JSX):**
  ```jsx
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <AndesButton onClick={() => setModalOpen(true)}>Abrir Modal</AndesButton>
      <AndesModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2>Conteúdo do Modal</h2>
      </AndesModal>
    </>
  );
  ```

*(Esta documentação pode ser expandida à medida que mais componentes forem analisados e criados).*
