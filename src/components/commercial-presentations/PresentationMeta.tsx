import type { CommercialPresentation } from "@/data/commercial-presentations";
import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/typography";

export function PresentationMeta({
  presentation,
}: {
  presentation: CommercialPresentation;
}) {
  return (
    <aside className="flex h-full flex-col gap-5 rounded-[10px] bg-white p-[30px] shadow-[var(--shadow-card)]">
      <div>
        <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: presentation.accent }}>
          Modelo selecionado
        </p>
        <Typography as="h2" variant="h2" className="text-foreground">
          {presentation.title}
        </Typography>
        <Typography as="p" variant="body-sm" className="mt-3 text-muted-foreground">
          {presentation.description}
        </Typography>
      </div>

      <div className="grid gap-4">
        {[
          ["Tema", presentation.theme],
          ["Estilo visual", presentation.style],
          ["Uso recomendado", presentation.useCase],
          ["Quantidade", `${presentation.slides.length} slides em 16:9`],
        ].map(([label, value]) => (
          <div key={label} className="border-t border-[#ECECEC] pt-4">
            <Typography as="p" variant="caption" className="mb-2 text-muted-foreground">
              {label}
            </Typography>
            <Typography as="p" variant="body-sm" className="font-medium text-foreground">
              {value}
            </Typography>
          </div>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap gap-2">
        {presentation.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="rounded-full">
            {tag}
          </Badge>
        ))}
      </div>
    </aside>
  );
}
