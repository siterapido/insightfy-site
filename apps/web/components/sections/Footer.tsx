/**
 * Footer — tagline, link columns, copyright.
 * STABLE CONTRACT: export `Footer`, props { dict: Dictionary["footer"]; locale }.
 */
import { Container } from "@insightfy/ui";
import { Logo } from "@/components/Logo";
import type { Dictionary, Locale } from "@/i18n/types";

export interface FooterProps {
  dict: Dictionary["footer"];
  locale: Locale;
}

export function Footer({ dict }: FooterProps) {
  return (
    <footer className="border-t border-border py-14">
      <Container className="flex flex-col gap-10">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(2,1fr)]">
          <div className="flex flex-col gap-3">
            <Logo />
            <p className="max-w-xs text-sm text-muted">{dict.tagline}</p>
          </div>
          {dict.columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h4 className="font-mono text-xs uppercase tracking-widest text-muted">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-sm text-muted transition-colors hover:text-text">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="border-t border-border pt-6 font-mono text-xs text-muted">
          {dict.copyright}
        </p>
      </Container>
    </footer>
  );
}
