import type { CSSProperties, ReactNode } from "react";

const W = 1080;
const H = 1350;
const PAGE = "#D4D4D4";
const SECTION = "#ECECEC";
const CARD = "#FFFFFF";
const PRIMARY = "#5FC318";
const BRAND = "#AFF000";
const DARK = "#0C1C16";
const TEXT = "#000000";
const MUTED = "#474747";
const GAP = 30;
const SECTION_X = 60;
const SECTION_Y = 80;
const CARD_PAD = 30;
const RADIUS = 10;
const LOGO_DARK = "/logos/primary/masi-primary-dark.svg";
const LOGO_LIGHT = "/logos/primary/masi-primary-light.svg";
const SYMBOL = "/logos/symbol/masi-symbol-brand-dark-green.svg";

type SlideProps = { num: number; total: number };
type Theme = "light" | "dark";

const page: CSSProperties = {
  width: W,
  height: H,
  background: PAGE,
  padding: GAP,
  display: "flex",
  flexDirection: "column",
  gap: GAP,
  fontFamily: "inherit",
  color: TEXT,
};

const sectionBase: CSSProperties = {
  background: SECTION,
  border: "1px solid #FFFFFF",
  borderRadius: RADIUS,
  padding: `${SECTION_Y}px ${SECTION_X}px`,
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

const chamferedSection: CSSProperties = {
  ...sectionBase,
  clipPath: "polygon(32px 0, 100% 0, 100% 100%, 0 100%, 0 32px)",
};

const darkSection: CSSProperties = {
  ...sectionBase,
  background: DARK,
  color: "white",
  borderColor: "rgba(255,255,255,0.08)",
};

function DsFooter({
  num,
  total,
  theme = "light",
  logoScale = 1,
  showProgress = true,
}: SlideProps & { theme?: Theme; logoScale?: number; showProgress?: boolean }) {
  const light = theme === "dark";

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 38 }}>
      {showProgress ? (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {Array.from({ length: total }, (_, index) => (
            <span
              key={index}
              style={{
                width: index === num - 1 ? 44 : 10,
                height: 6,
                borderRadius: 999,
                background: index === num - 1 ? PRIMARY : light ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.12)",
              }}
            />
          ))}
        </div>
      ) : (
        <span />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={light ? LOGO_LIGHT : LOGO_DARK} alt="Masi Negócios" style={{ width: 182 * logoScale, height: "auto" }} />
    </div>
  );
}

function Eyebrow({ children, theme = "light" }: { children: ReactNode; theme?: Theme }) {
  return (
    <p
      style={{
        margin: 0,
        color: theme === "dark" ? BRAND : PRIMARY,
        fontSize: 24,
        fontWeight: 800,
        lineHeight: 1,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
      }}
    >
      {children}
    </p>
  );
}

function Title({ children, size = 48, theme = "light" }: { children: ReactNode; size?: number; theme?: Theme }) {
  return (
    <h2
      style={{
        margin: 0,
        color: theme === "dark" ? "white" : TEXT,
        fontSize: size,
        fontWeight: 800,
        lineHeight: 1.1,
        letterSpacing: 0,
      }}
    >
      {children}
    </h2>
  );
}

function Body({ children, theme = "light", size = 32 }: { children: ReactNode; theme?: Theme; size?: number }) {
  return (
    <p
      style={{
        margin: 0,
        color: theme === "dark" ? "rgba(255,255,255,0.72)" : MUTED,
        fontSize: size,
        lineHeight: 1.45,
        fontWeight: 400,
      }}
    >
      {children}
    </p>
  );
}

