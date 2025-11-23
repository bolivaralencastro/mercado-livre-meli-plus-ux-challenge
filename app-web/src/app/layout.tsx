import type { Metadata } from "next";
import "./globals.css";
import "../styles/tokens.css";
import "../styles/andes-components.css";
import MainLayout from "@/components/layout/MainLayout";
import ProgressBarProvider from "@/components/providers/ProgressBarProvider";

export const metadata: Metadata = {
  title: "Meli+ UX Challenge",
  description: "Aplicação web para prototipagem do Meli+, programa de assinatura do Mercado Livre. Construído com Next.js 14, App Router e TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="andes-body antialiased">
        <ProgressBarProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </ProgressBarProvider>
      </body>
    </html>
  );
}
