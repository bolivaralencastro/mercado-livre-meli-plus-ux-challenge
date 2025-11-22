import DraggableFloatingMenu from '@/components/ui/DraggableFloatingMenu';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">Meli+ UX Challenge</h1>
        <p className="text-center mb-8">Componente flutuante arrastável com navegação por teclado</p>

        <div className="text-center">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <p className="mb-4">Pressione a tecla 'M' para abrir/fechar o menu flutuante</p>
          <p className="text-sm text-gray-600">Arraste o menu para qualquer posição na tela</p>
        </div>
      </div>

      <DraggableFloatingMenu />
    </div>
  );
}