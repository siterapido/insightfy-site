# Insightfy

Site da **Insightfy** — software house focada em sistemas sob medida e agentes de IA, com produtos próprios (CRM e ferramentas SaaS) no roadmap.

Monorepo gerenciado com **pnpm workspaces** + **Turborepo**.

## Layout

```text
insightfy-site/
├─ apps/                # aplicações (web, crm — adicionadas em fases futuras)
├─ packages/
│  └─ config/           # presets compartilhados (tsconfig, eslint, tailwind)
├─ turbo.json           # pipeline de tasks (build, dev, lint, typecheck, clean)
├─ pnpm-workspace.yaml  # globs do workspace (apps/*, packages/*)
└─ package.json         # raiz: scripts que proxyam para o turbo
```

O pacote `@insightfy/config` exporta presets reutilizáveis:

- `@insightfy/config/tsconfig/base.json` — base TypeScript estrita.
- `@insightfy/config/tsconfig/nextjs.json` — extensão para apps Next.js.
- `@insightfy/config/eslint/base` — preset ESLint flat-config para TS.
- `@insightfy/config/tailwind/preset` — preset Tailwind com os design tokens da Insightfy.

## Pré-requisitos

- Node.js 20+
- pnpm (`corepack enable` ou instalação manual)

## Comandos

```bash
pnpm install      # instala dependências do workspace
pnpm dev          # turbo run dev (apps em modo desenvolvimento)
pnpm build        # turbo run build
pnpm lint         # turbo run lint
pnpm typecheck    # turbo run typecheck
pnpm clean        # turbo run clean
```

## Configuração de ambiente

Copie `.env.example` para `.env` e ajuste os valores:

```bash
cp .env.example .env
```
