import { CartaoMetrica } from "@/components/cartao-metrica";
import { formatarReais, metricas, movimentos } from "@/lib/dados-mock";

export default function Dashboard() {
  return (
    <>
      <section className="heroi">
        <h1>Dashboard</h1>
        <p>Consolidado de agosto de 2026. Dados de demonstração.</p>
      </section>

      <section>
        <div className="grade-metricas">
          {metricas.map((m) => (
            <CartaoMetrica key={m.chave} metrica={m} />
          ))}
        </div>
      </section>

      <section className="secao">
        <h2>Movimentos recentes</h2>
        <table className="tabela">
          <thead>
            <tr>
              <th>Identificador</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th className="numero">Valor</th>
            </tr>
          </thead>
          <tbody>
            {movimentos.map((mv) => (
              <tr key={mv.id}>
                <td>{mv.id}</td>
                <td>{mv.descricao}</td>
                <td>{mv.categoria}</td>
                <td className={`numero ${mv.valorCentavos < 0 ? "negativo" : ""}`}>
                  {formatarReais(mv.valorCentavos)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
