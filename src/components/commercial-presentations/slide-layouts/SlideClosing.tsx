import type { CommercialPresentation, CommercialSlide } from "@/data/commercial-presentations";
import { SlideBody, SlideEyebrow, SlideLogo, SlideShell, SlideTitle } from "./SlidePrimitives";

export function SlideClosing({
  presentation,
  slide,
}: {
  presentation: CommercialPresentation;
  slide: CommercialSlide;
}) {
  return (
    <SlideShell presentation={presentation} slide={slide} dark>
      <div className="flex h-full flex-col justify-between pb-[5%]">
        <div className="flex items-start justify-between">
          <SlideLogo dark size="large" />
          <SlideEyebrow accent={presentation.accent} dark>{slide.eyebrow}</SlideEyebrow>
        </div>
        <div className="grid grid-cols-[1fr_0.55fr] gap-[8%]">
          <div className="flex flex-col gap-[40px]">
            <SlideTitle size="lg" className="max-w-[15ch] text-[72px] leading-[0.84]">{slide.title}</SlideTitle>
            <SlideBody dark className="max-w-[50ch]">{slide.body}</SlideBody>
          </div>
          <div className="flex flex-col justify-end gap-[8%]">
            <p className="text-[28px] font-semibold leading-[1.08] text-white/80">
              {slide.quote}
            </p>
            <div className="h-[8px] w-full rounded-full" style={{ background: presentation.accent }} />
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
