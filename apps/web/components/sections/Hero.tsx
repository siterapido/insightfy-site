/**
 * Hero — centered, full-width headline + CTAs + terminal preview.
 * STABLE CONTRACT: export `Hero`, props { dict: Dictionary["hero"]; locale }.
 */
"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button, Container, TerminalPanel, cn } from "@insightfy/ui";
import type { Dictionary, Locale } from "@/i18n/types";

export interface HeroProps {
  dict: Dictionary["hero"];
  locale: Locale;
}

interface LogLine {
  text: string;
  tone: "prompt" | "muted" | "add" | "accent";
}

const LOG_LINES: LogLine[] = [
  { text: "$ insightfy deploy --target production", tone: "prompt" },
  { text: "› provisioning systems + agents...", tone: "muted" },
  { text: "+ agent: ingest        ready", tone: "add" },
  { text: "+ agent: orchestrator  ready", tone: "add" },
  { text: "+ agent: insights      ready", tone: "add" },
  { text: "› running pipeline (3 agents)...", tone: "muted" },
  { text: "✓ build passed in 4.2s — 0 errors", tone: "accent" },
];

const toneClass: Record<LogLine["tone"], string> = {
  prompt: "text-text",
  muted: "text-muted",
  add: "text-diff-add",
  accent: "text-accent",
};

export function Hero({ dict }: HeroProps) {
  const lastIndex = dict.titleLines.length - 1;

  return (
    <section id="hero" className="relative overflow-hidden pt-28 pb-16 sm:pt-40 sm:pb-24">
      {/* Per-section spotlight — stronger than the page background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(75% 55% at 50% -5%, rgba(34,211,238,0.13) 0%, transparent 65%)",
        }}
      />

      <Container className="relative z-10 flex flex-col items-center text-center gap-8 sm:gap-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex items-center gap-2 rounded-full border border-accent/20 bg-accent/[0.06] px-3 py-1"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="font-mono text-[11px] tracking-[0.12em] text-accent uppercase">
            {dict.badge}
          </span>
        </motion.div>

        {/* Headline — massive, two-tone */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
          className="font-display text-[clamp(2.75rem,8vw,6rem)] font-bold leading-[0.93] tracking-tighter max-w-4xl"
        >
          {dict.titleLines.map((line, i) => (
            <span
              key={i}
              className={cn(
                "block",
                i < lastIndex ? "text-text" : "text-muted/50",
              )}
            >
              {line}
            </span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.18 }}
          className="max-w-xl text-base sm:text-lg leading-relaxed text-muted/75"
        >
          {dict.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.28 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Button asChild variant="primary">
            <a href="#contato" className="group">
              {dict.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Button>
          <Button asChild variant="secondary">
            <a href="#casos">{dict.ctaSecondary}</a>
          </Button>
        </motion.div>

        {/* Terminal — below text, centered */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.42 }}
          className="w-full max-w-2xl mt-4"
        >
          <TerminalPanel title={dict.terminalTitle}>
            <div className="flex flex-col gap-1">
              {LOG_LINES.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                    delay: 0.75 + i * 0.38,
                  }}
                  className={cn("whitespace-pre text-left", toneClass[line.tone])}
                >
                  {line.text}
                </motion.p>
              ))}
              <motion.span
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: 0.75 + LOG_LINES.length * 0.38,
                }}
                className="mt-1 inline-block h-4 w-2 bg-accent"
              />
            </div>
          </TerminalPanel>
        </motion.div>
      </Container>
    </section>
  );
}
