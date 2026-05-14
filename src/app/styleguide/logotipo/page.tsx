/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";
import { FoundationFooter, FoundationPageHeader, Section } from "../foundation-sections";
import { ChamferedPanel } from "@/components/chamfered-panel";
import { Typography } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BrandSelectorInline, FloatingBrandSwitcher } from "./brand-switcher";
import { InstantHashScroll } from "./instant-scroll";
import { LOGO_BRANDS, type AssetColor, type LogoBrand } from "./brand-data";

// SVGs do Figma têm fundo transparente — nenhum filtro de brilho necessário.
// invert(1) converte logo preto em branco para containers escuros.
const LOGO_ON_DARK = "invert(1)";

function LogoDownloadDialog({
  logoName,
  assetBase,
  colors,
  triggerStyle,
}: {
  logoName: string;
  assetBase: string;
  colors: AssetColor[];
  triggerStyle?: CSSProperties;
}) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="default"
            className="font-mono text-[11px] font-bold uppercase tracking-wider"
            style={triggerStyle}
          />
        }
      >
        Download
      </DialogTrigger>
      <DialogContent className="gap-0 rounded-[10px] bg-transparent p-0 ring-0 sm:max-w-[640px]">
        <ChamferedPanel
          strokeColor="#FFFFFF"
          strokeWidth={1}
          style={{ height: "auto" }}
          innerStyle={{
            background: "#FFFFFF",
            borderRadius: 10,
            padding: "var(--section-padding-y) var(--section-padding-x)",
          }}
        >
          <div className="flex w-full flex-col gap-5">
            <DialogHeader>
              <DialogTitle>Baixar {logoName}</DialogTitle>
              <DialogDescription>
                Escolha a cor e o formato do arquivo.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 sm:grid-cols-2">
              {colors.map((color) => {
                const svgHref = `${assetBase}-${color.suffix}.svg`;
                const pngHref = `${assetBase}-${color.suffix}.png`;

                return (
                  <div
                    key={color.suffix}
                    className="overflow-hidden rounded-[10px] border border-[#D4D4D4]"
                  >
                    <div
                      className="h-20 border-b border-[#D4D4D4]"
                      style={color.swatchStyle ?? { background: color.hex }}
                    />
                    <div className="flex gap-2 bg-card p-3">
                      <Button
                        render={<a href={svgHref} download />}
                        variant="secondary"
                        className="flex-1 font-mono text-[11px] font-bold uppercase tracking-wider"
                        aria-label={`Baixar ${logoName} ${color.label} em SVG`}
                      >
                        SVG
                      </Button>
                      <Button
                        render={<a href={pngHref} download />}
                        variant="secondary"
                        className="flex-1 font-mono text-[11px] font-bold uppercase tracking-wider"
                        aria-label={`Baixar ${logoName} ${color.label} em PNG`}
                      >
                        PNG
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ChamferedPanel>
      </DialogContent>
    </Dialog>
  );
}

function RuleRow({ index, title, note }: { index: string; title: string; note: string }) {
  return (
    <div className="flex items-start gap-4 border-b border-white py-4 last:border-0">
      <span className="w-8 shrink-0 font-mono text-[10px] font-bold text-primary">{index}</span>
      <div className="flex flex-col gap-1">
        <Typography as="p" variant="body" className="font-semibold text-foreground">{title}</Typography>
        <Typography as="p" variant="body-sm" className="text-muted-foreground">{note}</Typography>
      </div>
    </div>
  );
}

const DARK_BG = new Set(["#0C1C16", "#1C1C1C", "#1F1F1F"]);

const LOGO_DIMENSIONS: Record<string, { width: number; height: number }> = Object.fromEntries(
  LOGO_BRANDS.flatMap((brand) =>
    Object.values(brand.logos).flatMap((logo) =>
      [
        logo.src,
        `${logo.base}-dark.svg`,
        `${logo.base}-light.svg`,
        `${logo.base}-brand.svg`,
        `${logo.base}-green.svg`,
        `${logo.base}-brand-dark-green.svg`,
      ].map((src) => [
        src,
        { width: logo.width, height: logo.height },
      ])
    )
  )
);

const LOGO_DISPLAY_SCALE = 0.192;

function logoDisplayWidth(src: string) {
  const size = LOGO_DIMENSIONS[src];

  if (!size) {
    return undefined;
  }

  return Math.round(size.width * LOGO_DISPLAY_SCALE);
}

function logoSize(src: string, responsiveMaxWidth?: number) {
  const size = LOGO_DIMENSIONS[src];

  if (!size) {
    return undefined;
  }

  const width = Math.round(size.width * LOGO_DISPLAY_SCALE);

  if (responsiveMaxWidth && responsiveMaxWidth > 0) {
    return {
      width: `min(${width}px, calc(90cqw * ${width / responsiveMaxWidth}))`,
      height: "auto",
    };
  }

  return {
    width: `${width}px`,
    height: `${Math.round(size.height * LOGO_DISPLAY_SCALE)}px`,
  };
}

function LogoBox({
  src, alt, bg = "#FFFFFF", bgStyle, imgFilter, fill = false, responsiveMaxWidth,
}: {
  src: string; alt: string; bg?: string; bgStyle?: CSSProperties; imgFilter?: string | null; fill?: boolean; responsiveMaxWidth?: number;
}) {
  const autoFilter = DARK_BG.has(bg) ? LOGO_ON_DARK : undefined;
  const filter = imgFilter === null ? undefined : imgFilter ?? autoFilter;
  const size = logoSize(src, responsiveMaxWidth);
  const boxStyle: CSSProperties = {
    ...(bgStyle ?? { background: bg }),
    ...(responsiveMaxWidth ? { containerType: "inline-size" } : {}),
  };

  return (
    <div
      className={`flex items-center justify-center rounded-[10px] p-8${fill ? " flex-1" : ""}`}
      style={boxStyle}
    >
      <img
        src={src}
        alt={alt}
        style={{
          display: "block",
          width: size?.width ?? "auto",
          height: size?.height ?? "auto",
          maxWidth: "90%",
          objectFit: "contain",
          ...(filter ? { filter } : {}),
        }}
      />
    </div>
  );
}

export function LogotipoPageContent({ brand }: { brand: LogoBrand }) {
  const LOGO_PRIMARY = brand.logos.primary.src;
  const LOGO_VERTICAL = brand.logos.vertical.src;
  const LOGO_WORDMARK = brand.logos.wordmark.src;
  const LOGO_SYMBOL = brand.logos.symbol.src;
  const filePrefix = brand.slug === "hub" ? "masi" : brand.slug;
  const brandColorStyle = brand.brandColor.swatchStyle ?? { background: brand.brandColor.hex };
  const isHubBrand = brand.slug === "hub";
  const brandDisplayName = isHubBrand ? "Mase" : `Mase ${brand.name}`;
  const downloadButtonStyle: CSSProperties = {
    ...brandColorStyle,
    borderColor: "transparent",
    color: isHubBrand ? "#000000" : "#FFFFFF",
  };
  const primaryLogoVariant = (suffix: string) => `${brand.logos.primary.base}-${suffix}.svg`;
  const symbolLogoVariant = (suffix: string) => `${brand.logos.symbol.base}-${suffix}.svg`;
  const colorUsageExamples = isHubBrand
    ? [
        { logoSrc: LOGO_PRIMARY, bg: "#FFFFFF", bgLabel: "Fundo branco", filter: undefined, desc: "Versão preta. Contraste máximo em fundos brancos e claros." },
        { logoSrc: LOGO_PRIMARY, bg: "#0C1C16", bgLabel: "Fundo verde escuro", filter: LOGO_ON_DARK, desc: "Versão branca. Legibilidade total em fundos muito escuros." },
        { logoSrc: LOGO_PRIMARY, bg: brand.brandColor.hex ?? "#FFFFFF", bgStyle: brandColorStyle, bgLabel: `Fundo ${brand.name}`, filter: undefined, desc: "Versão preta sobre a cor principal da marca. Contraste e identidade preservados." },
        { logoSrc: LOGO_PRIMARY, bg: "#1F1F1F", bgLabel: "Fundo preto", filter: LOGO_ON_DARK, desc: "Versão branca em fundos neutros escuros." },
      ]
    : [
        { logoSrc: primaryLogoVariant("dark"), bg: "#FFFFFF", bgLabel: "Fundo branco", filter: undefined, desc: "Versão preta. Contraste máximo em fundos brancos e claros." },
        { logoSrc: primaryLogoVariant("brand"), bg: "#FFFFFF", bgLabel: "Fundo branco", filter: undefined, desc: `Versão ${brand.name}. Aplicação colorida da marca em fundo branco.` },
        { logoSrc: primaryLogoVariant("light"), bg: brand.brandColor.hex ?? "#FFFFFF", bgStyle: brandColorStyle, bgLabel: `Fundo ${brand.name}`, filter: null, desc: "Versão branca sobre a cor principal da marca." },
        { logoSrc: primaryLogoVariant("light"), bg: "#1F1F1F", bgLabel: "Fundo preto", filter: null, desc: "Versão branca em fundos neutros escuros." },
      ];
  const correctColorUsage = isHubBrand
    ? {
        logoSrc: LOGO_PRIMARY,
        alt: "Versão branca em fundo escuro",
        bg: "#0C1C16",
        filter: LOGO_ON_DARK,
        title: "Versão branca em fundo escuro",
        desc: "Contraste adequado com versão clara sobre fundo verde escuro.",
      }
    : {
        logoSrc: primaryLogoVariant("light"),
        alt: `Versão branca em fundo ${brand.name}`,
        bg: brand.brandColor.hex ?? "#FFFFFF",
        bgStyle: brandColorStyle,
        filter: null,
        title: `Versão branca em fundo ${brand.name}`,
        desc: "Contraste adequado com versão clara sobre a cor principal da marca.",
      };
  const avatarSymbol = isHubBrand
    ? {
        src: LOGO_SYMBOL,
        bg: "#0C1C16",
        bgStyle: undefined,
        filter: LOGO_ON_DARK,
        size: "102%",
      }
    : {
        src: symbolLogoVariant("light"),
        bg: brand.brandColor.hex ?? "#FFFFFF",
        bgStyle: brandColorStyle,
        filter: null,
        size: brand.slug === "workshop" ? "24px" : "102%",
      };
  const logoVersionItems = [
    { key: "primary", src: LOGO_PRIMARY, alt: "Logo principal", name: "Logo principal", desc: "Símbolo e nome em composição horizontal. Versão primária para toda comunicação institucional onde a marca precisa ser apresentada com clareza completa.", tags: ["Apresentações", "Headers", "Materiais comerciais"] },
    { key: "vertical", src: LOGO_VERTICAL, alt: "Logo vertical", name: "Logo vertical", desc: "Símbolo e nome em composição vertical. Indicado para capas, aberturas e layouts onde a altura favorece a composição centralizada.", tags: ["Capas", "Peças editoriais", "Composições centralizadas"] },
    { key: "wordmark", src: LOGO_WORDMARK, alt: "Wordmark", name: "Wordmark", desc: "Apenas o nome tipográfico. Para aplicações minimalistas, assinaturas, rodapés e contextos onde a marca já está estabelecida.", tags: ["Rodapés", "Documentos", "Assinaturas"] },
    { key: "symbol", src: LOGO_SYMBOL, alt: "Símbolo", name: "Símbolo", desc: "Apenas o símbolo da marca. Para espaços reduzidos, avatares, favicons, app icons e selos onde o reconhecimento precisa ser rápido e compacto.", tags: ["Avatar", "Favicon", "App icon", "Selos"] },
  ] as const;
  const logoVersionMaxWidth = Math.max(
    ...logoVersionItems.map((item) => logoDisplayWidth(item.src) ?? 0)
  );

  return (
    <div className="ds-page">
      <InstantHashScroll />
      <FoundationPageHeader
        title={`Logotipo — ${isHubBrand ? "Masi Negócios" : brand.name}`}
        description={brand.description}
      />

      {/* ── 00 · SELETOR DE MARCA ────────────────────────────────────────────── */}
      <Section
        title="Selecione a marca"
        subtitle="Acesse as diretrizes e downloads de logotipo de cada marca."
        first
        centered
        noDivider
      >
        <BrandSelectorInline />
      </Section>

      {/* ── 01 · VERSÕES DO LOGOTIPO ─────────────────────────────────────────── */}
      <Section
        id="versoes"
        eyebrow="Fundação"
        title="Versões do logotipo"
        subtitle={`${brandDisplayName} possui quatro assinaturas visuais. Cada uma foi criada para um contexto específico — escolher a versão correta é parte essencial do uso correto da marca.`}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

          {logoVersionItems.map((item) => (
            <div key={item.name} className="ds-card !p-[30px] flex flex-col" style={{ height: "650px" }}>
              <LogoBox src={item.src} alt={item.alt} fill responsiveMaxWidth={logoVersionMaxWidth} />
              <div className="mt-5 flex flex-col gap-3">
                <div>
                  <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">{item.name}</Typography>
                  <Typography as="p" variant="body-sm" className="mt-2 text-muted-foreground">{item.desc}</Typography>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.tags.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="min-h-8 px-2.5 py-0 text-[10px] font-semibold uppercase tracking-wider"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="flex">
                  <LogoDownloadDialog
                    logoName={item.name}
                    assetBase={brand.logos[item.key].base}
                    colors={brand.colors}
                    triggerStyle={downloadButtonStyle}
                  />
                </div>
              </div>
            </div>
          ))}

        </div>

        <div className="ds-card !p-[30px] mt-6">
          <Typography as="p" variant="body-sm" className="text-muted-foreground">
            O logo completo deve ser priorizado quando a marca precisa ser apresentada com clareza pela primeira vez ou em contextos de comunicação institucional.
            O símbolo deve ser usado quando o espaço é limitado ou quando a marca já está contextualizada no ambiente.
          </Typography>
        </div>

        <div className="ds-card !p-[30px] mt-6">
          <Typography as="p" variant="label" className="mb-4 normal-case tracking-normal text-foreground">Sobre os formatos</Typography>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Typography as="p" variant="body-sm" className="font-semibold text-foreground">SVG — vetorial</Typography>
              <Typography as="p" variant="body-sm" className="mt-1 text-muted-foreground">
                Escalável sem perda de qualidade. Preferência absoluta para web, interfaces digitais e e-mail. Nitidez garantida em qualquer resolução e densidade de tela.
              </Typography>
            </div>
            <div>
              <Typography as="p" variant="body-sm" className="font-semibold text-foreground">PNG — raster transparente</Typography>
              <Typography as="p" variant="body-sm" className="mt-1 text-muted-foreground">
                Com fundo transparente. Use apenas quando SVG não for compatível — em plataformas de apresentação, editores de imagem ou sistemas legados.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 02 · USO DE COR ──────────────────────────────────────────────────── */}
      <Section
        eyebrow="Color Usage"
        title="Uso de cor"
        subtitle="O logotipo possui versões cromáticas para garantir contraste e legibilidade em qualquer fundo. A escolha deve sempre priorizar legibilidade."
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {colorUsageExamples.map((item, index) => (
            <div key={`${item.bgLabel}-${index}`} className="ds-card !p-[30px] flex flex-col" style={{ height: "650px" }}>
              <LogoBox src={item.logoSrc} alt={`Logo em ${item.bgLabel}`} bg={item.bg} bgStyle={item.bgStyle} imgFilter={item.filter} fill />
              <div className="mt-5">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 shrink-0 rounded-full border border-black/15" style={item.bgStyle ?? { background: item.bg }} />
                  <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">{item.bgLabel}</Typography>
                </div>
                <Typography as="p" variant="body-sm" className="mt-1 text-muted-foreground">{item.desc}</Typography>
              </div>
            </div>
          ))}
        </div>

        <div className="ds-card !p-[30px] mt-6">
          <Typography as="p" variant="label" className="mb-4 normal-case tracking-normal text-foreground">Paleta oficial de aplicação</Typography>
          <div className="grid gap-4 sm:grid-cols-4">
            {[
              { name: "Preto",        hex: "#0D0D0D" },
              { name: "Branco",       hex: "#FFFFFF" },
              { name: brand.name,      hex: brand.brandColor.hex ?? "Gradiente", swatchStyle: brandColorStyle },
              ...(brand.slug === "hub" ? [{ name: "Verde escuro", hex: "#0C1C16" }] : []),
            ].map((c) => (
              <div key={c.name} className="flex items-center gap-3">
                <div className="h-9 w-9 shrink-0 rounded-[6px] border border-black/10" style={c.swatchStyle ?? { background: c.hex }} />
                <div>
                  <Typography as="p" variant="body-sm" className="font-semibold text-foreground">{c.name}</Typography>
                  <Typography as="p" variant="code" className="text-muted-foreground">{c.hex}</Typography>
                </div>
              </div>
            ))}
          </div>
          <Typography as="p" variant="body-sm" className="mt-4 text-muted-foreground">
            Nunca aplique o logotipo em cores fora dessa paleta sem aprovação. A consistência cromática é parte essencial da identidade visual da {brandDisplayName}.
          </Typography>
        </div>
      </Section>

      {/* ── 03 · USOS CORRETOS ───────────────────────────────────────────────── */}
      <Section
        eyebrow="Correct Usage"
        title="Usos corretos"
        subtitle="Referências de aplicação que preservam a integridade, legibilidade e consistência visual da marca."
      >
        <div className="grid gap-6 sm:grid-cols-2">

          <div className="ds-card !p-[30px] flex flex-col gap-4" style={{ height: "650px" }}>
            <LogoBox src={LOGO_PRIMARY} alt="Proporção original" fill />
            <div>
              <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Proporção original</Typography>
              <Typography as="p" variant="body-sm" className="mt-1 text-muted-foreground">Logo aplicado com as proporções exatas do arquivo original.</Typography>
            </div>
          </div>

          <div className="ds-card !p-[30px] flex flex-col gap-4" style={{ height: "650px" }}>
            <LogoBox
              src={correctColorUsage.logoSrc}
              alt={correctColorUsage.alt}
              bg={correctColorUsage.bg}
              bgStyle={correctColorUsage.bgStyle}
              imgFilter={correctColorUsage.filter}
              fill
            />
            <div>
              <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">{correctColorUsage.title}</Typography>
              <Typography as="p" variant="body-sm" className="mt-1 text-muted-foreground">{correctColorUsage.desc}</Typography>
            </div>
          </div>

          <div className="ds-card !p-[30px] flex flex-col gap-4" style={{ height: "650px" }}>
            <div className="relative flex-1 rounded-[10px] bg-white p-8">
              <div className="pointer-events-none absolute inset-5 rounded-[8px] border border-dashed border-black/45" />
              <div className="relative z-10 flex h-full items-center justify-center">
                <img src={LOGO_PRIMARY} alt="Com área de respiro"
                  style={{
                    display: "block",
                    width: logoSize(LOGO_PRIMARY)?.width ?? "auto",
                    height: logoSize(LOGO_PRIMARY)?.height ?? "auto",
                    maxWidth: "90%",
                    objectFit: "contain",
                    margin: "0 auto",
                  }} />
              </div>
            </div>
            <div>
              <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Área de respiro preservada</Typography>
              <Typography as="p" variant="body-sm" className="mt-1 text-muted-foreground">Espaçamento mínimo mantido em todos os lados do logotipo.</Typography>
            </div>
          </div>

          <div className="ds-card !p-[30px] flex flex-col gap-4" style={{ height: "650px" }}>
            <div className="flex flex-1 items-center justify-center rounded-[10px] bg-white p-8">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full p-[18px]"
                style={avatarSymbol.bgStyle ?? { background: avatarSymbol.bg }}
              >
                <img
                  src={avatarSymbol.src}
                  alt="Símbolo em avatar"
                  style={{
                    display: "block",
                    width: avatarSymbol.size,
                    height: "auto",
                    maxWidth: "none",
                    flexShrink: 0,
                    ...(avatarSymbol.filter ? { filter: avatarSymbol.filter } : {}),
                  }}
                />
              </div>
            </div>
            <div>
              <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Símbolo em avatar</Typography>
              <Typography as="p" variant="body-sm" className="mt-1 text-muted-foreground">Símbolo compacto com respiro interno, ideal para perfis e apps.</Typography>
            </div>
          </div>

        </div>
      </Section>

      {/* ── 04 · ÁREA DE PROTEÇÃO ────────────────────────────────────────────── */}
      <Section
        eyebrow="Clear Space"
        title="Área de proteção"
        subtitle="O logotipo deve manter uma zona livre ao redor. Nenhum elemento externo — texto, borda, imagem ou ícone — deve invadir essa área mínima."
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            { name: "Logo principal", src: LOGO_PRIMARY },
            { name: "Logo vertical",  src: LOGO_VERTICAL },
            { name: "Wordmark",       src: LOGO_WORDMARK },
            { name: "Símbolo",        src: LOGO_SYMBOL },
          ].map((item) => (
            <div key={item.name} className="ds-card !p-[30px] flex flex-col" style={{ height: "650px" }}>
              <div
                className="relative flex-1 flex items-center justify-center rounded-[10px] bg-white p-8"
                style={{ containerType: "inline-size" }}
              >
                <div className="pointer-events-none absolute inset-5 rounded-[8px] border border-dashed border-black/45" />
                <img
                  src={item.src}
                  alt={item.name}
                  className="relative z-10"
                  style={{
                    display: "block",
                    width: logoSize(item.src, logoVersionMaxWidth)?.width ?? "auto",
                    height: logoSize(item.src, logoVersionMaxWidth)?.height ?? "auto",
                    maxWidth: "90%",
                    objectFit: "contain",
                    margin: "0 auto",
                  }}
                />
              </div>
              <Typography as="p" variant="label" className="mt-5 normal-case tracking-normal text-foreground">{item.name}</Typography>
            </div>
          ))}
        </div>

        <div className="ds-card !p-[30px] mt-6">
          <Typography as="p" variant="label" className="mb-3 normal-case tracking-normal text-foreground">Regra de proteção</Typography>
          <Typography as="p" variant="body-sm" className="text-muted-foreground">
            A área mínima de proteção ao redor do logotipo corresponde à altura do símbolo da marca. Em interfaces digitais, mantenha pelo menos{" "}
            <code className="rounded bg-black/5 px-1 font-mono text-xs text-foreground">24px</code>{" "}
            de afastamento em todos os lados. Em materiais impressos, escale proporcionalmente. Essa regra vale para todas as versões — principal, vertical, wordmark e símbolo.
          </Typography>
        </div>
      </Section>

      {/* ── 05 · TAMANHO MÍNIMO ──────────────────────────────────────────────── */}
      <Section
        eyebrow="Minimum Size"
        title="Tamanho mínimo"
        subtitle="Abaixo dos tamanhos recomendados, a legibilidade fica comprometida — o símbolo perde detalhes e o nome se torna ilegível."
      >
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { name: "Logo principal", min: "120px", ideal: "160px+" },
            { name: "Logo vertical",  min: "96px",  ideal: "140px+" },
            { name: "Wordmark",       min: "80px",  ideal: "120px+" },
            { name: "Símbolo",        min: "24px",  ideal: "32px+"  },
          ].map((item) => (
            <div key={item.name} className="ds-card !p-[30px] flex flex-col gap-3">
              <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">{item.name}</Typography>
              <div className="flex flex-col gap-2 pt-1">
                <div className="flex items-center justify-between">
                  <Typography as="p" variant="body-sm" className="text-muted-foreground">Mínimo</Typography>
                  <code className="rounded bg-black/5 px-2 py-0.5 font-mono text-[11px] text-foreground">{item.min}</code>
                </div>
                <div className="flex items-center justify-between border-t border-black/5 pt-2">
                  <Typography as="p" variant="body-sm" className="text-muted-foreground">Ideal</Typography>
                  <code className="rounded bg-[#5FC318]/10 px-2 py-0.5 font-mono text-[11px] text-primary">{item.ideal}</code>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="ds-card !p-[30px] mt-6">
          <Typography as="p" variant="body-sm" className="text-muted-foreground">
            Os tamanhos mínimos existem para proteger a leitura, evitar perda de detalhe e garantir que a marca permaneça reconhecível em todos os dispositivos e densidades de tela.
            Prefira sempre o símbolo isolado quando o espaço disponível for inferior ao mínimo do logo completo.
          </Typography>
        </div>
      </Section>

      {/* ── 06 · GUIA DE ESCOLHA ─────────────────────────────────────────────── */}
      <Section
        eyebrow="Logo Selection"
        title="Guia de escolha"
        subtitle="Critério simples para selecionar a versão correta conforme o contexto de aplicação."
      >
        <div className="ds-card !p-[30px]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-left">
              <thead>
                <tr className="border-b border-black/8">
                  <th className="pb-3 pr-6 font-normal">
                    <Typography as="span" variant="label" className="normal-case tracking-normal text-foreground">Contexto</Typography>
                  </th>
                  <th className="pb-3 pr-6 font-normal">
                    <Typography as="span" variant="label" className="normal-case tracking-normal text-foreground">Versão</Typography>
                  </th>
                  <th className="pb-3 font-normal">
                    <Typography as="span" variant="label" className="normal-case tracking-normal text-foreground">Motivo</Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { ctx: "Header institucional",   ver: "Logo principal", why: "Maior clareza e reconhecimento de marca" },
                  { ctx: "Avatar / Perfil",         ver: "Símbolo",        why: "Melhor leitura em espaço reduzido" },
                  { ctx: "Capa de apresentação",    ver: "Logo vertical",  why: "Composição centralizada mais equilibrada" },
                  { ctx: "Rodapé de documento",     ver: "Wordmark",       why: "Assinatura discreta sem competir com o conteúdo" },
                  { ctx: "App icon / Favicon",      ver: "Símbolo",        why: "Reconhecimento compacto em alta redução" },
                  { ctx: "Documento comercial",     ver: "Logo principal", why: "Presença institucional completa" },
                  { ctx: "Thumbnail de conteúdo",  ver: "Símbolo",        why: "Melhor leitura em baixa resolução" },
                  { ctx: "E-mail marketing",        ver: "Logo principal", why: "Identificação clara no topo da comunicação" },
                  { ctx: "Peça editorial / Capa",   ver: "Logo vertical",  why: "Layout vertical favorece a composição" },
                  { ctx: "Assinatura mínima",       ver: "Wordmark",       why: "Texto limpo quando símbolo é dispensável" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white last:border-0">
                    <td className="py-3 pr-6">
                      <Typography as="p" variant="body-sm" className="text-foreground">{row.ctx}</Typography>
                    </td>
                    <td className="py-3 pr-6">
                      <Badge
                        variant="secondary"
                        className="min-h-8 px-2.5 py-0 text-[10px] font-semibold uppercase tracking-wider"
                      >
                        {row.ver}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <Typography as="p" variant="body-sm" className="text-muted-foreground">{row.why}</Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* ── 08 · NOMENCLATURA ────────────────────────────────────────────────── */}
      <Section
        eyebrow="File Naming"
        title="Nomenclatura de arquivos"
        subtitle="Padrão de nomeação para todos os assets do logotipo, garantindo consistência e rastreabilidade no repositório."
      >
        <div className="grid gap-6 sm:grid-cols-2">

          <div className="ds-card !p-[30px] flex flex-col gap-5">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Padrão</Typography>
            <div className="rounded-[10px] bg-muted px-5 py-4">
              <code className="font-mono text-[13px] font-semibold text-foreground">{filePrefix}-[tipo]-[cor].[formato]</code>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { label: "Tipos",    items: ["primary", "vertical", "wordmark", "symbol"] },
                { label: "Cores",    items: brand.colors.map((color) => color.suffix) },
                { label: "Formatos", items: ["svg", "png"] },
              ].map((group) => (
                <div key={group.label}>
                  <Typography as="p" variant="caption" className="mb-2 normal-case tracking-normal text-muted-foreground">{group.label}</Typography>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <code key={item} className="rounded-[4px] bg-muted px-2 py-0.5 font-mono text-[11px] text-foreground">{item}</code>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ds-card !p-[30px] flex flex-col gap-5">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Exemplos</Typography>
            <div className="flex flex-col gap-2">
              {[
                `${filePrefix}-primary-dark.svg`,
                `${filePrefix}-primary-light.svg`,
                `${filePrefix}-primary-${brand.colors[2]?.suffix ?? "brand"}.svg`,
                `${filePrefix}-vertical-dark.svg`,
                `${filePrefix}-vertical-light.png`,
                `${filePrefix}-wordmark-dark.svg`,
                `${filePrefix}-symbol-dark.svg`,
                `${filePrefix}-symbol-${brand.colors[2]?.suffix ?? "brand"}.png`,
                `${filePrefix}-symbol-${brand.colors.at(-1)?.suffix ?? "brand"}.svg`,
              ].map((name) => (
                <div key={name} className="rounded-[6px] bg-muted px-4 py-2">
                  <code className="font-mono text-[11px] text-foreground">{name}</code>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="ds-card !p-[30px] mt-6">
          <Typography as="p" variant="label" className="mb-4 normal-case tracking-normal text-foreground">Estrutura do repositório</Typography>
          <div className="rounded-[10px] bg-muted p-5">
            <pre className="overflow-x-auto font-mono text-[12px] leading-[1.8] text-foreground">{`public/logos/\n├── primary/\n│   ├── ${filePrefix}-primary-[cor].svg\n│   └── ${filePrefix}-primary-[cor].png\n├── vertical/\n│   ├── ${filePrefix}-vertical-[cor].svg\n│   └── ${filePrefix}-vertical-[cor].png\n├── wordmark/\n│   ├── ${filePrefix}-wordmark-[cor].svg\n│   └── ${filePrefix}-wordmark-[cor].png\n└── symbol/\n    ├── ${filePrefix}-symbol-[cor].svg\n    └── ${filePrefix}-symbol-[cor].png`}</pre>
          </div>
        </div>
      </Section>

      {/* ── 09 · ACESSIBILIDADE ──────────────────────────────────────────────── */}
      <Section
        eyebrow="Accessibility"
        title="Legibilidade e contraste"
        subtitle="Diretrizes para garantir que o logotipo permaneça legível e reconhecível em qualquer contexto de aplicação."
      >
        <div className="flex flex-col gap-0">
          <RuleRow index="01" title="Contraste mínimo" note="O logotipo deve sempre ter contraste suficiente com o fundo. Nunca aplique versão escura sobre fundo escuro, nem versão clara sobre fundo claro sem ajuste de cor." />
          <RuleRow index="02" title="Tamanho preservado" note="Não use abaixo dos tamanhos mínimos estabelecidos. Em espaços muito pequenos, prefira o símbolo em vez do logo completo ou wordmark." />
          <RuleRow index="03" title="Hierarquia visual" note="O logotipo não deve competir com títulos, chamadas principais ou elementos de interface críticos. Preserve a hierarquia visual da página." />
          <RuleRow index="04" title="Área de respiro constante" note="Mantenha sempre o espaço mínimo de proteção ao redor. Nenhum elemento deve invadir essa zona, seja texto, borda, imagem ou ícone." />
          <RuleRow index="05" title="SVG em interfaces digitais" note="Use sempre SVG para web e interfaces digitais. Garante nitidez em qualquer resolução, incluindo telas Retina e 4K." />
          <RuleRow index="06" title="Fundos complexos e imagens" note="Ao aplicar sobre imagens ou fundos muito carregados, use overlay, container de cor ou área de proteção para preservar a legibilidade do logo." />
        </div>
      </Section>

      <FloatingBrandSwitcher currentSlug={brand.slug} />
      <FoundationFooter />
    </div>
  );
}

export default function LogotipoPage() {
  return <LogotipoPageContent brand={LOGO_BRANDS[0]} />;
}
