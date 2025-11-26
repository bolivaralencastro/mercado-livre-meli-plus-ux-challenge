### Pesquisa Completa sobre Débito Automático no Brasil

O débito automático é uma modalidade de pagamento recorrente amplamente utilizada no Brasil para quitar contas fixas, como faturas de energia, água, telefone, tributos e mensalidades, diretamente da conta bancária do usuário, sem necessidade de emissão de boletos ou transferências manuais. Ele é regulado pelo Banco Central do Brasil (BC) e tem evoluído com a introdução do Pix Automático, que complementa ou substitui o débito tradicional em alguns cenários. A seguir, apresento uma análise detalhada baseada em fontes oficiais e atualizadas até novembro de 2025, cobrindo funcionamento, bancos e wallets suportados, integrações e custos.

#### 1. Funcionamento e Regulamentação
O débito automático opera por meio de uma autorização prévia do titular da conta (por escrito ou eletrônico), que permite à empresa credora (ex.: concessionária) debitar valores diretamente da conta em data específica. O processo envolve:
- **Autorização**: O usuário cadastra o débito no app ou site do banco ou da empresa, informando dados da conta (agência, conta, CPF/CNPJ).
- **Execução**: O banco do recebedor envia instrução ao banco do pagador via Sistema de Pagamentos Brasileiro (SPB). O débito ocorre em D+1 (próximo dia útil) ao vencimento.
- **Cancelamento**: Pode ser feito a qualquer momento pelo titular, sem custos, via app do banco ou central de atendimento.
- **Novidades Regulatórias (2025)**: 
  - Bancos devem notificar clientes com até 5 dias de antecedência antes de qualquer débito automático de terceiros. Isso aumenta a transparência e permite cancelamento prévio.
  - Pix Automático (lançado em 2024 e obrigatório para PJs e entidades não reguladas pelo BC a partir de outubro de 2025) permite débitos programados via Pix, com limite máximo definido pelo usuário (ex.: R$ 1.000/mês) e notificações prévias.
  - Lei 15.252/2025 assegura direitos como débito automático entre instituições para quitação de empréstimos.
  - Empresas devem manter convênio formal com o banco do cliente e obter autorização explícita.

Essas regras visam reduzir inadimplência e fraudes, com foco em autonomia do usuário. O Pix Automático é gratuito e mais ágil que o débito tradicional, mas o último ainda predomina para contas antigas.

#### 2. Bancos que Permitem Débito Automático
Quase todos os bancos brasileiros suportam o débito automático, especialmente para contas de concessionárias e tributos. Abaixo, uma tabela com os principais, baseada em listas oficiais de convênios (ex.: Receita Federal, prefeituras e bancos). O cadastro é feito via app ou agência.

| Código do Banco | Nome do Banco                  | Observações |
|-----------------|--------------------------------|-------------|
| 001            | Banco do Brasil S/A            | Suporte amplo; API para integrações. |
| 003            | Banco da Amazônia S/A          | Foco em regiões Norte. |
| 004            | Banco do Nordeste S/A          | Convênios regionais. |
| 021            | Banco Banestes S/A             | ES e região Sudeste. |
| 033            | Santander Brasil S/A           | Débito para seguros e contas. |
| 077            | Banco Inter S/A                | Digital; integra com Pix Automático. |
| 104            | Caixa Econômica Federal        | Principal para tributos federais. |
| 105            | Banco do Estado do Piauí S/A   | Regional. |
| 136            | Banco Bandepe S/A              | PE. |
| 237            | Bradesco S/A                   | Débito para cartões e contas. |
| 260            | Nubank (Nu Pagamentos S/A)     | Suporte via app para recorrentes. |
| 341            | Itaú Unibanco S/A              | Integração com wallets. |
| 389            | Banco Mercantil do Brasil S/A  | Convênios para energia/saneamento. |
| 637            | Banco Sicoob S/A               | Cooperativas. |
| 748            | Banco Cooperativo Sicredi S/A  | Cooperativas. |

*Fonte: Listas de convênios da Receita Federal e prefeituras (ex.: Salvador, SP, Curitiba).* Outros como BTG Pactual, C6 Bank e PagBank também suportam via apps digitais.

#### 3. Carteiras Digitais (Wallets) que Permitem Débito Automático
As wallets digitais no Brasil estão migrando para o Pix Automático, mas várias suportam débito automático tradicional ou híbrido (via cartão de débito vinculado). Elas facilitam pagamentos recorrentes com notificações e limites personalizados. Principais opções:

