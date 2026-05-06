"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Edit3, Eye, Plus, Search } from "lucide-react";
import type { BlogCategory, BlogPost } from "@/data/blog";
import { filterBlogPosts, formatBlogDate, getBlogCategoryStyle } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Typography } from "@/components/typography";
import { CMSStatusBadge } from "./cms-status-badge";

export function CMSPostTable({
  posts,
  categories,
}: {
  posts: BlogPost[];
  categories: BlogCategory[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filteredPosts = useMemo(
    () => filterBlogPosts(posts, { query, category }),
    [posts, query, category]
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
        <label className="relative block">
          <span className="sr-only">Buscar posts no CMS</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar posts por titulo, autor ou tag"
            className="h-12 rounded-[10px] bg-white pl-10"
          />
        </label>
        <Button type="button">
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
            variant={category === item.slug ? "default" : "secondary"}
            size="sm"
            onClick={() => setCategory(item.slug)}
          >
            {item.name}
          </Button>
        ))}
      </div>

      <div className="ds-card !p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Post</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Atualizado</TableHead>
              <TableHead className="text-right">Acoes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  <div className="max-w-[480px]">
                    <Typography as="p" variant="body" className="font-medium text-foreground">
                      {post.title}
                    </Typography>
                    <Typography as="p" variant="code" className="mt-1 text-muted-foreground">
                      /{post.slug}
                    </Typography>
                  </div>
                </TableCell>
                <TableCell>
                  <CMSStatusBadge status={post.status} />
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="min-h-8 px-2.5 py-0 text-[10px]"
                    style={getBlogCategoryStyle(post.categorySlug)}
                  >
                    {post.category}
                  </Badge>
                </TableCell>
                <TableCell>{formatBlogDate(post.updatedAt)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button render={<Link href={`/styleguide/paginas/blog/${post.slug}`} />} size="xs" variant="ghost">
                      <Eye data-icon="inline-start" className="size-3" />
                      Preview
                    </Button>
                    <Button type="button" size="xs" variant="ghost">
                      <Edit3 data-icon="inline-start" className="size-3" />
                      Editar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
