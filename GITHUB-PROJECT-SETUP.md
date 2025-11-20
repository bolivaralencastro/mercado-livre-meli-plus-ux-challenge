# 🚀 Guia de Configuração do GitHub Project

Este documento fornece instruções passo a passo para criar e configurar o GitHub Project com a timeline completa do projeto Meli+ UX Challenge.

## 📋 Pré-requisitos

- Acesso de administrador ao repositório
- Permissão para criar GitHub Projects

---

## 🎯 Passo 1: Criar o Projeto

1. Vá para a aba **Projects** no repositório
2. Clique em **New project**
3. Escolha **Board** como template inicial
4. Nome do projeto: **Meli+ UX Challenge - Timeline de Entrega**
5. Clique em **Create project**

---

## 📊 Passo 2: Configurar Views

### View 1: Timeline (Principal)

1. Clique em **+ New view**
2. Selecione **Roadmap**
3. Nome: **Timeline**
4. Configurações:
   - **Start date field:** Start date
   - **Target date field:** Target date
   - **Zoom level:** Months
5. Salvar

### View 2: Board (Kanban)

1. Clique em **+ New view**
2. Selecione **Board**
3. Nome: **Kanban Board**
4. Configurações:
   - **Group by:** Status
5. Salvar

### View 3: Table (Detalhes)

1. Manter a view **Table** padrão
2. Adicionar campos:
   - Status
   - Priority
   - Assignees
   - Labels
   - Start date
   - Target date
   - Phase

---

## 🏷️ Passo 3: Configurar Labels

Vá em **Settings** → **Labels** e crie:

### Labels de Fase
- `fase-1-briefing` - 🟣 #9333EA
- `fase-2-pesquisa` - 🔵 #3B82F6
- `fase-3-estrategia` - 🟢 #10B981
- `fase-4-ideacao` - 🟡 #FBBF24
- `fase-5-ui-design` - 🟠 #F97316
- `fase-6-prototipo` - 🔴 #EF4444
- `fase-7-apresentacao` - 🟤 #8B5CF6
- `fase-8-entrega` - ⚫ #1F2937

### Labels de Prioridade
- `priority-high` - 🔴 #DC2626
- `priority-medium` - 🟡 #F59E0B
- `priority-low` - 🟢 #059669

### Labels de Tipo
- `documentacao` - 📚 #60A5FA
- `validacao` - ✅ #34D399
- `stakeholder-review` - 👥 #A78BFA

---

## 📅 Passo 4: Criar Custom Fields

1. Vá em **Settings** → **Custom fields**

### Field 1: Status
- **Type:** Single select
- **Options:**
  - 🔵 Planejado
  - 🟡 Em Progresso
  - 🟢 Concluído
  - ⚪ Pausado
  - 🔴 Bloqueado

### Field 2: Phase
- **Type:** Single select
- **Options:**
  - Fase 1: Briefing
  - Fase 2: Pesquisa
  - Fase 3: Estratégia
  - Fase 4: Ideação
  - Fase 5: UI Design
  - Fase 6: Protótipo
  - Fase 7: Apresentação
  - Fase 8: Entrega

### Field 3: Priority
- **Type:** Single select
- **Options:**
  - 🔴 Alta
  - 🟡 Média
  - 🟢 Baixa

### Field 4: Start Date
- **Type:** Date

### Field 5: Target Date
- **Type:** Date

### Field 6: Effort
- **Type:** Number
- **Suffix:** dias

---

## 🎯 Passo 5: Criar Milestones

Vá em **Issues** → **Milestones** → **New milestone**

### Milestone 1: Fundação
- **Title:** M1: Fundação (Semanas 1-4)
- **Due date:** 4 semanas a partir do início
- **Description:** Briefing + Pesquisa completa

### Milestone 2: Estratégia
- **Title:** M2: Estratégia (Semanas 5-6)
- **Due date:** 6 semanas a partir do início
- **Description:** Definir direção e soluções

### Milestone 3: Design
- **Title:** M3: Design (Semanas 6-10)
- **Due date:** 10 semanas a partir do início
- **Description:** Wireframes + UI Design completo

### Milestone 4: Validação
- **Title:** M4: Validação (Semanas 10-11)
- **Due date:** 11 semanas a partir do início
- **Description:** Protótipo + Testes

### Milestone 5: Entrega Final
- **Title:** M5: Entrega Final (Semana 12)
- **Due date:** 12 semanas a partir do início
- **Description:** Apresentação + Documentação

---

## 📝 Passo 6: Criar Issues a partir dos Templates

Para cada fase do projeto:

