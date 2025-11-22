# Resumo das Configurações de Deploy na Vercel

Este documento resume as configurações aplicadas ao projeto para tentar resolver os problemas de deploy na Vercel.

## 0. Estrutura do Projeto

É importante notar que a aplicação principal do Next.js está localizada no subdiretório `app-web`. O restante do repositório contém documentação e outros artefatos. Esta estrutura de monorepo é a principal razão por trás das configurações específicas do `vercel.json`, pois a Vercel precisa ser explicitamente instruída sobre onde encontrar a aplicação Next.js para construir e implantar corretamente.

## 1. Correções no Código da Aplicação

Para garantir um build limpo e sem avisos (warnings), as seguintes alterações foram feitas no código-fonte da aplicação Next.js (`app-web`):

### 1.1. Dependências (`app-web/package.json`)

- A versão do pacote `eslint-config-next` foi ajustada para `14.2.33`, para ser compatível com a versão do `next` (`14.2.33`).

  ```diff
  - "eslint-config-next": "16.0.3"
  + "eslint-config-next": "14.2.33"
  ```

### 1.2. Componentes React (`.tsx`)

- **Otimização de Imagens**: Em todos os componentes que usavam a tag `<img>` (`AndesCategoryCard`, `AndesGridCard`, `AndesOnboardingModal`, `AndesThematicCard`), a tag foi substituída pelo componente `<Image>` do `next/image` para aproveitar a otimização de imagens do Next.js.
- **Correção de Hook**: No componente `AndesOnboardingModal`, um aviso de dependência ausente no hook `useEffect` foi corrigido.

## 2. Configurações da Vercel (`vercel.json`)

Foram feitas várias tentativas de configuração no arquivo `vercel.json` na raiz do projeto para que a Vercel pudesse corretamente identificar e construir a aplicação Next.js que está no subdiretório `app-web`.

### Tentativa 1 (Falhou)

- **Arquivo**: `vercel.json`
- **Conteúdo**:
  ```json
  {
    "builds": [
      {
        "src": "app-web/next.config.mjs",
        "use": "@vercel/next"
      }
    ]
  }
  ```
- **Observação**: O arquivo `app-web/vercel.json` foi removido para evitar conflitos.

### Tentativa 2 (Falhou)

- **Arquivo**: `vercel.json`
- **Conteúdo**:
  ```json
  {
    "installCommand": "npm install --prefix app-web --legacy-peer-deps",
    "buildCommand": "npm run build --prefix app-web"
  }
  ```

### Tentativa 3 (Configuração Atual)

- **Arquivo**: `vercel.json`
- **Conteúdo**:
  ```json
  {
    "buildCommand": "cd app-web && npm install --legacy-peer-deps && npm run build"
  }
  ```
- **Descrição**: Esta configuração instrui a Vercel a executar um único comando de build. O comando primeiro navega para o diretório `app-web`, depois instala as dependências e finalmente executa o build do Next.js.

Espero que este resumo ajude a diagnosticar o problema.