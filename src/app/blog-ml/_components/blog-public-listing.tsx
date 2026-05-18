import Link from "next/link";
import type { BlogCategory, BlogPost } from "@/data/blog";
import { BlogPostCard, BlogPostCarousel, NewsletterCTA } from "@/components/blog";
import { Typography } from "@/components/typography";
import {
  getBlogCategoryCount,
  getBlogCategoryStyle,
  getPublishedBlogPosts,
} from "@/lib/blog";
import { Section } from "@/app/styleguide/foundation-sections";

const publicBlogBasePath = "/blog-ml";

export function BlogPostGrid({
  posts,
  emptyTitle = "Nenhum artigo encontrado",
}: {
  posts: BlogPost[];
  emptyTitle?: string;
}) {
  if (posts.length === 0) {
    return (
      <div className="ds-card !p-[30px]">
        <Typography as="h2" variant="h3" className="text-foreground">
          {emptyTitle}
        </Typography>
        <Typography as="p" variant="body-sm" className="mt-2 text-muted-foreground">
          Volte para a biblioteca completa para continuar navegando pelos conteúdos publicados.
        </Typography>
      </div>
    );
  }

  return (
    <div className="ds-grid-3">
      {posts.map((post) => (
        <BlogPostCard key={post.id} post={post} basePath={publicBlogBasePath} />
      ))}
    </div>
  );
}

export function BlogLibraryPage({
  title,
  subtitle,
  posts,
  categories,
}: {
  title: string;
  subtitle: string;
  posts: BlogPost[];
  categories: BlogCategory[];
}) {
  return (
    <div className="ds-page">
      <Section eyebrow="Biblioteca" title={title} subtitle={subtitle} first>
        <BlogPostGrid posts={posts} />
      </Section>

      <Section
        title="Explorar por categoria"
        subtitle="Acesse uma biblioteca dedicada para cada frente editorial."
      >
        <div className="ds-grid-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/blog-ml/biblioteca/${category.slug}`}
              className="ds-card !p-[30px] block transition-transform hover:-translate-y-0.5"
            >
              <div className="mb-5 h-3 w-16 rounded-full" style={{ background: category.colorToken }} />
              <Typography as="h2" variant="h3" className="text-foreground">
                {category.name}
              </Typography>
              <Typography as="p" variant="body-sm" className="mt-2 text-muted-foreground">
                {category.description}
              </Typography>
              <Typography as="p" variant="code" className="mt-4 font-bold text-primary">
                {getBlogCategoryCount(category.slug)} artigos publicados
              </Typography>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}

export function BlogCategoriesPage({ categories }: { categories: BlogCategory[] }) {
  return (
    <div className="ds-page">
      <Section
        eyebrow="Categorias"
        title="Categorias editoriais"
        subtitle="Cada categoria organiza uma biblioteca própria para navegação por tema."
        first
      >
        <div className="ds-grid-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/blog-ml/categorias/${category.slug}`}
              className="ds-card !p-[30px] block transition-transform hover:-translate-y-0.5"
            >
              <div className="mb-5 h-3 w-16 rounded-full" style={{ background: category.colorToken }} />
              <Typography as="h2" variant="h3" className="text-foreground">
                {category.name}
              </Typography>
              <Typography as="p" variant="body-sm" className="mt-2 text-muted-foreground">
                {category.description}
              </Typography>
              <span className="mt-4 inline-flex text-sm font-bold text-primary">
                Ver categoria
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}

export function BlogCategoryPage({
  category,
  posts,
}: {
  category: BlogCategory;
  posts: BlogPost[];
}) {
  return (
    <div className="ds-page">
      <Section
        eyebrow="Categoria"
        title={category.name}
        subtitle={category.description}
        first
      >
        <div className="mb-6 flex flex-wrap gap-2">
          <span
            className="inline-flex min-h-8 items-center rounded-[10px] px-2.5 text-[10px] font-semibold uppercase tracking-wider"
            style={getBlogCategoryStyle(category.slug)}
          >
            {posts.length} artigos
          </span>
        </div>
        <BlogPostGrid posts={posts} />
      </Section>
    </div>
  );
}

export function BlogRecommendedPage() {
  const posts = getPublishedBlogPosts();
  const featured = posts.filter((post) => post.featured);
  const recommended = featured.length > 0 ? featured : posts.slice(0, 6);

  return (
    <div className="ds-page">
      <Section
        eyebrow="Leitura recomendada"
        title="Curadoria para começar"
        subtitle="Uma seleção de artigos para leitura rápida antes de aprofundar na biblioteca completa."
        first
      >
        <BlogPostGrid posts={recommended} />
      </Section>

      <Section
        title="Continuar navegando"
        subtitle="Carrossel com o acervo publicado para avançar por outros temas."
      >
        <BlogPostCarousel posts={posts} basePath={publicBlogBasePath} />
      </Section>

      <Section
        title="Newsletter"
        subtitle="Receba novas leituras quando a próxima curadoria for publicada."
      >
        <NewsletterCTA />
      </Section>
    </div>
  );
}
