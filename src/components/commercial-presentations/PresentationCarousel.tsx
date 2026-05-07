"use client";

import { useState } from "react";
import type { CommercialPresentation } from "@/data/commercial-presentations";
import { PresentationMeta } from "./PresentationMeta";
import { SlideNavigation } from "./SlideNavigation";
import { SlideThumbnailRail } from "./SlideThumbnailRail";
import { SlideViewport } from "./SlideViewport";
import { cn } from "@/lib/utils";

export function PresentationCarousel({
  presentation,
}: {
  presentation: CommercialPresentation;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [metaOpen, setMetaOpen] = useState(true);
  const currentSlide = presentation.slides[currentIndex] ?? presentation.slides[0];

  function previousSlide() {
    setCurrentIndex((current) =>
      current === 0 ? presentation.slides.length - 1 : current - 1
    );
  }

  function nextSlide() {
    setCurrentIndex((current) =>
      current === presentation.slides.length - 1 ? 0 : current + 1
    );
  }

  return (
    <div
      className={cn(
        "relative grid gap-6 transition-[grid-template-columns] duration-300 ease-in-out xl:items-stretch",
        metaOpen
          ? "xl:grid-cols-[minmax(0,1fr)_360px]"
          : "xl:grid-cols-[minmax(0,1fr)_0px]"
      )}
    >
      <div className="flex min-w-0 flex-col gap-4">
        <SlideViewport presentation={presentation} slide={currentSlide} />
        <SlideNavigation
          currentIndex={currentIndex}
          total={presentation.slides.length}
          onPrevious={previousSlide}
          onNext={nextSlide}
        />
        <SlideThumbnailRail
          presentation={presentation}
          currentIndex={currentIndex}
          onSelect={setCurrentIndex}
        />
      </div>
      <button
        type="button"
        onClick={() => setMetaOpen((open) => !open)}
        aria-label={metaOpen ? "Esconder detalhes do modelo" : "Mostrar detalhes do modelo"}
        aria-expanded={metaOpen}
        className={cn(
          "absolute top-1/2 z-10 hidden h-14 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-black/[0.08] bg-[#ececec] text-black shadow-sm transition-[right,opacity] duration-300 ease-in-out xl:flex",
          metaOpen ? "right-[348px]" : "right-0"
        )}
      >
        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true">
          <path
            d={metaOpen ? "M1.5 1L6 6L1.5 11" : "M5.5 1L1 6L5.5 11"}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        className={cn(
          "min-w-0 overflow-hidden transition-[opacity,transform] duration-300 ease-in-out",
          metaOpen
            ? "translate-x-0 opacity-100"
            : "pointer-events-none translate-x-6 opacity-0"
        )}
      >
        <PresentationMeta presentation={presentation} />
      </div>
    </div>
  );
}
