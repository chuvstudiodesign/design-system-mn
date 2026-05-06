import { cache } from "react";
import {
  blogAuthors,
  blogCategories,
  blogPosts,
  blogTags,
  type BlogFilters,
  type BlogPost,
} from "@/data/blog";
import { normalizeSearchText } from "./format";

export const getAllBlogPosts = cache(() => blogPosts);

export const getPublishedBlogPosts = cache(() =>
  blogPosts
    .filter((post) => post.status === "published")
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
);

export const getCmsBlogPosts = cache(() =>
  blogPosts.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
);

export const getFeaturedBlogPosts = cache(() =>
  getPublishedBlogPosts().filter((post) => post.featured)
);

export const getBlogCategories = cache(() => blogCategories);

export const getBlogTags = cache(() => blogTags);

export const getBlogAuthors = cache(() => blogAuthors);

export const getBlogPostBySlug = cache((slug: string) =>
  blogPosts.find((post) => post.slug === slug)
);

export function getBlogCategoryCount(slug: string) {
  return getPublishedBlogPosts().filter((post) => post.categorySlug === slug).length;
}

export function getBlogTagCount(slug: string) {
  return getPublishedBlogPosts().filter((post) => post.tagSlugs.includes(slug)).length;
}

export function filterBlogPosts(posts: BlogPost[], filters: BlogFilters) {
  const query = normalizeSearchText(filters.query ?? "");

  return posts.filter((post) => {
    if (filters.status && post.status !== filters.status) {
      return false;
    }

    if (typeof filters.featured === "boolean" && post.featured !== filters.featured) {
      return false;
    }

    if (filters.category && filters.category !== "all" && post.categorySlug !== filters.category) {
      return false;
    }

    if (filters.tag && filters.tag !== "all" && !post.tagSlugs.includes(filters.tag)) {
      return false;
    }

    if (!query) {
      return true;
    }

    const haystack = normalizeSearchText(
      [
        post.title,
        post.subtitle,
        post.excerpt,
        post.category,
        post.tags.join(" "),
        post.author,
      ].join(" ")
    );

    return haystack.includes(query);
  });
}

export function getRelatedBlogPosts(post: BlogPost, limit = 3) {
  const explicit = post.relatedPosts
    .map((slug) => getBlogPostBySlug(slug))
    .filter((item): item is BlogPost => item !== undefined && item.status === "published");

  const fallback = getPublishedBlogPosts()
    .filter((item) => item.slug !== post.slug)
    .filter((item) => item.categorySlug === post.categorySlug || item.tagSlugs.some((tag) => post.tagSlugs.includes(tag)));

  const seen = new Set<string>();

  return [...explicit, ...fallback].filter((item) => {
    if (seen.has(item.slug)) {
      return false;
    }

    seen.add(item.slug);
    return true;
  }).slice(0, limit);
}

export function getPrimaryBlogPost() {
  return getFeaturedBlogPosts()[0] ?? getPublishedBlogPosts()[0];
}
