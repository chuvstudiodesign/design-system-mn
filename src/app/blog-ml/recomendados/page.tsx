import type { Metadata } from "next";
import { BlogRecommendedPage } from "../_components/blog-public-listing";

export const metadata: Metadata = {
  title: "Leitura recomendada | Blog MN",
  description: "Curadoria de artigos recomendados do Blog MN.",
};

export default function RecomendadosPage() {
  return <BlogRecommendedPage />;
}
