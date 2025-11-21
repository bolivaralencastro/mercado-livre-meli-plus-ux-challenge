export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <main className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Meli+ UX Challenge
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Aplicação Next.js 14 + App Router + TypeScript
          </p>
          <p className="text-lg text-gray-500">
            Protótipo interativo para o programa de assinatura do Mercado Livre
          </p>
        </div>

        {/* Tech Stack */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            🚀 Stack Tecnológica
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="font-semibold text-lg mb-2 text-gray-900">Next.js 14</h3>
              <p className="text-gray-600 text-sm">App Router para navegação moderna e otimizada</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="font-semibold text-lg mb-2 text-gray-900">TypeScript</h3>
              <p className="text-gray-600 text-sm">Type safety para código mais robusto</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="font-semibold text-lg mb-2 text-gray-900">Tailwind CSS</h3>
              <p className="text-gray-600 text-sm">Estilização utilitária e responsiva</p>
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            📋 Sobre o Projeto
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <p className="text-gray-700 mb-4">
              Este projeto combina documentação de UX completa com uma aplicação web interativa
              para explorar e prototipar soluções para o Meli+, o programa de assinatura do
              Mercado Livre.
            </p>
            <p className="text-gray-700 mb-6">
              Através deste ambiente, é possível construir e testar páginas utilizando o Design
              System Andes, permitindo uma transição fluida entre design e desenvolvimento.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Objetivos</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Aumentar conversão em assinaturas</li>
                  <li>• Reduzir cancelamentos</li>
                  <li>• Facilitar gestão de pagamentos</li>
                  <li>• Melhorar percepção de valor</li>
                </ul>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Pilares de Design</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Clareza</li>
                  <li>• Simplicidade</li>
                  <li>• Confiança</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            🎯 Próximos Passos
          </h2>
          <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 p-8 rounded-lg border border-yellow-200">
            <ol className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="font-bold text-yellow-600 mr-3">1.</span>
                <span>Integrar o Andes Design System do Mercado Livre</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-yellow-600 mr-3">2.</span>
                <span>Criar componentes reutilizáveis baseados nas especificações de UX</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-yellow-600 mr-3">3.</span>
                <span>Implementar páginas dos fluxos principais (Landing, Assinatura, Dashboard)</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-yellow-600 mr-3">4.</span>
                <span>Adicionar interações e testes de usabilidade</span>
              </li>
            </ol>
          </div>
        </div>

        {/* Links */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            📚 Documentação
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="https://github.com/bolivaralencastro/mercado-livre-meli-plus-ux-challenge"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver Repositório GitHub
            </a>
            <a 
              href="https://nextjs.org/docs"
              className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentação Next.js
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p className="text-sm">
            Desenvolvido com ❤️ como parte do Meli+ UX Challenge
          </p>
          <p className="text-xs mt-2">
            Next.js 14 • App Router • TypeScript • Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
