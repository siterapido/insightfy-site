# Insightfy — Especificação do Site (v1)

Documento de especificação técnica e de produto. Base para `docs/PLAN.md`.
Referência visual: BLACKBOX AI (ver `.refs/REFERENCE.md`).

---

## 1. Visão geral

Insightfy é uma software house focada em **desenvolvimento de sistemas sob medida** e **agentes de IA**, com **produtos próprios** (CRM e ferramentas SaaS) no roadmap.

Objetivo do v1: **Landing Page (LP)** de alta conversão, hospedada em VPS, com a base de código pronta para evoluir para CRM e outras ferramentas.

- **Marca:** Insightfy
- **Domínio:** insightfy.com.br
- **Idiomas:** pt-BR (principal) + EN (i18n desde o lançamento)
- **Ação primária (conversão):** Agendar diagnóstico/conversa
- **Tom de voz:** técnico, acessível e confiante

---

## 2. Público e proposta de valor

- **Público:** empresas/founders que precisam de software sob medida ou automação com IA, e times que querem acelerar entrega com agentes.
- **Dores:** processos manuais, sistemas legados, integrações quebradas, falta de squad técnico, IA sem aplicação prática.
- **Transformação:** da ideia/processo manual → sistema sob medida e agentes de IA em produção.
- **Diferencial:** engenharia sólida + agentes de IA aplicados a casos reais (atendimento, dados, automação, integrações).

---

## 3. Pilares de serviço

1. **Sistemas sob medida** — web/SaaS, do MVP ao produto em produção.
2. **Agentes de IA** — automações inteligentes para atendimento, dados, operações e integrações.
3. **Produtos próprios** — CRM e ferramentas SaaS da Insightfy (em desenvolvimento).

---

## 4. Estrutura da LP (seções)

Adaptação da estrutura do BLACKBOX:

1. **Nav** — logo, links (Serviços, Agentes, Processo, Casos), seletor de idioma, CTA "Agendar conversa".
2. **Hero** — headline + subheadline + CTA primário + diagrama/terminal animado.
3. **Prova social** — logos de clientes/parceiros (placeholder).
4. **Pilares** — 3 cards (sistemas / agentes / produtos próprios).
5. **Demo de agentes** — painéis com logs estilo terminal mostrando agentes Insightfy em casos de cliente (atendimento, dados, automação, integração).
6. **Métricas** — números (projetos, uptime, etc — placeholder).
7. **Processo** — como trabalhamos (3-4 etapas).
8. **Casos / Portfólio** — cards de casos (placeholder).
9. **CTA final + formulário de contato** — form é **stub** (apenas UI, sem backend no v1).
10. **Footer** — links, contato, redes sociais.

---

## 5. Design system

Dark mode estrito, estética terminal/dev. Tokens em `packages/ui`.

| Token | Valor (alvo) |
|---|---|
| Fundo base | `#08090c` / preto |
| Superfície (cards) | `#0e1014` levemente mais claro |
| Borda | `rgba(255,255,255,0.08)` fina |
| Texto primário | `#f5f7fa` |
| Texto secundário | cinza `#9aa3af` |
| **Accent (Insightfy)** | **ciano/azul-elétrico** `#22d3ee` → `#38bdf8` |
| Diff add | verde `#34d399` |
| Diff remove | vermelho `#f87171` |

- **Fundo:** grid/dot-matrix sutil de profundidade.
- **Tipografia:** títulos sans-serif grandes e bold; **uso massivo de monospace** (logs, código, métricas, paths). Sugestão: Geist Sans + Geist Mono (ou Inter + JetBrains Mono).
- **Botões:** primário = fundo branco, texto preto, ícone seta; secundário = fundo escuro, borda cinza fina.
- **Cards/painéis:** grid, bordas finas, fundo levemente mais claro.
- **Animações:** streams de logs de terminal, status de processos, métricas rolando ("estética hacker").
- **Logo:** wordmark "Insightfy" + ícone SVG (ciano) — gerados provisoriamente.

---

## 6. Conteúdo / Copy

- Copy escrito pela Insightfy (este projeto), **bilíngue pt-BR + EN**.
- Frameworks: PAS (Problem-Agitate-Solution) / AIDA.
- Princípios: clareza > esperteza, benefício > feature, específico > vago, voz ativa.
- Skills usadas: `copywriting`, `landing-page-copywriter`.
- Textos, números e casos entram como **placeholder profissional** para revisão posterior.

---

## 7. i18n

- Estratégia: dicionários por idioma (`pt`/`en`), default `pt`.
- Seletor de idioma no nav e footer.
- Todo texto da LP vem de arquivos de tradução (sem hardcode).

---

## 8. Arquitetura (monorepo)

```text
insightfy-site/
├─ apps/
│  ├─ web/                # LP (Next.js App Router) — foco do v1
│  └─ crm/                # esqueleto vazio documentado (futuro)
├─ packages/
│  ├─ ui/                 # design system: tokens, botões, terminal, cards
│  ├─ db/                 # esqueleto Postgres/Drizzle documentado (futuro)
│  └─ config/             # presets tsconfig/eslint/tailwind
├─ docker-compose.yml     # serviços: web + caddy
├─ Caddyfile              # reverse proxy + HTTPS automático (Let's Encrypt)
├─ turbo.json
└─ package.json           # workspaces
```

- **Stack:** Next.js (App Router) + TypeScript + Tailwind + shadcn/ui.
- **Gerenciador:** pnpm workspaces + Turborepo.
- `apps/crm` e `packages/db`: apenas esqueleto + README explicando como evoluir. Sem lógica no v1.

---

## 9. Deploy (VPS)

- **Empacotamento:** Docker multi-stage (Next.js standalone).
- **Orquestração:** docker-compose (web + caddy).
- **Proxy/HTTPS:** Caddy com HTTPS automático (Let's Encrypt) para `insightfy.com.br`.
- **Build:** `next build` em standalone; imagem enxuta.
- Variáveis de ambiente via `.env` (não versionado); `.env.example` versionado.

---

## 10. Fora de escopo (v1)

- Backend do formulário de contato (fica stub).
- Implementação do CRM e do banco (só esqueleto).
- Autenticação.
- CMS (blog é MDX no repositório; ver `docs/superpowers/specs/2026-07-11-blog-design.md`).
- Analytics (pode entrar depois).

---

## 11. Roadmap futuro (pós-v1)

1. Backend do form → persistir lead em Postgres (vira base do CRM).
2. `packages/db` com Drizzle + migrations.
3. `apps/crm` com auth + dashboard de leads.
4. Ferramentas SaaS adicionais sobre a mesma base.
