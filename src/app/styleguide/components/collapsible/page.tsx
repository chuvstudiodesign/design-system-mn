"use client";

import * as React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/typography";
import {
  FoundationFooter,
  FoundationPageHeader,
  Section,
} from "../../foundation-sections";

function CodeBlock({ title, code }: { title: string; code: string }) {
  return (
    <div className="flex flex-col gap-3">
      <Typography as="p" variant="label" className="normal-case tracking-normal text-black">
        {title}
      </Typography>
      <div className="bg-[#D4D4D4] p-5">
        <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[12px] leading-6 text-foreground">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

function CollapsibleDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-full max-w-sm">
      <div className="flex items-center justify-between gap-4">
        <Typography as="p" variant="body" className="font-medium text-foreground">
          Repositórios recentes
        </Typography>
        <CollapsibleTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Expandir" />}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
        </CollapsibleTrigger>
      </div>

      <div className="mt-2 rounded-[10px] border border-border px-4 py-2">
        <Typography as="p" variant="body-sm" className="text-foreground">
          design-system-mn
        </Typography>
      </div>

      <CollapsibleContent className="mt-2 flex flex-col gap-2">
        <div className="rounded-[10px] border border-border px-4 py-2">
          <Typography as="p" variant="body-sm" className="text-foreground">
            next-app-template
          </Typography>
        </div>
        <div className="rounded-[10px] border border-border px-4 py-2">
          <Typography as="p" variant="body-sm" className="text-foreground">
            shadcn-components
          </Typography>
        </div>
        <div className="rounded-[10px] border border-border px-4 py-2">
          <Typography as="p" variant="body-sm" className="text-foreground">
            ui-tokens-lib
          </Typography>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default function CollapsiblePage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Collapsible"
        description="Componente para mostrar e ocultar conteúdo de forma interativa, com controle total sobre o trigger e o conteúdo."
      />

      <Section
        title="Visão geral"
        subtitle="O Collapsible é mais primitivo que o Accordion: você controla completamente o trigger e o visual do container."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Demo interativa
            </Typography>
            <div className="ds-card !p-[30px]">
              <CollapsibleDemo />
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import {
  Collapsible, CollapsibleTrigger, CollapsibleContent
} from "@/components/ui/collapsible"`}
            </Typography>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Diferença em relação ao Accordion
            </Typography>
            <Typography as="p" variant="body-sm" className="mt-3 text-muted-foreground">
              Use <strong className="text-foreground">Collapsible</strong> quando precisar de um único bloco expansível com trigger customizado. Use <strong className="text-foreground">Accordion</strong> quando tiver múltiplos itens e quiser gerenciamento automático de abertura/fechamento.
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Padrão de implementação"
        subtitle="Snippets para o uso controlado e não-controlado do Collapsible."
      >
        <div className="flex flex-col gap-6">
          <CodeBlock
            title="Collapsible controlado"
            code={`"use client"
import { useState } from "react"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"

export function MeuCollapsible() {
  const [open, setOpen] = useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Detalhes adicionais</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon-sm">
            <ChevronsUpDownIcon />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <p className="text-sm text-muted-foreground mt-2">
          Conteúdo expandido que fica oculto por padrão.
        </p>
      </CollapsibleContent>
    </Collapsible>
  )
}`}
          />

          <CodeBlock
            title="Collapsible não-controlado (defaultOpen)"
            code={`<Collapsible defaultOpen>
  <CollapsibleTrigger>Ver mais</CollapsibleTrigger>
  <CollapsibleContent>
    Conteúdo adicional...
  </CollapsibleContent>
</Collapsible>`}
          />
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="API dos sub-componentes do Collapsible."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Props principais
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                {
                  name: "open",
                  type: "boolean",
                  note: "Estado controlado de abertura.",
                },
                {
                  name: "defaultOpen",
                  type: "boolean",
                  note: "Estado inicial não-controlado.",
                },
                {
                  name: "onOpenChange",
                  type: "(open: boolean) => void",
                  note: "Callback chamado ao abrir/fechar.",
                },
                {
                  name: "disabled",
                  type: "boolean",
                  note: "Desabilita a abertura/fechamento.",
                },
                {
                  name: "CollapsibleTrigger asChild",
                  type: "boolean",
                  note: "Mescla o trigger com o filho. Use para ter um Button ou elemento customizado como trigger.",
                },
              ].map((item) => (
                <div key={item.name} className="border-b border-white pb-4 last:border-0 last:pb-0">
                  <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
                    {item.name}
                  </Typography>
                  <Typography as="p" variant="code" className="mt-1 text-foreground">
                    {item.type}
                  </Typography>
                  <Typography as="p" variant="body-sm" className="mt-2 text-muted-foreground">
                    {item.note}
                  </Typography>
                </div>
              ))}
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Acessibilidade
            </Typography>
            <div className="flex flex-col gap-3">
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                O <code className="font-mono text-foreground">CollapsibleTrigger</code> gerencia automaticamente os atributos <code className="font-mono text-foreground">aria-expanded</code> e <code className="font-mono text-foreground">aria-controls</code>.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Use <code className="font-mono text-foreground">asChild</code> no trigger para que o elemento filho herde os atributos de acessibilidade.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                O conteúdo colapsado é removido visualmente mas permanece no DOM com <code className="font-mono text-foreground">hidden</code> quando fechado.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
