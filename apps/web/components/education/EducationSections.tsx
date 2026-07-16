import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button, Card, Container, SectionHeading, cn } from "@insightfy/ui";
import type { Locale } from "@/i18n/types";

export function EducationHero({
  locale,
  title,
  subtitle,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  locale: Locale;
  title: React.ReactNode;
  subtitle: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_-10%,rgba(255,121,24,0.12),transparent)]"
      />
      <Container className="relative z-10 max-w-3xl text-center">
        <p className="mb-4 text-sm font-medium text-accent">
          Insightfy Educação · _agentes e formação_
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-text sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-lg text-muted">{subtitle}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="primary">
            <Link href={primaryHref}>{primaryLabel}</Link>
          </Button>
          {secondaryHref && secondaryLabel ? (
            <Button asChild variant="secondary">
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

export function MaturitySplit({ locale }: { locale: Locale }) {
  const isPt = locale === "pt";
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          title={isPt ? "Do operacional ao estratégico" : "From ops to strategy"}
          subtitle={
            isPt
              ? "Seu time pode começar automatizando tarefas — e evoluir para _agentes que orquestram_ processos inteiros."
              : "Start with task automation — grow into agents that orchestrate full processes."
          }
          centered
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="font-display text-xl font-semibold">
              {isPt ? "Nível 1 · Operacional" : "Level 1 · Operations"}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {(isPt
                ? [
                    "→ Triagem, respostas e relatórios repetíveis",
                    "→ Integrações pontuais (CRM, planilha, API)",
                    "→ Primeiro agente em produção com supervisão",
                  ]
                : [
                    "→ Triage, replies, and repeatable reports",
                    "→ Point integrations (CRM, sheets, API)",
                    "→ First production agent with oversight",
                  ]
              ).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Card>
          <Card className="p-6 border-accent/30">
            <h3 className="font-display text-xl font-semibold text-accent">
              {isPt ? "Nível 2 · Estratégico" : "Level 2 · Strategic"}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {(isPt
                ? [
                    "→ Segundo cérebro + skills versionadas",
                    "→ Vários perfis (ops, dev, mkt) no Kanban",
                    "→ Crons e governança de tokens",
                  ]
                : [
                    "→ Second brain + versioned skills",
                    "→ Multi-profile Kanban ops",
                    "→ Crons and token governance",
                  ]
              ).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Card>
        </div>
      </Container>
    </section>
  );
}

export function EducationTracks({ locale }: { locale: Locale }) {
  const isPt = locale === "pt";
  const tracks = isPt
    ? [
        {
          name: "Trilha 1",
          title: "Do zero ao primeiro agente",
          duration: "~4h (ao vivo ou gravado)",
          href: `/${locale}/educacao/agente-pessoal-hermes`,
        },
        {
          name: "Trilha 2",
          title: "Escalar IA no time",
          duration: "Em planejamento",
          href: `/${locale}#contato`,
        },
      ]
    : [
        {
          name: "Track 1",
          title: "Zero to first agent",
          duration: "~4h",
          href: `/${locale}/educacao/agente-pessoal-hermes`,
        },
        {
          name: "Track 2",
          title: "Scale AI across the team",
          duration: "Coming soon",
          href: `/${locale}#contato`,
        },
      ];

  return (
    <section id="trilhas" className="py-16 sm:py-20 bg-bg-elevated/40">
      <Container>
        <SectionHeading
          title={isPt ? "Trilhas de formação" : "Learning tracks"}
          subtitle={
            isPt
              ? "Conteúdo prático alinhado ao que a Insightfy usa em produção — Hermes, segundo cérebro e AgentHub."
              : "Hands-on content aligned with Insightfy production stack."
          }
          centered
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {tracks.map((t) => (
            <Card key={t.name} className="flex flex-col p-6">
              <span className="text-xs font-mono uppercase tracking-wider text-accent">
                {t.name}
              </span>
              <h3 className="mt-2 font-display text-xl font-semibold">{t.title}</h3>
              <p className="mt-2 text-sm text-muted">{t.duration}</p>
              <Link
                href={t.href}
                className="mt-auto pt-6 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
              >
                {isPt ? "Ver trilha" : "View track"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function EducationReceive({ locale }: { locale: Locale }) {
  const isPt = locale === "pt";
  const items = isPt
    ? [
        "8 aulas de ~30 min (roteiro + área de membros)",
        "Materiais: links oficiais Hermes + segundo cérebro Insightfy",
        "Checklists de boot e operação diária",
        "Comunidade e mentorias — conforme turma (anunciar quando abrir)",
      ]
    : [
        "8 lessons ~30 min (scripts + member area)",
        "Hermes docs + Insightfy second-brain references",
        "Boot and daily ops checklists",
        "Community & mentoring when cohort opens",
      ];

  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-2xl">
        <SectionHeading
          title={isPt ? "O que você recebe" : "What you get"}
          centered
        />
        <ul className="mt-8 space-y-3">
          {items.map((item) => (
            <li key={item} className="flex gap-3 text-muted">
              <Check className="h-5 w-5 shrink-0 text-accent" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function EducationFaq({ locale }: { locale: Locale }) {
  const isPt = locale === "pt";
  const faqs = isPt
    ? [
        {
          q: "Preciso saber programar?",
          a: "Não para o curso Hermes focado em operação. Saber ler arquivos Markdown e seguir checklists ajuda.",
        },
        {
          q: "Como acesso as aulas?",
          a: "Pela área de membros em /educacao/agente-pessoal-hermes/aulas. Vídeos serão publicados pelo operador; roteiro e estrutura já estão disponíveis.",
        },
        {
          q: "Isso substitui consultoria Insightfy?",
          a: "Não. Formação acelera seu time; projetos sob medida continuam via diagnóstico comercial.",
        },
        {
          q: "Quais ferramentas usamos?",
          a: "Hermes Agent (Nous Research), repositório segundo cérebro, MCP context-mode quando aplicável.",
        },
      ]
    : [
        {
          q: "Do I need to code?",
          a: "Not for the Hermes ops-focused course. Markdown literacy helps.",
        },
        {
          q: "How do I access lessons?",
          a: "Member area at /educacao/agente-pessoal-hermes/aulas. Videos uploaded by operator; scripts are live.",
        },
        {
          q: "Does this replace Insightfy consulting?",
          a: "No. Training accelerates your team; custom projects stay on the commercial track.",
        },
        {
          q: "Which tools?",
          a: "Hermes Agent, second-brain repo, context-mode MCP when needed.",
        },
      ];

  return (
    <section id="faq-educacao" className="py-16 sm:py-20 border-t border-border">
      <Container className="max-w-2xl">
        <SectionHeading title="FAQ" centered />
        <dl className="mt-8 space-y-6">
          {faqs.map((f) => (
            <div key={f.q}>
              <dt className="font-medium text-text">{f.q}</dt>
              <dd className="mt-2 text-sm text-muted">{f.a}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

export function PageShell({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return <div className="min-h-screen">{children}</div>;
}