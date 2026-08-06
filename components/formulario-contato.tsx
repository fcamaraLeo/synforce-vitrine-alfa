"use client";

import { useState } from "react";

export interface CamposContato {
  nome: string;
  email: string;
  mensagem: string;
}

const VAZIO: CamposContato = { nome: "", email: "", mensagem: "" };

export function FormularioContato() {
  const [campos, setCampos] = useState<CamposContato>(VAZIO);
  const [enviado, setEnviado] = useState(false);

  function alterar(campo: keyof CamposContato, valor: string) {
    setCampos((atual) => ({ ...atual, [campo]: valor }));
    setEnviado(false);
  }

  function enviar(evento: React.FormEvent) {
    evento.preventDefault();
    setEnviado(true);
    setCampos(VAZIO);
  }

  return (
    <form onSubmit={enviar} noValidate>
      <div className="campo">
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          name="nome"
          value={campos.nome}
          onChange={(e) => alterar("nome", e.target.value)}
        />
      </div>

      <div className="campo">
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          name="email"
          type="text"
          value={campos.email}
          onChange={(e) => alterar("email", e.target.value)}
        />
      </div>

      <div className="campo">
        <label htmlFor="mensagem">Mensagem</label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={4}
          value={campos.mensagem}
          onChange={(e) => alterar("mensagem", e.target.value)}
        />
      </div>

      <button type="submit" className="botao-primario">
        Enviar
      </button>

      {enviado && <p className="positivo">Recebemos sua mensagem. Obrigado!</p>}
    </form>
  );
}
