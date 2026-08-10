/**
 * Tokens de design da Vitrine. Toda cor e espaçamento saem daqui — componente
 * que hardcoda hexadecimal está fora da convenção.
 */
export const tokens = {
  cor: {
    marca: "#1F4B99",
    marcaEscura: "#16376F",
    texto: "#14181F",
    textoSuave: "#5A6472",
    fundo: "#FFFFFF",
    fundoSuave: "#F4F6FA",
    borda: "#D9DFE9",
    positivo: "#1B7F53",
    atencao: "#A8620B",
    erro: "#B3261E",
  },
  espaco: { xs: "4px", sm: "8px", md: "16px", lg: "24px", xl: "40px" },
  raio: { sm: "6px", md: "10px" },
} as const;
