/**
 * SocialProof — label + placeholder logo row.
 * STABLE CONTRACT: export `SocialProof`, props { dict: Dictionary["socialProof"] }.
 */
import { Container } from "@insightfy/ui";
import type { Dictionary } from "@/i18n/types";

export interface SocialProofProps {
  dict: Dictionary["socialProof"];
}

export function SocialProof({ dict }: SocialProofProps) {
  return (
    <section id="prova-social" className="border-y border-border py-10">
      <Container className="flex flex-col items-center gap-6">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          {dict.label}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 opacity-40">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-6 w-24 rounded bg-white/10" />
          ))}
        </div>
      </Container>
    </section>
  );
}
