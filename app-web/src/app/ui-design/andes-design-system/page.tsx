"use client";

import React, { useState } from "react";
import "./andes-design-tokens.css";

// Importando componentes existentes
import AndesButton from "@/components/ui/AndesButton";
import AndesBadge from "@/components/ui/AndesBadge";
import AndesInput from "@/components/ui/AndesInput";
import AndesCard from "@/components/ui/AndesCard";
import AndesGridCard from "@/components/ui/AndesGridCard";
import AndesPdpCard from "@/components/ui/AndesPdpCard";
import AndesAuthList from "@/components/ui/AndesAuthList";
import AndesAuthItem from "@/components/ui/AndesAuthItem";
import AndesUserPill from "@/components/ui/AndesUserPill";
import AndesPayRow from "@/components/ui/AndesPayRow";
import AndesSummaryCard from "@/components/ui/AndesSummaryCard";
import AndesMeliCard from "@/components/ui/AndesMeliCard";
import AndesThematicCard from "@/components/ui/AndesThematicCard";
import AndesCategoriesMosaic from "@/components/ui/AndesCategoriesMosaic";
import AndesCategoryCard from "@/components/ui/AndesCategoryCard";
import AndesMoney from "@/components/ui/AndesMoney";
import AndesLoadingContainer from "@/components/ui/AndesLoadingContainer";
import AndesSpinner from "@/components/ui/AndesSpinner";
import AndesModal from "@/components/ui/AndesModal";
import AndesOnboardingModal from "@/components/ui/AndesOnboardingModal";
import AndesCarousel from "@/components/ui/AndesCarousel";

// SVG Placeholder
const PlaceholderSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" fill="#d3d3d3" />
    <circle cx="200" cy="150" r="50" fill="#999999" />
    <path d="M 120 200 L 280 200 L 280 220 L 120 220 Z" fill="#999999" />
    <text x="200" y="260" textAnchor="middle" fill="#666666" fontSize="16" fontFamily="Arial">Imagem</text>
  </svg>
);

