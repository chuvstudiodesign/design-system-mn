import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogCategoryPage } from "../../_components/blog-public-listing";
import { getBlogCategories, getPublishedBlogPosts } from "@/lib/blog";

type CategoriaPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlogCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoriaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getBlogCategories().find((item) => item.slug === slug);

  if (!category) {
    return { title: "Categoria não encontrada | Blog MN" };
  }

  return {
    title: `${category.name} | Blog MN`,
    description: category.description,
  };
}

export default async function CategoriaPage({ params }: CategoriaPageProps) {
  const { slug } = await params;
  const category = getBlogCategories().find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const posts = getPublishedBlogPosts().filter((post) => post.categorySlug === category.slug);

  return <BlogCategoryPage category={category} posts={posts} />;
}
