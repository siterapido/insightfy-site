"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PlayCircle } from "lucide-react";
import { Card, Container, cn } from "@insightfy/ui";
import { hermesLessons, lessonById } from "@/lib/education/hermes-course";
import type { Locale } from "@/i18n/types";

export function MemberLessonArea({ locale }: { locale: Locale }) {
  const params = useSearchParams();
  const defaultLesson = hermesLessons[0];
  const current = params.get("aula") ?? defaultLesson?.id ?? "";
  const lesson = lessonById(current) ?? defaultLesson;
  if (!lesson) return null;
  const isPt = locale === "pt";

  return (
    <Container className="py-10 grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="space-y-2">
        <p className="text-xs font-mono uppercase text-muted mb-4">
          {isPt ? "Módulos · Agente Hermes" : "Modules · Hermes agent"}
        </p>
        {hermesLessons.map((l) => (
          <Link
            key={l.id}
            href={`/${locale}/educacao/agente-pessoal-hermes/aulas?aula=${l.id}`}
            className={cn(
              "block rounded-lg border px-3 py-2 text-sm transition-colors",
              l.id === lesson.id
                ? "border-accent bg-accent/10 text-text"
                : "border-border text-muted hover:border-accent/40",
            )}
          >
            <span className="font-mono text-xs text-accent">M{l.module}</span>
            <span className="mt-1 block">{l.title}</span>
          </Link>
        ))}
      </aside>

      <div>
        <div className="rounded-xl border border-border bg-bg-elevated aspect-video flex flex-col items-center justify-center gap-3 text-muted">
          <PlayCircle className="h-14 w-14 text-accent/80" aria-hidden />
          <p className="text-sm text-center px-4">
            {isPt
              ? "Vídeo desta aula: upload pendente pelo operador. Use o roteiro abaixo."
              : "Lesson video: pending upload. Use the script below."}
          </p>
        </div>

        <h1 className="mt-8 font-display text-2xl font-bold">{lesson.title}</h1>
        <p className="mt-2 text-muted">{lesson.summary}</p>
        <p className="mt-1 text-sm font-mono text-accent">~{lesson.durationMin} min</p>

        <Card className="mt-8 p-6">
          <h2 className="font-semibold">
            {isPt ? "Objetivos da aula" : "Lesson objectives"}
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
            {lesson.objectives.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </Card>

        <p className="mt-6 text-sm text-muted">
          {isPt ? "Roteiro completo:" : "Full script:"}{" "}
          <span className="font-mono text-xs">
            insightfy-second-brain/PROJETOS/insightfy-site-update/content/CURSO-AGENTE-PESSOAL-HERMES.md
          </span>
        </p>
      </div>
    </Container>
  );
}