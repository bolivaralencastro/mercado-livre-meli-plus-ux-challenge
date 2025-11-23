"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { AndesDropdownMenu } from "@/components/ui";

interface PageTemplateProps {
  title: string;
  subtitle: string;
  children?: ReactNode;
}

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/programacao", label: "Programação" },
  { href: "/briefing", label: "Briefing" },
  { href: "/pesquisa", label: "Pesquisa" },
  { href: "/estrategia", label: "Estratégia" },
  { href: "/ideacao", label: "Ideação" },
  { href: "/ui-design", label: "UI Design" },
  { href: "/prototipo", label: "Protótipo" },
  { href: "/apresentacao", label: "Apresentação" },
  { href: "/entrega", label: "Entrega" },
];

const PageTemplate = ({ title, subtitle, children }: PageTemplateProps) => {
  const navigationSections = [
    {
      title: "Início e Planejamento",
      groups: [
        {
          title: "Visão geral",
          items: ["/", "/programacao"].map((href) => ({
            id: href,
            label: navigationItems.find((item) => item.href === href)?.label ?? href,
            href,
          })),
        },
        {
          title: "Definições e pesquisa",
          items: ["/briefing", "/pesquisa", "/estrategia"].map((href) => ({
            id: href,
            label: navigationItems.find((item) => item.href === href)?.label ?? href,
            href,
          })),
        },
      ],
    },
    {
      title: "Criação",
      groups: [
        {
          title: "Ideação e design",
          items: ["/ideacao", "/ui-design"].map((href) => ({
            id: href,
            label: navigationItems.find((item) => item.href === href)?.label ?? href,
            href,
          })),
        },
        {
          title: "Protótipos",
          items: ["/prototipo"].map((href) => ({
            id: href,
            label: navigationItems.find((item) => item.href === href)?.label ?? href,
            href,
          })),
        },
      ],
    },
    {
      title: "Entrega",
      groups: [
        {
          title: "Apresentação e resultados",
          items: ["/apresentacao", "/entrega"].map((href) => ({
            id: href,
            label: navigationItems.find((item) => item.href === href)?.label ?? href,
            href,
          })),
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#ededed] text-[#333333]">
      <header className="fixed top-0 z-50 w-full border-b border-black/5 bg-[#ffe600]">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="md:hidden">
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
                    Menu
                  </span>
                }
                ariaLabel="Abrir menu de navegação"
                sections={navigationSections}
              />
            </div>

            <div className="flex items-center gap-4">
              <Image
                src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.6.152/mercadolibre/pt_logo_large_plus@2x.webp"
                alt="Mercado Livre"
                width={150}
                height={34}
                className="h-[34px] w-auto"
                priority
              />
              <span className="hidden h-6 w-px bg-black/30 sm:inline-block" aria-hidden />
              <p className="text-sm font-normal leading-tight text-[#333333]">
                Product Design Research
              </p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-[#333333] md:flex">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors duration-150 hover:text-[#3483fa]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="bg-[linear-gradient(180deg,#ffea78_0%,#ffea78_85%,#ededed_100%)]">
        <div className="mx-auto flex min-h-[66vh] max-w-6xl flex-col justify-center px-6 pb-12 pt-[140px]">
          <h1 className="text-4xl font-semibold leading-tight text-[#333333] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg font-light text-[#4a4a4a]">
            {subtitle}
          </p>
        </div>
      </div>

      {children ? (
        <div className="mx-auto max-w-6xl px-6 pb-16">{children}</div>
      ) : null}
    </div>
  );
};

export default PageTemplate;
