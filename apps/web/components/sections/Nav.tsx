/**
 * Nav (client) — top navigation bar.
 * STABLE CONTRACT: export `Nav`, props { dict: Dictionary["nav"]; locale }.
 * Renders Logo + LanguageSwitcher. Parallel agent replaces visuals only.
 */
"use client";

import Link from "next/link";
import { Button, Container, cn } from "@insightfy/ui";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Dictionary, Locale } from "@/i18n/types";

export interface NavProps {
  dict: Dictionary["nav"];
  locale: Locale;
}

export function Nav({ dict, locale }: NavProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg-base/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href={`/${locale}`} aria-label="Insightfy">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {dict.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn("text-sm text-muted transition-colors hover:text-text")}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} />
          <Button asChild variant="primary" className="hidden sm:inline-flex">
            <a href="#contato">{dict.cta}</a>
          </Button>
        </div>
      </Container>
    </header>
  );
}
