import mercadoPagoGoogle from '@/app/pesquisa/review/Mercado Pago Review Google Apps.json';
import mercadoLivreGoogle from '@/app/pesquisa/review/Mercado Livre Review Google Apps.json';
import meliReclameAqui from '@/app/pesquisa/review/Meli+ Reclame Aqui.json';

export type Sentiment = "positive" | "neutral" | "negative";
export type Source = "google_play_mp" | "google_play_ml" | "app_store" | "reclame_aqui";
export type Cluster = "logistica" | "meli_plus" | "usabilidade" | "pagamento" | "atendimento" | "geral";

export interface Review {
  id: string;
  source: Source;
  user: string;
  date: string;
  rating: number;
  text: string;
  sentiment: Sentiment;
  cluster: Cluster;
}

function detectSentiment(rating: number, maxRating: number = 5): Sentiment {
  const normalized = rating / maxRating;
  if (normalized >= 0.8) return "positive";
  if (normalized >= 0.5) return "neutral";
  return "negative";
}

function detectCluster(text: string): Cluster {
  const lower = text.toLowerCase();
  
  if (lower.includes('meli') || lower.includes('assinatura') || lower.includes('streaming') || lower.includes('disney') || lower.includes('hbo') || lower.includes('spotify')) {
    return "meli_plus";
  }
  if (lower.includes('entrega') || lower.includes('frete') || lower.includes('prazo') || lower.includes('atraso') || lower.includes('logistica')) {
    return "logistica";
  }
  if (lower.includes('pagamento') || lower.includes('cobranca') || lower.includes('cartao') || lower.includes('pagar') || lower.includes('juros') || lower.includes('parcelamento')) {
    return "pagamento";
  }
  if (lower.includes('app') || lower.includes('aplicativo') || lower.includes('travar') || lower.includes('bug') || lower.includes('erro') || lower.includes('login') || lower.includes('senha') || lower.includes('biometria')) {
    return "usabilidade";
  }
  if (lower.includes('atendimento') || lower.includes('suporte') || lower.includes('resolver') || lower.includes('resposta') || lower.includes('contato')) {
    return "atendimento";
  }
  
  return "geral";
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function processMercadoPagoGoogle(limit: number = 100): Review[] {
  return (mercadoPagoGoogle as any[])
    .slice(0, limit)
    .map((item, index) => ({
      id: `mp_google_${index}`,
      source: "google_play_mp" as Source,
      user: item.Usuario || "Usuario Anonimo",
      date: item.Data ? formatDate(item.Data) : "Data nao informada",
      rating: item.Nota || 0,
      text: item.Comentario || "",
      sentiment: detectSentiment(item.Nota || 0, 5),
      cluster: detectCluster(item.Comentario || "")
    }))
    .filter(review => review.text.trim().length > 10);
}

function processMercadoLivreGoogle(limit: number = 100): Review[] {
  return (mercadoLivreGoogle as any[])
    .slice(0, limit)
    .map((item, index) => ({
      id: `ml_google_${index}`,
      source: "google_play_ml" as Source,
      user: item.Usuario || "Usuario Anonimo",
      date: item.Data ? formatDate(item.Data) : "Data nao informada",
      rating: item.Nota || 0,
      text: item.Comentario || "",
      sentiment: detectSentiment(item.Nota || 0, 5),
      cluster: detectCluster(item.Comentario || "")
    }))
    .filter(review => review.text.trim().length > 10);
}

function processMeliReclameAqui(limit: number = 50): Review[] {
  return (meliReclameAqui as any[])
    .slice(0, limit)
    .map((item, index) => ({
      id: `ra_meli_${index}`,
      source: "reclame_aqui" as Source,
      user: item.Local || "Cliente",
      date: item.Data?.split(' ')[0] || "Data nao informada",
      rating: 0,
      text: item.Texto_Reclamacao || item.Titulo || "",
      sentiment: "negative" as Sentiment,
      cluster: detectCluster(item.Texto_Reclamacao || item.Titulo || "")
    }))
    .filter(review => review.text.trim().length > 20);
}

export function getAllReviews(): Review[] {
  const mpGoogle = processMercadoPagoGoogle(150);
  const mlGoogle = processMercadoLivreGoogle(150);
  const raReviews = processMeliReclameAqui(50);
  
  const allReviews = [...mpGoogle, ...mlGoogle, ...raReviews];
  
  for (let i = allReviews.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allReviews[i], allReviews[j]] = [allReviews[j], allReviews[i]];
  }
  
  return allReviews;
}

export function getReviews(limit?: number): Review[] {
  const all = getAllReviews();
  return limit ? all.slice(0, limit) : all;
}
