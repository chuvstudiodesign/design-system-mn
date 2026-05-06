"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { BlogCategory, BlogPost, BlogTag } from "@/data/blog";
import { filterBlogPosts, getBlogCategoryStyle } from "@/lib/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/typography";
import { BlogPostCard } from "./blog-post-card";

export function BlogFilterExperience({
  posts,
  categories,
  tags,
}: {
  posts: BlogPost[];
  categories: BlogCategory[];
  tags: BlogTag[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [tag, setTag] = useState("all");

  const filteredPosts = useMemo(
    () => filterBlogPosts(posts, { query, category, tag }),
    [posts, query, category, tag]
  );

  const hasFilters = query !== "" || category !== "all" || tag !== "all";

  return (
    <div className="flex flex-col gap-6">
      <div className="ds-card !p-[30px] flex flex-col gap-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
          <label className="relative block">
            <span className="sr-only">Buscar artigos</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por título, tema, categoria ou tag"
              className="h-12 rounded-[10px] bg-white pl-10"
            />
          </label>
          <div className="flex items-center gap-3">
            <Typography as="p" variant="code" className="text-muted-foreground">
              {filteredPosts.length} resultados
            </Typography>
            {hasFilters && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                  setTag("all");
                }}
              >
                Limpar
                <X data-icon="inline-end" className="size-3.5" />
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
            Categorias
          </Typography>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant={category === "all" ? "default" : "secondary"}
              size="sm"
              onClick={() => setCategory("all")}
            >
              Todas
            </Button>
            {categories.map((item) => (
              <Button
                key={item.slug}
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setCategory(item.slug)}
                style={category === item.slug ? getBlogCategoryStyle(item.slug) : undefined}
              >
                {item.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
            Tags
          </Typography>
          <div className="flex flex-wrap gap-2">
            <Badge
              role="button"
              tabIndex={0}
              variant={tag === "all" ? "default" : "secondary"}
              className="min-h-8 cursor-pointer px-2.5 py-0 text-[10px]"
              onClick={() => setTag("all")}
              onKeyDown={(event) => event.key === "Enter" && setTag("all")}
            >
              Todas
            </Badge>
            {tags.map((item) => (
              <Badge
                key={item.slug}
                role="button"
                tabIndex={0}
                variant={tag === item.slug ? "default" : "secondary"}
                className="min-h-8 cursor-pointer px-2.5 py-0 text-[10px]"
                onClick={() => setTag(item.slug)}
                onKeyDown={(event) => event.key === "Enter" && setTag(item.slug)}
              >
                {item.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="ds-grid-3">
          {filteredPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="ds-card !p-[30px]">
          <Typography as="h3" variant="h3" className="text-foreground">
            Nenhum artigo encontrado
          </Typography>
          <Typography as="p" variant="body-sm" className="mt-2 text-muted-foreground">
            Ajuste a busca ou remova filtros para voltar a visualizar a biblioteca editorial.
          </Typography>
        </div>
      )}
    </div>
  );
}
