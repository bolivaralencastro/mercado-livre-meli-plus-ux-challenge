import AndesPaymentCard from '@/components/ui/AndesPaymentCard';
import FloatingMenu from '@/components/ui/FloatingMenu';

export default function Home() {
  const menuItems = [
    { label: 'Página Inicial', href: '/' },
    { label: 'Produtos', href: '/products' },
    { label: 'Categorias', href: '/categories' },
    { label: 'Minha Conta', href: '/account' },
    { label: 'Favoritos', href: '/favorites' },
    { label: 'Histórico', href: '/history' },
    { label: 'Configurações', href: '/settings' },
    { label: 'Ajuda', href: '/help' },
    { label: 'Sair', href: '/logout' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white p-4">
      <div className="max-w-4xl mx-auto mb-8">
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

      <FloatingMenu menuItems={menuItems} />
    </div>
  );
}