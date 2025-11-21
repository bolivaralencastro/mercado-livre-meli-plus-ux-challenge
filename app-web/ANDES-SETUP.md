# Guia de Configuração - Andes Design System

## 📋 Sobre o Andes

O **Andes** é o Design System oficial do Mercado Livre, que garante consistência visual e de experiência em todos os produtos da empresa.

## 🎯 Objetivo

Integrar os componentes do Andes nesta aplicação Next.js para criar protótipos fiéis à identidade visual do Mercado Livre.

## 📦 Instalação (Futuro)

> **Nota:** A instalação será realizada nas próximas etapas do projeto.

### Opções de Integração

#### Opção 1: Andes React (Recomendado)
Se o Mercado Livre disponibilizar componentes React:

```bash
npm install @mercadolibre/andes-react
# ou
yarn add @mercadolibre/andes-react
```

#### Opção 2: Usar o Design System via CDN
Para prototipagem rápida, importar CSS e JavaScript do Andes:

```html
<!-- No arquivo layout.tsx ou _document.tsx -->
<link rel="stylesheet" href="[URL_DO_ANDES_CSS]" />
```

#### Opção 3: Recriar Componentes Baseados no Andes
Criar componentes TypeScript/React que seguem as especificações visuais do Andes.

## 🎨 Configuração do Tema

### Cores do Mercado Livre

Atualizar `tailwind.config.ts` com as cores do brand:

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        // Mercado Livre Brand Colors
        'ml-yellow': '#FFE600',
        'ml-blue': '#3483FA',
        'ml-gray': {
          100: '#F5F5F5',
          200: '#EDEDED',
          300: '#999999',
          400: '#666666',
          900: '#333333',
        },
        // Estados
        'ml-success': '#00A650',
        'ml-error': '#F23D4F',
        'ml-warning': '#F8B01C',
      },
      fontFamily: {
        'proxima': ['Proxima Nova', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
```

## 📚 Componentes a Criar

### Componentes Base
- [ ] Button (variantes: primary, secondary, outline)
- [ ] Input (text, email, password)
- [ ] Card
- [ ] Badge
- [ ] Alert
- [ ] Modal
- [ ] Dropdown
- [ ] Checkbox
- [ ] Radio
- [ ] Switch

### Componentes Específicos do Meli+
- [ ] PlanCard (cartão de plano de assinatura)
- [ ] BenefitsList (lista de benefícios)
- [ ] SavingsCalculator (calculadora de economia)
- [ ] PaymentMethodCard (cartão de método de pagamento)

## 🔗 Recursos

### Documentação Oficial
- **Andes Design System:** Procurar documentação oficial do Mercado Livre
- **Figma do Andes:** Verificar se há biblioteca pública de componentes

### Referências Visuais
- Site oficial do Mercado Livre: https://www.mercadolivre.com.br
- Página do Meli+: https://www.mercadolivre.com.br/meli-plus

## 🚀 Próximos Passos

1. **Pesquisar disponibilidade pública do Andes**
   - Verificar se há pacote npm público
   - Buscar documentação oficial
   
2. **Definir estratégia de implementação**
   - Usar biblioteca oficial (se disponível)
   - Recriar componentes baseados nas especificações
   
3. **Configurar tema do Mercado Livre**
   - Cores, tipografia, espaçamentos
   - Tokens de design
   
4. **Criar componentes reutilizáveis**
   - Começar pelos componentes mais usados
   - Documentar props e uso
   
5. **Construir páginas do protótipo**
   - Landing page do Meli+
   - Fluxo de assinatura
   - Dashboard do usuário
   - Gestão de pagamentos

## 📝 Notas

- Este documento será atualizado conforme o projeto avançar
- A estrutura de componentes está preparada em `src/components/ui/`
- Componentes temporários podem ser criados durante o desenvolvimento

---

**Última atualização:** Novembro 2025
