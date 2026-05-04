/* eslint-disable react/no-unescaped-entities */
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
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

export default function CommandPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Command"
        description="Componente de paleta de comandos com busca integrada. Base para Combobox, Command Dialog e qualquer buscador de lista."
      />

      <Section
        title="Visão geral"
        subtitle="O Command é uma paleta de busca extensível baseada em cmdk. Pode ser embutida inline ou exibida em um Dialog."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Demo inline
            </Typography>
            <div className="ds-card !p-[30px] w-full max-w-md">
              <Command className="rounded-[10px] border border-border shadow-none">
                <CommandInput placeholder="Buscar comando..." />
                <CommandList>
                  <CommandEmpty>Nenhum resultado.</CommandEmpty>
                  <CommandGroup heading="Sugestões">
                    <CommandItem>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                      </svg>
                      Calendário
                    </CommandItem>
                    <CommandItem>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3L14.5 4z" /><circle cx="12" cy="13" r="3" />
                      </svg>
                      Câmera
                    </CommandItem>
                    <CommandItem>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                      </svg>
                      Buscar
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Configurações">
                    <CommandItem>
                      Perfil
                      <CommandShortcut>⌘P</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                      Faturamento
                      <CommandShortcut>⌘B</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                      Configurações
                      <CommandShortcut>⌘S</CommandShortcut>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import {
  Command, CommandDialog, CommandEmpty, CommandGroup,
  CommandInput, CommandItem, CommandList,
  CommandSeparator, CommandShortcut
} from "@/components/ui/command"`}
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Sub-componentes"
        subtitle="O Command é composto por várias partes que trabalham juntas para criar a experiência de busca."
      >
        <div className="grid gap-4 xl:grid-cols-2">
          {[
            {
              name: "Command",
              note: "Container raiz. Gerencia o estado de busca e filtro dos itens.",
            },
            {
              name: "CommandInput",
              note: "Campo de texto de busca. Filtra os CommandItems automaticamente.",
            },
            {
              name: "CommandList",
              note: "Container da lista de resultados. Gerencia scroll e visibilidade.",
            },
            {
              name: "CommandEmpty",
              note: "Exibido quando nenhum item corresponde à busca.",
            },
            {
              name: "CommandGroup",
              note: "Agrupa itens relacionados com um cabeçalho opcional (heading prop).",
            },
            {
              name: "CommandItem",
              note: "Item individual da lista. Selecionável por teclado e mouse.",
            },
            {
              name: "CommandSeparator",
              note: "Divisor visual entre grupos.",
            },
            {
              name: "CommandShortcut",
              note: "Exibe atalho de teclado à direita de um item.",
            },
          ].map((item) => (
            <div key={item.name} className="ds-card !p-[30px] flex flex-col gap-1">
              <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
                {item.name}
              </Typography>
              <Typography as="p" variant="body-sm" className="mt-1 text-muted-foreground">
                {item.note}
              </Typography>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Padrão de implementação"
        subtitle="Snippets para os contextos mais comuns do Command no projeto."
      >
        <div className="flex flex-col gap-6">
          <CodeBlock
            title="Command inline"
            code={`<Command className="rounded-[10px] border border-border">
  <CommandInput placeholder="Buscar..." />
  <CommandList>
    <CommandEmpty>Sem resultados.</CommandEmpty>
    <CommandGroup heading="Ações">
      <CommandItem onSelect={() => { /* ação */ }}>
        Criar novo item
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}
          />

          <CodeBlock
            title="Command Dialog (paleta de comandos)"
            code={`"use client"
import { useState, useEffect } from "react"
import { CommandDialog, CommandInput, CommandList, ... } from "@/components/ui/command"

export function PaletaDeComandos() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Digite um comando..." />
      <CommandList>
        <CommandGroup heading="Navegação">
          <CommandItem onSelect={() => setOpen(false)}>Dashboard</CommandItem>
          <CommandItem onSelect={() => setOpen(false)}>Configurações</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}`}
          />
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="API dos principais sub-componentes do Command."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              CommandItem
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                {
                  name: "value",
                  type: "string",
                  note: "Valor usado para filtrar o item. Se não informado, usa o texto do children.",
                },
                {
                  name: "onSelect",
                  type: "(value: string) => void",
                  note: "Callback chamado ao selecionar o item.",
                },
                {
                  name: "disabled",
                  type: "boolean",
                  note: "Desabilita o item.",
                },
                {
                  name: "keywords",
                  type: "string[]",
                  note: "Palavras-chave adicionais para busca (além do texto visível).",
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
                O Command usa <code className="font-mono text-foreground">role="combobox"</code> e <code className="font-mono text-foreground">aria-haspopup="listbox"</code> automaticamente.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Navegação por teclado: setas para mover, Enter para selecionar, Escape para fechar (no Dialog).
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                O CommandDialog usa Dialog do shadcn e herda seu suporte completo a foco preso e ARIA.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
