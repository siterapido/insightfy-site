/**
 * Pillars — three service pillars (systems / agents / products).
 * STABLE CONTRACT: export `Pillars`, props { dict: Dictionary["pillars"] }.
 */
import { Bot, Boxes, Code2, type LucideIcon } from "lucide-react";
import { Container, SectionHeading } from "@insightfy/ui";
import type { Dictionary, PillarItem } from "@/i18n/types";

export interface PillarsProps {
  dict: Dictionary["pillars"];
}

export function Pillars({ dict }: PillarsProps) {
  const items: { item: PillarItem; icon: LucideIcon }[] = [
    { item: dict.items.systems, icon: Code2 },
    { item: dict.items.agents, icon: Bot },
    { item: dict.items.products, icon: Boxes },
  ];

  return (
    <section id="pilares" className="py-24 sm:py-32">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="// Serviços"
          title={dict.title}
          subtitle={dict.subtitle}
        />

        <ol>
          {items.map(({ item, icon: Icon }, i) => (
            <li
              key={item.title}
              className="group grid grid-cols-[3rem_1fr] gap-6 border-t border-border py-10 transition-colors duration-200 hover:border-accent/30 sm:grid-cols-[3rem_1fr_auto]"
            >
              {/* Number + icon */}
              <div className="flex flex-col items-start gap-3 pt-0.5">
                <span className="font-mono text-xs text-accent/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-muted transition-colors duration-200 group-hover:border-accent/40 group-hover:text-accent">
                  <Icon className="h-[18px] w-[18px]" aria-hidden />
                </span>
              </div>

              {/* Title + description + mobile bullets */}
              <div className="flex flex-col gap-2.5">
                <h3 className="font-display text-xl font-semibold tracking-tight text-text">
                  {item.title}
                </h3>
                <p className="max-w-xl text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
                <ul className="mt-1 flex flex-col gap-1.5 font-mono text-xs text-muted/60 sm:hidden">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span aria-hidden className="select-none text-accent/50">
                        ›
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Desktop: bullets stacked right */}
              <ul className="hidden flex-col gap-2 pt-0.5 font-mono text-xs text-muted/55 sm:flex">
                {item.bullets.map((b) => (
                  <li key={b} className="text-right">
                    {b}
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <li aria-hidden className="h-px bg-border" />
        </ol>
      </Container>
    </section>
  );
}
