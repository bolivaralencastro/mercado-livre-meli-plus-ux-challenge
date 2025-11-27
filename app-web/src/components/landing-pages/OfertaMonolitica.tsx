"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Handshake, 
  Bell, 
  ShoppingCart, 
  Truck, 
  Coins, 
  PlayCircle, 
  Shield, 
  Star, 
  Check, 
  X, 
  ChevronDown,
  Play
} from "lucide-react";

// ============ MOVIE DATA ============
const moviesData = {
  disney: [
    "https://image.tmdb.org/t/p/w300/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    "https://image.tmdb.org/t/p/w300/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
    "https://image.tmdb.org/t/p/w300/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    "https://image.tmdb.org/t/p/w300/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    "https://image.tmdb.org/t/p/w300/uJYYizSuA9Y3DCs0qS4qWvHfZg4.jpg",
    "https://image.tmdb.org/t/p/w300/tMefBSflR6PGQLv7WvFPpKLZkyk.jpg",
    "https://image.tmdb.org/t/p/w300/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg",
    "https://image.tmdb.org/t/p/w300/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg",
  ],
  netflix: [
    "https://image.tmdb.org/t/p/w300/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    "https://image.tmdb.org/t/p/w300/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
    "https://image.tmdb.org/t/p/w300/zU0htwkhNvBQdVSIKB9s6vgH84N.jpg",
    "https://image.tmdb.org/t/p/w300/jLLtx3nTRSLGPAKl4RoIv1FbEBr.jpg",
    "https://image.tmdb.org/t/p/w300/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
    "https://image.tmdb.org/t/p/w300/hKHZhUbIyUAjcSrqJThFGYIR6kI.jpg",
  ],
  max: [
    "https://image.tmdb.org/t/p/w300/1E5baAaEse26fej7uHcJ4ZEPZ6F.jpg",
    "https://image.tmdb.org/t/p/w300/u3bZgnGQ9T0P9gEvSl0Oq0k2xRK.jpg",
    "https://image.tmdb.org/t/p/w300/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg",
    "https://image.tmdb.org/t/p/w300/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    "https://image.tmdb.org/t/p/w300/hr0L2aueqlP2BYUblTTjmtn0SOv.jpg",
    "https://image.tmdb.org/t/p/w300/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
  ],
  apple: [
    "https://image.tmdb.org/t/p/w300/vISbjOoy1nwjlb3ioFj2bMZhKnW.jpg",
    "https://image.tmdb.org/t/p/w300/sRLC052ieEzkQs9dEtPMfFxYkej.jpg",
    "https://image.tmdb.org/t/p/w300/fxYazFVeOCHpHwuqGuiqcCTw162.jpg",
    "https://image.tmdb.org/t/p/w300/6KErczPBROQty7QoIsaa6wJYXZi.jpg",
    "https://image.tmdb.org/t/p/w300/mYLOqiStMxDK3fYZFirgrMt8z5d.jpg",
    "https://image.tmdb.org/t/p/w300/suopoADq0k8YZr4dQXcU6pToj6s.jpg",
  ],
};

const allMovies = [
  ...moviesData.disney,
  ...moviesData.netflix,
  ...moviesData.max,
  ...moviesData.apple,
];

// ============ PLAN DATA ============
interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  slug: string;
  monthlyPrice: string;
  annualPrice: string;
  monthlyOriginal?: string;
  annualOriginal?: string;
  monthlyDiscount?: string;
  annualDiscount?: string;
  monthlyPeriod: string;
  annualPeriod: string;
  features: PlanFeature[];
  highlighted?: boolean;
  badge?: string;
}

