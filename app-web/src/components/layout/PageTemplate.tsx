"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { AndesDropdownMenu } from "@/components/ui";
import type { MenuItem } from "@/components/ui/AndesDropdownMenu";

interface PageTemplateProps {
  title: string;
  subtitle: string;
  children?: ReactNode;
}

const PageTemplate = ({ title, subtitle, children }: PageTemplateProps) => {
  const menuClusters: { label: string; items: MenuItem[] }[] = [
    {
      label: "O Desafio",
      items: [
        { id: "briefing", label: "Briefing", href: "/briefing" },
        { id: "programacao", label: "Programação", href: "/programacao" },
      ],
    },
    {
      label: "Discovery",
      items: [
        { id: "pesquisa-overview", label: "Visão Geral", href: "/pesquisa" },
        { id: "pesquisa-artigos", label: "Artigos", href: "/pesquisa/artigos" },
        { id: "pesquisa-personas", label: "Personas", href: "/pesquisa/personas" },
        { id: "pesquisa-cases", label: "Cases", href: "/pesquisa/cases" },
        { id: "pesquisa-reviews", label: "Análise de Reviews", href: "/pesquisa/review" },
        { id: "pesquisa-analise", label: "Análise Aprofundada", href: "/pesquisa/analise-aprofundada" },
        { id: "pesquisa-benchmarking", label: "Benchmarking", href: "/pesquisa/benchmarking" },
        { id: "pesquisa-mapeamento", label: "Mapeamento As-Is", href: "/pesquisa/mapeamento" },
        { id: "pesquisa-termos", label: "Termos e Regulamentos", href: "/pesquisa/termos" },
      ],
    },
    {
      label: "Definição & Ideação",
      items: [
        { id: "estrategia", label: "Estratégia", href: "/estrategia" },
        { id: "ideacao", label: "Ideação", href: "/ideacao" },
      ],
    },
    {
      label: "Design & Entrega",
      items: [
        { id: "ui-design", label: "UI Design", href: "/ui-design" },
        { id: "prototipo", label: "Protótipo", href: "/prototipo" },
        { id: "prototipo-landing", label: "Landing Pages", href: "/prototipo/landing-pages" },
        { id: "apresentacao", label: "Apresentação", href: "/apresentacao" },
        { id: "entrega", label: "Entrega", href: "/entrega" },
      ],
    },
  ];

  // Configuração para o menu mobile (unificado)
  const mobileItems: MenuItem[] = [
    { id: "home", label: "Home", href: "/" },
    ...menuClusters.flatMap((cluster) => [
      {
        id: `cluster-${cluster.label}`,
        label: cluster.label,
        children: cluster.items,
      },
    ]),
  ];

  return (
    <div className="min-h-screen bg-[#ededed] text-[#333333]">
      <header className="fixed top-0 z-50 w-full border-b border-black/5 bg-[#ffe600]">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            {/* Mobile Menu */}
            <div className="lg:hidden">
              <AndesDropdownMenu
                label={
                  <span className="flex items-center gap-2 text-sm font-medium text-[#333333]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                      aria-hidden
                    >
                      <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                    </svg>
                  </span>
                }
                ariaLabel="Abrir menu de navegação"
                items={mobileItems}
              />
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-4">
              <Image
                src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.6.152/mercadolibre/pt_logo_large_plus@2x.webp"
                alt="Mercado Livre"
                width={150}
                height={34}
                className="h-[34px] w-auto"
                priority
              />
              <span className="hidden h-6 w-px bg-black/30 sm:inline-block" aria-hidden />
              <p className="hidden text-sm font-normal leading-tight text-[#333333] sm:block">
                Product Design Research
              </p>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            <Link
              href="/"
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-[#333333] hover:bg-black/5"
            >
              Home
            </Link>
            
            {menuClusters.map((cluster) => (
              <AndesDropdownMenu
                key={cluster.label}
                label={
                  <span className="text-sm font-medium text-[#333333]">
                    {cluster.label}
                  </span>
                }
                items={cluster.items}
                className="rounded-md hover:bg-black/5 px-2"
              />
            ))}
          </nav>
        </div>
      </header>

      <div className="bg-[linear-gradient(180deg,#ffea78_0%,#ffea78_85%,#ededed_100%)]">
        <div className="mx-auto flex min-h-[50vh] max-w-6xl flex-col justify-center px-6 pb-28 pt-[120px]">
          <h1 className="text-4xl font-semibold leading-tight text-[#333333] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg font-light text-[#4a4a4a]">
            {subtitle}
          </p>
        </div>
      </div>

      {children ? (
        <div className="mx-auto max-w-6xl px-6 pb-16 -mt-20 relative z-10">{children}</div>
      ) : null}
    </div>
  );
};

export default PageTemplate;
