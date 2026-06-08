/**
 * Pillars — three service pillars (systems / agents / products).
 * STABLE CONTRACT: export `Pillars`, props { dict: Dictionary["pillars"] }.
 */
import { Card, Container, SectionHeading } from "@insightfy/ui";
import type { Dictionary } from "@/i18n/types";

export interface PillarsProps {
  dict: Dictionary["pillars"];
}

export function Pillars({ dict }: PillarsProps) {
  const items = [dict.items.systems, dict.items.agents, dict.items.products];

  return (
    <section id="pilares" className="py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow="// Serviços" title={dict.title} subtitle={dict.subtitle} />
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <Card key={item.title} className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold text-text">{item.title}</h3>
              <p className="text-sm text-muted">{item.description}</p>
              <ul className="mt-auto flex flex-col gap-1 font-mono text-xs text-accent">
                {item.bullets.map((b) => (
                  <li key={b}>› {b}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
