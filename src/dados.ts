/**
 * Dados do dashboard. Mockados de propósito: a Vitrine é uma vitrine — o valor
 * está no processo que produz o código, não no dado que ele exibe.
 */

export interface Metrica {
  chave: string;
  rotulo: string;
  valor: string;
  variacao: number;
  unidade: string;
}

export interface LinhaMovimento {
  id: string;
  descricao: string;
  categoria: "Liquidação" | "Repasse" | "Estorno" | "Tarifa";
  valorCentavos: number;
  em: string;
}

export const metricas: Metrica[] = [
  { chave: "volume", rotulo: "Volume transacionado", valor: "R$ 4,82 mi", variacao: 12.4, unidade: "%" },
  { chave: "ticket", rotulo: "Ticket médio", valor: "R$ 187,40", variacao: -3.1, unidade: "%" },
  { chave: "aprovacao", rotulo: "Taxa de aprovação", valor: "94,7%", variacao: 1.8, unidade: "p.p." },
  { chave: "chamados", rotulo: "Chamados abertos", valor: "37", variacao: -18.0, unidade: "%" },
];

export const movimentos: LinhaMovimento[] = [
  { id: "mv-1041", descricao: "Liquidação lote 4471", categoria: "Liquidação", valorCentavos: 128940000, em: "2026-08-05T14:22:00Z" },
  { id: "mv-1040", descricao: "Estorno parcial — pedido 88210", categoria: "Estorno", valorCentavos: -1899000, em: "2026-08-05T11:03:00Z" },
  { id: "mv-1039", descricao: "Repasse parceiro Norte", categoria: "Repasse", valorCentavos: 44120000, em: "2026-08-04T18:47:00Z" },
  { id: "mv-1038", descricao: "Tarifa de manutenção", categoria: "Tarifa", valorCentavos: -320000, em: "2026-08-04T09:15:00Z" },
  { id: "mv-1037", descricao: "Liquidação lote 4468", categoria: "Liquidação", valorCentavos: 97350000, em: "2026-08-03T16:30:00Z" },
  { id: "mv-1036", descricao: "Repasse parceiro Sul", categoria: "Repasse", valorCentavos: 31280000, em: "2026-08-03T10:05:00Z" },
];

/** Volume diário (em R$ milhões) da última semana — para o gráfico de barras. */
export const volumeSemana: { dia: string; milhoes: number }[] = [
  { dia: "Seg", milhoes: 3.9 },
  { dia: "Ter", milhoes: 4.4 },
  { dia: "Qua", milhoes: 4.1 },
  { dia: "Qui", milhoes: 5.2 },
  { dia: "Sex", milhoes: 4.82 },
  { dia: "Sáb", milhoes: 2.1 },
  { dia: "Dom", milhoes: 1.4 },
];

export function formatarReais(centavos: number): string {
  return (centavos / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatarData(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}
