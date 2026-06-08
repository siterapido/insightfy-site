/**
 * Hero — headline + CTAs + terminal preview.
 * STABLE CONTRACT: export `Hero`, props { dict: Dictionary["hero"]; locale }.
 */
import { Button, Container, TerminalPanel } from "@insightfy/ui";
import type { Dictionary, Locale } from "@/i18n/types";

export interface HeroProps {
  dict: Dictionary["hero"];
  locale: Locale;
}

export function Hero({ dict }: HeroProps) {
  return (
    <section id="hero" className="py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <span className="w-fit rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-accent">
            {dict.badge}
          </span>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-text sm:text-5xl">
            {dict.titleLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="max-w-xl text-lg text-muted">{dict.subtitle}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="primary">
              <a href="#contato">{dict.ctaPrimary} →</a>
            </Button>
            <Button asChild variant="secondary">
              <a href="#casos">{dict.ctaSecondary}</a>
            </Button>
          </div>
        </div>

        <TerminalPanel title={dict.terminalTitle}>
          <p className="text-diff-add">$ insightfy build --target production</p>
          <p className="text-muted">› compiling systems + agents...</p>
          <p className="text-accent">✓ ready</p>
        </TerminalPanel>
      </Container>
    </section>
  );
}
