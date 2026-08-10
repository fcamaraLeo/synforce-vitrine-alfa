import { metricas } from "./dados.ts";
import { CartaoMetrica } from "./componentes/CartaoMetrica.tsx";
import { GraficoVolume } from "./componentes/GraficoVolume.tsx";
import { TabelaMovimentos } from "./componentes/TabelaMovimentos.tsx";

/**
 * Dashboard da Vitrine — o painel de liquidação e repasse.
 *
 * É o projeto-alvo da PoC Squad Sintética: um app React de verdade, para a
 * squad de agentes trabalhar em cima. Os dados são mockados; o que importa é
 * o código, não o número.
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
            <p className="subtitulo">Liquidação e repasse consolidados — semana de 03 a 09 de agosto.</p>
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
        Vitrine · projeto-alvo da PoC Squad Sintética · dados fictícios
      </footer>
    </div>
  );
}
