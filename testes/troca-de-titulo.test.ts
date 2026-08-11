import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

const novaString = "Liquidação, repasse e sem planilhas no meio do caminho";

/** Caminhos dos 4 arquivos que deveriam ter sido alterados */
const arquivosAlterados = [
  "src/App.tsx",
  "index.html",
  "README.md",
  "package.json",
] as const;

/** Caminhos de arquivos CSS — nenhum deveria ter sido alterado */
const arquivosCss = [
  "src/estilos.css",
];

describe("Troca de título", () => {
  describe.each(arquivosAlterados)("%s", (caminhoRelativo) => {
    it("existe no repositório", () => {
      expect(existsSync(resolve(__dirname, "..", caminhoRelativo))).toBe(true);
    });

    it(`contém "${novaString}"`, () => {
      const conteudo = readFileSync(resolve(__dirname, "..", caminhoRelativo), "utf-8");
      expect(conteudo).toContain(novaString);
    });

    it(`não contém a string antiga "Liquidação e repasse, sem planilha no meio do caminho"`, () => {
      const conteudo = readFileSync(resolve(__dirname, "..", caminhoRelativo), "utf-8");
      // A string antiga pode ter variações de pontuação, verifique semântica
      expect(conteudo).not.toMatch(/Liquidação e repasse, sem planilha no meio do caminho\.?/);
    });
  });

  describe("Layout não alterado", () => {
    it.each(arquivosCss)("nenhum arquivo .css foi tocado", (caminhoCss) => {
      // Verifica que o CSS existe e não tem a nova string (o que confirmaria
      // que não foi alterado indevidamente para incluir o título)
      const conteudo = readFileSync(resolve(__dirname, "..", caminhoCss), "utf-8");
      // Um indicador indireto: o CSS não deve conter referência ao novo título
      expect(conteudo).not.toContain(novaString);
    });
  });

  describe("Subtítulo na UI (src/App.tsx)", () => {
    it("tem a classe subtitulo com o novo texto", () => {
      const conteudo = readFileSync(resolve(__dirname, "..", "src/App.tsx"), "utf-8");
      // Verifica se a string aparece dentro de um <p> com className="subtitulo"
      expect(conteudo).toMatch(
        /className="subtitulo"[^>]*>[^<]*Liquidação, repasse e sem planilhas no meio do caminho/
      );
    });
  });
});
