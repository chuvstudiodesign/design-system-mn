import type { CommercialPresentation, CommercialSlide } from "@/data/commercial-presentations";
import { SlideBody, SlideEyebrow, SlideShell, SlideTitle } from "./SlidePrimitives";

export function SlideFramework({
  presentation,
  slide,
}: {
  presentation: CommercialPresentation;
  slide: CommercialSlide;
}) {
  const isFirstDeckFramework =
    presentation.slug === "futuro-negocios-brasil" && slide.type === "framework";

  return (
    <SlideShell presentation={presentation} slide={slide}>
      <div className="flex h-full flex-col gap-[4%] pb-[5%]">
        <div className="grid grid-cols-[0.82fr_1fr] items-start gap-[6%]">
          <div className="min-w-0">
            <SlideEyebrow accent={presentation.accent}>{slide.eyebrow}</SlideEyebrow>
            <SlideTitle
              size="md"
              className={
                isFirstDeckFramework
                  ? "mt-[28px] max-w-[18ch] text-[43px] leading-[0.92]"
                  : "mt-[22px] max-w-[17ch]"
              }
            >
              {slide.title}
            </SlideTitle>
          </div>
          <SlideBody className="max-w-[45ch] pt-[1%]">{slide.body}</SlideBody>
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-[2.6%]">
          {slide.cards?.map((card, index) => (
            <div key={card.title} className="relative min-h-0 overflow-hidden rounded-[10px] bg-white p-[5.2%] shadow-[var(--shadow-card)]">
              <p className="font-mono text-[15px] font-bold" style={{ color: presentation.accent }}>
                0{index + 1}
              </p>
              <h3 className="mt-[28px] text-[28px] font-extrabold leading-[1] tracking-normal text-black">
                {card.title}
              </h3>
              <p className="mt-[16px] max-w-[32ch] text-[15px] leading-[1.28] text-black/58">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}
