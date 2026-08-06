import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vitrine",
  description: "Landing e dashboard de demonstração.",
};

export default function LayoutRaiz({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="cabecalho">
          <div className="container">
            <nav>
              <Link href="/" className="marca">
                Vitrine
              </Link>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/#contato">Contato</Link>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
