import AndesPaymentCard from '@/components/ui/AndesPaymentCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Bem-vindo ao Meli+ UX Challenge</h1>
        <p className="text-center mb-8">Navegue pelas seções no menu ao lado para explorar o projeto.</p>

        <div className="flex justify-center">
          <AndesPaymentCard
            title="Meios de pagamento"
            text="Pague suas compras com rapidez e segurança."
            buttonLabel="Mostrar meios"
          />
        </div>
      </div>
    </div>
  );
}