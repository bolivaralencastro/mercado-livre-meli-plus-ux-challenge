import AndesCard from '@/components/ui/AndesCard';

const pillars = [
  {
    name: "CLAREZA",
    description: "Tornar o valor tangível e transparente",
    actions: [
      "Mostrar economia estimada baseada em dados reais",
      "Comunicação visual de benefícios",
      "Transparência total sobre preços e cobranças"
    ]
  },
  {
    name: "SIMPLICIDADE",
    description: "Remover fricção de cada interação",
    actions: [
      "Reduzir passos no fluxo de assinatura",
      "One-click para gestão de pagamentos",
      "Automatizar o que for possível"
    ]
  },
  {
    name: "CONFIANÇA",
    description: "Criar segurança emocional e técnica",
    actions: [
      "Processo de cancelamento simples",
      "Comunicação proativa sobre cobranças",
      "Segurança visível na gestão de dados"
    ]
  }
];

export default function DefinindoAEstrategiaPage() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Capítulo 4: Definindo a Estratégia</h1>
      <p className="text-lg text-gray-600 mb-8">
        Com base em nossa pesquisa, definimos três pilares estratégicos para guiar nossas soluções.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pillars.map(pillar => (
          <AndesCard key={pillar.name} className="border-t-4 border-blue-500">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-blue-600 mb-2">{pillar.name}</h2>
              <p className="text-lg text-gray-600 italic mb-6">"{pillar.description}"</p>
              <h3 className="font-bold text-gray-800 mb-3">Como:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {pillar.actions.map(action => <li key={action}>{action}</li>)}
              </ul>
            </div>
          </AndesCard>
        ))}
      </div>
    </div>
  );
}
