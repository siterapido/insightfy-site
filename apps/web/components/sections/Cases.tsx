/**
 * Cases — portfolio case cards.
 * STABLE CONTRACT: export `Cases`, props { dict: Dictionary["cases"] }.
 */
"use client";

import { motion } from "framer-motion";
import { Card, Container, SectionHeading } from "@insightfy/ui";
import type { Dictionary } from "@/i18n/types";

export interface CasesProps {
  dict: Dictionary["cases"];
}

export function Cases({ dict }: CasesProps) {
  return (
    <section id="casos" className="py-24 sm:py-32">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow="// Casos" title={dict.title} subtitle={dict.subtitle} />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dict.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
            >
              <Card className="group flex h-full flex-col gap-4 transition-all duration-200 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_0_0_1px_rgba(34,211,238,0.15)]">
                <h3 className="font-display text-lg font-semibold tracking-tight text-text">{item.title}</h3>
                <p className="text-sm text-muted">{item.summary}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-2 py-0.5 font-mono text-xs text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
