import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, LayoutDashboard } from "lucide-react";
import {
  BlogFilterExperience,
  BlogPostCarousel,
  BlogPostCard,
  NewsletterCTA,
} from "@/components/blog";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/typography";
import {
  blogHomeMetadata,
  getBlogCategories,
  getBlogCategoryCount,
  getBlogTags,
  getFeaturedBlogPosts,
  getPrimaryBlogPost,
  getPublishedBlogPosts,
} from "@/lib/blog";
import {
  FoundationFooter,
  FoundationPageHeader,
  Section,
} from "../../foundation-sections";

export const metadata: Metadata = blogHomeMetadata;

export default function BlogPage() {
  const posts = getPublishedBlogPosts();
  const featuredPosts = getFeaturedBlogPosts();
  const primaryPost = getPrimaryBlogPost();
  const editorialPicks = [
    ...featuredPosts.filter((post) => post.slug !== primaryPost.slug),
    ...posts.filter((post) => post.slug !== primaryPost.slug && !post.featured),
  ];
  const belowFeatured = editorialPicks.slice(0, 2);
  const sideFeatured = editorialPicks.slice(2, 4);
  const categories = getBlogCategories();
  const tags = getBlogTags();

  return (
    <div className="ds-page">
      <div className="flex items-start justify-between gap-4 px-1">
        <FoundationPageHeader
          title="Blog"
          description="Plataforma editorial para negócios, inovação, tecnologia, liderança, estratégia e crescimento."
        />
        <Button render={<Link href="/styleguide/paginas/blog/cms" />} variant="secondary" size="sm" className="shrink-0">
          <LayoutDashboard data-icon="inline-start" className="size-4" />
          CMS
        </Button>
      </div>

      <Section
        eyebrow="Blog"
        title="Negócios, tecnologia e crescimento"
        subtitle="Análises para founders, líderes e equipes que precisam transformar estratégia em decisão, produto, cultura e execução."
        first
      >
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
          <div className="flex flex-col gap-6">
            <BlogPostCard post={primaryPost} featured />
            <div className="grid gap-6 lg:grid-cols-2">
              {belowFeatured.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="ds-card !p-[30px] flex flex-col gap-4">
              <Typography as="p" variant="caption" className="font-bold text-primary">
                Newsletter
              </Typography>
              <Typography as="h3" variant="h2" className="text-foreground">
                Receba leituras sobre negócios, tecnologia e crescimento.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Uma curadoria para acompanhar tendências, decisões e movimentos que importam para empresas em crescimento.
              </Typography>
              <form className="mt-2 flex flex-col gap-3" aria-label="Assinar newsletter demonstrativa">
                <input
                  type="email"
                  placeholder="email@empresa.com"
                  className="h-12 rounded-[10px] border border-input bg-[#ECECEC] px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />
                <Button type="button" className="min-h-12 w-fit">
                  Assinar
                  <ArrowRight data-icon="inline-end" className="size-4" />
                </Button>
              </form>
            </div>
            {sideFeatured.map((post) => (
              <BlogPostCard key={post.id} post={post} compact />
            ))}
          </div>
        </div>
      </Section>

      <Section
        title="Biblioteca"
        subtitle="Busca local e filtros por categoria ou tag. A estrutura simula a experiência que será conectada a um CMS real."
      >
        <BlogFilterExperience posts={posts} categories={categories} tags={tags} />
      </Section>

      <Section
        title="Categorias"
        subtitle="Mapa editorial para organizar temas, filtros e arquitetura de conteúdo."
      >
        <div className="ds-grid-3">
          {categories.map((category) => (
            <div key={category.slug} className="ds-card !p-[30px]">
              <div className="mb-5">
                <div
                  className="h-3 w-16 rounded-full"
                  style={{ background: category.colorToken }}
                />
              </div>
              <Typography as="h3" variant="h3" className="text-foreground">
                {category.name}
              </Typography>
              <Typography as="p" variant="body-sm" className="mt-2 text-muted-foreground">
                {category.description}
              </Typography>
              <Typography as="p" variant="code" className="mt-4 font-bold text-primary">
                {getBlogCategoryCount(category.slug)} artigos publicados
              </Typography>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Leitura recomendada"
        subtitle="Carrossel infinito com todos os posts da biblioteca, mantendo o mesmo card editorial."
      >
        <BlogPostCarousel posts={posts} />
      </Section>

      <Section
        title="Newsletter"
        subtitle="Bloco de conversão visual, preparado para futura integração com CRM, automação ou provider de email."
      >
        <NewsletterCTA />
      </Section>

      <FoundationFooter />
    </div>
  );
}
