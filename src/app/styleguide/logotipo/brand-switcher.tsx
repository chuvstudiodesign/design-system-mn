"use client";
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
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
  const base = slug === "hub" ? "/styleguide/logotipo" : `/styleguide/logotipo/${slug}`;
  return `${base}#versoes`;
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

function BrandDrawerList({ currentSlug }: { currentSlug?: string }) {
  const orderedBrands = BRAND_SWITCHER_ORDER
    .map((slug) => LOGO_BRANDS.find((brand) => brand.slug === slug))
    .filter((brand): brand is LogoBrand => Boolean(brand));

  return (
    <div className="mx-auto grid w-fit grid-cols-2 gap-x-[40px] gap-y-8 md:grid-cols-4 xl:grid-cols-8">
      {orderedBrands.map((brand) => (
        <DrawerClose key={brand.slug} asChild>
          <Link
            href={brandHref(brand.slug)}
            aria-label={`Selecionar ${brand.name}`}
            aria-current={currentSlug && brand.slug === currentSlug ? "page" : undefined}
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
  );
}

export function BrandSelectorInline() {
  const orderedBrands = BRAND_SWITCHER_ORDER
    .map((slug) => LOGO_BRANDS.find((brand) => brand.slug === slug))
    .filter((brand): brand is LogoBrand => Boolean(brand));

  return (
    <div className="mx-auto grid w-fit grid-cols-2 gap-x-[40px] gap-y-8 pt-2 md:grid-cols-4 xl:grid-cols-8">
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
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Outras marcas</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="w-full">
          <DrawerHeader className="px-[30px] pt-[60px] pb-0">
            <DrawerTitle>Selecione a marca</DrawerTitle>
            <DrawerDescription>
              Acesse as diretrizes e downloads de logotipo de cada marca.
            </DrawerDescription>
          </DrawerHeader>
          <div className="mt-[60px] px-[30px] pb-[60px]">
            <BrandDrawerList currentSlug={currentSlug} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function FloatingBrandSwitcher({ currentSlug }: { currentSlug: string }) {
  const [visible, setVisible] = useState(false);
  const hubSymbol = LOGO_BRANDS.find((b) => b.slug === "hub")?.logos.symbol.src ?? "";

  useEffect(() => {
    const firstSection = document.querySelector(".ds-page section");
    if (!firstSection) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(firstSection);
    return () => observer.disconnect();
  }, []);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          aria-label="Outras marcas"
          className={cn(
            "fixed bottom-6 left-1/2 z-50 flex items-center gap-2.5 rounded-full bg-white py-3 px-[30px] shadow-lg transition-all duration-300",
            visible ? "opacity-100" : "pointer-events-none opacity-0"
          )}
          style={{
            transform: `translateX(-50%) translateY(${visible ? "0" : "8px"})`,
          }}
        >
          <img src={hubSymbol} alt="" aria-hidden className="h-5 w-5 object-contain" />
          <span className="text-[13px] font-medium text-black">Outras marcas</span>
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="w-full">
          <DrawerHeader className="px-[30px] pt-[60px] pb-0">
            <DrawerTitle>Selecione a marca</DrawerTitle>
            <DrawerDescription>
              Acesse as diretrizes e downloads de logotipo de cada marca.
            </DrawerDescription>
          </DrawerHeader>
          <div className="mt-[60px] px-[30px] pb-[60px]">
            <BrandDrawerList currentSlug={currentSlug} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
