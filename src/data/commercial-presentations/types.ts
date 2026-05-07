import type { StaticImageData } from "next/image";

export type CommercialSlideType =
  | "cover"
  | "statement"
  | "context"
  | "problem"
  | "behavior"
  | "opportunity"
  | "stats"
  | "framework"
  | "principle"
  | "example"
  | "leaders"
  | "decision"
  | "concept"
  | "turning-point"
  | "action-plan"
  | "benefits"
  | "risks"
  | "recommendations"
  | "cta"
  | "closing";

export type CommercialSlideVisual =
  | "editorial"
  | "split"
  | "dark"
  | "cards"
  | "stats"
  | "timeline"
  | "matrix"
  | "quote"
  | "map"
  | "closing";

export type CommercialSlideStat = {
  value: string;
  label: string;
};

export type CommercialSlideCard = {
  title: string;
  description: string;
};

export type CommercialSlideChartDatum = {
  label: string;
  value: number;
  secondary?: number;
};

export type CommercialSlideChart = {
  type: "bar" | "line";
  valueLabel: string;
  secondaryLabel?: string;
  insight?: string;
  source?: string;
  data: CommercialSlideChartDatum[];
};

export type CommercialSlide = {
  id: string;
  type: CommercialSlideType;
  visual: CommercialSlideVisual;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  body?: string;
  quote?: string;
  bullets?: string[];
  stats?: CommercialSlideStat[];
  cards?: CommercialSlideCard[];
  chart?: CommercialSlideChart;
  footer?: string;
  imageDirection?: string;
  imageSrc?: StaticImageData;
  imageAlt?: string;
};

export type CommercialPresentation = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  theme: string;
  style: string;
  useCase: string;
  accent: string;
  darkAccent: string;
  tags: string[];
  slides: CommercialSlide[];
};
