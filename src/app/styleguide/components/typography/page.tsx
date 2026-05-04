import { Typography } from "@/components/typography";
import { Separator } from "@/components/ui/separator";
import {
  FoundationFooter,
  FoundationPageHeader,
  Section,
} from "../../foundation-sections";

function CodeBlock({ title, code }: { title: string; code: string }) {
  return (
    <div className="flex flex-col gap-3">
      <Typography as="p" variant="label" className="normal-case tracking-normal text-black">{title}</Typography>
      <div className="bg-[#D4D4D4] p-5">
        <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[12px] leading-6 text-foreground"><code>{code}</code></pre>
      </div>
    </div>
  );
}

const variants = [
  { variant: "display" as const, label: "Display", size: "48px / 800 / -0.02em" },
  { variant: "h1" as const, label: "H1", size: "32px / 700 / -0.02em" },
  { variant: "h2" as const, label: "H2", size: "24px / 700 / -0.02em" },
  { variant: "h3" as const, label: "H3", size: "18px / 600 / -0.02em" },
  { variant: "body-lg" as const, label: "Body Large", size: "18px / 400 / lh 1.6" },
  { variant: "body" as const, label: "Body", size: "15px / 400 / lh 1.6" },
  { variant: "body-sm" as const, label: "Body Small", size: "13px / 400 / lh 1.6" },
  { variant: "label" as const, label: "Label", size: "12px / 600 / uppercase / ls 0.08em" },
  { variant: "caption" as const, label: "Caption", size: "11px / 500 / uppercase / ls 0.06em" },
  { variant: "muted" as const, label: "Muted", size: "15px / 400 / muted-foreground" },
  { variant: "code" as const, label: "Code", size: "12px / mono / lh 1.5" },
];

export default function TypographyPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Typography"
        description="Componente polimórfico para toda a tipografia do design system. Escala completa de variantes com element-as prop."
      />

      <Section
        title="Escala tipográfica"
        subtitle="O componente Typography encapsula todas as variantes de texto do sistema. Cada variante mapeia para um tamanho e peso específico."
        first
      >
        <div className="flex flex-col gap-0">
          {variants.map(({ variant, label, size }) => (
            <div key={variant} className="flex items-baseline gap-6 border-b border-white py-4 last:border-0">
              <div className="w-24 shrink-0">
                <span className="font-mono text-[11px] text-muted-foreground">{label}</span>
              </div>
              <Typography variant={variant} className={variant === "display" || variant === "h1" ? "text-foreground" : undefined}>
                {variant === "label" || variant === "caption"
                  ? "Rótulo de campo"
                  : variant === "code"
                  ? "const x = 42"
                  : "A fonte do sistema é Inter"}
              </Typography>
              <div className="ml-auto shrink-0">
                <span className="font-mono text-[10px] text-muted-foreground">{size}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Como usar" subtitle="O componente Typography usa a prop as para controlar o elemento HTML e variant para o estilo.">
        <div className="flex flex-col gap-6">
          <div className="ds-card !p-[30px] flex flex-col gap-4">
            <Typography as="h1" variant="display" className="text-foreground">Display</Typography>
            <Typography as="h1" variant="h1" className="text-foreground">Título H1</Typography>
            <Typography as="h2" variant="h2" className="text-foreground">Título H2</Typography>
            <Typography as="h3" variant="h3" className="text-foreground">Título H3</Typography>
            <Separator />
            <Typography as="p" variant="body-lg">Texto largo para introduções e leads de seção.</Typography>
            <Typography as="p" variant="body">Corpo padrão para leitura contínua e parágrafos de conteúdo.</Typography>
            <Typography as="p" variant="body-sm">Corpo pequeno para metadados, legendas e informações secundárias.</Typography>
            <Separator />
            <Typography as="p" variant="label">Rótulo de seção</Typography>
            <Typography as="p" variant="caption">Caption e metadados</Typography>
            <Typography as="p" variant="muted">Texto em muted-foreground para notas e avisos discretos.</Typography>
            <Typography as="code" variant="code">const system = &quot;MN Design System&quot;</Typography>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Import</Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { Typography } from "@/components/typography"`}
            </Typography>
          </div>
        </div>
      </Section>

      <Section title="Padrão de implementação" subtitle="Exemplos de uso do componente Typography em diferentes contextos.">
        <div className="flex flex-col gap-6">
          <CodeBlock title="Hierarquia de texto em card" code={`<div className="ds-card !p-[30px]">
  <Typography as="p" variant="label" className="text-primary">
    SEÇÃO
  </Typography>
  <Typography as="h2" variant="h2" className="mt-2 text-foreground">
    Título do card
  </Typography>
  <Typography as="p" variant="body-sm" className="mt-3 text-muted-foreground">
    Descrição complementar com detalhes sobre o conteúdo.
  </Typography>
</div>`} />

          <CodeBlock title="Elemento polimórfico (as prop)" code={`// Renderiza como <h1> mas com estilo de h2
<Typography as="h1" variant="h2">
  Título semântico h1 com estilo h2
</Typography>

// Renderiza como <p> mas com estilo de label
<Typography as="p" variant="label">
  Rótulo em parágrafo
</Typography>

// Renderiza como <span> com estilo de body-sm
<Typography as="span" variant="body-sm">
  Texto inline
</Typography>`} />
        </div>
      </Section>

      <Section title="Props e uso" subtitle="API do componente Typography.">
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">Props</Typography>
            <div className="flex flex-col gap-4">
              {[
                {
                  name: "variant",
                  type: `"display" | "h1" | "h2" | "h3" | "body-lg" | "body" | "body-sm" | "label" | "caption" | "muted" | "code"`,
                  note: "Controla o tamanho, peso e família da fonte.",
                },
                {
                  name: "as",
                  type: "ElementType",
                  note: "Define o elemento HTML renderizado. Por padrão, cada variante tem um elemento padrão (h1 para display, p para body etc.).",
                },
                {
                  name: "className",
                  type: "string",
                  note: "Classes adicionais. Use para sobrescrever a cor (text-foreground, text-primary, etc.).",
                },
                {
                  name: "children",
                  type: "ReactNode",
                  note: "Conteúdo de texto.",
                },
              ].map((item) => (
                <div key={item.name} className="border-b border-white pb-4 last:border-0 last:pb-0">
                  <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">{item.name}</Typography>
                  <Typography as="p" variant="code" className="mt-1 text-foreground">{item.type}</Typography>
                  <Typography as="p" variant="body-sm" className="mt-2 text-muted-foreground">{item.note}</Typography>
                </div>
              ))}
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">Elementos padrão por variante</Typography>
            <div className="flex flex-col gap-2">
              {[
                { variant: "display", element: "h1" },
                { variant: "h1", element: "h1" },
                { variant: "h2", element: "h2" },
                { variant: "h3", element: "h3" },
                { variant: "body-lg / body / body-sm / muted", element: "p" },
                { variant: "label / caption", element: "p" },
                { variant: "code", element: "code" },
              ].map((item) => (
                <div key={item.variant} className="flex items-center gap-3 border-b border-white py-2 last:border-0">
                  <Typography as="span" variant="code" className="shrink-0 text-foreground">{item.variant}</Typography>
                  <span className="text-muted-foreground">→</span>
                  <Typography as="span" variant="code" className="text-primary">&lt;{item.element}&gt;</Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
