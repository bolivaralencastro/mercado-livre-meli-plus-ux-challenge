# 🚀 Guia de Início Rápido - Desenvolvimento

## 📋 Pré-requisitos

- **Node.js:** Versão 18 ou superior (recomendado: 20+)
- **npm:** Versão 9 ou superior
- **Git:** Para controle de versão

## ⚙️ Configuração Inicial

### 1. Clone o Repositório

```bash
git clone https://github.com/bolivaralencastro/mercado-livre-meli-plus-ux-challenge.git
cd mercado-livre-meli-plus-ux-challenge
```

### 2. Instale as Dependências

```bash
cd app-web
npm install
```

### 3. Execute o Servidor de Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em: **http://localhost:3000**

## 📁 Estrutura do Projeto

```
mercado-livre-meli-plus-ux-challenge/
│
├── app-web/                    # 🌐 Aplicação Next.js
│   ├── src/
│   │   ├── app/               # App Router (páginas e layouts)
│   │   │   ├── layout.tsx     # Layout raiz
│   │   │   ├── page.tsx       # Página inicial
│   │   │   └── globals.css    # Estilos globais
│   │   └── components/        # Componentes reutilizáveis
│   │       └── ui/            # Componentes de interface
│   ├── public/                # Arquivos estáticos
│   ├── package.json           # Dependências
│   ├── tsconfig.json          # Config TypeScript
│   └── tailwind.config.ts     # Config Tailwind (com cores do ML)
│
├── briefing/                   # 📝 Documentação: Briefing
├── pesquisa/                   # 🔍 Documentação: Pesquisa
├── estrategia/                 # 🎯 Documentação: Estratégia
├── ideacao/                    # 💡 Documentação: Ideação
├── ui-design/                  # 🎨 Documentação: UI Design
├── prototipo/                  # 🖱️ Documentação: Protótipo
├── apresentacao/               # 📊 Documentação: Apresentação
└── entrega/                    # ✅ Documentação: Entrega
```

## 🛠️ Comandos Disponíveis

### Desenvolvimento

```bash
cd app-web
npm run dev          # Servidor de desenvolvimento (http://localhost:3000)
npm run build        # Build de produção
npm start            # Executar build de produção
npm run lint         # Executar linter (ESLint)
```

### Verificação de Tipos

```bash
npx tsc --noEmit     # Verificar tipos TypeScript sem gerar arquivos
```

## 🎨 Desenvolvimento de Páginas

### Criar uma Nova Página

1. Crie um diretório em `app-web/src/app/` com o nome da rota
2. Adicione um arquivo `page.tsx` dentro do diretório

Exemplo - criar página `/assinatura`:

```bash
mkdir app-web/src/app/assinatura
```

```tsx
// app-web/src/app/assinatura/page.tsx
export default function AssinaturaPage() {
  return (
    <div>
      <h1>Página de Assinatura</h1>
    </div>
  );
}
```

Acesse em: **http://localhost:3000/assinatura**

### Criar um Componente

```bash
# Criar arquivo em src/components/ui/
touch app-web/src/components/ui/NovoComponente.tsx
```

```tsx
// app-web/src/components/ui/NovoComponente.tsx
interface NovoComponenteProps {
  title: string;
}

export function NovoComponente({ title }: NovoComponenteProps) {
  return <div>{title}</div>;
}
```

## 🎨 Estilos e Design

### Tailwind CSS

O projeto usa Tailwind CSS com cores personalizadas do Mercado Livre:

```tsx
// Exemplo de uso das cores do ML
<button className="bg-ml-yellow text-ml-gray-900 hover:bg-yellow-400">
  Assinar Meli+
</button>

<div className="bg-ml-blue text-white">
  Economia garantida
</div>
```

### Cores Disponíveis

- `ml-yellow` - Amarelo do ML (#FFE600)
- `ml-blue` - Azul do ML (#3483FA)
- `ml-gray-{100,200,300,400,900}` - Escala de cinzas
- `ml-success` - Verde (#00A650)
- `ml-error` - Vermelho (#F23D4F)
- `ml-warning` - Laranja (#F8B01C)

## 📚 Recursos

### Documentação Técnica

- [Next.js 14 Docs](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Documentação do Projeto

- [README Principal](./README.md)
- [Configuração Andes](./app-web/ANDES-SETUP.md)
- [Timeline do Projeto](./PROJETO-TIMELINE.md)

## 🐛 Solução de Problemas

### Erro: "Module not found"

```bash
cd app-web
rm -rf node_modules package-lock.json
npm install
```

### Erro de porta já em uso

```bash
# Mudar porta no comando dev
npx next dev -p 3001
```

### Build falha

```bash
# Limpar cache
cd app-web
rm -rf .next
npm run build
```

## 🤝 Contribuindo

1. Crie uma branch para sua feature
2. Faça commit das mudanças
3. Envie um pull request

## 📞 Suporte

Para dúvidas sobre o projeto:
- Veja a [documentação completa](./README.md)
- Consulte as [fases do projeto](./PROJETO-TIMELINE.md)

---

**Happy Coding! 💻**

*Última atualização: Novembro 2025*
