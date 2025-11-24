"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { 
  TrendingUp, MessageSquare, Star, Clock, CheckCircle, BarChart3, 
  Filter, ThumbsUp, ThumbsDown, Minus, Smartphone, AlertCircle
} from "lucide-react";
import { getReviews, type Review, type Sentiment, type Source, type Cluster } from "@/lib/reviews";

// --- Components ---

const SourceAvatar = ({ source }: { source: Source }) => {
  const getLogoPath = (source: Source): string => {
    if (source === "google_play_mp" || source === "google_play_ml") return "/logos/google.png";
    if (source === "app_store") return "/logos/apple.png";
    return "/logos/reclame-aqui.png";
  };

  const getAlt = (source: Source): string => {
    if (source === "google_play_mp" || source === "google_play_ml") return "Google Play";
    if (source === "app_store") return "Apple App Store";
    return "Reclame Aqui";
  };

  return (
    <div className="w-8 h-8 rounded-full overflow-hidden bg-white flex-shrink-0 border border-gray-200 flex items-center justify-center p-1">
      <Image 
        src={getLogoPath(source)} 
        alt={getAlt(source)}
        width={32}
        height={32}
        className="w-full h-full object-contain"
      />
    </div>
  );
};

const SentimentBadge = ({ sentiment }: { sentiment: Sentiment }) => {
  const config = {
    positive: { icon: ThumbsUp, color: "text-green-600", bg: "bg-green-100", label: "Positivo" },
    neutral: { icon: Minus, color: "text-gray-600", bg: "bg-gray-100", label: "Neutro" },
    negative: { icon: ThumbsDown, color: "text-red-600", bg: "bg-red-100", label: "Negativo" },
  };
  const { icon: Icon, color, bg, label } = config[sentiment];
  
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${bg} ${color}`}>
      <Icon size={12} />
      {label}
    </span>
  );
};

const ClusterBadge = ({ cluster }: { cluster: Cluster }) => {
  const labels: Record<Cluster, string> = {
    logistica: "Logística / Entrega",
    meli_plus: "Meli+",
    usabilidade: "Usabilidade / App",
    pagamento: "Pagamento / Cobrança",
    atendimento: "Atendimento",
    geral: "Geral"
  };
  
  return (
    <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">
      {labels[cluster]}
    </span>
  );
};

const getSourceLabel = (source: Source): string => {
  if (source === "google_play_mp") return "Google Play - MP";
  if (source === "google_play_ml") return "Google Play - ML";
  if (source === "app_store") return "App Store";
  return "Reclame Aqui";
};

export default function ReviewsContent() {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  
  // Filters State
  const [filterSource, setFilterSource] = useState<Source | "all">("all");
  const [filterSentiment, setFilterSentiment] = useState<Sentiment | "all">("all");
  const [filterCluster, setFilterCluster] = useState<Cluster | "all">("all");

  useEffect(() => {
    // Carregar reviews ao montar o componente
    const loadedReviews = getReviews(200); // Limitar a 200 reviews para performance
    setReviews(loadedReviews);
  }, []);

  const filteredReviews = useMemo(() => {
    return reviews.filter(review => {
      if (filterSource !== "all" && review.source !== filterSource) return false;
      if (filterSentiment !== "all" && review.sentiment !== filterSentiment) return false;
      if (filterCluster !== "all" && review.cluster !== filterCluster) return false;
      return true;
    });
  }, [reviews, filterSource, filterSentiment, filterCluster]);

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100">
      {/* Header fixo no topo */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm h-[73px]">
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={() => router.push("/pesquisa")}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 w-10 h-10 text-gray-700 transition hover:bg-gray-50"
            aria-label="Voltar"
          >
            <span aria-hidden className="text-xl">←</span>
          </button>
          
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Análise de Reviews e Feedbacks
            </h1>
            <p className="text-xs text-gray-500">
              Insights extraídos de ~42 milhões de avaliações públicas
            </p>
          </div>
        </div>
      </header>

      {/* Main Content Area - 2 Columns */}
      <main className="flex-1 pt-[73px] overflow-hidden flex flex-col min-h-0">
        <div className="grid grid-cols-12 h-full min-h-0">
          
          {/* --- LEFT COLUMN (40%) - Panorama & Stats --- */}
          <div className="col-span-5 h-full overflow-y-auto no-scrollbar bg-gray-50 border-r border-gray-200 p-4">
            <div className="space-y-4">
              
              {/* Intro Card */}
              <section className="bg-gray-50 rounded-xl p-4 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Panorama Geral
                </h2>
                <div className="text-sm text-gray-700 space-y-4">
                  <ul className="space-y-2 bg-white p-4 rounded-lg border border-gray-100">
                    <li className="flex justify-between items-center">
                      <span>Total Avaliações (Apps)</span>
                      <span className="font-bold text-gray-900">~42 Milhões</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Reclamações (6 meses)</span>
                      <span className="font-bold text-gray-900">160k+</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Resolução Média</span>
                      <span className="font-bold text-green-600">~76%</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Dados Coletados */}
              <section className="bg-gray-100 rounded-xl p-4 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-2">
                  Dados Coletados
                </h3>
                <p className="text-xs text-gray-700 mb-4 leading-relaxed">
                  Base de dados coletada via scraping para análise qualitativa.
                </p>
                <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-100">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-700 font-medium">Google Play Store</span>
                    <span className="font-bold text-gray-900">80.000 reviews</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-700 font-medium">Apple App Store</span>
                    <span className="font-bold text-gray-900">1.000 reviews</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-700 font-medium">Reclame Aqui (Meli+)</span>
                    <span className="font-bold text-gray-900">38 reclamações</span>
                  </div>
                  <div className="pt-2 border-t border-blue-100 flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-900">Total Processado</span>
                    <span className="text-sm font-bold text-gray-900">81.038 registros</span>
                  </div>
                </div>
              </section>

              {/* App Stats + Reclame Aqui - 3 Colunas */}
              <section className="grid grid-cols-3 gap-4">
                {/* Google Play */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-white border border-gray-200 flex items-center justify-center p-1">
                      <Image 
                        src="/logos/google.png" 
                        alt="Google Play"
                        width={32}
                        height={32}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="font-semibold text-xs">Google Play</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900">4.9<span className="text-xs text-gray-500 font-normal">/5</span></div>
                  <p className="text-xs text-gray-500">41M+ reviews</p>
                </div>
                {/* Apple */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-white border border-gray-200 flex items-center justify-center p-1">
                      <Image 
                        src="/logos/apple.png" 
                        alt="App Store"
                        width={32}
                        height={32}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="font-semibold text-xs">App Store</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900">4.8<span className="text-xs text-gray-500 font-normal">/5</span></div>
                  <p className="text-xs text-gray-500">1M+ reviews</p>
                </div>
                {/* Reclame Aqui */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-white border border-gray-200 flex items-center justify-center p-1">
                      <Image 
                        src="/logos/reclame-aqui.png" 
                        alt="Reclame Aqui"
                        width={32}
                        height={32}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="font-semibold text-xs">Reclame Aqui</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900">7.6<span className="text-xs text-gray-500 font-normal">/10</span></div>
                  <p className="text-xs text-gray-500">160k+ reclamações</p>
                </div>
              </section>

            </div>
          </div>

          {/* --- RIGHT COLUMN (60%) - Filterable Reviews --- */}
          <div className="col-span-7 h-full flex flex-col bg-white min-h-0">
            
            {/* Filters Header */}
            <div className="p-4 border-b border-gray-200 bg-white shrink-0">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {filteredReviews.length} resultados
                </span>
              </div>
              
              <div className="flex gap-4 flex-wrap">
                {/* Source Filter */}
                <select 
                  className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterSource}
                  onChange={(e) => setFilterSource(e.target.value as any)}
                >
                  <option value="all">Todas as Fontes</option>
                  <option value="google_play_mp">Google Play - MP</option>
                  <option value="google_play_ml">Google Play - ML</option>
                  <option value="app_store">App Store</option>
                  <option value="reclame_aqui">Reclame Aqui</option>
                </select>

                {/* Sentiment Filter */}
                <select 
                  className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterSentiment}
                  onChange={(e) => setFilterSentiment(e.target.value as any)}
                >
                  <option value="all">Todos os Sentimentos</option>
                  <option value="positive">Positivo</option>
                  <option value="neutral">Neutro</option>
                  <option value="negative">Negativo</option>
                </select>

                {/* Cluster Filter */}
                <select 
                  className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterCluster}
                  onChange={(e) => setFilterCluster(e.target.value as any)}
                >
                  <option value="all">Todos os Tópicos</option>
                  <option value="meli_plus">Meli+</option>
                  <option value="logistica">Logística</option>
                  <option value="pagamento">Pagamento</option>
                  <option value="usabilidade">Usabilidade</option>
                  <option value="atendimento">Atendimento</option>
                </select>
              </div>
            </div>

            {/* Reviews List */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-4 bg-gray-50 min-h-0">
              <div className="space-y-4">
                {filteredReviews.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Filter className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>Nenhum review encontrado com os filtros selecionados.</p>
                  </div>
                ) : (
                  filteredReviews.map((review) => (
                    <div key={review.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                      
                      {/* Card Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <SourceAvatar source={review.source} />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-700">
                              {getSourceLabel(review.source)}
                            </span>
                            <span className="text-xs text-gray-400">{review.date}</span>
                          </div>
                        </div>
                        <SentimentBadge sentiment={review.sentiment} />
                      </div>

                      {/* Content */}
                      <p className="text-gray-800 text-sm leading-relaxed mb-4">
                        &quot;{review.text}&quot;
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={12} 
                                className={`${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-400">por {review.user}</span>
                        </div>
                        <ClusterBadge cluster={review.cluster} />
                      </div>

                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}

