import type { MetadataRoute } from "next";
import { locales } from "@/i18n";
import {
  SITE_URL,
  blogPath,
  categoryPath,
  getAllCategoriesWithPosts,
  getAllPosts,
} from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    });

    entries.push({
      url: `${SITE_URL}${blogPath(locale)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    });

    for (const category of getAllCategoriesWithPosts(locale)) {
      entries.push({
        url: `${SITE_URL}${categoryPath(locale, category)}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }

    for (const post of getAllPosts(locale)) {
      entries.push({
        url: `${SITE_URL}${blogPath(locale, post.slug)}`,
        lastModified: new Date(post.updated ?? post.date),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
