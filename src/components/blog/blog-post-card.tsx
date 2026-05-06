import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogPost } from "@/data/blog";
import { formatBlogDate, formatReadingTime, getBlogCategoryStyle } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/typography";
import { BlogCover } from "./blog-cover";

const blogBasePath = "/styleguide/paginas/blog";

export function BlogPostCard({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  const categoryStyle = getBlogCategoryStyle(post.categorySlug);

  return (
    <article className="ds-card !p-[30px] flex h-full flex-col gap-5">
      <Link href={`${blogBasePath}/${post.slug}`} aria-label={`Ler ${post.title}`}>
        <BlogCover
          src={post.coverImage}
          tone={post.coverTone}
          label={post.coverAlt}
          className={featured ? "min-h-[320px]" : "min-h-[210px]"}
        />
      </Link>

      <div className="flex flex-wrap items-center gap-2">
        <Badge
          className="min-h-8 px-2.5 py-0 text-[10px] font-semibold uppercase tracking-wider"
          style={categoryStyle}
        >
          {post.category}
        </Badge>
        {post.featured && (
          <Badge variant="outline" className="min-h-8 px-2.5 py-0 text-[10px] font-semibold uppercase tracking-wider">
            Destaque
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <Link href={`${blogBasePath}/${post.slug}`} className="group">
          <Typography
            as="h3"
            variant={featured ? "h2" : "h3"}
            className="text-foreground transition-colors group-hover:text-primary"
          >
            {post.title}
          </Typography>
        </Link>
        <Typography as="p" variant={featured ? "body" : "body-sm"} className="text-muted-foreground">
          {post.excerpt}
        </Typography>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#ECECEC] pt-4">
        <div className="flex flex-wrap items-center gap-3 text-[12px] text-muted-foreground">
          <span>{formatBlogDate(post.publishedAt)}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3" />
            {formatReadingTime(post.readingTime)}
          </span>
        </div>
        <Button render={<Link href={`${blogBasePath}/${post.slug}`} />} variant="ghost" size="sm" className="-mr-3 text-primary">
          Ler artigo
          <ArrowRight data-icon="inline-end" className="size-3.5" />
        </Button>
      </div>
    </article>
  );
}
