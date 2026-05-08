import type { ReactNode } from "react";

const W = 1080;
const H = 1350;
const PAD = 78;
const GREEN = "#5FC318";
const DARK = "#0C1C16";
const INK = "#EAF4EE";
const LINE = "rgba(255,255,255,0.14)";
const LOGO = "/logos/primary/masi-primary-light.svg";

type SlideProps = { num: number; total: number };

function Footer({ num, total }: SlideProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `0 ${PAD}px ${PAD}px`,
      }}
    >
      <div style={{ display: "flex", gap: 8 }}>
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            style={{
              display: "block",
              width: i === num - 1 ? 42 : 10,
              height: 6,
              borderRadius: 999,
              background: i === num - 1 ? GREEN : "rgba(255,255,255,0.24)",
            }}
          />
        ))}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={LOGO} alt="Masi Negócios" style={{ width: 180, height: "auto" }} />
    </div>
  );
}

function GridGlow() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "linear-gradient(to bottom, black, transparent 82%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -180,
          top: 120,
          width: 520,
          height: 520,
          border: `1px solid ${LINE}`,
          transform: "rotate(18deg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -160,
          bottom: 140,
          width: 400,
          height: 400,
          border: `1px solid ${LINE}`,
          transform: "rotate(-18deg)",
        }}
      />
    </>
  );
}

function CodeLine({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 28,
        borderBottom: `1px solid ${LINE}`,
        padding: "26px 0",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
      }}
    >
      <span style={{ color: "rgba(234,244,238,0.56)", fontSize: 30 }}>{label}</span>
      <span style={{ color: GREEN, fontSize: 30, fontWeight: 800 }}>{value}</span>
    </div>
  );
}

function Slide1({ num, total }: SlideProps) {
  return (
    <div style={{ width: W, height: H, background: DARK, color: INK, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <GridGlow />
      <div style={{ position: "relative", zIndex: 1, padding: `${PAD}px ${PAD}px 0` }}>
        <p style={{ margin: 0, color: GREEN, fontSize: 28, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Inteligência artificial
        </p>
      </div>
      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: `0 ${PAD}px`, gap: 54 }}>
        <h1 style={{ margin: 0, fontSize: 116, lineHeight: 1.02, fontWeight: 900, letterSpacing: 0 }}>
          IA virou sistema operacional de negócio
        </h1>
        <div style={{ width: 190, height: 10, background: GREEN }} />
        <p style={{ margin: 0, maxWidth: 780, color: "rgba(234,244,238,0.72)", fontSize: 46, lineHeight: 1.35 }}>
          5 movimentos para sair do experimento e entrar na operação.
        </p>
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <Footer num={num} total={total} />
      </div>
    </div>
  );
}

function Slide2({ num, total }: SlideProps) {
  return (
    <div style={{ width: W, height: H, background: DARK, color: INK, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <GridGlow />
      <div style={{ position: "relative", zIndex: 1, padding: `${PAD}px ${PAD}px 0` }}>
        <p style={{ margin: 0, color: GREEN, fontSize: 28, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          01 / Processo
        </p>
      </div>
      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: `0 ${PAD}px`, gap: 48 }}>
        <h2 style={{ margin: 0, fontSize: 92, lineHeight: 1.04, fontWeight: 900, letterSpacing: 0 }}>
          Automatizar tarefa pequena não muda a empresa.
        </h2>
        <div style={{ border: `1px solid ${LINE}`, background: "rgba(255,255,255,0.04)", padding: 52 }}>
          <CodeLine label="prompt" value="baixo impacto" />
          <CodeLine label="workflow" value="alto impacto" />
          <CodeLine label="dado próprio" value="vantagem" />
        </div>
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <Footer num={num} total={total} />
      </div>
    </div>
  );
}

function Slide3({ num, total }: SlideProps) {
  const stack = ["Dados", "Contexto", "Modelo", "Workflow", "Decisão"];

  return (
    <div style={{ width: W, height: H, background: "#06100D", color: INK, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <GridGlow />
      <div style={{ position: "relative", zIndex: 1, padding: `${PAD}px ${PAD}px 0` }}>
        <p style={{ margin: 0, color: GREEN, fontSize: 28, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          02 / Arquitetura
        </p>
      </div>
      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: `0 ${PAD}px`, gap: 36 }}>
        <h2 style={{ margin: "0 0 20px", fontSize: 82, lineHeight: 1.06, fontWeight: 900, letterSpacing: 0 }}>
          O valor nasce quando as camadas conversam.
        </h2>
        {stack.map((item, index) => (
          <div
            key={item}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              minHeight: 112,
              border: `1px solid ${LINE}`,
              background: index === 4 ? GREEN : "rgba(255,255,255,0.05)",
              padding: "0 42px",
            }}
          >
            <span style={{ fontSize: 42, fontWeight: 850, color: index === 4 ? DARK : INK }}>{item}</span>
            <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 28, color: index === 4 ? DARK : "rgba(234,244,238,0.48)" }}>
              0{index + 1}
            </span>
          </div>
        ))}
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <Footer num={num} total={total} />
      </div>
    </div>
  );
}

function Slide4({ num, total }: SlideProps) {
  return (
    <div style={{ width: W, height: H, background: DARK, color: INK, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <GridGlow />
      <div style={{ position: "relative", zIndex: 1, padding: `${PAD}px ${PAD}px 0` }}>
        <p style={{ margin: 0, color: GREEN, fontSize: 28, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          03 / Liderança
        </p>
      </div>
      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: `0 ${PAD}px`, gap: 58 }}>
        <h2 style={{ margin: 0, fontSize: 92, lineHeight: 1.04, fontWeight: 900, letterSpacing: 0 }}>
          Toda equipe precisa de um protocolo de decisão.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
          {["Quando usar IA", "Quando revisar", "Quem aprova", "Como medir"].map((item) => (
            <div key={item} style={{ minHeight: 178, border: `1px solid ${LINE}`, background: "rgba(255,255,255,0.05)", padding: 34, display: "flex", alignItems: "flex-end" }}>
              <p style={{ margin: 0, fontSize: 38, lineHeight: 1.18, fontWeight: 850 }}>{item}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <Footer num={num} total={total} />
      </div>
    </div>
  );
}

function Slide5({ num, total }: SlideProps) {
  return (
    <div style={{ width: W, height: H, background: GREEN, color: DARK, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(12,28,22,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(12,28,22,0.13) 1px, transparent 1px)", backgroundSize: "78px 78px" }} />
      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: `${PAD}px`, gap: 52 }}>
        <p style={{ margin: 0, fontSize: 30, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Próxima reunião
        </p>
        <h2 style={{ margin: 0, fontSize: 118, lineHeight: 1.02, fontWeight: 950, letterSpacing: 0 }}>
          Não pergunte qual ferramenta usar.
        </h2>
        <p style={{ margin: 0, maxWidth: 830, fontSize: 52, lineHeight: 1.32, fontWeight: 700 }}>
          Pergunte qual decisão da empresa merece ficar mais rápida.
        </p>
      </div>
      <Footer num={num} total={total} />
    </div>
  );
}

export function AiOperatingSystemSlides(): ReactNode[] {
  const total = 5;
  return [
    <Slide1 key="ai1" num={1} total={total} />,
    <Slide2 key="ai2" num={2} total={total} />,
    <Slide3 key="ai3" num={3} total={total} />,
    <Slide4 key="ai4" num={4} total={total} />,
    <Slide5 key="ai5" num={5} total={total} />,
  ];
}
