# Telas - UI Design

## Introdução
Este documento apresenta as telas de alta fidelidade projetadas para a experiência Meli+, detalhando componentes, interações e especificações de design.

---

## Arquitetura de Telas

### Mapa de Navegação
```
Home ML
├── Landing Page Meli+
│   ├── Calculadora de Benefícios
│   └── Seleção de Plano
│       └── Checkout
│           └── Confirmação
│               └── Onboarding
│
Conta do Usuário
├── Dashboard Meli+
│   ├── Visão Geral
│   ├── Economia
│   │   ├── Detalhes por Categoria
│   │   └── Histórico
│   ├── Meios de Pagamento
│   │   ├── Adicionar Método
│   │   ├── Editar Método
│   │   └── Remover Método
│   └── Configurações
│       ├── Gerenciar Assinatura
│       └── Cancelar
```

---

## 1. Landing Page Meli+

### Objetivo
Apresentar o Meli+ e converter visitantes em assinantes.

### Componentes Principais

#### Hero Section
**Elementos:**
- Título principal: "Meli+: Frete grátis ilimitado e muito mais"
- Subtítulo: "Economize em todas as suas compras"
- CTA primário: "Experimentar grátis por 30 dias"
- CTA secundário: "Saiba mais"
- Imagem/ilustração de benefícios

