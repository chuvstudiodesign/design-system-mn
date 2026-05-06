import { notFound } from "next/navigation";
import { getLogoBrand, LOGO_BRANDS } from "../brand-data";
import { LogotipoPageContent } from "../page";

export function generateStaticParams() {
  return LOGO_BRANDS
    .filter((brand) => brand.slug !== "hub")
    .map((brand) => ({ brand: brand.slug }));
}

export default async function BrandLogotipoPage({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand: slug } = await params;
  const brand = getLogoBrand(slug);

  if (!brand || brand.slug === "hub") {
    notFound();
  }

  return <LogotipoPageContent brand={brand} />;
}
