import type { CommercialPresentation, CommercialSlide } from "@/data/commercial-presentations";
import { SlideBody, SlideEyebrow, SlideShell, SlideTitle } from "./SlidePrimitives";

export function SlideCards({
  presentation,
  slide,
}: {
  presentation: CommercialPresentation;
  slide: CommercialSlide;
}) {
  return (
    <SlideShell presentation={presentation} slide={slide}>
      <div className="flex h-full flex-col gap-[5%] pb-[5%]">
        <div className="grid grid-cols-[0.76fr_1.24fr] gap-[6%]">
          <div className="flex flex-col gap-[6%]">
            <SlideEyebrow accent={presentation.accent}>{slide.eyebrow}</SlideEyebrow>
            <SlideTitle size="md">{slide.title}</SlideTitle>
            <SlideBody>{slide.body}</SlideBody>
          </div>
          <div className="grid grid-cols-2 gap-[3%]">
            {slide.cards?.map((card, index) => (
              <div
                key={card.title}
                className="relative overflow-hidden rounded-[10px] bg-white p-[7%] shadow-[var(--shadow-card)]"
              >
                <div
                  className="mb-[14%] flex h-[48px] w-[48px] items-center justify-center rounded-full font-mono text-[15px] font-bold text-black"
                  style={{ background: index === 0 ? presentation.accent : "#ECECEC" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-[6%] text-[23px] font-bold leading-[1.08] tracking-normal text-black">
                  {card.title}
                </h3>
                <p className="text-[15px] leading-[1.35] text-black/58">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
