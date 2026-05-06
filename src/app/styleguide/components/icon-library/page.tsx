import { iconsDesign, iconsGerais, type MNIcon } from "@/data/icons";
import { Typography } from "@/components/typography";
import {
  FoundationFooter,
  FoundationPageHeader,
  Section,
} from "../../foundation-sections";

// Same scale factor applied to BOTH figmaW and figmaH of every icon.
// Never fix only height and derive width — that breaks icons that are not ~square.
const ICON_SCALE = 0.75;

function scaled(icon: MNIcon) {
  return {
    w: Math.round(icon.figmaW * ICON_SCALE),
    h: Math.round(icon.figmaH * ICON_SCALE),
  };
}

function IconCard({ icon }: { icon: MNIcon }) {
  const { w, h } = scaled(icon);

  return (
    // Fixed 250×250 card — never changes size with the viewport
    <div className="ds-card !p-[20px] flex h-[250px] w-[250px] shrink-0 flex-col gap-2">
      <div className="flex flex-1 items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon.src} alt={icon.name} style={{ width: w, height: h }} />
      </div>
      <Typography as="p" variant="body-sm" className="shrink-0 font-semibold text-foreground">
        {icon.name}
      </Typography>
    </div>
  );
}

function ProportionalityExample({
  a,
  b,
  correct,
}: {
  a: MNIcon;
  b: MNIcon;
  correct: boolean;
}) {
  const DEMO_SCALE = 0.5;
  const WRONG_SIZE = 80;

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
            ? "Correto — mesmo fator de escala aplicado em W e H"
            : "Incorreto — mesma W × H forçada para todos"}
        </Typography>
      </div>

      <div className="ds-card !p-[30px] flex items-end gap-10">
        {[a, b].map((icon) => {
          const w = correct ? Math.round(icon.figmaW * DEMO_SCALE) : WRONG_SIZE;
          const h = correct ? Math.round(icon.figmaH * DEMO_SCALE) : WRONG_SIZE;
          return (
            <div key={icon.id} className="flex flex-col items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={icon.src} alt={icon.name} style={{ width: w, height: h }} />
              <div className="text-center">
                <Typography as="p" variant="code" className="text-foreground">
                  {icon.name}
                </Typography>
                <Typography as="p" variant="code" className="text-muted-foreground">
                  {w} × {h}{!correct ? " ← distorcido" : ""}
                </Typography>
              </div>
            </div>
          );
        })}
      </div>

      {correct && (
        <Typography as="p" variant="body-sm" className="text-muted-foreground">
          Fator <code className="font-mono text-foreground">{DEMO_SCALE}</code> aplicado em W e H de cada ícone —{" "}
          Pessoa <code className="font-mono text-foreground">{a.figmaW}×{a.figmaH}</code>{" "}
          → <code className="font-mono text-foreground">{Math.round(a.figmaW * DEMO_SCALE)}×{Math.round(a.figmaH * DEMO_SCALE)}</code>,{" "}
          Pessoas Time <code className="font-mono text-foreground">{b.figmaW}×{b.figmaH}</code>{" "}
          → <code className="font-mono text-foreground">{Math.round(b.figmaW * DEMO_SCALE)}×{Math.round(b.figmaH * DEMO_SCALE)}</code>.
          Cada ícone com W e H próprios, ambos proporcionais ao original do Figma.
        </Typography>
      )}
      {!correct && (
        <Typography as="p" variant="body-sm" className="text-muted-foreground">
          Forçar <code className="font-mono text-foreground">{WRONG_SIZE}×{WRONG_SIZE}</code> ignora que Pessoa
          ({a.figmaW}×{a.figmaH}) e Pessoas Time ({b.figmaW}×{b.figmaH}) têm proporções diferentes.
          O resultado distorce os dois.
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
        subtitle="28 ícones para uso geral na interface — pessoas, objetos, ações e categorias. Cada ícone exibido nas suas proporções exatas do Figma."
        first
      >
        <div className="flex flex-wrap gap-4">
          {iconsGerais.map((icon) => (
            <IconCard key={icon.id} icon={icon} />
          ))}
        </div>
      </Section>

      {/* ── SEÇÃO 2: ÍCONES DESIGN ── */}
      <Section
        title="Ícones Design"
        subtitle="8 ícones de sistema de design — logotipo, símbolo, paleta, tipografia, ícones, section, glass e uso."
      >
        <div className="flex flex-wrap gap-4">
          {iconsDesign.map((icon) => (
            <IconCard key={icon.id} icon={icon} />
          ))}
        </div>
      </Section>

      {/* ── SEÇÃO 3: PROPORCIONALIDADE ── */}
      <Section
        title="Proporcionalidade"
        subtitle="Regra central da biblioteca: nunca aplicar mesma W e H para ícones diferentes. Cada ícone tem proporções definidas no Figma que precisam ser respeitadas."
      >
        <div className="flex flex-col gap-8">

          {/* Princípio */}
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="caption" className="font-bold text-primary">
              Princípio
            </Typography>
            <Typography as="h3" variant="h3" className="mt-2 text-foreground">
              Mesmo fator de escala em W e H de cada ícone.
            </Typography>
            <Typography as="p" variant="body-sm" className="mt-3 max-w-2xl text-muted-foreground">
              Cada ícone tem suas próprias dimensões no Figma — largura e altura diferentes entre si.
              Para manter as proporções corretas ao reduzir ou ampliar, aplica-se um{" "}
              <strong className="text-foreground">único fator de escala multiplicado em W e H simultaneamente</strong>.
              Isso preserva a relação exata entre largura e altura de cada ícone, como definido no Figma.
              Ícones largos continuam largos, estreitos continuam estreitos — nenhum fica distorcido.
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
                Fator atual nesta página
              </Typography>
              <Typography as="p" variant="display" className="mt-2 text-foreground">
                {ICON_SCALE}×
              </Typography>
              <Typography as="p" variant="body-sm" className="mt-1 text-muted-foreground">
                O mesmo fator é aplicado em W e H de cada ícone. Ajuste conforme o contexto — o que não pode mudar é que W e H usem o mesmo fator.
              </Typography>
            </div>
            <div className="ds-card !p-[30px]">
              <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
                Uso em código
              </Typography>
              <div className="mt-3 bg-[#D4D4D4] p-4">
                <pre className="font-mono text-[12px] leading-6 text-foreground">
                  {`const scale = 0.75\nconst w = Math.round(icon.figmaW * scale)\nconst h = Math.round(icon.figmaH * scale)\n\n<img style={{ width: w, height: h }} />`}
                </pre>
              </div>
            </div>
          </div>

          {/* Comparação correto vs incorreto */}
          <div className="grid gap-6 xl:grid-cols-2">
            <ProportionalityExample a={pessoaIcon} b={pessoasTimeIcon} correct={false} />
            <ProportionalityExample a={pessoaIcon} b={pessoasTimeIcon} correct />
          </div>

          {/* Tabela de dimensões */}
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="mb-4 normal-case tracking-normal text-foreground">
              Referência — Ícones Gerais (scale {ICON_SCALE}×)
            </Typography>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#ECECEC]">
                    {["Ícone", "Figma W", "Figma H", `Display W`, `Display H`, "Razão W/H"].map((col) => (
                      <th key={col} className="py-2 pr-6 text-left font-mono text-[11px] font-semibold text-muted-foreground">
                        {col}
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
                        <td className="py-2 pr-6 font-mono text-muted-foreground">{(icon.figmaW / icon.figmaH).toFixed(3)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="mb-4 normal-case tracking-normal text-foreground">
              Referência — Ícones Design (scale {ICON_SCALE}×)
            </Typography>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#ECECEC]">
                    {["Ícone", "Figma W", "Figma H", `Display W`, `Display H`, "Razão W/H"].map((col) => (
                      <th key={col} className="py-2 pr-6 text-left font-mono text-[11px] font-semibold text-muted-foreground">
                        {col}
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
                        <td className="py-2 pr-6 font-mono text-muted-foreground">{(icon.figmaW / icon.figmaH).toFixed(3)}</td>
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
                note: "Ícones com razões W/H distintas ficam distorcidos se recebem as mesmas dimensões. A única exceção são ícones perfeitamente quadrados no Figma (razão 1.000).",
              },
              {
                index: "02",
                title: "Aplicar sempre o mesmo fator nas duas dimensões",
                note: "O fator de escala é multiplicado em W e em H do mesmo ícone. Nunca fixe só a altura e derive a largura — isso distorce ícones que têm alturas muito diferentes entre si.",
              },
              {
                index: "03",
                title: "Usar o mesmo fator para todos os ícones do mesmo contexto",
                note: "Em um card, lista ou seção, todos os ícones usam o mesmo fator de escala. Ícones de contextos diferentes (hero vs. lista) podem ter fatores distintos, mas dentro de cada contexto o fator é único.",
              },
              {
                index: "04",
                title: "Calcular com Math.round() para evitar meio pixel",
                note: "Math.round(figmaW * scale) garante valores inteiros. Dimensões fracionadas causam renderização borrada em telas não-retina.",
              },
              {
                index: "05",
                title: "Registrar dimensões no arquivo de dados",
                note: "Qualquer ícone novo deve ser adicionado a src/data/icons.ts com figmaW e figmaH exatos — os valores do viewBox do SVG exportado, não do canvas do Figma após rotação.",
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
