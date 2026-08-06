"use client";

import { useState, useCallback } from "react";
import { validarContato } from "@/lib/validacao-contato";

export interface CamposContato {
  nome: string;
  email: string;
  mensagem: string;
}

const VAZIO: CamposContato = { nome: "", email: "", mensagem: "" };

export function FormularioContato() {
  const [campos, setCampos] = useState<CamposContato>(VAZIO);
  const [tocados, setTocados] = useState<Set<keyof CamposContato>>(new Set());
  const [enviado, setEnviado] = useState(false);

  const { valido, erros } = validarContato(campos);

  function alterar(campo: keyof CamposContato, valor: string) {
    setCampos((atual) => ({ ...atual, [campo]: valor }));
    setEnviado(false);
  }

  const marcarTocado = useCallback(
    (campo: keyof CamposContato) => {
      setTocados((atual) => new Set(atual).add(campo));
    },
    [],
  );

  function enviar(evento: React.FormEvent) {
    evento.preventDefault();

    // Marca todos como tocados para mostrar os erros ao tentar enviar
    setTocados(new Set(["nome", "email", "mensagem"]));

    if (!valido) return;

    setEnviado(true);
    setCampos(VAZIO);
    setTocados(new Set());
  }

  function mostrarErro(campo: keyof CamposContato): string | undefined {
    if (!tocados.has(campo)) return undefined;
    return erros[campo as keyof typeof erros];
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
          onBlur={() => marcarTocado("nome")}
          aria-describedby={mostrarErro("nome") ? "erro-nome" : undefined}
          aria-invalid={mostrarErro("nome") ? true : undefined}
        />
        {mostrarErro("nome") && (
          <p className="erro" id="erro-nome" role="alert">
            {mostrarErro("nome")}
          </p>
        )}
      </div>

      <div className="campo">
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          name="email"
          type="text"
          value={campos.email}
          onChange={(e) => alterar("email", e.target.value)}
          onBlur={() => marcarTocado("email")}
          aria-describedby={mostrarErro("email") ? "erro-email" : undefined}
          aria-invalid={mostrarErro("email") ? true : undefined}
        />
        {mostrarErro("email") && (
          <p className="erro" id="erro-email" role="alert">
            {mostrarErro("email")}
          </p>
        )}
      </div>

      <div className="campo">
        <label htmlFor="mensagem">Mensagem</label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={4}
          value={campos.mensagem}
          onChange={(e) => alterar("mensagem", e.target.value)}
          onBlur={() => marcarTocado("mensagem")}
          aria-describedby={
            mostrarErro("mensagem") ? "erro-mensagem" : undefined
          }
          aria-invalid={mostrarErro("mensagem") ? true : undefined}
        />
        {mostrarErro("mensagem") && (
          <p className="erro" id="erro-mensagem" role="alert">
            {mostrarErro("mensagem")}
          </p>
        )}
      </div>

      <button type="submit" className="botao-primario" disabled={!valido}>
        Enviar
      </button>

      {enviado && <p className="positivo">Recebemos sua mensagem. Obrigado!</p>}
    </form>
  );
}