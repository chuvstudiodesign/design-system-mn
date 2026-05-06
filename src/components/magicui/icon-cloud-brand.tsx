import { IconCloud } from "@/components/ui/icon-cloud";

const brandColorSet = [
  "/logos/symbol/masi-symbol-green.png",
  "/logos/brands/academy/symbol/academy-symbol-brand.png",
  "/logos/brands/workshop/symbol/workshop-symbol-brand.png",
  "/logos/brands/experience/symbol/experience-symbol-brand.png",
  "/logos/brands/action/symbol/action-symbol-brand.png",
  "/logos/brands/aceleracao/symbol/aceleracao-symbol-brand.png",
  "/logos/brands/founder/symbol/founder-symbol-brand.png",
  "/logos/brands/advisor/symbol/advisor-symbol-brand.png",
];

const darkSet = [
  "/logos/symbol/masi-symbol-dark.png",
  "/logos/brands/academy/symbol/academy-symbol-dark.png",
  "/logos/brands/workshop/symbol/workshop-symbol-dark.png",
  "/logos/brands/experience/symbol/experience-symbol-dark.png",
  "/logos/brands/action/symbol/action-symbol-dark.png",
  "/logos/brands/aceleracao/symbol/aceleracao-symbol-dark.png",
  "/logos/brands/founder/symbol/founder-symbol-dark.png",
  "/logos/brands/advisor/symbol/advisor-symbol-dark.png",
];

// Duplicating with [...set, ...set] places each pair at positions i and i+8
// in a 16-item Fibonacci sphere, which are ~170° apart — nearly opposite sides.
export const brandCloudImages = {
  brandColors: brandColorSet,
  brandColors2: [...brandColorSet, ...brandColorSet],
  dark: darkSet,
  dark2: [...darkSet, ...darkSet],
};

export function IconCloudBrand({
  variant = "brandColors",
}: {
  variant?: keyof typeof brandCloudImages;
}) {
  return <IconCloud images={brandCloudImages[variant]} />;
}
