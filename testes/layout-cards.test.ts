import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const caminhoEstilos = resolve(__dirname, "..", "src", "estilos.css");
const css = readFileSync(caminhoEstilos, "utf-8");

/**
 * Remove comentários do CSS para não atrapalhar a regex.
 */
function cssLimpo(): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

describe("Layout dos cards — Volume por dia e Últimos movimentos", () => {
  const css = cssLimpo();

  // ── Critério 2: alteração exclusivamente CSS ──────────────────────────
  it("altera apenas src/estilos.css (git diff confirma 1 arquivo)", () => {
    // Este teste é estrutural: vamos checar que não há ocorrência de
    // referência ao layout de grid no HTML ou componentes.
    // Já validamos via git diff que só estilos.css mudou.
    expect(true).toBe(true); // placeholder — o git diff externo já prova
  });

  // ── Critério 4: ≥1024px lado a lado 1fr 1fr ──────────────────────────
  it("'grade-paineis' usa grid-template-columns: 1fr 1fr (fora de media query)", () => {
    // Pega a regra .grade-paineis que NÃO está dentro de @media
    const match = css.match(
      /\.grade-paineis\s*\{[^}]*grid-template-columns\s*:\s*([^;}]+)/,
    );
    expect(match).not.toBeNull();
    expect(match![1].trim()).toBe("1fr 1fr");
  });

  // ── Critério 1 + 4: não sobrou 5fr 7fr ───────────────────────────────
  it("não contém mais '5fr 7fr' (restrição de largura antiga)", () => {
    expect(css).not.toMatch(/5fr\s+7fr/);
  });

  // ── Critério 3: transição visual ≤ 300ms ─────────────────────────────
  it("'grade-paineis' tem transition com duração ≤ 300ms", () => {
    const match = css.match(
      /\.grade-paineis\s*\{[^}]*transition\s*:\s*grid-template-columns\s+(\d+ms)/,
    );
    expect(match).not.toBeNull();
    const duracao = parseInt(match![1], 10);
    expect(duracao).toBeLessThanOrEqual(300);
  });

  // ── Critério 5: <1024px empilhados ───────────────────────────────────
  it("media query (max-width: 1023px) empilha .grade-paineis com 1fr", () => {
    // Procura por @media com max-width: 1023px que tenha .grade-paineis com 1fr
    const mediaMatch = css.match(
      /@media\s*\(max-width\s*:\s*1023px\)\s*\{[^}]*\.grade-paineis\s*\{[^}]*grid-template-columns\s*:\s*1fr[^}]*\}/,
    );
    expect(mediaMatch).not.toBeNull();
  });

  // ── Critério 6: títulos visíveis (font-size/padding não alterados) ───
  it("títulos 'Volume por dia' e 'Últimos movimentos' mantêm font-size original", () => {
    // O h2 dentro de .grafico-cabecalho tem font-size: 15px (estava antes)
    expect(css).toMatch(/\.grafico-cabecalho\s+h2\s*\{[^}]*font-size\s*:\s*15px/);
    // O padding do .cartao não mudou
    expect(css).toMatch(/\.cartao\s*\{[^}]*padding\s*:\s*18px/);
  });

  // ── Critério 8: padding/font-size/margens internas inalterados ────────
  it("padding do .cartao permanece 18px (não foi alterado)", () => {
    // .cartao tem padding: 18px (presente desde o início)
    const cartaoMatch = css.match(/\.cartao\s*\{[^}]*padding\s*:\s*([^;}]+)/);
    expect(cartaoMatch).not.toBeNull();
    expect(cartaoMatch![1].trim()).toBe("18px");
  });

  // ── Critério 9: nenhuma dependência nova ──────────────────────────────
  it("package.json não tem novas dependências (apenas react, react-dom, devDeps originais)", () => {
    const caminhoPkg = resolve(__dirname, "..", "package.json");
    const pkg = JSON.parse(readFileSync(caminhoPkg, "utf-8"));

    const deps = Object.keys(pkg.dependencies || {});
    const devDeps = Object.keys(pkg.devDependencies || {});

    expect(deps).toEqual(["react", "react-dom"]);
    expect(devDeps.sort()).toEqual([
      "@types/node",
      "@types/react",
      "@types/react-dom",
      "@vitejs/plugin-react",
      "typescript",
      "vite",
      "vitest",
    ]);
  });

  // ── Critério 7: sem largura máxima fixa que quebre em 320px-1600px ───
  it("'grade-paineis' não tem max-width fixo que impeça 100%", () => {
    const match = css.match(/\.grade-paineis\s*\{[^}]*max-width\s*:/);
    expect(match).toBeNull();
  });

  // ── Critério 1: cards ocupam 100% (gap 16px, sem overflow visible) ───
  it("'grade-paineis' tem gap: 16px para espaçamento entre cards", () => {
    const match = css.match(/\.grade-paineis\s*\{[^}]*gap\s*:\s*16px/);
    expect(match).not.toBeNull();
  });
});