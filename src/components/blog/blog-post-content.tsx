import type { BlogContentBlock, BlogPost } from "@/data/blog";
import { getBlogCategoryStyle } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/typography";

function BlockRenderer({ block }: { block: BlogContentBlock }) {
  if (block.type === "heading") {
    return (
      <Typography id={block.id} as="h2" variant="h2" className="scroll-mt-8 pt-4 text-foreground">
        {block.text}
      </Typography>
    );
  }

  if (block.type === "paragraph") {
    return (
      <Typography as="p" variant="body-lg" className="text-muted-foreground">
        {block.text}
      </Typography>
    );
  }

  if (block.type === "quote") {
    return (
      <blockquote className="border-l-4 border-primary bg-white p-[30px]">
        <Typography as="p" variant="h3" className="text-foreground">
          {block.text}
        </Typography>
        {block.cite && (
          <Typography as="cite" variant="caption" className="mt-4 block text-muted-foreground">
            {block.cite}
          </Typography>
        )}
      </blockquote>
    );
  }

  if (block.type === "list") {
    return (
      <div className="ds-card !p-[30px]">
        {block.title && (
          <Typography as="p" variant="label" className="mb-4 normal-case tracking-normal text-foreground">
            {block.title}
          </Typography>
        )}
        <ul className="flex flex-col gap-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
              <Typography as="span" variant="body" className="text-muted-foreground">
                {item}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (block.type === "metric") {
    return (
      <div className="ds-card !p-[30px] grid gap-3 sm:grid-cols-[160px_1fr] sm:items-center">
        <div>
          <Typography as="p" variant="caption" className="text-primary">
            {block.label}
          </Typography>
          <Typography as="p" variant="display" className="text-foreground">
            {block.value}
          </Typography>
        </div>
        <Typography as="p" variant="body" className="text-muted-foreground">
          {block.description}
        </Typography>
      </div>
    );
  }

  return (
    <div className="rounded-[10px] border border-white bg-[#D4D4D4] p-[30px]">
      <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
        {block.title}
      </Typography>
      <Typography as="p" variant="body" className="mt-2 text-muted-foreground">
        {block.text}
      </Typography>
    </div>
  );
}

export function BlogPostContent({ post }: { post: BlogPost }) {
  const categoryStyle = getBlogCategoryStyle(post.categorySlug);

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_280px]">
      <article className="flex max-w-4xl flex-col gap-6">
        {post.content.map((block, index) => (
          <BlockRenderer key={`${block.type}-${index}`} block={block} />
        ))}
        <div className="flex flex-wrap gap-2 border-t border-white pt-6">
          <Badge
            className="min-h-8 px-2.5 py-0 text-[10px]"
            style={categoryStyle}
          >
            {post.category}
          </Badge>
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="min-h-8 px-2.5 py-0 text-[10px]">
              {tag}
            </Badge>
          ))}
        </div>
      </article>

      <aside className="h-fit rounded-[10px] bg-white p-[30px] shadow-[var(--shadow-card)]">
        <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
          Indice
        </Typography>
        <nav className="mt-4 flex flex-col gap-3" aria-label="Indice do artigo">
          {post.tableOfContents.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="text-[13px] leading-relaxed text-muted-foreground hover:text-primary">
              {item.title}
            </a>
          ))}
        </nav>
      </aside>
    </div>
  );
}
