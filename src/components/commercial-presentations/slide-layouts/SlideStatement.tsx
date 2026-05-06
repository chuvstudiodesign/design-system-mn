import type { CommercialPresentation, CommercialSlide } from "@/data/commercial-presentations";
import { SlideBody, SlideEyebrow, SlideShell, SlideTitle } from "./SlidePrimitives";

export function SlideStatement({
  presentation,
  slide,
}: {
  presentation: CommercialPresentation;
  slide: CommercialSlide;
}) {
  const dark = slide.visual === "quote" || slide.visual === "dark";
  const compactStatement =
    presentation.slug === "futuro-negocios-brasil" && slide.type === "principle";

  return (
    <SlideShell presentation={presentation} slide={slide} dark={dark}>
      <div className="flex h-full flex-col justify-center gap-[4%] pb-[5%]">
        <SlideEyebrow accent={presentation.accent} dark={dark}>{slide.eyebrow}</SlideEyebrow>
        <SlideTitle
          size="lg"
          className={
            compactStatement
              ? "max-w-[23ch] text-[59px] leading-[0.84]"
              : "max-w-[22ch] text-[68px] leading-[0.9]"
          }
        >
          {slide.quote ?? slide.title}
        </SlideTitle>
        <div className="h-[6px] w-[18%] rounded-full" style={{ background: presentation.accent }} />
        <SlideBody dark={dark} className="max-w-[54ch]">{slide.body}</SlideBody>
      </div>
    </SlideShell>
  );
}
