# Fluxos de Usuário

## Introdução
Este documento detalha os principais fluxos de usuário para a experiência do Meli+, desde a descoberta até a gestão contínua da assinatura.

---

## Fluxo 1: Descoberta e Primeira Assinatura

### Contexto
Usuário descobre o Meli+ e decide se quer assinar.

### Personas Principais
- Novo usuário Mercado Livre (comprador ocasional)
- Usuário frequente sem Meli+
- Usuário que usa concorrentes

### Pontos de Entrada
1. Banner na home do Mercado Livre
2. Modal no checkout (ao pagar frete)
3. Campanha de marketing
4. Busca orgânica
5. Recomendação personalizada

### Etapas do Fluxo

```
[Descoberta] → [Avaliação] → [Decisão] → [Assinatura] → [Confirmação] → [Onboarding]
```

#### 1. Descoberta
**Tela**: Landing Page Meli+
- Hero com proposta de valor clara
- Benefícios principais em destaque
- CTA: "Experimentar grátis por 30 dias"

**Ações do Usuário:**
- Visualiza benefícios
- Rola para ver detalhes
- Clica em "Saiba mais" ou "Experimentar"

**Dados Apresentados:**
- Frete grátis ilimitado
- Descontos exclusivos
- Sem valor mínimo de compra
- Cashback em compras

#### 2. Avaliação
**Tela**: Calculadora de Benefícios
- Mostra economia estimada baseada em histórico
- "Você economizaria R$ X/mês"
- Comparação visual: Com vs Sem Meli+

**Ações do Usuário:**
- Vê quanto economizaria
- Compara planos (se houver opções)
- Decide continuar ou sair

**Decisão:**
- ✅ Vale a pena → Continuar
- ❌ Não vale → Bookmark para depois

#### 3. Decisão
**Tela**: Seleção de Plano
- Planos disponíveis (mensal/anual)
- Destaque para melhor valor
- Período de teste gratuito
- CTA: "Começar teste grátis"

**Ações do Usuário:**
- Seleciona plano preferido
- Lê termos do teste grátis
- Clica para continuar

#### 4. Assinatura
**Tela**: Checkout Simplificado

**4.1 - Autenticação** (se não logado)
- Login com conta ML
- Ou cadastro rápido
- Dados pré-preenchidos

**4.2 - Método de Pagamento**
- Cartões já cadastrados (seleção rápida)
- Ou adicionar novo método
- Validação em tempo real
- Salvamento seguro (tokenização)

**4.3 - Revisão**
- Resumo da assinatura
- Plano selecionado
- Método de pagamento
- Quando será cobrado
- Valor total

**Ações do Usuário:**
- Seleciona/adiciona pagamento
- Revisa informações
- Confirma assinatura

#### 5. Confirmação
**Tela**: Sucesso!
- ✅ Assinatura ativada
- Resumo dos benefícios
- Próxima cobrança
- CTA: "Começar a usar"

**Ações do Usuário:**
- Vê confirmação
- Entende próximos passos
- Vai para onboarding ou home

#### 6. Onboarding
**Tela**: Tour Guiado
- 3-4 slides interativos
- Como usar cada benefício
- Dicas de economia
- CTA: "Entendi, começar"

**Ações do Usuário:**
- Passa pelos slides
- Aprende sobre benefícios
- Finaliza onboarding

### Pontos de Fricção Identificados
- ⚠️ Login pode interromper fluxo
- ⚠️ Adicionar cartão pode ser complexo
- ⚠️ Dúvidas sobre cancelamento

### Otimizações Propostas
- ✅ Permitir explorar sem login
- ✅ One-click para cartões salvos
- ✅ FAQ inline sobre cancelamento
- ✅ Progress indicator no checkout

### Métricas de Sucesso
- Taxa de conversão: >15%
- Tempo médio: <3 minutos
- Taxa de conclusão: >70%
- Ativação pós-assinatura: >80%

---

## Fluxo 2: Gestão de Meios de Pagamento

### Contexto
Assinante precisa adicionar, atualizar ou remover método de pagamento.

### Personas Principais
- Assinante ativo
- Usuário com cartão vencido
- Usuário com problema de cobrança

### Pontos de Entrada
1. Dashboard do Meli+
2. Notificação de problema
3. Email de alerta
4. Configurações da conta

### Etapas do Fluxo

```
[Acesso] → [Visualização] → [Ação] → [Validação] → [Confirmação]
```