**Especificações:**
- Altura: 80vh
- Background: Gradiente azul ML (#3483FA → #2968C8)
- Título: Proxima Nova Bold, 48px, branco
- CTA: Botão amarelo ML (#FFF159), 16px altura, raio 6px

#### Cards de Benefícios
**Grid 2x2 (desktop) / 1 coluna (mobile)**

**Card 1: Frete Grátis**
- Ícone: 🚚
- Título: "Frete grátis ilimitado"
- Descrição: "Sem valor mínimo de compra"

**Card 2: Descontos**
- Ícone: 🏷️
- Título: "Descontos exclusivos"
- Descrição: "Ofertas especiais só para você"

**Card 3: Cashback**
- Ícone: 💰
- Título: "Cashback em compras"
- Descrição: "Ganhe dinheiro de volta"

**Card 4: Sem Taxa**
- Ícone: ✓
- Título: "Sem taxas extras"
- Descrição: "Preço justo sempre"

**Especificações:**
- Card: 280x320px, branco, sombra suave
- Ícone: 64x64px, cor primária
- Título: 20px, bold
- Descrição: 14px, cinza escuro

#### Social Proof
**Elementos:**
- Avaliação: ⭐⭐⭐⭐⭐ 4.8/5
- Quantidade: "Mais de 5 milhões de assinantes"
- Testimonials: 3 depoimentos com foto

#### Calculadora de Benefícios
**Seção interativa:**
- Input: "Quanto você gasta em frete por mês?"
- Slider: R$0 - R$200
- Output: "Você economizaria R$X por ano"
- Gráfico: Comparação visual
- CTA: "Começar agora"

#### Footer da Landing
- FAQ expandível
- Termos e condições
- Link para suporte

### Estados e Interações
- Scroll → Parallax sutil no hero
- Hover em CTAs → Leve elevação
- Input na calculadora → Update em tempo real
- Mobile → Menu hamburger

---

## 2. Checkout e Assinatura

### Tela 2.1: Seleção de Plano

**Layout:**
- Header com progresso: "Passo 1 de 3"
- Título: "Escolha seu plano"
- Cards de planos lado a lado

**Plano Mensal:**
- R$ 19,90/mês
- Badge: "Sem compromisso"
- Características listadas
- CTA: "Selecionar"

**Plano Anual (Recomendado):**
- R$ 15,90/mês (cobrado R$ 190,80)
- Badge: "20% de desconto"
- Badge: "Mais popular"
- Características listadas
- CTA: "Selecionar" (destaque)

**Footer:**
- "Teste grátis por 30 dias, cancele quando quiser"
- Links de ajuda

### Tela 2.2: Método de Pagamento

**Se Usuário Tem Cartão Salvo:**
- Cartões em lista
- Radio button para seleção
- Últimos 4 dígitos + bandeira
- "+ Usar outro cartão"

**Se Precisa Adicionar:**
- Formulário de cartão
  - Número (com formatação automática)
  - Nome
  - Validade (MM/AA)
  - CVV
  - Checkbox: "Salvar para próximas compras"
- Badges de segurança
- Bandeiras aceitas

**Especificações:**
- Input height: 48px
- Border: 1px #E6E6E6
- Focus: Border azul ML
- Erro: Border vermelho + mensagem
- Ícone de bandeira: Auto-detect

### Tela 2.3: Revisão e Confirmação

**Resumo:**
- Plano selecionado
- Valor por mês
- Método de pagamento (últimos 4 dígitos)
- Primeira cobrança: Data
- Checkbox: "Li e aceito os termos"

**Totais:**
- Teste grátis: R$ 0,00
- Após 30 dias: R$ XX,XX/mês
- Próxima cobrança: DD/MM/AAAA

**CTAs:**
- "Confirmar assinatura" (primário)
- "Voltar" (secundário)

### Tela 2.4: Sucesso

**Feedback Visual:**
- Animação de sucesso (checkmark)
- Confetti sutil

**Conteúdo:**
- "Bem-vindo ao Meli+! 🎉"
- "Sua assinatura está ativa"
- Resumo do que foi contratado
- Lembrete: Primeira cobrança em 30 dias
- CTA: "Começar a usar"

---

## 3. Dashboard Meli+

### Tela 3.1: Visão Geral

**Header:**
- "Olá, [Nome]"
- Status: Badge "Ativo" (verde)
- Plano: "Meli+ Mensal"

**Cards Principais:**

**Card Economia:**
- Ícone: 💰
- "Você economizou"
- Valor: R$ XXX,XX
- Período: "nos últimos 30 dias"
- Link: "Ver detalhes"

**Card Benefícios:**
- Grid de benefícios usados
- Ícone + contador
- "15x Frete grátis"
- "3x Descontos"
- "R$ 45 Cashback"

**Card Próxima Cobrança:**
- Data da renovação
- Valor
- Método de pagamento
- Link: "Alterar"

**Atalhos Rápidos:**
- "Meios de pagamento"
- "Ver economia"
- "Configurações"
- "Ajuda"

### Tela 3.2: Economia Detalhada

**Header:**
- Filtro de período: "Este mês" / "3 meses" / "1 ano" / "Tudo"
- Total economizado (grande destaque)

**Gráfico:**
- Linha temporal de economia
- Por mês
- Cores por categoria

**Breakdown:**
- Tabela/lista por categoria
  - Frete grátis: R$ XXX (XX%)
  - Descontos: R$ XXX (XX%)
  - Cashback: R$ XXX (XX%)

**Comparação:**
- "Você pagou: R$ XXX em assinatura"
- "Você economizou: R$ XXX"
- "Lucro líquido: R$ XXX" ✅

**Lista de Transações:**
- Data
- Descrição (produto/pedido)
- Categoria de benefício
- Valor economizado
- Link para pedido

### Tela 3.3: Meios de Pagamento

**Lista de Métodos:**
Cada cartão em um card:
- Logo da bandeira
- "•••• •••• •••• 1234"
- Nome no cartão
- Validade: MM/AA
- Badge: "Padrão" (se aplicável)
- Badge: "Vence em X dias" (se próximo)
- Ações: Editar | Remover

**CTA:**
- "+ Adicionar novo método"

**Informações:**
- "Seu método padrão é usado para renovações automáticas"
- Link: "Saiba mais sobre segurança"

### Tela 3.4: Modal - Adicionar Cartão

**Overlay:**
- Background escuro 50% opacidade
- Modal centralizado, 480px largura

**Conteúdo do Modal:**
- Título: "Adicionar cartão de crédito"
- Formulário:
  - Número do cartão (com preview visual)
  - Nome (como está no cartão)
  - Validade
  - CVV (com tooltip)
- Checkbox: "Tornar método padrão"
- Badges de segurança: SSL + PCI

**CTAs:**
- "Adicionar" (primário)
- "Cancelar" (texto)

**Validação:**
- Real-time para formato
- Detecção de bandeira
- Feedback visual imediato

---

## 4. Configurações e Gestão

### Tela 4.1: Gerenciar Assinatura

**Informações da Assinatura:**
- Plano atual
- Data de início
- Status
- Valor mensal
- Método de pagamento

**Ações Disponíveis:**
- "Alterar plano" (upgrade/downgrade)
- "Atualizar método de pagamento"
- "Pausar assinatura" (se disponível)
- "Cancelar assinatura"

**Histórico de Cobranças:**
- Tabela com últimas transações
- Data | Valor | Status | Recibo

### Tela 4.2: Fluxo de Cancelamento

**Tela 1 - Feedback:**
- "Sentiremos sua falta 😢"
- "Por que você quer cancelar?"
- Opções de múltipla escolha:
  - [ ] Muito caro
  - [ ] Não uso os benefícios
  - [ ] Tive problemas técnicos
  - [ ] Prefiro outro serviço
  - [ ] Outro motivo
- Campo texto: "Conte mais (opcional)"

**Tela 2 - Retenção:**
- "Antes de ir..."
- "Você economizou R$ XXX com Meli+"
- Oferta (se aplicável):
  - "Que tal 50% off no próximo mês?"
  - ou "Pause por 1 mês sem perder benefícios"
- CTAs:
  - "Aceitar oferta" (primário)
  - "Continuar cancelamento" (secundário)

**Tela 3 - Confirmação:**
- "Tem certeza?"
- Resumo do que perderá
- Benefícios até fim do período
- Checkbox: "Entendo e quero cancelar"
- CTAs:
  - "Sim, cancelar" (vermelho)
  - "Não, manter assinatura" (primário)

**Tela 4 - Cancelado:**
- "Assinatura cancelada"
- "Seus benefícios estarão ativos até DD/MM/AAAA"
- "Você pode reativar a qualquer momento"
- Email de confirmação enviado
- CTA: "Voltar para home"

---

## 5. Componentes Reutilizáveis

### Botões

**Primário:**
- Background: Azul ML (#3483FA)
- Texto: Branco, 14px, bold
- Padding: 12px 24px
- Border-radius: 6px
- Hover: Azul escuro (#2968C8)
- Active: Azul mais escuro

**Secundário:**
- Background: Transparente
- Border: 1px azul ML
- Texto: Azul ML
- Hover: Background azul 10%

**Terciário (Text Button):**
- Sem background
- Texto: Azul ML
- Underline no hover

### Cards

**Padrão:**
- Background: Branco
- Border: 1px #E6E6E6
- Border-radius: 8px
- Padding: 24px
- Box-shadow: 0 2px 8px rgba(0,0,0,0.08)

**Hover:**
- Elevação: 0 4px 12px rgba(0,0,0,0.12)
- Transição: 200ms ease

### Badges

**Status Ativo:**
- Background: Verde claro (#E6F7ED)
- Texto: Verde escuro (#00A650)
- Padding: 4px 12px
- Border-radius: 12px

**Status Problema:**
- Background: Vermelho claro (#FFE6E6)
- Texto: Vermelho (#F23D4F)

**Destaque:**
- Background: Amarelo ML (#FFF159)
- Texto: Preto

### Inputs

**Estado Normal:**
- Height: 48px
- Border: 1px #E6E6E6
- Border-radius: 6px
- Padding: 0 16px
- Font-size: 14px

**Estado Focus:**
- Border: 2px azul ML
- Outline: none

**Estado Erro:**
- Border: 2px vermelho
- Mensagem de erro abaixo (vermelho, 12px)

**Estado Sucesso:**
- Border: 2px verde
- Ícone de check à direita

### Modals

**Overlay:**
- Background: rgba(0,0,0,0.5)
- Backdrop blur: 4px

**Container:**
- Background: Branco
- Border-radius: 12px
- Max-width: 480px
- Padding: 32px
- Box-shadow: 0 8px 24px rgba(0,0,0,0.16)

---

## 6. Sistema de Grid e Espaçamento

### Grid Desktop
- Container: 1200px max-width
- Colunas: 12
- Gutter: 24px
- Margin: 48px

### Grid Mobile
- Container: 100% - 32px
- Colunas: 4
- Gutter: 16px
- Margin: 16px

### Escala de Espaçamento
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px

---

## 7. Tipografia

### Família
- Principal: Proxima Nova
- Fallback: -apple-system, Arial, sans-serif

### Escala
- H1: 48px / 56px (bold)
- H2: 32px / 40px (bold)
- H3: 24px / 32px (semibold)
- H4: 20px / 28px (semibold)
- Body Large: 16px / 24px (regular)
- Body: 14px / 20px (regular)
- Small: 12px / 16px (regular)
- Caption: 10px / 14px (regular)

---

## 8. Cores

### Primárias
- Azul ML: #3483FA
- Azul Escuro: #2968C8
- Amarelo ML: #FFF159

### Secundárias
- Verde: #00A650
- Vermelho: #F23D4F
- Laranja: #FF6600

### Neutras
- Preto: #000000
- Cinza Escuro: #333333
- Cinza Médio: #666666
- Cinza Claro: #999999
- Cinza Muito Claro: #E6E6E6
- Branco: #FFFFFF

### Backgrounds
- Page: #F5F5F5
- Card: #FFFFFF
- Overlay: rgba(0,0,0,0.5)

---

## 9. Ícones

### Biblioteca
- Mercado Livre Icons (proprietária)
- Material Icons (fallback)
- Tamanhos: 16px, 24px, 32px, 48px

### Uso
- Navegação: 24px
- Cards de benefícios: 48px
- Botões: 16px
- Inputs: 20px

---

## 10. Responsividade

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px
- Wide: > 1440px

### Adaptações Mobile
- Menu → Hamburger
- Grid → Stack vertical
- Tabelas → Cards scrolláveis
- Modals → Full screen
- Font-sizes: -2px em títulos

---

## 11. Acessibilidade

### Contraste
- Texto normal: mínimo 4.5:1
- Texto grande: mínimo 3:1
- Componentes interativos: 3:1

### Navegação por Teclado
- Tab order lógico
- Focus visible
- Skip links

### Screen Readers
- Labels descritivos
- ARIA labels
- Alt text em imagens

### Touch Targets
- Mínimo: 44x44px
- Espaçamento: 8px entre targets

---

## 12. Animações e Transições

### Princípios
- Duração: 200-300ms
- Easing: ease-in-out
- Propósito: Feedback e orientação

### Uso
- Hover: 200ms
- Modal open/close: 300ms
- Page transitions: 400ms
- Loading states: Skeleton screens

---

## Próximos Passos

1. Criar protótipo interativo no Figma
2. Testar usabilidade das telas
3. Validar acessibilidade
4. Preparar handoff para desenvolvimento
5. Documentar edge cases

Estas telas seguem o Design System do Mercado Livre e foram otimizadas para conversão e usabilidade.
