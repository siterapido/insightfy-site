import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@insightfy/ui";
import { BlogShell } from "@/components/blog/BlogShell";
import { PostHeader } from "@/components/blog/PostHeader";
import { PostBody } from "@/components/blog/PostBody";
import { CtaEnd } from "@/components/blog/CtaEnd";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { getDictionary, isLocale } from "@/i18n";
import type { Locale } from "@/i18n/types";
import {
  SITE_URL,
  blogPath,
  contactPath,
  getAllPostParams,
  getPostBySlug,
  getRelatedPosts,
  renderPostMdx,
} from "@/lib/blog";

export function generateStaticParams() {
  return getAllPostParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const post = getPostBySlug(locale, slug);
  if (!post || post.draft) return {};

  const url = `${SITE_URL}${blogPath(locale, slug)}`;
  const languages: Record<string, string> = {};
  if (post.translationKey) {
    for (const loc of ["pt", "en"] as Locale[]) {
      const alt = getPostBySlug(loc, slug);
      // Same slug across locales in seed content
      if (alt && !alt.draft && alt.translationKey === post.translationKey) {
        languages[loc] = `${SITE_URL}${blogPath(loc, alt.slug)}`;
      }
    }
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
      languages: Object.keys(languages).length ? languages : undefined,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      locale: locale === "pt" ? "pt_BR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const post = getPostBySlug(locale, slug);
  if (!post || post.draft) notFound();

  const dict = getDictionary(locale);
  const related = getRelatedPosts(locale, post, 3);
  const mdx = await renderPostMdx(post.content, dict.blog, locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    mainEntityOfPage: `${SITE_URL}${blogPath(locale, slug)}`,
    inLanguage: locale === "pt" ? "pt-BR" : "en",
    author: {
      "@type": "Organization",
      name: "Insightfy",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Insightfy",
      url: SITE_URL,
    },
  };

  return (
    <BlogShell dict={dict} locale={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container className="pt-12 sm:pt-16">
        <article>
          <PostHeader post={post} locale={locale} dict={dict.blog} />
          <PostBody>{mdx}</PostBody>
          <div className="mx-auto w-full max-w-[72ch]">
            <CtaEnd
              title={dict.blog.ctaEnd.title}
              body={dict.blog.ctaEnd.body}
              cta={dict.blog.ctaEnd.cta}
              href={contactPath(locale)}
            />
            <RelatedPosts posts={related} locale={locale} dict={dict.blog} />
          </div>
        </article>
      </Container>
    </BlogShell>
  );
}
