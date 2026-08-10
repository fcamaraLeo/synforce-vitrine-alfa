import type { Metrica } from "../dados.ts";

/** Um cartão de KPI. A variação vira cor: positivo verde, negativo vermelho. */
export function CartaoMetrica({ metrica }: { metrica: Metrica }) {
  const sobe = metrica.variacao >= 0;
  return (
    <article className="cartao metrica">
      <p className="metrica-rotulo">{metrica.rotulo}</p>
      <p className="metrica-valor">{metrica.valor}</p>
      <p className={`metrica-variacao ${sobe ? "sobe" : "desce"}`}>
        <span aria-hidden>{sobe ? "▲" : "▼"}</span>
        {Math.abs(metrica.variacao).toLocaleString("pt-BR")} {metrica.unidade}
        <span className="metrica-periodo">vs. semana anterior</span>
      </p>
    </article>
  );
}
