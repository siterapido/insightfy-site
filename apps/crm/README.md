# @insightfy/crm

> **Status: esqueleto vazio (v1).** Nenhuma implementação ainda. Este pacote
> existe apenas para reservar o lugar no monorepo e documentar o roadmap.

Aplicativo **CRM** próprio da Insightfy. Será construído **pós-v1**, reaproveitando
a base já pronta do monorepo. Ver `docs/SPEC.md` seção 11 (Roadmap futuro).

## Como vai se encaixar

```text
LP (apps/web) ──contato─▶ backend do form ──▶ Postgres (packages/db) ──▶ CRM (apps/crm)
```

- Consome **`packages/ui`** — mesmo design system (tema dark/terminal, tokens ciano)
  usado na LP, garantindo consistência visual.
- Consome **`packages/db`** — schema Postgres + Drizzle (tabela `leads`) como fonte
  de dados única compartilhada com o backend do formulário de contato da LP.

## Roadmap

1. Backend do formulário de contato da LP persiste **leads** em Postgres
   (`packages/db`). Esse passo transforma o form (hoje stub) na base do CRM.
2. `apps/crm` ganha **autenticação** e um **dashboard de leads** (listar, filtrar,
   marcar status) lendo da mesma base.
3. Evolução para ferramentas SaaS adicionais sobre a mesma fundação.

## Por que está vazio agora

O v1 foca na Landing Page (`apps/web`). Manter o CRM como esqueleto documentado
evita complexidade prematura (YAGNI) e mantém o lockfile enxuto — nenhuma
dependência é declarada até a implementação começar.

Quando for implementar: scaffold Next.js (App Router) aqui, adicione as deps,
e ligue em `packages/db` + `packages/ui`.
