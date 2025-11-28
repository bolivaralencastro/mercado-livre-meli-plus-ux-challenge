export interface PaymentFlowEntry {
  slug: string;
  title: string;
  description: string;
  component: string;
  status: "draft" | "ready" | "testing";
  flowchartUrl?: string;
  scenario?: string;
  objective?: string;
}

export const paymentFlows: PaymentFlowEntry[] = [
  {
    slug: "visao-geral",
    title: "Configuração de Pagamento",
    description: "Este protótipo aborda o desafio de reduzir o churn involuntário, permitindo que os usuários gerenciem seus métodos de pagamento de forma proativa. A interface oferece uma visão clara da assinatura, com opções para adicionar um método de pagamento de backup, garantindo a continuidade do serviço mesmo em caso de falha no pagamento principal. O fluxo foi desenhado para ser intuitivo e seguro, transmitindo confiança ao usuário e fortalecendo o relacionamento com a plataforma.",
    component: "PaymentConfigPrototype",
    status: "ready",
    flowchartUrl: "https://smolljrfjqknp6nm.public.blob.vercel-storage.com/fluxogramas/fluxo-assinaturas-meli-mais.svg",
    scenario: "Usuário precisa atualizar ou adicionar um método de pagamento para evitar o cancelamento da assinatura.",
    objective: "Facilitar a gestão de métodos de pagamento e reduzir o churn involuntário.",
  },
];

export function getPaymentFlowBySlug(slug: string): PaymentFlowEntry | undefined {
  return paymentFlows.find((pf) => pf.slug === slug);
}

export function getPaymentFlows(): PaymentFlowEntry[] {
  return paymentFlows;
}
