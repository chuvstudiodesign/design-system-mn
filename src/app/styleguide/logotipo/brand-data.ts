export type LogoType = "primary" | "vertical" | "wordmark" | "symbol";

export type AssetColor = {
  label: string;
  suffix: string;
  hex?: string;
  swatchStyle?: CSSProperties;
};

export type LogoBrand = {
  slug: string;
  name: string;
  description: string;
  brandColor: AssetColor;
  colors: AssetColor[];
  logos: Record<LogoType, {
    base: string;
    src: string;
    width: number;
    height: number;
  }>;
};

const baseColors = {
  dark: { label: "Preta", suffix: "dark", hex: "#0D0D0D" },
  light: { label: "Branca", suffix: "light", hex: "#FFFFFF" },
} as const;

function hubLogo(type: LogoType, width: number, height: number) {
  return {
    base: `/logos/${type === "primary" ? "primary/masi-primary" : type === "vertical" ? "vertical/masi-vertical" : type === "wordmark" ? "wordmark/masi-wordmark" : "symbol/masi-symbol"}`,
    src: `/logos/${type === "primary" ? "primary/masi-primary-dark.svg" : type === "vertical" ? "vertical/masi-vertical-dark.svg" : type === "wordmark" ? "wordmark/masi-wordmark-dark.svg" : "symbol/masi-symbol-dark.svg"}`,
    width,
    height,
  };
}

function brandLogo(slug: string, type: LogoType, width: number, height: number) {
  return {
    base: `/logos/brands/${slug}/${type}/${slug}-${type}`,
    src: `/logos/brands/${slug}/${type}/${slug}-${type}-dark.svg`,
    width,
    height,
  };
}

export const LOGO_BRANDS: LogoBrand[] = [
  {
    slug: "hub",
    name: "MASI",
    description: "Marca hub e guarda-chuva da arquitetura visual MASI.",
    brandColor: { label: "Verde", suffix: "green", hex: "#AFF000" },
    colors: [
      baseColors.dark,
      baseColors.light,
      { label: "Verde", suffix: "green", hex: "#AFF000" },
      { label: "Verde escuro", suffix: "brand-dark-green", hex: "#0C1C16" },
    ],
    logos: {
      primary: hubLogo("primary", 1831, 164),
      vertical: hubLogo("vertical", 1253.58, 331.729),
      wordmark: hubLogo("wordmark", 1556.3, 142.888),
      symbol: hubLogo("symbol", 163.085, 164),
    },
  },
  {
    slug: "academy",
    name: "Academy",
    description: "Marca para jornadas educacionais, conteúdos formativos e trilhas de aprendizado.",
    brandColor: { label: "Academy", suffix: "brand", hex: "#9E00FF" },
    colors: [baseColors.dark, baseColors.light, { label: "Academy", suffix: "brand", hex: "#9E00FF" }],
    logos: {
      primary: brandLogo("academy", "primary", 1891, 205),
      vertical: brandLogo("academy", "vertical", 1310, 349),
      wordmark: brandLogo("academy", "wordmark", 1590, 112),
      symbol: brandLogo("academy", "symbol", 179, 205),
    },
  },
  {
    slug: "workshop",
    name: "Workshop",
    description: "Marca para encontros práticos, sessões aplicadas e experiências de curta duração.",
    brandColor: { label: "Workshop", suffix: "brand", hex: "#F54A00" },
    colors: [baseColors.dark, baseColors.light, { label: "Workshop", suffix: "brand", hex: "#F54A00" }],
    logos: {
      primary: brandLogo("workshop", "primary", 2073, 171),
      vertical: brandLogo("workshop", "vertical", 1490, 335),
      wordmark: brandLogo("workshop", "wordmark", 1744, 112),
      symbol: brandLogo("workshop", "symbol", 208, 171),
    },
  },
  {
    slug: "experience",
    name: "Experience",
    description: "Marca para experiências, eventos e ativações da arquitetura MASI.",
    brandColor: { label: "Experience", suffix: "brand", hex: "#FF0055" },
    colors: [baseColors.dark, baseColors.light, { label: "Experience", suffix: "brand", hex: "#FF0055" }],
    logos: {
      primary: brandLogo("experience", "primary", 2099, 185),
      vertical: brandLogo("experience", "vertical", 1517, 341),
      wordmark: brandLogo("experience", "wordmark", 1791, 113),
      symbol: brandLogo("experience", "symbol", 185, 185),
    },
  },
  {
    slug: "action",
    name: "Action",
    description: "Marca para iniciativas de execução, aceleração prática e movimento comercial.",
    brandColor: {
      label: "Action",
      suffix: "brand",
      swatchStyle: { background: "linear-gradient(30deg, #0B37F7 0%, #3A67FF 100%)" },
    },
    colors: [
      baseColors.dark,
      baseColors.light,
      { label: "Action", suffix: "brand", swatchStyle: { background: "linear-gradient(30deg, #0B37F7 0%, #3A67FF 100%)" } },
    ],
    logos: {
      primary: brandLogo("action", "primary", 1566, 207),
      vertical: brandLogo("action", "vertical", 983, 373),
      wordmark: brandLogo("action", "wordmark", 1275, 113),
      symbol: brandLogo("action", "symbol", 172, 207),
    },
  },
  {
    slug: "aceleracao",
    name: "Aceleração",
    description: "Marca para programas intensivos, crescimento e acompanhamento de evolução.",
    brandColor: { label: "Aceleração", suffix: "brand", hex: "#002BF5" },
    colors: [baseColors.dark, baseColors.light, { label: "Aceleração", suffix: "brand", hex: "#002BF5" }],
    logos: {
      primary: brandLogo("aceleracao", "primary", 2207, 190),
      vertical: brandLogo("aceleracao", "vertical", 1625, 380),
      wordmark: brandLogo("aceleracao", "wordmark", 1896, 190),
      symbol: brandLogo("aceleracao", "symbol", 188, 159),
    },
  },
  {
    slug: "founder",
    name: "Founder",
    description: "Marca para narrativas de fundadores, liderança e construção de negócios.",
    brandColor: {
      label: "Founder",
      suffix: "brand",
      swatchStyle: { background: "linear-gradient(30deg, #282828 0%, #666666 100%)" },
    },
    colors: [
      baseColors.dark,
      baseColors.light,
      { label: "Founder", suffix: "brand", swatchStyle: { background: "linear-gradient(30deg, #282828 0%, #666666 100%)" } },
    ],
    logos: {
      primary: brandLogo("founder", "primary", 1812, 203),
      vertical: brandLogo("founder", "vertical", 1247, 380),
      wordmark: brandLogo("founder", "wordmark", 1521, 113),
      symbol: brandLogo("founder", "symbol", 170, 203),
    },
  },
  {
    slug: "advisor",
    name: "Advisor",
    description: "Marca para orientação especializada, advisory e relacionamento consultivo.",
    brandColor: { label: "Advisor", suffix: "brand", hex: "#5C00FF" },
    colors: [baseColors.dark, baseColors.light, { label: "Advisor", suffix: "brand", hex: "#5C00FF" }],
    logos: {
      primary: brandLogo("advisor", "primary", 1747, 165),
      vertical: brandLogo("advisor", "vertical", 1165, 323),
      wordmark: brandLogo("advisor", "wordmark", 1436, 112),
      symbol: brandLogo("advisor", "symbol", 191, 165),
    },
  },
];

export function getLogoBrand(slug: string) {
  return LOGO_BRANDS.find((brand) => brand.slug === slug);
}
import type { CSSProperties } from "react";
