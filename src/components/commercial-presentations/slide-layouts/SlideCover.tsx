import type { CommercialPresentation, CommercialSlide } from "@/data/commercial-presentations";
import { ChamferedPanel } from "@/components/chamfered-panel";
import {
  AbstractVisual,
  SlideBody,
  SlideEyebrow,
  SlideFooter,
  SlideLogo,
  SlideShell,
  SlideTitle,
} from "./SlidePrimitives";

export function SlideCover({
  presentation,
  slide,
}: {
  presentation: CommercialPresentation;
  slide: CommercialSlide;
}) {
  if (presentation.slug === "futuro-negocios-brasil") {
    return (
      <article className="relative flex h-full w-full overflow-hidden bg-[#D4D4D4] p-[20px] text-black">
        <ChamferedPanel
          strokeColor="#FFFFFF"
          strokeWidth={1}
          innerStyle={{
            background: "#ECECEC",
            borderRadius: 10,
            padding: 80,
          }}
        >
          <div className="relative z-10 flex min-h-0 w-full flex-col pb-[30px]">
            <div className="flex items-start justify-between">
              <SlideLogo size="large" />
              <SlideEyebrow accent={presentation.accent}>{slide.eyebrow}</SlideEyebrow>
            </div>
            <div className="mt-[20px] grid min-h-0 flex-1 grid-cols-[1.08fr_0.92fr] gap-[5%]">
              <div className="flex min-w-0 flex-col justify-center gap-[32px]">
                <SlideTitle
                  size="xl"
                  className="max-w-[17ch] text-[85px] leading-[0.82]"
                >
                  {slide.title}
                </SlideTitle>
                <SlideBody className="max-w-[572px]">{slide.body}</SlideBody>
                <div className="flex flex-wrap gap-[12px] pt-[4px]">
                  {slide.bullets?.map((bullet) => (
                    <span
                      key={bullet}
                      className="rounded-full bg-black px-[21px] py-[9px] text-[13px] font-bold uppercase tracking-[0.08em] text-white"
                    >
                      {bullet}
                    </span>
                  ))}
                </div>
              </div>
              <AbstractVisual
                accent={presentation.accent}
                label="Área para imagem editorial de negócios, tecnologia e transformação de mercado."
                className="h-full min-h-[450px]"
                variant="orbital"
              />
            </div>
          </div>
        </ChamferedPanel>
        <SlideFooter presentation={presentation} slide={slide} />
      </article>
    );
  }

  return (
    <SlideShell presentation={presentation} slide={slide}>
      <div className="flex h-full flex-col justify-between pb-[5%]">
        <div className="flex items-start justify-between">
          <SlideLogo />
          <SlideEyebrow accent={presentation.accent}>{slide.eyebrow}</SlideEyebrow>
        </div>
        <div className="grid min-h-0 grid-cols-[1.05fr_0.95fr] gap-[7%]">
          <div className="flex flex-col justify-end gap-[4%]">
            <SlideTitle size="xl" className="max-w-[17ch] leading-[0.84]">{slide.title}</SlideTitle>
            <SlideBody className="max-w-[48ch]">{slide.body}</SlideBody>
            <div className="flex flex-wrap gap-[2%] pt-[2%]">
              {slide.bullets?.map((bullet) => (
                <span
                  key={bullet}
                  className="rounded-full bg-black px-[18px] py-[8px] text-[12px] font-bold uppercase tracking-[0.08em] text-white"
                >
                  {bullet}
                </span>
              ))}
            </div>
          </div>
          <AbstractVisual
            accent={presentation.accent}
            label={slide.imageDirection}
            variant="orbital"
          />
        </div>
      </div>
    </SlideShell>
  );
}
