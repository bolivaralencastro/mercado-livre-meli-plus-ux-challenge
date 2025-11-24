"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const insights = [
  {
    id: "story-first",
    title: "Experiências são Lineares",
    description: "Tudo o que vivenciamos está ordenado segundo uma linha do tempo. Por que não pensar no design de UX como uma história?",
    application: "Aplicar no Meli+: Mapear a jornada do usuário desde o primeiro contato até se tornar assinante fidelizado.",
  },
  {
    id: "content-first", 
    title: "Conteúdo em Primeiro Lugar",
    description: "Definir qual história vamos contar antes de projetar as telas ou escolher componentes.",
    application: "Para o Meli+: Definir primeiro o valor percebido e benefícios antes de desenhar interfaces.",
  },
  {
    id: "user-feelings",
    title: "Sentimentos dos Usuários",
    description: "Compreender pontos problemáticos (pain points) e humor (mood) para adaptar a mensagem.",
    application: "Meli+: Identificar fricções na decisão de assinar e estados emocionais durante a jornada.",
  },
  {
    id: "story-prototype",
    title: "Protótipo da História",
    description: "Simular a interação do início ao fim usando texto, focando na estrutura antes da interface.",
    application: "Criar roteiros de conversação para diferentes personas do Meli+ antes de wireframes.",
  },
  {
    id: "immersion",
    title: "Buscar Imersão",
    description: "Como literatura e videogames, UX deve criar imersão: atenção total, naturalidade e fluxo sem atritos.",
    application: "Meli+: Reduzir atritos no onboarding e criar engajamento através de benefícios tangíveis.",
  }
];

