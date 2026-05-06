"use client";

import { useEffect, useRef, useState } from "react";
import type { CommercialPresentation, CommercialSlide } from "@/data/commercial-presentations";
import { PresentationSlide } from "./PresentationSlide";

export function SlideViewport({
  presentation,
  slide,
}: {
  presentation: CommercialPresentation;
  slide: CommercialSlide;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      const width = entry?.contentRect.width ?? 1600;
      setScale(width / 1600);
    });

    resizeObserver.observe(viewport);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={viewportRef}
      className="relative aspect-video w-full overflow-hidden bg-[#D4D4D4] shadow-[var(--shadow-card)]"
    >
      <div
        className="absolute left-0 top-0 h-[900px] w-[1600px] origin-top-left overflow-hidden"
        style={{ transform: `scale(${scale})` }}
      >
        <PresentationSlide presentation={presentation} slide={slide} />
      </div>
    </div>
  );
}
