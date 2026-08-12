import { formatarReais } from "../dados.ts";
import { formatarAriaLabelSaldo } from "../saldo.ts";

/**
 * Card de saldo consolidado — mostra a soma líquida de todos os movimentos.
 *
 * Recebe o total em centavos já calculado pela função pura `calcularSaldo`,
 * sem repetir a lógica de soma.
 */
export function SaldoConsolidado({ totalCentavos }: { totalCentavos: number }) {
  const saldoFormatado = formatarReais(totalCentavos);
  const ariaLabel = formatarAriaLabelSaldo(totalCentavos);

  return (
    <section
      className="cartao saldo-consolidado"
      aria-label={ariaLabel}
    >
      <span className="saldo-consolidado-rotulo">Saldo consolidado</span>
      <span className={`saldo-consolidado-valor${totalCentavos < 0 ? " negativo" : ""}`}>
        {saldoFormatado}
      </span>
    </section>
  );
}