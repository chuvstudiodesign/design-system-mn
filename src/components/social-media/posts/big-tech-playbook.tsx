import type { ReactNode } from "react";

const W = 1080;
const H = 1350;
const PAD = 82;
const GREEN = "#5FC318";
const DARK = "#0C1C16";
const PAPER = "#F4F4F0";
const INK = "#101010";
const LOGO = "/logos/primary/masi-primary-dark.svg";

type SlideProps = { num: number; total: number };

function Footer({ num, total, light = false }: SlideProps & { light?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `0 ${PAD}px ${PAD}px`,
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          color: light ? "rgba(255,255,255,0.62)" : "#777",
          fontSize: 28,
        }}
      >
        {String(num).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOGO}
        alt="Masi Negócios"
        style={{
          height: 32,
          width: "auto",
          filter: light ? "brightness(0) invert(1)" : "none",
        }}
      />
    </div>
  );
}

function Header({ label, light = false }: { label: string; light?: boolean }) {
  return (
    <div style={{ padding: `${PAD}px ${PAD}px 0`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <p style={{ margin: 0, fontSize: 26, color: light ? GREEN : DARK, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.12em" }}>
        {label}
      </p>
      <span style={{ display: "block", width: 46, height: 46, background: GREEN }} />
    </div>
  );
}

function ImageStrip() {
  const blocks = [
    { background: "#0C1C16", label: "AI" },
    { background: "#5FC318", label: "DATA" },
    { background: "#FFFFFF", label: "UX" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, border: "1px solid rgba(0,0,0,0.12)" }}>
      {blocks.map((block) => (
        <div key={block.label} style={{ height: 320, background: block.background, display: "flex", alignItems: "flex-end", padding: 30 }}>
          <span style={{ color: block.background === "#FFFFFF" ? DARK : block.background === "#5FC318" ? DARK : "white", fontSize: 42, fontWeight: 950 }}>
            {block.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function Slide1({ num, total }: SlideProps) {
  return (
    <div style={{ width: W, height: H, background: PAPER, color: INK, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Header label="Playbook Big Tech" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: `0 ${PAD}px`, gap: 56 }}>
        <ImageStrip />
        <h1 style={{ margin: 0, fontSize: 112, lineHeight: 1, fontWeight: 950, letterSpacing: 0 }}>
          5 regras que escalam empresas digitais
        </h1>
        <p style={{ margin: 0, fontSize: 44, lineHeight: 1.36, color: "#4B4B4B" }}>
          O que o Vale do Silício ensina sobre produto, velocidade e mercado.
        </p>
      </div>
      <Footer num={num} total={total} />
    </div>
  );
}

function Slide2({ num, total }: SlideProps) {
  return (
    <div style={{ width: W, height: H, background: "white", color: INK, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Header label="Regra 01" />
      <div style={{ flex: 1, display: "grid", gridTemplateRows: "1fr auto", padding: `64px ${PAD}px 56px`, gap: 48 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p style={{ margin: "0 0 36px", fontSize: 32, fontWeight: 900, color: GREEN, textTransform: "uppercase", letterSpacing: "0.12em" }}>
            Amazon
          </p>
          <h2 style={{ margin: 0, fontSize: 104, lineHeight: 1.02, fontWeight: 950, letterSpacing: 0 }}>
            Comece pelo cliente. Volte para a tecnologia depois.
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
          <div style={{ background: "#ECECEC", padding: 36 }}>
            <p style={{ margin: 0, fontSize: 34, lineHeight: 1.26, fontWeight: 800 }}>Decisão boa reduz atrito.</p>
          </div>
          <div style={{ background: DARK, padding: 36, color: "white" }}>
            <p style={{ margin: 0, fontSize: 34, lineHeight: 1.26, fontWeight: 800 }}>Produto bom aumenta recorrência.</p>
          </div>
        </div>
      </div>
      <Footer num={num} total={total} />
    </div>
  );
}

function Slide3({ num, total }: SlideProps) {
  const bars = [
    { label: "Ideia", width: "36%" },
    { label: "Teste", width: "58%" },
    { label: "Aprendizado", width: "76%" },
    { label: "Escala", width: "100%" },
  ];

  return (
    <div style={{ width: W, height: H, background: DARK, color: "white", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Header label="Regra 02" light />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: `0 ${PAD}px`, gap: 58 }}>
        <h2 style={{ margin: 0, fontSize: 96, lineHeight: 1.04, fontWeight: 950, letterSpacing: 0 }}>
          Velocidade é uma decisão de gestão.
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {bars.map((bar) => (
            <div key={bar.label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 30, color: "rgba(255,255,255,0.68)" }}>{bar.label}</span>
                <span style={{ fontSize: 30, color: GREEN, fontWeight: 800 }}>{bar.width}</span>
              </div>
              <div style={{ height: 34, background: "rgba(255,255,255,0.12)" }}>
                <div style={{ width: bar.width, height: "100%", background: GREEN }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer num={num} total={total} light />
    </div>
  );
}

function Slide4({ num, total }: SlideProps) {
  return (
    <div style={{ width: W, height: H, background: PAPER, color: INK, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Header label="Regra 03" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: `0 ${PAD}px`, gap: 46 }}>
        <h2 style={{ margin: 0, fontSize: 96, lineHeight: 1.02, fontWeight: 950, letterSpacing: 0 }}>
          Dados não substituem visão. Eles tiram a neblina.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: "1px solid rgba(0,0,0,0.16)", borderLeft: "1px solid rgba(0,0,0,0.16)" }}>
          {["Sinal", "Hipótese", "Direção", "Produto", "Mercado", "Timing"].map((item, index) => (
            <div key={item} style={{ minHeight: 172, padding: 28, borderRight: "1px solid rgba(0,0,0,0.16)", borderBottom: "1px solid rgba(0,0,0,0.16)", background: index === 2 ? GREEN : "transparent" }}>
              <p style={{ margin: 0, fontSize: 32, lineHeight: 1.18, fontWeight: 850 }}>{item}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer num={num} total={total} />
    </div>
  );
}

function Slide5({ num, total }: SlideProps) {
  return (
    <div style={{ width: W, height: H, background: "white", color: INK, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Header label="Regra 04 + 05" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: `0 ${PAD}px`, gap: 44 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
          <div style={{ background: DARK, color: "white", minHeight: 360, padding: 42, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <span style={{ color: GREEN, fontSize: 30, fontWeight: 900 }}>04</span>
            <p style={{ margin: 0, fontSize: 48, lineHeight: 1.12, fontWeight: 900 }}>Marca também é infraestrutura.</p>
          </div>
          <div style={{ background: GREEN, color: DARK, minHeight: 360, padding: 42, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <span style={{ fontSize: 30, fontWeight: 900 }}>05</span>
            <p style={{ margin: 0, fontSize: 48, lineHeight: 1.12, fontWeight: 900 }}>O futuro chega como comportamento.</p>
          </div>
        </div>
        <h2 style={{ margin: 0, fontSize: 84, lineHeight: 1.04, fontWeight: 950, letterSpacing: 0 }}>
          Big Tech não vence por uma ideia. Vence por um sistema.
        </h2>
      </div>
      <Footer num={num} total={total} />
    </div>
  );
}

export function BigTechPlaybookSlides(): ReactNode[] {
  const total = 5;
  return [
    <Slide1 key="bt1" num={1} total={total} />,
    <Slide2 key="bt2" num={2} total={total} />,
    <Slide3 key="bt3" num={3} total={total} />,
    <Slide4 key="bt4" num={4} total={total} />,
    <Slide5 key="bt5" num={5} total={total} />,
  ];
}
