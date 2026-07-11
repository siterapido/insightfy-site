import Link from "next/link";
import { Card } from "@insightfy/ui";
import type { BlogPostMeta } from "@/lib/blog/types";
import {
  blogPath,
  formatPostDate,
  readingTimeLabel,
} from "@/lib/blog/posts";
import type { Dictionary, Locale } from "@/i18n/types";

export interface FeaturedPostProps {
  post: BlogPostMeta;
  locale: Locale;
  dict: Dictionary["blog"];
}

export function FeaturedPost({ post, locale, dict }: FeaturedPostProps) {
  const href = blogPath(locale, post.slug);
  const categoryLabel = dict.categories[post.category];

  return (
    <Link
      href={href}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base rounded-lg"
    >
      <Card className="relative overflow-hidden transition-all duration-200 motion-safe:group-hover:-translate-y-0.5 group-hover:border-accent/60 group-hover:shadow-[0_0_0_1px_rgba(34,211,238,0.15)]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="flex max-w-2xl flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {dict.featuredLabel ? (
                <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
                  {dict.featuredLabel}
                </span>
              ) : null}
              <span className="font-mono text-xs uppercase tracking-wider text-accent">
                {categoryLabel}
              </span>
            </div>
            <h2 className="font-display text-balance text-2xl font-semibold tracking-tight text-text transition-colors group-hover:text-accent sm:text-3xl lg:text-4xl">
              {post.title}
            </h2>
            <p className="text-base leading-relaxed text-muted">
              {post.description}
            </p>
            <p className="font-mono text-xs text-muted">
              {formatPostDate(post.date, locale)}
              <span className="mx-1.5 text-border">·</span>
              {readingTimeLabel(dict.readingTime, post.readingMinutes)}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
