"use client";

/**
 * AgentsDemo — terminal panels with agent logs.
 * STABLE CONTRACT: export `AgentsDemo`, props { dict: Dictionary["agentsDemo"] }.
 */
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container, SectionHeading, TerminalPanel } from "@insightfy/ui";
import { cn } from "@insightfy/ui";
import type { AgentDemoItem, Dictionary } from "@/i18n/types";

export interface AgentsDemoProps {
  dict: Dictionary["agentsDemo"];
}

const STEP_MS = 900;
const HOLD_MS = 1800;

function logTone(line: string): string {
  if (/\[done\]|✓|✔|done|conclu/i.test(line)) return "text-diff-add";
  if (/\[warn\]|warn|aten/i.test(line)) return "text-accent-secondary";
  if (/\[err\]|error|erro|fail|falh/i.test(line)) return "text-diff-remove";
  return "text-muted";
}

function AgentTerminal({ agent, delay }: { agent: AgentDemoItem; delay: number }) {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(reduceMotion ? agent.logs.length : 0);

  useEffect(() => {
    if (reduceMotion) {
      setVisible(agent.logs.length);
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const tick = (count: number) => {
      if (cancelled) return;
      if (count > agent.logs.length) {
        timer = setTimeout(() => {
          if (!cancelled) setVisible(0);
          tick(1);
        }, HOLD_MS);
        return;
      }
      setVisible(count);
      timer = setTimeout(() => tick(count + 1), STEP_MS);
    };

    const start = setTimeout(() => tick(1), delay);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      clearTimeout(start);
    };
  }, [agent.logs.length, delay, reduceMotion]);

  return (
    <TerminalPanel title={agent.name} className="h-full">
      <p className="mb-3 text-xs text-muted">{agent.task}</p>
      <div className="flex min-h-[5.5rem] flex-col gap-1 text-[13px]">
        <AnimatePresence initial={false}>
          {agent.logs.slice(0, visible).map((log, i) => (
            <motion.span
              key={`${log}-${i}`}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={cn("block", logTone(log))}
            >
              {log}
            </motion.span>
          ))}
        </AnimatePresence>
        {!reduceMotion && visible < agent.logs.length ? (
          <motion.span
            aria-hidden
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="block text-accent"
          >
            ▌
          </motion.span>
        ) : null}
      </div>
    </TerminalPanel>
  );
}

export function AgentsDemo({ dict }: AgentsDemoProps) {
  return (
    <section id="agentes" className="py-24 sm:py-32">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="// Agentes"
          title={dict.title}
          subtitle={dict.subtitle}
        />
        <div className="grid items-stretch gap-6 md:grid-cols-3">
          {dict.agents.map((agent, i) => (
            <AgentTerminal key={agent.name} agent={agent} delay={i * 350} />
          ))}
        </div>
      </Container>
    </section>
  );
}
