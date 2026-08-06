import type { Metrica } from "@/lib/dados-mock";

export function CartaoMetrica({ metrica }: { metrica: Metrica }) {
  const subiu = metrica.variacao >= 0;
  return (
    <div className="cartao">
      <div className="rotulo">{metrica.rotulo}</div>
      <div className="valor">{metrica.valor}</div>
      <div className={subiu ? "positivo" : "negativo"}>
        {subiu ? "▲" : "▼"} {Math.abs(metrica.variacao).toLocaleString("pt-BR")}
        {metrica.unidade} vs. mês anterior
      </div>
    </div>
  );
}
