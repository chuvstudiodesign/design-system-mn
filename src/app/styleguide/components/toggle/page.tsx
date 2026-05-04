import { Toggle } from "@/components/ui/toggle";
import { Typography } from "@/components/typography";
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

const BoldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />
  </svg>
);

const ItalicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" x2="10" y1="4" y2="4" /><line x1="14" x2="5" y1="20" y2="20" /><line x1="15" x2="9" y1="4" y2="20" />
  </svg>
);

const UnderlineIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4v6a6 6 0 0 0 12 0V4" /><line x1="4" x2="20" y1="20" y2="20" />
  </svg>
);

export default function TogglePage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Toggle"
        description="Botão com estado pressionado/não-pressionado. Para formatação de texto, filtros ativos e preferências binárias com visual de botão."
      />

      <Section
        title="Visão geral"
        subtitle="O Toggle é visualmente um botão mas semanticamente um interruptor (pressed/not pressed). Tem variantes e tamanhos idênticos ao Button."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">Variantes</Typography>
            <div className="ds-card !p-[30px] flex flex-wrap items-center gap-3">
              <Toggle aria-label="Default">Default</Toggle>
              <Toggle variant="outline" aria-label="Outline">Outline</Toggle>
              <Toggle defaultPressed aria-label="Pressionado">Ativo</Toggle>
              <Toggle disabled aria-label="Disabled">Disabled</Toggle>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">Com ícones (formatação)</Typography>
            <div className="ds-card !p-[30px] flex items-center gap-1">
              <Toggle aria-label="Negrito" size="sm">
                <BoldIcon />
              </Toggle>
              <Toggle aria-label="Itálico" size="sm" defaultPressed>
                <ItalicIcon />
              </Toggle>
              <Toggle aria-label="Sublinhado" size="sm">
                <UnderlineIcon />
              </Toggle>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Import</Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { Toggle } from "@/components/ui/toggle"`}
            </Typography>
          </div>
        </div>
      </Section>

      <Section title="Tamanhos" subtitle="O Toggle usa os mesmos tamanhos que o Button.">
        <div className="ds-card !p-[30px] flex flex-wrap items-end gap-4">
          {(["sm", "default", "lg"] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <Toggle size={size}>{size}</Toggle>
              <Typography as="p" variant="caption" className="normal-case tracking-normal text-muted-foreground">{size}</Typography>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Padrão de implementação" subtitle="Snippets para uso do Toggle.">
        <div className="flex flex-col gap-6">
          <CodeBlock title="Toggle controlado" code={`"use client"
import { useState } from "react"
import { Toggle } from "@/components/ui/toggle"
import { BoldIcon } from "lucide-react"

export function FormatToggle() {
  const [bold, setBold] = useState(false)

  return (
    <Toggle
      pressed={bold}
      onPressedChange={setBold}
      aria-label="Negrito"
    >
      <BoldIcon />
    </Toggle>
  )
}`} />

          <CodeBlock title="Toggle de filtro" code={`<Toggle
  variant="outline"
  pressed={filtroAtivo}
  onPressedChange={setFiltroAtivo}
>
  Apenas ativos
</Toggle>`} />
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
