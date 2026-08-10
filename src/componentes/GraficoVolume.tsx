import { volumeSemana } from "../dados.ts";

/**
 * Gráfico de barras do volume diário. SVG puro, sem biblioteca — a régua sai do
 * maior valor da série, então nunca estoura o quadro.
 */
export function GraficoVolume() {
  const max = Math.max(...volumeSemana.map((d) => d.milhoes));
  const larguraBarra = 44;
  const vao = 20;
  const altura = 180;
  const base = altura - 24;

  return (
    <article className="cartao grafico">
      <header className="grafico-cabecalho">
        <h2>Volume por dia</h2>
        <span className="grafico-legenda">R$ milhões · última semana</span>
      </header>
      <svg
        viewBox={`0 0 ${volumeSemana.length * (larguraBarra + vao)} ${altura}`}
        width="100%"
        role="img"
        aria-label="Volume transacionado por dia da semana"
      >
        {volumeSemana.map((d, i) => {
          const h = (d.milhoes / max) * (base - 16);
          const x = i * (larguraBarra + vao) + vao / 2;
          const y = base - h;
          return (
            <g key={d.dia}>
              <rect x={x} y={y} width={larguraBarra} height={h} rx={5} className="barra" />
              <text x={x + larguraBarra / 2} y={y - 6} className="barra-valor">
                {d.milhoes.toLocaleString("pt-BR")}
              </text>
              <text x={x + larguraBarra / 2} y={altura - 4} className="barra-rotulo">
                {d.dia}
              </text>
            </g>
          );
        })}
      </svg>
    </article>
  );
}
