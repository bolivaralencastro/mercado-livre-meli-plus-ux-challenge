import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "../styles/andes-components.css";
import MainLayout from "@/components/layout/MainLayout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
