export interface PaymentFlowEntry {
  slug: string;
  title: string;
  description: string;
  component: string;
  status: "draft" | "ready" | "testing";
}

export const paymentFlows: PaymentFlowEntry[] = [
  {
    slug: "visao-geral",
    title: "Configuração de Pagamento",
    description: "Protótipo interativo de configuração e gerenciamento de pagamento da assinatura Meli+, incluindo alteração de método de pagamento, visualização de histórico e gestão do plano.",
    component: "PaymentConfigPrototype",
    status: "ready",
  },
];

export function getPaymentFlowBySlug(slug: string): PaymentFlowEntry | undefined {
  return paymentFlows.find((pf) => pf.slug === slug);
}

export function getPaymentFlows(): PaymentFlowEntry[] {
  return paymentFlows;
}
