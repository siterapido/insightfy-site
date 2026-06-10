/**
 * Process — numbered steps of how we work.
 * STABLE CONTRACT: export `Process`, props { dict: Dictionary["process"] }.
 */
"use client";

import { motion } from "framer-motion";
import { Container, SectionHeading } from "@insightfy/ui";
import type { Dictionary } from "@/i18n/types";

export interface ProcessProps {
  dict: Dictionary["process"];
}

export function Process({ dict }: ProcessProps) {
  return (
    <section id="processo" className="py-24 sm:py-32">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow="// Processo" title={dict.title} subtitle={dict.subtitle} />

        <ol className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* Connecting line: vertical on mobile, horizontal on lg */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/40 via-border to-transparent md:hidden"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-[15px] hidden h-px bg-gradient-to-r from-accent/40 via-border to-transparent lg:block"
          />

          {dict.steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
              className="relative flex flex-col gap-3 pl-12 md:pl-0"
            >
              <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-accent/40 bg-bg-base font-mono text-xs text-accent md:relative md:mb-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-lg font-semibold tracking-tight text-text">{step.title}</h3>
              <p className="text-sm text-muted">{step.description}</p>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
