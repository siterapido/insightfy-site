import type { BlogPostMeta } from "@/lib/blog/types";
import type { Dictionary, Locale } from "@/i18n/types";
import { PostCard } from "./PostCard";

export interface RelatedPostsProps {
  posts: BlogPostMeta[];
  locale: Locale;
  dict: Dictionary["blog"];
}

export function RelatedPosts({ posts, locale, dict }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 border-t border-border pt-12">
      <h2 className="font-display text-xl font-semibold tracking-tight text-text sm:text-2xl">
        {dict.related}
      </h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            post={post}
            locale={locale}
            dict={dict}
            compact
          />
        ))}
      </div>
    </section>
  );
}
