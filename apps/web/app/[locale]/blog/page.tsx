import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@insightfy/ui";
import { BlogShell } from "@/components/blog/BlogShell";
import { BlogHero } from "@/components/blog/BlogHero";
import { CategoryChips } from "@/components/blog/CategoryChips";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { PostCard } from "@/components/blog/PostCard";
import { getDictionary, isLocale } from "@/i18n";
import type { Locale } from "@/i18n/types";
import {
  SITE_URL,
  blogPath,
  getAllPosts,
  getFeaturedPost,
} from "@/lib/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const url = `${SITE_URL}${blogPath(locale)}`;

  return {
    title: dict.blog.meta.indexTitle,
    description: dict.blog.meta.indexDescription,
    alternates: {
      canonical: url,
      languages: {
        pt: `${SITE_URL}${blogPath("pt")}`,
        en: `${SITE_URL}${blogPath("en")}`,
      },
    },
    openGraph: {
      title: dict.blog.meta.indexTitle,
      description: dict.blog.meta.indexDescription,
      url,
      type: "website",
      locale: locale === "pt" ? "pt_BR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.blog.meta.indexTitle,
      description: dict.blog.meta.indexDescription,
    },
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  const all = getAllPosts(locale);
  const featured = getFeaturedPost(locale);
  const grid = featured
    ? all.filter((p) => p.slug !== featured.slug)
    : all;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: dict.blog.meta.indexTitle,
    description: dict.blog.meta.indexDescription,
    url: `${SITE_URL}${blogPath(locale)}`,
    inLanguage: locale === "pt" ? "pt-BR" : "en",
    blogPost: all.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      url: `${SITE_URL}${blogPath(locale, p.slug)}`,
    })),
  };

  return (
    <BlogShell dict={dict} locale={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogHero
        eyebrow={dict.blog.hero.eyebrow}
        title={dict.blog.hero.title}
        subtitle={dict.blog.hero.subtitle}
      />
      <Container className="flex flex-col gap-10 pt-10 sm:pt-12">
        <CategoryChips locale={locale} dict={dict.blog.categories} active="all" />

        {featured ? (
          <FeaturedPost post={featured} locale={locale} dict={dict.blog} />
        ) : null}

        {grid.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {grid.map((post) => (
              <PostCard
                key={post.slug}
                post={post}
                locale={locale}
                dict={dict.blog}
              />
            ))}
          </div>
        ) : !featured ? (
          <p className="text-sm text-muted">{dict.blog.empty}</p>
        ) : null}
      </Container>
    </BlogShell>
  );
}
