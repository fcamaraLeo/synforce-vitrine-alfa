import { describe, it, expect } from "vitest";
import { calcularSaldo } from "./saldo.ts";
import type { LinhaMovimento } from "./dados.ts";

function movimento(parcial: Partial<LinhaMovimento>): LinhaMovimento {
  return {
    id: "teste",
    descricao: "Movimento de teste",
    categoria: "Liquidação",
    valorCentavos: 0,
    em: "2026-08-05T14:22:00Z",
    ...parcial,
  };
}

describe("calcularSaldo", () => {
  it("soma valores positivos e negativos corretamente (sinais misturados)", () => {
    const movimentos = [
      movimento({ valorCentavos: 128940000 }),
      movimento({ valorCentavos: -1899000 }),
      movimento({ valorCentavos: 44120000 }),
      movimento({ valorCentavos: -320000 }),
      movimento({ valorCentavos: 97350000 }),
      movimento({ valorCentavos: 31280000 }),
    ];
    const resultado = calcularSaldo(movimentos);
    // 128940000 - 1899000 + 44120000 - 320000 + 97350000 + 31280000 = 299471000
    expect(resultado).toBe(299471000);
  });

  it("retorna 0 para lista vazia", () => {
    expect(calcularSaldo([])).toBe(0);
  });

  it("soma todos os movimentos negativos", () => {
    const movimentos = [
      movimento({ valorCentavos: -500000 }),
      movimento({ valorCentavos: -120000 }),
      movimento({ valorCentavos: -30000 }),
    ];
    expect(calcularSaldo(movimentos)).toBe(-650000);
  });

  it("funciona com um único movimento", () => {
    expect(calcularSaldo([movimento({ valorCentavos: 100000 })])).toBe(100000);
  });

  it("não usa Math.abs — preserva o sinal de cada movimento", () => {
    const movimentos = [
      movimento({ valorCentavos: -1000 }),
      movimento({ valorCentavos: -2000 }),
    ];
    expect(calcularSaldo(movimentos)).toBe(-3000);
  });
});
