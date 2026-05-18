import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogLibraryPage } from "../../_components/blog-public-listing";
import { getBlogCategories, getPublishedBlogPosts } from "@/lib/blog";

type BibliotecaCategoryPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return getBlogCategories().map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: BibliotecaCategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getBlogCategories().find((item) => item.slug === slug);

  if (!category) {
    return { title: "Biblioteca não encontrada | Blog MN" };
  }

  return {
    title: `Biblioteca de ${category.name} | Blog MN`,
    description: category.description,
  };
}

export default async function BibliotecaCategoryPage({ params }: BibliotecaCategoryPageProps) {
  const { category: slug } = await params;
  const categories = getBlogCategories();
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const posts = getPublishedBlogPosts().filter((post) => post.categorySlug === category.slug);

  return (
    <BlogLibraryPage
      title={`Biblioteca de ${category.name}`}
      subtitle={category.description}
      posts={posts}
      categories={categories}
    />
  );
}
