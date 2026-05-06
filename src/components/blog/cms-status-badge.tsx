import type { BlogPostStatus } from "@/data/blog";
import { Badge } from "@/components/ui/badge";

const statusLabel: Record<BlogPostStatus, string> = {
  published: "Publicado",
  draft: "Rascunho",
  scheduled: "Agendado",
};

const statusVariant: Record<BlogPostStatus, "default" | "secondary" | "outline"> = {
  published: "default",
  draft: "secondary",
  scheduled: "outline",
};

export function CMSStatusBadge({ status }: { status: BlogPostStatus }) {
  return (
    <Badge variant={statusVariant[status]} className="min-h-8 px-2.5 py-0 text-[10px] font-semibold uppercase tracking-wider">
      {statusLabel[status]}
    </Badge>
  );
}
