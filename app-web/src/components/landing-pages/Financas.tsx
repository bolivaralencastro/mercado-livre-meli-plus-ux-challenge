'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from "next/image";
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
  Play,
  Menu,
  TrendingUp,
  CreditCard,
  Wallet
} from "lucide-react";
import styles from './Financas.module.css';

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
    name: "Carlos Eduardo",
    initials: "CE",
    role: "Investidor Iniciante",
    text: '"Meu dinheiro rende muito mais que na poupança. A diferença no final do mês é enorme."',
    videoUrl: "https://smolljrfjqknp6nm.public.blob.vercel-storage.com/videos/depoimento-joao.webm", // Reusing video for demo
  },
  {
    name: "Fernanda Lima",
    initials: "FL",
    role: "Cliente Meli+",
    text: '"O cashback do cartão paga minha mensalidade. É como ter o plano de graça."',
    videoUrl: "https://smolljrfjqknp6nm.public.blob.vercel-storage.com/videos/depoimento-maria.webm", // Reusing video for demo
    avatarBg: "#222",
  },
  {
    name: "Roberto Santos",
    initials: "RS",
    role: "Cliente desde 2020",
    text: '"Uso as caixinhas para guardar dinheiro para viajar e rende bem mais que o banco tradicional."',
    videoUrl: "https://smolljrfjqknp6nm.public.blob.vercel-storage.com/videos/depoimento-ana.webm", // Reusing video for demo
  },
];

