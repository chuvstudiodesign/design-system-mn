import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
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

const AlignLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="21" x2="3" y1="6" y2="6" /><line x1="15" x2="3" y1="12" y2="12" /><line x1="17" x2="3" y1="18" y2="18" />
  </svg>
);
const AlignCenterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="21" x2="3" y1="6" y2="6" /><line x1="17" x2="7" y1="12" y2="12" /><line x1="19" x2="5" y1="18" y2="18" />
  </svg>
);
const AlignRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="21" x2="3" y1="6" y2="6" /><line x1="21" x2="9" y1="12" y2="12" /><line x1="21" x2="7" y1="18" y2="18" />
  </svg>
);

export default function ToggleGroupPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Toggle Group"
        description="Grupo de toggles para seleção única ou múltipla. Ideal para barras de ferramentas, filtros e seleção de visualização."
      />

      <Section
        title="Visão geral"
        subtitle="ToggleGroup gerencia o estado de múltiplos Toggles com seleção single ou multiple."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Typography as="p" variant="h3" className="text-foreground">Single (exclusivo)</Typography>
              <div className="ds-card !p-[30px] flex flex-wrap gap-6">
                <ToggleGroup defaultValue={["center"]}>
                  <ToggleGroupItem value="left" aria-label="Alinhar esquerda"><AlignLeftIcon /></ToggleGroupItem>
                  <ToggleGroupItem value="center" aria-label="Centralizar"><AlignCenterIcon /></ToggleGroupItem>
                  <ToggleGroupItem value="right" aria-label="Alinhar direita"><AlignRightIcon /></ToggleGroupItem>
                </ToggleGroup>

                <ToggleGroup defaultValue={["grade"]}>
                  <ToggleGroupItem value="lista">Lista</ToggleGroupItem>
                  <ToggleGroupItem value="grade">Grade</ToggleGroupItem>
                  <ToggleGroupItem value="kanban">Kanban</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Typography as="p" variant="h3" className="text-foreground">Multiple (cumulativo)</Typography>
              <div className="ds-card !p-[30px]">
                <ToggleGroup multiple defaultValue={["negrito"]}>
                  <ToggleGroupItem value="negrito" aria-label="Negrito">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                      <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />
                    </svg>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="italico" aria-label="Itálico">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                      <line x1="19" x2="10" y1="4" y2="4" /><line x1="14" x2="5" y1="20" y2="20" /><line x1="15" x2="9" y1="4" y2="20" />
                    </svg>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="sublinhado" aria-label="Sublinhado">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                      <path d="M6 4v6a6 6 0 0 0 12 0V4" /><line x1="4" x2="20" y1="20" y2="20" />
                    </svg>
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Import</Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"`}
            </Typography>
          </div>
        </div>
      </Section>

      <Section title="Padrão de implementação" subtitle="Snippets para uso do ToggleGroup.">
        <div className="flex flex-col gap-6">
          <CodeBlock title="Seleção de visualização (single)" code={`"use client"
import { useState } from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function ViewToggle() {
  const [view, setView] = useState("grid")

  return (
    <ToggleGroup type="single" value={view} onValueChange={(v) => v && setView(v)}>
      <ToggleGroupItem value="list">Lista</ToggleGroupItem>
      <ToggleGroupItem value="grid">Grade</ToggleGroupItem>
    </ToggleGroup>
  )
}`} />

          <CodeBlock title="Filtros de formatação (multiple)" code={`const [formatos, setFormatos] = useState<string[]>(["bold"])

<ToggleGroup
  type="multiple"
  value={formatos}
  onValueChange={setFormatos}
>
  <ToggleGroupItem value="bold" aria-label="Negrito">B</ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Itálico">I</ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Sublinhado">U</ToggleGroupItem>
</ToggleGroup>`} />
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