const plans: Plan[] = [
  {
    name: "ESSENCIAL",
    slug: "essencial",
    monthlyPrice: "R$ 9,90",
    annualPrice: "R$ 8,25",
    annualOriginal: "R$ 9,90",
    annualDiscount: "17% OFF",
    monthlyPeriod: "/mês",
    annualPeriod: "/mês (cobrado anualmente)",
    features: [
      { text: "Frete Grátis Rápido", included: true },
      { text: "Cashback ML", included: true },
      { text: "Conta rendendo 105% CDI", included: true },
      { text: "Caixinhas rendendo 120% CDI", included: true },
      { text: "Disney+", included: false },
      { text: "HBO Max 70% OFF", included: false },
      { text: "Netflix", included: false },
      { text: "Apple TV", included: false },
      { text: "Universal+ 30% OFF", included: false },
      { text: "Paramount+ 30% OFF", included: false },
      { text: "Globoplay 30% OFF", included: false },
    ],
  },
  {
    name: "TOTAL",
    slug: "total",
    monthlyPrice: "R$ 24,90",
    annualPrice: "R$ 20,75",
    annualOriginal: "R$ 24,90",
    annualDiscount: "17% OFF",
    monthlyPeriod: "/mês",
    annualPeriod: "/mês (cobrado anualmente)",
    features: [
      { text: "Frete Grátis Rápido", included: true },
      { text: "Cashback ML", included: true },
      { text: "Conta rendendo 105% CDI", included: true },
      { text: "Caixinhas rendendo 120% CDI", included: true },
      { text: "Disney+", included: true },
      { text: "HBO Max 70% OFF", included: true },
      { text: "Netflix", included: false },
      { text: "Apple TV", included: false },
      { text: "Universal+ 30% OFF", included: false },
      { text: "Paramount+ 30% OFF", included: false },
      { text: "Globoplay 30% OFF", included: false },
    ],
  },
  {
    name: "MEGA",
    slug: "mega",
    monthlyPrice: "R$ 39,90",
    monthlyOriginal: "R$ 74,90",
    monthlyDiscount: "46% OFF",
    annualPrice: "R$ 33,25",
    annualOriginal: "R$ 39,90",
    annualDiscount: "17% OFF",
    monthlyPeriod: "/mês por 2 meses",
    annualPeriod: "/mês (cobrado anualmente)",
    highlighted: true,
    badge: "MAIS POPULAR",
    features: [
      { text: "Frete Grátis Rápido", included: true },
      { text: "Cashback ML (até 3%)", included: true },
      { text: "Cashback Parceiros (até 10%)", included: true },
      { text: "Conta rendendo 105% CDI", included: true },
      { text: "Caixinhas rendendo 120% CDI", included: true },
      { text: "Disney+", included: true },
      { text: "HBO Max", included: true },
      { text: "Netflix", included: true },
      { text: "Apple TV", included: true },
      { text: "Universal+ 30% OFF", included: true },
      { text: "Paramount+ 30% OFF", included: true },
      { text: "Globoplay 30% OFF", included: true },
    ],
  },
];

// ============ TESTIMONIAL DATA ============
interface Testimonial {
  name: string;
  initials: string;
  role: string;
  text: string;
  videoUrl: string;
  avatarBg?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Maria Clara",
    initials: "MC",
    role: "Cliente Nível 6",
    text: '"O frete grátis em compras de R$ 20 já vale muito a pena. Além disso, a integração com o Disney+ funciona perfeitamente."',
    videoUrl: "https://smolljrfjqknp6nm.public.blob.vercel-storage.com/videos/depoimento-maria.webm",
  },
  {
    name: "João Silva",
    initials: "JS",
    role: "Cliente desde 2022",
    text: '"Uso o cartão Mercado Pago e o cashback de 3% nas compras do ML é excelente. O plano Mega se paga sozinho."',
    videoUrl: "https://smolljrfjqknp6nm.public.blob.vercel-storage.com/videos/depoimento-joao.webm",
    avatarBg: "#222",
  },
  {
    name: "Ana Paula",
    initials: "AP",
    role: "Cliente Meli+",
    text: '"Adoro a rapidez da entrega Full. Compro hoje e recebo amanhã, sem pagar frete em produtos baratos."',
    videoUrl: "https://smolljrfjqknp6nm.public.blob.vercel-storage.com/videos/depoimento-ana.webm",
  },
];

