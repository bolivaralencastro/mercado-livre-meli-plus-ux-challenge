import React from 'react';

export interface AnalysisItem {
  icon: string;
  title: string;
  description: string;
  colorClass: string; // e.g., "text-purple-600"
}

export interface MapeamentoFlow {
  slug: string;
  title: string;
  subtitle: string;
  type: 'desktop' | 'mobile';
  // component property removed to avoid serialization issues
  analysis: {
    objective: string;
    heuristicsTitle: string;
    heuristicsIcon: string;
    heuristics: AnalysisItem[];
    nextSteps: string;
  };
}

export const mapeamentoFlows: MapeamentoFlow[] = [
  {
    slug: 'landing-page',
    title: 'Landing Page Meli+',
    subtitle: 'Desktop View',
    type: 'desktop',
    analysis: {
      objective: 'Esta página reproduz a estrutura de informação e hierarquia visual da Landing Page atual do Meli+. Utilize este espelho para identificar fricções, inconsistências e oportunidades de melhoria.',
      heuristicsTitle: 'Análise: Landing Page',
      heuristicsIcon: 'Layout',
      heuristics: [
        {
          icon: 'Eye',
          title: 'Excesso de Informação',
          description: 'A proposta de valor (Frete + Streaming + Banco) está dispersa.',
          colorClass: 'text-gray-500'
        },
        {
          icon: 'MousePointerClick',
          title: 'Comparação Complexa',
          description: 'Os cards de planos atuais exigem muita carga cognitiva.',
          colorClass: 'text-gray-500'
        }
      ],
      nextSteps: 'Validar estas hipóteses com dados reais e testes de usabilidade.'
    }
  },
  {
    slug: 'redesign-meli-plus',
    title: 'Redesign Meli+ (Figma)',
    subtitle: 'Mobile View',
    type: 'mobile',
    analysis: {
      objective: 'Proposta de redesign da Landing Page do Meli+ focada em simplificação visual e melhor hierarquia de informações para dispositivos móveis.',
      heuristicsTitle: 'Análise: Redesign',
      heuristicsIcon: 'Layout',
      heuristics: [
        {
          icon: 'Eye',
          title: 'Hierarquia Visual',
          description: 'Melhor distinção entre os planos Essencial e Total.',
          colorClass: 'text-green-600'
        },
        {
          icon: 'MousePointerClick',
          title: 'Clareza na Proposta',
          description: 'Benefícios agrupados de forma mais intuitiva.',
          colorClass: 'text-green-600'
        }
      ],
      nextSteps: 'Realizar testes A/B comparando com a versão atual.'
    }
  },
  {
    slug: 'configuracao-pagamento',
    title: 'Configuração de Pagamento',
    subtitle: 'Mobile View',
    type: 'mobile',
    analysis: {
      objective: 'Este fluxo reproduz a experiência atual de gestão de cartões no app. O foco é identificar barreiras para a adição de meios de pagamento secundários (backup).',
      heuristicsTitle: 'Análise: Pagamentos',
      heuristicsIcon: 'CreditCard',
      heuristics: [
        {
          icon: 'AlertTriangle',
          title: 'Falta de Backup',
          description: 'Não há incentivo claro para adicionar cartão secundário.',
          colorClass: 'text-orange-500'
        },
        {
          icon: 'AlertTriangle',
          title: 'Visibilidade de Status',
          description: 'Cartões expirados não ganham destaque suficiente.',
          colorClass: 'text-orange-500'
        }
      ],
      nextSteps: 'Propor fluxo de "Cartão Reserva" com menor fricção.'
    }
  }
];
