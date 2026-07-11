import { Button } from "@insightfy/ui";

export interface CtaInlineProps {
  title: string;
  body: string;
  cta: string;
  href: string;
}

export function CtaInline({ title, body, cta, href }: CtaInlineProps) {
  return (
    <aside className="not-prose my-12 rounded-lg border border-border bg-surface/80 p-6 sm:p-8">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        Insightfy
      </p>
      <h2 className="mt-3 font-display text-xl font-semibold tracking-tight text-text sm:text-2xl">
        {title}
      </h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
        {body}
      </p>
      <div className="mt-5">
        <Button asChild variant="primary">
          <a href={href}>{cta}</a>
        </Button>
      </div>
    </aside>
  );
}
