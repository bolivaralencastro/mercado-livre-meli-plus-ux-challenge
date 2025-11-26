export type Artigo = {
  id: string;
  slug: string;
  titulo: string;
  autor: string;
  dataPublicacao: string;
  tempoLeitura: string;
  resumo: string;
  tags: string[];
  categoria: string;
  insights: ArtigoInsight[];
  conteudo: string; // markdown ou html
};

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

export const artigos: Artigo[] = [
  {
    id: "ux-narrativa",
    slug: "ux-narrativa",
    titulo: "Senhoras, crianças e conteúdo em primeiro lugar",
    autor: "Emiliano Cosenza",
    dataPublicacao: "6 de outubro, 2016",
    tempoLeitura: "11 min",
    resumo:
      "Por que o design de experiência do usuário começa com a narrativa. Explora a ideia de sequência e como as experiências são lineares.",
    tags: ["storytelling", "content-first", "experiência do usuário", "jornada"],
    categoria: "UX & Narrativa",
    insights: [
      {
        id: "story-first",
        title: "Experiências são Lineares",
        description:
          "Tudo o que vivenciamos está ordenado segundo uma linha do tempo. Por que não pensar no design de UX como uma história?",
        application:
          "Aplicar no Meli+: Mapear a jornada do usuário desde o primeiro contato até se tornar assinante fidelizado.",
        highlightId: "highlight-story-first",
      },
      {
        id: "content-first",
        title: "Conteúdo em Primeiro Lugar",
        description:
          "Definir qual história vamos contar antes de projetar as telas ou escolher componentes.",
        application:
          "Para o Meli+: Definir primeiro o valor percebido e benefícios antes de desenhar interfaces.",
        highlightId: "highlight-content-first",
      },
      {
        id: "user-feelings",
        title: "Sentimentos dos Usuários",
        description:
          "Compreender pontos problemáticos (pain points) e humor (mood) para adaptar a mensagem.",
        application:
          "Meli+: Identificar fricções na decisão de assinar e estados emocionais durante a jornada.",
        highlightId: "highlight-user-feelings",
      },
      {
        id: "story-prototype",
        title: "Protótipo da História",
        description:
          "Simular a interação do início ao fim usando texto, focando na estrutura antes da interface.",
        application:
          "Criar roteiros de conversação para diferentes personas do Meli+ antes de wireframes.",
        highlightId: "highlight-story-prototype",
      },
      {
        id: "immersion",
        title: "Buscar Imersão",
        description:
          "Como literatura e videogames, UX deve criar imersão: atenção total, naturalidade e fluxo sem atritos.",
        application:
          "Meli+: Reduzir atritos no onboarding e criar engajamento através de benefícios tangíveis.",
        highlightId: "highlight-immersion",
      },
    ],
    conteudo: `<article>
<header class="mb-8 pb-6 border-b border-gray-200">
  <h1 class="text-3xl font-bold text-gray-900 mb-2">Senhoras, crianças e conteúdo em primeiro lugar</h1>
  <p class="text-xl text-gray-600 mb-4">Por que o design de experiência do usuário começa com a narrativa.</p>
  <div class="flex items-center space-x-4 text-sm text-gray-500">
    <span>Por Emiliano Cosenza</span>
    <span>•</span>
    <span>6 de outubro, 2016</span>
    <span>•</span>
    <span>11 min de leitura</span>
  </div>
</header>

<section class="mb-8">
  <h2 class="text-2xl font-semibold text-gray-900 mb-4">Por onde começar?</h2>
  <div class="space-y-4 text-gray-700">
    <p>Quando começamos a projetar a experiência de um produto digital, coisas estranhas acontecem. Temos as ideias, as pessoas certas e talvez até o tempo a nosso favor. Parece que não precisamos de mais nada. Mas aí surge aquela maldita pergunta: por onde começar?</p>
    <p>As discussões giram em círculos, os rostos se fecham; ninguém chega a um consenso. Uma sensação de que tudo irá para o infinito e além permeia a equipe, até que alguém diz: 'Vamos começar fazendo alguns esboços de tela. Depois, vamos analisar os casos de uso que faltam, adicionar o texto e pronto.'</p>
    <p><strong>O resultado?</strong> O produto funciona, mas só isso. A experiência do usuário é banal e passa despercebida.</p>
    <p>Há muito tempo atrás, quando eu tinha 12 anos... perguntei à minha mãe: 'Por onde eu começo?'. Ela respondeu: 'Em princípio, Emiliano'.</p>
    <p><mark id="highlight-story-first" class="bg-yellow-200 px-1 rounded"><sup class="text-xs font-bold text-gray-700">1</sup> Ao longo dos anos, compreendi que por trás dessa verdade óbvia residia a ideia de sequência. Tudo o que vivenciamos está ordenado segundo uma linha do tempo. <strong>As experiências do usuário são lineares.</strong></mark></p>
    <p><mark class="bg-yellow-200 px-1 rounded">Por que não pensar no design de experiência do usuário como uma história? No fim das contas, trata-se de projetar uma sequência de tarefas ordenadas no tempo.</mark></p>
  </div>
</section>

<section class="mb-8">
  <h2 class="text-2xl font-semibold text-gray-900 mb-4">Por que deveríamos pensar em uma história?</h2>
  
  <blockquote class="bg-gray-50 border-l-4 border-blue-500 p-4 mb-6">
    <p class="italic text-gray-700">"Eu sempre comparo isso ao desastre que seria para um filme se, na primeira vez que um produtor fala com o roteirista, ele dissesse: 'Olha, já filmamos essas cenas de perseguição... Escreva uma história digna de Oscar com esse material.'"</p>
    <cite class="text-sm text-gray-600">— Alby Ojeda (roteirista de videogames)</cite>
  </blockquote>

  <p class="text-gray-700 mb-6"><strong>A história é a arquitetura da informação</strong> da experiência que estamos projetando.</p>

  <div class="space-y-4">
    <div class="bg-blue-50 p-4 rounded-lg">
      <h3 class="font-semibold text-gray-900 mb-2">🔍 As histórias nos fazem brincar de antropólogos</h3>
      <p class="text-gray-700">Cada vez que alguém usa nosso produto, está nos contando uma história. Isso nos permite ver do que precisam, o que os motiva e como se relacionam com a marca.</p>
    </div>

    <div class="bg-green-50 p-4 rounded-lg">
      <h3 class="font-semibold text-gray-900 mb-2">🎯 As histórias simplificam até as coisas mais complexas</h3>
      <p class="text-gray-700">Lembrar de informações complexas é mais fácil quando lidas como uma história.</p>
    </div>

    <div class="bg-purple-50 p-4 rounded-lg">
      <h3 class="font-semibold text-gray-900 mb-2">🔗 As histórias tornam as conexões entre as coisas mais claras</h3>
      <p class="text-gray-700">Em uma história, as relações causais são facilmente percebidas e lembradas.</p>
    </div>

    <div class="bg-yellow-50 p-4 rounded-lg">
      <h3 class="font-semibold text-gray-900 mb-2">✨ As histórias ajudam a dar vida à experiência</h3>
      <p class="text-gray-700"><mark id="highlight-immersion" class="bg-yellow-200 px-1 rounded"><sup class="text-xs font-bold text-gray-700">5</sup> A literatura e os videogames criam imersão. Ao projetar UX, buscamos essa mesma imersão: atenção total, naturalidade e fluxo sem atritos.</mark></p>
    </div>
  </div>
</section>

<section class="mb-8">
  <h2 class="text-2xl font-semibold text-gray-900 mb-6">3 técnicas para projetar a experiência como uma história</h2>

  <div class="space-y-6">
    <div class="border border-gray-200 rounded-lg p-6">
      <h3 class="text-xl font-semibold text-gray-900 mb-3">1. Conteúdo em Primeiro Lugar</h3>
      <p class="text-gray-700 mb-4">Assim como "Mulheres e crianças primeiro" em um naufrágio, devemos definir a história antes das telas.</p>
      <p class="text-gray-700 mb-4"><mark id="highlight-content-first" class="bg-yellow-200 px-1 rounded"><sup class="text-xs font-bold text-gray-700">2</sup> <strong>Ação:</strong> Definir qual história vamos contar antes de projetar as telas ou escolher os componentes de interação.</mark></p>
      <div class="bg-gray-50 p-4 rounded">
        <p class="font-medium text-gray-900 mb-2">Benefícios:</p>
        <ul class="list-disc list-inside text-gray-700 space-y-1">
          <li>Compreender os objetivos do usuário e remover distrações</li>
          <li>Detectar rapidamente problemas de interação</li>
          <li>Explorar a UX antes de esboçar ou codificar (falhar rápido e barato)</li>
        </ul>
      </div>
    </div>

    <div class="border border-gray-200 rounded-lg p-6">
      <h3 class="text-xl font-semibold text-gray-900 mb-3">2. O briefing de conteúdo</h3>
      <p class="text-gray-700 mb-4">Um documento que faz perguntas para ajudar a tomar decisões sobre design e conteúdo.</p>
      
      <div class="space-y-4">
        <div class="bg-blue-50 p-4 rounded">
          <h4 class="font-medium text-gray-900 mb-2">Quais são os objetivos do negócio ou do produto?</h4>
          <p class="text-gray-700">Listar objetivos e problemas a resolver. Funciona como checklist.</p>
        </div>

        <div class="bg-green-50 p-4 rounded">
          <h4 class="font-medium text-gray-900 mb-2">Qual é o público-alvo?</h4>
          <p class="text-gray-700">Compreender a pessoa por trás do usuário (Arquétipo da Persona).</p>
        </div>

        <div class="bg-purple-50 p-4 rounded">
          <h4 class="font-medium text-gray-900 mb-2">Quais são os sentimentos dos usuários?</h4>
          <div class="mt-2 space-y-2">
            <p class="text-gray-700"><mark id="highlight-user-feelings" class="bg-yellow-200 px-1 rounded"><sup class="text-xs font-bold text-gray-700">3</sup> <strong>Pontos problemáticos (Pain Points):</strong> Momentos de desconforto. Ajudam a pensar nos climas e ideias a comunicar.</mark></p>
            <p class="text-gray-700"><mark class="bg-yellow-200 px-1 rounded"><strong>Humor (Mood):</strong> Adaptar a mensagem ao estado de espírito do usuário. Utilizar uma tabela de dupla entrada (palavras-chave de estado de espírito vs. promessas do produto).</mark></p>
          </div>
        </div>
      </div>
    </div>

    <div class="border border-gray-200 rounded-lg p-6">
      <h3 class="text-xl font-semibold text-gray-900 mb-3">3. Protótipo da História</h3>
      <p class="text-gray-700 mb-4"><mark id="highlight-story-prototype" class="bg-yellow-200 px-1 rounded"><sup class="text-xs font-bold text-gray-700">4</sup> Um protótipo de conteúdo (texto) que simula a interação do início ao fim.</mark></p>
      <div class="bg-gray-50 p-4 rounded mb-4">
        <p class="font-medium text-gray-900 mb-2">Benefícios:</p>
        <ul class="list-disc list-inside text-gray-700 space-y-1">
          <li>Técnica barata e de baixa fidelidade</li>
          <li>Foco na estrutura</li>
          <li>Visão completa dos casos de uso</li>
          <li>Revela pontos de contato e áreas de atrito</li>
        </ul>
      </div>

      <div class="bg-yellow-50 p-4 rounded">
        <p class="font-medium text-gray-900 mb-2">Passos para criar:</p>
        <ol class="list-decimal list-inside text-gray-700 space-y-1">
          <li>Seja claro quanto ao objetivo do usuário e ao ponto de partida (gatilho)</li>
          <li>Comece a escrever a conversa do produto com o usuário como um roteiro de teatro</li>
          <li>Amarre as mãos e não se autocensure (deixe fluir)</li>
          <li>Façam isso em equipe (brainstorming)</li>
        </ol>
      </div>
    </div>
  </div>
</section>

<section class="mb-8">
  <h2 class="text-2xl font-semibold text-gray-900 mb-4">Tudo tem um fim</h2>
  <p class="text-gray-700 mb-4">Roland Barthes afirmou que a arte de contar histórias está presente em todos os tempos e em todas as sociedades.</p>
  <p class="text-gray-700 mb-6">Se somos uma máquina biológica de contar histórias, por que não colocar seus mecanismos a serviço da experiência de nossos produtos digitais? Sem dúvida, precisamos começar pela história. <strong>Porque se criarmos uma boa história, criaremos uma boa experiência.</strong></p>
  
  <div class="bg-blue-100 border border-blue-200 rounded-lg p-4 text-center">
    <p class="text-blue-800 font-medium">👏 Se você gostou do que leu, dê um aplauso e recomende.</p>
  </div>
</section>
</article>`,
  },
  {
    id: "debito-automatico",
    slug: "debito-automatico",
    titulo: "Pesquisa Completa sobre Débito Automático no Brasil",
    autor: "Pesquisa Interna",
    dataPublicacao: "Novembro de 2025",
    tempoLeitura: "15 min",
    resumo:
      "Análise detalhada do funcionamento, regulamentação, bancos e wallets suportados, integrações via API e custos do débito automático e Pix Automático no Brasil.",
    tags: ["débito automático", "pix", "recorrência", "assinaturas", "integração", "wallets", "regulamentação"],
    categoria: "Pagamentos",
    insights: [
      {
        id: "pix-automatico",
        title: "Pix Automático como Alternativa",
        description:
          "Lançado em 2024 e obrigatório a partir de outubro de 2025, o Pix Automático é gratuito e mais ágil que o débito tradicional.",
        application:
          "Meli+: Oferecer Pix Automático como opção preferencial de pagamento recorrente, destacando zero custo e agilidade.",
        highlightId: "highlight-pix-automatico",
      },
      {
        id: "notificacao-previa",
        title: "Notificação 5 Dias Antes",
        description:
          "Bancos devem notificar clientes com até 5 dias de antecedência antes de qualquer débito automático de terceiros.",
        application:
          "Meli+: Implementar notificações proativas antes da cobrança, aumentando transparência e reduzindo cancelamentos.",
        highlightId: "highlight-notificacao",
      },
      {
        id: "wallets-digitais",
        title: "Wallets como Canal Emergente",
        description:
          "PicPay, Mercado Pago, Nubank e Inter suportam débito automático e Pix Automático com notificações e limites personalizados.",
        application:
          "Meli+: Integrar fluxo de assinatura diretamente no Mercado Pago, aproveitando base instalada e trust.",
        highlightId: "highlight-wallets",
      },
      {
        id: "custo-zero-usuario",
        title: "Custo Zero para Usuário Final",
        description:
          "O débito automático é gratuito para o consumidor final, sem taxas extras por uso.",
        application:
          "Meli+: Comunicar claramente que não há taxas extras para pagamento recorrente.",
        highlightId: "highlight-custo",
      },
      {
        id: "reducao-inadimplencia",
        title: "Redução de Inadimplência",
        description:
          "Débito automático reduz inadimplência em 30-50%, especialmente com Pix Automático.",
        application:
          "Meli+: Incentivar adesão ao débito automático com benefícios extras (desconto, cashback adicional).",
        highlightId: "highlight-inadimplencia",
      },
    ],
    conteudo: `<article>
<header class="mb-8 pb-6 border-b border-gray-200">
  <h1 class="text-3xl font-bold text-gray-900 mb-2">Pesquisa Completa sobre Débito Automático no Brasil</h1>
  <p class="text-xl text-gray-600 mb-4">Funcionamento, regulamentação, integrações e custos do débito automático e Pix Automático.</p>
  <div class="flex items-center space-x-4 text-sm text-gray-500">
    <span>Pesquisa Interna</span>
    <span>•</span>
    <span>Novembro de 2025</span>
    <span>•</span>
    <span>15 min de leitura</span>
  </div>
</header>

<section class="mb-8">
  <p class="text-gray-700 mb-4">O débito automático é uma modalidade de pagamento recorrente amplamente utilizada no Brasil para quitar contas fixas, como faturas de energia, água, telefone, tributos e mensalidades, diretamente da conta bancária do usuário, sem necessidade de emissão de boletos ou transferências manuais.</p>
  <p class="text-gray-700">Ele é regulado pelo Banco Central do Brasil (BC) e tem evoluído com a introdução do <mark id="highlight-pix-automatico" class="bg-yellow-200 px-1 rounded"><strong>Pix Automático</strong></mark>, que complementa ou substitui o débito tradicional em alguns cenários.</p>
</section>

<section class="mb-8">
  <h2 class="text-2xl font-semibold text-gray-900 mb-4">1. Funcionamento e Regulamentação</h2>
  <div class="space-y-4 text-gray-700">
    <p>O débito automático opera por meio de uma autorização prévia do titular da conta (por escrito ou eletrônico), que permite à empresa credora debitar valores diretamente da conta em data específica.</p>
    
    <div class="bg-gray-50 p-4 rounded-lg space-y-3">
      <p><strong>Autorização:</strong> O usuário cadastra o débito no app ou site do banco ou da empresa, informando dados da conta.</p>
      <p><strong>Execução:</strong> O banco do recebedor envia instrução ao banco do pagador via SPB. O débito ocorre em D+1.</p>
      <p><strong>Cancelamento:</strong> Pode ser feito a qualquer momento pelo titular, sem custos.</p>
    </div>

    <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
      <h3 class="font-semibold text-gray-900 mb-2">Novidades Regulatórias (2025)</h3>
      <ul class="list-disc list-inside space-y-2">
        <li><mark id="highlight-notificacao" class="bg-yellow-200 px-1 rounded">Bancos devem notificar clientes com até <strong>5 dias de antecedência</strong> antes de qualquer débito automático de terceiros.</mark></li>
        <li>Pix Automático (lançado em 2024) obrigatório para PJs e entidades não reguladas pelo BC a partir de outubro de 2025.</li>
        <li>Lei 15.252/2025 assegura direitos como débito automático entre instituições para quitação de empréstimos.</li>
      </ul>
    </div>
  </div>
</section>

<section class="mb-8">
  <h2 class="text-2xl font-semibold text-gray-900 mb-4">2. Bancos que Permitem Débito Automático</h2>
  <p class="text-gray-700 mb-4">Quase todos os bancos brasileiros suportam o débito automático, especialmente para contas de concessionárias e tributos.</p>
  
  <div class="overflow-x-auto">
    <table class="min-w-full border border-gray-200 rounded-lg text-sm">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-4 py-3 text-left font-semibold text-gray-900">Código</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-900">Nome do Banco</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-900">Observações</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr><td class="px-4 py-2">001</td><td class="px-4 py-2">Banco do Brasil S/A</td><td class="px-4 py-2">Suporte amplo; API para integrações.</td></tr>
        <tr><td class="px-4 py-2">033</td><td class="px-4 py-2">Santander Brasil S/A</td><td class="px-4 py-2">Débito para seguros e contas.</td></tr>
        <tr><td class="px-4 py-2">077</td><td class="px-4 py-2">Banco Inter S/A</td><td class="px-4 py-2">Digital; integra com Pix Automático.</td></tr>
        <tr><td class="px-4 py-2">104</td><td class="px-4 py-2">Caixa Econômica Federal</td><td class="px-4 py-2">Principal para tributos federais.</td></tr>
        <tr><td class="px-4 py-2">237</td><td class="px-4 py-2">Bradesco S/A</td><td class="px-4 py-2">Débito para cartões e contas.</td></tr>
        <tr><td class="px-4 py-2">260</td><td class="px-4 py-2">Nubank (Nu Pagamentos S/A)</td><td class="px-4 py-2">Suporte via app para recorrentes.</td></tr>
        <tr><td class="px-4 py-2">341</td><td class="px-4 py-2">Itaú Unibanco S/A</td><td class="px-4 py-2">Integração com wallets.</td></tr>
      </tbody>
    </table>
  </div>
</section>

<section class="mb-8">
  <h2 class="text-2xl font-semibold text-gray-900 mb-4">3. Carteiras Digitais (Wallets)</h2>
  <p class="text-gray-700 mb-4"><mark id="highlight-wallets" class="bg-yellow-200 px-1 rounded">As wallets digitais no Brasil estão migrando para o Pix Automático, mas várias suportam débito automático tradicional ou híbrido.</mark></p>
  
  <div class="grid gap-4 md:grid-cols-2">
    <div class="bg-green-50 p-4 rounded-lg">
      <h3 class="font-semibold text-gray-900 mb-2">PicPay</h3>
      <p class="text-gray-700 text-sm">Suporta débito automático para contas recorrentes, com rendimento automático (102% do CDI) e cashback.</p>
    </div>
    <div class="bg-green-50 p-4 rounded-lg">
      <h3 class="font-semibold text-gray-900 mb-2">Mercado Pago</h3>
      <p class="text-gray-700 text-sm">Débito via saldo ou conta vinculada; suporta Pix Automático para recorrentes.</p>
    </div>
    <div class="bg-green-50 p-4 rounded-lg">
      <h3 class="font-semibold text-gray-900 mb-2">Nubank</h3>
      <p class="text-gray-700 text-sm">Via app, suporta débitos automáticos e Pix Automático; cartão de débito em wallets como Apple Pay.</p>
    </div>
    <div class="bg-green-50 p-4 rounded-lg">
      <h3 class="font-semibold text-gray-900 mb-2">Banco Inter</h3>
      <p class="text-gray-700 text-sm">Integra com Apple Pay, Google Pay e Samsung Pay; Pix Automático nativo.</p>
    </div>
  </div>
</section>

<section class="mb-8">
  <h2 class="text-2xl font-semibold text-gray-900 mb-4">4. Como Funcionam as Integrações</h2>
  <p class="text-gray-700 mb-4">As integrações para débito automático são feitas via APIs de bancos ou provedores de pagamento.</p>
  
  <div class="bg-gray-50 p-4 rounded-lg mb-4">
    <h3 class="font-semibold text-gray-900 mb-2">Fluxo típico:</h3>
    <ol class="list-decimal list-inside text-gray-700 space-y-2">
      <li><strong>Autorização Inicial:</strong> Usuário aprova via consentimento (OAuth ou token) no app da empresa.</li>
      <li><strong>Geração de Instrução:</strong> A empresa envia requisição via API para o banco do pagador.</li>
      <li><strong>Processamento:</strong> O banco processa via SPB ou Pix, com confirmação em tempo real ou batch.</li>
      <li><strong>Notificações:</strong> Webhooks para atualizações (sucesso/falha).</li>
    </ol>
  </div>

  <div class="space-y-3">
    <div class="bg-blue-50 p-3 rounded"><strong>Banco do Brasil API:</strong> Permite recebimento de faturas recorrentes por débito direto.</div>
    <div class="bg-blue-50 p-3 rounded"><strong>PagBrasil API:</strong> Guia para devs; integra pagamentos recorrentes com chaves Pix.</div>
    <div class="bg-blue-50 p-3 rounded"><strong>Efí Bank API:</strong> Manual completo para escalar cobranças; inclui SDKs.</div>
  </div>
</section>

<section class="mb-8">
  <h2 class="text-2xl font-semibold text-gray-900 mb-4">5. Custos Envolvidos</h2>
  
  <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded mb-4">
    <p class="text-gray-700"><mark id="highlight-custo" class="bg-yellow-200 px-1 rounded">O débito automático é <strong>gratuito para o consumidor final</strong>, sem taxas extras por uso, desde que haja saldo suficiente.</mark></p>
  </div>

  <div class="space-y-4 text-gray-700">
    <p><strong>Para empresas/recebedores:</strong></p>
    <ul class="list-disc list-inside space-y-2">
      <li><strong>Taxas de Transação:</strong> 0,5% a 2% por débito</li>
      <li><strong>Taxas de Setup:</strong> Gratuitas na maioria, mas provedores podem cobrar assinatura mensal</li>
      <li><strong>Pix Automático:</strong> Zero custo para usuários e recebedores (via BC)</li>
    </ul>
  </div>
</section>

<section class="mb-8">
  <h2 class="text-2xl font-semibold text-gray-900 mb-4">Conclusão e Recomendações</h2>
  <p class="text-gray-700 mb-4">O débito automático no Brasil é maduro e em transição para o Pix Automático, impulsionado por regulamentações que priorizam segurança e transparência.</p>
  
  <div class="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
    <p class="text-gray-700"><mark id="highlight-inadimplencia" class="bg-yellow-200 px-1 rounded">É uma solução de baixo custo que pode <strong>reduzir inadimplência em até 30-50%</strong>, especialmente com Pix Automático.</mark></p>
  </div>
</section>
</article>`,
  },
];

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
