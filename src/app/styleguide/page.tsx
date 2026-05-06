import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ChamferedPanel } from "@/components/chamfered-panel";
import { Typography } from "@/components/typography";
import { FoundationFooter, FoundationPageHeader, Section } from "./foundation-sections";

// ── Color Swatch ──────────────────────────────────────────────────────────────

function ColorSwatch({
  name,
  hex,
  swatchStyle,
  cssVar,
  note,
  lightText = false,
}: {
  name: string;
  hex: string;
  swatchStyle?: React.CSSProperties;
  cssVar?: string | null;
  note?: string;
  lightText?: boolean;
}) {
  return (
    <div
      className="w-full overflow-hidden rounded-[10px] bg-white sm:w-[230px]"
    >
      <div
        className="flex h-20 items-end px-3 pb-2.5"
        style={swatchStyle ?? { backgroundColor: hex }}
      >
        <Typography
          as="span"
          variant="label"
          className="font-mono normal-case tracking-normal"
          style={{ color: lightText ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.5)" }}
        >
          {hex}
        </Typography>
      </div>
      <div className="flex flex-col gap-1 p-3">
        <Typography as="p" variant="body" className="font-semibold text-foreground">{name}</Typography>
        {cssVar && <Typography as="p" variant="code" className="text-muted-foreground">{cssVar}</Typography>}
        {note && <Typography as="p" variant="code" className="text-muted-foreground">{note}</Typography>}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function StyleguidePage() {
  const brandColors = [
    { name: "Brand Green", cssVar: "--brand-green", hex: "#AFF000", lightText: false },
    { name: "Primary", cssVar: "--primary", hex: "#5FC318", lightText: true },
    { name: "Brand Dark Green", cssVar: "--brand-dark-green", hex: "#0C1C16", lightText: true },
  ];

  const brandGreenScale = [
    { name: "50", hex: "#F6FFE0", lightText: false },
    { name: "100", hex: "#EBFFC2", lightText: false },
    { name: "200", hex: "#DAFF8A", lightText: false },
    { name: "300", hex: "#C8FF52", lightText: false },
    { name: "400", hex: "#BAFF1F", lightText: false },
    { name: "500", hex: "#AFF000", lightText: false },
    { name: "600", hex: "#8CCB00", lightText: false },
    { name: "700", hex: "#699A00", lightText: true },
    { name: "800", hex: "#466800", lightText: true },
    { name: "900", hex: "#243600", lightText: true },
  ];

  const neutralGrayScale = [
    { name: "50", hex: "#F8F8F8", lightText: false },
    { name: "100", hex: "#ECECEC", lightText: false, swatchStyle: { backgroundColor: "#ECECEC", border: "1px solid #FFFFFF" } },
    { name: "200", hex: "#D4D4D4", lightText: false },
    { name: "300", hex: "#BDBDBD", lightText: false },
    { name: "400", hex: "#A3A3A3", lightText: false },
    { name: "500", hex: "#8A8A8A", lightText: true },
    { name: "600", hex: "#6E6E6E", lightText: true },
    { name: "700", hex: "#545454", lightText: true },
    { name: "800", hex: "#363636", lightText: true },
    { name: "900", hex: "#1F1F1F", lightText: true },
  ];

  const semanticColors = [
    { name: "Success", cssVar: "--success", hex: "#5FC318", lightText: true },
    { name: "Warning", cssVar: "--warning", hex: "#F58A18", lightText: false },
    { name: "Info", cssVar: "--info", hex: "#188AF5", lightText: true },
    { name: "Destructive", cssVar: "--destructive", hex: "#F55145", lightText: true },
  ];

  const structuralColors = [
    { name: "Page Background", cssVar: "--background", hex: "#D4D4D4", lightText: false },
    { name: "Section", cssVar: "--background-section", hex: "#ECECEC", lightText: false, swatchStyle: { backgroundColor: "#ECECEC", border: "1px solid #FFFFFF" } },
    { name: "Card", cssVar: "--card", hex: "#FFFFFF", lightText: false },
  ];

  const otherBrandColors = [
    { name: "PAM", hex: "#002BF5", lightText: true },
    {
      name: "Action",
      hex: "#0B37F7 -> #3A67FF",
      lightText: true,
      swatchStyle: { background: "linear-gradient(30deg, #0B37F7 0%, #3A67FF 100%)" },
    },
    { name: "MXP", hex: "#FF0055", lightText: true },
    { name: "Advisor", hex: "#5C00FF", lightText: true },
    {
      name: "Founder",
      hex: "#282828 -> #666666",
      lightText: true,
      swatchStyle: { background: "linear-gradient(30deg, #282828 0%, #666666 100%)" },
    },
    { name: "Workshop", hex: "#F54A00", lightText: true },
    { name: "Academy", hex: "#9E00FF", lightText: true },
    { name: "Webinar", hex: "#FFEA00", lightText: false },
  ];

  const textColors = [
    { name: "Foreground", hex: "#000000", note: "Títulos e textos de maior hierarquia.", lightText: true },
    { name: "Text Secondary / Muted", hex: "#474747", note: "Corpo de texto, subtítulos, placeholders.", lightText: true },
    { name: "Sidebar Foreground", hex: "#1F1F1F", note: "Texto e ícones da navegação.", lightText: true },
  ];

  const typeScale = [
    { variant: "display" as const, label: "Display", specs: "48px · Extrabold", sample: "Gestão e Relacionamento" },
    { variant: "h1" as const, label: "H1", specs: "32px · Bold", sample: "Dashboard" },
    { variant: "h2" as const, label: "H2", specs: "24px · Bold", sample: "Mentorados ativos" },
    { variant: "h3" as const, label: "H3", specs: "18px · Semibold", sample: "Resumo financeiro" },
    { variant: "body-lg" as const, label: "Body LG", specs: "18px · Regular", sample: "Texto de apoio para blocos de destaque ou descrições longas." },
    { variant: "body" as const, label: "Body", specs: "15px · Regular", sample: "Texto padrão para conteúdo de cards, descrições e parágrafos gerais." },
    { variant: "body-sm" as const, label: "Body SM", specs: "13px · Regular", sample: "Texto secundário para notas, datas e informações complementares." },
    { variant: "label" as const, label: "Label", specs: "12px · Semibold · Uppercase", sample: "EYEBROW · CATEGORIA · TAG" },
    { variant: "caption" as const, label: "Caption", specs: "11px · Medium · Uppercase", sample: "LEGENDA · STATUS · METADATA" },
  ];

  const spacingTokens = [
    { name: "--gap-sm", value: 16, usage: "Gap entre elementos pequenos e inline" },
    { name: "--gap-md", value: 24, usage: "Gap padrão entre cards" },
    { name: "--gap-lg", value: 30, usage: "Gap entre sections e blocos maiores" },
    { name: "--spacing-page", value: 30, usage: "Respiro externo entre a borda do background global e as sections" },
    { name: "--section-padding-x", value: 60, usage: "Padding lateral interno da section para todo o conteúdo" },
    { name: "--section-padding-y", value: 80, usage: "Padding superior e inferior interno da section" },
  ];

  const radiusTokens = [
    { name: "XS", px: 4 },
    { name: "SM", px: 6 },
    { name: "Base", px: 10, isMain: true },
    { name: "LG", px: 16 },
    { name: "XL", px: 24 },
    { name: "Full", px: 9999 },
  ];

  const shadowTokens = [
    { name: "None", shadow: "none", usage: "Elementos inline, sem elevação" },
    { name: "Card", shadow: "0 12px 28px rgba(15,23,42,0.06)", usage: "Cards de conteúdo" },
    { name: "Section", shadow: "0 16px 40px rgba(15,23,42,0.08)", usage: "Sections principais" },
    { name: "Sidebar", shadow: "0 18px 40px rgba(15,23,42,0.08)", usage: "Sidebar e painéis" },
    { name: "Elevated", shadow: "0 12px 28px rgba(15,23,42,0.12)", usage: "Modais, dropdowns" },
  ];

  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Design Tokens"
        description="Base visual do sistema: cor, tipografia, espaçamento, radius e regras de aplicação."
      />

      {/* ── 01 · COLORS (all in one section) ── */}
      <Section title="Paleta de Cores" first>
        <div className="flex flex-col gap-[62px]">

          {/* Neutral Gray */}
          <div>
            <h3 className="ds-h2 mb-4">Neutral Gray</h3>
            <div className="flex flex-wrap gap-6">
              {neutralGrayScale.map((c) => (
                <ColorSwatch key={c.name} {...c} />
              ))}
            </div>
          </div>

          {/* Brand */}
          <div>
            <h3 className="ds-h2 mb-4">Marca Hub</h3>
            <div className="flex flex-wrap gap-6">
              {brandColors.map((c) => (
                <ColorSwatch key={c.name} {...c} />
              ))}
            </div>
          </div>

          {/* Brand Green Scale */}
          <div>
            <h3 className="ds-h2 mb-4">Escala Brand Green</h3>
            <div className="flex flex-wrap gap-6">
              {brandGreenScale.map((c) => (
                <ColorSwatch key={c.name} {...c} />
              ))}
            </div>
          </div>

          {/* Structural */}
          <div>
            <h3 className="ds-h2 mb-4">Cores Estruturais</h3>
            <div className="flex flex-wrap gap-6">
              {structuralColors.map((c) => (
                <ColorSwatch key={c.name} {...c} />
              ))}
            </div>
          </div>

          {/* Other brands */}
          <div>
            <h3 className="ds-h2 mb-4">Outras marcas</h3>
            <div className="flex flex-wrap gap-6">
              {otherBrandColors.map((c) => (
                <ColorSwatch key={c.name} {...c} />
              ))}
            </div>
          </div>

          {/* Semantic */}
          <div>
            <h3 className="ds-h2 mb-4">Cores Semânticas</h3>
            <div className="flex flex-wrap gap-6">
              {semanticColors.map((c) => (
                <ColorSwatch key={c.name} {...c} />
              ))}
            </div>
          </div>

          {/* Text */}
          <div>
            <h3 className="ds-h2 mb-4">Texto</h3>
            <div className="flex flex-wrap gap-6">
              {textColors.map((c) => (
                <ColorSwatch key={c.name} {...c} />
              ))}
            </div>
          </div>

        </div>
      </Section>

      {/* ── 02 · TYPOGRAPHY ── */}
      <Section
        title="Escala tipográfica"
        subtitle="Fonte Inter. 9 níveis hierárquicos — do Display ao Caption."
      >
        <div className="flex flex-col gap-6">
          {typeScale.map((t) => (
            <div key={t.label} className="ds-card !p-[30px] flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-6">
              <div className="w-32 shrink-0">
                <Typography as="p" variant="label" className="text-foreground normal-case tracking-normal">{t.label}</Typography>
                <Typography as="p" variant="caption" className="mt-1 font-mono normal-case tracking-normal">{t.specs}</Typography>
              </div>
              <div className="flex-1 border-l border-black/6 pl-6">
                <Typography variant={t.variant} className="truncate">
                  {t.sample}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 03 · SPACING ── */}
      <Section
        title="Escala de espaçamento"
        subtitle="30px no respiro externo e entre sections. Dentro da section: 60px nas laterais e 80px no topo e na base."
      >
        <div className="flex flex-col gap-6">
          {spacingTokens.map((token) => (
            <div key={token.name} className="ds-card !p-[30px] grid gap-6 xl:grid-cols-[12rem_minmax(0,1fr)] xl:items-center">
              <div>
                <Typography as="p" variant="label" className="font-mono normal-case tracking-normal text-foreground">{token.name}</Typography>
                <Typography as="p" variant="body-sm" className="mt-1">{token.usage}</Typography>
              </div>
              <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
                <div className="max-w-full overflow-x-auto">
                  {token.name.includes("gap") ? (
                    <div
                      className="flex w-fit items-center rounded-[8px] border border-dotted border-black/20 bg-white p-3"
                      style={{ gap: `${token.value}px` }}
                    >
                      <div className="h-8 w-16 rounded-[6px] bg-[#ECECEC]" />
                      <div className="h-8 w-16 rounded-[6px] bg-[#ECECEC]" />
                    </div>
                  ) : (
                    <div
                      className="w-fit rounded-[8px] border border-dotted border-black/20 bg-white"
                      style={{
                        padding:
                          token.name === "--section-padding-y"
                            ? `${token.value}px 12px`
                            : token.name === "--section-padding-x"
                            ? `12px ${token.value}px`
                            : `${token.value}px`,
                      }}
                    >
                      <div className="h-8 w-20 rounded-[6px] bg-[#ECECEC]" />
                    </div>
                  )}
                </div>
                <Typography as="span" variant="caption" className="font-mono normal-case tracking-normal xl:shrink-0">
                  {token.value}px
                </Typography>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-3">
          <div className="ds-card !p-5 sm:!p-6 xl:!p-[30px]">
            <p className="ds-label mb-2">Page Respiro</p>
            <p className="ds-body-sm mb-4 text-muted-foreground">
              O fundo global precisa manter 30px de respiro em toda a extremidade antes da primeira section e entre todas as sections.
            </p>
            <div className="[--demo-card-pad:20px] [--demo-page-gap:20px] [--demo-section-px:20px] [--demo-section-py:28px] bg-[#D4D4D4] p-[var(--demo-page-gap)] sm:[--demo-card-pad:24px] sm:[--demo-page-gap:24px] sm:[--demo-section-px:36px] sm:[--demo-section-py:48px] xl:[--demo-card-pad:30px] xl:[--demo-page-gap:30px] xl:[--demo-section-px:60px] xl:[--demo-section-py:80px]">
              <ChamferedPanel
                strokeColor="#FFFFFF"
                strokeWidth={1}
                innerStyle={{ background: "#ECECEC", borderRadius: 10, padding: "var(--demo-section-py) var(--demo-section-px)" }}
              >
                <div className="rounded-[10px] bg-white p-[var(--demo-card-pad)]">
                  <p className="ds-label mb-2">Card Interno</p>
                  <p className="ds-body-sm text-muted-foreground">
                    Dentro da section, o card continua com 30px em cima, baixo, esquerda e direita.
                  </p>
                </div>
              </ChamferedPanel>
            </div>
          </div>

          <div className="ds-card !p-5 sm:!p-6 xl:!p-[30px]">
            <p className="ds-label mb-2">Section Interna</p>
            <p className="ds-body-sm mb-4 text-muted-foreground">
              Dentro da section, o conteúdo trabalha com 60px nas laterais e 80px no topo e embaixo. Depois, entram os cards quando o conteúdo precisa ficar separado.
            </p>
            <div className="overflow-hidden rounded-[10px] [--demo-card-pad:20px] [--demo-section-px:20px] [--demo-section-py:28px] sm:[--demo-card-pad:24px] sm:[--demo-section-px:36px] sm:[--demo-section-py:48px] xl:[--demo-card-pad:30px] xl:[--demo-section-px:60px] xl:[--demo-section-py:80px]">
              <ChamferedPanel
                strokeColor="#FFFFFF"
                strokeWidth={1}
                innerStyle={{ background: "#ECECEC", borderRadius: 10, padding: "var(--demo-section-py) var(--demo-section-px)" }}
              >
                <div className="rounded-[10px] bg-white p-[var(--demo-card-pad)]">
                  <p className="ds-label mb-2">Conteúdo do Card</p>
                  <p className="ds-body-sm text-muted-foreground">
                    A section organiza o assunto. O card aprofunda o conteúdo com padding interno fixo de 30px.
                  </p>
                </div>
              </ChamferedPanel>
            </div>
          </div>

          <div className="ds-card !p-5 sm:!p-6 xl:!p-[30px]">
            <p className="ds-label mb-2">Card com Padding 30</p>
            <p className="ds-body-sm mb-4 text-muted-foreground">
              Exemplo isolado do card como terceira camada, sempre branco e sempre com 30px em todos os lados.
            </p>
            <div className="rounded-[10px] bg-white p-5 shadow-[var(--shadow-card)] sm:p-6 xl:p-[30px]">
              <p className="ds-label mb-2">Resumo</p>
              <p className="ds-body-sm text-muted-foreground">
                Este bloco existe para validar visualmente o padding constante do card em qualquer contexto.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 04 · BORDER RADIUS ── */}
      <Section
        title="Corner Radius"
        subtitle="10px é o valor base — sections, cards, sidebar. Os demais servem para elementos menores."
      >
        <div className="grid grid-cols-3 gap-6 sm:grid-cols-6">
          {radiusTokens.map((token) => (
            <div key={token.name} className="ds-card !p-[30px] flex flex-col items-center gap-6">
              <div
                className="h-14 w-14 border border-black/10"
                style={{
                  background: "#ECECEC",
                  borderRadius: token.px >= 9999 ? "9999px" : `${token.px}px`,
                }}
              />
              <div className="text-center">
                <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">{token.name}</Typography>
                <Typography as="p" variant="caption" className="font-mono normal-case tracking-normal">
                  {token.px >= 9999 ? "∞" : `${token.px}px`}
                </Typography>
                {token.isMain && (
                  <Typography as="p" variant="caption" className="mt-1 text-primary normal-case tracking-normal">base</Typography>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="ds-card !p-[30px] mt-4">
          <p className="ds-label mb-2">Chanfro da marca</p>
          <p className="ds-body-sm">
            A primeira section de cada página recebe um corte diagonal de{" "}
            <code className="rounded bg-black/5 px-1 py-0.5 font-mono text-xs">32px</code> no canto
            superior esquerdo via{" "}
            <code className="rounded bg-black/5 px-1 py-0.5 font-mono text-xs">
              SVG clipPath + ResizeObserver
            </code>
            .
          </p>
        </div>
      </Section>

      {/* ── 05 · SHADOWS ── */}
      <Section
        title="Sombras"
        subtitle="Sombras suaves em rgba para comunicar elevação. Sections não recebem shadow — apenas cards."
      >
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-5">
          {shadowTokens.map((token) => (
            <div key={token.name} className="ds-card !p-[30px] flex flex-col items-center gap-4 text-center">
              <div
                className="h-20 w-full rounded-[10px] bg-white"
                style={{ boxShadow: token.shadow }}
              />
              <div className="text-center">
                <Typography as="p" variant="body-sm" className="font-semibold text-foreground">{token.name}</Typography>
                <Typography as="p" variant="caption" className="mt-1 normal-case tracking-normal">{token.usage}</Typography>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 06 · COMPONENTS PREVIEW ── */}
      <Section
        title="Preview de Componentes"
        subtitle="Amostra dos componentes usando os tokens do MN Design System"
      >
        <div className="space-y-10">
          {/* Buttons */}
          <div>
            <h3 className="ds-h2 mb-4">Buttons</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button className="bg-brand-green text-black hover:bg-brand-green/90">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button disabled>Disabled</Button>
              <Button size="sm" className="bg-brand-green text-black hover:bg-brand-green/90">Small</Button>
              <Button size="lg" className="bg-brand-green text-black hover:bg-brand-green/90">Large</Button>
            </div>
          </div>

          {/* Badges */}
          <div>
            <h3 className="ds-h2 mb-4">Badges</h3>
            <div className="flex flex-wrap gap-3">
              <Badge className="min-h-8 px-2.5 py-0 bg-brand-green text-black">Default</Badge>
              <Badge variant="secondary" className="min-h-8 px-2.5 py-0">Secondary</Badge>
              <Badge variant="outline" className="min-h-8 px-2.5 py-0">Outline</Badge>
              <Badge variant="destructive" className="min-h-8 px-2.5 py-0">Destructive</Badge>
            </div>
          </div>

          {/* Cards */}
          <div>
            <h3 className="ds-h2 mb-4">Cards</h3>
            <div className="flex flex-col gap-6">
              <Card className="w-[400px] h-[400px] rounded-[10px]" style={{ border: "none" }}>
                <CardHeader>
                  <Badge className="mb-2 min-h-8 w-fit px-2.5 py-0">Gestão</Badge>
                  <CardTitle>Mentorados ativos</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-1">
                  <p className="ds-body-sm">
                    Acompanhe o progresso dos seus mentorados com métricas em tempo real.
                  </p>
                  <Button variant="ghost" size="sm" className="mt-auto -ml-2 text-primary">
                    Ver mais →
                  </Button>
                </CardContent>
              </Card>

              <Card className="w-[400px] h-[400px] rounded-[10px] bg-brand-green text-black" style={{ border: "none" }}>
                <CardHeader>
                  <Badge variant="outline" className="mb-2 min-h-8 w-fit border-black/20 px-2.5 py-0 text-black">
                    Destaque
                  </Badge>
                  <CardTitle>Resumo financeiro</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-1">
                  <Typography as="p" variant="body-sm" className="text-black/70">
                    Controle completo das receitas, despesas e metas financeiras do mês.
                  </Typography>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-auto border-black/20 bg-transparent text-black hover:bg-black/5"
                  >
                    Ver mais →
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Alerts */}
          <div>
            <h3 className="ds-h2 mb-4">Alerts</h3>
            <div className="flex max-w-xl flex-col gap-6">
              <Alert className="rounded-[10px] bg-white" style={{ border: "none" }}>
                <AlertTitle>Design System pronto</AlertTitle>
                <AlertDescription>
                  Os tokens do MN Design System foram aplicados com sucesso.
                </AlertDescription>
              </Alert>
              <Alert variant="destructive" className="rounded-[10px]" style={{ border: "none" }}>
                <AlertTitle>Atenção</AlertTitle>
                <AlertDescription>
                  Verifique as configurações antes de publicar.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <FoundationFooter />
    </div>
  );
}
