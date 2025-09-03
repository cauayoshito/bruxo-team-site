// app/layout.tsx
import type { Metadata } from "next";
import { Poppins } from "next/font/google"; // ← trocou Inter por Poppins
import "./globals.css";
import Nav from "@/components/Nav";

// configura a fonte
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // escolha os pesos que quer usar
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bruxo Team Jiu-Jitsu",
  description: "Treinos em Stiep, Itapuã e Stella. Disciplina, técnica e união.",
  openGraph: {
    title: "Bruxo Team Jiu-Jitsu",
    description: "Unidades em Stiep, Itapuã e Stella.",
    images: ["/logo-bruxo.png"], // suba em /public/og.jpg
    locale: "pt_BR",
    type: "website",
  },
  icons: { icon: "/favicon.ico" }, // suba em /public/favicon.ico
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={poppins.className}> {/* ← aqui também trocou */}
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 bg-white text-black px-3 py-2 rounded"
        >
          Pular para o conteúdo
        </a>
        <Nav />
        <main id="conteudo">{children}</main>
      </body>
    </html>
  );
}
