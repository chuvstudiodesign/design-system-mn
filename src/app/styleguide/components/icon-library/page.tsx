import { iconsDesign, iconsGerais, type MNIcon } from "@/data/icons";
import { Typography } from "@/components/typography";
import {
  FoundationFooter,
  FoundationPageHeader,
  Section,
} from "../../foundation-sections";

// Same scale factor applied to BOTH figmaW and figmaH of every icon.
// Result: each icon keeps its exact Figma proportions, just smaller.
// e.g. Coração 206×188 → 62×56 | iPhone 154×191 → 46×57 | iPhone Camera 232×152 → 70×46
const ICON_SCALE = 0.3;

function scaled(icon: MNIcon) {
  return {
    w: Math.round(icon.figmaW * ICON_SCALE),
    h: Math.round(icon.figmaH * ICON_SCALE),
  };
}

function IconCard({ icon }: { icon: MNIcon }) {
  const { w, h } = scaled(icon);

  return (
    <div className="ds-card !p-[30px] flex flex-col gap-4">
      <div className="flex items-end justify-center" style={{ height: 70 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon.src} alt={icon.name} style={{ width: w, height: h }} />
      </div>
      <div className="border-t border-[#ECECEC] pt-3">
        <Typography as="p" variant="body" className="font-semibold text-foreground">
          {icon.name}
        </Typography>
        <Typography as="p" variant="code" className="mt-1 text-muted-foreground">
          Figma: {icon.figmaW} × {icon.figmaH}
        </Typography>
        <Typography as="p" variant="code" className="mt-0.5 text-muted-foreground">
          Display: {w} × {h}
        </Typography>
      </div>
    </div>
  );
}

// Demonstrates correct (uniform scale) vs incorrect (forced same W×H) rendering
function ProportionalityExample({
  a,
  b,
  correct,
}: {
  a: MNIcon;
  b: MNIcon;
  correct: boolean;
}) {
  // For the comparison use a larger scale so the difference is visible
  const DEMO_SCALE = 0.5;
  const WRONG_SIZE = 80; // forced square used in the wrong example

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div
          className="flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
          style={{ backgroundColor: correct ? "#5FC318" : "#F54A00", color: "#fff" }}
        >
          {correct ? "✓" : "✗"}
        </div>
        <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
          {correct
            ? "Correto — mesmo fator de escala em W e H de cada ícone"
            : "Incorreto — mesma W e H forçada para todos"}
        </Typography>
      </div>

      <div className="ds-card !p-[30px] flex items-end gap-10">
        {[a, b].map((icon) => {
          const w = correct ? Math.round(icon.figmaW * DEMO_SCALE) : WRONG_SIZE;
          const h = correct ? Math.round(icon.figmaH * DEMO_SCALE) : WRONG_SIZE;
          return (
            <div key={icon.id} className="flex flex-col items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={icon.src}
                alt={icon.name}
                style={{ width: w, height: h, objectFit: correct ? "fill" : "fill" }}
              />
              <div className="text-center">
                <Typography as="p" variant="code" className="text-foreground">
                  {icon.name}
                </Typography>
                <Typography as="p" variant="code" className="text-muted-foreground">
                  {w} × {h}{!correct ? " ← errado" : ""}
                </Typography>
              </div>
            </div>
          );
        })}
      </div>

      {correct && (
        <Typography as="p" variant="body-sm" className="text-muted-foreground">
          Escala <code className="font-mono text-foreground">{DEMO_SCALE}</code> aplicada em ambas as dimensões:{" "}
          Pessoa <code className="font-mono text-foreground">{a.figmaW}×{a.figmaH}</code> →{" "}
          <code className="font-mono text-foreground">{Math.round(a.figmaW * DEMO_SCALE)}×{Math.round(a.figmaH * DEMO_SCALE)}</code>,{" "}
          Pessoas Time <code className="font-mono text-foreground">{b.figmaW}×{b.figmaH}</code> →{" "}
          <code className="font-mono text-foreground">{Math.round(b.figmaW * DEMO_SCALE)}×{Math.round(b.figmaH * DEMO_SCALE)}</code>.
          Cada ícone com W e H diferentes, mas ambos proporcionais ao Figma.
        </Typography>
      )}
      {!correct && (
        <Typography as="p" variant="body-sm" className="text-muted-foreground">
          Forçar <code className="font-mono text-foreground">{WRONG_SIZE}×{WRONG_SIZE}</code> em todos ignora que Pessoa é estreito ({a.figmaW}×{a.figmaH}) e Pessoas Time é largo ({b.figmaW}×{b.figmaH}). Ambos ficam distorcidos.
        </Typography>
      )}
    </div>
  );
}

