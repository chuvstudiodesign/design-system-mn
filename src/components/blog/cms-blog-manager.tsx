"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, Edit3, Eye, Plus, Save, Search, Trash2 } from "lucide-react";
import type { BlogAuthor, BlogCategory, BlogPost, BlogPostStatus, BlogTag } from "@/data/blog";
import { filterBlogPosts, formatBlogDate, getBlogCategoryStyle } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Typography } from "@/components/typography";
import { CMSStatusBadge } from "./cms-status-badge";

function slugify(value: string) {
  return value
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function categoryFields(categories: BlogCategory[], slug: string) {
  const category = categories.find((item) => item.slug === slug) ?? categories[0];

  return {
    category: category.name,
    categorySlug: category.slug,
  };
}

function authorFields(authors: BlogAuthor[], id: string) {
  const author = authors.find((item) => item.id === id) ?? authors[0];

  return {
    author: author.name,
    authorRole: author.role,
    authorAvatar: author.avatar,
    authorId: author.id,
  };
}

function createDraftPost({
  base,
  categories,
  authors,
}: {
  base: BlogPost;
  categories: BlogCategory[];
  authors: BlogAuthor[];
}): BlogPost {
  const today = new Date().toISOString().slice(0, 10);
  const title = "Novo artigo em rascunho";
  const slug = `novo-artigo-${Date.now()}`;

  return {
    ...base,
    id: `local-${Date.now()}`,
    slug,
    title,
    subtitle: "Subtítulo do novo artigo.",
    excerpt: "Resumo curto usado nos cards e nos resultados de busca.",
    publishedAt: today,
    updatedAt: today,
    readingTime: 4,
    status: "draft",
    featured: false,
    seoTitle: title,
    seoDescription: "Descrição SEO do novo artigo.",
    seoKeywords: ["blog", "negócios"],
    tags: ["Estratégia"],
    tagSlugs: ["estrategia"],
    relatedPosts: [],
    tableOfContents: [{ id: "introducao", title: "Introdução" }],
    content: [
      { type: "paragraph", text: "Escreva aqui a abertura do artigo." },
      { type: "heading", id: "introducao", text: "Introdução" },
      { type: "paragraph", text: "Desenvolva a ideia principal com contexto, exemplos e implicações para negócios." },
    ],
    canonicalUrl: `/styleguide/paginas/blog/${slug}`,
    ...categoryFields(categories, categories[0].slug),
    ...authorFields(authors, authors[0].id),
  };
}

function SelectField({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <Typography as="span" variant="label" className="mb-2 block normal-case tracking-normal text-foreground">
        {label}
      </Typography>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-[10px] border border-input bg-white px-3 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        {children}
      </select>
    </label>
  );
}

export function CMSBlogManager({
  initialPosts,
  categories,
  tags,
  authors,
}: {
  initialPosts: BlogPost[];
  categories: BlogCategory[];
  tags: BlogTag[];
  authors: BlogAuthor[];
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [selectedId, setSelectedId] = useState(initialPosts[0]?.id ?? "");
  const [draft, setDraft] = useState<BlogPost>(initialPosts[0]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [savedNotice, setSavedNotice] = useState("");

  const filteredPosts = useMemo(
    () => filterBlogPosts(posts, { query, category }),
    [posts, query, category]
  );

  function selectPost(post: BlogPost) {
    setSelectedId(post.id);
    setDraft(post);
    setSavedNotice("");
  }

  function updateDraft(patch: Partial<BlogPost>) {
    setDraft((current) => ({ ...current, ...patch }));
    setSavedNotice("");
  }

  function updateTitle(title: string) {
    const slug = slugify(title);
    updateDraft({
      title,
      slug,
      seoTitle: title,
      canonicalUrl: `/styleguide/paginas/blog/${slug}`,
    });
  }

  function updateCategory(slug: string) {
    updateDraft(categoryFields(categories, slug));
  }

  function updateAuthor(id: string) {
    updateDraft(authorFields(authors, id));
  }

  function updateTags(value: string) {
    const names = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    const slugs = names.map(slugify);

    updateDraft({
      tags: names,
      tagSlugs: slugs,
      seoKeywords: names,
    });
  }

  function createPost() {
    const newPost = createDraftPost({ base: posts[0], categories, authors });
    setPosts((current) => [newPost, ...current]);
    setSelectedId(newPost.id);
    setDraft(newPost);
    setSavedNotice("Novo rascunho criado localmente.");
  }

  function savePost() {
    const updatedPost = {
      ...draft,
      updatedAt: new Date().toISOString().slice(0, 10),
      tableOfContents: draft.content
        .filter((block) => block.type === "heading")
        .map((block) => ({ id: block.id, title: block.text })),
    };

    setPosts((current) =>
      current.map((post) => (post.id === selectedId ? updatedPost : post))
    );
    setSelectedId(updatedPost.id);
    setDraft(updatedPost);
    setSavedNotice("Alterações salvas em memória. A persistência real entra no adapter futuro.");
  }

  function deletePost(postId: string) {
    setPosts((current) => {
      const nextPosts = current.filter((post) => post.id !== postId);

      if (postId === selectedId) {
        const nextSelectedPost = nextPosts[0];

        if (nextSelectedPost) {
          setSelectedId(nextSelectedPost.id);
          setDraft(nextSelectedPost);
          setSavedNotice("Post deletado localmente.");
        }
      } else {
        setSavedNotice("Post deletado localmente.");
      }

      return nextPosts;
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
          <label className="relative block">
            <span className="sr-only">Buscar posts no CMS</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar posts por título, autor ou tag"
              className="h-12 rounded-[10px] bg-white pl-10"
            />
          </label>
          <Button type="button" onClick={createPost}>
            <Plus data-icon="inline-start" className="size-4" />
            Novo post
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button type="button" variant={category === "all" ? "default" : "secondary"} size="sm" onClick={() => setCategory("all")}>
            Todas
          </Button>
          {categories.map((item) => (
            <Button
              key={item.slug}
              type="button"
              variant="secondary"
              size="sm"
              style={category === item.slug ? getBlogCategoryStyle(item.slug) : undefined}
              onClick={() => setCategory(item.slug)}
            >
              <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: item.colorHex }} />
              {item.name}
            </Button>
          ))}
        </div>

        <div className="hidden px-[30px] lg:grid lg:grid-cols-[minmax(280px,1fr)_120px_160px_120px_220px] lg:gap-4">
          {["Post", "Status", "Categoria", "Atualizado", "Ações"].map((label) => (
            <Typography
              key={label}
              as="p"
              variant="caption"
              className={label === "Ações" ? "text-right text-muted-foreground" : "text-muted-foreground"}
            >
              {label}
            </Typography>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className={`ds-card !p-[30px] grid gap-5 lg:grid-cols-[minmax(280px,1fr)_120px_160px_120px_220px] lg:items-center lg:gap-4 ${post.id === selectedId ? "ring-2 ring-primary/40" : ""}`}
            >
              <div className="min-w-0">
                <Typography as="p" variant="caption" className="mb-2 normal-case tracking-normal text-muted-foreground lg:hidden">
                  Post
                </Typography>
                <Typography as="p" variant="body" className="font-medium text-foreground">
                  {post.title}
                </Typography>
                <Typography as="p" variant="code" className="mt-1 break-all text-muted-foreground">
                  /{post.slug}
                </Typography>
              </div>

              <div>
                <Typography as="p" variant="caption" className="mb-2 normal-case tracking-normal text-muted-foreground lg:hidden">
                  Status
                </Typography>
                <CMSStatusBadge status={post.status} />
              </div>

              <div>
                <Typography as="p" variant="caption" className="mb-2 normal-case tracking-normal text-muted-foreground lg:hidden">
                  Categoria
                </Typography>
                <Badge
                  variant="secondary"
                  className="min-h-8 px-2.5 py-0 text-[10px]"
                  style={getBlogCategoryStyle(post.categorySlug)}
                >
                  {post.category}
                </Badge>
              </div>

              <div>
                <Typography as="p" variant="caption" className="mb-2 normal-case tracking-normal text-muted-foreground lg:hidden">
                  Atualizado
                </Typography>
                <Typography as="p" variant="body-sm" className="text-foreground">
                  {formatBlogDate(post.updatedAt)}
                </Typography>
              </div>

              <div className="flex flex-wrap gap-2 lg:justify-end">
                <Button nativeButton={false} render={<Link href={`/styleguide/paginas/blog/${post.slug}`} />} size="xs" variant="ghost">
                  <Eye data-icon="inline-start" className="size-3" />
                  Preview
                </Button>
                <Button type="button" size="xs" variant="ghost" onClick={() => selectPost(post)}>
                  <Edit3 data-icon="inline-start" className="size-3" />
                  Editar
                </Button>
                <Button type="button" size="xs" variant="destructive" onClick={() => deletePost(post.id)}>
                  <Trash2 data-icon="inline-start" className="size-3" />
                  Deletar
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="ds-card !p-[30px] flex flex-col gap-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <Typography as="p" variant="caption" className="font-bold text-primary">
                Editor local
              </Typography>
              <Typography as="h3" variant="h3" className="mt-2 text-foreground">
                {draft.title}
              </Typography>
            </div>
            <Button type="button" onClick={savePost}>
              <Save data-icon="inline-start" className="size-4" />
              Salvar
            </Button>
          </div>

          {savedNotice && (
            <div className="flex items-center gap-2 rounded-[10px] bg-primary/10 p-3 text-sm text-foreground">
              <Check className="size-4 text-primary" />
              {savedNotice}
            </div>
          )}

          <label className="block">
            <Typography as="span" variant="label" className="mb-2 block normal-case tracking-normal text-foreground">
              Título
            </Typography>
            <Input value={draft.title} onChange={(event) => updateTitle(event.target.value)} className="h-12 rounded-[10px] bg-white" />
          </label>

          <label className="block">
            <Typography as="span" variant="label" className="mb-2 block normal-case tracking-normal text-foreground">
              Subtítulo
            </Typography>
            <Textarea value={draft.subtitle} onChange={(event) => updateDraft({ subtitle: event.target.value })} className="min-h-24 rounded-[10px] bg-white" />
          </label>

          <label className="block">
            <Typography as="span" variant="label" className="mb-2 block normal-case tracking-normal text-foreground">
              Excerpt
            </Typography>
            <Textarea value={draft.excerpt} onChange={(event) => updateDraft({ excerpt: event.target.value })} className="min-h-20 rounded-[10px] bg-white" />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <Typography as="span" variant="label" className="mb-2 block normal-case tracking-normal text-foreground">
                Slug
              </Typography>
              <Input value={draft.slug} onChange={(event) => updateDraft({ slug: slugify(event.target.value), canonicalUrl: `/styleguide/paginas/blog/${slugify(event.target.value)}` })} className="h-12 rounded-[10px] bg-white" />
            </label>
            <SelectField label="Categoria" value={draft.categorySlug} onChange={updateCategory}>
              {categories.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </SelectField>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <SelectField label="Autor" value={draft.authorId} onChange={updateAuthor}>
              {authors.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </SelectField>
            <SelectField label="Status" value={draft.status} onChange={(value) => updateDraft({ status: value as BlogPostStatus })}>
              <option value="published">Publicado</option>
              <option value="draft">Rascunho</option>
              <option value="scheduled">Agendado</option>
            </SelectField>
          </div>

          <label className="block">
            <Typography as="span" variant="label" className="mb-2 block normal-case tracking-normal text-foreground">
              Tags
            </Typography>
            <Input value={draft.tags.join(", ")} onChange={(event) => updateTags(event.target.value)} className="h-12 rounded-[10px] bg-white" />
          </label>

          <label className="block">
            <Typography as="span" variant="label" className="mb-2 block normal-case tracking-normal text-foreground">
              SEO description
            </Typography>
            <Textarea value={draft.seoDescription} onChange={(event) => updateDraft({ seoDescription: event.target.value })} className="min-h-24 rounded-[10px] bg-white" />
          </label>
        </div>

        <aside className="ds-card !p-[30px] flex h-fit flex-col gap-5">
          <div>
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Publicação
            </Typography>
            <div className="mt-3 flex flex-wrap gap-2">
              <CMSStatusBadge status={draft.status} />
              {draft.featured && (
                <Badge variant="outline" className="min-h-8 px-2.5 py-0 text-[10px]">
                  Destaque
                </Badge>
              )}
            </div>
          </div>

          <label className="flex items-center gap-3 rounded-[10px] border border-white bg-[#ECECEC] p-3">
            <input
              type="checkbox"
              checked={draft.featured}
              onChange={(event) => updateDraft({ featured: event.target.checked })}
              className="size-4 accent-[var(--primary)]"
            />
            <Typography as="span" variant="body-sm" className="text-foreground">
              Marcar como destaque
            </Typography>
          </label>

          <div>
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Autor
            </Typography>
            <Typography as="p" variant="body-sm" className="mt-2 text-muted-foreground">
              {draft.author} · {draft.authorRole}
            </Typography>
          </div>

          <div>
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Tags disponíveis
            </Typography>
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag.slug} variant={draft.tagSlugs.includes(tag.slug) ? "default" : "secondary"} className="min-h-8 px-2.5 py-0 text-[10px]">
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Persistência
            </Typography>
            <Typography as="p" variant="body-sm" className="mt-2 text-muted-foreground">
              Este editor salva em memória no navegador. O contrato já está pronto para trocar por Server Actions ou CMS real.
            </Typography>
          </div>
        </aside>
      </div>
    </div>
  );
}
