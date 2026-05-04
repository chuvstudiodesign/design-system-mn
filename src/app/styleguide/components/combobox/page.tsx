/* eslint-disable react/no-unescaped-entities */
import { Typography } from "@/components/typography";
import {
  FoundationFooter,
  FoundationPageHeader,
  Section,
} from "../../foundation-sections";
import { ComboboxBasicDemo, ComboboxCountryDemo } from "./combobox-demo";

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

export default function ComboboxPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Combobox"
        description="Componente de seleção com busca. Combina um Popover com um Command para criar um select pesquisável e acessível."
      />

      <Section
        title="Visão geral"
        subtitle="O Combobox é um componente customizado construído sobre Command + Popover. Ideal para listas longas que precisam de busca."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Demo básica
            </Typography>
            <div className="ds-card !p-[30px]">
              <ComboboxBasicDemo />
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { Combobox } from "@/components/combobox"`}
            </Typography>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Quando usar
            </Typography>
            <Typography as="p" variant="body-sm" className="mt-3 text-muted-foreground">
              Use Combobox quando a lista tiver mais de 5-7 opções e o usuário precisar filtrar. Para listas curtas, use Select. Para pesquisa livre sem seleção de opção fixa, use Command diretamente.
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Variações"
        subtitle="O Combobox aceita qualquer lista de opções com value e label."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Com valor pré-selecionado
            </Typography>
            <div className="ds-card !p-[30px]">
              <ComboboxCountryDemo />
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Padrão de implementação"
        subtitle="Como usar o Combobox em diferentes contextos do projeto."
      >
        <div className="flex flex-col gap-6">
          <CodeBlock
            title="Combobox básico"
            code={`"use client"
import { useState } from "react"
import { Combobox } from "@/components/combobox"

const opcoes = [
  { value: "op1", label: "Opção 1" },
  { value: "op2", label: "Opção 2" },
  { value: "op3", label: "Opção 3" },
]

export function MeuCombobox() {
  const [valor, setValor] = useState("")

  return (
    <Combobox
      options={opcoes}
      value={valor}
      onValueChange={setValor}
      placeholder="Selecionar opção..."
    />
  )
}`}
          />

          <CodeBlock
            title="Com largura customizada"
            code={`<Combobox
  options={paises}
  value={pais}
  onValueChange={setPais}
  placeholder="País..."
  searchPlaceholder="Buscar país..."
  className="w-[300px]"
/>`}
          />

          <CodeBlock
            title="Interface ComboboxOption"
            code={`interface ComboboxOption {
  value: string  // identificador único
  label: string  // texto exibido na lista e no trigger
}`}
          />
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="API do componente Combobox customizado."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Props
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                {
                  name: "options",
                  type: "ComboboxOption[]",
                  note: "Lista de opções com value e label.",
                },
                {
                  name: "value",
                  type: "string",
                  note: "Valor atualmente selecionado.",
                },
                {
                  name: "onValueChange",
                  type: "(value: string) => void",
                  note: "Callback chamado ao selecionar uma opção. Passa string vazia quando deselecionado.",
                },
                {
                  name: "placeholder",
                  type: "string",
                  note: "Texto exibido no trigger quando nada está selecionado.",
                },
                {
                  name: "searchPlaceholder",
                  type: "string",
                  note: "Placeholder do campo de busca interno.",
                },
                {
                  name: "emptyMessage",
                  type: "string",
                  note: "Mensagem exibida quando nenhum resultado é encontrado.",
                },
                {
                  name: "disabled",
                  type: "boolean",
                  note: "Desabilita o combobox.",
                },
                {
                  name: "className",
                  type: "string",
                  note: "Classes adicionais para o botão trigger. Use para controlar a largura.",
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
                O trigger tem <code className="font-mono text-foreground">role="combobox"</code> e <code className="font-mono text-foreground">aria-expanded</code> gerenciados automaticamente.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                A lista usa cmdk que herda comportamento de <code className="font-mono text-foreground">listbox</code> com navegação por teclado (setas, Enter, Escape).
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Para campos de formulário, associe com um <code className="font-mono text-foreground">label</code> externo ou use dentro do componente Field/Form.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
