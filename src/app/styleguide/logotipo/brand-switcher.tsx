"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Typography } from "@/components/typography";
import { LOGO_BRANDS, type LogoBrand } from "./brand-data";

function brandHref(slug: string) {
  return slug === "hub" ? "/styleguide/logotipo" : `/styleguide/logotipo/${slug}`;
}

const LARGER_BRAND_ICONS = new Set(["academy", "workshop", "action", "founder"]);
const BRAND_SWITCHER_ORDER = [
  "hub",
  "academy",
  "workshop",
  "action",
  "experience",
  "aceleracao",
  "founder",
  "advisor",
];

function BrandIcon({ brand }: { brand: LogoBrand }) {
  const symbolSrc = brand.slug === "hub"
    ? brand.logos.symbol.src
    : `${brand.logos.symbol.base}-brand.svg`;
  const iconSizeClass = LARGER_BRAND_ICONS.has(brand.slug)
    ? "h-[74.5%] w-[74.5%]"
    : "h-[69%] w-[69%]";

  return (
    <div
      className="flex h-[75px] w-[75px] items-center justify-center rounded-[23px] p-[21px]"
      style={{
        background: "radial-gradient(50% 50%, rgb(255, 255, 255) 59.28%, rgb(245, 245, 245) 100%)",
        boxShadow:
          "rgba(0, 0, 0, 0.05) 1px 1px 0px 0px, rgba(0, 0, 0, 0.05) -1px -1px 0px 0px, rgba(0, 0, 0, 0.05) 0px 4px 15px 0px",
      }}
    >
      <img
        src={symbolSrc}
        alt=""
        aria-hidden="true"
        className={`block object-contain ${iconSizeClass}`}
      />
    </div>
  );
}

export function BrandSelectorInline() {
  const orderedBrands = BRAND_SWITCHER_ORDER
    .map((slug) => LOGO_BRANDS.find((brand) => brand.slug === slug))
    .filter((brand): brand is LogoBrand => Boolean(brand));

  return (
    <div className="flex flex-wrap items-start justify-center gap-x-[40px] gap-y-8 pt-2">
      {orderedBrands.map((brand) => (
        <Link
          key={brand.slug}
          href={brandHref(brand.slug)}
          aria-label={`Selecionar ${brand.name}`}
          className="group flex w-[90px] flex-col items-center gap-3 rounded-[10px] transition-opacity hover:opacity-80"
        >
          <BrandIcon brand={brand} />
          <Typography
            as="p"
            variant="body"
            className="pointer-events-none min-h-[1.5em] text-center font-normal text-black opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            {brand.name}
          </Typography>
        </Link>
      ))}
    </div>
  );
}

export function BrandSwitcher({ currentSlug }: { currentSlug: string }) {
  const orderedBrands = BRAND_SWITCHER_ORDER
    .map((slug) => LOGO_BRANDS.find((brand) => brand.slug === slug))
    .filter((brand): brand is LogoBrand => Boolean(brand));

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Outras marcas</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="w-full">
          <DrawerHeader className="px-[30px] py-[80px]">
            <DrawerTitle>Selecione a marca</DrawerTitle>
            <DrawerDescription>
              Acesse as diretrizes e downloads de logotipo de cada marca.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-wrap items-start justify-center gap-x-[50px] gap-y-8 px-[30px] pb-[80px]">
            {orderedBrands.map((brand) => (
              <DrawerClose key={brand.slug} asChild>
                <Link
                  href={brandHref(brand.slug)}
                  aria-label={`Selecionar ${brand.name}`}
                  aria-current={brand.slug === currentSlug ? "page" : undefined}
                  className="group flex w-[90px] flex-col items-center gap-3 rounded-[10px] transition-opacity hover:opacity-80 aria-[current=page]:opacity-100"
                >
                  <BrandIcon brand={brand} />
                  <Typography as="p" variant="body" className="pointer-events-none min-h-[1.5em] text-center font-normal text-black opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    {brand.name}
                  </Typography>
                </Link>
              </DrawerClose>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
