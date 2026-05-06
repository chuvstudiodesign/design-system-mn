import type { CommercialPresentation, CommercialSlide } from "@/data/commercial-presentations";
import { cn } from "@/lib/utils";
import { SlideBody, SlideEyebrow, SlideShell, SlideTitle } from "./SlidePrimitives";

export function SlideStats({
  presentation,
  slide,
}: {
  presentation: CommercialPresentation;
  slide: CommercialSlide;
}) {
  const dark = slide.type === "risks";

  return (
    <SlideShell presentation={presentation} slide={slide} dark={dark}>
      <div className="flex h-full flex-col gap-[6%] pb-[5%]">
        <div className="grid grid-cols-[0.82fr_1.18fr] gap-[6%]">
          <div className="flex flex-col gap-[7%]">
            <SlideEyebrow accent={presentation.accent} dark={dark}>{slide.eyebrow}</SlideEyebrow>
            <SlideTitle size="md" className="max-w-[12ch]">{slide.title}</SlideTitle>
            <SlideBody dark={dark}>{slide.body}</SlideBody>
          </div>
          <div className="flex flex-col gap-[3%]">
            {slide.stats?.map((stat) => (
              <div
                key={`${stat.value}-${stat.label}`}
                className={cn(
                  "relative isolate flex items-center gap-[6%] overflow-hidden rounded-[10px] px-[7%] py-[6%]",
                  dark
                    ? "border border-white/18 bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-[18px] backdrop-saturate-[180%]"
                    : "bg-white shadow-[var(--shadow-card)]"
                )}
              >
                {dark && (
                  <>
                    <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(255,255,255,0.22),rgba(255,255,255,0.04)_42%,rgba(255,255,255,0.12))]" />
                    <div
                      className="absolute -right-[10%] -top-[30%] -z-10 h-[120%] w-[40%] rounded-full opacity-40 blur-2xl"
                      style={{ background: presentation.accent }}
                    />
                    <div className="absolute inset-y-[15%] left-[38%] w-px bg-white/18" />
                  </>
                )}
                <p
                  className="shrink-0 font-mono text-[56px] font-bold leading-none tracking-normal"
                  style={{ color: presentation.accent }}
                >
                  {stat.value}
                </p>
                <p className={dark ? "text-[17px] font-semibold leading-[1.3] text-white/72" : "text-[17px] font-semibold leading-[1.3] text-black/68"}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-auto h-[10px] w-full rounded-full bg-black/10">
          <div className="h-full w-[68%] rounded-full" style={{ background: presentation.accent }} />
        </div>
      </div>
    </SlideShell>
  );
}
