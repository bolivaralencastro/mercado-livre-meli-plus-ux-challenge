import { redirect } from "next/navigation";
import { mapeamentoFlows } from "@/lib/mapeamento-flows";

export default function MapeamentoIndexPage() {
  if (mapeamentoFlows.length === 0) {
    return <div>Nenhum fluxo encontrado.</div>;
  }

  const [firstFlow] = mapeamentoFlows;
  redirect(`/pesquisa/mapeamento/${firstFlow.slug}`);
}
