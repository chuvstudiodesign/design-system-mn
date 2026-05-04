import * as React from "react";
import { ChamferedPanel } from "../src/components/chamfered-panel";

// ─── Dados ────────────────────────────────────────────────────────────────────

const colorGroups = [
  {
    label: "Marca",
    colors: [
      { name: "Brand Green",      cssVar: "--brand-green",      hex: "#AFF000", note: "Uso restrito. Apenas item ativo da sidebar e onde explicitamente indicado.", lightText: false },
      { name: "Primary",          cssVar: "--primary",          hex: "#5FC318", note: "Verde padrão da UI: botões, ícones, links, badges.", lightText: true },
      { name: "Brand Dark Green", cssVar: "--brand-dark-green", hex: "#0C1C16", note: "Fundos de destaque, banners, alto contraste.", lightText: true },
    ],
  },
  {
    label: "Outras marcas",
    colors: [
      { name: "PAM",      cssVar: null, hex: "#002BF5", note: "Cor principal da marca PAM.", lightText: true },
      { name: "Action",   cssVar: null, hex: "#0B37F7 -> #3A67FF", note: "Gradiente principal da marca Action em 30deg.", lightText: true, swatchStyle: { background: "linear-gradient(30deg, #0B37F7 0%, #3A67FF 100%)" } },
      { name: "MXP",      cssVar: null, hex: "#FF0055", note: "Cor principal da marca MXP.", lightText: true },
      { name: "Advisor",  cssVar: null, hex: "#5C00FF", note: "Cor principal da marca Advisor.", lightText: true },
      { name: "Founder",  cssVar: null, hex: "#282828 -> #666666", note: "Gradiente principal da marca Founder em 30deg.", lightText: true, swatchStyle: { background: "linear-gradient(30deg, #282828 0%, #666666 100%)" } },
      { name: "Workshop", cssVar: null, hex: "#F54A00", note: "Cor principal da marca Workshop.", lightText: true },
      { name: "Academy",  cssVar: null, hex: "#9E00FF", note: "Cor principal da marca Academy.", lightText: true },
      { name: "Webinar",  cssVar: null, hex: "#FFEA00", note: "Cor principal da marca Webinar.", lightText: false },
    ],
  },
  {
    label: "Superfícies",
    colors: [
      { name: "Background Page",    cssVar: null, hex: "#D4D4D4", note: "Fundo base da tela. Nível 0 de elevação.", lightText: false },
      { name: "Background Section", cssVar: null, hex: "#ECECEC", note: "Container de section. Nível 1 de elevação.", lightText: false },
      { name: "Background Card",    cssVar: null, hex: "#FFFFFF", note: "Superfície de card. Nível 2 de elevação.", lightText: false },
    ],
  },
  {
    label: "Texto",
    colors: [
      { name: "Foreground",       cssVar: null, hex: "#000000", note: "Títulos e textos de maior hierarquia.", lightText: true },
      { name: "Text Secondary",   cssVar: null, hex: "#474747", note: "Corpo de texto, subtítulos.", lightText: true },
      { name: "Muted Foreground", cssVar: null, hex: "#474747", note: "Placeholders, labels suaves, metadados.", lightText: true },
    ],
  },
  {
    label: "Sidebar",
    colors: [
      { name: "Background", cssVar: null, hex: "#ECECEC", note: "Fundo da sidebar. Mesmo tom da section.", lightText: false },
      { name: "Foreground", cssVar: null, hex: "#1F1F1F", note: "Texto e ícones da navegação.", lightText: true },
      { name: "Active",     cssVar: null, hex: "#AFF000", note: "Único uso autorizado do Brand Green: item ativo.", lightText: false },
    ],
  },
  {
    label: "Gráficos",
    colors: [
      { name: "Chart 1 · Green",  cssVar: null, hex: "#8AD059", note: "Série principal.", lightText: false },
      { name: "Chart 2 · Blue",   cssVar: null, hex: "#58C7FF", note: "Série 2.", lightText: false },
      { name: "Chart 3 · Orange", cssVar: null, hex: "#FF8B58", note: "Série 3.", lightText: false },
      { name: "Chart 4 · Red",    cssVar: null, hex: "#FB5053", note: "Série 4.", lightText: true },
      { name: "Chart 5 · Indigo", cssVar: null, hex: "#C059FF", note: "Série 5.", lightText: true },
      { name: "Chart 6 · Gray",   cssVar: null, hex: "#A3A3A3", note: "Categoria 'Outros'.", lightText: false },
    ],
  },
];

