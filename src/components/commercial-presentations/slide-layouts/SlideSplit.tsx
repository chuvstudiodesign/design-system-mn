import type { CommercialPresentation, CommercialSlide } from "@/data/commercial-presentations";
import { AbstractVisual, SlideBody, SlideEyebrow, SlideShell, SlideTitle } from "./SlidePrimitives";

export function SlideSplit({
  presentation,
  slide,
}: {
  presentation: CommercialPresentation;
  slide: CommercialSlide;
}) {
  return (
    <SlideShell presentation={presentation} slide={slide}>
      <div className="grid h-full grid-cols-[0.92fr_1.08fr] gap-[7%] pb-[5%]">
        <div className="flex flex-col justify-between">
          <SlideEyebrow accent={presentation.accent}>{slide.eyebrow}</SlideEyebrow>
          <div className="flex flex-col gap-[39px]">
            <SlideTitle size="md" className="max-w-[16ch]">{slide.title}</SlideTitle>
            <SlideBody>{slide.body}</SlideBody>
          </div>
        </div>
        <div className="grid min-h-0 grid-rows-[1fr_auto] gap-[5%]">
          <AbstractVisual
            accent={presentation.accent}
            variant={slide.visual === "map" ? "orbital" : "grid"}
            label={slide.imageDirection}
          />
          <div className="grid grid-cols-3 gap-[3%]">
            {slide.bullets?.slice(0, 3).map((bullet, index) => (
              <div key={bullet} className="rounded-[10px] bg-white p-[8%] shadow-[var(--shadow-card)]">
                <p className="mb-[8%] font-mono text-[15px] font-bold" style={{ color: presentation.accent }}>
                  0{index + 1}
                </p>
                <p className="text-[16px] font-semibold leading-[1.2] text-black">
                  {bullet}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
