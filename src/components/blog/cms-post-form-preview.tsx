import type { BlogPost } from "@/data/blog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Typography } from "@/components/typography";
import { CMSStatusBadge } from "./cms-status-badge";

export function CMSPostFormPreview({ post }: { post: BlogPost }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <div className="ds-card !p-[30px] flex flex-col gap-5">
        <div>
          <Typography as="p" variant="label" className="mb-2 normal-case tracking-normal text-foreground">
            Título
          </Typography>
          <Input value={post.title} readOnly className="h-12 rounded-[10px] bg-white" />
        </div>
        <div>
          <Typography as="p" variant="label" className="mb-2 normal-case tracking-normal text-foreground">
            Subtítulo
          </Typography>
          <Textarea value={post.subtitle} readOnly className="min-h-24 rounded-[10px] bg-white" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Typography as="p" variant="label" className="mb-2 normal-case tracking-normal text-foreground">
              Slug
            </Typography>
            <Input value={post.slug} readOnly className="h-12 rounded-[10px] bg-white" />
          </div>
          <div>
            <Typography as="p" variant="label" className="mb-2 normal-case tracking-normal text-foreground">
              Categoria
            </Typography>
            <Input value={post.category} readOnly className="h-12 rounded-[10px] bg-white" />
          </div>
        </div>
        <div>
          <Typography as="p" variant="label" className="mb-2 normal-case tracking-normal text-foreground">
            SEO description
          </Typography>
          <Textarea value={post.seoDescription} readOnly className="min-h-24 rounded-[10px] bg-white" />
        </div>
      </div>

      <aside className="ds-card !p-[30px] flex flex-col gap-5">
        <div>
          <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
            Publicação
          </Typography>
          <div className="mt-3 flex flex-wrap gap-2">
            <CMSStatusBadge status={post.status} />
            {post.featured && (
              <Badge variant="outline" className="min-h-8 px-2.5 py-0 text-[10px]">
                Destaque
              </Badge>
            )}
          </div>
        </div>
        <div>
          <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
            Autor
          </Typography>
          <Typography as="p" variant="body-sm" className="mt-2 text-muted-foreground">
            {post.author} · {post.authorRole}
          </Typography>
        </div>
        <div>
          <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
            Tags
          </Typography>
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="min-h-8 px-2.5 py-0 text-[10px]">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
