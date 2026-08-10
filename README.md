# Vitrine — Dashboard

App **React (Vite)** com o painel de liquidação e repasse da Vitrine. Projeto-alvo
da PoC Squad Sintética — é aqui que a squad de agentes trabalha.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # gera dist/ (estático)
npm run checar    # tipos
```

## Estrutura

```
src/
  App.tsx              layout do dashboard
  dados.ts             métricas e movimentos (mockados) + formatação
  tokens.ts            tokens de design (cores, espaçamento)
  estilos.css          folha única, dirigida por variáveis CSS
  componentes/
    CartaoMetrica.tsx  cartão de KPI
    GraficoVolume.tsx  barras de volume (SVG puro)
    TabelaMovimentos.tsx
```

Os dados são fictícios de propósito: o valor da PoC está no processo que produz
o código, não no número exibido.
