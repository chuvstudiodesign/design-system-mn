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
  Section,
} from "@/app/styleguide/foundation-sections";

const publicBlogBasePath = "/blog-ml";

type BlogMLPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogMLPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post não encontrado | MN",
    };
  }

  return createPostMetadata(post, publicBlogBasePath);
}

export default async function BlogMLPostPage({ params }: BlogMLPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(post);

  return (
    <div className="ds-page">
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
          <BlogPostHeader post={post} backHref={publicBlogBasePath} backLabel="Voltar para o Blog" />
        </ChamferedPanel>
      </section>

      <section className="ds-section">
        <BlogPostContent post={post} />
      </section>

      <Section
        title="Artigos relacionados"
        subtitle="Relacionamento por curadoria explícita, categoria e tags compartilhadas."
      >
        <BlogRelatedPosts posts={relatedPosts} basePath={publicBlogBasePath} />
      </Section>

      <Section
        title="Continue acompanhando"
        subtitle="CTA para fechar a leitura e preparar conversão futura."
      >
        <NewsletterCTA />
      </Section>

      <FoundationFooter />
    </div>
  );
}
