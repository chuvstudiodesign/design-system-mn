import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BlogPostContent,
  BlogPostHeader,
  BlogRelatedPosts,
  NewsletterCTA,
} from "@/components/blog";
import {
  createPostMetadata,
  getAllBlogPosts,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/lib/blog";
import {
  FoundationFooter,
  Section,
} from "../../../foundation-sections";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post nao encontrado | MN Design System",
    };
  }

  return createPostMetadata(post);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(post);

  return (
    <div className="ds-page">
      <Section
        eyebrow="Blog"
        title="Artigo"
        subtitle="Pagina individual estruturada para SEO, leitura longa e recomendacoes editoriais."
        first
      >
        <BlogPostHeader post={post} />
      </Section>

      <Section
        title="Conteudo"
        subtitle="Blocos ricos renderizados a partir da camada local-first de conteudo."
      >
        <BlogPostContent post={post} />
      </Section>

      <Section
        title="Artigos relacionados"
        subtitle="Relacionamento por curadoria explicita, categoria e tags compartilhadas."
      >
        <BlogRelatedPosts posts={relatedPosts} />
      </Section>

      <Section
        title="Continue acompanhando"
        subtitle="CTA demonstrativo para fechar a leitura e preparar conversao futura."
      >
        <NewsletterCTA />
      </Section>

      <FoundationFooter />
    </div>
  );
}
