import type { Metadata } from "next";
import { BlogCategoriesPage } from "../_components/blog-public-listing";
import { getBlogCategories } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Categorias | Blog MN",
  description: "Categorias editoriais do Blog MN.",
};

export default function CategoriasPage() {
  return <BlogCategoriesPage categories={getBlogCategories()} />;
}
