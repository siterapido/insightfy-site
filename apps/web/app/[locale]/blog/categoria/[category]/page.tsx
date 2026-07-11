import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@insightfy/ui";
import { BlogShell } from "@/components/blog/BlogShell";
import { BlogHero } from "@/components/blog/BlogHero";
import { CategoryChips } from "@/components/blog/CategoryChips";
import { PostCard } from "@/components/blog/PostCard";
import { getDictionary, isLocale, locales } from "@/i18n";
import type { Locale } from "@/i18n/types";
import {
  BLOG_CATEGORIES,
  SITE_URL,
  blogPath,
  categoryPath,
  getPostsByCategory,
  isBlogCategory,
  type BlogCategory,
} from "@/lib/blog";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    BLOG_CATEGORIES.map((category) => ({ locale, category })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale: raw, category: catRaw } = await params;
  if (!isLocale(raw) || !isBlogCategory(catRaw)) return {};
  const locale = raw as Locale;
  const category = catRaw as BlogCategory;
  const dict = getDictionary(locale);
  const label = dict.blog.categories[category];
  const title = dict.blog.meta.categoryTitle.replace("{category}", label);
  const description = dict.blog.meta.categoryDescription.replace(
    "{category}",
    label,
  );
  const url = `${SITE_URL}${categoryPath(locale, category)}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        pt: `${SITE_URL}${categoryPath("pt", category)}`,
        en: `${SITE_URL}${categoryPath("en", category)}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: locale === "pt" ? "pt_BR" : "en_US",
    },
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale: raw, category: catRaw } = await params;
  if (!isLocale(raw) || !isBlogCategory(catRaw)) notFound();
  const locale = raw as Locale;
  const category = catRaw as BlogCategory;
  const dict = getDictionary(locale);
  const posts = getPostsByCategory(locale, category);
  const label = dict.blog.categories[category];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: dict.blog.meta.categoryTitle.replace("{category}", label),
    description: dict.blog.meta.categoryDescription.replace("{category}", label),
    url: `${SITE_URL}${categoryPath(locale, category)}`,
    inLanguage: locale === "pt" ? "pt-BR" : "en",
  };

  return (
    <BlogShell dict={dict} locale={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogHero
        eyebrow={dict.blog.hero.eyebrow}
        title={label}
        subtitle={dict.blog.meta.categoryDescription.replace("{category}", label)}
      />
      <Container className="flex flex-col gap-10 pt-10 sm:pt-12">
        <CategoryChips
          locale={locale}
          dict={dict.blog.categories}
          active={category}
        />

        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard
                key={post.slug}
                post={post}
                locale={locale}
                dict={dict.blog}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted">{dict.blog.empty}</p>
            <Link
              href={blogPath(locale)}
              className="font-mono text-sm text-accent transition-colors hover:underline"
            >
              {dict.blog.backToBlog}
            </Link>
          </div>
        )}
      </Container>
    </BlogShell>
  );
}
