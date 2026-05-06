import { Input } from "@/components/ui/input";
import { Field } from "@/components/field";
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

export default function InputPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Input"
        description="Campo de texto para formulários. Suporta todos os tipos HTML, estados de foco, erro e desabilitado."
      />

      <Section
        title="Visão geral"
        subtitle="O Input é o campo de texto base do design system. Use sempre dentro de Field para label e erro."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Estados básicos
            </Typography>
            <div className="ds-card !p-[30px] flex flex-col gap-4 max-w-sm">
              <Input placeholder="Padrão" />
              <Input placeholder="Desabilitado" disabled />
              <Input placeholder="Inválido" aria-invalid />
              <Input type="password" placeholder="Senha" />
              <Input type="file" />
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { Input } from "@/components/ui/input"`}
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Com Field"
        subtitle="Use sempre o componente Field para adicionar label, descrição e erro ao Input."
      >
        <div className="flex flex-col gap-6">
          <div className="grid gap-4 xl:grid-cols-2">
            <div className="ds-card !p-[30px] flex flex-col gap-4">
              <Field label="Nome" htmlFor="i-nome" required>
                <Input id="i-nome" placeholder="Breno Masi" />
              </Field>

              <Field label="E-mail" htmlFor="i-email" description="Use seu e-mail corporativo.">
                <Input id="i-email" type="email" placeholder="breno@empresa.com" />
              </Field>

              <Field label="Senha" htmlFor="i-senha" error="Mínimo de 8 caracteres.">
                <Input id="i-senha" type="password" aria-invalid />
              </Field>

              <Field label="Pesquisa" htmlFor="i-search">
                <Input id="i-search" type="search" placeholder="Buscar..." />
              </Field>
            </div>

            <div className="ds-card !p-[30px] flex flex-col gap-4">
              <Field label="Número" htmlFor="i-num">
                <Input id="i-num" type="number" placeholder="0" />
              </Field>

              <Field label="Data" htmlFor="i-date">
                <Input id="i-date" type="date" />
              </Field>

              <Field label="URL" htmlFor="i-url">
                <Input id="i-url" type="url" placeholder="https://..." />
              </Field>

              <Field label="Desabilitado" htmlFor="i-dis">
                <Input id="i-dis" placeholder="Campo desabilitado" disabled />
              </Field>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Padrão de implementação"
        subtitle="Snippets para os contextos mais comuns do Input."
      >
        <div className="flex flex-col gap-6">
          <CodeBlock
            title="Input com Field"
            code={`import { Input } from "@/components/ui/input"
import { Field } from "@/components/field"

<Field label="E-mail" htmlFor="email" required>
  <Input id="email" type="email" placeholder="nome@empresa.com" />
</Field>`}
          />

          <CodeBlock
            title="Input com erro"
            code={`<Field label="Senha" htmlFor="senha" error="Senha incorreta.">
  <Input
    id="senha"
    type="password"
    aria-invalid  // ativa o visual de erro
  />
</Field>`}
          />

          <CodeBlock
            title="Input controlado"
            code={`"use client"
import { useState } from "react"

export function InputDemo() {
  const [value, setValue] = useState("")

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Digite aqui..."
    />
  )
}`}
          />
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="O Input aceita todas as props nativas do elemento input HTML."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Props principais
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                { name: "type", type: "string", note: "Tipo HTML: text, email, password, number, date, search, file, url, tel." },
                { name: "placeholder", type: "string", note: "Texto de placeholder." },
                { name: "disabled", type: "boolean", note: "Desabilita o campo." },
                { name: "aria-invalid", type: "boolean | 'true'", note: "Ativa o visual de erro e o ring vermelho." },
                { name: "value", type: "string", note: "Valor controlado." },
                { name: "onChange", type: "(e: ChangeEvent) => void", note: "Callback de mudança." },
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
                Sempre use dentro de <code className="font-mono text-foreground">Field</code> com <code className="font-mono text-foreground">label</code> e <code className="font-mono text-foreground">htmlFor</code> correspondente ao <code className="font-mono text-foreground">id</code> do input.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                O foco visível via <code className="font-mono text-foreground">focus-visible:ring</code> já está incluso.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
