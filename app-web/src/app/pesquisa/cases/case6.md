📘 Case UX – Redesenho do Administrador de Mercado Crédito

Resumo, extração de conteúdo e análise das interfaces

## 1. Introdução
O que é Mercado Crédito?

Mercado Crédito é um produto que oferece diferentes tipos de financiamento dependendo da necessidade e condição da pessoa usuária (vendedores, compradores etc.).
Nasce com o objetivo de ampliar a inclusão financeira na América Latina.

A partir do Administrador de Créditos, a pessoa usuária navega por diferentes etapas do journey:

Aquisição

Ativação

Engajamento

Recorrência / Cobrança

Revenue

O Administrador é usado principalmente para gerenciar as linhas de crédito ativas.

## 2. Contexto — O Administrador “Frankenstein”

Com o surgimento de novas linhas de crédito com características distintas e demandas vindas de Marketing, Credenciais e Produto, a arquitetura do Administrador foi se deteriorando.

Problemas identificados:

Inconsistências de storytelling e fluxo.

Aumento da carga cognitiva.

Perda de clareza na priorização das informações.

Aumento nas consultas ao time de Suporte/CX.

Dificuldades para rastrear originação e aquisição dos produtos.

Telas diferentes demais entre si, sem padrão (ex.: sem ofertas, com ofertas, produtos ativos, produtos vencidos etc.).

## 3. Desafio
Objetivo principal:

Criar uma experiência escalável, modular e adaptável às futuras linhas de crédito.

Diretrizes do redesign:

Pensar modularmente, permitindo adicionar/remover produtos sem quebrar o fluxo.

Projetar a partir do funil completo:

Aquisição

Ativação

Cobrança

Engajamento

Reduzir carga cognitiva, deixando a navegação intuitiva e autodidática.

Criar uma experiência contextual, não reativa.

Reduzir contato com CX sobre dúvidas básicas (como pagar, quando vence etc.).

OKRs do projeto:

Reduzir o contact rate para CX.

Aumentar aquisição.

Aumentar ativação.

Melhorar cobrança (reduzir casos de mora tardia).

## 4. Processo de Redesign
A) 4 Princípios de Construção dos Componentes
1. Agrupabilidade (Informação organizada)

Organizar dados por afinidade, facilitando o escaneamento e mantendo coerência com o storytelling de cada estágio.

2. Previsibilidade (Informação suficiente)

Cada componente deve trazer apenas o necessário para que a pessoa usuária compreenda a situação e possa agir.

3. Relevância (Informação progressiva)

Priorizar as ações mais importantes segundo o estado do administrador.

4. Personalização (Informação relevante)

Customizar a experiência segundo o estágio, comportamento e necessidades da pessoa usuária.

B) Mapeamento do Administrador por momento do journey
Jornada	Estado
Aquisição	Empty State / Sem ofertas / Com ofertas
Ativação	Enrollment / Ofertas + Upsell
Engajamento / Recorrência	FTU / Recorrente / Em dia
Cobrança	Por vencer / Vencido
C) Storytelling — O “Viagem da Juana”

O Administrador foi tratado como um videogame:

Início: Juana descobre Mercado Crédito.

Nível 0: Empty state.

Nível 1: Com oferta.

Nível 2: Cobrança em dia / para vencer.

Nível 3: Ofertas + produtos ativos.

Nível 4: Cobrança vencida (modo “expert”).

Cada estágio desbloqueia novos blocos, funcionalidades ou mensagens.

D) Wireframe modular — Blocos ativados conforme o estado

Blocos criados:

Comunicações extraordinárias
Para situações específicas (regulações, atrasos etc.)

Originação
Bloco educacional quando o usuário entra pela primeira vez.

Cobrança
Aparece quando há crédito originado.

Ajuda contextual
Baseada no estado atual (ex.: como pagar, por que foi cobrado, o que significa cada valor etc.)

Cross-sell
Quando há oportunidades externas (ex.: seguros, vantagens etc.)

Créditos finalizados
Quando um produto foi pago integralmente.

