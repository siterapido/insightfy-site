import Link from "next/link";
import { Card } from "@insightfy/ui";
import type { BlogPostMeta } from "@/lib/blog/types";
import {
  blogPath,
  formatPostDate,
  readingTimeLabel,
} from "@/lib/blog/posts";
import type { Dictionary, Locale } from "@/i18n/types";

export interface PostCardProps {
  post: BlogPostMeta;
  locale: Locale;
  dict: Dictionary["blog"];
  compact?: boolean;
}

export function PostCard({ post, locale, dict, compact = false }: PostCardProps) {
  const href = blogPath(locale, post.slug);
  const categoryLabel = dict.categories[post.category];

  return (
    <Link
      href={href}
      className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base rounded-lg"
    >
      <Card className="flex h-full flex-col gap-3 transition-all duration-200 motion-safe:group-hover:-translate-y-1 group-hover:border-accent/60 group-hover:shadow-[0_0_0_1px_rgba(34,211,238,0.15)]">
        <span className="font-mono text-xs uppercase tracking-wider text-accent">
          {categoryLabel}
        </span>
        <h3
          className={
            compact
              ? "font-display text-base font-semibold tracking-tight text-text transition-colors group-hover:text-accent"
              : "font-display text-lg font-semibold tracking-tight text-text transition-colors group-hover:text-accent"
          }
        >
          {post.title}
        </h3>
        {!compact && (
          <p className="line-clamp-2 text-sm leading-relaxed text-muted">
            {post.description}
          </p>
        )}
        <p className="mt-auto pt-1 font-mono text-xs text-muted">
          {formatPostDate(post.date, locale)}
          <span className="mx-1.5 text-border">·</span>
          {readingTimeLabel(dict.readingTime, post.readingMinutes)}
        </p>
      </Card>
    </Link>
  );
}
