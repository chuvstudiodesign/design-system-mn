import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import {
  BlogFilterExperience,
  BlogPostCarousel,
  BlogPostCard,
  NewsletterCTA,
} from "@/components/blog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  const secondaryFeatured = [
    ...featuredPosts.filter((post) => post.slug !== primaryPost.slug),
    ...posts.filter((post) => post.slug !== primaryPost.slug && !post.featured),
  ].slice(0, 4);
  const categories = getBlogCategories();
  const tags = getBlogTags();

  return (
    <div className="ds-page">
      <div className="flex items-start justify-between gap-4 px-1">
        <FoundationPageHeader
          title="Blog"
          description="Plataforma editorial para negocios, inovacao, tecnologia, lideranca, estrategia e crescimento."
        />
        <Button render={<Link href="/styleguide/paginas/blog/cms" />} variant="secondary" size="sm" className="shrink-0">
          <LayoutDashboard data-icon="inline-start" className="size-4" />
          CMS
        </Button>
      </div>

      <Section
        eyebrow="Blog"
        title="Negocios, tecnologia e crescimento"
        subtitle="Analises para founders, lideres e equipes que precisam transformar estrategia em decisao, produto, cultura e execucao."
        first
      >
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
          <BlogPostCard post={primaryPost} featured />
          <div className="flex flex-col gap-6">
            {secondaryFeatured.map((post) => (
              <BlogPostCard key={post.id} post={post} compact />
            ))}
          </div>
        </div>
      </Section>

      <Section
        title="Categorias"
        subtitle="Mapa editorial para organizar temas, filtros e arquitetura de conteudo."
      >
        <div className="ds-grid-3">
          {categories.map((category) => (
            <div key={category.slug} className="ds-card !p-[30px]">
              <div className="mb-5 flex items-center gap-3">
                <div
                  className="h-3 w-16 rounded-full"
                  style={{ background: category.colorToken }}
                />
                <Typography as="p" variant="code" className="text-muted-foreground">
                  {category.colorName}
                </Typography>
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
        title="Biblioteca"
        subtitle="Busca local e filtros por categoria ou tag. A estrutura simula a experiencia que sera conectada a um CMS real."
      >
        <BlogFilterExperience posts={posts} categories={categories} tags={tags} />
      </Section>

      <Section
        title="Leitura recomendada"
        subtitle="Carrossel infinito com todos os posts da biblioteca, mantendo o mesmo card editorial."
      >
        <BlogPostCarousel posts={posts} />
      </Section>

      <Section
        title="Tags editoriais"
        subtitle="Taxonomia provisoria para descoberta e migracao futura para CMS."
      >
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag.slug} variant="secondary" className="min-h-8 px-2.5 py-0 text-[10px]">
              {tag.name}
            </Badge>
          ))}
        </div>
      </Section>

      <Section
        title="Newsletter"
        subtitle="Bloco de conversao visual, preparado para futura integracao com CRM, automacao ou provider de email."
      >
        <NewsletterCTA />
      </Section>

      <FoundationFooter />
    </div>
  );
}
