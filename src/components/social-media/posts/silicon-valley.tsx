import type { ReactNode } from "react";

// Carousel 1 - "Silicon Valley" - editorial, light, typography-driven

const W = 1080;
const H = 1350;
const PAD = 88;
const GREEN = "#5FC318";
const DARK = "#0C1C16";
const LOGO =
  "https://raw.githubusercontent.com/chuvstudiodesign/logos-masi-negocios/71ad67702f1e8fc61061ef81a2e9f372788e7dab/Negocios.svg";

type SlideProps = { num: number; total: number };

function ProgressDots({ num, total, dark }: SlideProps & { dark?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          style={{
            width: i === num - 1 ? 40 : 10,
            height: 6,
            borderRadius: 3,
            background:
              i === num - 1
                ? GREEN
                : dark
                ? "rgba(255,255,255,0.18)"
                : "rgba(0,0,0,0.1)",
            transition: "width 0.3s",
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}

function Footer({ num, total, dark }: SlideProps & { dark?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `0 ${PAD}px ${PAD}px`,
        marginTop: "auto",
      }}
    >
      <ProgressDots num={num} total={total} dark={dark} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOGO}
        alt="MN Negócios"
        style={{
          height: 30,
          width: "auto",
          filter: dark ? "brightness(0) invert(1)" : "none",
        }}
      />
    </div>
  );
}

// Slide 1 — Capa: editorial, big background number
function Slide1({ num, total }: SlideProps) {
  return (
    <div
      style={{
        width: W,
        height: H,
        background: "white",
        display: "flex",
        flexDirection: "column",
        fontFamily: "inherit",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Eyebrow */}
      <div style={{ padding: `${PAD}px ${PAD}px 0` }}>
        <span
          style={{
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: GREEN,
          }}
        >
          Big Techs · Vale do Silício
        </span>
      </div>

      {/* Decorative large "01" */}
      <div
        style={{
          position: "absolute",
          right: -20,
          top: 90,
          fontSize: 560,
          fontWeight: 900,
          color: "#F2F2F2",
          lineHeight: 1,
          userSelect: "none",
            letterSpacing: 0,
        }}
      >
        01
      </div>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: `0 ${PAD}px 60px`,
          position: "relative",
          zIndex: 1,
        }}
      >
        <h1
          style={{
            fontSize: 110,
            fontWeight: 900,
            color: DARK,
            lineHeight: 1.04,
            letterSpacing: 0,
            margin: "0 0 44px",
          }}
        >
          O que as Big Techs fazem diferente
        </h1>

        <div
          style={{
            width: 64,
            height: 6,
            background: GREEN,
            borderRadius: 3,
            marginBottom: 36,
          }}
        />

        <p
          style={{
            fontSize: 52,
            color: "#666",
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          5 lições que definem quem lidera o mercado
        </p>
      </div>

      <Footer num={num} total={total} />
    </div>
  );
}

// Slide 2 - Insight 01: inovar nao e opcao
function Slide2({ num, total }: SlideProps) {
  return (
    <div
      style={{
        width: W,
        height: H,
        background: "#F5F5F5",
        display: "flex",
        flexDirection: "column",
        fontFamily: "inherit",
      }}
    >
      <div style={{ padding: `${PAD}px ${PAD}px 0` }}>
        <span
          style={{
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: GREEN,
          }}
        >
          Lição 01
        </span>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: `60px ${PAD}px`,
        }}
      >
        <h2
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: DARK,
            lineHeight: 1.0,
            letterSpacing: 0,
            margin: "0 0 60px",
          }}
        >
          Inovar não é uma opção.
        </h2>

        <div
          style={{
            background: "white",
            borderRadius: 20,
            padding: 70,
            borderLeft: `8px solid ${GREEN}`,
          }}
        >
          <p
            style={{
              fontSize: 52,
              color: "#333",
              lineHeight: 1.5,
              margin: 0,
              fontStyle: "italic",
            }}
          >
            &ldquo;Steve Jobs não perguntou ao mercado se queria um iPhone.
            Ele criou um mercado que ainda não existia.&rdquo;
          </p>
          <p
            style={{
              fontSize: 36,
              color: "#888",
              marginTop: 40,
              fontWeight: 600,
            }}
          >
            — Jobs sobre o iPhone, 2007
          </p>
        </div>
      </div>

      <Footer num={num} total={total} />
    </div>
  );
}