- **PicPay**: Suporta débito automático para contas recorrentes, com rendimento automático (102% do CDI) e cashback. Integra com Pix Automático para assinaturas.
- **Itaú Pagamentos Digitais**: Wallet com cartão virtual de débito; permite agendamento automático de débitos em contas Itaú.
- **Mercado Pago**: Débito via saldo ou conta vinculada; suporta Pix Automático para recorrentes, com notificações.
- **PagBank (PagSeguro)**: Carteira com débito automático para boletos e faturas; API para integrações.
- **Nubank**: Via app, suporta débitos automáticos e Pix Automático; cartão de débito em wallets como Apple Pay.
- **Banco Inter**: Integra com Apple Pay, Google Pay e Samsung Pay para débitos por aproximação; Pix Automático nativo.
- **C6 Bank**: Conta digital com débito automático; suporta recorrentes via app.
- **BTG Pactual Banking**: Carteira com cartão de débito para pagamentos automáticos.
- **Unicred Visa**: Função débito em wallets digitais para transações recorrentes.

O Pix Automático é o destaque nas wallets, permitindo débitos programados sem saldo prévio (usa limite do Pix). Ex.: No PicPay, o usuário define o valor máximo mensal para evitar surpresas.

#### 4. Como Funcionam as Integrações
As integrações para débito automático são feitas via APIs de bancos ou provedores de pagamento, permitindo que empresas (ex.: e-commerces, SaaS) configurem cobranças recorrentes de forma automatizada. O fluxo típico:
1. **Autorização Inicial**: Usuário aprova via consentimento (OAuth ou token) no app da empresa, gerando um "mandato" de débito.
2. **Geração de Instrução**: A empresa envia requisição via API para o banco do pagador, com dados do débito (valor, data, conta).
3. **Processamento**: O banco processa via SPB ou Pix (para Automático), com confirmação em tempo real ou batch (D+1).
4. **Notificações**: Webhooks para atualizações (sucesso/falha).

**Principais APIs e Ferramentas**:
- **Banco do Brasil API Débito Automático**: Permite recebimento de faturas recorrentes por débito direto em CC/CP. Integração via portal Developers BB; suporta OAuth 2.0 e JSON.
- **PagBrasil API Pix Automático**: Guia para devs; integra pagamentos recorrentes com chaves Pix. Fluxo: Criação de mandato → Agendamento → Execução automática.
- **Stripe Direct Debit**: Suporta ACH-like para Brasil; integra com e-commerces para débitos automáticos, com retries.
- **MakeValue API Pagamentos**: Conecta ERPs a bancos para TED/Pix/débitos; suporta convênios.
- **Efí Bank API Pix Automático**: Manual completo para escalar cobranças; inclui SDKs para linguagens como Python/Node.js.
- **Outras**: APIs de Itaú, Bradesco e Nubank via Open Banking (em fase avançada em 2025); Z-API para WhatsApp-integrated payments.

Integrações exigem homologação com o BC para conformidade (ex.: LGPD para dados). Tempo médio: 2-4 semanas para setup.

#### 5. Custos Envolvidos
O débito automático é gratuito para o **consumidor final**, sem taxas extras por uso, desde que haja saldo suficiente (evita multas de atraso). Para **empresas/recebedores**, os custos variam por banco/processador e volume:
- **Taxas de Transação**: 0,5% a 2% por débito (ex.: Stripe cobra ~1,5% + R$ 0,39; PagBrasil ~1% para Pix Automático).
- **Taxas de Setup/Integração**: Gratuitas na maioria (ex.: BB API sem custo inicial), mas provedores como MakeValue cobram assinatura mensal (R$ 99+).
- **Manutenção**: Custos por falha/retry (~R$ 0,50 por tentativa) ou convênios (~R$ 0,20 por transação em bancos como Bradesco).
- **Pix Automático**: Zero custo para usuários e recebedores (via BC), mas wallets podem cobrar por features premium (ex.: PicPay 1% em cashback reverso).
- **Exceções**: Em casos de erro (falta de saldo), bancos podem cobrar taxa de rejeição (R$ 5-10), mas isso é raro com notificações.

Em resumo, é uma solução de baixo custo para reduzir inadimplência em até 30-50%, especialmente com Pix Automático.

#### Conclusão e Recomendações
O débito automático no Brasil é maduro e em transição para o Pix Automático, impulsionado por regulamentações que priorizam segurança e transparência. Bancos tradicionais dominam, mas wallets como PicPay e Nubank oferecem mais agilidade para usuários digitais. Para integrações, comece com APIs de BB ou PagBrasil se for recorrente. Custos são mínimos, focando em eficiência. Se precisar de guias específicos (ex.: código de integração) ou foco em um banco/wallet, avise para aprofundar! Fontes incluem sites do BC, Febraban e portais de desenvolvedores.