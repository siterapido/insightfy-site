/**
 * Footer — tagline, link columns, copyright.
 * STABLE CONTRACT: export `Footer`, props { dict: Dictionary["footer"]; locale }.
 */
import Link from "next/link";
import { Container } from "@insightfy/ui";
import { Logo } from "@/components/Logo";
import type { Dictionary, Locale } from "@/i18n/types";

export interface FooterProps {
  dict: Dictionary["footer"];
  locale: Locale;
}

function resolveFooterHref(href: string, locale: Locale): string {
  if (href.startsWith("#")) return `/${locale}${href}`;
  if (href.startsWith("/")) return `/${locale}${href}`;
  return href;
}

function SocialIcon({ name }: { name: "github" | "linkedin" | "x" }) {
  const common = "h-4 w-4";
  if (name === "github") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    );
  }
  if (name === "linkedin") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }
  return (
    <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socials = [
  { label: "GitHub", href: "https://github.com", icon: "github" as const },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" as const },
  { label: "X", href: "https://x.com", icon: "x" as const },
];

export function Footer({ dict, locale }: FooterProps) {
  return (
    <footer className="border-t border-border bg-surface/30 py-14">
      <Container className="flex flex-col gap-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-3">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              {dict.tagline}
            </p>
          </div>

          {dict.columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h4 className="font-mono text-xs uppercase tracking-widest text-muted">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => {
                  const href = resolveFooterHref(link.href, locale);
                  return (
                    <li key={`${col.title}-${link.href}-${link.label}`}>
                      {href.startsWith("/") ? (
                        <Link
                          href={href}
                          className="text-sm text-muted transition-colors hover:text-text"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={href}
                          className="text-sm text-muted transition-colors hover:text-text"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-muted">{dict.copyright}</p>
          <div className="flex items-center gap-2">
            {socials.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-accent/40 hover:text-accent"
              >
                <SocialIcon name={icon} />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