export default function ArtigoPage() {
  const router = useRouter();
  const [selectedInsight, setSelectedInsight] = useState("story-first");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const scrollToInsight = (insightId: string) => {
    setSelectedInsight(insightId);
    const element = document.getElementById(`highlight-${insightId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100">
      {/* Header fixo no topo */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={() => router.push("/pesquisa")}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 w-10 h-10 text-gray-700 transition hover:bg-gray-50"
            aria-label="Voltar"
          >
            <span aria-hidden className="text-xl">←</span>
          </button>
          
          <div className="relative">
            <h1 className="text-2xl font-medium text-gray-900">
              Artigo de Referência
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-600">
            Emiliano Cosenza • 11 min
          </span>
        </div>
      </header>

      {/* Content area com grid de 2 colunas - abaixo do header */}
      <div className="flex-1 grid grid-cols-12 pt-[73px] overflow-hidden min-h-0">
        {/* Coluna Esquerda - Insights - 4 colunas */}
        <div className={`col-span-4 h-full overflow-y-auto no-scrollbar bg-white border-r border-gray-200 p-8 ${isFullscreen ? 'hidden' : ''}`}>
          <div className="prose max-w-none">
            <h2 className="text-xl font-bold text-gray-900 mb-4">💡 Insights para o Meli+</h2>
            
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                Principais aprendizados do artigo que podemos aplicar no nosso desafio de UX para o Meli+.
              </p>
            </div>

            <div className="space-y-4">
              {insights.map((insight) => (
                <div
                  key={insight.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedInsight === insight.id
                      ? 'border-gray-400 bg-gray-100'
                      : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                  }`}
                  onClick={() => scrollToInsight(insight.id)}
                >
                  <h3 className="font-semibold text-gray-900 mb-2 text-base">
                    {insight.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {insight.description}
                  </p>
                  {selectedInsight === insight.id && (
                    <div className="bg-white p-3 rounded border-l-4 border-blue-500 mt-3">
                      <p className="text-sm font-medium text-blue-900">
                        💼 Aplicação no Meli+:
                      </p>
                      <p className="text-sm text-blue-700 mt-1">
                        {insight.application}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Coluna Direita - Artigo Completo - 8 colunas */}
        <div className={`${isFullscreen ? 'col-span-12' : 'col-span-8'} h-full overflow-y-auto no-scrollbar bg-gray-100 p-8`}>
          <div className="flex flex-col gap-6 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 relative">
              {/* Botão de tela cheia */}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="absolute top-4 right-4 inline-flex items-center justify-center rounded-lg border border-gray-300 w-10 h-10 text-gray-700 transition hover:bg-gray-50"
                aria-label={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
                title={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
              >
                {isFullscreen ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                )}
              </button>

              <div className="prose max-w-none">
                
                {/* Header do artigo */}
                <div className="mb-8 pb-6 border-b border-gray-200">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Senhoras, crianças e conteúdo em primeiro lugar
                  </h1>
                  <p className="text-xl text-gray-600 mb-4">
                    Por que o design de experiência do usuário começa com a narrativa.
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Por Emiliano Cosenza</span>
                    <span>•</span>
                    <span>6 de outubro, 2016</span>
                    <span>•</span>
                    <span>11 min de leitura</span>
                  </div>
                </div>

                {/* Introdução */}
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Por onde começar?
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      Quando começamos a projetar a experiência de um produto digital, coisas estranhas acontecem. 
                      Temos as ideias, as pessoas certas e talvez até o tempo a nosso favor. Parece que não precisamos 
                      de mais nada. Mas aí surge aquela maldita pergunta: por onde começar?
                    </p>
                    <p>
                      As discussões giram em círculos, os rostos se fecham; ninguém chega a um consenso. Uma sensação 
                      de que tudo irá para o infinito e além permeia a equipe, até que alguém diz: &lsquo;Vamos começar 
                      fazendo alguns esboços de tela. Depois, vamos analisar os casos de uso que faltam, adicionar o 
                      texto e pronto.&rsquo;
                    </p>
                    <p>
                      <strong>O resultado?</strong> O produto funciona, mas só isso. A experiência do usuário é 
                      banal e passa despercebida.
                    </p>
                    <p>
                      Há muito tempo atrás, quando eu tinha 12 anos... perguntei à minha mãe: &lsquo;Por onde eu começo?&rsquo;. 
                      Ela respondeu: &lsquo;Em princípio, Emiliano&rsquo;.
                    </p>
                    <p>
                      <mark id="highlight-story-first" className="bg-yellow-200 px-1 rounded">
                        <sup className="text-xs font-bold text-gray-700">1</sup> Ao longo dos anos, compreendi que por trás dessa verdade óbvia residia a ideia de sequência. 
                        Tudo o que vivenciamos está ordenado segundo uma linha do tempo. <strong>As experiências do 
                        usuário são lineares.</strong>
                      </mark>
                    </p>
                    <p>
                      <mark className="bg-yellow-200 px-1 rounded">
                        Por que não pensar no design de experiência do usuário como uma história? No fim das contas, 
                        trata-se de projetar uma sequência de tarefas ordenadas no tempo.
                      </mark>
                    </p>
                  </div>
                </section>

                {/* Por que uma história */}
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Por que deveríamos pensar em uma história?
                  </h2>
                  
                  <blockquote className="bg-gray-50 border-l-4 border-blue-500 p-4 mb-6">
                    <p className="italic text-gray-700">
                      &ldquo;Eu sempre comparo isso ao desastre que seria para um filme se, na primeira vez que um 
                      produtor fala com o roteirista, ele dissesse: &lsquo;Olha, já filmamos essas cenas de perseguição... 
                      Escreva uma história digna de Oscar com esse material.&rsquo;&rdquo;
                    </p>
                    <cite className="text-sm text-gray-600">— Alby Ojeda (roteirista de videogames)</cite>
                  </blockquote>

                  <p className="text-gray-700 mb-6">
                    <strong>A história é a arquitetura da informação</strong> da experiência que estamos projetando.
                  </p>

                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        🔍 As histórias nos fazem brincar de antropólogos
                      </h3>
                      <p className="text-gray-700">
                        Cada vez que alguém usa nosso produto, está nos contando uma história. Isso nos permite 
                        ver do que precisam, o que os motiva e como se relacionam com a marca.
                      </p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        🎯 As histórias simplificam até as coisas mais complexas
                      </h3>
                      <p className="text-gray-700">
                        Lembrar de informações complexas é mais fácil quando lidas como uma história.
                      </p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        🔗 As histórias tornam as conexões entre as coisas mais claras
                      </h3>
                      <p className="text-gray-700">
                        Em uma história, as relações causais são facilmente percebidas e lembradas.
                      </p>
                    </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      ✨ As histórias ajudam a dar vida à experiência
                    </h3>
                    <p className="text-gray-700">
                      <mark id="highlight-immersion" className="bg-yellow-200 px-1 rounded">
                        <sup className="text-xs font-bold text-gray-700">5</sup> A literatura e os videogames criam imersão. Ao projetar UX, buscamos essa mesma imersão: 
                        atenção total, naturalidade e fluxo sem atritos.
                      </mark>
                    </p>
                  </div>
                  </div>
                </section>

                {/* 3 Técnicas */}
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    3 técnicas para projetar a experiência como uma história
                  </h2>

                  <div className="space-y-6">
                    {/* Técnica 1 */}
                    <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      1. Conteúdo em Primeiro Lugar
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Assim como &ldquo;Mulheres e crianças primeiro&rdquo; em um naufrágio, devemos definir a história 
                      antes das telas.
                    </p>
                    <p className="text-gray-700 mb-4">
                      <mark id="highlight-content-first" className="bg-yellow-200 px-1 rounded">
                        <sup className="text-xs font-bold text-gray-700">2</sup> <strong>Ação:</strong> Definir qual história vamos contar antes de projetar as telas 
                        ou escolher os componentes de interação.
                      </mark>
                    </p>
                      <div className="bg-gray-50 p-4 rounded">
                        <p className="font-medium text-gray-900 mb-2">Benefícios:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          <li>Compreender os objetivos do usuário e remover distrações</li>
                          <li>Detectar rapidamente problemas de interação</li>
                          <li>Explorar a UX antes de esboçar ou codificar (falhar rápido e barato)</li>
                        </ul>
                      </div>
                    </div>

                    {/* Técnica 2 */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        2. O briefing de conteúdo
                      </h3>
                      <p className="text-gray-700 mb-4">
                        Um documento que faz perguntas para ajudar a tomar decisões sobre design e conteúdo.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded">
                          <h4 className="font-medium text-gray-900 mb-2">
                            Quais são os objetivos do negócio ou do produto?
                          </h4>
                          <p className="text-gray-700">
                            Listar objetivos e problemas a resolver. Funciona como checklist.
                          </p>
                        </div>

                        <div className="bg-green-50 p-4 rounded">
                          <h4 className="font-medium text-gray-900 mb-2">
                            Qual é o público-alvo?
                          </h4>
                          <p className="text-gray-700">
                            Compreender a pessoa por trás do usuário (Arquétipo da Persona).
                          </p>
                        </div>

                        <div className="bg-purple-50 p-4 rounded">
                          <h4 className="font-medium text-gray-900 mb-2">
                            Quais são os sentimentos dos usuários?
                          </h4>
                          <div className="mt-2 space-y-2">
                            <p className="text-gray-700">
                              <mark id="highlight-user-feelings" className="bg-yellow-200 px-1 rounded">
                                <sup className="text-xs font-bold text-gray-700">3</sup> <strong>Pontos problemáticos (Pain Points):</strong> Momentos de desconforto. 
                                Ajudam a pensar nos climas e ideias a comunicar.
                              </mark>
                            </p>
                            <p className="text-gray-700">
                              <mark className="bg-yellow-200 px-1 rounded">
                                <strong>Humor (Mood):</strong> Adaptar a mensagem ao estado de espírito do usuário. 
                                Utilizar uma tabela de dupla entrada (palavras-chave de estado de espírito vs. 
                                promessas do produto).
                              </mark>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Técnica 3 */}
                    <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      3. Protótipo da História
                    </h3>
                    <p className="text-gray-700 mb-4">
                      <mark id="highlight-story-prototype" className="bg-yellow-200 px-1 rounded">
                        <sup className="text-xs font-bold text-gray-700">4</sup> Um protótipo de conteúdo (texto) que simula a interação do início ao fim.
                      </mark>
                    </p>                      <div className="bg-gray-50 p-4 rounded mb-4">
                        <p className="font-medium text-gray-900 mb-2">Benefícios:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          <li>Técnica barata e de baixa fidelidade</li>
                          <li>Foco na estrutura</li>
                          <li>Visão completa dos casos de uso</li>
                          <li>Revela pontos de contato e áreas de atrito</li>
                        </ul>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded">
                        <p className="font-medium text-gray-900 mb-2">Passos para criar:</p>
                        <ol className="list-decimal list-inside text-gray-700 space-y-1">
                          <li>Seja claro quanto ao objetivo do usuário e ao ponto de partida (gatilho)</li>
                          <li>Comece a escrever a conversa do produto com o usuário como um roteiro de teatro</li>
                          <li>Amarre as mãos e não se autocensure (deixe fluir)</li>
                          <li>Façam isso em equipe (brainstorming)</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Conclusão */}
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Tudo tem um fim
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Roland Barthes afirmou que a arte de contar histórias está presente em todos os 
                    tempos e em todas as sociedades.
                  </p>
                  <p className="text-gray-700 mb-6">
                    Se somos uma máquina biológica de contar histórias, por que não colocar seus mecanismos 
                    a serviço da experiência de nossos produtos digitais? Sem dúvida, precisamos começar pela 
                    história. <strong>Porque se criarmos uma boa história, criaremos uma boa experiência.</strong>
                  </p>
                  
                  <div className="bg-blue-100 border border-blue-200 rounded-lg p-4 text-center">
                    <p className="text-blue-800 font-medium">
                      👏 Se você gostou do que leu, dê um aplauso e recomende.
                    </p>
                  </div>
                </section>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}