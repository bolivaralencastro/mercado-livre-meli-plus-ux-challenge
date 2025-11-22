import Link from 'next/link';

const sections = [
  { name: 'Programação', path: '/programacao' },
  { name: 'Briefing', path: '/briefing' },
  { name: 'Pesquisa', path: '/pesquisa' },
  { name: 'Estratégia', path: '/estrategia' },
  { name: 'Ideação', path: '/ideacao' },
  { name: 'UI Design', path: '/ui-design' },
  { name: 'Protótipo', path: '/prototipo' },
  { name: 'Apresentação', path: '/apresentacao' },
  { name: 'Entrega', path: '/entrega' },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <nav>
        <ul>
          {sections.map((section) => (
            <li key={section.path}>
              <Link href={section.path} className="block p-2 hover:bg-gray-700 rounded">
                {section.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