#### 1. Acesso
**Tela**: Dashboard Meli+ → Pagamentos
- Menu de navegação
- "Meios de pagamento"
- Badge se houver problema

**Ações do Usuário:**
- Clica em "Pagamentos"
- Acessa área de gestão

#### 2. Visualização
**Tela**: Lista de Métodos
- Cartões cadastrados
- Método padrão destacado
- Status de cada método
- CTA: "+ Adicionar método"

**Informações Exibidas:**
- Últimos 4 dígitos
- Bandeira do cartão
- Validade
- Status (ativo/expirado)

**Ações do Usuário:**
- Vê métodos cadastrados
- Identifica método padrão
- Decide ação (adicionar/editar/remover)

#### 3. Ação

**3.1 - Adicionar Novo Método**
**Tela**: Formulário de Cartão
- Número do cartão
- Nome no cartão
- Validade (MM/AA)
- CVV
- Checkbox: "Tornar padrão"

**Validação em Tempo Real:**
- ✓ Formato de número
- ✓ Bandeira reconhecida
- ✓ Data válida
- ✓ CVV correto

**3.2 - Editar Método Existente**
**Tela**: Edição de Dados
- Atualizar validade
- Alterar nome
- Marcar como padrão

**3.3 - Remover Método**
**Tela**: Confirmação de Remoção
- Modal de confirmação
- Aviso se for método padrão
- CTA: "Sim, remover" / "Cancelar"

#### 4. Validação
**Processo**: Validação do Cartão
- Tokenização segura
- Verificação com gateway
- Teste de cobrança R$0,01 (opcional)

**Feedback ao Usuário:**
- Loading indicator
- "Validando cartão..."
- Mensagem de sucesso/erro

#### 5. Confirmação
**Tela**: Sucesso
- ✅ Método adicionado/atualizado
- Resumo do que foi feito
- Próxima cobrança atualizada (se aplicável)

### Cenários Especiais

#### Cenário A: Cartão Vencido
**Trigger**: Sistema detecta vencimento
**Notificação**: "Seu cartão vence em 7 dias"
**Ação**: Usuário atualiza proativamente

#### Cenário B: Cobrança Falhou
**Trigger**: Tentativa de cobrança recusada
**Notificação**: "Problema com seu pagamento"
**Ação Urgente**: Atualizar em 48h
**Consequência**: Suspensão de benefícios

#### Cenário C: Múltiplos Métodos
**Uso**: Fallback automático
**Benefício**: Reduz interrupção de serviço

### Pontos de Fricção
- ⚠️ Digitar número de cartão no mobile
- ⚠️ Medo de segurança
- ⚠️ Não saber qual método é padrão

### Otimizações Propostas
- ✅ Scan de cartão (OCR)
- ✅ Badges de segurança visíveis
- ✅ Indicação visual clara de método padrão
- ✅ Auto-save conforme digita

### Métricas de Sucesso
- Tempo para adicionar: <2 min
- Taxa de sucesso: >95%
- Abandono: <10%
- Problemas de cobrança: -30%

---

## Fluxo 3: Uso de Benefícios

### Contexto
Assinante usa benefícios do Meli+ durante compra.

### Pontos de Contato

#### 3.1 - Frete Grátis
**Tela**: Produto
- Badge "Frete grátis com Meli+"
- Destaque na página do produto

**Tela**: Carrinho
- Frete R$0 aplicado automaticamente
- Economia mostrada

**Tela**: Checkout
- Confirmação de frete grátis
- "Você economizou R$X"

#### 3.2 - Descontos Exclusivos
**Tela**: Lista de Produtos
- Tag "Desconto Meli+"
- % de desconto

**Tela**: Produto
- Preço riscado
- Preço com desconto Meli+
- Economia em destaque

#### 3.3 - Cashback
**Tela**: Pós-Compra
- "Você ganhou R$X em cashback"
- Saldo acumulado
- Como usar

### Visibilidade dos Benefícios
- 🏷️ Badges em produtos
- 💰 Contador de economia
- 🎯 Notificações de oportunidades
- 📊 Dashboard de uso

---

## Fluxo 4: Visualização de Economia

### Contexto
Assinante quer ver quanto economizou com Meli+.

### Etapas do Fluxo

```
[Dashboard] → [Visão Geral] → [Detalhes] → [Histórico]
```

#### 1. Dashboard
**Tela**: Home Meli+
- Card de economia total
- "Você economizou R$X"
- Comparação com valor pago
- CTA: "Ver detalhes"

