import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BlogPostContent,
  BlogPostHeader,
  BlogRelatedPosts,
  NewsletterCTA,
} from "@/components/blog";
import { ChamferedPanel } from "@/components/chamfered-panel";
import {
  createPostMetadata,
  getAllBlogPosts,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/lib/blog";
import {
  FoundationFooter,
  FoundationPageHeader,
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
      <FoundationPageHeader
        title="Blog"
        description="Artigo editorial para aprofundar temas de negócios, inovação, tecnologia, liderança, estratégia e crescimento."
      />

      <section className="w-full">
        <ChamferedPanel
          strokeColor="#FFFFFF"
          strokeWidth={1}
          innerStyle={{
            background: "#ECECEC",
            borderRadius: 10,
            padding: "var(--section-padding-y) var(--section-padding-x)",
          }}
        >
          <BlogPostHeader post={post} />
        </ChamferedPanel>
      </section>

      <section className="ds-section">
        <BlogPostContent post={post} />
      </section>

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
