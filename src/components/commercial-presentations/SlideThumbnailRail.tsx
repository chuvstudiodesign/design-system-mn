import type { CommercialPresentation } from "@/data/commercial-presentations";
import { cn } from "@/lib/utils";

export function SlideThumbnailRail({
  presentation,
  currentIndex,
  onSelect,
}: {
  presentation: CommercialPresentation;
  currentIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1" aria-label="Slides da apresentacao">
      {presentation.slides.map((slide, index) => {
        const active = index === currentIndex;

        return (
          <button
            key={slide.id}
            type="button"
            onClick={() => onSelect(index)}
            className={cn(
              "group w-[132px] shrink-0 rounded-[10px] border bg-white p-2 text-left transition",
              active ? "border-black shadow-[var(--shadow-card)]" : "border-white hover:border-black/20"
            )}
            aria-current={active ? "true" : undefined}
          >
            <div
              className="aspect-video overflow-hidden rounded-[8px]"
              style={{
                background:
                  slide.visual === "dark" || slide.visual === "quote" || slide.type === "closing"
                    ? `linear-gradient(135deg, ${presentation.darkAccent}, #0C1C16)`
                    : "linear-gradient(135deg, #FFFFFF, #ECECEC)",
              }}
            >
              <div className="flex h-full flex-col justify-between p-2">
                <span className="font-mono text-[9px] font-black" style={{ color: presentation.accent }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={cn("line-clamp-2 text-[9px] font-bold leading-tight", slide.visual === "dark" || slide.visual === "quote" || slide.type === "closing" ? "text-white" : "text-black")}>
                  {slide.title}
                </span>
              </div>
            </div>
            <p className="mt-2 line-clamp-1 text-[11px] font-medium text-muted-foreground">
              {slide.type}
            </p>
          </button>
        );
      })}
    </div>
  );
}
