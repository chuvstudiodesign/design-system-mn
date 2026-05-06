import type { Metadata } from "next";
import type { BlogPost } from "@/data/blog";

const siteName = "MN Design System";
const blogBasePath = "/styleguide/paginas/blog";

export const blogHomeMetadata: Metadata = {
  title: "Blog | MN Design System",
  description:
    "Plataforma editorial para negócios, inovação, tecnologia, liderança e crescimento.",
  keywords: [
    "blog de negócios",
    "inovação",
    "empreendedorismo",
    "tecnologia",
    "estratégia",
    "crescimento",
  ],
  openGraph: {
    title: "Blog | MN Design System",
    description:
      "Conteúdos editoriais sobre negócios, inovação, tecnologia e crescimento.",
    type: "website",
    siteName,
    url: blogBasePath,
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | MN Design System",
    description:
      "Conteúdos editoriais sobre negócios, inovação, tecnologia e crescimento.",
  },
};

export function createPostMetadata(post: BlogPost): Metadata {
  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: post.seoKeywords,
    alternates: {
      canonical: post.canonicalUrl ?? `${blogBasePath}/${post.slug}`,
    },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      type: "article",
      siteName,
      url: post.canonicalUrl ?? `${blogBasePath}/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.seoDescription,
    },
  };
}
