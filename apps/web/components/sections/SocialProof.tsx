/**
 * SocialProof — label + placeholder logo row.
 * STABLE CONTRACT: export `SocialProof`, props { dict: Dictionary["socialProof"] }.
 */
import { Box, Building2, Cpu, Hexagon, Layers, Terminal } from "lucide-react";
import { Container } from "@insightfy/ui";
import type { Dictionary } from "@/i18n/types";

export interface SocialProofProps {
  dict: Dictionary["socialProof"];
}

const LOGOS: { icon: typeof Box; label: string }[] = [
  { icon: Terminal, label: "Nuvexa" },
  { icon: Hexagon, label: "Polaris" },
  { icon: Box, label: "Quanta" },
  { icon: Layers, label: "Stacklab" },
  { icon: Cpu, label: "Coreflow" },
  { icon: Building2, label: "Vortex" },
];

export function SocialProof({ dict }: SocialProofProps) {
  return (
    <section
      id="prova-social"
      aria-label={dict.label}
      className="border-y border-border bg-surface/30 py-10"
    >
      <Container className="flex flex-col items-center gap-8">
        <p className="text-center font-mono text-xs uppercase tracking-widest text-muted">
          {dict.label}
        </p>
        <ul className="grid w-full max-w-4xl grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-3 md:grid-cols-6">
          {LOGOS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center justify-center gap-2 text-muted opacity-50 grayscale transition-all duration-300 hover:text-text hover:opacity-100 hover:grayscale-0"
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden />
              <span className="font-mono text-sm font-medium tracking-tight">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
