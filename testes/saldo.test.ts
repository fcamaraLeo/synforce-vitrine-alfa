import { describe, it, expect } from "vitest";
import { calcularSaldo, formatarAriaLabelSaldo } from "../src/saldo.ts";
import type { LinhaMovimento } from "../src/dados.ts";

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
  it("retorna 0 para array vazio", () => {
    expect(calcularSaldo([])).toBe(0);
  });

  it("soma corretamente array com um único valor positivo", () => {
    expect(calcularSaldo([movimento({ valorCentavos: 150000 })])).toBe(150000);
  });

  it("soma corretamente array com um único valor negativo", () => {
    expect(calcularSaldo([movimento({ valorCentavos: -75000 })])).toBe(-75000);
  });

  it("soma vários valores positivos e negativos (soma líquida positiva)", () => {
    const movimentos = [
      movimento({ valorCentavos: 500000 }),
      movimento({ valorCentavos: -200000 }),
      movimento({ valorCentavos: 100000 }),
    ];
    expect(calcularSaldo(movimentos)).toBe(400000);
  });

  it("soma vários valores positivos e negativos (soma líquida negativa)", () => {
    const movimentos = [
      movimento({ valorCentavos: 100000 }),
      movimento({ valorCentavos: -300000 }),
      movimento({ valorCentavos: -50000 }),
    ];
    expect(calcularSaldo(movimentos)).toBe(-250000);
  });

  it("soma exatamente zero quando valores se anulam", () => {
    const movimentos = [
      movimento({ valorCentavos: 123450 }),
      movimento({ valorCentavos: -123450 }),
    ];
    expect(calcularSaldo(movimentos)).toBe(0);
  });

  it("soma valores grandes com precisão (centavos)", () => {
    const movimentos = [
      movimento({ valorCentavos: 999999999 }),
      movimento({ valorCentavos: -1 }),
      movimento({ valorCentavos: 1 }),
    ];
    expect(calcularSaldo(movimentos)).toBe(999999999);
  });

  it("não usa Math.abs — preserva o sinal de cada movimento", () => {
    const movimentos = [
      movimento({ valorCentavos: -1000 }),
      movimento({ valorCentavos: -2000 }),
    ];
    expect(calcularSaldo(movimentos)).toBe(-3000);
  });
});

describe("formatarAriaLabelSaldo", () => {
  it("retorna 'zero reais' quando total é zero", () => {
    expect(formatarAriaLabelSaldo(0)).toBe("Saldo consolidado: zero reais");
  });

  it("retorna label positivo quando total é positivo", () => {
    const label = formatarAriaLabelSaldo(12345);
    expect(label).toBe("Saldo consolidado: 123 reais e 45 centavos");
  });

  it("retorna label negativo com prefixo 'menos' quando total é negativo", () => {
    const label = formatarAriaLabelSaldo(-12345);
    expect(label).toBe("Saldo consolidado negativo: menos 123 reais e 45 centavos");
  });

  it("lida com centavos sem reais", () => {
    expect(formatarAriaLabelSaldo(45)).toBe("Saldo consolidado: 45 centavos");
    expect(formatarAriaLabelSaldo(-45)).toBe("Saldo consolidado negativo: menos 45 centavos");
  });

  it("lida com reais sem centavos", () => {
    expect(formatarAriaLabelSaldo(10000)).toBe("Saldo consolidado: 100 reais");
    expect(formatarAriaLabelSaldo(-10000)).toBe("Saldo consolidado negativo: menos 100 reais");
  });
});