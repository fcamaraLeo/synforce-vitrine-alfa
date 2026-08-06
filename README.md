# Vitrine

Landing e dashboard de demonstração — o projeto-alvo da plataforma Squad Sintética.

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # suíte com vitest
npm run checar   # tipos
```

## Estrutura

```
app/            rotas (App Router): landing em /, dashboard em /dashboard
components/     componentes de interface
lib/            tokens de design, dados mockados e regras puras
testes/         suíte vitest — arquivos *.test.ts(x)
```

As convenções que este repositório segue estão documentadas no conhecimento da
plataforma (`knowledge/casa` e `knowledge/projeto-*`). Elas descrevem o código
como ele é, não como gostaríamos que fosse.