// ============ FAQ DATA ============
interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "Como funciona o rendimento de 120% do CDI?",
    answer: "Ao guardar seu dinheiro nas Caixinhas do Mercado Pago, ele rende automaticamente 120% do CDI todos os dias úteis, superando a poupança.",
  },
  {
    question: "O que é Meli Dólar?",
    answer: "É a criptomoeda do Mercado Livre. Você ganha cashback em Meli Dólar e pode usar para fazer novas compras ou converter para reais.",
  },
  {
    question: "Preciso pagar anuidade do cartão?",
    answer: "Não! O cartão de crédito Mercado Pago é totalmente livre de anuidade, independente dos seus gastos mensais.",
  },
  {
    question: "O dinheiro tem liquidez diária?",
    answer: "Sim, você pode resgatar o dinheiro das suas Caixinhas a qualquer momento, 24 horas por dia, 7 dias por semana.",
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

        <div className="bg-gray-100 inline-flex items-center px-4 py-1.5 rounded-full mb-4 w-fit">
          <span className="text-[#8e24aa] font-black italic mr-1">meli+</span>
          <span className="mx-1">|</span>
          <span className="font-extrabold text-xs tracking-wider">{plan.name}</span>
        </div>

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

        <a
          href="https://www.mercadolivre.com.br/assinaturas/melimais/planos?plan_selected=MEGA#origin=redirect-vdp-meliplus"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3.5 bg-gradient-to-b from-[#65a5ff] to-[#3483fa] text-white font-semibold rounded-md shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] transition-all duration-300 text-center"
        >
          Assinar Meli+ {plan.name.charAt(0) + plan.name.slice(1).toLowerCase()}
        </a>
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

export default function FinancasPage() {
  const [sliderValue, setSliderValue] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [openFaq, setOpenFaq] = useState<number>(0);
  const ctaVideoRef = useRef<HTMLVideoElement>(null);
  const ctaSectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);

  const ratePoupYear = 0.0617;
  const rateMeliYear = 0.135;

  const P = sliderValue;
  const fvPoup = P * (1 + ratePoupYear);
  const fvMeli = P * (1 + rateMeliYear);
  const gainP = fvPoup - P;
  const gainM = fvMeli - P;
  const extra = gainM - gainP;

  const fmtMoney = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(parseInt(e.target.value));
    setIsRevealed(false);
  };

  useEffect(() => {
    const handleScroll = (e?: Event) => {
      const target = e?.target as HTMLElement;
      const scrollTop = target?.scrollTop ?? window.scrollY ?? 0;
      setScrollY(scrollTop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    let scrollContainer: Element | null = null;
    const checkParent = (el: HTMLElement | null): Element | null => {
      if (!el || el === document.body) return null;
      const style = window.getComputedStyle(el);
      if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
        return el;
      }
      return checkParent(el.parentElement);
    };
    
    const root = document.querySelector(`.${styles.container}`);
    if (root) {
      scrollContainer = checkParent(root.parentElement as HTMLElement);
    }
    
    scrollContainer?.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && ctaVideoRef.current) {
          ctaVideoRef.current.play().catch(() => {});
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
    <div className={styles.container}>
      <div className={styles.heroWrapper}>
        <div className={styles.heroGrid}>
          
          {/* Left Content */}
          <div className={styles.heroLeft}>
            <div className={styles.logoLockup}>
              <span className={styles.logoPart}>meli+</span>
              <span className={styles.planPart}>TOTAL</span>
            </div>
            
            <h1 className={styles.heroTitle}>
              Seu dinheiro parado <br />
              está <span className={styles.highlightNegative}>rendendo menos</span> <br />
              do que deveria.
            </h1>
            
            <p className={styles.subH}>
              Com o Meli+, ele rende até <strong>120% do CDI</strong> em cofres e 105% no saldo da conta.
            </p>
            
            <div className={styles.bonusBlock}>
              <span className={`material-icons-round ${styles.bonusIcon}`}>local_shipping</span>
              <div className={styles.bonusText}>
                <strong>Bônus incluso:</strong>
                <span>Frete Grátis em milhões de produtos.</span>
              </div>
            </div>
          </div>

          {/* Right Content: ROI Simulator */}
          <div className={styles.heroRight}>
            <div className={`${styles.simCard} ${isRevealed ? styles.cardRevealed : ''}`} id="card-roi">
              <div className={styles.cardTop}>
                <div className={styles.titleRow}>
                  <h3 className={styles.title}>Rendimento</h3>
                  <div className={styles.tooltipTrigger}>
                    <span className="material-icons-round" style={{ fontSize: '18px' }}>info</span>
                    <div className={styles.tooltipBox}>
                      <strong>Cálculo projetado para 1 ano (12 meses):</strong><br />
                      • Poupança: ~6,17% a.a.<br />
                      • Meli+ (120% CDI): ~13,5% a.a.<br />
                      *Considerando taxa CDI atual. Limite de simulação: R$ 10.000.
                    </div>
                  </div>
                </div>
                <p className={styles.subtitle}>Quanto dinheiro fica parado na sua conta rendendo pouco?</p>

                <div className={styles.displayArea}>
                  <span className={`${styles.statusBadge} ${sliderValue === 0 ? styles.statusBadgeNeutral : styles.statusBadgeNeutral}`}>
                    {sliderValue === 0 ? 'SEM MELI+' : 'SEM MELI+'}
                  </span>
                  <div className={`${styles.priceValue} ${sliderValue === 0 ? styles.priceValueNeutral : ''}`}>
                    {sliderValue === 0 ? '+ R$ 0,00' : `+ ${fmtMoney(gainP)}`}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                    Saldo: <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{fmtMoney(sliderValue)}</span>
                  </div>
                </div>
              </div>

              <div className={styles.sliderArea}>
                <input 
                  type="range" 
                  min="0" 
                  max="10000" 
                  step="100" 
                  value={sliderValue} 
                  onChange={handleSliderChange}
                />
              </div>

              <button 
                className={styles.ctaBtn} 
                onClick={() => setIsRevealed(true)} 
                disabled={sliderValue === 0}
              >
                <span className="material-icons-round" style={{ marginRight: '8px' }}>trending_up</span>
                Ver ganho com Meli+
              </button>

              <div className={styles.revealOverlay}>
                <button className={styles.closeReveal} onClick={() => setIsRevealed(false)}>
                  <span className="material-icons-round">close</span>
                </button>
                <span className={styles.revealTag}>COM MELI+ (120% CDI)</span>
                <div className={styles.revealPrice}>{fmtMoney(gainM)}</div>
                <p className={styles.revealSub}>Rendimento total em 1 ano</p>
                <div className={styles.savingsBadgeSim}>
                  <span className={styles.savingsLabel}>Ganho extra com Meli+</span>
                  <span className={styles.savingsValueSim}>+ {fmtMoney(extra)}</span>
                </div>
                <button className={styles.revealCta}>
                  Potencializar meus ganhos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-16 text-center relative overflow-visible bg-white">
        <div className="max-w-[1200px] mx-auto px-5 relative">
          <RevealOnScroll>
            <h2 className="text-4xl font-semibold text-gray-900 mb-3">Seu dinheiro vale mais</h2>
            <p className="text-gray-600 mb-12">Rendimentos e benefícios exclusivos</p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <BenefitCard
              icon={TrendingUp}
              title="Rendimento Superior"
              description="105% do CDI na conta e 120% nas Caixinhas. Mais que a poupança."
              delay={0.1}
            />
            <BenefitCard
              icon={Coins}
              title="Cashback em Dobro"
              description="Ganhe Meli Dólar em suas compras e use como quiser no Mercado Livre."
              delay={0.2}
            />
            <BenefitCard
              icon={CreditCard}
              title="Cartão Mercado Pago"
              description="Até 3% de cashback em compras no ML e anuidade grátis."
              delay={0.1}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planos" className="py-20 relative overflow-visible bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-5 relative z-[2] text-center">
          <RevealOnScroll>
            <h2 className="text-4xl font-semibold text-gray-900 mb-3">Escolha o plano ideal para você</h2>
            <p className="text-gray-600 mb-8">Economia garantida em todos os períodos</p>

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
      <section className="py-20 relative overflow-visible bg-white">
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
          <a
            href="https://www.mercadolivre.com.br/assinaturas/melimais/planos?plan_selected=MEGA#origin=redirect-vdp-meliplus"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-b from-[#65a5ff] to-[#3483fa] text-white px-16 py-5 text-lg rounded-md font-semibold shadow-lg hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
          >
            Quero ser Meli+
          </a>
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
    </div>
  );
}
