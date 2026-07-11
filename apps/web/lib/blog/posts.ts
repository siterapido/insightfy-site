import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Locale } from "@/i18n/types";
import {
  BLOG_CATEGORIES,
  isBlogCategory,
  type BlogCategory,
  type BlogPost,
  type BlogPostFrontmatter,
  type BlogPostMeta,
} from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

function localeDir(locale: Locale): string {
  return path.join(CONTENT_DIR, locale);
}

function parsePost(filePath: string, locale: Locale, slug: string): BlogPost | null {
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as Partial<BlogPostFrontmatter>;

  if (!fm.title || !fm.description || !fm.date || !fm.category) {
    return null;
  }
  if (!isBlogCategory(fm.category)) {
    return null;
  }

  const stats = readingTime(content);

  return {
    slug,
    locale,
    title: fm.title,
    description: fm.description,
    date: fm.date,
    updated: fm.updated,
    category: fm.category,
    tags: Array.isArray(fm.tags) ? fm.tags.map(String) : [],
    cover: fm.cover,
    draft: Boolean(fm.draft),
    featured: Boolean(fm.featured),
    translationKey: fm.translationKey,
    readingMinutes: Math.max(1, Math.ceil(stats.minutes)),
    content,
  };
}

function listSlugs(locale: Locale): string[] {
  const dir = localeDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

function toMeta(post: BlogPost): BlogPostMeta {
  const { content: _content, ...meta } = post;
  return meta;
}

/** Published posts only (drafts excluded). Newest first. */
export function getAllPosts(locale: Locale): BlogPostMeta[] {
  return listSlugs(locale)
    .map((slug) => getPostBySlug(locale, slug))
    .filter((p): p is BlogPost => p !== null && !p.draft)
    .map(toMeta)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getPostBySlug(locale: Locale, slug: string): BlogPost | null {
  const mdx = path.join(localeDir(locale), `${slug}.mdx`);
  const md = path.join(localeDir(locale), `${slug}.md`);
  return parsePost(fs.existsSync(mdx) ? mdx : md, locale, slug);
}

export function getPostsByCategory(
  locale: Locale,
  category: BlogCategory,
): BlogPostMeta[] {
  return getAllPosts(locale).filter((p) => p.category === category);
}

export function getFeaturedPost(locale: Locale): BlogPostMeta | null {
  const posts = getAllPosts(locale);
  return posts.find((p) => p.featured) ?? null;
}

export function getRelatedPosts(
  locale: Locale,
  post: BlogPostMeta,
  limit = 3,
): BlogPostMeta[] {
  const all = getAllPosts(locale).filter((p) => p.slug !== post.slug);

  const sameCategory = all.filter((p) => p.category === post.category);
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const tagSet = new Set(post.tags);
  const byTags = all
    .filter((p) => !sameCategory.some((s) => s.slug === p.slug))
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => tagSet.has(t)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.post);

  const combined = [...sameCategory, ...byTags];
  const seen = new Set<string>();
  const result: BlogPostMeta[] = [];
  for (const p of combined) {
    if (seen.has(p.slug)) continue;
    seen.add(p.slug);
    result.push(p);
    if (result.length >= limit) break;
  }

  if (result.length < limit) {
    for (const p of all) {
      if (seen.has(p.slug)) continue;
      result.push(p);
      if (result.length >= limit) break;
    }
  }

  return result;
}

export function getAllCategoriesWithPosts(locale: Locale): BlogCategory[] {
  const posts = getAllPosts(locale);
  return BLOG_CATEGORIES.filter((c) => posts.some((p) => p.category === c));
}

export function getAllPostParams(): { locale: Locale; slug: string }[] {
  const locales: Locale[] = ["pt", "en"];
  return locales.flatMap((locale) =>
    listSlugs(locale)
      .map((slug) => getPostBySlug(locale, slug))
      .filter((p): p is BlogPost => p !== null && !p.draft)
      .map((p) => ({ locale, slug: p.slug })),
  );
}

export function formatPostDate(date: string, locale: Locale): string {
  const d = new Date(`${date}T12:00:00`);
  return new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d);
}

export function readingTimeLabel(template: string, minutes: number): string {
  return template.replace("{n}", String(minutes));
}

export function blogPath(locale: Locale, ...parts: string[]): string {
  const base = `/${locale}/blog`;
  if (parts.length === 0) return base;
  return `${base}/${parts.join("/")}`;
}

export function categoryPath(locale: Locale, category: BlogCategory): string {
  return blogPath(locale, "categoria", category);
}

export function contactPath(locale: Locale): string {
  return `/${locale}#contato`;
}