// Slide 3 - Stat impactante
function Slide3({ num, total }: SlideProps) {
  return (
    <div
      style={{
        width: W,
        height: H,
        background: "white",
        display: "flex",
        flexDirection: "column",
        fontFamily: "inherit",
      }}
    >
      <div style={{ padding: `${PAD}px ${PAD}px 0` }}>
        <span
          style={{
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: GREEN,
          }}
        >
          Lição 02
        </span>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: `0 ${PAD}px`,
          gap: 50,
        }}
      >
        {/* Big stat */}
        <div>
          <p
            style={{
              fontSize: 240,
              fontWeight: 900,
              color: GREEN,
              lineHeight: 0.9,
              letterSpacing: 0,
              margin: 0,
            }}
          >
            52%
          </p>
          <p
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: DARK,
              lineHeight: 1.2,
              margin: "30px 0 0",
            }}
          >
            das empresas Fortune 500 de 2000 não existem mais
          </p>
        </div>

        <div
          style={{
            width: "100%",
            height: 2,
            background: "#ECECEC",
          }}
        />

        <p
          style={{
            fontSize: 50,
            color: "#555",
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          A disrupção não avisa. Empresas que param de inovar entram em
          colapso silencioso.
        </p>

        <p style={{ fontSize: 34, color: "#AAA", margin: 0 }}>
          Fonte: Innosight/Fortune 500, 2023
        </p>
      </div>

      <Footer num={num} total={total} />
    </div>
  );
}

// Slide 4 - As 3 empresas + o que elas tem em comum
function Slide4({ num, total }: SlideProps) {
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
        display: "flex",
        flexDirection: "column",
        fontFamily: "inherit",
      }}
    >
      <div style={{ padding: `${PAD}px ${PAD}px 0` }}>
        <span
          style={{
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: GREEN,
          }}
        >
          Lição 03
        </span>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: `40px ${PAD}px`,
          gap: 40,
        }}
      >
        <h2
          style={{
            fontSize: 88,
            fontWeight: 900,
            color: "white",
            lineHeight: 1.05,
            letterSpacing: 0,
            margin: "0 0 20px",
          }}
        >
          O que Google, Apple e Amazon têm em comum?
        </h2>

        {companies.map((c, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 40,
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: GREEN,
                lineHeight: 1,
                minWidth: 60,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p
                style={{
                  fontSize: 44,
                  fontWeight: 800,
                  color: "white",
                  margin: "0 0 8px",
                  lineHeight: 1.2,
                }}
              >
                {c.insight}
              </p>
              <p
                style={{
                  fontSize: 36,
                  color: "rgba(255,255,255,0.5)",
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                {c.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Footer num={num} total={total} dark />
    </div>
  );
}

// Slide 5 - CTA
function Slide5({ num, total }: SlideProps) {
  return (
    <div
      style={{
        width: W,
        height: H,
        background: "white",
        display: "flex",
        flexDirection: "column",
        fontFamily: "inherit",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top green bar */}
      <div style={{ height: 12, background: GREEN, flexShrink: 0 }} />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: `60px ${PAD}px`,
          textAlign: "center",
          gap: 50,
        }}
      >
        <h2
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: DARK,
            lineHeight: 1.0,
            letterSpacing: 0,
            margin: 0,
          }}
        >
          Esse conteúdo foi útil?
        </h2>

        <p
          style={{
            fontSize: 52,
            color: "#555",
            lineHeight: 1.5,
            margin: 0,
            maxWidth: 860,
          }}
        >
          Salve para não esquecer e compartilhe com alguém que precisa ver isso.
        </p>

        <div
          style={{
            background: GREEN,
            borderRadius: 100,
            padding: "28px 70px",
            marginTop: 20,
          }}
        >
          <p
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: "white",
              margin: 0,
              letterSpacing: 0,
            }}
          >
            @masi.negocios
          </p>
        </div>

        <p
          style={{
            fontSize: 38,
            color: "#AAA",
            margin: 0,
          }}
        >
          Estratégia, inovação e negócios
        </p>
      </div>

      {/* Bottom green bar */}
      <div style={{ height: 12, background: GREEN, flexShrink: 0 }} />
      <Footer num={num} total={total} />
    </div>
  );
}

export function SiliconValleySlides(): ReactNode[] {
  const total = 5;
  return [
    <Slide1 key="sv1" num={1} total={total} />,
    <Slide2 key="sv2" num={2} total={total} />,
    <Slide3 key="sv3" num={3} total={total} />,
    <Slide4 key="sv4" num={4} total={total} />,
    <Slide5 key="sv5" num={5} total={total} />,
  ];
}
