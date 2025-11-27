import type { Metadata } from "next";
import "./globals.css";
import "../styles/tokens.css";
import "../styles/andes-components.css";
import MainLayout from "@/components/layout/MainLayout";
import ProgressBarProvider from "@/components/providers/ProgressBarProvider";
import FullScreenProvider from "@/components/providers/FullScreenProvider";
import Script from "next/script";

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
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "ucgcvm9kqm");
            `,
          }}
        />
        <ProgressBarProvider>
          <FullScreenProvider>
            <MainLayout>
              {children}
            </MainLayout>
          </FullScreenProvider>
        </ProgressBarProvider>
      </body>
    </html>
  );
}
