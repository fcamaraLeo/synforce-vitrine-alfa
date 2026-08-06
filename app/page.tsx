import Link from "next/link";
import { FormularioContato } from "@/components/formulario-contato";

export default function Landing() {
  return (
    <>
      <section className="heroi">
        <h1>Liquidação e repasse, sem planilha no meio do caminho.</h1>
        <p>
          A Vitrine consolida volume, aprovação e repasses num painel só, para
          que o time financeiro pare de reconciliar arquivo por arquivo.
        </p>
        <p style={{ marginTop: 24 }}>
          <Link href="/dashboard" className="botao-primario" style={{ textDecoration: "none" }}>
            Ver o dashboard
          </Link>
        </p>
      </section>

      <section className="secao">
        <h2>Como funciona</h2>
        <div className="grade-metricas">
          <div className="cartao">
            <div className="valor">1</div>
            <p>Conecte a origem dos lotes de liquidação.</p>
          </div>
          <div className="cartao">
            <div className="valor">2</div>
            <p>A Vitrine concilia repasses, tarifas e estornos.</p>
          </div>
          <div className="cartao">
            <div className="valor">3</div>
            <p>O time acompanha tudo num painel, com histórico.</p>
          </div>
        </div>
      </section>

      <section className="secao" id="contato">
        <h2>Fale com a gente</h2>
        <p>Conte o que você precisa conciliar e respondemos em um dia útil.</p>
        <FormularioContato />
      </section>
    </>
  );
}
