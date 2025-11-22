import AndesCard from '@/components/ui/AndesCard';

export default function DesafioPage() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Capítulo 1: O Desafio</h1>
      <p className="text-lg text-gray-600 mb-8">
        Era uma vez um programa de benefícios chamado Meli+, criado pelo Mercado Livre para oferecer frete grátis ilimitado e vantagens exclusivas aos seus usuários mais fiéis. Apesar de seu grande potencial, o Meli+ enfrentava desafios importantes.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <AndesCard>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">Baixa Conversão</h3>
            <p className="text-gray-700">Muitos usuários não compreendiam claramente o valor da assinatura.</p>
          </div>
        </AndesCard>
        <AndesCard>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">Gestão Complexa</h3>
            <p className="text-gray-700">Atualizar meios de pagamento era uma tarefa frustrante.</p>
          </div>
        </AndesCard>
        <AndesCard>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">Cancelamentos</h3>
            <p className="text-gray-700">Assinantes deixavam o programa prematuramente.</p>
          </div>
        </AndesCard>
      </div>

      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-6" role="alert">
        <p className="font-bold text-xl">Nossa Missão</p>
        <p className="text-lg">Transformar a experiência do Meli+, tornando-a mais clara, simples e valiosa para os usuários.</p>
      </div>
    </div>
  );
}
