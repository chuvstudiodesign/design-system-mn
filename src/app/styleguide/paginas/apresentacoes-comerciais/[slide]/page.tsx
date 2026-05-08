import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PresentationSlide } from "@/components/commercial-presentations/PresentationSlide";
import { commercialPresentations } from "@/data/commercial-presentations";

type SlidePageProps = {
  params: Promise<{ slide: string }>;
};

const presentation = commercialPresentations[0];

export function generateStaticParams() {
  return presentation.slides.map((_, index) => ({
    slide: `slide-${index + 1}`,
  }));
}

export async function generateMetadata({
  params,
}: SlidePageProps): Promise<Metadata> {
  const { slide } = await params;
  const slideNumber = Number(slide.replace("slide-", ""));
  const currentSlide = presentation.slides[slideNumber - 1];

  return {
    title: currentSlide
      ? `${currentSlide.eyebrow} | ${presentation.title.replace(/\n/g, " ")}`
      : "Slide não encontrado | MN Design System",
  };
}

export default async function CommercialPresentationSlidePage({
  params,
}: SlidePageProps) {
  const { slide } = await params;

  if (!/^slide-\d+$/.test(slide)) {
    notFound();
  }

  const slideNumber = Number(slide.replace("slide-", ""));
  const currentSlide = presentation.slides[slideNumber - 1];

  if (!currentSlide) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#D4D4D4]">
      <div
        id="figma-slide-capture"
        className="h-[900px] w-[1600px] overflow-hidden bg-[#D4D4D4]"
      >
        <PresentationSlide presentation={presentation} slide={currentSlide} />
      </div>
    </main>
  );
}
