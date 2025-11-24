# Exemplos de Modal do HTML Original

## Modal Promocional Meli+

O arquivo HTML original (`andes-design-system.html`) continha 2 modais completos:

### 1. Modal de Promoção Meli+ Mega
- Background escuro (#222) com conteúdo visual
- Logo Meli+ com gradiente roxo
- Grid de 4 logos de streaming (Disney+, Netflix, HBO Max, TV)
- Preço hero (R$ 39,90/mês)
- Footer branco com botões de ação
- Animação de fade-in

### 2. Modal de Onboarding Tour  
- Container fixo de 600px
- 5 slides com navegação por setas
- Cada slide tem:
  - Imagem placeholder no topo (320px altura)
  - Conteúdo textual embaixo (título + descrição)
- Navegação:
  - Setas laterais (prev/next) flutuantes
  - Paginação com dots na parte inferior
  - Botão X para fechar (canto superior direito)
- Slides:
  1. "Comece a criar seu primeiro anúncio"
  2. "Se você receber perguntas, responda-as rapidamente"
  3. "Ao concretizar a venda, gerencie seu envio de um só lugar"
  4. "O dinheiro da sua venda estará disponível no Mercado Pago"
  5. "Continue vendendo e crescendo como vendedor" (slide final com botão "Entendi")

## Estilos CSS importantes

```css
.andes-modal-overlay {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(2px);
  z-index: 9999;
}

.andes-modal {
  max-width: 700px;
  border-radius: 8px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  animation: modalFadeIn 0.3s ease-out;
}

.ob-modal-container {
  width: 600px;
  position: relative;
}

.ob-nav-btn {
  width: 56px;
  height: 56px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  color: #3483fa;
  font-size: 24px;
}
```

Esses modais foram implementados diretamente no `page.tsx` com inline styles para manter a fidelidade ao design original.
