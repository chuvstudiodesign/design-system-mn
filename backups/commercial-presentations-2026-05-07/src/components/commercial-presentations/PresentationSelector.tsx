import type { CommercialPresentation } from "@/data/commercial-presentations";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/typography";

export function PresentationSelector({
  presentations,
  selectedSlug,
  onSelect,
}: {
  presentations: CommercialPresentation[];
  selectedSlug: string;
  onSelect: (slug: string) => void;
}) {
  return (
    <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-5">
      {presentations.map((presentation, index) => {
        const active = presentation.slug === selectedSlug;

        return (
          <button
            key={presentation.slug}
            type="button"
            onClick={() => onSelect(presentation.slug)}
            className={cn(
              "group flex min-h-[168px] flex-col justify-between rounded-[10px] border bg-white p-5 text-left shadow-[var(--shadow-card)] transition",
              active ? "border-black" : "border-white hover:border-black/20"
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-[11px] font-black" style={{ color: presentation.accent }}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className="h-3 w-10 rounded-full"
                style={{ background: presentation.accent }}
              />
            </div>
            <div>
              <Typography as="h3" variant="h3" className="line-clamp-2 text-foreground">
                {presentation.title}
              </Typography>
              <Typography as="p" variant="body-sm" className="mt-2 line-clamp-2 text-muted-foreground">
                {presentation.theme}
              </Typography>
            </div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-black/45">
              {presentation.slides.length} slides
            </p>
          </button>
        );
      })}
    </div>
  );
}
