/**
 * Cases — portfolio case cards.
 * STABLE CONTRACT: export `Cases`, props { dict: Dictionary["cases"] }.
 */
import { Card, Container, SectionHeading } from "@insightfy/ui";
import type { Dictionary } from "@/i18n/types";

export interface CasesProps {
  dict: Dictionary["cases"];
}

export function Cases({ dict }: CasesProps) {
  return (
    <section id="casos" className="py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow="// Casos" title={dict.title} subtitle={dict.subtitle} />
        <div className="grid gap-6 md:grid-cols-3">
          {dict.items.map((item) => (
            <Card key={item.title} className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-text">{item.title}</h3>
              <p className="text-sm text-muted">{item.summary}</p>
              <div className="mt-auto flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-2 py-0.5 font-mono text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
