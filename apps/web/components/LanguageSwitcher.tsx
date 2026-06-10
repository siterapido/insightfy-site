/**
 * LanguageSwitcher (client) — toggles between /pt and /en preserving the path.
 * STABLE: exported as `LanguageSwitcher`. Prop: { locale }.
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@insightfy/ui";
import { locales } from "@/i18n";
import type { Locale } from "@/i18n/types";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "/";

  function pathFor(target: Locale): string {
    const segments = pathname.split("/");
    segments[1] = target;
    const next = segments.join("/");
    return next === "" ? `/${target}` : next;
  }

  return (
    <div
      className="flex items-center gap-0.5 rounded-lg border border-border bg-surface/50 p-0.5 font-mono text-xs"
      role="group"
      aria-label="Language"
    >
      {locales.map((l, i) => {
        const active = l === locale;
        return (
          <span key={l} className="flex items-center">
            {i > 0 && <span className="px-0.5 text-border">/</span>}
            <Link
              href={pathFor(l)}
              aria-current={active ? "true" : undefined}
              className={cn(
                "rounded-md px-2 py-1 uppercase tracking-wider transition-colors",
                active
                  ? "bg-accent/10 font-semibold text-accent"
                  : "text-muted hover:text-text",
              )}
            >
              {l}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
