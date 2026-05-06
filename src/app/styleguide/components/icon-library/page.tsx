import { iconsDesign, iconsGerais, ICON_REF_HEIGHT, iconDisplayWidth, type MNIcon } from "@/data/icons";
import { Typography } from "@/components/typography";
import {
  FoundationFooter,
  FoundationPageHeader,
  Section,
} from "../../foundation-sections";

function IconCard({ icon }: { icon: MNIcon }) {
  const displayW = iconDisplayWidth(icon);

  return (
    <div className="ds-card !p-[30px] flex flex-col gap-4">
      <div
        className="flex items-end justify-center"
        style={{ height: ICON_REF_HEIGHT }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={icon.src}
          alt={icon.name}
          style={{ height: ICON_REF_HEIGHT, width: "auto" }}
        />
      </div>
      <div className="border-t border-[#ECECEC] pt-3">
        <Typography as="p" variant="body" className="font-semibold text-foreground">
          {icon.name}
        </Typography>
        <Typography as="p" variant="code" className="mt-1 text-muted-foreground">
          {icon.figmaW} × {icon.figmaH} px
        </Typography>
        <Typography as="p" variant="code" className="mt-0.5 text-muted-foreground">
          display: {displayW} × {ICON_REF_HEIGHT}
        </Typography>
      </div>
    </div>
  );
}

// Highlights the proportionality discrepancy between two icons side-by-side
function ProportionalityExample({
  a,
  b,
  correct,
}: {
  a: MNIcon;
  b: MNIcon;
  correct: boolean;
}) {
  const refH = ICON_REF_HEIGHT;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div
          className="flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
          style={{
            backgroundColor: correct ? "#5FC318" : "#F54A00",
            color: "#fff",
          }}
        >
          {correct ? "✓" : "✗"}
        </div>
        <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
          {correct ? "Correto — altura fixa, largura proporcional" : "Incorreto — mesma W e H para todos"}
        </Typography>
      </div>

      <div className="ds-card !p-[30px] flex items-end gap-8">
        {[a, b].map((icon) => {
          const w = correct
            ? iconDisplayWidth(icon)
            : refH; // wrong: force square
          const h = refH;

          return (
            <div key={icon.id} className="flex flex-col items-center gap-3">
              <div style={{ width: w, height: h, position: "relative" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={icon.src}
                  alt={icon.name}
                  style={{
                    width: w,
                    height: h,
                    objectFit: correct ? "contain" : "fill",
                  }}
                />
              </div>
              <div className="text-center">
                <Typography as="p" variant="code" className="text-foreground">
                  {icon.name}
                </Typography>
                <Typography as="p" variant="code" className="text-muted-foreground">
                  {correct
                    ? `${w} × ${h}`
                    : `${h} × ${h} ← errado`}
                </Typography>
              </div>
            </div>
          );
        })}
      </div>

      {correct && (
        <Typography as="p" variant="body-sm" className="text-muted-foreground">
          Ambos a <code className="font-mono text-foreground">{refH}px</code> de altura. Largura calculada por{" "}
          <code className="font-mono text-foreground">Math.round(figmaW / figmaH × {refH})</code> — proporção exata do Figma preservada.
        </Typography>
      )}
      {!correct && (
        <Typography as="p" variant="body-sm" className="text-muted-foreground">
          Forçar o mesmo <code className="font-mono text-foreground">{refH} × {refH}</code> distorce ícones que não são quadrados. Pessoa fica esticada horizontalmente; Pessoas Time fica comprimida.
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
                  {`displayW = Math.round(\n  figmaW / figmaH × refH\n)`}
                </pre>
              </div>
            </div>
            <div className="ds-card !p-[30px]">
              <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
                Altura de referência
              </Typography>
              <Typography as="p" variant="display" className="mt-2 text-foreground">
                {ICON_REF_HEIGHT}px
              </Typography>
              <Typography as="p" variant="body-sm" className="mt-1 text-muted-foreground">
                Constante <code className="font-mono text-foreground">ICON_REF_HEIGHT</code> em{" "}
                <code className="font-mono text-foreground">src/data/icons.ts</code>. Ajuste conforme o contexto de uso.
              </Typography>
            </div>
            <div className="ds-card !p-[30px]">
              <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
                Utilitário
              </Typography>
              <div className="mt-3 bg-[#D4D4D4] p-4">
                <pre className="font-mono text-[12px] leading-6 text-foreground">
                  {`import { iconDisplayWidth }\n  from "@/data/icons"\n\nconst w = iconDisplayWidth(icon)`}
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
                    {["Ícone", "Figma W", "Figma H", `Display W (ref ${ICON_REF_HEIGHT}px)`, "Razão W/H"].map((h) => (
                      <th key={h} className="py-2 pr-6 text-left font-mono text-[11px] font-semibold text-muted-foreground">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {iconsGerais.map((icon) => (
                    <tr key={icon.id} className="border-b border-[#ECECEC] last:border-0">
                      <td className="py-2 pr-6 font-medium text-foreground">{icon.name}</td>
                      <td className="py-2 pr-6 font-mono text-muted-foreground">{icon.figmaW}</td>
                      <td className="py-2 pr-6 font-mono text-muted-foreground">{icon.figmaH}</td>
                      <td className="py-2 pr-6 font-mono text-foreground">{iconDisplayWidth(icon)}</td>
                      <td className="py-2 pr-6 font-mono text-muted-foreground">
                        {(icon.figmaW / icon.figmaH).toFixed(3)}
                      </td>
                    </tr>
                  ))}
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
                    {["Ícone", "Figma W", "Figma H", `Display W (ref ${ICON_REF_HEIGHT}px)`, "Razão W/H"].map((h) => (
                      <th key={h} className="py-2 pr-6 text-left font-mono text-[11px] font-semibold text-muted-foreground">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {iconsDesign.map((icon) => (
                    <tr key={icon.id} className="border-b border-[#ECECEC] last:border-0">
                      <td className="py-2 pr-6 font-medium text-foreground">{icon.name}</td>
                      <td className="py-2 pr-6 font-mono text-muted-foreground">{icon.figmaW}</td>
                      <td className="py-2 pr-6 font-mono text-muted-foreground">{icon.figmaH}</td>
                      <td className="py-2 pr-6 font-mono text-foreground">{iconDisplayWidth(icon)}</td>
                      <td className="py-2 pr-6 font-mono text-muted-foreground">
                        {(icon.figmaW / icon.figmaH).toFixed(3)}
                      </td>
                    </tr>
                  ))}
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
                title: "Usar sempre a razão W/H do Figma",
                note: "A proporção registrada em figmaW e figmaH é a fonte da verdade. Não ajuste visualmente — confie na razão calculada.",
              },
              {
                index: "03",
                title: "Definir uma altura de referência por contexto",
                note: "Para uso em UI (cards, listas), use uma altura menor — por exemplo 48px ou 64px. Para showcases e marketing, use uma altura maior. A ICON_REF_HEIGHT de 160px é a referência de documentação.",
              },
              {
                index: "04",
                title: "Usar a função iconDisplayWidth() para calcular",
                note: "A função utilitária em src/data/icons.ts calcula a largura correta para qualquer altura de referência. Não calcule manualmente.",
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