function Card({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        background: CARD,
        borderRadius: RADIUS,
        padding: CARD_PAD,
        boxShadow: "0 12px 28px rgba(15,23,42,0.06)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function DarkCard({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: RADIUS,
        padding: CARD_PAD,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function LayerDiagram({ dark = false }: { dark?: boolean }) {
  const rows = [
    ["01", "Base canvas", PAGE],
    ["02", "Section", SECTION],
    ["03", "Card", CARD],
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {rows.map(([index, name, color]) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 22,
            padding: "22px 0",
            borderBottom: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid #FFFFFF",
          }}
        >
          <span style={{ width: 44, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", color: PRIMARY, fontSize: 22, fontWeight: 800 }}>{index}</span>
          <span style={{ width: 42, height: 42, borderRadius: RADIUS, background: color, border: "1px solid rgba(0,0,0,0.12)" }} />
          <span style={{ color: dark ? "white" : TEXT, fontSize: 30, fontWeight: 700 }}>{name}</span>
        </div>
      ))}
    </div>
  );
}

function MiniChart({
  items,
  dark = false,
}: {
  items: Array<{ label: string; value: number }>;
  dark?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {items.map((item) => (
        <div key={item.label}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: dark ? "rgba(255,255,255,0.72)" : MUTED, fontSize: 22 }}>{item.label}</span>
            <span style={{ color: PRIMARY, fontSize: 22, fontWeight: 800 }}>{item.value}%</span>
          </div>
          <div style={{ height: 20, borderRadius: RADIUS, background: dark ? "rgba(255,255,255,0.12)" : SECTION, overflow: "hidden" }}>
            <div style={{ width: `${item.value}%`, height: "100%", background: PRIMARY, borderRadius: RADIUS }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Quadrant({
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
}: {
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
}) {
  return (
    <Card style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 520 }}>
        {[topLeft, topRight, bottomLeft, bottomRight].map((item, index) => (
          <div
            key={item}
            style={{
              padding: 30,
              display: "flex",
              alignItems: index === 0 || index === 1 ? "flex-start" : "flex-end",
              borderRight: index % 2 === 0 ? `1px solid ${SECTION}` : 0,
              borderBottom: index < 2 ? `1px solid ${SECTION}` : 0,
              background: index === 2 ? PRIMARY : CARD,
            }}
          >
            <p style={{ margin: 0, color: index === 2 ? "white" : TEXT, fontSize: 34, lineHeight: 1.12, fontWeight: 800 }}>
              {item}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function SectionSlide({
  children,
  num,
  total,
  dark = false,
  chamfer = false,
  footerLogoScale = 1,
  showFooterProgress = true,
}: SlideProps & {
  children: ReactNode;
  dark?: boolean;
  chamfer?: boolean;
  footerLogoScale?: number;
  showFooterProgress?: boolean;
}) {
  const sectionStyle = dark ? darkSection : chamfer ? chamferedSection : sectionBase;

  return (
    <div style={page}>
      <section style={sectionStyle}>
        {children}
        <DsFooter
          num={num}
          total={total}
          theme={dark ? "dark" : "light"}
          logoScale={footerLogoScale}
          showProgress={showFooterProgress}
        />
      </section>
    </div>
  );
}

function SiliconValleyFoundationSlide1({ num, total }: SlideProps) {
  return (
    <SectionSlide num={num} total={total} chamfer footerLogoScale={2.1} showFooterProgress={false}>
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", overflow: "visible" }}>
        <Eyebrow>Big Techs · Vale do Silício</Eyebrow>

        <div
          style={{
            position: "absolute",
            right: -80,
            top: -20,
            fontSize: 520,
            fontWeight: 900,
            color: "#F2F2F2",
            lineHeight: 1,
            letterSpacing: 0,
            userSelect: "none",
          }}
        >
          01
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            paddingBottom: 18,
            position: "relative",
            zIndex: 1,
          }}
        >
          <h1
            style={{
              margin: "0 0 44px",
              color: DARK,
              fontSize: 110,
              fontWeight: 900,
              lineHeight: 1.04,
              letterSpacing: 0,
            }}
          >
            O que as Big Techs fazem diferente
          </h1>

          <div
            style={{
              width: 64,
              height: 6,
              background: PRIMARY,
              borderRadius: 3,
              marginBottom: 36,
            }}
          />

          <p
            style={{
              margin: 0,
              color: "#666",
              fontSize: 52,
              lineHeight: 1.4,
              width: "85%",
            }}
          >
            5 lições que definem quem lidera o mercado
          </p>
        </div>
      </div>
    </SectionSlide>
  );
}

function SiliconValleyFoundationSlide2({ num, total }: SlideProps) {
  return (
    <SectionSlide num={num} total={total} footerLogoScale={2.1} showFooterProgress={false}>
      <Eyebrow>Lição 01</Eyebrow>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 0",
        }}
      >
        <h2
          style={{
            margin: "0 0 60px",
            color: DARK,
            fontSize: 120,
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: 0,
          }}
        >
          Inovar não é uma opção.
        </h2>

        <Card style={{ borderLeft: `8px solid ${PRIMARY}`, borderRadius: 20, padding: 70 }}>
          <p style={{ margin: 0, color: TEXT, fontSize: 48, lineHeight: 1.34, fontWeight: 700, fontStyle: "italic" }}>
            &ldquo;Steve Jobs não perguntou ao mercado se queria um iPhone. Ele criou um mercado que ainda não existia.&rdquo;
          </p>
          <p style={{ margin: "40px 0 0", color: "#888", fontSize: 36, fontWeight: 600 }}>
            — Jobs sobre o iPhone, 2007
          </p>
        </Card>
      </div>
    </SectionSlide>
  );
}

function SiliconValleyFoundationSlide3({ num, total }: SlideProps) {
  return (
    <SectionSlide num={num} total={total} footerLogoScale={2.1} showFooterProgress={false}>
      <Eyebrow>Lição 02</Eyebrow>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "54px 0 0",
          gap: 28,
        }}
      >
        <Card style={{ borderRadius: 20, padding: 58 }}>
          <p
            style={{
              margin: 0,
              color: PRIMARY,
              fontSize: 220,
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: 0,
            }}
          >
            52%
          </p>
          <p
            style={{
              margin: "30px 0 0",
              color: DARK,
              fontSize: 48,
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            das empresas Fortune 500 de 2000 não existem mais
          </p>
        </Card>

        <Card style={{ borderRadius: 20, padding: 44, borderLeft: `8px solid ${PRIMARY}` }}>
          <p style={{ margin: 0, color: TEXT, fontSize: 46, lineHeight: 1.18, fontWeight: 850 }}>
            A disrupção não avisa.
          </p>
        </Card>

        <p style={{ margin: 0, color: MUTED, fontSize: 46, lineHeight: 1.42 }}>
          Empresas que param de inovar entram em colapso silencioso.
        </p>

        <p style={{ margin: 0, color: "#888", fontSize: 30, fontWeight: 600 }}>
          Fonte: Innosight/Fortune 500, 2023
        </p>
      </div>
    </SectionSlide>
  );
}

function SiliconValleyFoundationSlide4({ num, total }: SlideProps) {
  const companies = [
    {
      name: "Apple",
      insight: "Design como estratégia de negócio",
      detail: "Cada produto é uma declaração de valores.",
    },
    {
      name: "Amazon",
      insight: "Obsessão total pelo cliente",
      detail: "Cada decisão começa pela experiência do usuário final.",
    },
    {
      name: "Google",
      insight: "Dados como diferencial competitivo",
      detail: "Informação é o ativo mais valioso do século XXI.",
    },
  ];

  return (
    <div
      style={{
        width: W,
        height: H,
        background: DARK,
        color: "white",
        display: "flex",
        flexDirection: "column",
        fontFamily: "inherit",
        padding: "88px",
      }}
    >
      <Eyebrow theme="dark">Lição 03</Eyebrow>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "40px 0",
          gap: 40,
        }}
      >
        <h2
          style={{
            margin: "0 0 20px",
            color: "white",
            fontSize: 88,
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: 0,
          }}
        >
          O que Google, Apple e Amazon têm em comum?
        </h2>

        {companies.map((company, index) => (
          <div
            key={company.name}
            style={{
              display: "flex",
              gap: 40,
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                color: PRIMARY,
                fontSize: 48,
                fontWeight: 900,
                lineHeight: 1,
                minWidth: 60,
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <p
                style={{
                  margin: "0 0 8px",
                  color: "white",
                  fontSize: 44,
                  fontWeight: 800,
                  lineHeight: 1.2,
                }}
              >
                {company.insight}
              </p>
              <p
                style={{
                  margin: 0,
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 36,
                  lineHeight: 1.4,
                }}
              >
                {company.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
      <DsFooter num={num} total={total} theme="dark" logoScale={2.1} showProgress={false} />
    </div>
  );
}

function SiliconValleyFoundationSlide5({ num, total }: SlideProps) {
  return (
    <SectionSlide num={num} total={total} footerLogoScale={2.1} showFooterProgress={false}>
      <Eyebrow>Fechamento</Eyebrow>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 34 }}>
        <Title size={84}>Big Tech não vence por uma ideia.</Title>
        <div style={{ display: "grid", gap: 28 }}>
          <Card style={{ minHeight: 210, display: "grid", gridTemplateColumns: "238px minmax(0,1fr)", gap: 30, alignItems: "center", padding: 36 }}>
            <p style={{ margin: 0, color: PRIMARY, fontSize: 30, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              O padrão
            </p>
            <p style={{ margin: 0, color: TEXT, fontSize: 48, lineHeight: 1.08, fontWeight: 900, width: 470, maxWidth: "100%" }}>
              Inovar antes que o mercado peça.
            </p>
          </Card>
          <Card style={{ minHeight: 210, background: DARK, color: "white", display: "grid", gridTemplateColumns: "238px minmax(0,1fr)", gap: 30, alignItems: "center", padding: 36 }}>
            <p style={{ margin: 0, color: BRAND, fontSize: 30, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              A vantagem
            </p>
            <p style={{ margin: 0, color: "white", fontSize: 48, lineHeight: 1.08, fontWeight: 900, width: 470, maxWidth: "100%" }}>
              Transformar visão em sistema.
            </p>
          </Card>
        </div>
        <Body size={34}>
          Liderança de mercado nasce quando produto, dados, design e operação apontam para a mesma direção.
        </Body>
      </div>
    </SectionSlide>
  );
}

function IntelligenceSlide1({ num, total }: SlideProps) {
  return (
    <SectionSlide num={num} total={total} chamfer>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 30 }}>
        <Eyebrow>Modelo 04 · AI Strategy</Eyebrow>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={SYMBOL} alt="" style={{ width: 72, height: 72 }} />
      </div>
      <div style={{ flex: 1, display: "grid", gridTemplateRows: "auto 1fr", gap: 34, paddingTop: 44 }}>
        <Title size={72}>Inteligência artificial precisa de sistema, não de improviso.</Title>
        <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 24 }}>
          <Card style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <p style={{ margin: 0, color: PRIMARY, fontSize: 28, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em" }}>Mapa operacional</p>
            <MiniChart
              items={[
                { label: "Dados próprios", value: 82 },
                { label: "Workflow", value: 68 },
                { label: "Governança", value: 54 },
              ]}
            />
          </Card>
          <Card style={{ background: DARK, color: "white", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <p style={{ margin: 0, color: BRAND, fontSize: 82, fontWeight: 900, lineHeight: 1 }}>AI</p>
            <Body theme="dark" size={28}>O post vira um painel, não um manifesto.</Body>
          </Card>
        </div>
      </div>
    </SectionSlide>
  );
}

function IntelligenceSlide2({ num, total }: SlideProps) {
  return (
    <SectionSlide num={num} total={total}>
      <Eyebrow>01 · Fundação</Eyebrow>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 24, alignItems: "center" }}>
        <Card style={{ minHeight: 620, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Title size={54}>Antes da ferramenta, defina as camadas.</Title>
          <LayerDiagram />
        </Card>
        <div style={{ display: "grid", gap: 18 }}>
          {[
            ["Entrada", "dados, contexto e regra"],
            ["Processo", "agente, revisão e memória"],
            ["Saída", "decisão, ação e registro"],
          ].map(([title, text]) => (
            <Card key={title} style={{ minHeight: 150 }}>
              <p style={{ margin: "0 0 10px", color: TEXT, fontSize: 34, fontWeight: 800 }}>{title}</p>
              <Body size={25}>{text}</Body>
            </Card>
          ))}
        </div>
      </div>
    </SectionSlide>
  );
}

function IntelligenceSlide3({ num, total }: SlideProps) {
  return (
    <SectionSlide num={num} total={total}>
      <Eyebrow>02 · Adoção</Eyebrow>
      <div style={{ flex: 1, display: "grid", gridTemplateRows: "auto 1fr", gap: 30, paddingTop: 42 }}>
        <Title size={64}>O roteiro de IA precisa mostrar fluxo, não só lista.</Title>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 24, position: "relative" }}>
          <div style={{ position: "absolute", left: "50%", top: 42, bottom: 42, width: 6, transform: "translateX(-50%)", background: PRIMARY, borderRadius: 999 }} />
          <div style={{ position: "absolute", top: "50%", left: 42, right: 42, height: 6, transform: "translateY(-50%)", background: PRIMARY, borderRadius: 999 }} />
          {["Mapear tarefas", "Criar base de dados", "Prototipar fluxos", "Medir impacto"].map((item, index) => (
            <Card key={item} style={{ minHeight: 210, position: "relative", zIndex: 1 }}>
              <p style={{ margin: "0 0 42px", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", color: PRIMARY, fontSize: 24, fontWeight: 800 }}>0{index + 1}</p>
              <p style={{ margin: 0, color: TEXT, fontSize: 34, lineHeight: 1.2, fontWeight: 700 }}>{item}</p>
            </Card>
          ))}
        </div>
      </div>
    </SectionSlide>
  );
}

function IntelligenceSlide4({ num, total }: SlideProps) {
  return (
    <SectionSlide num={num} total={total} dark>
      <Eyebrow theme="dark">03 · Governança</Eyebrow>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 34 }}>
        <Title size={70} theme="dark">A vantagem não está no prompt. Está no processo.</Title>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <DarkCard style={{ minHeight: 310, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <p style={{ margin: 0, color: BRAND, fontSize: 28, fontWeight: 900 }}>Protocolo</p>
            <p style={{ margin: 0, color: "white", fontSize: 42, lineHeight: 1.1, fontWeight: 850 }}>Quem usa, quando revisa.</p>
          </DarkCard>
          <DarkCard style={{ minHeight: 310, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <p style={{ margin: 0, color: BRAND, fontSize: 28, fontWeight: 900 }}>Registro</p>
            <MiniChart
              dark
              items={[
                { label: "Aprovado", value: 74 },
                { label: "Risco", value: 36 },
                { label: "Aprendizado", value: 88 },
              ]}
            />
          </DarkCard>
        </div>
      </div>
    </SectionSlide>
  );
}

function IntelligenceSlide5({ num, total }: SlideProps) {
  return (
    <SectionSlide num={num} total={total}>
      <Eyebrow>04 · Decisão</Eyebrow>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 30 }}>
        <Card style={{ background: DARK, color: "white", minHeight: 500, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "center" }}>
          <div>
            <Title size={64} theme="dark">Toda inovação boa vira rotina.</Title>
            <Body theme="dark" size={30}>Transforme descoberta em padrão operacional.</Body>
          </div>
          <div style={{ display: "grid", gap: 14 }}>
            {["piloto", "manual", "treino", "métrica"].map((item) => (
              <div key={item} style={{ background: "rgba(255,255,255,0.08)", borderRadius: RADIUS, padding: "18px 22px" }}>
                <p style={{ margin: 0, color: "white", fontSize: 28, fontWeight: 800 }}>{item}</p>
              </div>
            ))}
          </div>
        </Card>
        <Body size={30}>Salve este framework para revisar sua próxima iniciativa de IA.</Body>
      </div>
    </SectionSlide>
  );
}

function VentureSlide1({ num, total }: SlideProps) {
  return (
    <SectionSlide num={num} total={total} chamfer>
      <Eyebrow>Modelo 05 · Venture Builder</Eyebrow>
      <div style={{ flex: 1, display: "grid", gridTemplateRows: "auto 1fr", gap: 34, paddingTop: 44 }}>
        <Title size={74}>Como Big Techs transformam aposta em máquina.</Title>
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 520 }}>
            <div style={{ padding: 36, display: "flex", flexDirection: "column", justifyContent: "space-between", background: DARK, color: "white" }}>
              <p style={{ margin: 0, color: BRAND, fontSize: 26, fontWeight: 900 }}>Aposta</p>
              <p style={{ margin: 0, fontSize: 62, lineHeight: 1, fontWeight: 900 }}>pequena</p>
            </div>
            <div style={{ padding: 36, display: "flex", flexDirection: "column", justifyContent: "space-between", background: CARD }}>
              <p style={{ margin: 0, color: PRIMARY, fontSize: 26, fontWeight: 900 }}>Máquina</p>
              <p style={{ margin: 0, color: TEXT, fontSize: 62, lineHeight: 1, fontWeight: 900 }}>repetível</p>
            </div>
            <div style={{ gridColumn: "1 / span 2", padding: 36, background: PRIMARY }}>
              <p style={{ margin: 0, color: "white", fontSize: 42, lineHeight: 1.16, fontWeight: 850 }}>O sinal de mercado decide o próximo investimento.</p>
            </div>
          </div>
        </Card>
      </div>
    </SectionSlide>
  );
}

function VentureSlide2({ num, total }: SlideProps) {
  const steps = ["Problema", "Oferta", "Canal", "Receita"];
  return (
    <SectionSlide num={num} total={total}>
      <Eyebrow>01 · Produto</Eyebrow>
      <div style={{ flex: 1, display: "grid", gridTemplateRows: "auto 1fr", gap: 34, paddingTop: 42 }}>
        <Title size={66}>A primeira versão precisa revelar onde o mercado puxa.</Title>
        <div style={{ position: "relative", display: "grid", gap: 18, alignContent: "center" }}>
          <div style={{ position: "absolute", left: 41, top: 40, bottom: 40, width: 6, background: PRIMARY, borderRadius: 999 }} />
          {steps.map((step, index) => (
            <Card key={step} style={{ position: "relative", zIndex: 1, marginLeft: index % 2 === 0 ? 0 : 100, display: "grid", gridTemplateColumns: "80px 1fr", alignItems: "center", minHeight: 116 }}>
              <p style={{ margin: 0, color: PRIMARY, fontSize: 34, fontWeight: 800 }}>0{index + 1}</p>
              <div>
                <p style={{ margin: 0, color: TEXT, fontSize: 34, fontWeight: 800 }}>{step}</p>
                <p style={{ margin: "6px 0 0", color: MUTED, fontSize: 22, lineHeight: 1.3 }}>{index === 0 ? "dor real" : index === 1 ? "promessa clara" : index === 2 ? "distribuição" : "modelo"}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </SectionSlide>
  );
}

function VentureSlide3({ num, total }: SlideProps) {
  return (
    <SectionSlide num={num} total={total}>
      <Eyebrow>02 · Mercado</Eyebrow>
      <div style={{ flex: 1, display: "grid", gridTemplateRows: "auto 1fr", gap: 30, paddingTop: 42 }}>
        <Title size={66}>Escalar é escolher quadrante.</Title>
        <Quadrant
          topLeft="Alta dor / baixo acesso"
          topRight="Alta dor / alto acesso"
          bottomLeft="Baixa dor / baixo acesso"
          bottomRight="Baixa dor / alto acesso"
        />
      </div>
    </SectionSlide>
  );
}

function VentureSlide4({ num, total }: SlideProps) {
  return (
    <SectionSlide num={num} total={total} dark>
      <Eyebrow theme="dark">03 · Escala</Eyebrow>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 36 }}>
        <Title size={72} theme="dark">Escala é uma sequência, não um salto.</Title>
        <div style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 24 }}>
          <DarkCard style={{ minHeight: 420, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <p style={{ margin: 0, color: BRAND, fontSize: 28, fontWeight: 900 }}>Pipeline</p>
            <p style={{ margin: 0, color: "white", fontSize: 52, lineHeight: 1.04, fontWeight: 900 }}>aprender → padronizar → distribuir</p>
          </DarkCard>
          <DarkCard style={{ minHeight: 420 }}>
            <MiniChart
              dark
              items={[
                { label: "Sinal", value: 72 },
                { label: "Capacidade", value: 58 },
                { label: "Canal", value: 86 },
                { label: "Margem", value: 64 },
              ]}
            />
          </DarkCard>
        </div>
      </div>
    </SectionSlide>
  );
}

function VentureSlide5({ num, total }: SlideProps) {
  return (
    <SectionSlide num={num} total={total}>
      <Eyebrow>04 · Sistema</Eyebrow>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 34 }}>
        <Title size={74}>A empresa que aprende mais rápido decide melhor.</Title>
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", minHeight: 360 }}>
            {["Teste", "Sinal", "Escala"].map((item, index) => (
              <div key={item} style={{ padding: 30, background: index === 1 ? SECTION : CARD, borderRight: index < 2 ? `1px solid ${SECTION}` : 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <p style={{ margin: 0, color: PRIMARY, fontSize: 28, fontWeight: 900 }}>0{index + 1}</p>
                <p style={{ margin: 0, color: TEXT, fontSize: 38, lineHeight: 1.08, fontWeight: 850 }}>{item}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </SectionSlide>
  );
}

function BoardroomSlide1({ num, total }: SlideProps) {
  return (
    <SectionSlide num={num} total={total} chamfer>
      <Eyebrow>Modelo 06 · Board Briefing</Eyebrow>
      <div style={{ flex: 1, display: "grid", gridTemplateRows: "auto 1fr", gap: 34, paddingTop: 44 }}>
        <Title size={74}>O briefing executivo para falar de inovação.</Title>
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateRows: "96px 1fr 96px", minHeight: 520 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: `1px solid ${SECTION}` }}>
              {["Contexto", "Tese", "Decisão"].map((item) => (
                <p key={item} style={{ margin: 0, padding: 30, color: TEXT, fontSize: 25, fontWeight: 850, borderRight: item !== "Decisão" ? `1px solid ${SECTION}` : 0 }}>{item}</p>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", padding: 36 }}>
              <p style={{ margin: 0, color: TEXT, fontSize: 64, lineHeight: 1.06, fontWeight: 900 }}>Uma reunião boa termina com movimento.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: `1px solid ${SECTION}` }}>
              <p style={{ margin: 0, padding: 30, color: PRIMARY, fontSize: 26, fontWeight: 900 }}>Board memo</p>
              <p style={{ margin: 0, padding: 30, color: MUTED, fontSize: 24, textAlign: "right" }}>45 min · decisão</p>
            </div>
          </div>
        </Card>
      </div>
    </SectionSlide>
  );
}

function BoardroomSlide2({ num, total }: SlideProps) {
  return (
    <SectionSlide num={num} total={total}>
      <Eyebrow>01 · Contexto</Eyebrow>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 24, alignItems: "center" }}>
        <div>
          <Title size={62}>Toda conversa estratégica começa com o que mudou.</Title>
          <Body size={28}>O briefing separa sinal, ruído e decisão.</Body>
        </div>
        <Card style={{ padding: 0, overflow: "hidden" }}>
          {[
            ["Tecnologia", "custo de execução"],
            ["Cliente", "nova expectativa"],
            ["Concorrência", "velocidade"],
            ["Capital", "critério de retorno"],
          ].map(([title, text], index) => (
            <div key={title} style={{ display: "grid", gridTemplateColumns: "190px 1fr", borderBottom: index < 3 ? `1px solid ${SECTION}` : 0 }}>
              <p style={{ margin: 0, padding: 24, color: PRIMARY, fontSize: 24, fontWeight: 900 }}>{title}</p>
              <p style={{ margin: 0, padding: 24, color: TEXT, fontSize: 26, fontWeight: 700 }}>{text}</p>
            </div>
          ))}
        </Card>
      </div>
    </SectionSlide>
  );
}

function BoardroomSlide3({ num, total }: SlideProps) {
  return (
    <SectionSlide num={num} total={total}>
      <Eyebrow>02 · Tese</Eyebrow>
      <div style={{ flex: 1, display: "grid", gridTemplateRows: "auto 1fr", gap: 34, paddingTop: 42 }}>
        <Title size={66}>Uma tese boa vira placar de decisão.</Title>
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", minHeight: 560 }}>
            <div style={{ padding: 36, display: "flex", flexDirection: "column", justifyContent: "space-between", borderRight: `1px solid ${SECTION}` }}>
              <p style={{ margin: 0, color: PRIMARY, fontSize: 28, fontWeight: 900 }}>Tese</p>
              <p style={{ margin: 0, color: TEXT, fontSize: 54, lineHeight: 1.06, fontWeight: 900 }}>A aposta só entra se mover um indicador crítico.</p>
            </div>
            <div style={{ display: "grid", gridTemplateRows: "1fr 1fr 1fr" }}>
              {["Mercado", "Capacidade", "Timing"].map((item, index) => (
                <div key={item} style={{ padding: 30, borderBottom: index < 2 ? `1px solid ${SECTION}` : 0 }}>
                  <p style={{ margin: 0, color: TEXT, fontSize: 32, fontWeight: 850 }}>{item}</p>
                  <p style={{ margin: "10px 0 0", color: MUTED, fontSize: 22, lineHeight: 1.3 }}>{index === 0 ? "demanda clara" : index === 1 ? "execução possível" : "janela aberta"}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </SectionSlide>
  );
}

function BoardroomSlide4({ num, total }: SlideProps) {
  return (
    <SectionSlide num={num} total={total} dark>
      <Eyebrow theme="dark">03 · Decisão</Eyebrow>
      <div style={{ flex: 1, display: "grid", gridTemplateRows: "auto 1fr", gap: 34, paddingTop: 42 }}>
        <Title size={68} theme="dark">Sem decisão, inovação vira teatro.</Title>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <DarkCard style={{ minHeight: 470, background: PRIMARY, borderColor: PRIMARY, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <p style={{ margin: 0, color: DARK, fontSize: 28, fontWeight: 900 }}>Ata final</p>
            <p style={{ margin: 0, color: DARK, fontSize: 58, lineHeight: 1.04, fontWeight: 950 }}>dono prazo métrica</p>
          </DarkCard>
          <DarkCard style={{ minHeight: 470 }}>
            <MiniChart
              dark
              items={[
                { label: "Clareza", value: 91 },
                { label: "Risco", value: 42 },
                { label: "Urgência", value: 78 },
              ]}
            />
          </DarkCard>
        </div>
      </div>
    </SectionSlide>
  );
}

function BoardroomSlide5({ num, total }: SlideProps) {
  return (
    <SectionSlide num={num} total={total}>
      <Eyebrow>04 · Encaminhamento</Eyebrow>
      <div style={{ flex: 1, display: "grid", gridTemplateRows: "auto 1fr", gap: 34, paddingTop: 42 }}>
        <Title size={70}>Use este roteiro na próxima reunião de estratégia.</Title>
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 430 }}>
            <div style={{ padding: 36, borderRight: `1px solid ${SECTION}`, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <p style={{ margin: 0, color: PRIMARY, fontSize: 34, fontWeight: 900 }}>Pergunta</p>
              <p style={{ margin: 0, color: TEXT, fontSize: 42, lineHeight: 1.12, fontWeight: 850 }}>O que mudou o suficiente para exigir ação?</p>
            </div>
            <div style={{ padding: 36, display: "flex", flexDirection: "column", justifyContent: "space-between", background: SECTION }}>
              <p style={{ margin: 0, color: PRIMARY, fontSize: 34, fontWeight: 900 }}>Saída</p>
              <p style={{ margin: 0, color: TEXT, fontSize: 42, lineHeight: 1.12, fontWeight: 850 }}>Uma decisão registrada, não só uma conversa.</p>
            </div>
          </div>
        </Card>
      </div>
    </SectionSlide>
  );
}

export function AiFoundationSlides(): ReactNode[] {
  const total = 5;
  return [
    <IntelligenceSlide1 key="aif1" num={1} total={total} />,
    <IntelligenceSlide2 key="aif2" num={2} total={total} />,
    <IntelligenceSlide3 key="aif3" num={3} total={total} />,
    <IntelligenceSlide4 key="aif4" num={4} total={total} />,
    <IntelligenceSlide5 key="aif5" num={5} total={total} />,
  ];
}

export function SiliconValleyFoundationSlides(): ReactNode[] {
  const total = 5;
  return [
    <SiliconValleyFoundationSlide1 key="svf1" num={1} total={total} />,
    <SiliconValleyFoundationSlide2 key="svf2" num={2} total={total} />,
    <SiliconValleyFoundationSlide3 key="svf3" num={3} total={total} />,
    <SiliconValleyFoundationSlide4 key="svf4" num={4} total={total} />,
    <SiliconValleyFoundationSlide5 key="svf5" num={5} total={total} />,
  ];
}

export function VentureBuilderSlides(): ReactNode[] {
  const total = 5;
  return [
    <VentureSlide1 key="vb1" num={1} total={total} />,
    <VentureSlide2 key="vb2" num={2} total={total} />,
    <VentureSlide3 key="vb3" num={3} total={total} />,
    <VentureSlide4 key="vb4" num={4} total={total} />,
    <VentureSlide5 key="vb5" num={5} total={total} />,
  ];
}

export function BoardBriefingSlides(): ReactNode[] {
  const total = 5;
  return [
    <BoardroomSlide1 key="bb1" num={1} total={total} />,
    <BoardroomSlide2 key="bb2" num={2} total={total} />,
    <BoardroomSlide3 key="bb3" num={3} total={total} />,
    <BoardroomSlide4 key="bb4" num={4} total={total} />,
    <BoardroomSlide5 key="bb5" num={5} total={total} />,
  ];
}
