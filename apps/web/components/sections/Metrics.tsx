/**
 * Metrics — headline numbers row.
 * STABLE CONTRACT: export `Metrics`, props { dict: Dictionary["metrics"] }.
 */
import { Container } from "@insightfy/ui";
import type { Dictionary } from "@/i18n/types";

export interface MetricsProps {
  dict: Dictionary["metrics"];
}

export function Metrics({ dict }: MetricsProps) {
  return (
    <section id="metricas" className="border-y border-border py-16">
      <Container className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {dict.items.map((item) => (
          <div key={item.label} className="flex flex-col gap-1 text-center">
            <span className="font-mono text-3xl font-bold text-accent sm:text-4xl">
              {item.value}
            </span>
            <span className="text-sm text-muted">{item.label}</span>
          </div>
        ))}
      </Container>
    </section>
  );
}
