"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const chapters = [
  { name: 'O Desafio', path: '/apresentacao/desafio' },
  { name: 'Ouvindo as Pessoas', path: '/apresentacao/ouvindo-as-pessoas' },
  { name: 'Aprendendo com os Melhores', path: '/apresentacao/aprendendo-com-os-melhores' },
  { name: 'Definindo a Estratégia', path: '/apresentacao/definindo-a-estrategia' },
  { name: 'Ideação', path: '/apresentacao/ideacao' },
  { name: 'Prototipagem', path: '/apresentacao/prototipagem' },
  { name: 'Validação', path: '/apresentacao/validacao' },
  { name: 'O Impacto Esperado', path: '/apresentacao/impacto-esperado' },
  { name: 'Roadmap', path: '/apresentacao/roadmap' },
  { name: 'Lições Aprendidas', path: '/apresentacao/licoes-aprendidas' },
  { name: 'Epílogo', path: '/apresentacao/epilogo' },
];

const PresentationNav = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md mb-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-4 overflow-x-auto py-2">
          {chapters.map((chapter) => (
            <Link
              key={chapter.path}
              href={chapter.path}
              className={`px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
                pathname === chapter.path
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {chapter.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default PresentationNav;