export default function AndesDesignSystemPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="andes-ds-container" style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--andes-bg-page)", fontFamily: "var(--andes-font-family)" }}>
      {/* SIDEBAR DE NAVEGAÇÃO */}
      <nav className="docs-sidebar" style={{ width: "250px", background: "var(--andes-neutral-800)", color: "var(--andes-neutral-0)", padding: "var(--andes-spacing-xl)", position: "fixed", height: "100%", overflowY: "auto" }}>
        <div className="docs-logo" style={{ fontSize: "var(--andes-font-size-l)", fontWeight: 700, marginBottom: "var(--andes-spacing-xxxl)", color: "var(--andes-primary)", display: "flex", alignItems: "center", gap: "var(--andes-spacing-s)" }}>
          <svg width="30" height="20" viewBox="0 0 50 34" fill="currentColor">
            <path d="M32.6 22.4C32.6 26.7 30.5 28.3 27.7 28.3C25.5 28.3 24.3 27 23.7 25.9L23.6 25.9V28H19.5V13.3H23.6V15.6L23.7 15.6C24.5 14.2 25.8 13 28 13C31.2 13 32.6 15.2 32.6 19V22.4ZM28.5 19.2C28.5 17.3 27.8 16.1 26 16.1C24.4 16.1 23.6 17.3 23.6 19.3V22.1C23.6 23.9 24.3 25.2 26 25.2C27.7 25.2 28.5 24 28.5 22.2V19.2Z" />
          </svg>
          Andes UI
        </div>
        <div className="docs-nav">
          <strong style={{ display: "block", marginTop: "var(--andes-spacing-xl)", marginBottom: "var(--andes-spacing-s)", fontSize: "var(--andes-font-size-xs)", textTransform: "uppercase", letterSpacing: "1px", color: "var(--andes-primary)" }}>Foundation</strong>
          <a onClick={() => scrollToSection("tokens-colors")} style={{ display: "block", padding: "var(--andes-spacing-s)", color: "rgba(255,255,255,0.7)", textDecoration: "none", borderRadius: "var(--andes-radius-s)", marginBottom: "var(--andes-spacing-xs)", cursor: "pointer", transition: "var(--andes-transition)" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>Cores</a>
          <a onClick={() => scrollToSection("tokens-typography")} style={{ display: "block", padding: "var(--andes-spacing-s)", color: "rgba(255,255,255,0.7)", textDecoration: "none", borderRadius: "var(--andes-radius-s)", marginBottom: "var(--andes-spacing-xs)", cursor: "pointer", transition: "var(--andes-transition)" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>Tipografia</a>
          <a onClick={() => scrollToSection("tokens-spacing")} style={{ display: "block", padding: "var(--andes-spacing-s)", color: "rgba(255,255,255,0.7)", textDecoration: "none", borderRadius: "var(--andes-radius-s)", marginBottom: "var(--andes-spacing-xs)", cursor: "pointer", transition: "var(--andes-transition)" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>Espaçamento</a>
          <a onClick={() => scrollToSection("tokens-radius")} style={{ display: "block", padding: "var(--andes-spacing-s)", color: "rgba(255,255,255,0.7)", textDecoration: "none", borderRadius: "var(--andes-radius-s)", marginBottom: "var(--andes-spacing-xs)", cursor: "pointer", transition: "var(--andes-transition)" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>Bordas</a>
          <a onClick={() => scrollToSection("tokens-shadows")} style={{ display: "block", padding: "var(--andes-spacing-s)", color: "rgba(255,255,255,0.7)", textDecoration: "none", borderRadius: "var(--andes-radius-s)", marginBottom: "var(--andes-spacing-xs)", cursor: "pointer", transition: "var(--andes-transition)" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>Sombras</a>

          <strong style={{ display: "block", marginTop: "var(--andes-spacing-xl)", marginBottom: "var(--andes-spacing-s)", fontSize: "var(--andes-font-size-xs)", textTransform: "uppercase", letterSpacing: "1px", color: "var(--andes-primary)" }}>Atoms</strong>
          <a onClick={() => scrollToSection("buttons")} style={{ display: "block", padding: "var(--andes-spacing-s)", color: "rgba(255,255,255,0.7)", textDecoration: "none", borderRadius: "var(--andes-radius-s)", marginBottom: "var(--andes-spacing-xs)", cursor: "pointer", transition: "var(--andes-transition)" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>Botões</a>
          <a onClick={() => scrollToSection("badges")} style={{ display: "block", padding: "var(--andes-spacing-s)", color: "rgba(255,255,255,0.7)", textDecoration: "none", borderRadius: "var(--andes-radius-s)", marginBottom: "var(--andes-spacing-xs)", cursor: "pointer", transition: "var(--andes-transition)" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>Badges & Status</a>
          <a onClick={() => scrollToSection("inputs")} style={{ display: "block", padding: "var(--andes-spacing-s)", color: "rgba(255,255,255,0.7)", textDecoration: "none", borderRadius: "var(--andes-radius-s)", marginBottom: "var(--andes-spacing-xs)", cursor: "pointer", transition: "var(--andes-transition)" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>Formulários</a>
          <a onClick={() => scrollToSection("feedback")} style={{ display: "block", padding: "var(--andes-spacing-s)", color: "rgba(255,255,255,0.7)", textDecoration: "none", borderRadius: "var(--andes-radius-s)", marginBottom: "var(--andes-spacing-xs)", cursor: "pointer", transition: "var(--andes-transition)" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>Loaders</a>

          <strong style={{ display: "block", marginTop: "var(--andes-spacing-xl)", marginBottom: "var(--andes-spacing-s)", fontSize: "var(--andes-font-size-xs)", textTransform: "uppercase", letterSpacing: "1px", color: "var(--andes-primary)" }}>Molecules</strong>
          <a onClick={() => scrollToSection("product-cards")} style={{ display: "block", padding: "var(--andes-spacing-s)", color: "rgba(255,255,255,0.7)", textDecoration: "none", borderRadius: "var(--andes-radius-s)", marginBottom: "var(--andes-spacing-xs)", cursor: "pointer", transition: "var(--andes-transition)" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>Cards de Produto</a>
          <a onClick={() => scrollToSection("thematic-cards")} style={{ display: "block", padding: "var(--andes-spacing-s)", color: "rgba(255,255,255,0.7)", textDecoration: "none", borderRadius: "var(--andes-radius-s)", marginBottom: "var(--andes-spacing-xs)", cursor: "pointer", transition: "var(--andes-transition)" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>Cards Temáticos</a>
          <a onClick={() => scrollToSection("pricing")} style={{ display: "block", padding: "var(--andes-spacing-s)", color: "rgba(255,255,255,0.7)", textDecoration: "none", borderRadius: "var(--andes-radius-s)", marginBottom: "var(--andes-spacing-xs)", cursor: "pointer", transition: "var(--andes-transition)" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>Preços e Descontos</a>
          <a onClick={() => scrollToSection("auth")} style={{ display: "block", padding: "var(--andes-spacing-s)", color: "rgba(255,255,255,0.7)", textDecoration: "none", borderRadius: "var(--andes-radius-s)", marginBottom: "var(--andes-spacing-xs)", cursor: "pointer", transition: "var(--andes-transition)" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>Autenticação</a>
          <a onClick={() => scrollToSection("checkout")} style={{ display: "block", padding: "var(--andes-spacing-s)", color: "rgba(255,255,255,0.7)", textDecoration: "none", borderRadius: "var(--andes-radius-s)", marginBottom: "var(--andes-spacing-xs)", cursor: "pointer", transition: "var(--andes-transition)" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>Checkout & Pagamento</a>

          <strong style={{ display: "block", marginTop: "var(--andes-spacing-xl)", marginBottom: "var(--andes-spacing-s)", fontSize: "var(--andes-font-size-xs)", textTransform: "uppercase", letterSpacing: "1px", color: "var(--andes-primary)" }}>Organisms</strong>
          <a onClick={() => scrollToSection("meli-plus")} style={{ display: "block", padding: "var(--andes-spacing-s)", color: "rgba(255,255,255,0.7)", textDecoration: "none", borderRadius: "var(--andes-radius-s)", marginBottom: "var(--andes-spacing-xs)", cursor: "pointer", transition: "var(--andes-transition)" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>Planos Meli+</a>
          <a onClick={() => scrollToSection("categories")} style={{ display: "block", padding: "var(--andes-spacing-s)", color: "rgba(255,255,255,0.7)", textDecoration: "none", borderRadius: "var(--andes-radius-s)", marginBottom: "var(--andes-spacing-xs)", cursor: "pointer", transition: "var(--andes-transition)" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>Categorias</a>
          <a onClick={() => scrollToSection("modals")} style={{ display: "block", padding: "var(--andes-spacing-s)", color: "rgba(255,255,255,0.7)", textDecoration: "none", borderRadius: "var(--andes-radius-s)", marginBottom: "var(--andes-spacing-xs)", cursor: "pointer", transition: "var(--andes-transition)" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>Modais</a>
          <a onClick={() => scrollToSection("onboarding")} style={{ display: "block", padding: "var(--andes-spacing-s)", color: "rgba(255,255,255,0.7)", textDecoration: "none", borderRadius: "var(--andes-radius-s)", marginBottom: "var(--andes-spacing-xs)", cursor: "pointer", transition: "var(--andes-transition)" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>Onboarding</a>
          <a onClick={() => scrollToSection("carousel")} style={{ display: "block", padding: "var(--andes-spacing-s)", color: "rgba(255,255,255,0.7)", textDecoration: "none", borderRadius: "var(--andes-radius-s)", marginBottom: "var(--andes-spacing-xs)", cursor: "pointer", transition: "var(--andes-transition)" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>Carrossel</a>
        </div>
      </nav>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="docs-main" style={{ marginLeft: "250px", padding: "var(--andes-spacing-xxxl) var(--andes-spacing-xl)", width: "100%" }}>

        {/* SEÇÃO: TOKENS - CORES */}
        <div id="tokens-colors" className="docs-section" style={{ marginBottom: "var(--andes-spacing-xxxl)", borderBottom: "1px solid var(--andes-neutral-200)", paddingBottom: "var(--andes-spacing-xxxl)" }}>
          <h2 className="docs-section-title" style={{ fontSize: "var(--andes-font-size-xxl)", marginBottom: "var(--andes-spacing-xl)", fontWeight: 300, color: "var(--andes-neutral-600)" }}>Paleta de Cores</h2>

          <h3 style={{ fontSize: "var(--andes-font-size-m)", marginBottom: "var(--andes-spacing-l)", marginTop: "var(--andes-spacing-xxl)", fontWeight: 600, color: "var(--andes-neutral-800)" }}>Cores Institucionais</h3>
          <div className="token-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "16px" }}>
            {[
              { name: "Primary", value: "#ffe600", var: "--andes-primary" },
              { name: "Primary Dark", value: "#e6cf00", var: "--andes-primary-dark" },
              { name: "Secondary", value: "#3483fa", var: "--andes-secondary" },
              { name: "Secondary Dark", value: "#2968c8", var: "--andes-secondary-dark" },
              { name: "Success", value: "#00a650", var: "--andes-success" },
              { name: "Warning", value: "#ff7733", var: "--andes-warning" },
              { name: "Error", value: "#f23d4f", var: "--andes-error" },
              { name: "Meli+", value: "#8e24aa", var: "--andes-purple-meli" },
            ].map((color) => (
              <div key={color.name} className="token-color" style={{ borderRadius: "var(--andes-radius-l)", border: "1px solid #ddd", overflow: "hidden", textAlign: "center", background: "white" }}>
                <div className="token-color__swatch" style={{ height: "80px", width: "100%", borderBottom: "1px solid #eee", background: color.value }}></div>
                <div className="token-color__label" style={{ padding: "8px", fontSize: "11px", fontWeight: 600, color: "#666" }}>{color.name}</div>
                <div className="token-color__value" style={{ padding: "4px 8px", fontSize: "10px", color: "#999", fontFamily: "monospace", background: "#f9f9f9" }}>{color.value}</div>
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: "16px", marginBottom: "16px", marginTop: "24px", fontWeight: 600 }}>Cores Neutras</h3>
          <div className="token-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "16px" }}>
            {[
              { name: "Neutro 0", value: "#ffffff", var: "--andes-neutral-0" },
              { name: "Neutro 100", value: "#f5f5f0", var: "--andes-neutral-100" },
              { name: "Neutro 200", value: "#ebebeb", var: "--andes-neutral-200" },
              { name: "Neutro 300", value: "#e6e6e6", var: "--andes-neutral-300" },
              { name: "Neutro 600", value: "#999999", var: "--andes-neutral-600" },
              { name: "Neutro 800", value: "#333333", var: "--andes-neutral-800" },
              { name: "Neutro 900", value: "#000000", var: "--andes-neutral-900" },
            ].map((color) => (
              <div key={color.name} className="token-color" style={{ borderRadius: "var(--andes-radius-l)", border: "1px solid #ddd", overflow: "hidden", textAlign: "center", background: "white" }}>
                <div className="token-color__swatch" style={{ height: "80px", width: "100%", borderBottom: "1px solid #eee", background: color.value, border: color.value === "#ffffff" ? "1px solid #ccc" : "none" }}></div>
                <div className="token-color__label" style={{ padding: "8px", fontSize: "11px", fontWeight: 600, color: "#666" }}>{color.name}</div>
                <div className="token-color__value" style={{ padding: "4px 8px", fontSize: "10px", color: "#999", fontFamily: "monospace", background: "#f9f9f9" }}>{color.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SEÇÃO: TOKENS - TIPOGRAFIA */}
        <div id="tokens-typography" className="docs-section" style={{ marginBottom: "60px", borderBottom: "1px solid #ddd", paddingBottom: "40px" }}>
          <h2 className="docs-section-title" style={{ fontSize: "28px", marginBottom: "20px", fontWeight: 300, color: "#666" }}>Tipografia</h2>
          <div style={{ background: "white", borderRadius: "var(--andes-radius-l)", border: "1px solid #ddd", overflow: "hidden" }}>
            <div className="token-typography" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px" }}>
              <div className="token-typography__label" style={{ minWidth: "120px", fontSize: "12px", fontWeight: 600, color: "#666", fontFamily: "monospace" }}>font-family</div>
              <div className="token-typography__sample" style={{ flex: 1, fontFamily: "'Proxima Nova', -apple-system, 'Helvetica Neue', Arial, sans-serif" }}>Proxima Nova, -apple-system, Helvetica Neue, Arial, sans-serif</div>
              <div className="token-typography__info" style={{ fontSize: "11px", color: "#999" }}>Fonte principal</div>
            </div>
          </div>
          <h3 style={{ fontSize: "16px", marginBottom: "16px", marginTop: "24px", fontWeight: 600 }}>Tamanhos</h3>
          <ul className="token-list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {[
              { name: "--andes-font-size-xs", value: "12px" },
              { name: "--andes-font-size-s", value: "14px" },
              { name: "--andes-font-size-m", value: "16px" },
              { name: "--andes-font-size-l", value: "18px" },
              { name: "--andes-font-size-xl", value: "24px" },
              { name: "--andes-font-size-xxl", value: "32px" },
            ].map((item) => (
              <li key={item.name} style={{ display: "flex", justifyContent: "space-between", padding: "12px", borderBottom: "1px solid #eee", fontSize: "13px", alignItems: "center" }}>
                <span className="token-list__name" style={{ fontWeight: 500, color: "#333", fontFamily: "monospace" }}>{item.name}</span>
                <span className="token-list__value" style={{ color: "#999", fontSize: "12px" }}>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* SEÇÃO: TOKENS - ESPAÇAMENTO */}
        <div id="tokens-spacing" className="docs-section" style={{ marginBottom: "60px", borderBottom: "1px solid #ddd", paddingBottom: "40px" }}>
          <h2 className="docs-section-title" style={{ fontSize: "28px", marginBottom: "20px", fontWeight: 300, color: "#666" }}>Espaçamento</h2>
          <p style={{ color: "#666", marginBottom: "16px" }}>Use espaçamento consistente para criar harmonia visual. A base é <strong>4px</strong>.</p>
          <ul className="token-list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {[
              { name: "4px", value: "base" },
              { name: "8px", value: "xs" },
              { name: "12px", value: "s" },
              { name: "16px", value: "m (gap, padding)" },
              { name: "20px", value: "l" },
              { name: "24px", value: "xl" },
              { name: "32px", value: "xxl" },
            ].map((item) => (
              <li key={item.name} style={{ display: "flex", justifyContent: "space-between", padding: "12px", borderBottom: "1px solid #eee", fontSize: "13px", alignItems: "center" }}>
                <span className="token-list__name" style={{ fontWeight: 500, color: "#333", fontFamily: "monospace" }}>{item.name}</span>
                <span className="token-list__value" style={{ color: "#999", fontSize: "12px" }}>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* SEÇÃO: TOKENS - BORDAS */}
        <div id="tokens-radius" className="docs-section" style={{ marginBottom: "60px", borderBottom: "1px solid #ddd", paddingBottom: "40px" }}>
          <h2 className="docs-section-title" style={{ fontSize: "28px", marginBottom: "20px", fontWeight: 300, color: "#666" }}>Bordas Arredondadas</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "16px" }}>
            {[
              { name: "--andes-radius-s", value: "4px", radius: "4px" },
              { name: "--andes-radius-m", value: "6px", radius: "6px" },
              { name: "--andes-radius-l", value: "8px", radius: "8px" },
              { name: "--andes-radius-pill", value: "2rem", radius: "2rem" },
            ].map((item) => (
              <div key={item.name} style={{ background: "white", border: "1px solid #ddd", borderRadius: item.radius, padding: "24px", textAlign: "center" }}>
                <div style={{ width: "40px", height: "40px", background: "#3483fa", borderRadius: item.radius, margin: "0 auto 12px" }}></div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#666", marginBottom: "4px" }}>{item.name}</div>
                <div style={{ fontSize: "11px", color: "#999" }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SEÇÃO: TOKENS - SOMBRAS */}
        <div id="tokens-shadows" className="docs-section" style={{ marginBottom: "60px", borderBottom: "1px solid #ddd", paddingBottom: "40px" }}>
          <h2 className="docs-section-title" style={{ fontSize: "28px", marginBottom: "20px", fontWeight: 300, color: "#666" }}>Sombras & Efeitos</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "24px" }}>
            <div style={{ background: "white", padding: "24px", borderRadius: "var(--andes-radius-l)", boxShadow: "0 1px 2px 0 rgba(0,0,0,.1)", textAlign: "center" }}>
              <div style={{ fontSize: "12px", fontWeight: 600, color: "#666", marginBottom: "8px" }}>--andes-shadow-sm</div>
              <div style={{ fontSize: "11px", color: "#999", fontFamily: "monospace" }}>0 1px 2px</div>
            </div>
            <div style={{ background: "white", padding: "24px", borderRadius: "var(--andes-radius-l)", boxShadow: "0 4px 8px 0 rgba(0,0,0,.12)", textAlign: "center" }}>
              <div style={{ fontSize: "12px", fontWeight: 600, color: "#666", marginBottom: "8px" }}>--andes-shadow-md</div>
              <div style={{ fontSize: "11px", color: "#999", fontFamily: "monospace" }}>0 4px 8px</div>
            </div>
          </div>
          <h3 style={{ fontSize: "16px", marginBottom: "16px", marginTop: "24px", fontWeight: 600 }}>Transição</h3>
          <ul className="token-list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            <li style={{ display: "flex", justifyContent: "space-between", padding: "12px", borderBottom: "1px solid #eee", fontSize: "13px", alignItems: "center" }}>
              <span className="token-list__name" style={{ fontWeight: 500, color: "#333", fontFamily: "monospace" }}>--andes-transition</span>
              <span className="token-list__value" style={{ color: "#999", fontSize: "12px" }}>all 0.2s ease</span>
            </li>
          </ul>
        </div>

        {/* SEÇÃO: BOTÕES */}
        <div id="buttons" className="docs-section" style={{ marginBottom: "60px", borderBottom: "1px solid #ddd", paddingBottom: "40px" }}>
          <h2 className="docs-section-title" style={{ fontSize: "28px", marginBottom: "20px", fontWeight: 300, color: "#666" }}>Botões</h2>
          <div className="docs-grid" style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "flex-start" }}>
            <AndesButton variant="action">Comprar agora</AndesButton>
            <AndesButton variant="primary">Assinar Meli+</AndesButton>
            <AndesButton variant="transparent">Adicionar ao carrinho</AndesButton>
            <AndesButton variant="primary" disabled>Desabilitado</AndesButton>
            <AndesButton variant="link">Link simples</AndesButton>
          </div>
        </div>

        {/* SEÇÃO: BADGES */}
        <div id="badges" className="docs-section" style={{ marginBottom: "60px", borderBottom: "1px solid #ddd", paddingBottom: "40px" }}>
          <h2 className="docs-section-title" style={{ fontSize: "28px", marginBottom: "20px", fontWeight: 300, color: "#666" }}>Badges & Preços</h2>
          <div className="docs-grid" style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "flex-start" }}>
            <div className="demo-box white" style={{ background: "white", padding: "20px", borderRadius: "var(--andes-radius-l)", border: "1px solid #ddd", width: "auto" }}>
              <div style={{ marginBottom: "10px" }}><AndesBadge variant="promo">15% OFF</AndesBadge></div>
              <div style={{ marginBottom: "10px" }}><AndesBadge variant="full">⚡ FULL</AndesBadge></div>
              <div style={{ marginBottom: "10px" }}><AndesBadge variant="bestseller">1º MAIS VENDIDO</AndesBadge></div>
              <div style={{ marginBottom: "10px" }}><AndesBadge variant="new">NOVO</AndesBadge></div>
            </div>

            <div className="demo-box white" style={{ background: "white", padding: "20px", borderRadius: "var(--andes-radius-l)", border: "1px solid #ddd", width: "auto" }}>
              <AndesMoney amount={1149} cents={90} discount="12% OFF" strikeThrough={true} />
            </div>
          </div>
        </div>

        {/* SEÇÃO: INPUTS */}
        <div id="inputs" className="docs-section" style={{ marginBottom: "60px", borderBottom: "1px solid #ddd", paddingBottom: "40px" }}>
          <h2 className="docs-section-title" style={{ fontSize: "28px", marginBottom: "20px", fontWeight: 300, color: "#666" }}>Inputs de Formulário</h2>
          <div className="docs-grid" style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "flex-start" }}>
            <div className="demo-box white" style={{ background: "white", padding: "20px", borderRadius: "var(--andes-radius-l)", border: "1px solid #ddd", maxWidth: "400px", width: "100%" }}>
              <div className="andes-form-group" style={{ marginBottom: "16px" }}>
                <label className="andes-label" style={{ fontSize: "14px", color: "#333", marginBottom: "6px", display: "block" }}>E-mail ou telefone</label>
                <AndesInput />
              </div>

              <div className="andes-form-group" style={{ marginBottom: "16px", position: "relative" }}>
                <label className="andes-label" style={{ fontSize: "14px", color: "#333", marginBottom: "6px", display: "block" }}>Código de segurança (CVV)</label>
                <AndesInput placeholder="Ex: 123" maxLength={3} />
                <div className="andes-input-icon" style={{ position: "absolute", right: "12px", top: "38px", color: "#3483fa", cursor: "pointer" }}>?</div>
              </div>
            </div>
          </div>
        </div>

        {/* SEÇÃO: PRODUCT CARDS */}
        <div id="product-cards" className="docs-section" style={{ marginBottom: "60px", borderBottom: "1px solid #ddd", paddingBottom: "40px" }}>
          <h2 className="docs-section-title" style={{ fontSize: "28px", marginBottom: "20px", fontWeight: 300, color: "#666" }}>Cards de Produto</h2>
          <div className="docs-grid" style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "flex-start" }}>
            
            {/* Grid View */}
            <div>
              <p>Grid View</p>
              <AndesGridCard
                title="Capa Silicone Aveludada Galaxy A55"
                imageUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23d3d3d3'/%3E%3Ccircle cx='150' cy='100' r='40' fill='%23999999'/%3E%3Cpath d='M 80 140 L 220 140 L 220 155 L 80 155 Z' fill='%23999999'/%3E%3C/svg%3E"
                price={28.40}
                discount="5% OFF"
                shippingText="Chegará grátis amanhã"
                badgeText="MAIS VENDIDO"
              />
            </div>

            {/* PDP Buy Box */}
            <div>
              <p>PDP Buy Box</p>
              <AndesPdpCard
                title="Samsung Galaxy A55 5G 128GB Dual SIM"
                price={1799}
                statusText="Novo | +1000 vendidos"
                benefitText={<><b>Chegará grátis amanhã</b></>}
              />
            </div>
          </div>
        </div>

        {/* SEÇÃO: AUTENTICAÇÃO */}
        <div id="auth" className="docs-section" style={{ marginBottom: "60px", borderBottom: "1px solid #ddd", paddingBottom: "40px" }}>
          <h2 className="docs-section-title" style={{ fontSize: "28px", marginBottom: "20px", fontWeight: 300, color: "#666" }}>Componentes de Autenticação</h2>
          <div className="docs-grid" style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "flex-start" }}>
            
            <AndesUserPill 
              primaryText="usuario@email.com" 
              secondaryAction={<a href="#" style={{ fontSize: "12px", color: "#3483fa", textDecoration: "none" }}>Trocar conta</a>}
              avatar={<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>}
            />

            <AndesAuthList>
              <AndesAuthItem
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h6v6h-6z"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>}
                title="Código QR"
                description="Escaneie com o app do Mercado Livre"
              />
              <AndesAuthItem
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3a4 4 0 1 0 8 0"/><path d="M3 21v-2a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2"/></svg>}
                title="Reconhecimento Facial"
                description="Usar a câmera do seu dispositivo"
              />
            </AndesAuthList>

          </div>
        </div>

        {/* SEÇÃO: CHECKOUT */}
        <div id="checkout" className="docs-section" style={{ marginBottom: "60px", borderBottom: "1px solid #ddd", paddingBottom: "40px" }}>
          <h2 className="docs-section-title" style={{ fontSize: "28px", marginBottom: "20px", fontWeight: 300, color: "#666" }}>Checkout</h2>
          <div className="docs-grid" style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "flex-start" }}>
            
            <div className="demo-box" style={{ maxWidth: "400px", width: "100%" }}>
              <AndesCard style={{ padding: "20px", boxShadow: "none" }}>
                <AndesPayRow
                  icon="VISA"
                  primaryText="Visa **** 4748"
                  secondaryText="Crédito"
                  action={<a href="#" style={{ fontSize: "13px", color: "#3483fa", textDecoration: "none" }}>Alterar</a>}
                />
              </AndesCard>
            </div>

            <AndesSummaryCard
              title="Resumo da assinatura"
              rows={[{ label: "Meli+ Essencial", value: "R$ 9,90" }]}
              totalLabel="Total"
              totalValue="R$ 9,90"
              buttonText="Pagar assinatura"
            />

          </div>
        </div>

        {/* SEÇÃO: MELI+ PRICING */}
        <div id="meli-plus" className="docs-section" style={{ marginBottom: "60px", borderBottom: "1px solid #ddd", paddingBottom: "40px" }}>
          <h2 className="docs-section-title" style={{ fontSize: "28px", marginBottom: "20px", fontWeight: 300, color: "#666" }}>Planos Meli+</h2>
          <div className="docs-grid" style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "flex-start" }}>
            
            <AndesMeliCard
              tag="meli+"
              title="MEGA"
              price={39.90}
              priceCents="90"
              originalPrice={74.90}
              discount="46% OFF"
              periodText="/mês por 2 meses"
              listItems={[
                <span key="1">Entretenimento incluído: <div className="meli-logos" style={{ display: "flex", gap: "5px", marginTop: "5px" }}><div className="meli-logo" style={{ width: "24px", height: "24px", background: "#000", color: "white", fontSize: "6px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "var(--andes-radius-s)" }}>D+</div><div className="meli-logo" style={{ width: "24px", height: "24px", background: "#e50914", color: "white", fontSize: "6px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "var(--andes-radius-s)" }}>N</div><div className="meli-logo" style={{ width: "24px", height: "24px", background: "#000", color: "white", fontSize: "6px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "var(--andes-radius-s)" }}>MAX</div></div></span>,
                "Frete Grátis em milhões de produtos",
                "Deezer Premium grátis por 12 meses"
              ]}
              buttonText="Assinar Mega"
              offerText="OFERTA"
            />

          </div>
        </div>

        {/* SEÇÃO: CARDS TEMÁTICOS */}
        <div id="thematic-cards" className="docs-section" style={{ marginBottom: "60px", borderBottom: "1px solid #ddd", paddingBottom: "40px" }}>
          <h2 className="docs-section-title" style={{ fontSize: "28px", marginBottom: "20px", fontWeight: 300, color: "#666" }}>Cards Temáticos (Seu Interesse)</h2>
          <div className="docs-grid" style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "flex-start", maxWidth: "900px" }}>
            <AndesThematicCard title="Produtos" imageUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23d3d3d3'/%3E%3Ccircle cx='50' cy='50' r='25' fill='%23999999'/%3E%3C/svg%3E" />
            <AndesThematicCard title="Ofertas do Dia" imageUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23d3d3d3'/%3E%3Ccircle cx='50' cy='50' r='25' fill='%23999999'/%3E%3C/svg%3E" />
            <AndesThematicCard title="Supermercado" imageUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23d3d3d3'/%3E%3Ccircle cx='50' cy='50' r='25' fill='%23999999'/%3E%3C/svg%3E" />
            <AndesThematicCard title="Eletrônicos" imageUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23d3d3d3'/%3E%3Ccircle cx='50' cy='50' r='25' fill='%23999999'/%3E%3C/svg%3E" />
            <AndesThematicCard title="Moda & Acessórios" imageUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23d3d3d3'/%3E%3Ccircle cx='50' cy='50' r='25' fill='%23999999'/%3E%3C/svg%3E" />
            <AndesThematicCard title="Casa & Decoração" imageUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23d3d3d3'/%3E%3Ccircle cx='50' cy='50' r='25' fill='%23999999'/%3E%3C/svg%3E" />
          </div>
        </div>

        {/* SEÇÃO: PREÇOS COM DESCONTO */}
        <div id="pricing" className="docs-section" style={{ marginBottom: "60px", borderBottom: "1px solid #ddd", paddingBottom: "40px" }}>
          <h2 className="docs-section-title" style={{ fontSize: "28px", marginBottom: "20px", fontWeight: 300, color: "#666" }}>Preços com Desconto & Rebates</h2>
          <div className="docs-grid" style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "flex-start" }}>
            
            <div className="demo-box white" style={{ background: "white", padding: "20px", borderRadius: "var(--andes-radius-l)", border: "1px solid #ddd", maxWidth: "320px" }}>
              <div style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>Preço com Desconto</div>
              <div className="andes-money-amount-combo">
                <s className="andes-money-amount andes-money-amount--previous" style={{ textDecoration: "line-through", color: "#999", fontSize: "14px", marginRight: "8px" }}>
                  <span className="andes-money-amount__currency-symbol">R$</span>
                  <span className="andes-money-amount__fraction">59,90</span>
                </s>
                <div className="andes-money-amount-combo__main-container" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span className="andes-money-amount-combo__main" style={{ display: "flex", alignItems: "flex-start", fontSize: "24px", fontWeight: 600, color: "#333" }}>
                    <span className="andes-money-amount__currency-symbol" style={{ fontSize: "0.6em", marginTop: "2px", marginRight: "2px" }}>R$</span>
                    <span className="andes-money-amount__fraction">37</span>
                    <span className="andes-money-amount__cents" style={{ fontSize: "0.5em", marginTop: "2px", marginLeft: "1px" }}>,91</span>
                  </span>
                  <span className="andes-money-amount__discount" style={{ background: "#00a650", color: "white", padding: "2px 6px", borderRadius: "3px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase" }}>36% OFF</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* SEÇÃO: FEEDBACK */}
        <div id="feedback" className="docs-section" style={{ marginBottom: "60px", borderBottom: "1px solid #ddd", paddingBottom: "40px" }}>
          <h2 className="docs-section-title" style={{ fontSize: "28px", marginBottom: "20px", fontWeight: 300, color: "#666" }}>Feedback & Loading</h2>
          <div className="docs-grid" style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "flex-start" }}>
            <div className="demo-box white" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "50px", background: "white", borderRadius: "var(--andes-radius-l)", border: "1px solid #ddd", width: "100%" }}>
              <AndesLoadingContainer text="Mais alguns segundos..." />
            </div>
          </div>
        </div>

        {/* SEÇÃO: CATEGORIAS */}
        <div id="categories" className="docs-section" style={{ marginBottom: "60px", borderBottom: "1px solid #ddd", paddingBottom: "40px" }}>
          <h2 className="docs-section-title" style={{ fontSize: "28px", marginBottom: "20px", fontWeight: 300, color: "#666" }}>Categorias (Mosaico)</h2>
          <AndesCategoriesMosaic title="Categorias" viewAllLinkText="Mostrar todas as categorias">
            <AndesCategoryCard text="Carros, Motos e Outros" imageUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%23d3d3d3'/%3E%3Ccircle cx='30' cy='30' r='15' fill='%23999999'/%3E%3C/svg%3E" />
            <AndesCategoryCard text="Celulares e Telefones" imageUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%23d3d3d3'/%3E%3Ccircle cx='30' cy='30' r='15' fill='%23999999'/%3E%3C/svg%3E" />
            <AndesCategoryCard text="Eletrodomésticos" imageUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%23d3d3d3'/%3E%3Ccircle cx='30' cy='30' r='15' fill='%23999999'/%3E%3C/svg%3E" />
            <AndesCategoryCard text="Ferramentas" imageUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%23d3d3d3'/%3E%3Ccircle cx='30' cy='30' r='15' fill='%23999999'/%3E%3C/svg%3E" />
            <AndesCategoryCard text="Acessórios para Veículos" imageUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%23d3d3d3'/%3E%3Ccircle cx='30' cy='30' r='15' fill='%23999999'/%3E%3C/svg%3E" />
            <AndesCategoryCard text="Calçados, Roupas e Bolsas" imageUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%23d3d3d3'/%3E%3Ccircle cx='30' cy='30' r='15' fill='%23999999'/%3E%3C/svg%3E" />
            <AndesCategoryCard text="Esportes e Fitness" imageUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%23d3d3d3'/%3E%3Ccircle cx='30' cy='30' r='15' fill='%23999999'/%3E%3C/svg%3E" />
            <AndesCategoryCard text="Beleza e Cuidado Pessoal" imageUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%23d3d3d3'/%3E%3Ccircle cx='30' cy='30' r='15' fill='%23999999'/%3E%3C/svg%3E" />
            <AndesCategoryCard text="Casa, Móveis e Decoração" imageUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%23d3d3d3'/%3E%3Ccircle cx='30' cy='30' r='15' fill='%23999999'/%3E%3C/svg%3E" />
            <AndesCategoryCard text="Informática" imageUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%23d3d3d3'/%3E%3Ccircle cx='30' cy='30' r='15' fill='%23999999'/%3E%3C/svg%3E" />
            <AndesCategoryCard text="Imóveis" imageUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%23d3d3d3'/%3E%3Ccircle cx='30' cy='30' r='15' fill='%23999999'/%3E%3C/svg%3E" />
            <AndesCategoryCard text="Eletrônicos, Áudio e Vídeo" imageUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%23d3d3d3'/%3E%3Ccircle cx='30' cy='30' r='15' fill='%23999999'/%3E%3C/svg%3E" />
          </AndesCategoriesMosaic>
        </div>

        {/* SEÇÃO: MODAIS */}
        <div id="modals" className="docs-section" style={{ marginBottom: "60px", borderBottom: "1px solid #ddd", paddingBottom: "40px" }}>
          <h2 className="docs-section-title" style={{ fontSize: "28px", marginBottom: "20px", fontWeight: 300, color: "#666" }}>Modais (Promoção)</h2>
          
          <AndesButton onClick={() => setIsModalOpen(true)}>Abrir Modal Meli+</AndesButton>

          <AndesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="andes-modal__content--dark" style={{ backgroundColor: "#222", color: "white", padding: "40px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div className="meli-tag meli-tag--large" style={{ fontSize: "14px", padding: "6px 12px", borderRadius: "20px", background: "linear-gradient(90deg, #a90f90, #0c1a51)", color: "white", fontWeight: 800 }}>
                meli+ <span style={{ fontWeight: 900, marginLeft: "4px" }}>MEGA</span>
              </div>

              <h2 className="modal-promo-title" style={{ fontSize: "24px", fontWeight: 900, textTransform: "uppercase", margin: "24px 0", letterSpacing: "0.5px" }}>4 Streamings, 1 Assinatura</h2>

              <div className="streaming-grid" style={{ display: "flex", gap: "16px", justifyContent: "center", marginBottom: "30px", flexWrap: "wrap" }}>
                <div className="streaming-box" style={{ width: "100px", height: "70px", background: "white", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: 800, fontSize: "12px" }}>Disney+</div>
                <div className="streaming-box" style={{ width: "100px", height: "70px", background: "white", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "#e50914", fontWeight: 800, fontSize: "12px" }}>NETFLIX</div>
                <div className="streaming-box" style={{ width: "100px", height: "70px", background: "#000", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "12px" }}>HBO max</div>
                <div className="streaming-box" style={{ width: "100px", height: "70px", background: "white", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: 800, fontSize: "12px" }}> tv</div>
              </div>

              <div className="price-hero" style={{ display: "flex", alignItems: "flex-start", lineHeight: 1, justifyContent: "center" }}>
                <span className="price-hero__symbol" style={{ fontSize: "24px", marginTop: "8px", marginRight: "4px", fontWeight: 500 }}>R$</span>
                <span className="price-hero__value" style={{ fontSize: "80px", fontWeight: 600, letterSpacing: "-2px" }}>39</span>
                <span className="price-hero__cents" style={{ fontSize: "24px", marginTop: "8px" }}>,90</span>
                <span className="price-hero__period" style={{ fontSize: "24px", alignSelf: "center", marginLeft: "8px", fontWeight: 300 }}>/mês*</span>
              </div>

              <p className="modal-disclaimer" style={{ fontSize: "14px", color: "#aaa", marginTop: "16px" }}>*Depois de 2 meses, você pagará R$ 74,90/mês.</p>
            </div>

            <div className="andes-modal__footer" style={{ background: "white", padding: "24px", display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", borderTop: "1px solid #eee" }}>
              <AndesButton style={{ padding: "16px 32px", fontSize: "16px" }}>Assinar Meli+ Mega</AndesButton>
              <AndesButton variant="link" onClick={() => setIsModalOpen(false)}>Em outro momento</AndesButton>
            </div>
          </AndesModal>
        </div>

        {/* SEÇÃO: ONBOARDING */}
        <div id="onboarding" className="docs-section" style={{ marginBottom: "60px", borderBottom: "1px solid #ddd", paddingBottom: "40px" }}>
          <h2 className="docs-section-title" style={{ fontSize: "28px", marginBottom: "20px", fontWeight: 300, color: "#666" }}>Onboarding Tour</h2>
          
          <AndesButton variant="action" onClick={() => setIsOnboardingOpen(true)}>Iniciar Tour de Vendas</AndesButton>

          <AndesOnboardingModal 
            isOpen={isOnboardingOpen} 
            onClose={() => setIsOnboardingOpen(false)}
            slides={[
              {
                imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 320'%3E%3Crect width='600' height='320' fill='%23f5f5f5'/%3E%3Ccircle cx='300' cy='160' r='60' fill='%23d3d3d3'/%3E%3C/svg%3E",
                title: "Comece a criar seu primeiro anúncio",
                text: "Na seção \"Anúncios\", você poderá começar a anunciar. Já deixe preparadas as informações do seu produto."
              },
              {
                imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 320'%3E%3Crect width='600' height='320' fill='%23f5f5f5'/%3E%3Ccircle cx='300' cy='160' r='60' fill='%23d3d3d3'/%3E%3C/svg%3E",
                title: "Se você receber perguntas, responda-as rapidamente",
                text: "Na seção \"Perguntas\", você encontra as dúvidas dos compradores. Responda para aumentar suas chances."
              },
              {
                imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 320'%3E%3Crect width='600' height='320' fill='%23f5f5f5'/%3E%3Ccircle cx='300' cy='160' r='60' fill='%23d3d3d3'/%3E%3C/svg%3E",
                title: "Ao concretizar a venda, gerencie seu envio de um só lugar",
                text: "Em \"Vendas\", é possível identificar em qual etapa do processo cada venda está."
              },
              {
                imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 320'%3E%3Crect width='600' height='320' fill='%23f5f5f5'/%3E%3Ccircle cx='300' cy='160' r='60' fill='%23d3d3d3'/%3E%3C/svg%3E",
                title: "O dinheiro da sua venda estará disponível no Mercado Pago",
                text: "Na seção \"Resumo\", é possível revisar o status da sua receita e identificar pendências."
              },
              {
                imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 320'%3E%3Crect width='600' height='320' fill='%23ffe600'/%3E%3Ctext x='300' y='160' textAnchor='middle' fontSize='32' fill='%23333' fontWeight='bold'%3ESucesso!%3C/text%3E%3C/svg%3E",
                title: "Continue vendendo e crescendo como vendedor",
                text: "Em \"Resumo\", você também encontrará recomendações para entender seu desempenho.",
                isFinal: true,
                finalButtonText: "Entendi"
              }
            ]}
          />
        </div>

        {/* SEÇÃO: CAROUSEL */}
        <div id="carousel" className="docs-section" style={{ border: "none" }}>
          <h2 className="docs-section-title" style={{ fontSize: "28px", marginBottom: "20px", fontWeight: 300, color: "#666" }}>Carrossel</h2>
                    <AndesCarousel>
            <AndesGridCard title="Item 1" imageUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23d3d3d3'/%3E%3Ccircle cx='150' cy='100' r='40' fill='%23999999'/%3E%3C/svg%3E" price={100} shippingText="Frete Grátis" />
            <AndesGridCard title="Item 2" imageUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23d3d3d3'/%3E%3Ccircle cx='150' cy='100' r='40' fill='%23999999'/%3E%3C/svg%3E" price={200} shippingText="Frete Grátis" />
            <AndesGridCard title="Item 3" imageUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23d3d3d3'/%3E%3Ccircle cx='150' cy='100' r='40' fill='%23999999'/%3E%3C/svg%3E" price={300} shippingText="Frete Grátis" />
            <AndesGridCard title="Item 4" imageUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23d3d3d3'/%3E%3Ccircle cx='150' cy='100' r='40' fill='%23999999'/%3E%3C/svg%3E" price={400} shippingText="Frete Grátis" />
            <AndesGridCard title="Item 5" imageUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23d3d3d3'/%3E%3Ccircle cx='150' cy='100' r='40' fill='%23999999'/%3E%3C/svg%3E" price={500} shippingText="Frete Grátis" />
          </AndesCarousel>
        </div>

      </main>
    </div>
  );
}
