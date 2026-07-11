import Link from "next/link";
import { cn } from "@insightfy/ui";
import type { BlogCategory } from "@/lib/blog/types";
import { BLOG_CATEGORIES } from "@/lib/blog/types";
import { blogPath, categoryPath } from "@/lib/blog/posts";
import type { Locale } from "@/i18n/types";
import type { Dictionary } from "@/i18n/types";

export interface CategoryChipsProps {
  locale: Locale;
  dict: Dictionary["blog"]["categories"];
  active?: BlogCategory | "all";
}

export function CategoryChips({
  locale,
  dict,
  active = "all",
}: CategoryChipsProps) {
  const items: { key: "all" | BlogCategory; label: string; href: string }[] = [
    { key: "all", label: dict.all, href: blogPath(locale) },
    ...BLOG_CATEGORIES.map((key) => ({
      key,
      label: dict[key],
      href: categoryPath(locale, key),
    })),
  ];

  return (
    <nav aria-label="Categories" className="flex flex-wrap gap-2">
      {items.map((item) => {
        const isActive = active === item.key;
        return (
          <Link
            key={item.key}
            href={item.href}
            className={cn(
              "rounded-full border px-3.5 py-1.5 font-mono text-xs tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base",
              isActive
                ? "border-accent/50 bg-accent/10 text-accent"
                : "border-border text-muted hover:border-border hover:text-text",
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
