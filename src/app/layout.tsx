import type { Metadata } from "next";
import { Poppins } from 'next/font/google'
import "./globals.css";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable}`}
    >
      <body className="min-h-full font-sans flex flex-col">{children}</body>
    </html>
  );
}
