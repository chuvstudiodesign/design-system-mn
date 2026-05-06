import Link from "next/link";
import { ArrowLeft, Calendar, Clock, UserRound } from "lucide-react";
import type { BlogPost } from "@/data/blog";
import { formatBlogDate, formatReadingTime, getBlogCategoryStyle } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/typography";
import { BlogCover } from "./blog-cover";

export function BlogPostHeader({ post }: { post: BlogPost }) {
  const categoryStyle = getBlogCategoryStyle(post.categorySlug);

  return (
    <header className="flex flex-col gap-6">
      <div>
        <Button render={<Link href="/styleguide/paginas/blog" />} variant="ghost" size="sm" className="-ml-3 font-bold text-primary">
          <ArrowLeft data-icon="inline-start" className="size-3.5" />
          Voltar para Blog
        </Button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="flex flex-col justify-between gap-6">
          <div className="flex flex-wrap gap-2">
            <Badge
              className="min-h-8 px-2.5 py-0 text-[10px] font-semibold uppercase tracking-wider"
              style={categoryStyle}
            >
              {post.category}
            </Badge>
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="min-h-8 px-2.5 py-0 text-[10px]">
                {tag}
              </Badge>
            ))}
          </div>

          <div>
            <Typography as="h1" variant="display" className="max-w-4xl text-foreground">
              {post.title}
            </Typography>
            <Typography as="p" variant="body-lg" className="mt-4 max-w-3xl text-muted-foreground">
              {post.subtitle}
            </Typography>
          </div>

          <div className="grid gap-3 text-[13px] text-muted-foreground sm:grid-cols-3">
            <span className="inline-flex items-center gap-2">
              <UserRound className="size-4 text-primary" />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar className="size-4 text-primary" />
              {formatBlogDate(post.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="size-4 text-primary" />
              {formatReadingTime(post.readingTime)}
            </span>
          </div>
        </div>
        <BlogCover src={post.coverImage} tone={post.coverTone} label={post.coverAlt} className="min-h-[360px]" />
      </div>
    </header>
  );
}
