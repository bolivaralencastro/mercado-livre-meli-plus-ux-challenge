# Meli+ UX Challenge - Aplicação Web

Esta é a aplicação web do projeto Meli+ UX Challenge, construída com Next.js 14, App Router e TypeScript.

## 🚀 Tecnologias

- **Framework:** Next.js 14
- **Routing:** App Router
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Linting:** ESLint
- **Design System:** Andes (Mercado Livre) - _a ser integrado_

## 📦 Pré-requisitos

- Node.js 18+ (recomendado: 20+)
- npm ou yarn

## 🏃‍♂️ Como executar

### Instalação

```bash
# Navegue até a pasta da aplicação
cd app-web

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### Build de Produção

```bash
# Crie o build de produção
npm run build

# Execute o build
npm start
```

### Linting

```bash
# Execute o linter
npm run lint
```

## 📁 Estrutura do Projeto

```
app-web/
├── src/
│   └── app/              # App Router
│       ├── layout.tsx    # Layout raiz
│       ├── page.tsx      # Página inicial
│       └── globals.css   # Estilos globais
├── public/               # Arquivos estáticos
├── next.config.mjs       # Configuração Next.js
├── tsconfig.json         # Configuração TypeScript
├── tailwind.config.ts    # Configuração Tailwind
└── package.json          # Dependências
```

## 🎨 Design System

Este projeto utilizará o **Andes Design System** do Mercado Livre para garantir consistência visual e de UX com a plataforma original.

### Próximos Passos de Integração

1. Instalar componentes do Andes
2. Configurar tema do Mercado Livre
3. Criar componentes reutilizáveis
4. Implementar páginas das soluções propostas

## 📖 Documentação

Para entender o contexto do projeto e as soluções de UX propostas, consulte:

- [README Principal](../README.md)
- [Documentação de Pesquisa](../pesquisa/)
- [Estratégia](../estrategia/)
- [Fluxos de Usuário](../ideacao/fluxos.md)
- [UI Design](../ui-design/telas.md)

## 🛠️ Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Cria build de produção |
| `npm start` | Executa aplicação em modo produção |
| `npm run lint` | Executa linter (ESLint) |

## 📂 Assets dos cases

As páginas de cases agora consomem o manifesto `src/lib/cases-manifest.json`, que aponta para URLs remotas (ou para um endpoint definido em `CASES_MANIFEST_URL`). Depois que todas as imagens estiverem hospedadas no bucket/Blob e você validar que o manifesto aponta para o storage correto, as pastas locais com as imagens brutas (`src/app/pesquisa/Mercado-Livre-Behance/**/*`) podem ser removidas do repositório para reduzir o tamanho do clone. O funcionamento das páginas depende apenas do manifesto e das URLs remotas configuradas.

## 🤝 Contribuindo

Este é um projeto de estudo de UX. Páginas e componentes serão adicionados conforme o desenvolvimento das soluções propostas na documentação.

## 📝 Licença

Este é um projeto educacional de estudo de caso.

---

**Desenvolvido com ❤️ como parte do Meli+ UX Challenge**