const typeScale = [
  { cls: "ds-display", label: "Display",   specs: "48px · Extrabold",            fontSize: 48, fontWeight: 800, sample: "Gestão e Relacionamento" },
  { cls: "ds-h1",      label: "H1",        specs: "32px · Bold",                 fontSize: 32, fontWeight: 700, sample: "Dashboard" },
  { cls: "ds-h2",      label: "H2",        specs: "24px · Bold",                 fontSize: 24, fontWeight: 700, sample: "Mentorados ativos" },
  { cls: "ds-h3",      label: "H3",        specs: "18px · Semibold",             fontSize: 18, fontWeight: 600, sample: "Resumo financeiro" },
  { cls: "ds-body-lg", label: "Body LG",   specs: "18px · Regular",              fontSize: 18, fontWeight: 400, sample: "Texto de apoio para blocos de destaque ou descrições longas." },
  { cls: "ds-body",    label: "Body",      specs: "15px · Regular",              fontSize: 15, fontWeight: 400, sample: "Texto padrão para conteúdo de cards, descrições e parágrafos gerais." },
  { cls: "ds-body-sm", label: "Body SM",   specs: "13px · Regular",              fontSize: 13, fontWeight: 400, sample: "Texto secundário para notas, datas e informações complementares." },
  { cls: "ds-label",   label: "Label",     specs: "12px · Semibold · Uppercase", fontSize: 12, fontWeight: 600, sample: "EYEBROW · CATEGORIA · TAG" },
  { cls: "ds-caption", label: "Caption",   specs: "11px · Medium · Uppercase",   fontSize: 11, fontWeight: 500, sample: "LEGENDA · STATUS · METADATA" },
];

const spacingTokens = [
  { name: "gap-sm",       value: 16, cssVar: "--gap-sm",       usage: "Gap entre elementos pequenos e inline" },
  { name: "gap-md",       value: 24, cssVar: "--gap-md",       usage: "Gap padrão entre cards" },
  { name: "gap-lg",       value: 30, cssVar: "--gap-lg",       usage: "Gap entre sections e blocos maiores" },
  { name: "spacing-page", value: 30, cssVar: "--spacing-page", usage: "Respiro externo entre a borda do background global e as sections" },
  { name: "section-x",    value: 60, cssVar: "--section-padding-x", usage: "Padding lateral interno da section para todo o conteúdo" },
  { name: "section-y",    value: 80, cssVar: "--section-padding-y", usage: "Padding superior e inferior interno da section" },
];

const radiusTokens = [
  { name: "XS",   px: 4 },
  { name: "SM",   px: 6 },
  { name: "Base", px: 10, isMain: true },
  { name: "LG",   px: 16 },
  { name: "XL",   px: 24 },
  { name: "Full", px: 9999 },
];

const shadowTokens = [
  { name: "None",     shadow: "none",                                usage: "Elementos inline, sem elevação" },
  { name: "Card",     shadow: "0 12px 28px rgba(15,23,42,0.06)",    usage: "Cards de conteúdo" },
  { name: "Section",  shadow: "0 16px 40px rgba(15,23,42,0.08)",    usage: "Sections principais" },
  { name: "Sidebar",  shadow: "0 18px 40px rgba(15,23,42,0.08)",    usage: "Sidebar e painéis fixos" },
  { name: "Elevated", shadow: "0 12px 28px rgba(15,23,42,0.12)",    usage: "Modais, dropdowns, tooltips" },
];

const elevationLayers = [
  {
    level: "Nível 0 · Page",
    name: "Background Page",
    hex: "#D4D4D4",
    token: "--background-page",
    bg: "#D4D4D4",
    shadow: "none",
    note: "Fundo base. Nunca recebe conteúdo direto.",
  },
  {
    level: "Nível 1 · Section",
    name: "Background Section",
    hex: "#ECECEC",
    token: "--background-section",
    bg: "#ECECEC",
    shadow: "0 16px 40px rgba(15,23,42,0.08)",
    note: "Agrupa cards. Flutua sobre o page background.",
  },
  {
    level: "Nível 2 · Card",
    name: "Background Card",
    hex: "#FFFFFF",
    token: "--background-card",
    bg: "#FFFFFF",
    shadow: "0 12px 28px rgba(15,23,42,0.06)",
    note: "Conteúdo principal. Maior contraste visual.",
  },
];