const pessoaIcon = iconsGerais.find((i) => i.id === "pessoa")!;
const pessoasTimeIcon = iconsGerais.find((i) => i.id === "pessoas-time")!;

export default function IconLibraryPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Biblioteca de Ícones"
        description="Ícones gerais e ícones de design do ecossistema MASI. Cada ícone tem dimensões específicas do Figma que devem ser preservadas na aplicação."
      />

      {/* ── SEÇÃO 1: ÍCONES GERAIS ── */}
      <Section
        title="Ícones Gerais"
        subtitle="28 ícones para uso geral na interface — pessoas, objetos, ações e categorias. Cada ícone é exibido na sua proporção exata extraída do Figma."
        first
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7">
          {iconsGerais.map((icon) => (
            <IconCard key={icon.id} icon={icon} />
          ))}
        </div>
      </Section>

      {/* ── SEÇÃO 2: ÍCONES DESIGN ── */}
      <Section
        title="Ícones Design"
        subtitle="8 ícones de sistema de design — representam as categorias fundacionais: logotipo, símbolo, paleta, tipografia, ícones, section, glass e uso."
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {iconsDesign.map((icon) => (
            <IconCard key={icon.id} icon={icon} />
          ))}
        </div>
      </Section>

      {/* ── SEÇÃO 3: PROPORCIONALIDADE ── */}
      <Section
        title="Proporcionalidade"
        subtitle="Regra central da biblioteca: nunca aplicar mesma largura e altura para ícones diferentes. Cada ícone tem uma razão de aspecto definida no Figma que precisa ser respeitada."
      >
        <div className="flex flex-col gap-8">

          {/* Princípio */}
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="caption" className="font-bold text-primary">
              Princípio
            </Typography>
            <Typography as="h3" variant="h3" className="mt-2 text-foreground">
              Altura de referência fixa, largura calculada.
            </Typography>
            <Typography as="p" variant="body-sm" className="mt-3 max-w-2xl text-muted-foreground">
              Ícones diferentes têm dimensões nativas diferentes no Figma. Para manter o equilíbrio visual entre eles, define-se uma{" "}
              <strong className="text-foreground">altura de referência única</strong> e calcula-se a largura de cada ícone proporcionalmente.
              Isso garante que ícones estreitos continuem estreitos e ícones largos continuem largos — exatamente como no Figma.
            </Typography>
          </div>

          {/* Fórmula */}
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="ds-card !p-[30px]">
              <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
                Fórmula
              </Typography>
              <div className="mt-3 bg-[#D4D4D4] p-4">
                <pre className="font-mono text-[12px] leading-6 text-foreground">
                  {`displayW = Math.round(figmaW × scale)\ndisplayH = Math.round(figmaH × scale)`}
                </pre>
              </div>
            </div>
            <div className="ds-card !p-[30px]">
              <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
                Fator de escala
              </Typography>
              <Typography as="p" variant="display" className="mt-2 text-foreground">
                {ICON_SCALE}×
              </Typography>
              <Typography as="p" variant="body-sm" className="mt-1 text-muted-foreground">
                Constante <code className="font-mono text-foreground">ICON_SCALE</code> nesta página. O mesmo fator é multiplicado em W e H — nunca um em um e outro em outro.
              </Typography>
            </div>
            <div className="ds-card !p-[30px]">
              <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
                Uso em código
              </Typography>
              <div className="mt-3 bg-[#D4D4D4] p-4">
                <pre className="font-mono text-[12px] leading-6 text-foreground">
                  {`const scale = 0.3\nconst w = Math.round(icon.figmaW * scale)\nconst h = Math.round(icon.figmaH * scale)\n\n<img style={{ width: w, height: h }} />`}
                </pre>
              </div>
            </div>
          </div>

          {/* Exemplo de uso correto vs incorreto */}
          <div className="grid gap-6 xl:grid-cols-2">
            <ProportionalityExample a={pessoaIcon} b={pessoasTimeIcon} correct={false} />
            <ProportionalityExample a={pessoaIcon} b={pessoasTimeIcon} correct />
          </div>

          {/* Tabela de dimensões */}
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="mb-4 normal-case tracking-normal text-foreground">
              Referência de dimensões — Ícones Gerais
            </Typography>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#ECECEC]">
                    {["Ícone", "Figma W", "Figma H", `Display W (×${ICON_SCALE})`, `Display H (×${ICON_SCALE})`, "Razão W/H"].map((h) => (
                      <th key={h} className="py-2 pr-6 text-left font-mono text-[11px] font-semibold text-muted-foreground">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {iconsGerais.map((icon) => {
                    const { w, h } = scaled(icon);
                    return (
                    <tr key={icon.id} className="border-b border-[#ECECEC] last:border-0">
                      <td className="py-2 pr-6 font-medium text-foreground">{icon.name}</td>
                      <td className="py-2 pr-6 font-mono text-muted-foreground">{icon.figmaW}</td>
                      <td className="py-2 pr-6 font-mono text-muted-foreground">{icon.figmaH}</td>
                      <td className="py-2 pr-6 font-mono text-foreground">{w}</td>
                      <td className="py-2 pr-6 font-mono text-foreground">{h}</td>
                      <td className="py-2 pr-6 font-mono text-muted-foreground">
                        {(icon.figmaW / icon.figmaH).toFixed(3)}
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="mb-4 normal-case tracking-normal text-foreground">
              Referência de dimensões — Ícones Design
            </Typography>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#ECECEC]">
                    {["Ícone", "Figma W", "Figma H", `Display W (×${ICON_SCALE})`, `Display H (×${ICON_SCALE})`, "Razão W/H"].map((h) => (
                      <th key={h} className="py-2 pr-6 text-left font-mono text-[11px] font-semibold text-muted-foreground">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {iconsDesign.map((icon) => {
                    const { w, h } = scaled(icon);
                    return (
                    <tr key={icon.id} className="border-b border-[#ECECEC] last:border-0">
                      <td className="py-2 pr-6 font-medium text-foreground">{icon.name}</td>
                      <td className="py-2 pr-6 font-mono text-muted-foreground">{icon.figmaW}</td>
                      <td className="py-2 pr-6 font-mono text-muted-foreground">{icon.figmaH}</td>
                      <td className="py-2 pr-6 font-mono text-foreground">{w}</td>
                      <td className="py-2 pr-6 font-mono text-foreground">{h}</td>
                      <td className="py-2 pr-6 font-mono text-muted-foreground">
                        {(icon.figmaW / icon.figmaH).toFixed(3)}
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Regras */}
          <div className="flex flex-col gap-0">
            {[
              {
                index: "01",
                title: "Nunca forçar mesma W e H para ícones diferentes",
                note: "Ícones com razões W/H distintas ficam distorcidos se recebem o mesmo quadrado. A exceção são ícones que já são quadrados no Figma (razão 1.000).",
              },
              {
                index: "02",
                title: "Aplicar o mesmo fator de escala em W e H",
                note: "O fator de escala é multiplicado nas duas dimensões. Nunca fixe só a altura e calcule a largura — isso funciona para quadrados mas distorce ícones mais largos ou mais altos que o normal.",
              },
              {
                index: "03",
                title: "Escolher o fator de escala pelo contexto",
                note: "Para listas e cards use um fator menor (0.2–0.25). Para showcases e seções de destaque use um fator maior (0.4–0.5). O importante é que o mesmo fator seja usado para todos os ícones em um mesmo contexto.",
              },
              {
                index: "04",
                title: "Calcular com Math.round() para evitar meio pixel",
                note: "Math.round(figmaW * scale) garante valores inteiros. Dimensões com casas decimais causam renderização borrada em telas não-retina.",
              },
              {
                index: "05",
                title: "Não criar novos ícones fora deste sistema",
                note: "Qualquer ícone novo deve ser adicionado ao arquivo src/data/icons.ts com suas dimensões exatas do Figma para manter a consistência da biblioteca.",
              },
            ].map((rule) => (
              <div
                key={rule.index}
                className="flex items-start gap-4 border-b border-white py-4 last:border-0"
              >
                <span className="w-8 shrink-0 font-mono text-[10px] font-bold text-primary">
                  {rule.index}
                </span>
                <div>
                  <Typography as="p" variant="body" className="font-semibold text-foreground">
                    {rule.title}
                  </Typography>
                  <Typography as="p" variant="body-sm" className="mt-1 text-muted-foreground">
                    {rule.note}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
