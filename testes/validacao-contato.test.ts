import { describe, expect, it } from "vitest";
import { validarContato } from "@/lib/validacao-contato";

describe("validarContato", () => {
  // --- Caso feliz ---
  it("retorna valido=true quando todos os campos estão preenchidos corretamente", () => {
    const resultado = validarContato({
      nome: "Ana",
      email: "ana@empresa.com.br",
      mensagem: "Olá, gostaria de saber mais sobre o produto.",
    });
    expect(resultado.valido).toBe(true);
    expect(resultado.erros).toEqual({});
  });

  // --- Nome ---
  it("rejeita nome vazio", () => {
    const resultado = validarContato({
      nome: "",
      email: "ana@empresa.com",
      mensagem: "Olá, gostaria de saber mais.",
    });
    expect(resultado.valido).toBe(false);
    expect(resultado.erros.nome).toBe("informe seu nome");
  });

  it("rejeita nome com apenas espaços", () => {
    const resultado = validarContato({
      nome: "   ",
      email: "ana@empresa.com",
      mensagem: "Olá, gostaria de saber mais.",
    });
    expect(resultado.valido).toBe(false);
    expect(resultado.erros.nome).toBe("informe seu nome");
  });

  it("rejeita nome com menos de 2 caracteres após trim", () => {
    const resultado = validarContato({
      nome: "A",
      email: "ana@empresa.com",
      mensagem: "Olá, gostaria de saber mais.",
    });
    expect(resultado.valido).toBe(false);
    expect(resultado.erros.nome).toBe("informe um nome com pelo menos 2 caracteres");
  });

  it("aceita nome com exatamente 2 caracteres", () => {
    const resultado = validarContato({
      nome: "An",
      email: "ana@empresa.com",
      mensagem: "Olá, gostaria de saber mais.",
    });
    expect(resultado.valido).toBe(true);
  });

  it("ignora espaços nas pontas do nome", () => {
    const resultado = validarContato({
      nome: "  Ana  ",
      email: "ana@empresa.com",
      mensagem: "Olá, gostaria de saber mais.",
    });
    expect(resultado.valido).toBe(true);
  });

  // --- E-mail ---
  it("rejeita e-mail vazio", () => {
    const resultado = validarContato({
      nome: "Ana",
      email: "",
      mensagem: "Olá, gostaria de saber mais.",
    });
    expect(resultado.valido).toBe(false);
    expect(resultado.erros.email).toBe("informe seu e-mail");
  });

  it("rejeita e-mail com dois arrobas", () => {
    const resultado = validarContato({
      nome: "Ana",
      email: "ana@@empresa.com",
      mensagem: "Olá, gostaria de saber mais.",
    });
    expect(resultado.valido).toBe(false);
    expect(resultado.erros.email).toBe("informe um e-mail com domínio completo");
  });

  it("rejeita e-mail sem ponto no domínio", () => {
    const resultado = validarContato({
      nome: "Ana",
      email: "ana@empresa",
      mensagem: "Olá, gostaria de saber mais.",
    });
    expect(resultado.valido).toBe(false);
    expect(resultado.erros.email).toBe("informe um e-mail com domínio completo");
  });

  it("rejeita e-mail com ponto na primeira posição do domínio", () => {
    const resultado = validarContato({
      nome: "Ana",
      email: "ana@.com",
      mensagem: "Olá, gostaria de saber mais.",
    });
    expect(resultado.valido).toBe(false);
    expect(resultado.erros.email).toBe("informe um e-mail com domínio completo");
  });

  it("rejeita e-mail com ponto na última posição do domínio", () => {
    const resultado = validarContato({
      nome: "Ana",
      email: "ana@empresa.",
      mensagem: "Olá, gostaria de saber mais.",
    });
    expect(resultado.valido).toBe(false);
    expect(resultado.erros.email).toBe("informe um e-mail com domínio completo");
  });

  it("aceita e-mail com sinal de mais (caractere especial comum)", () => {
    const resultado = validarContato({
      nome: "Ana",
      email: "ana+cobranca@empresa.com",
      mensagem: "Olá, gostaria de saber mais.",
    });
    expect(resultado.valido).toBe(true);
  });

  it("aceita e-mail com domínio multinível", () => {
    const resultado = validarContato({
      nome: "Ana",
      email: "ana@empresa.com.br",
      mensagem: "Olá, gostaria de saber mais.",
    });
    expect(resultado.valido).toBe(true);
  });

  it("rejeita e-mail sem nada antes do @", () => {
    const resultado = validarContato({
      nome: "Ana",
      email: "@empresa.com",
      mensagem: "Olá, gostaria de saber mais.",
    });
    expect(resultado.valido).toBe(false);
    expect(resultado.erros.email).toBe("informe um e-mail com domínio completo");
  });

  it("rejeita e-mail com apenas espaços", () => {
    const resultado = validarContato({
      nome: "Ana",
      email: "   ",
      mensagem: "Olá, gostaria de saber mais.",
    });
    expect(resultado.valido).toBe(false);
    expect(resultado.erros.email).toBe("informe seu e-mail");
  });

  // --- Mensagem ---
  it("rejeita mensagem vazia", () => {
    const resultado = validarContato({
      nome: "Ana",
      email: "ana@empresa.com",
      mensagem: "",
    });
    expect(resultado.valido).toBe(false);
    expect(resultado.erros.mensagem).toBe("escreva sua mensagem");
  });

  it("rejeita mensagem com menos de 10 caracteres após trim", () => {
    const resultado = validarContato({
      nome: "Ana",
      email: "ana@empresa.com",
      mensagem: "Olá",
    });
    expect(resultado.valido).toBe(false);
    expect(resultado.erros.mensagem).toBe("escreva pelo menos 10 caracteres");
  });

  it("rejeita mensagem com apenas espaços", () => {
    const resultado = validarContato({
      nome: "Ana",
      email: "ana@empresa.com",
      mensagem: "          ",
    });
    expect(resultado.valido).toBe(false);
    expect(resultado.erros.mensagem).toBe("escreva sua mensagem");
  });

  it("aceita mensagem com exatamente 10 caracteres", () => {
    const resultado = validarContato({
      nome: "Ana",
      email: "ana@empresa.com",
      mensagem: "0123456789",
    });
    expect(resultado.valido).toBe(true);
  });

  it("ignora espaços nas pontas da mensagem", () => {
    const resultado = validarContato({
      nome: "Ana",
      email: "ana@empresa.com",
      mensagem: "  Olá, tudo bem?  ",
    });
    expect(resultado.valido).toBe(true);
  });

  // --- Múltiplos erros simultâneos ---
  it("acumula erros de todos os campos vazios", () => {
    const resultado = validarContato({
      nome: "",
      email: "",
      mensagem: "",
    });
    expect(resultado.valido).toBe(false);
    expect(resultado.erros.nome).toBe("informe seu nome");
    expect(resultado.erros.email).toBe("informe seu e-mail");
    expect(resultado.erros.mensagem).toBe("escreva sua mensagem");
  });

  it("acumula erros de formato inválido em lote", () => {
    const resultado = validarContato({
      nome: "A",
      email: "invalido",
      mensagem: "curta",
    });
    expect(resultado.valido).toBe(false);
    expect(resultado.erros.nome).toBe("informe um nome com pelo menos 2 caracteres");
    expect(resultado.erros.email).toBe("informe um e-mail com domínio completo");
    expect(resultado.erros.mensagem).toBe("escreva pelo menos 10 caracteres");
  });
});