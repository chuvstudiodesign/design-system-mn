import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, LayoutDashboard } from "lucide-react";
import {
  BlogFilterExperience,
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
  const secondaryFeatured = featuredPosts.filter((post) => post.slug !== primaryPost.slug).slice(0, 2);
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
        eyebrow="Paginas"
        title="Editorial de negocios"
        subtitle="Uma experiencia de blog construida com os mesmos tokens, sections, cards e componentes do Design System."
        first
      >
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
          <BlogPostCard post={primaryPost} featured />
          <div className="flex flex-col gap-6">
            <div className="ds-card !p-[30px] flex flex-col gap-4">
              <Typography as="p" variant="caption" className="text-primary">
                Sistema editorial
              </Typography>
              <Typography as="h3" variant="h2" className="text-foreground">
                Conteudo local-first preparado para CMS real.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Posts, categorias, tags, autores, SEO e blocos de conteudo estao tipados para evoluir para Sanity, Payload, Strapi, Supabase ou outro backend.
              </Typography>
              <Button render={<Link href="/styleguide/paginas/blog/cms" />} variant="outline" size="sm" className="mt-auto w-fit">
                Ver CMS mockado
                <ArrowRight data-icon="inline-end" className="size-4" />
              </Button>
            </div>
            {secondaryFeatured.map((post) => (
              <BlogPostCard key={post.id} post={post} />
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
              <div
                className="mb-5 h-3 w-16 rounded-full"
                style={{ background: category.colorToken }}
              />
              <Typography as="h3" variant="h3" className="text-foreground">
                {category.name}
              </Typography>
              <Typography as="p" variant="body-sm" className="mt-2 text-muted-foreground">
                {category.description}
              </Typography>
              <Typography as="p" variant="code" className="mt-4 text-primary">
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
        subtitle="Curadoria editorial para reforcar temas estrategicos e manter fluxo de leitura."
      >
        <div className="ds-grid-3">
          {posts.slice(3, 6).map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
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
