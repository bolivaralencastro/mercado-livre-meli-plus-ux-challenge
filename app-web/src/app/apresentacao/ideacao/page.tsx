import AndesCard from '@/components/ui/AndesCard';

const solutions = [
  {
    title: "Calculadora Inteligente de Benefícios",
    problem: "Marina não sabia se o Meli+ valia a pena para seu perfil de compra.",
    solution: "Uma calculadora que usa o histórico real de compras do usuário e mostra a economia."
  },
  {
    title: "Fluxo de Assinatura Simplificado",
    problem: "6 passos para assinar, muitos pontos de abandono.",
    solution: "Reduzir para 3 passos eficientes: Escolher, Confirmar, Começar."
  },
  {
    title: "Gestão de Pagamento sem Fricção",
    problem: "Juliana perdeu benefícios porque atualizar cartão era complexo.",
    solution: "Dashboard dedicado, notificações e atualização em 1-click."
  },
  {
    title: "Dashboard de Economia",
    problem: "Assinantes não percebiam o valor gerado.",
    solution: "Mostrar economia em tempo real, com breakdown por categoria."
  }
];

export default function IdeacaoPage() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Capítulo 5: Ideação</h1>
      <p className="text-lg text-gray-600 mb-8">
        Reunimos a equipe para sessões de brainstorming e convergimos mais de 100 ideias em soluções concretas.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {solutions.map(solution => (
          <AndesCard key={solution.title}>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{solution.title}</h2>
              <div className="mb-4">
                <h3 className="font-bold text-red-600">O Problema:</h3>
                <p className="text-gray-700">{solution.problem}</p>
              </div>
              <div>
                <h3 className="font-bold text-green-600">A Solução:</h3>
                <p className="text-gray-700">{solution.solution}</p>
              </div>
            </div>
          </AndesCard>
        ))}
      </div>
    </div>
  );
}
