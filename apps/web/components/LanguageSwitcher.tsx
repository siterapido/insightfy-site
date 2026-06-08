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
    <div className="flex items-center gap-1 rounded-lg border border-border p-0.5 font-mono text-xs">
      {locales.map((l) => (
        <Link
          key={l}
          href={pathFor(l)}
          className={cn(
            "rounded-md px-2 py-1 uppercase transition-colors",
            l === locale ? "bg-white/10 text-text" : "text-muted hover:text-text",
          )}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}
