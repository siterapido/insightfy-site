import { Container } from "@insightfy/ui";

export interface BlogHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export function BlogHero({ eyebrow, title, subtitle }: BlogHeroProps) {
  return (
    <section className="border-b border-border pb-12 pt-14 sm:pb-16 sm:pt-20">
      <Container className="flex max-w-3xl flex-col gap-4">
        <span className="font-mono text-xs uppercase tracking-widest text-accent">
          {eyebrow}
        </span>
        <h1 className="font-display text-balance text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-tight text-text">
          {title}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {subtitle}
        </p>
      </Container>
    </section>
  );
}
