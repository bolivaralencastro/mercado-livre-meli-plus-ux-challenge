import AndesCard from '@/components/ui/AndesCard';

const personas = [
  {
    name: "Marina, 32 anos",
    title: "A Compradora Frequente",
    quote: "Eu compro no Mercado Livre toda semana, mas não sei se o Meli+ vale a pena pra mim. Quanto eu gastaria de frete mesmo?",
    description: "Representa 40% dos usuários potenciais: compra frequentemente mas não entende se o investimento se justifica."
  },
  {
    name: "Carlos, 45 anos",
    title: "O Preocupado com Segurança",
    quote: "Já tive problemas com cartão de crédito antes. Como sei que meus dados estão seguros? E se eu quiser cancelar depois?",
    description: "Representa 30% dos usuários: tem receios sobre segurança e compromisso de longo prazo."
  },
  {
    name: "Juliana, 28 anos",
    title: "A Assinante Frustrada",
    quote: "Meu cartão venceu e perdi os benefícios. Quando tentei atualizar, o processo era confuso e demorado.",
    description: "Representa 20% dos usuários: já são assinantes mas enfrentam problemas de gestão."
  }
];

const insights = [
  {
    title: "Valor Invisível",
    quote: "Não consigo calcular se vale a pena. Quanto eu realmente economizaria?",
    points: [
      "78% não sabiam quanto gastariam em frete mensalmente",
      "65% não entendiam todos os benefícios inclusos"
    ]
  },
  {
    title: "Medo do Compromisso",
    quote: "E se eu quiser cancelar? Vai ser difícil?",
    points: [
      "54% tinham receio de processos de cancelamento complexos",
      "42% queriam teste gratuito antes de comprometer"
    ]
  },
  {
    title: "Fricção no Pagamento",
    quote: "Por que tenho que digitar tudo de novo? O Mercado Livre já tem meus dados!",
    points: [
      "31% abandonavam por ter que adicionar cartão novamente",
      "45% dos cancelamentos eram por problemas de pagamento não resolvidos"
    ]
  }
];

export default function OuvindoAsPessoasPage() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Capítulo 2: Ouvindo as Pessoas</h1>
      <p className="text-lg text-gray-600 mb-8">
        Antes de propor qualquer solução, precisávamos entender profundamente os usuários. Conduzimos uma pesquisa abrangente com entrevistas, questionários e testes de usabilidade.
      </p>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Personas Principais</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {personas.map(persona => (
            <AndesCard key={persona.name}>
              <div className="p-6">
                <h3 className="text-xl font-bold">{persona.name}</h3>
                <p className="text-md text-gray-500 mb-4">{persona.title}</p>
                <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4">
                  {persona.quote}
                </blockquote>
                <p className="text-gray-700">{persona.description}</p>
              </div>
            </AndesCard>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Insights-Chave</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insights.map(insight => (
            <AndesCard key={insight.title}>
              <div className="p-6 bg-yellow-50">
                <h3 className="text-xl font-bold text-yellow-800 mb-2">🔍 {insight.title}</h3>
                <blockquote className="text-gray-600 italic mb-4">"{insight.quote}"</blockquote>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {insight.points.map(point => <li key={point}>{point}</li>)}
                </ul>
              </div>
            </AndesCard>
          ))}
        </div>
      </section>
    </div>
  );
}
