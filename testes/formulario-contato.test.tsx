import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FormularioContato } from "@/components/formulario-contato";

function preencherValido() {
  fireEvent.change(screen.getByLabelText("Nome"), {
    target: { value: "Ana" },
  });
  fireEvent.change(screen.getByLabelText("E-mail"), {
    target: { value: "ana@empresa.com" },
  });
  fireEvent.change(screen.getByLabelText("Mensagem"), {
    target: { value: "Olá, gostaria de saber mais sobre o produto." },
  });
}

describe("FormularioContato", () => {
  // --- Critério 5: botão desabilitado/habilitado ---

  it("inicia com o botão Enviar desabilitado (campos vazios)", () => {
    render(<FormularioContato />);
    const botao = screen.getByRole("button", { name: /enviar/i });
    expect(botao).toBeDisabled();
  });

  it("mantém o botão desabilitado com campos parcialmente preenchidos", () => {
    render(<FormularioContato />);
    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "Ana" },
    });
    const botao = screen.getByRole("button", { name: /enviar/i });
    expect(botao).toBeDisabled();
  });

  it("habilita o botão Enviar quando todos os campos estão válidos", () => {
    render(<FormularioContato />);
    preencherValido();
    const botao = screen.getByRole("button", { name: /enviar/i });
    expect(botao).toBeEnabled();
  });

  it("desabilita o botão novamente se um campo for esvaziado após estar válido", () => {
    render(<FormularioContato />);
    preencherValido();
    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "" },
    });
    const botao = screen.getByRole("button", { name: /enviar/i });
    expect(botao).toBeDisabled();
  });

  // --- Critério 6: erros só aparecem após interação ---

  it("não mostra erro de campo antes de qualquer interação", () => {
    render(<FormularioContato />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("mostra erro do campo após perder foco (onBlur) com valor inválido", () => {
    render(<FormularioContato />);
    const inputNome = screen.getByLabelText("Nome");
    fireEvent.focus(inputNome);
    fireEvent.blur(inputNome);
    expect(screen.getByRole("alert")).toHaveTextContent("informe seu nome");
  });

  it("mostra erro apenas do campo tocado, não dos não tocados", () => {
    render(<FormularioContato />);
    const inputEmail = screen.getByLabelText("E-mail");
    fireEvent.focus(inputEmail);
    fireEvent.blur(inputEmail);
    const alerts = screen.queryAllByRole("alert");
    expect(alerts).toHaveLength(1);
    expect(alerts[0]).toHaveTextContent("informe seu e-mail");
  });

  it("remove erro do campo quando ele passa a ser válido após toque", () => {
    render(<FormularioContato />);
    const inputNome = screen.getByLabelText("Nome");
    fireEvent.focus(inputNome);
    fireEvent.blur(inputNome);
    expect(screen.getByRole("alert")).toHaveTextContent("informe seu nome");

    fireEvent.change(inputNome, { target: { value: "Ana" } });
    expect(screen.queryByText("informe seu nome")).not.toBeInTheDocument();
  });

  // --- Erros ao submeter formulário inválido ---
  // O botão está desabilitado com campos vazios, mas podemos disparar
  // o submit do formulário programaticamente via fireEvent.submit no form.

  it("mostra erros de todos os campos ao submeter formulário inválido", () => {
    render(<FormularioContato />);
    const form = screen.getByRole("button", { name: /enviar/i }).closest("form")!;
    fireEvent.submit(form);
    const alerts = screen.queryAllByRole("alert");
    expect(alerts).toHaveLength(3);
  });

  it("envio inválido não exibe mensagem de agradecimento", () => {
    render(<FormularioContato />);
    const form = screen.getByRole("button", { name: /enviar/i }).closest("form")!;
    fireEvent.submit(form);
    expect(
      screen.queryByText("Recebemos sua mensagem. Obrigado!"),
    ).not.toBeInTheDocument();
  });

  // --- Acessibilidade ---

  it("campos têm label associado por htmlFor", () => {
    render(<FormularioContato />);
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.getByLabelText("Mensagem")).toBeInTheDocument();
  });

  it("campo inválido e tocado tem aria-invalid=true", () => {
    render(<FormularioContato />);
    const inputNome = screen.getByLabelText("Nome");
    fireEvent.focus(inputNome);
    fireEvent.blur(inputNome);
    expect(inputNome).toHaveAttribute("aria-invalid", "true");
  });

  it("campo inválido e tocado tem aria-describedby apontando para o erro", () => {
    render(<FormularioContato />);
    const inputNome = screen.getByLabelText("Nome");
    fireEvent.focus(inputNome);
    fireEvent.blur(inputNome);
    expect(inputNome).toHaveAttribute("aria-describedby", "erro-nome");
  });

  it("campo válido não tem aria-invalid", () => {
    render(<FormularioContato />);
    const inputNome = screen.getByLabelText("Nome");
    fireEvent.change(inputNome, { target: { value: "Ana" } });
    expect(inputNome).not.toHaveAttribute("aria-invalid");
  });

  it("mensagem de erro tem role=alert", () => {
    render(<FormularioContato />);
    const inputNome = screen.getByLabelText("Nome");
    fireEvent.focus(inputNome);
    fireEvent.blur(inputNome);
    const erro = screen.getByRole("alert");
    expect(erro).toHaveAttribute("id", "erro-nome");
  });

  // --- Comportamento de envio bem-sucedido ---

  it("envio bem-sucedido exibe mensagem de agradecimento", () => {
    render(<FormularioContato />);
    preencherValido();
    const botao = screen.getByRole("button", { name: /enviar/i });
    fireEvent.click(botao);
    expect(
      screen.getByText("Recebemos sua mensagem. Obrigado!"),
    ).toBeInTheDocument();
  });

  it("envio bem-sucedido limpa os campos", () => {
    render(<FormularioContato />);
    preencherValido();
    const botao = screen.getByRole("button", { name: /enviar/i });
    fireEvent.click(botao);
    expect(screen.getByLabelText("Nome")).toHaveValue("");
    expect(screen.getByLabelText("E-mail")).toHaveValue("");
    expect(screen.getByLabelText("Mensagem")).toHaveValue("");
  });
});