// ─── Primitivos visuais (sem dependência externa) ─────────────────────────────

const card: React.CSSProperties = {
  borderRadius: 10,
  border: "1px solid #ffffff",
  background: "#ffffff",
  boxShadow: "0 12px 28px rgba(15,23,42,0.06)",
  padding: "20px 24px",
};

const section: React.CSSProperties = {
  width: "100%",
  borderRadius: 10,
  border: "1px solid #ffffff",
  background: "#ECECEC",
  boxShadow: "0 16px 40px rgba(15,23,42,0.08)",
  overflow: "hidden",
};

const sectionInner: React.CSSProperties = {
  padding: "80px 60px",
  display: "flex",
  flexDirection: "column",
  gap: 24,
};

const label: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "#000000",
};

const labelMuted: React.CSSProperties = {
  ...label,
  color: "#474747",
};

const eyebrow: React.CSSProperties = {
  ...labelMuted,
  display: "block",
  marginBottom: 4,
};

const h1Style: React.CSSProperties = {
  fontSize: 32,
  fontWeight: 700,
  lineHeight: 1.1,
  letterSpacing: "-0.02em",
  color: "#000000",
  margin: 0,
};

const h3Style: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 600,
  lineHeight: 1.25,
  letterSpacing: "-0.02em",
  color: "#000000",
  margin: 0,
};

const bodyStyle: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 400,
  lineHeight: 1.6,
  color: "#474747",
  margin: 0,
};

const monoSm: React.CSSProperties = {
  fontFamily: "monospace",
  fontSize: 10,
  color: "#474747",
};

// ─── Sub-componentes ─────────────────────────────────────────────────────────

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ ...card, ...style }}>{children}</div>;
}

function SectionBlock({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ ...section, ...style }}>
      <div style={sectionInner}>{children}</div>
    </div>
  );
}

function TitleBlock({ eyebrowText, title, subtitle }: { eyebrowText?: string; title: string; subtitle?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {eyebrowText && <span style={eyebrow}>{eyebrowText}</span>}
      <h1 style={h1Style}>{title}</h1>
      {subtitle && <p style={bodyStyle}>{subtitle}</p>}
    </div>
  );
}

function Grid({ children, cols = 2 }: { children: React.ReactNode; cols?: number }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 16 }}>
      {children}
    </div>
  );
}

