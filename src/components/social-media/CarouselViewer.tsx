"use client";

import type { ReactNode } from "react";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const POST_W = 1080;
export const POST_H = 1350;

interface CarouselViewerProps {
  slides: ReactNode[];
  accentColor?: string;
}

export function CarouselViewer({
  slides,
  accentColor = "#5FC318",
}: CarouselViewerProps) {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const obs = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / POST_W);
    });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(slides.length - 1, c + 1));

  return (
    <div className="flex flex-col gap-3">
      {/* Canvas */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-[10px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.14)]"
        style={{ height: POST_H * scale }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: POST_W,
              height: POST_H,
              transform: `scale(${scale})`,
              transformOrigin: "0 0",
              transition: "opacity 0.35s ease",
              opacity: i === current ? 1 : 0,
              pointerEvents: i === current ? "auto" : "none",
            }}
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-1">
        <button
          onClick={prev}
          disabled={current === 0}
          aria-label="Slide anterior"
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full border border-[#D4D4D4] bg-white text-sm transition-all",
            current === 0
              ? "opacity-30 cursor-not-allowed"
              : "hover:border-[#5FC318] hover:text-[#5FC318]"
          )}
        >
          <ChevronLeft className="size-4" strokeWidth={1.8} />
        </button>

        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Ir para slide ${i + 1}`}
              style={{
                width: i === current ? 24 : 6,
                height: 6,
                borderRadius: 3,
                background: i === current ? accentColor : "#D4D4D4",
                transition: "width 0.3s ease, background 0.2s ease",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={current === slides.length - 1}
          aria-label="Próximo slide"
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full border border-[#D4D4D4] bg-white text-sm transition-all",
            current === slides.length - 1
              ? "opacity-30 cursor-not-allowed"
              : "hover:border-[#5FC318] hover:text-[#5FC318]"
          )}
        >
          <ChevronRight className="size-4" strokeWidth={1.8} />
        </button>
      </div>

      {/* Counter */}
      <p className="text-center text-xs text-[#AAA]">
        {current + 1} / {slides.length}
      </p>
    </div>
  );
}
