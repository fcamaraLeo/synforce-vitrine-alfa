import { describe, expect, it } from "vitest";
import { formatarReais, metricas, movimentos } from "@/lib/dados-mock";

/** O Intl separa "R$" do número com espaço não-separável; normalizamos para comparar. */
const normalizar = (s: string) => s.replace(/\u00A0/g, " ");

describe("formatarReais", () => {
  it("formata centavos como moeda brasileira", () => {
    expect(normalizar(formatarReais(128940000))).toBe("R$ 1.289.400,00");
  });

  it("mantém o sinal de valores negativos", () => {
    expect(formatarReais(-1899000)).toContain("-");
  });
});

describe("dados do dashboard", () => {
  it("tem chave única por métrica", () => {
    const chaves = metricas.map((m) => m.chave);
    expect(new Set(chaves).size).toBe(chaves.length);
  });

  it("tem identificador único por movimento", () => {
    const ids = movimentos.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
