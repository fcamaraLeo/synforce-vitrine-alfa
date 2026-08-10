import { movimentos, formatarReais, formatarData } from "../dados.ts";

/** "Liquidação" → "liquidacao": tira acento para virar classe CSS. */
function categoriaSlug(categoria: string): string {
  return categoria.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

/** Tabela dos últimos movimentos. Valor negativo aparece em vermelho. */
export function TabelaMovimentos() {
  return (
    <article className="cartao tabela-cartao">
      <header className="grafico-cabecalho">
        <h2>Últimos movimentos</h2>
        <span className="grafico-legenda">{movimentos.length} lançamentos</span>
      </header>
      <div className="tabela-rolagem">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Data</th>
              <th className="direita">Valor</th>
            </tr>
          </thead>
          <tbody>
            {movimentos.map((m) => (
              <tr key={m.id}>
                <td>{m.descricao}</td>
                <td>
                  <span className={`etiqueta cat-${categoriaSlug(m.categoria)}`}>
                    {m.categoria}
                  </span>
                </td>
                <td className="suave">{formatarData(m.em)}</td>
                <td className={`direita valor ${m.valorCentavos < 0 ? "negativo" : ""}`}>
                  {formatarReais(m.valorCentavos)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
