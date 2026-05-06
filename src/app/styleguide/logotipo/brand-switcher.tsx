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

function BrandIcon({ brand }: { brand: LogoBrand }) {
  const symbolSrc = brand.slug === "hub"
    ? brand.logos.symbol.src
    : `${brand.logos.symbol.base}-brand.svg`;

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
        className="block h-full w-full object-contain"
      />
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
        <div className="mx-auto w-full max-w-4xl">
          <DrawerHeader>
            <DrawerTitle>Selecione a marca</DrawerTitle>
            <DrawerDescription>
              Acesse as diretrizes e downloads de logotipo de cada marca.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex items-start justify-center gap-10 overflow-x-auto px-[30px] pb-[30px]">
            {LOGO_BRANDS.map((brand) => (
              <DrawerClose key={brand.slug} asChild>
                <Link
                  href={brandHref(brand.slug)}
                  aria-current={brand.slug === currentSlug ? "page" : undefined}
                  className="group flex w-[75px] flex-col items-center gap-3 rounded-[10px] transition-opacity hover:opacity-80 aria-[current=page]:opacity-100"
                >
                  <BrandIcon brand={brand} />
                  <Typography as="p" variant="body-sm" className="text-center font-semibold text-foreground">
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