// ============ FAQ DATA ============
interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "O que é Meli+?",
    answer: "O Meli+ é o programa de assinatura do Mercado Livre que oferece benefícios exclusivos como frete grátis, descontos em serviços de streaming, cashback e melhores rendimentos no Mercado Pago.",
  },
  {
    question: "Como funciona o Frete Grátis?",
    answer: "Milhares de produtos selecionados possuem o selo Meli+ e contam com frete grátis e rápido. O benefício se aplica a compras a partir de R$ 19 em produtos Full e outros selecionados.",
  },
  {
    question: "Como funciona o Cashback do Cartão Mercado Pago?",
    answer: "Ao utilizar seu cartão de crédito Mercado Pago sendo assinante Meli+, você ganha até 3% de cashback em compras no Mercado Livre, 0,5% em qualquer compra (física ou online) e até 10% em parceiros selecionados.",
  },
  {
    question: "Posso cancelar quando quiser?",
    answer: "Sim! No plano mensal, você pode cancelar a qualquer momento sem multa. No plano anual, você tem desconto no valor, mas fidelidade de 12 meses.",
  },
];

// ============ FOOTER DATA ============
const footerColumns = [
  {
    title: "Sobre o",
    links: ["Mercado Livre", "Investor relations", "Tendências", "Sustentabilidade"],
  },
  {
    title: "Outros sites",
    links: ["Desenvolvedores", "Mercado Pago", "Envios", "Mercado Shops"],
  },
  {
    title: "Contato",
    links: ["Comprar", "Vender", "Solução de problemas"],
  },
  {
    title: "Redes sociais",
    links: ["X", "Facebook", "Instagram", "YouTube"],
  },
  {
    title: "Minha conta",
    links: ["Resumo", "Favoritos", "Vender"],
  },
  {
    title: "Assinaturas",
    links: ["Meli+", "Disney+", "Max"],
  },
];

// ============ COMPONENTS ============

function RevealOnScroll({ 
  children, 
  className = "", 
  direction = "up",
  delay = 0,
  style
}: { 
  children: React.ReactNode; 
  className?: string;
  direction?: "up" | "left" | "right";
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (isVisible) return "translate(0, 0)";
    switch (direction) {
      case "left": return "translateX(-50px)";
      case "right": return "translateX(50px)";
      default: return "translateY(50px)";
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `all 0.8s cubic-bezier(0.5, 0, 0, 1) ${delay}s`,
        ...style
      }}
    >
      {children}
    </div>
  );
}

function BenefitCard({ 
  icon: Icon, 
  title, 
  description,
  delay = 0
}: { 
  icon: React.ElementType; 
  title: string; 
  description: React.ReactNode;
  delay?: number;
}) {
  return (
    <RevealOnScroll delay={delay}>
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-transparent transition-all duration-300 h-full">
        <div className="text-[#2968c8] text-3xl mb-4 transition-transform duration-300 group-hover:scale-110">
          <Icon size={32} />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </RevealOnScroll>
  );
}

