import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog/types";
import {
  blogPath,
  categoryPath,
  formatPostDate,
  readingTimeLabel,
} from "@/lib/blog/posts";
import type { Dictionary, Locale } from "@/i18n/types";

export interface PostHeaderProps {
  post: BlogPostMeta;
  locale: Locale;
  dict: Dictionary["blog"];
}

export function PostHeader({ post, locale, dict }: PostHeaderProps) {
  const categoryLabel = dict.categories[post.category];

  return (
    <header className="flex flex-col gap-6 border-b border-border pb-10">
      <nav aria-label="Breadcrumb" className="font-mono text-xs text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link
              href={blogPath(locale)}
              className="transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              {dict.navLabel}
            </Link>
          </li>
          <li aria-hidden className="text-border">
            /
          </li>
          <li>
            <Link
              href={categoryPath(locale, post.category)}
              className="transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              {categoryLabel}
            </Link>
          </li>
          <li aria-hidden className="text-border">
            /
          </li>
          <li className="max-w-[14rem] truncate text-text sm:max-w-xs" aria-current="page">
            {post.title}
          </li>
        </ol>
      </nav>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href={categoryPath(locale, post.category)}
          className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-accent transition-colors hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {categoryLabel}
        </Link>
        <span className="font-mono text-xs text-muted">
          {formatPostDate(post.date, locale)}
          <span className="mx-1.5 text-border">·</span>
          {readingTimeLabel(dict.readingTime, post.readingMinutes)}
        </span>
      </div>

      <h1 className="font-display text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.1] tracking-tight text-text">
        {post.title}
      </h1>
      <p className="max-w-2xl text-lg leading-relaxed text-muted">{post.description}</p>
    </header>
  );
}
