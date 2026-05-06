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
      title: "Post não encontrado | MN Design System",
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
        subtitle="Página individual estruturada para SEO, leitura longa e recomendações editoriais."
        first
      >
        <BlogPostHeader post={post} />
      </Section>

      <Section
        title="Conteúdo"
        subtitle="Blocos ricos renderizados a partir da camada local-first de conteúdo."
      >
        <BlogPostContent post={post} />
      </Section>

      <Section
        title="Artigos relacionados"
        subtitle="Relacionamento por curadoria explícita, categoria e tags compartilhadas."
      >
        <BlogRelatedPosts posts={relatedPosts} />
      </Section>

      <Section
        title="Continue acompanhando"
        subtitle="CTA demonstrativo para fechar a leitura e preparar conversão futura."
      >
        <NewsletterCTA />
      </Section>

      <FoundationFooter />
    </div>
  );
}
