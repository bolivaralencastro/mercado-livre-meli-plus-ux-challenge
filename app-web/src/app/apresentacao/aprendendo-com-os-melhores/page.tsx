import AndesCard from '@/components/ui/AndesCard';

const competitors = [
  {
    name: "Amazon Prime",
    strengths: [
      "Comunicação cristalina de benefícios",
      "Ecossistema integrado",
      "Dashboard que mostra valor gerado"
    ]
  },
  {
    name: "Netflix",
    strengths: [
      "Onboarding perfeito",
      "Gestão de assinatura extremamente simples",
      "Transparência total em preços"
    ]
  },
  {
    name: "iFood Pro",
    strengths: [
      "Calculadora que mostra quando vale a pena",
      "Recomendação personalizada",
      "ROI visível em tempo real"
    ]
  }
];

const opportunities = [
  "Dados ricos: Histórico de compras para personalização",
  "Ecossistema: Integração com Mercado Livre e Mercado Pago",
  "Infraestrutura: Logística robusta em toda América Latina"
];

export default function AprendendoComOsMelhoresPage() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Capítulo 3: Aprendendo com os Melhores</h1>
      <p className="text-lg text-gray-600 mb-8">
        Analisamos os principais programas de assinatura do mercado para entender o que os líderes fazem bem e onde o Meli+ poderia se diferenciar.
      </p>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">O Que os Líderes Fazem Bem</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {competitors.map(competitor => (
            <AndesCard key={competitor.name}>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">{competitor.name}</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {competitor.strengths.map(strength => <li key={strength}>{strength}</li>)}
                </ul>
              </div>
            </AndesCard>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">A Oportunidade do Meli+</h2>
        <AndesCard className="bg-green-50 border-l-4 border-green-500">
            <div className="p-8">
                <p className="text-lg text-gray-700 mb-4">Percebemos que o Meli+ tinha vantagens únicas que nenhum concorrente possuía:</p>
                <ul className="list-disc list-inside text-gray-800 space-y-2 text-lg">
                    {opportunities.map(opportunity => <li key={opportunity}><strong>{opportunity.split(':')[0]}</strong>:{opportunity.split(':')[1]}</li>)}
                </ul>
                <p className="text-lg text-gray-700 mt-4">Bastava tornar essas vantagens visíveis e acessíveis.</p>
            </div>
        </AndesCard>
      </section>
    </div>
  );
}
