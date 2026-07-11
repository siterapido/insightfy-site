import { Button, Card } from "@insightfy/ui";

export interface CtaEndProps {
  title: string;
  body: string;
  cta: string;
  href: string;
}

export function CtaEnd({ title, body, cta, href }: CtaEndProps) {
  return (
    <Card className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-xl font-semibold tracking-tight text-text sm:text-2xl">
          {title}
        </h2>
        <p className="max-w-lg text-sm leading-relaxed text-muted">{body}</p>
      </div>
      <Button asChild variant="primary" className="shrink-0">
        <a href={href}>{cta}</a>
      </Button>
    </Card>
  );
}
