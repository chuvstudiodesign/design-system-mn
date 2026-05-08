import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SlideNavigation({
  currentIndex,
  total,
  onPrevious,
  onNext,
}: {
  currentIndex: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="rounded-full bg-[#ECECEC] px-4 py-2 font-mono text-[12px] font-bold text-foreground">
        Slide {currentIndex + 1} de {total}
      </div>
      <div className="flex items-center gap-2">
        <Button type="button" variant="secondary" size="sm" onClick={onPrevious}>
          <ArrowLeft data-icon="inline-start" className="size-4" />
          Anterior
        </Button>
        <Button type="button" size="sm" onClick={onNext}>
          Próximo
          <ArrowRight data-icon="inline-end" className="size-4" />
        </Button>
      </div>
    </div>
  );
}
