/**
 * Process — numbered steps of how we work.
 * STABLE CONTRACT: export `Process`, props { dict: Dictionary["process"] }.
 */
import { Card, Container, SectionHeading } from "@insightfy/ui";
import type { Dictionary } from "@/i18n/types";

export interface ProcessProps {
  dict: Dictionary["process"];
}

export function Process({ dict }: ProcessProps) {
  return (
    <section id="processo" className="py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow="// Processo" title={dict.title} subtitle={dict.subtitle} />
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {dict.steps.map((step, i) => (
            <Card key={step.title} className="flex flex-col gap-3">
              <span className="font-mono text-sm text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-semibold text-text">{step.title}</h3>
              <p className="text-sm text-muted">{step.description}</p>
            </Card>
          ))}
        </ol>
      </Container>
    </section>
  );
}
