"use client";

import * as React from "react";
import { Combobox } from "@/components/combobox";

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

const countries = [
  { value: "br", label: "Brasil" },
  { value: "pt", label: "Portugal" },
  { value: "us", label: "Estados Unidos" },
  { value: "de", label: "Alemanha" },
  { value: "fr", label: "França" },
  { value: "jp", label: "Japão" },
  { value: "ca", label: "Canadá" },
];

export function ComboboxBasicDemo() {
  const [value, setValue] = React.useState("");
  return (
    <div className="flex flex-col gap-2">
      <Combobox
        options={frameworks}
        value={value}
        onValueChange={setValue}
        placeholder="Framework..."
        searchPlaceholder="Buscar framework..."
      />
      <p className="font-mono text-[12px] text-muted-foreground">
        Selecionado: {value || "nenhum"}
      </p>
    </div>
  );
}

export function ComboboxCountryDemo() {
  const [value, setValue] = React.useState("br");
  return (
    <Combobox
      options={countries}
      value={value}
      onValueChange={setValue}
      placeholder="País..."
      searchPlaceholder="Buscar país..."
      className="w-[200px]"
    />
  );
}
