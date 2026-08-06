/**
 * Validação do formulário de contato da Vitrine Alfa.
 *
 * Regra objetiva exportada como função pura para ser testável sem montar
 * componente — ver `convencoes.md`.
 *
 * Nenhum dado de pessoa é logado aqui; os campos retornados são apenas os
 * erros ou a ausência deles.
 */

export interface ErrosContato {
  nome?: string;
  email?: string;
  mensagem?: string;
}

export interface ValidacaoContato {
  valido: boolean;
  erros: ErrosContato;
}

interface CamposBrutos {
  nome: string;
  email: string;
  mensagem: string;
}

/**
 * Valida os campos do formulário de contato e retorna o resultado.
 *
 * - `valido` é `true` quando nenhum erro foi encontrado.
 * - `erros` contém mensagens apenas para campos inválidos; campos válidos não
 *   têm chave no objeto.
 */
export function validarContato(campos: CamposBrutos): ValidacaoContato {
  const erros: ErrosContato = {};

  const nome = campos.nome.trim();
  if (nome.length === 0) {
    erros.nome = "informe seu nome";
  } else if (nome.length < 2) {
    erros.nome = "informe um nome com pelo menos 2 caracteres";
  }

  const email = campos.email.trim();
  if (email.length === 0) {
    erros.email = "informe seu e-mail";
  } else if (!emailValido(email)) {
    erros.email = "informe um e-mail com domínio completo";
  }

  const mensagem = campos.mensagem.trim();
  if (mensagem.length === 0) {
    erros.mensagem = "escreva sua mensagem";
  } else if (mensagem.length < 10) {
    erros.mensagem = "escreva pelo menos 10 caracteres";
  }

  return {
    valido: Object.keys(erros).length === 0,
    erros,
  };
}

/**
 * Verifica se o e-mail tem formato válido segundo as regras do projeto:
 * - Exatamente um `@`.
 * - Pelo menos um caractere antes do `@`.
 * - Depois do `@`, um domínio com pelo menos um ponto que não está na
 *   primeira nem na última posição do domínio.
 */
function emailValido(email: string): boolean {
  const partes = email.split("@");
  if (partes.length !== 2) return false;

  const [local, dominio] = partes;
  if (local.length < 1) return false;

  if (dominio.length < 1) return false;

  const segmentos = dominio.split(".");
  if (segmentos.length < 2) return false;
  if (segmentos.some((s) => s.length === 0)) return false;

  return true;
}