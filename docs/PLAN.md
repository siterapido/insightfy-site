# Insightfy — Plano de Implementação (v1)

Baseado em `docs/SPEC.md`. Cada fase tem critério de verificação.

---

## Fase 0 — Fundação do monorepo
**Objetivo:** Turborepo + pnpm workspaces funcionando.

- [ ] `package.json` raiz com workspaces (`apps/*`, `packages/*`)
- [ ] `turbo.json` (pipelines: dev, build, lint, typecheck)
- [ ] `packages/config`: presets `tsconfig`, `eslint`, `tailwind`
- [ ] `.gitignore`, `.env.example`, `README.md`, `git init`

**Verificação:** `pnpm install` resolve sem erro; `pnpm turbo run build` roda (mesmo vazio).

---

## Fase 1 — App web (Next.js) + design system
**Objetivo:** LP renderiza com tema dark/terminal e tokens ciano.

- [ ] `apps/web` Next.js (App Router) + TS + Tailwind
- [ ] `packages/ui`: tokens (cores/typography), `Button`, `Card`, `TerminalPanel`, `GridBackground`
- [ ] Fontes: Geist Sans + Geist Mono (ou Inter + JetBrains Mono)
- [ ] Layout base: nav + footer + seletor de idioma
- [ ] Logo: wordmark "Insightfy" + ícone SVG ciano

**Verificação:** `pnpm dev` sobe; home mostra nav/footer no tema dark; lint/typecheck OK.

---

## Fase 2 — i18n bilíngue
**Objetivo:** pt-BR + EN sem texto hardcoded.

- [ ] Setup i18n (dicionários `pt`/`en`, default `pt`)
- [ ] Seletor de idioma no nav e footer
- [ ] Estrutura de chaves por seção

**Verificação:** trocar idioma altera todos os textos da LP.

---

## Fase 3 — Copy bilíngue (skills)
**Objetivo:** textos profissionais placeholder em pt/EN.

- [ ] Aplicar skills `copywriting` + `landing-page-copywriter` (PAS/AIDA)
- [ ] Hero, pilares, processo, casos, CTAs, FAQ, footer
- [ ] Tom técnico/acessível/confiante; CTA "Agendar conversa"

**Verificação:** todas as seções têm copy em pt e EN; CTAs orientados a ação.

---

## Fase 4 — Seções da LP
**Objetivo:** LP completa montada.

- [ ] Hero + diagrama/terminal animado
- [ ] Prova social (logos placeholder)
- [ ] 3 pilares (sistemas / agentes / produtos próprios)
- [ ] Demo de agentes (logs de terminal — casos de cliente: atendimento/dados/automação/integração)
- [ ] Métricas (números placeholder)
- [ ] Processo (3-4 etapas)
- [ ] Casos/Portfólio (cards placeholder)
- [ ] CTA final + formulário de contato (stub, só UI)
- [ ] Footer completo (links/contato/redes)

**Verificação:** scroll da LP mostra todas as seções; responsivo mobile/desktop; animações rodam.

---

## Fase 5 — Esqueletos futuros (CRM/DB)
**Objetivo:** estrutura pronta sem implementação.

- [ ] `apps/crm` com placeholder + `README.md` (como evoluir)
- [ ] `packages/db` com placeholder + `README.md` (Postgres/Drizzle planejado)

**Verificação:** monorepo reconhece os pacotes; READMEs explicam roadmap.

---

## Fase 6 — Deploy VPS (Docker + Caddy)
**Objetivo:** subir em produção com HTTPS.

- [ ] `apps/web` Next.js output `standalone`
- [ ] `Dockerfile` multi-stage (web)
- [ ] `docker-compose.yml` (web + caddy)
- [ ] `Caddyfile` (HTTPS automático para insightfy.com.br)
- [ ] `.env.example` + instruções de deploy no `README.md`

**Verificação:** `docker compose up --build` sobe local; doc de deploy descreve passos na VPS.

---

## Critérios de aceite (v1)
- LP bilíngue completa, tema dark/terminal com accent ciano.
- `pnpm build` + `pnpm lint` + `pnpm typecheck` sem erros.
- Imagem Docker builda e roda atrás do Caddy.
- `apps/crm` e `packages/db` existem como esqueleto documentado.
- Form de contato em stub (UI only).

---

## Ordem de execução
Fase 0 → 1 → 2 → 4 (estrutura) → 3 (copy) → 5 → 6.
(Copy entra junto/depois das seções para preencher os componentes.)
