import type { Metadata } from "next";
import { BlogLibraryPage } from "../_components/blog-public-listing";
import { getBlogCategories, getPublishedBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Biblioteca | Blog MN",
  description: "Biblioteca completa de artigos do Blog MN.",
};

export default function BibliotecaPage() {
  return (
    <BlogLibraryPage
      title="Biblioteca completa"
      subtitle="Todos os artigos publicados, organizados para navegar por estratégia, inovação, tecnologia, liderança e crescimento."
      posts={getPublishedBlogPosts()}
      categories={getBlogCategories()}
    />
  );
}
