import { IconCloudBrand } from "@/components/magicui/icon-cloud-brand";
import { Typography } from "@/components/typography";
import {
  FoundationFooter,
  FoundationPageHeader,
  Section,
} from "../../foundation-sections";

function CodeBlock({ title, code }: { title: string; code: string }) {
  return (
    <div className="flex flex-col gap-3">
      <Typography as="p" variant="label" className="normal-case tracking-normal text-black">
        {title}
      </Typography>
      <div className="bg-[#D4D4D4] p-5">
        <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[12px] leading-6 text-foreground">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

const brands = [
  { slug: "hub", name: "MASI", color: "#AFF000", darkSrc: "/logos/symbol/masi-symbol-dark.png" },
  { slug: "academy", name: "Academy", color: "#9E00FF", darkSrc: "/logos/brands/academy/symbol/academy-symbol-dark.png" },
  { slug: "workshop", name: "Workshop", color: "#F54A00", darkSrc: "/logos/brands/workshop/symbol/workshop-symbol-dark.png" },
  { slug: "experience", name: "Experience", color: "#FF0055", darkSrc: "/logos/brands/experience/symbol/experience-symbol-dark.png" },
  { slug: "action", name: "Action", color: "#0B37F7", darkSrc: "/logos/brands/action/symbol/action-symbol-dark.png" },
  { slug: "aceleracao", name: "Aceleração", color: "#002BF5", darkSrc: "/logos/brands/aceleracao/symbol/aceleracao-symbol-dark.png" },
  { slug: "founder", name: "Founder", color: "#282828", darkSrc: "/logos/brands/founder/symbol/founder-symbol-dark.png" },
  { slug: "advisor", name: "Advisor", color: "#5C00FF", darkSrc: "/logos/brands/advisor/symbol/advisor-symbol-dark.png" },
];

export default function IconCloudPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Icon Cloud"
        description="Componente interativo de nuvem de ícones para exibir símbolos de marca, logos do ecossistema e identidades visuais em composição espacial dinâmica."
      />

      <Section
        title="Visão geral"
        subtitle="Esfera 3D interativa via canvas. O cursor controla a velocidade de rotação e arrastar rotaciona manualmente. Instalado via Magic UI registry."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="ds-card !p-[30px] flex flex-col items-center gap-2">
            <Typography as="p" variant="caption" className="self-start font-bold text-primary">
              Preview interativo
            </Typography>
            <Typography as="p" variant="body-sm" className="self-start text-muted-foreground">
              16 símbolos — 8 marcas do ecossistema MASI nas cores de marca e 8 ícones do design system. Arraste para rotacionar.
            </Typography>
            <div className="mt-4 flex justify-center">
              <IconCloudBrand variant="brandColorsWithIcons" />
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="ds-card !p-[30px]">
              <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
                Import do componente base
              </Typography>
              <Typography as="p" variant="code" className="mt-3 text-foreground">
                {`import { IconCloud } from "@/components/ui/icon-cloud"`}
              </Typography>
            </div>
            <div className="ds-card !p-[30px]">
              <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
                Import do wrapper de marca
              </Typography>
              <Typography as="p" variant="code" className="mt-3 text-foreground">
                {`import { IconCloudBrand } from "@/components/magicui/icon-cloud-brand"`}
              </Typography>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Origem
            </Typography>
            <Typography as="p" variant="body-sm" className="mt-3 text-muted-foreground">
              Instalado via Magic UI registry usando{" "}
              <code className="font-mono text-foreground">
                {`npx shadcn@latest add "https://magicui.design/r/icon-cloud"`}
              </code>
              . O componente é auto-contido — implementação canvas-based sem dependências externas adicionais. O arquivo reside em{" "}
              <code className="font-mono text-foreground">src/components/ui/icon-cloud.tsx</code>.
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Ecossistema de marcas MASI"
        subtitle="Quatro variantes usando os símbolos das marcas disponíveis no projeto. As variantes &quot;with icons&quot; combinam os 8 símbolos de marca com 8 ícones do design system."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="ds-card !p-[30px] flex flex-col gap-4">
            <div>
              <Typography as="p" variant="caption" className="font-bold text-primary">
                Brand Colors
              </Typography>
              <Typography as="p" variant="body-sm" className="mt-1 text-muted-foreground">
                Uma variante colorida de cada marca — 8 símbolos.
              </Typography>
            </div>
            <div className="flex justify-center">
              <IconCloudBrand variant="brandColors" />
            </div>
          </div>

          <div className="ds-card !p-[30px] flex flex-col gap-4">
            <div>
              <Typography as="p" variant="caption" className="font-bold text-primary">
                Brand Colors + Ícones
              </Typography>
              <Typography as="p" variant="body-sm" className="mt-1 text-muted-foreground">
                8 símbolos coloridos de marca + 8 ícones do design system — 16 itens no total.
              </Typography>
            </div>
            <div className="flex justify-center">
              <IconCloudBrand variant="brandColorsWithIcons" />
            </div>
          </div>

          <div className="ds-card !p-[30px] flex flex-col gap-4">
            <div>
              <Typography as="p" variant="caption" className="font-bold text-primary">
                Dark
              </Typography>
              <Typography as="p" variant="body-sm" className="mt-1 text-muted-foreground">
                Uma variante dark de cada marca — 8 símbolos.
              </Typography>
            </div>
            <div className="flex justify-center">
              <IconCloudBrand variant="dark" />
            </div>
          </div>

          <div className="ds-card !p-[30px] flex flex-col gap-4">
            <div>
              <Typography as="p" variant="caption" className="font-bold text-primary">
                Dark + Ícones
              </Typography>
              <Typography as="p" variant="body-sm" className="mt-1 text-muted-foreground">
                8 símbolos dark de marca + 8 ícones do design system — 16 itens no total.
              </Typography>
            </div>
            <div className="flex justify-center">
              <IconCloudBrand variant="darkWithIcons" />
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Assets do ecossistema"
        subtitle="Marcas e símbolos usados na composição. Todos os assets são SVG/PNG locais em /public/logos."
      >
        <div className="flex flex-col gap-3">
          {brands.map((brand) => (
            <div key={brand.slug} className="ds-card !p-[30px] flex items-center gap-4">
              <div
                className="flex size-10 shrink-0 items-center justify-center rounded-[10px]"
                style={{ backgroundColor: brand.color }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={brand.darkSrc} alt={brand.name} className="size-6 object-contain" style={{ filter: "brightness(0) invert(1)" }} />
              </div>
              <div className="min-w-0 flex-1">
                <Typography as="p" variant="body" className="font-semibold text-foreground">
                  {brand.name}
                </Typography>
                <Typography as="p" variant="code" className="mt-0.5 break-all text-muted-foreground">
                  {brand.slug === "hub"
                    ? "/logos/symbol/masi-symbol-[cor].png"
                    : `/logos/brands/${brand.slug}/symbol/${brand.slug}-symbol-[cor].png`}
                </Typography>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                {["dark", "brand"].map((variant) => (
                  <div
                    key={variant}
                    className="rounded border border-black/10 px-2 py-0.5"
                    style={{
                      backgroundColor: variant === "brand" ? brand.color : "#0D0D0D",
                      color: variant === "brand" && (brand.color === "#AFF000" || brand.color === "#FFEA00") ? "#0D0D0D" : "#FFFFFF",
                    }}
                  >
                    <Typography as="span" variant="code" className="text-[10px]">
                      {variant === "brand" && brand.slug === "hub" ? "green" : variant}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Padrão de implementação"
        subtitle="Snippets práticos para usar o IconCloud no projeto."
      >
        <div className="flex flex-col gap-6">
          <CodeBlock
            title="Uso com wrapper de marca"
            code={`import { IconCloudBrand } from "@/components/magicui/icon-cloud-brand"

<IconCloudBrand variant="brandColors" />          // brand color × 1 (8 itens)
<IconCloudBrand variant="brandColorsWithIcons" />  // brand color + ícones MN (16 itens)
<IconCloudBrand variant="dark" />                  // dark × 1 (8 itens)
<IconCloudBrand variant="darkWithIcons" />         // dark + ícones MN (16 itens)`}
          />

          <CodeBlock
            title="Uso direto com imagens customizadas"
            code={`import { IconCloud } from "@/components/ui/icon-cloud"

const images = [
  "/logos/symbol/masi-symbol-dark.png",
  "/logos/brands/academy/symbol/academy-symbol-brand.png",
  "/logos/brands/advisor/symbol/advisor-symbol-brand.png",
  // ...
]

<IconCloud images={images} />`}
          />

          <CodeBlock
            title="Acessando o mapa de imagens diretamente"
            code={`import { brandCloudImages } from "@/components/magicui/icon-cloud-brand"
import { IconCloud } from "@/components/ui/icon-cloud"

// brandCloudImages.brandColors          — brand color × 1 (8 itens)
// brandCloudImages.brandColorsWithIcons — brand color + ícones MN (16 itens)
// brandCloudImages.dark                 — dark × 1 (8 itens)
// brandCloudImages.darkWithIcons        — dark + ícones MN (16 itens)

<IconCloud images={brandCloudImages.brandColorsWithIcons} />`}
          />
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="API do IconCloud disponível no projeto."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              IconCloud — props principais
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                {
                  name: "images",
                  type: "string[]",
                  note: "Array de URLs de imagens. Aceita caminhos locais (/public) ou URLs externas com CORS habilitado. Cada imagem é renderizada recortada em círculo.",
                },
                {
                  name: "icons",
                  type: "React.ReactNode[]",
                  note: "Array de React nodes (SVG ou JSX). Alternativa ao images para ícones SVG diretos.",
                },
              ].map((item) => (
                <div key={item.name} className="border-b border-white pb-4 last:border-0 last:pb-0">
                  <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
                    {item.name}
                  </Typography>
                  <Typography as="p" variant="code" className="mt-1 text-foreground">
                    {item.type}
                  </Typography>
                  <Typography as="p" variant="body-sm" className="mt-2 text-muted-foreground">
                    {item.note}
                  </Typography>
                </div>
              ))}
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              IconCloudBrand — props
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                {
                  name: "variant",
                  type: `"brandColors" | "brandColorsWithIcons" | "dark" | "darkWithIcons"`,
                  note: `Seleciona o subconjunto de imagens do ecossistema MASI. As variantes "with icons" combinam os 8 símbolos de marca com 8 ícones do design system MN. Padrão: "brandColors".`,
                },
              ].map((item) => (
                <div key={item.name} className="border-b border-white pb-4 last:border-0 last:pb-0">
                  <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
                    {item.name}
                  </Typography>
                  <Typography as="p" variant="code" className="mt-1 text-foreground">
                    {item.type}
                  </Typography>
                  <Typography as="p" variant="body-sm" className="mt-2 text-muted-foreground">
                    {item.note}
                  </Typography>
                </div>
              ))}

              <div>
                <Typography as="p" variant="h3" className="mb-3 text-foreground">
                  Comportamento do canvas
                </Typography>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "Tamanho fixo", value: "400 × 400 px" },
                    { label: "Rotação auto", value: "Velocidade proporcional à distância do cursor" },
                    { label: "Drag", value: "Rotação manual ao arrastar" },
                    { label: "Click em ícone", value: "Anima para centralizar o ícone clicado" },
                    { label: "Profundidade", value: "Opacidade e escala variam com a posição Z" },
                  ].map((spec) => (
                    <div key={spec.label} className="flex items-start gap-3 border-b border-white py-2 last:border-0">
                      <Typography as="p" variant="code" className="w-32 shrink-0 text-muted-foreground">
                        {spec.label}
                      </Typography>
                      <Typography as="p" variant="body-sm" className="text-foreground">
                        {spec.value}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Acessibilidade"
        subtitle="Considerações para uso responsável do IconCloud em interfaces reais."
      >
        <div className="grid gap-4 xl:grid-cols-2">
          {[
            {
              index: "01",
              title: "Componente decorativo",
              note: "O IconCloud é primariamente visual. Evite usá-lo como o único meio de comunicar informação importante. O canvas já inclui role=\"img\" e aria-label=\"Interactive 3D Icon Cloud\".",
            },
            {
              index: "02",
              title: "Redução de movimento",
              note: "O componente não implementa prefers-reduced-motion nativamente. Para contextos onde movimento pode causar desconforto, considere renderizá-lo apenas após verificar a preferência do usuário.",
            },
            {
              index: "03",
              title: "Ícones clicáveis",
              note: "Se os ícones forem acionáveis, o canvas não oferece foco por teclado. Considere adicionar uma lista acessível de links abaixo do canvas para navegação sem mouse.",
            },
            {
              index: "04",
              title: "Contraste e legibilidade",
              note: "Ícones com fundo transparente em canvas podem ter contraste variável. Prefira usar os símbolos na versão dark ou brand-color sobre fundos neutros do sistema.",
            },
          ].map((item) => (
            <div key={item.index} className="ds-card !p-[30px] flex items-start gap-4">
              <span className="w-8 shrink-0 font-mono text-[10px] font-bold text-primary">
                {item.index}
              </span>
              <div>
                <Typography as="p" variant="body" className="font-semibold text-foreground">
                  {item.title}
                </Typography>
                <Typography as="p" variant="body-sm" className="mt-1 text-muted-foreground">
                  {item.note}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
