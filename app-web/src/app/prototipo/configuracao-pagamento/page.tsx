"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ConfiguracaoPagamentoPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the first payment flow (visao-geral)
    router.replace("/prototipo/configuracao-pagamento/visao-geral");
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-gray-600">Redirecionando...</div>
    </div>
  );
}