1. Vá em **Issues** → **New issue**
2. Escolha o template correspondente (ex: Fase 1 - Briefing)
3. Preencha os campos:
   - **Assignees:** Atribuir responsável
   - **Labels:** Adicionar labels da fase
   - **Milestone:** Selecionar milestone apropriado
   - **Projects:** Adicionar ao projeto criado
4. Na issue criada, preencher custom fields:
   - **Status:** Planejado (ou Concluído se já foi feito)
   - **Phase:** Fase correspondente
   - **Priority:** Alta/Média/Baixa
   - **Start Date:** Data de início
   - **Target Date:** Data alvo
   - **Effort:** Estimativa em dias

### Lista de Issues a Criar

- [ ] Fase 1: Briefing e Alinhamento
- [ ] Fase 2: Pesquisa e Descoberta
- [ ] Fase 3: Estratégia e Definição
- [ ] Fase 4: Ideação e Wireframes
- [ ] Fase 5: UI Design de Alta Fidelidade
- [ ] Fase 6: Prototipagem e Testes
- [ ] Fase 7: Apresentação aos Stakeholders
- [ ] Fase 8: Entrega e Handoff

---

## 🔄 Passo 7: Configurar Automações (Opcional)

1. Vá em **Settings** → **Workflows**
2. Ativar workflows sugeridos:
   - **Auto-add to project:** Issues criadas são automaticamente adicionadas
   - **Item closed:** Quando issue fechada, status muda para "Concluído"
   - **Item reopened:** Quando issue reaberta, status volta para "Em Progresso"

---

## 📊 Passo 8: Personalizar a Timeline View

1. Ir para a view **Timeline**
2. Configurar filtros:
   - Agrupar por: Phase
   - Ordenar por: Start Date
   - Mostrar: Todas as fases
3. Ajustar zoom para visualizar todo o projeto (12 semanas)
4. Cores das barras correspondem às labels das fases

---

## 🎨 Passo 9: Adicionar Descrição ao Projeto

Na página do projeto, clique em **...** → **Settings** → **Description**

```markdown
# Meli+ UX Challenge - Timeline de Entrega

Projeto de UX para transformar a experiência do Meli+, programa de assinatura do Mercado Livre.

## 🎯 Objetivos
- ↗️ Aumentar conversão em assinaturas em 25%
- ↗️ Reduzir cancelamentos em 30%
- ↗️ Melhorar satisfação (SUS) em 35%

## 📅 Duração
12 semanas (3 meses)

## 📚 Documentação Completa
[Ver PROJETO-TIMELINE.md](./PROJETO-TIMELINE.md)

## 🔗 Links Úteis
- [README Principal](./README.md)
- [Resumo Final](./entrega/resumo-final.md)
- [Protótipo Figma](#)
```

---

## ✅ Checklist de Configuração

Marque conforme completar:

- [ ] Projeto criado
- [ ] 3 views configuradas (Timeline, Board, Table)
- [ ] Labels criadas (fases, prioridade, tipo)
- [ ] Custom fields adicionados (Status, Phase, Priority, Dates, Effort)
- [ ] 5 milestones criados
- [ ] 8 issues criadas a partir dos templates
- [ ] Issues atribuídas e configuradas
- [ ] Automações ativadas
- [ ] Timeline view personalizada
- [ ] Descrição do projeto adicionada

---

## 🎓 Como Usar o Projeto

### Para Visualizar Progresso
1. Use a **Timeline view** para ver o cronograma completo
2. Cores indicam a fase de cada tarefa
3. Barras mostram duração e overlap de atividades

### Para Trabalhar no Dia a Dia
1. Use a **Board view** para Kanban
2. Mova cards entre colunas conforme progresso
3. Atualize status e comentários nas issues

### Para Análise Detalhada
1. Use a **Table view** para ver todos os dados
2. Filtre por fase, status, ou prioridade
3. Ordene por qualquer campo

### Para Reportar Progresso
1. Vá em **Insights** para ver métricas
2. Exporte views para apresentações
3. Compartilhe link do projeto com stakeholders

---

## 🚀 Próximos Passos

Após configurar o projeto:

1. ✅ Revisar timeline com equipe
2. ✅ Ajustar datas se necessário
3. ✅ Atribuir responsáveis
4. ✅ Começar a trabalhar nas fases
5. ✅ Atualizar progresso regularmente
6. ✅ Usar para stand-ups e reviews

---

## 📞 Suporte

Se tiver dúvidas sobre o GitHub Project:
- [GitHub Projects Documentation](https://docs.github.com/en/issues/planning-and-tracking-with-projects)
- [Roadmap View Guide](https://docs.github.com/en/issues/planning-and-tracking-with-projects/customizing-views-in-your-project/customizing-the-roadmap-layout)

---

**Última atualização:** 2025-11-20  
**Versão:** 1.0
