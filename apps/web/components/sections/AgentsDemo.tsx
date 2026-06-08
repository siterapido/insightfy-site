/**
 * AgentsDemo — terminal panels with agent logs.
 * STABLE CONTRACT: export `AgentsDemo`, props { dict: Dictionary["agentsDemo"] }.
 */
import { Container, SectionHeading, TerminalPanel } from "@insightfy/ui";
import type { Dictionary } from "@/i18n/types";

export interface AgentsDemoProps {
  dict: Dictionary["agentsDemo"];
}

export function AgentsDemo({ dict }: AgentsDemoProps) {
  return (
    <section id="agentes" className="py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow="// Agentes" title={dict.title} subtitle={dict.subtitle} />
        <div className="grid gap-6 md:grid-cols-3">
          {dict.agents.map((agent) => (
            <TerminalPanel key={agent.name} title={agent.name}>
              <p className="mb-2 text-muted">{agent.task}</p>
              {agent.logs.map((log, i) => (
                <p key={i}>{log}</p>
              ))}
            </TerminalPanel>
          ))}
        </div>
      </Container>
    </section>
  );
}
