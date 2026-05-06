import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText, Radio, Sparkles } from "lucide-react";
import {
  CMSBlogManager,
  CMSStatusBadge,
} from "@/components/blog";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/typography";
import {
  getBlogCategories,
  getBlogAuthors,
  getBlogTags,
  getCmsBlogPosts,
  getFeaturedBlogPosts,
  getPublishedBlogPosts,
} from "@/lib/blog";
import {
  FoundationFooter,
  FoundationPageHeader,
  Section,
} from "../../../foundation-sections";

export const metadata: Metadata = {
  title: "CMS Blog | MN Design System",
  description: "Protótipo visual de Content Manager para a plataforma de Blog.",
};

export default function BlogCMSPage() {
  const posts = getCmsBlogPosts();
  const categories = getBlogCategories();
  const tags = getBlogTags();
  const authors = getBlogAuthors();
  const publishedCount = getPublishedBlogPosts().length;
  const featuredCount = getFeaturedBlogPosts().length;
  const draftCount = posts.filter((post) => post.status === "draft").length;
  const scheduledCount = posts.filter((post) => post.status === "scheduled").length;

  return (
    <div className="ds-page">
      <div className="flex items-start justify-between gap-4 px-1">
        <FoundationPageHeader
          title="CMS Blog"
          description="Protótipo local-first para gerenciar posts, status, taxonomia, SEO e preview editorial."
        />
        <Button render={<Link href="/styleguide/paginas/blog" />} variant="secondary" size="sm" className="shrink-0">
          <ArrowLeft data-icon="inline-start" className="size-4" />
          Voltar
        </Button>
      </div>

      <Section
        eyebrow="Content Manager"
        title="Operação editorial"
        subtitle="Uma visão de CMS mockada, sem persistência real, mas alinhada aos campos e fluxos esperados para uma integração futura."
        first
      >
        <div className="ds-grid-3">
          <div className="ds-card !p-[30px]">
            <FileText className="mb-5 size-5 text-primary" />
            <Typography as="p" variant="caption" className="text-muted-foreground">
              Publicados
            </Typography>
            <Typography as="p" variant="display" className="mt-2 text-foreground">
              {publishedCount}
            </Typography>
          </div>
          <div className="ds-card !p-[30px]">
            <Sparkles className="mb-5 size-5 text-primary" />
            <Typography as="p" variant="caption" className="text-muted-foreground">
              Destaques
            </Typography>
            <Typography as="p" variant="display" className="mt-2 text-foreground">
              {featuredCount}
            </Typography>
          </div>
          <div className="ds-card !p-[30px]">
            <Radio className="mb-5 size-5 text-primary" />
            <Typography as="p" variant="caption" className="text-muted-foreground">
              Pipeline
            </Typography>
            <div className="mt-4 flex flex-wrap gap-2">
              <CMSStatusBadge status="draft" />
              <span className="font-mono text-sm text-muted-foreground">{draftCount}</span>
              <CMSStatusBadge status="scheduled" />
              <span className="font-mono text-sm text-muted-foreground">{scheduledCount}</span>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Posts e editor"
        subtitle="Lista editorial com busca, filtro por categoria, criação de rascunho, seleção, edição e salvamento local em memória."
      >
        <CMSBlogManager
          initialPosts={posts}
          categories={categories}
          tags={tags}
          authors={authors}
        />
      </Section>

      <Section
        title="Próxima camada"
        subtitle="Preparação para um CMS real sem reescrever a interface."
      >
        <div className="ds-card !p-[30px]">
          <Typography as="h3" variant="h3" className="text-foreground">
            Adapter primeiro, banco depois.
          </Typography>
          <Typography as="p" variant="body-sm" className="mt-2 max-w-3xl text-muted-foreground">
            Os componentes consomem helpers de `src/lib/blog`. Para conectar Sanity, Payload, Strapi, Contentful, Supabase ou outro backend, a próxima etapa é trocar essa camada por queries reais e manter os mesmos contratos de dados.
          </Typography>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
