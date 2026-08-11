import { metricas } from "./dados.ts";
import { CartaoMetrica } from "./componentes/CartaoMetrica.tsx";
import { GraficoVolume } from "./componentes/GraficoVolume.tsx";
import { TabelaMovimentos } from "./componentes/TabelaMovimentos.tsx";

/**
 * Dashboard da Vitrine — o painel de liquidação, repasse e sem planilhas
 * no meio do caminho.
 *
 * Protótipo de demonstração: um app React com dados mockados. O foco está no
 * código, não no número exibido.
 */
export function App() {
  return (
    <div className="app">
      <header className="topo">
        <div className="marca">
          <span className="marca-simbolo" aria-hidden>◆</span>
          <span className="marca-nome">Vitrine</span>
        </div>
        <nav className="topo-nav">
          <a className="ativo" href="#">Visão geral</a>
          <a href="#">Liquidações</a>
          <a href="#">Repasses</a>
          <a href="#">Relatórios</a>
        </nav>
        <div className="topo-usuario">
          <span className="avatar" aria-hidden>PN</span>
          <span className="topo-usuario-nome">Paula Nunes</span>
        </div>
      </header>

      <main className="conteudo">
        <div className="titulo-pagina">
          <div>
            <h1>Visão geral</h1>
            <p className="subtitulo">Liquidação, repasse e sem planilhas no meio do caminho.</p>
          </div>
          <button className="botao-primario">Exportar relatório</button>
        </div>

        <section className="grade-metricas">
          {metricas.map((m) => (
            <CartaoMetrica key={m.chave} metrica={m} />
          ))}
        </section>

        <section className="grade-paineis">
          <GraficoVolume />
          <TabelaMovimentos />
        </section>
      </main>

      <footer className="rodape">
        Vitrine · protótipo de demonstração · dados fictícios
      </footer>
    </div>
  );
}