function ColorSwatch({
  name, cssVar, hex, note, lightText, swatchStyle,
}: {
  name: string; cssVar?: string | null; hex: string; note: string; lightText: boolean; swatchStyle?: React.CSSProperties;
}) {
  return (
    <Card style={{ padding: 0, overflow: "hidden" }}>
      <div
        style={swatchStyle ?? {
          height: 88,
          background: hex,
          display: "flex",
          alignItems: "flex-end",
          padding: "0 12px 10px",
        }}
      >
        <span style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 600, color: lightText ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.5)" }}>
          {hex}
        </span>
      </div>
      <div style={{ padding: "10px 12px 12px", display: "flex", flexDirection: "column", gap: 2 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#000", margin: 0 }}>{name}</p>
        {cssVar && <p style={monoSm}>{cssVar}</p>}
        <p style={{ fontSize: 11, lineHeight: 1.5, color: "#474747", margin: 0 }}>{note}</p>
      </div>
    </Card>
  );
}

// ─── Página ───────────────────────────────────────────────────────────────────

export default function FoundationPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#D4D4D4",
        fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        gap: 30,
      }}
    >

      {/* ── Intro ─────────────────────────────────────────────────────────── */}
      <SectionBlock>
        <TitleBlock
          eyebrowText="Foundation"
          title="Base visual do produto"
          subtitle="Define as superfícies, o raio, o espaçamento, a tipografia e a sensação geral do produto. Tudo que não é componente vive aqui."
        />
        <Grid cols={3}>
          <Card>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={label}>Cores</span>
              <h3 style={h3Style}>Paleta do sistema</h3>
              <p style={bodyStyle}>Organizada por função: marca, semânticas, superfícies, texto e gráficos.</p>
            </div>
          </Card>
          <Card>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={label}>Tipografia</span>
              <h3 style={h3Style}>Escala Inter</h3>
              <p style={bodyStyle}>9 níveis do Display ao Caption. Classes utilitárias ds-* globais.</p>
            </div>
          </Card>
          <Card>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={label}>Estrutura</span>
              <h3 style={h3Style}>Page › Section › Card</h3>
              <p style={bodyStyle}>Hierarquia de 3 camadas com tokens de espaçamento, radius e sombra.</p>
            </div>
          </Card>
        </Grid>
      </SectionBlock>

      {/* ── Cores ─────────────────────────────────────────────────────────── */}
      {colorGroups.map((group) => (
        <SectionBlock key={group.label}>
          <TitleBlock eyebrowText="Cores" title={group.label} />
          <div
            style={{
              display: "grid",
              gap: 12,
              gridTemplateColumns: group.colors.length <= 3
                ? "repeat(3, 1fr)"
                : group.colors.length === 4
                ? "repeat(4, 1fr)"
                : "repeat(6, 1fr)",
            }}
          >
            {group.colors.map((c) => (
              <ColorSwatch key={c.name} {...c} />
            ))}
          </div>
        </SectionBlock>
      ))}

      {/* ── Tipografia ────────────────────────────────────────────────────── */}
      <SectionBlock>
        <TitleBlock
          eyebrowText="Tipografia"
          title="Escala tipográfica"
          subtitle="Fonte Inter. 9 níveis hierárquicos para todas as situações do produto."
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {typeScale.map((item) => (
            <Card key={item.cls}>
              <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                <div style={{ width: 140, flexShrink: 0 }}>
                  <p style={{ ...monoSm, fontWeight: 700, color: "#000", fontSize: 12 }}>.{item.cls}</p>
                  <p style={{ ...monoSm, marginTop: 2 }}>{item.specs}</p>
                </div>
                <div
                  style={{
                    flex: 1,
                    borderLeft: "1px solid rgba(0,0,0,0.06)",
                    paddingLeft: 24,
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: item.fontSize,
                      fontWeight: item.fontWeight,
                      lineHeight: 1.3,
                      letterSpacing: item.fontSize >= 18 ? "-0.02em" : item.cls === "ds-label" ? "0.08em" : item.cls === "ds-caption" ? "0.06em" : "normal",
                      textTransform: item.cls === "ds-label" || item.cls === "ds-caption" ? "uppercase" : "none",
                      color: item.cls.includes("body") || item.cls === "ds-caption" ? "#474747" : "#000000",
                    }}
                  >
                    {item.sample}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </SectionBlock>

      {/* ── Spacing ───────────────────────────────────────────────────────── */}
      <SectionBlock>
        <TitleBlock
          eyebrowText="Spacing"
          title="Escala de espaçamento"
          subtitle="30px no respiro externo e entre sections. Dentro da section: 60px nas laterais e 80px no topo e na base."
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {spacingTokens.map((token) => (
            <Card key={token.name}>
              <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                <div style={{ width: 180, flexShrink: 0 }}>
                  <p style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: "#000", margin: 0 }}>{token.name}</p>
                  <p style={{ ...monoSm, marginTop: 2 }}>{token.value}px · {token.cssVar}</p>
                  <p style={{ fontSize: 11, color: "#474747", marginTop: 2 }}>{token.usage}</p>
                </div>
                <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 12 }}>
                  {token.name.includes("gap") ? (
                    <div style={{ display: "flex", alignItems: "center", gap: token.value, background: "#ECECEC", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8, padding: 12 }}>
                      <div style={{ width: 64, height: 32, borderRadius: 6, background: "#fff", boxShadow: "0 8px 20px rgba(15,23,42,0.05)" }} />
                      <div style={{ width: 64, height: 32, borderRadius: 6, background: "#fff", boxShadow: "0 8px 20px rgba(15,23,42,0.05)" }} />
                    </div>
                  ) : (
                    <div style={{ background: "#ECECEC", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8, padding: token.name === "section-y" ? `${token.value}px 18px` : `18px ${token.value}px` }}>
                      <div style={{ minWidth: 96, minHeight: 32, borderRadius: 6, background: "#fff", boxShadow: "0 8px 20px rgba(15,23,42,0.05)" }} />
                    </div>
                  )}
                  <span style={{ ...monoSm, flexShrink: 0 }}>{token.value}px</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
          <Card>
            <p style={{ ...labelMuted, marginBottom: 8 }}>Page Respiro</p>
            <p style={{ ...bodyStyle, marginTop: 0, marginBottom: 16 }}>
              O fundo global precisa manter 30px de respiro em toda a extremidade antes da primeira section e entre todas as sections.
            </p>
            <div style={{ background: "#D4D4D4", borderRadius: 10, padding: 30 }}>
              <div style={{ background: "#ECECEC", borderRadius: 10, padding: "80px 60px" }}>
                <div style={{ height: 56, background: "#fff", borderRadius: 10 }} />
              </div>
            </div>
          </Card>

          <Card>
            <p style={{ ...labelMuted, marginBottom: 8 }}>Section Interna</p>
            <p style={{ ...bodyStyle, marginTop: 0, marginBottom: 16 }}>
              Dentro da section, o conteúdo trabalha com 60px nas laterais e 80px no topo e embaixo. Depois, entram os cards quando o conteúdo precisa ficar separado.
            </p>
            <div style={{ background: "#ECECEC", borderRadius: 10, padding: "80px 60px" }}>
              <div style={{ height: 56, background: "#fff", borderRadius: 10 }} />
            </div>
          </Card>
        </div>
      </SectionBlock>

      {/* ── Border Radius ─────────────────────────────────────────────────── */}
      <SectionBlock>
        <TitleBlock
          eyebrowText="Border Radius"
          title="Corner Radius"
          subtitle="10px é o valor base — usado em sections, cards e sidebar. Os demais servem para elementos menores."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
          {radiusTokens.map((token) => (
            <Card
              key={token.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                padding: 20,
                outline: token.isMain ? "2px solid #5FC318" : "none",
                outlineOffset: 2,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  background: "rgba(95,195,24,0.12)",
                  border: "2px solid rgba(95,195,24,0.4)",
                  borderRadius: token.px >= 9999 ? "9999px" : `${token.px}px`,
                }}
              />
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#000", margin: 0 }}>{token.name}</p>
                <p style={{ ...monoSm, marginTop: 2 }}>
                  {token.px >= 9999 ? "∞" : `${token.px}px`}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </SectionBlock>

      {/* ── Shadows ───────────────────────────────────────────────────────── */}
      <SectionBlock>
        <TitleBlock
          eyebrowText="Shadows"
          title="Sombras"
          subtitle="Sombras suaves em rgba para comunicar elevação sem peso visual."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 24 }}>
          {shadowTokens.map((token) => (
            <div key={token.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  height: 80,
                  width: "100%",
                  borderRadius: 10,
                  border: "1px solid #ffffff",
                  background: "#ffffff",
                  boxShadow: token.shadow,
                }}
              />
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#000", margin: 0 }}>{token.name}</p>
                <p style={{ fontSize: 11, color: "#474747", marginTop: 4, margin: 0 }}>{token.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* ── Elevation ─────────────────────────────────────────────────────── */}
      <SectionBlock>
        <TitleBlock
          eyebrowText="Elevation"
          title="Camadas de superfície"
          subtitle="Três níveis empilhados. Cada camada tem cor, sombra e função próprias."
        />
        <Grid cols={3}>
          {elevationLayers.map((layer) => (
            <Card key={layer.level}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <span style={labelMuted}>{layer.level}</span>
                <div
                  style={{
                    height: 96,
                    borderRadius: 10,
                    border: "1px solid rgba(0,0,0,0.08)",
                    background: layer.bg,
                    boxShadow: layer.shadow,
                  }}
                />
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#000", margin: 0 }}>{layer.name}</p>
                  <p style={{ ...monoSm, marginTop: 2 }}>{layer.hex} · {layer.token}</p>
                  <p style={{ fontSize: 11, color: "#474747", marginTop: 4, margin: 0 }}>{layer.note}</p>
                </div>
              </div>
            </Card>
          ))}
        </Grid>

        <Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span style={labelMuted}>Diagrama de empilhamento</span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                padding: 32,
                background: "#D4D4D4",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  maxWidth: 400,
                  borderRadius: 10,
                  border: "1px solid #ffffff",
                  padding: 32,
                  background: "#ECECEC",
                  boxShadow: "0 16px 40px rgba(15,23,42,0.08)",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    borderRadius: 10,
                    border: "1px solid #ffffff",
                    padding: 24,
                    textAlign: "center",
                    background: "#fff",
                    boxShadow: "0 12px 28px rgba(15,23,42,0.06)",
                  }}
                >
                  <p style={{ ...labelMuted, display: "block" }}>Card · Nível 2</p>
                  <p style={{ fontSize: 13, color: "#474747", marginTop: 6, marginBottom: 0 }}>Section · Nível 1 (ao redor)</p>
                  <p style={{ fontSize: 13, color: "#474747", marginTop: 2, marginBottom: 0 }}>Page · Nível 0 (fundo externo)</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </SectionBlock>

      {/* ── Section System ────────────────────────────────────────────────── */}
      <SectionBlock>
        <TitleBlock
          eyebrowText="Section System"
          title="Como a página é montada"
          subtitle="A section é o container estrutural que organiza grupos de cards sem encostar no fundo global."
        />
        <Grid cols={2}>

          <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingRight: 8 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 8px", color: "#5FC318" }}>Princípio</p>
              <h3 style={{ ...h3Style, marginBottom: 8 }}>Duas camadas, sempre nesta ordem.</h3>
              <p style={{ ...bodyStyle, marginTop: 0 }}>
                O fundo global só cria respiro. O conteúdo sempre acontece dentro das sections.
              </p>
              <p style={{ ...bodyStyle, marginTop: 12 }}>
                A base da página é o fundo global. Sobre ela entram os containers de section: a primeira recebe o chanfro da marca
                e as seguintes seguem com o contorno padrão. Dentro desses containers vivem títulos, textos, ícones, imagens e,
                quando o conteúdo precisa ser quebrado em blocos mais organizados, entram os cards.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                {
                  layer: "01",
                  name: "Base canvas",
                  color: "#D4D4D4",
                  description: "Fundo global. Nunca vira superfície de conteúdo.",
                },
                {
                  layer: "02",
                  name: "Section containers",
                  color: "#ECECEC",
                  description: "Blocos com radius, padding fixo e chanfro apenas na primeira section.",
                },
                {
                  layer: "03",
                  name: "Conteúdo interno",
                  color: "#FFFFFF",
                  description: "Texto, imagem, componentes e cards vivem dentro da section.",
                },
              ].map((item, index, array) => (
                <div
                  key={item.layer}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "12px 0",
                    borderBottom: index === array.length - 1 ? "0" : "1px solid rgba(0,0,0,0.08)",
                  }}
                >
                  <span style={{ width: 24, flexShrink: 0, fontFamily: "monospace", fontSize: 10, fontWeight: 700, color: "#5FC318" }}>
                    {item.layer}
                  </span>
                  <div style={{ width: 32, height: 32, flexShrink: 0, border: "1px solid rgba(0,0,0,0.15)", borderRadius: 10, background: item.color }} />
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#000", margin: 0 }}>{item.name}</p>
                    <p style={{ fontSize: 12, color: "#474747", margin: "2px 0 0" }}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <h3 style={h3Style}>Exemplos visuais</h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={labelMuted}>Primeira section · com chanfro</span>
                <div style={{ background: "#D4D4D4", borderRadius: 10, border: "1px solid #fff", padding: 30 }}>
                  <ChamferedPanel
                    innerStyle={{
                      background: "#ECECEC",
                      borderRadius: 10,
                      border: "1px solid #fff",
                      boxShadow: "0 16px 40px rgba(15,23,42,0.08)",
                      padding: "80px 60px",
                    }}
                  >
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#000", margin: "0 0 4px" }}>Primeira section</p>
                    <p style={{ fontSize: 11, color: "#474747", margin: "0 0 12px" }}>
                      O canto superior esquerdo recebe o chanfro da marca (32px).
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      <div style={{ ...card, padding: "12px 16px", fontSize: 12, fontWeight: 500 }}>Card 1</div>
                      <div style={{ ...card, padding: "12px 16px", fontSize: 12, fontWeight: 500 }}>Card 2</div>
                    </div>
                  </ChamferedPanel>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={labelMuted}>Sections seguintes · sem chanfro</span>
                <div style={{ background: "#D4D4D4", borderRadius: 10, border: "1px solid #fff", padding: 30 }}>
                  <div
                    style={{
                      background: "#ECECEC",
                      borderRadius: 10,
                      border: "1px solid #fff",
                      boxShadow: "0 16px 40px rgba(15,23,42,0.08)",
                      padding: "80px 60px",
                    }}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      <div style={{ ...card, padding: "12px 16px", fontSize: 12, fontWeight: 500 }}>Card 1</div>
                      <div style={{ ...card, padding: "12px 16px", fontSize: 12, fontWeight: 500 }}>Card 2</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

        </Grid>
      </SectionBlock>

    </div>
  );
}
