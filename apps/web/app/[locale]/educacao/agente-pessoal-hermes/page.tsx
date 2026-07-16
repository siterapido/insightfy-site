import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary, isLocale } from "@/i18n";
import type { Locale } from "@/i18n/types";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { EducationHero } from "@/components/education/EducationSections";
import { hermesLessons } from "@/lib/education/hermes-course";
import { Card, Container, SectionHeading } from "@insightfy/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isPt = locale === "pt";
  return {
    title: isPt ? "Agente pessoal Hermes" : "Personal Hermes agent",
    description: isPt
      ? "Curso: configuração Hermes, segundo cérebro, memória, skills, MCPs, modelos e otimizações — 8×30min."
      : "Course: Hermes setup, second brain, memory, skills, MCPs, models, and token ops.",
  };
}

export default async function HermesCoursePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const isPt = locale === "pt";

  const topics = isPt
    ? [
        "Instalação e perfis Hermes",
        "Segundo cérebro (CONTEXTO / SKILLS / ROTINAS)",
        "Memória persistente e session_search",
        "Skills procedural (skill_manage)",
        "MCPs e context-mode",
        "Modelos xAI + Ollama auxiliary",
        "Crons, Kanban e governança de tokens",
      ]
    : [
        "Hermes install & profiles",
        "Second brain repo layout",
        "Persistent memory & session_search",
        "Procedural skills",
        "MCPs & context-mode",
        "xAI models + Ollama aux",
        "Crons, Kanban, token governance",
      ];

  return (
    <>
      <Nav dict={dict.nav} locale={locale} />
      <main>
        <EducationHero
          locale={locale}
          title={isPt ? "Agente pessoal Hermes" : "Personal Hermes agent"}
          subtitle={
            isPt
              ? "Configure, memorize e opere um agente que _aprende com skills_ — alinhado à documentação Hermes e ao AgentHub Insightfy."
              : "Configure, memorize, and run a skill-learning agent — aligned with Hermes docs and Insightfy AgentHub."
          }
          primaryHref={`/${locale}/educacao/agente-pessoal-hermes/aulas`}
          primaryLabel={isPt ? "Entrar na área de membros" : "Open member area"}
          secondaryHref={`/${locale}/educacao`}
          secondaryLabel={isPt ? "Voltar ao hub" : "Back to hub"}
        />

        <section className="py-16">
          <Container>
            <SectionHeading
              title={isPt ? "Para quem é" : "Who it's for"}
              subtitle={
                isPt
                  ? "Gestores, tech leads e builders que querem repetibilidade — não só um chat bonito."
                  : "Managers, tech leads, and builders who want repeatability—not just a pretty chat."
              }
            />
            <SectionHeading
              className="mt-14"
              title={isPt ? "Ementa (8 aulas)" : "Syllabus (8 lessons)"}
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {hermesLessons.map((l) => (
                <Card key={l.id} className="p-4">
                  <p className="font-mono text-xs text-accent">Aula {l.module}</p>
                  <h3 className="mt-1 font-semibold">{l.title}</h3>
                  <p className="mt-2 text-sm text-muted">{l.summary}</p>
                </Card>
              ))}
            </div>

            <SectionHeading
              className="mt-14"
              title={isPt ? "Conteúdo pesquisado" : "Researched topics"}
            />
            <ul className="mt-6 space-y-2 text-muted">
              {topics.map((t) => (
                <li key={t}>→ {t}</li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-muted">
              {isPt ? "Referência:" : "Reference:"}{" "}
              <Link
                href="https://hermes-agent.nousresearch.com/docs"
                className="text-accent underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hermes Agent Documentation
              </Link>
            </p>
          </Container>
        </section>
      </main>
      <Footer dict={dict.footer} locale={locale} />
    </>
  );
}