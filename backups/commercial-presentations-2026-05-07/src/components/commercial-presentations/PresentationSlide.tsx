import type { CommercialPresentation, CommercialSlide as CommercialSlideType } from "@/data/commercial-presentations";
import { SlideCards } from "./slide-layouts/SlideCards";
import { SlideClosing } from "./slide-layouts/SlideClosing";
import { SlideCover } from "./slide-layouts/SlideCover";
import { SlideFramework } from "./slide-layouts/SlideFramework";
import { SlideSplit } from "./slide-layouts/SlideSplit";
import { SlideStatement } from "./slide-layouts/SlideStatement";
import { SlideStats } from "./slide-layouts/SlideStats";

export function PresentationSlide({
  presentation,
  slide,
}: {
  presentation: CommercialPresentation;
  slide: CommercialSlideType;
}) {
  if (slide.type === "cover") {
    return <SlideCover presentation={presentation} slide={slide} />;
  }

  if (slide.type === "closing") {
    return <SlideClosing presentation={presentation} slide={slide} />;
  }

  if (
    slide.type === "statement" ||
    slide.type === "principle" ||
    slide.type === "turning-point"
  ) {
    return <SlideStatement presentation={presentation} slide={slide} />;
  }

  if (slide.type === "stats" || slide.type === "risks") {
    return <SlideStats presentation={presentation} slide={slide} />;
  }

  if (slide.type === "framework" || slide.type === "decision") {
    return <SlideFramework presentation={presentation} slide={slide} />;
  }

  if (
    slide.type === "leaders" ||
    slide.type === "action-plan" ||
    slide.type === "benefits" ||
    slide.type === "recommendations"
  ) {
    return <SlideCards presentation={presentation} slide={slide} />;
  }

  return <SlideSplit presentation={presentation} slide={slide} />;
}