function StreamingGridBackground({ 
  isActive, 
  velocityRef 
}: { 
  isActive: boolean; 
  velocityRef: React.MutableRefObject<{x: number, y: number}> 
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const posRef = useRef({ x: -1000, y: -1000 });
  
  const CELL_W = 110;
  const CELL_H = 160;
  const PATTERN_COLS = 6;
  const PATTERN_ROWS = 4;
  const BLOCK_W = PATTERN_COLS * CELL_W;
  const BLOCK_H = PATTERN_ROWS * CELL_H;

  useEffect(() => {
    if (!isActive) return;

    const tick = () => {
      posRef.current.x += velocityRef.current.x;
      posRef.current.y += velocityRef.current.y;

      // Infinite scroll wrapping
      if (posRef.current.x > 0) posRef.current.x -= BLOCK_W;
      if (posRef.current.x < -BLOCK_W) posRef.current.x += BLOCK_W;
      if (posRef.current.y > 0) posRef.current.y -= BLOCK_H;
      if (posRef.current.y < -BLOCK_H) posRef.current.y += BLOCK_H;

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      }

      animationRef.current = requestAnimationFrame(tick);
    };

    animationRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, BLOCK_W, BLOCK_H, velocityRef]);

  // Generate movie grid
  const movieGrid = [];
  // Generate a larger grid to cover the whole section (e.g., 1920x1080+)
  // 20 cols * 110px = 2200px width
  // 10 rows * 160px = 1600px height
  for (let row = -5; row < 15; row++) {
    for (let col = -10; col < 20; col++) {
      const r = ((row % PATTERN_ROWS) + PATTERN_ROWS) % PATTERN_ROWS;
      const c = ((col % PATTERN_COLS) + PATTERN_COLS) % PATTERN_COLS;
      const idx = (r * PATTERN_COLS + c) % allMovies.length;
      
      movieGrid.push({
        id: `${col},${row}`,
        left: col * CELL_W,
        top: row * CELL_H,
        src: allMovies[idx],
      });
    }
  }

  return (
    <div 
      className="absolute inset-0 bg-[#0d0d0d] overflow-hidden transition-opacity duration-500 pointer-events-none"
      style={{ 
        opacity: isActive ? 1 : 0, 
        zIndex: 20 
      }}
    >
      <div ref={trackRef} className="absolute will-change-transform left-1/2 top-1/2">
        {movieGrid.map((movie) => (
          <div
            key={movie.id}
            className="absolute w-[100px] h-[150px] rounded-md bg-[#252525] overflow-hidden"
            style={{ left: movie.left, top: movie.top }}
          >
            <Image
              src={movie.src}
              alt=""
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ))}
      </div>
      {/* Gradient Overlay to fade edges if needed, or just let it fill */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/80 via-transparent to-[#0d0d0d]/80 pointer-events-none" />
    </div>
  );
}

function StreamingCard({ 
  delay = 0,
  onHoverChange,
  velocityRef
}: { 
  delay?: number;
  onHoverChange: (isHovered: boolean) => void;
  velocityRef: React.MutableRefObject<{x: number, y: number}>;
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  const EDGE = 0.25;
  const SPEED = 4;

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverChange(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverChange(false);
    velocityRef.current = { x: 0, y: 0 };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.innerWidth < 900) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width;
    const my = (e.clientY - rect.top) / rect.height;

    let vx = 0, vy = 0;

    if (mx < EDGE) vx = -SPEED * (1 - mx / EDGE);
    else if (mx > 1 - EDGE) vx = SPEED * ((mx - 1 + EDGE) / EDGE);

    if (my < EDGE) vy = -SPEED * (1 - my / EDGE);
    else if (my > 1 - EDGE) vy = SPEED * ((my - 1 + EDGE) / EDGE);

    velocityRef.current = { x: vx, y: vy };
  };

  return (
    <RevealOnScroll 
      delay={delay} 
      className="row-span-2" 
      style={{ zIndex: isHovered ? 50 : "auto", position: "relative" }}
    >
      <div
        className="relative bg-white rounded-xl border border-gray-200 h-full transition-shadow duration-400"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{
          zIndex: isHovered ? 100 : 10,
          boxShadow: isHovered ? "0 20px 60px rgba(0,0,0,0.3)" : undefined,
        }}
      >
        {/* Info Layer - Always on top */}
        <div 
          className="relative p-8 h-full flex flex-col bg-white rounded-xl transition-all duration-500"
          style={{
            zIndex: 10,
            backgroundColor: isHovered ? "rgba(255, 255, 255, 0.95)" : "white",
          }}
        >
          <div className={`text-3xl mb-4 transition-all duration-300 ${isHovered ? "text-[#8e24aa] scale-110" : "text-[#2968c8]"}`}>
            <PlayCircle size={32} />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900">Streaming</h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Disney+, Deezer e outros inclusos. Descontos exclusivos em Max e Paramount+.
          </p>
          
          {/* Streaming Logos */}
          <div className="mt-auto grid grid-cols-2 gap-3">
            {[
              { src: "https://http2.mlstatic.com/resources/frontend/statics/loyal/partners/new_vdp/partner-disney.png", alt: "Disney+" },
              { src: "https://http2.mlstatic.com/resources/frontend/statics/loyal/partners/new_vdp/partner-hbo.png", alt: "HBO Max" },
              { src: "https://http2.mlstatic.com/resources/frontend/statics/loyal/partners/new_vdp/partner-netflix.png", alt: "Netflix" },
              { src: "https://http2.mlstatic.com/resources/frontend/statics/loyal/partners/new_vdp/partner-apple-nov.png", alt: "Apple TV+" },
            ].map((logo) => (
              <div 
                key={logo.alt}
                className="aspect-square rounded-lg border border-gray-200 flex items-center justify-center bg-white shadow-sm"
              >
                <Image 
                  src={logo.src} 
                  alt={logo.alt} 
                  width={60} 
                  height={60} 
                  className="w-[65%] h-[65%] object-contain"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
}

function PlanCard({ plan, isAnnual, index }: { plan: Plan; isAnnual: boolean; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const relativeY = y / rect.height;

    if (relativeY > 0.7) {
      cardRef.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
      return;
    }

    const xRotation = -((y - rect.height / 2) / 20);
    const yRotation = (x - rect.width / 2) / 20;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  };

  const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
  const period = isAnnual ? plan.annualPeriod : plan.monthlyPeriod;
  const originalPrice = isAnnual ? plan.annualOriginal : plan.monthlyOriginal;
  const discount = isAnnual ? plan.annualDiscount : plan.monthlyDiscount;
  const showOriginal = !!originalPrice;

  const direction = index === 0 ? "left" : index === 2 ? "right" : "up";

  return (
    <RevealOnScroll direction={direction} delay={index * 0.1}>
      <div
        ref={cardRef}
        className={`
          bg-white rounded-2xl p-8 shadow-lg text-left relative flex flex-col h-full
          border-2 transition-all duration-400 hover:z-10
          ${plan.highlighted 
            ? "border-[#8e24aa] bg-gradient-to-b from-white to-[#fbf6ff]" 
            : "border-transparent hover:border-[#3483fa]/30"
          }
        `}
        style={{
          boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {plan.badge && (
          <div className="absolute -top-3 right-5 bg-[#ff5a5f] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-bounce">
            {plan.badge}
          </div>
        )}

        {/* Header */}
        <div className="bg-gray-100 inline-flex items-center px-4 py-1.5 rounded-full mb-4 w-fit">
          <span className="text-[#8e24aa] font-black italic mr-1">meli+</span>
          <span className="mx-1">|</span>
          <span className="font-extrabold text-xs tracking-wider">{plan.name}</span>
        </div>

        {/* Price */}
        <div className={`text-sm text-gray-400 mb-0.5 min-h-[20px] ${!showOriginal && "invisible"}`}>
          {showOriginal && (
            <>
              <span className="line-through">{originalPrice}</span>
              <span className="ml-2 text-green-600 font-bold bg-green-100 px-1.5 py-0.5 rounded text-xs no-underline">
                {discount}
              </span>
            </>
          )}
        </div>
        <div className="text-[42px] font-extrabold text-black leading-none tracking-tight">
          {price}
        </div>
        <div className="text-sm text-gray-600 mt-1 mb-6">{period}</div>

        {/* Features */}
        <div className="flex-1 mb-6 space-y-3">
          {plan.features.map((feature, i) => (
            <div 
              key={i} 
              className={`flex items-center text-sm ${feature.included ? "text-gray-800" : "text-gray-400"}`}
            >
              {feature.included ? (
                <Check className="w-4 h-4 mr-2.5 text-green-600" />
              ) : (
                <X className="w-4 h-4 mr-2.5 text-gray-300" />
              )}
              {feature.text}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button className="w-full py-3.5 bg-gradient-to-b from-[#65a5ff] to-[#3483fa] text-white font-semibold rounded-md shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] transition-all duration-300">
          Assinar Meli+ {plan.name.charAt(0) + plan.name.slice(1).toLowerCase()}
        </button>
      </div>
    </RevealOnScroll>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Error playing video:", error);
      }
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoClick = () => {
    if (videoRef.current && !videoRef.current.paused) {
      handlePause();
    }
  };

  return (
    <RevealOnScroll delay={index * 0.1}>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:-translate-y-1 transition-transform duration-300">
        {/* Video */}
        <div className="relative aspect-video bg-black">
          <video
            ref={videoRef}
            className="w-full h-full object-cover cursor-pointer"
            playsInline
            preload="metadata"
            onClick={handleVideoClick}
            onEnded={() => setIsPlaying(false)}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
          >
            <source src={testimonial.videoUrl} type="video/webm" />
            <source src={testimonial.videoUrl.replace('.webm', '.mp4')} type="video/mp4" />
            Seu navegador não suporta vídeos.
          </video>
          {!isPlaying && (
            <button
              onClick={handlePlay}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:scale-110 hover:bg-black/50 transition-all duration-300"
            >
              <Play className="w-5 h-5 text-white/90 ml-0.5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-orange-500 text-sm mb-4 tracking-widest">★★★★★</div>
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white"
              style={{ background: testimonial.avatarBg || "linear-gradient(135deg, #333, #666)" }}
            >
              {testimonial.initials}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
              <span className="text-xs text-gray-500">{testimonial.role}</span>
            </div>
          </div>
          <p className="text-sm italic text-gray-600 leading-relaxed">{testimonial.text}</p>
        </div>
      </div>
    </RevealOnScroll>
  );
}

function AccordionItem({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-gray-300">
      <button
        onClick={onToggle}
        className="w-full text-left py-6 px-5 flex justify-between items-center text-[17px] font-semibold text-gray-800 outline-none hover:bg-transparent"
      >
        {item.question}
        <ChevronDown 
          className={`w-4 h-4 text-gray-500 transition-transform duration-400 ${isOpen ? "rotate-180 text-[#3483fa]" : ""}`}
        />
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-400"
        style={{ maxHeight: isOpen ? contentRef.current?.scrollHeight : 0 }}
      >
        <p className="px-5 pb-6 text-gray-600 text-[15px] leading-relaxed">{item.answer}</p>
      </div>
    </div>
  );
}

// ============ MAIN COMPONENT ============
export default function OfertaMonoliticaPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [openFaq, setOpenFaq] = useState<number>(0);
  const ctaVideoRef = useRef<HTMLVideoElement>(null);
  const ctaSectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);
  
  // Streaming Card State
  const [isStreamingHovered, setIsStreamingHovered] = useState(false);
  const velocityRef = useRef({ x: 0, y: 0 });

  // Parallax effect - works both in standalone and in viewer container
  useEffect(() => {
    const handleScroll = (e?: Event) => {
      // Get scroll position from event target or window
      const target = e?.target as HTMLElement;
      const scrollTop = target?.scrollTop ?? window.scrollY ?? 0;
      setScrollY(scrollTop);
    };

    // Listen to window scroll (standalone mode)
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Find parent scrollable container (viewer mode)
    // The component is rendered inside a div with overflow-y-auto
    let scrollContainer: Element | null = null;
    const checkParent = (el: HTMLElement | null): Element | null => {
      if (!el || el === document.body) return null;
      const style = window.getComputedStyle(el);
      if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
        return el;
      }
      return checkParent(el.parentElement);
    };
    
    // Start from the component's root
    const root = document.querySelector('.min-h-screen.bg-gradient-to-b');
    if (root) {
      scrollContainer = checkParent(root.parentElement as HTMLElement);
    }
    
    scrollContainer?.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // CTA Video autoplay
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && ctaVideoRef.current) {
          ctaVideoRef.current.play().catch(() => {
            // Autoplay blocked, that's ok for background video
          });
        }
      },
      { threshold: 0.3 }
    );

    if (ctaSectionRef.current) {
      observer.observe(ctaSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-x-hidden">
      {/* Header */}
      <header className="bg-[#fff159] py-2.5 sticky top-0 z-[1000] shadow-sm">
        <div className="max-w-[1200px] mx-auto px-5 flex items-center justify-between gap-5">
          <div className="flex items-center gap-1.5 text-[#2d3277] font-extrabold text-[22px] lowercase tracking-tight cursor-pointer hover:scale-105 transition-transform">
            <Handshake className="w-6 h-6" />
            <span>mercado<br />livre</span>
          </div>
          
          <div className="flex-1 max-w-[600px]">
            <input
              type="text"
              placeholder="Buscar produtos, marcas e muito mais..."
              className="w-full py-2.5 px-4 border-none rounded-sm shadow-sm text-sm outline-none focus:shadow-md transition-shadow"
            />
          </div>

          <nav className="flex items-center gap-5 text-sm text-gray-800">
            {["Categorias", "Ofertas", "Vender", "Contato"].map((item) => (
              <span key={item} className="cursor-pointer relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-gray-800 after:transition-all hover:after:w-full">
                {item}
              </span>
            ))}
            <Bell className="w-5 h-5 cursor-pointer hover:text-[#2968c8] hover:scale-110 transition-all" />
            <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-[#2968c8] hover:scale-110 transition-all" />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 pb-12 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-5 flex items-center justify-between gap-8">
          <RevealOnScroll direction="left" className="flex-1 max-w-[500px] z-[2] flex-shrink-0">
            <div className="bg-[#8e24aa] text-white px-3 py-1 rounded-full font-black italic inline-block mb-5 text-xl shadow-lg animate-[float_3s_ease-in-out_infinite]">
              meli+
            </div>
            <h3 className="text-2xl font-normal text-gray-600 mb-1">Assine Meli+</h3>
            <h1 className="text-[62px] leading-none mb-4 font-black text-gray-900">
              Gaste menos<br />
              <span className="text-[#8e24aa]">e receba muito+</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Frete grátis, cashback e os melhores streamings reunidos.
            </p>
            <Link
              href="#planos"
              className="inline-block bg-gradient-to-b from-[#65a5ff] to-[#3483fa] text-white px-8 py-4 rounded-md font-semibold shadow-lg hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
            >
              Assinar com até 46% OFF
            </Link>
          </RevealOnScroll>

          <RevealOnScroll direction="right" className="flex-shrink-0">
            <div 
              className="w-[700px] h-[600px] bg-contain bg-center bg-no-repeat -rotate-[5deg] pointer-events-none"
              style={{ 
                backgroundImage: "url('https://smolljrfjqknp6nm.public.blob.vercel-storage.com/assets/product-image.webp')",
                transform: `rotate(-5deg) translateY(${-scrollY * 0.05}px)`,
              }}
            />
          </RevealOnScroll>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 text-center relative overflow-visible">
        <StreamingGridBackground isActive={isStreamingHovered} velocityRef={velocityRef} />
        
        {/* Piggy Bank Decoration */}
        <div 
          className="absolute left-[-20px] w-[400px] h-[400px] bg-contain bg-center bg-no-repeat z-[100] pointer-events-none opacity-100 md:opacity-100 max-md:opacity-20 max-md:scale-50 max-md:left-[-150px]"
          style={{ 
            backgroundImage: "url('https://smolljrfjqknp6nm.public.blob.vercel-storage.com/assets/piggy-bank-image.webp')",
            bottom: '-120px',
            transform: `translateY(${scrollY * 0.1}px) scaleX(-1)`,
          }}
        />
        
        <div className="max-w-[1200px] mx-auto px-5 relative">
          <RevealOnScroll>
            <h2 className="text-4xl font-semibold text-gray-900 mb-3">São muitos benefícios para você</h2>
            <p className="text-gray-600 mb-12">Descubra tudo que você ganha ao assinar Meli+</p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <BenefitCard
              icon={Truck}
              title="Frete Grátis Rápido"
              description={<>Em milhões de produtos <strong>a partir de R$ 19</strong>. Economize no frete em todas as suas compras.</>}
              delay={0.1}
            />
            <BenefitCard
              icon={Coins}
              title="Cashback ML"
              description="Receba parte do valor de volta em créditos (Meli Dólar) para usar em novas compras."
              delay={0.2}
            />
            <StreamingCard 
              delay={0.3} 
              onHoverChange={setIsStreamingHovered}
              velocityRef={velocityRef}
            />
            <BenefitCard
              icon={Shield}
              title="Segurança"
              description="Compra Garantida: receba o produto que está esperando ou devolvemos o dinheiro."
              delay={0.1}
            />
            <BenefitCard
              icon={Star}
              title="Ofertas VIP"
              description="Acesso antecipado a ofertas relâmpago e descontos exclusivos em datas especiais."
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planos" className="py-20 relative overflow-visible">
        {/* Delivery Man Decoration */}
        <div 
          className="absolute right-[-72px] w-[400px] h-[500px] z-[100] pointer-events-none opacity-100 md:opacity-100 max-md:opacity-20 max-md:scale-50 max-md:right-[-150px]"
          style={{ bottom: '-200px', transform: `translateY(${scrollY * 0.08}px)` }}
        >
          <div 
            className="w-full h-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: "url('https://smolljrfjqknp6nm.public.blob.vercel-storage.com/assets/entregador.webp')" }}
          />
        </div>
        
        <div className="max-w-[1200px] mx-auto px-5 relative z-[2] text-center">
          <RevealOnScroll>
            <h2 className="text-4xl font-semibold text-gray-900 mb-3">Escolha o plano ideal para você</h2>
            <p className="text-gray-600 mb-8">Economia garantida em todos os períodos</p>

            {/* Toggle */}
            <div className="inline-block mb-12">
              <div className="bg-gray-300 rounded-full p-1 flex shadow-inner">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-8 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                    billingCycle === "monthly" 
                      ? "bg-white text-gray-800 shadow-md scale-105" 
                      : "text-gray-600"
                  }`}
                >
                  Mensal
                </button>
                <button
                  onClick={() => setBillingCycle("annual")}
                  className={`px-8 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                    billingCycle === "annual" 
                      ? "bg-white text-gray-800 shadow-md scale-105" 
                      : "text-gray-600"
                  }`}
                >
                  Anual
                </button>
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
            {plans.map((plan, i) => (
              <PlanCard key={plan.slug} plan={plan} isAnnual={billingCycle === "annual"} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative overflow-visible">
        <div className="max-w-[1200px] mx-auto px-5 relative z-[2]">
          <RevealOnScroll>
            <h2 className="text-4xl font-semibold text-gray-900 mb-3 text-center">O que dizem nossos assinantes</h2>
            <p className="text-gray-600 mb-12 text-center">Milhares de pessoas já aproveitam os benefícios</p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={ctaSectionRef}
        className="relative min-h-screen flex flex-col items-center justify-between bg-black overflow-hidden"
      >
        <video
          ref={ctaVideoRef}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover z-[1]"
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="https://smolljrfjqknp6nm.public.blob.vercel-storage.com/videos/logo-meli-animacao.webm" type="video/webm" />
          <source src="https://smolljrfjqknp6nm.public.blob.vercel-storage.com/videos/logo-meli-animacao.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60 z-[2] pointer-events-none" />

        <RevealOnScroll className="relative z-10 pt-16 text-center">
          <h2 className="text-5xl font-extrabold text-white mb-4 drop-shadow-2xl">Tenha seu Meli+</h2>
          <p className="text-white/90">E comece a aproveitar todos os benefícios agora mesmo</p>
        </RevealOnScroll>

        <div className="flex-1" />

        <RevealOnScroll className="relative z-10 pb-16">
          <button className="bg-gradient-to-b from-[#65a5ff] to-[#3483fa] text-white px-16 py-5 text-lg rounded-md font-semibold shadow-lg hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
            Quero ser Meli+
          </button>
        </RevealOnScroll>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-200">
        <div className="max-w-[1200px] mx-auto px-5">
          <RevealOnScroll>
            <h2 className="text-2xl font-extrabold text-gray-700 text-center mb-12 uppercase tracking-wider">
              Perguntas Frequentes
            </h2>

            <div className="max-w-[800px] mx-auto">
              {faqItems.map((item, i) => (
                <AccordionItem
                  key={i}
                  item={item}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                />
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 text-sm text-gray-500 border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-10">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h5 className="text-gray-800 font-semibold mb-4">{col.title}</h5>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-gray-800 hover:underline transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-6 text-xs">
            <p>Copyright © 1999-2025 Ebazar.com.br LTDA.</p>
            <p>CNPJ n.º 03.007.331/0001-41 / Av. das Nações Unidas, nº 3.003, Bonfim, Osasco/SP - CEP 06233-903</p>
          </div>
        </div>
      </footer>

      {/* Float Animation Keyframes */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}