#### 2. Visão Geral
**Tela**: Economia Detalhada
- Breakdown por categoria:
  - 🚚 Frete: R$X
  - 🏷️ Descontos: R$X
  - 💰 Cashback: R$X
- Gráfico mensal
- ROI da assinatura

#### 3. Detalhes
**Tela**: Por Categoria
- Lista de compras
- Economia por item
- Data da compra
- Link para pedido

#### 4. Histórico
**Tela**: Timeline
- Evolução mensal
- Marcos atingidos
- Economia acumulada
- Projeção futura

### Gamificação
- 🏆 Marcos de economia
- 🎖️ Badges desbloqueados
- 📈 Nível de uso
- 🎁 Recompensas

---

## Fluxo 5: Renovação e Retenção

### Contexto
Assinatura próxima da renovação.

### Cenários

#### Cenário A: Renovação Tranquila
**Antes da Renovação:**
- Email 7 dias antes
- Notificação in-app
- Lembrete do valor

**No Dia:**
- Cobrança bem-sucedida
- Notificação de confirmação
- "Renovado por mais um mês"

**Pós-Renovação:**
- Agradecimento
- Resumo de benefícios usados
- Incentivo para continuar usando

#### Cenário B: Tentativa de Cancelamento
**Trigger**: Usuário clica "Cancelar"

**Tela**: Feedback
- "Por que quer cancelar?"
- Opções de motivo
- Campo aberto

**Tela**: Retenção
- Mostrar economia gerada
- Oferecer pausa de 1 mês (se aplicável)
- Desconto temporário (se aplicável)
- CTA: "Dar mais uma chance"

**Se Confirma Cancelamento:**
- Processo simples e rápido
- "Tem certeza?"
- Confirmação final
- "Cancelado com sucesso"
- Email de confirmação
- Benefícios até o fim do período

#### Cenário C: Problema de Pagamento
**Tentativa 1**: Automática
**Tentativa 2**: 24h depois
**Notificação**: "Precisamos atualizar seu pagamento"
**Prazo**: 48h para regularizar
**Consequência**: Suspensão de benefícios
**Reversão**: Imediata ao regularizar

---

## Fluxo 6: Suporte e Dúvidas

### Pontos de Ajuda

#### FAQ Integrado
- Perguntas frequentes
- Busca inteligente
- Artigos relacionados

#### Chat de Suporte
- Bot inicial
- Escalação para humano
- Contexto preservado

#### Central de Ajuda
- Tutoriais em vídeo
- Guias passo a passo
- Troubleshooting

### Tópicos Mais Buscados
1. Como cancelar?
2. Quando serei cobrado?
3. Como usar o frete grátis?
4. Como atualizar cartão?
5. Onde vejo minha economia?

---

## Princípios de Design dos Fluxos

### 1. Clareza
- Informações claras em cada etapa
- Sem jargões ou termos técnicos
- Comunicação direta

### 2. Simplicidade
- Mínimo de passos necessários
- Um objetivo por tela
- Ações óbvias

### 3. Feedback
- Confirmação de ações
- Estados de loading
- Mensagens de erro claras

### 4. Prevenção
- Validação em tempo real
- Avisos proativos
- Confirmação de ações críticas

### 5. Flexibilidade
- Múltiplos pontos de entrada
- Voltar/avançar fácil
- Salvar progresso

### 6. Consistência
- Padrões visuais uniformes
- Linguagem consistente
- Comportamentos previsíveis

---

## Mapeamento de Estados

### Estados do Usuário
1. **Visitante**: Não logado, explorando
2. **Cadastrado**: Tem conta ML, sem Meli+
3. **Trial**: Em período de teste
4. **Ativo**: Assinante pagante ativo
5. **Problema**: Assinante com issue de pagamento
6. **Cancelado**: Ex-assinante
7. **Pausado**: Assinatura em pausa (se aplicável)

### Estados da Assinatura
- ✅ Ativa e válida
- ⏰ Próxima à renovação
- ⚠️ Problema de pagamento
- ❌ Cancelada
- 🔄 Em processamento

### Estados do Pagamento
- ✅ Válido e ativo
- ⏰ Próximo ao vencimento
- ⚠️ Expirado
- ❌ Inválido/recusado

---

## Próximos Passos

1. **Validar Fluxos**: Testes com usuários reais
2. **Criar Wireframes**: Representação visual
3. **Prototipar**: Versões interativas
4. **Testar**: Usabilidade e métricas
5. **Iterar**: Refinamento contínuo

Estes fluxos serão a base para criação das telas de alta fidelidade e do protótipo interativo.
