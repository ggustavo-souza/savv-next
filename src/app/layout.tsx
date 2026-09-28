import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import "./globals.css";
import Navbar from "../components/Navbar";
import { obterSessao } from "../services/AuthCheck";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: "--font-poppins"
});

export const metadata: Metadata = {
  title: "SAVV",
  description: "Sistema de Áreas Verdes de Votorantim",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  const user = await obterSessao();

  let tipo: "visitante" | "usuario" | "diretor" | "gerente" | "fiscal" = "visitante";

  if (user?.userId) {
    if (user.cargo === "gerente") {
      tipo = "gerente";
    } else if (user.cargo === "diretor") {
      tipo = "diretor";
    } else if (user.cargo === "fiscal") {
      tipo = "fiscal";
    } else {
      tipo = "usuario";
    }
  }

  return (
    <html
      lang="pt-BR"
      className={`${poppins.variable}`}
    >
      <body className="min-h-full font-sans flex flex-col">
        <Navbar tipo={tipo} />
        {children}
      </body>
    </html>
  );
}