## 5. Antes e Depois
Principais melhorias de UI e UX:
📌 Clareza nas ofertas

Nome, valor, condição da linha de crédito.

Modal com detalhes organizados.

CTA claro (Simular / Pagar / Detalhar).

📌 Mensagens extraordinárias mais visíveis

Agora têm hierarquia definida.

Aparecem no momento correto do fluxo.

📌 Ajuda contextual incorporada

3 principais dúvidas do usuário sempre visíveis no estado de cobrança:

Como pagar minhas parcelas?

O que acontece se eu atrasar?

Quando vence minha próxima fatura?

📌 Acesso rápido aos créditos finalizados

Reunidos em um único bloco de consulta.

📌 Maior ritmo na navegação

Layout mais limpo.

Cards reorganizados.

Hierarquia consistente entre telas.

## 6. Validação com Usuários

Foram testadas 12 pessoas usuárias em 2 países.

Resultados:

11/12 entenderam corretamente o que é Mercado Crédito e como solicitá-lo.

12/12 compreenderam a lógica das cards de cobrança e conseguiram:

Navegar até o detalhe da dívida.

Entender o pagamento progressivo.

Realizar simulação ou cancelamento antecipado.

## 7. Créditos da Equipe
UX

Débora Lambrechts, Marcela Sosa Palacios, Ruth Barinboim, Chiro Fernandez
Colaboradores: Pablo Piccolotto, Aime Gomez Molina, Leonardo Fontani, Pablo Sanchez Olguin, Santiago Rivero, Patricia Alva Silva, Irving H. Sanchez, Claudia Kihabet, Lucas Cimó, Bruno Ceriani, Jorge Campos Quiros

IT

Mauro Michelini, Valentín Orfila, Sebastian Henzen, Diego Marchetti, Joseph Ramírez, Ezequiel Soler, Alejo Echeguia
Colaboradores: Ivan Ascierto, Mario Pozzo, Jorge Luis Castro Felix, Mauricio Gigena, Diego Bersano, Matias Alaniz

Produto

Guillermina De San Martín, Josefina Saenz, Victoria Roshchupinka, Yanina Navarro, Sabrina Barrera, Juan Manuel Murcia Levy, Matias Alvarez, Ramiro Donis

🧠 Análise das Interfaces Criadas

A seguir, uma análise crítica do redesign:

1. Arquitetura mais modular e escalável

Antes, cada tela parecia independente e inconsistente.
Após o redesign:

Cada bloco tem função clara.

A estrutura suporta novos produtos sem recomeçar do zero.

A interface se adapta ao estágio do usuário (contextual).

⭐ Acerto: Modularidade como base do sistema.
⚠️ Possível melhoria: Um “design token” visual unificando a identidade ainda mais.

2. Hierarquia visual marcante e clara

Melhorias observadas:

Títulos de seção bem definidos.

Cards com spacing e ícones consistentes.

Uso mais eficiente do espaço para leitura rápida.

⭐ Acerto: Diminui a carga cognitiva.

3. Navegação mais previsível

Antes, cada estado tinha uma tela totalmente diferente.
Agora:

O esqueleto é sempre o mesmo.

Apenas os blocos ativam/desativam conforme a jornada.

⭐ Acerto: Previsibilidade melhora confiança da pessoa usuária.

4. Ajuda contextual integrada ao fluxo

Em vez de um FAQ escondido, o redesign trouxe:

Perguntas frequentes alinhadas ao momento.

Acesso rápido e sempre disponível.

⭐ Acerto: Reduz contato com CX significativamente.

5. Storytelling aplicado de forma didática

Pensar o Administrador como “videogame” (níveis) permite:

Comunicar estados de forma simples.

Guiar o usuário na progressão do crédito.

Trazer sensação de conquista e controle.

⭐ Acerto: Conecta UX com psicologia comportamental.

6. Refinamentos visuais que aumentam confiança

Blue primário consistente com marca Mercado Pago.

Cartões limpos e arejados.

Ilustrações no estilo MELI, reforçando empatia.

⭐ Acerto: Transmite segurança para um produto financeiro.
