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