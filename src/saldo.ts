import type { LinhaMovimento } from "./dados.ts";

/**
 * Soma líquida de todos os movimentos.
 *
 * Cada movimento já carrega `valorCentavos` com o sinal correto
 * (positivo para liquidação e repasse, negativo para estorno e tarifa).
 * A função apenas totaliza — não reintroduz sinal pela categoria nem
 * usa Math.abs.
 */
export function calcularSaldo(movimentos: LinhaMovimento[]): number {
  return movimentos.reduce((acc, m) => acc + m.valorCentavos, 0);
}

/**
 * Gera um aria-label descritivo para o saldo consolidado.
 *
 * Exemplos:
 *   12345  → "Saldo consolidado: 123 reais e 45 centavos"
 *   -12345 → "Saldo consolidado negativo: menos 123 reais e 45 centavos"
 *   0      → "Saldo consolidado: zero reais"
 */
export function formatarAriaLabelSaldo(totalCentavos: number): string {
  if (totalCentavos === 0) {
    return "Saldo consolidado: zero reais";
  }

  const absoluto = Math.abs(totalCentavos);
  const reais = Math.floor(absoluto / 100);
  const centavos = absoluto % 100;

  let descricao: string;
  if (reais > 0 && centavos > 0) {
    descricao = `${reais} reais e ${centavos} centavos`;
  } else if (reais > 0) {
    descricao = `${reais} reais`;
  } else {
    descricao = `${centavos} centavos`;
  }

  if (totalCentavos < 0) {
    return `Saldo consolidado negativo: menos ${descricao}`;
  }

  return `Saldo consolidado: ${descricao}`;
}