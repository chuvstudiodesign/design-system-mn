import { Textarea } from "@/components/ui/textarea";
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
      <Typography as="p" variant="label" className="normal-case tracking-normal text-black">{title}</Typography>
      <div className="bg-[#D4D4D4] p-5">
        <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[12px] leading-6 text-foreground"><code>{code}</code></pre>
      </div>
    </div>
  );
}

export default function TextareaPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Textarea"
        description="Campo de texto multilinha. Usa field-sizing-content para se ajustar automaticamente ao conteúdo."
      />

      <Section
        title="Visão geral"
        subtitle="O Textarea cresce automaticamente com o conteúdo via field-sizing-content. Use dentro de Field para label e erro."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">Estados básicos</Typography>
            <div className="ds-card !p-[30px] flex flex-col gap-4 max-w-sm">
              <Field label="Mensagem" htmlFor="ta-default" description="Escreva sua mensagem aqui.">
                <Textarea id="ta-default" placeholder="Escreva algo..." />
              </Field>
              <Field label="Desabilitado" htmlFor="ta-dis">
                <Textarea id="ta-dis" placeholder="Campo desabilitado" disabled />
              </Field>
              <Field label="Com erro" htmlFor="ta-err" error="Mensagem muito curta (mínimo 20 caracteres).">
                <Textarea id="ta-err" placeholder="Muito curto..." aria-invalid />
              </Field>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Import</Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { Textarea } from "@/components/ui/textarea"`}
            </Typography>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Auto-resize</Typography>
            <Typography as="p" variant="body-sm" className="mt-3 text-muted-foreground">
              O Textarea usa <code className="font-mono text-foreground">field-sizing-content</code> que faz o campo crescer conforme o usuário digita. Para altura mínima fixa, use <code className="font-mono text-foreground">rows</code> ou <code className="font-mono text-foreground">min-h-*</code>.
            </Typography>
          </div>
        </div>
      </Section>

      <Section title="Variações" subtitle="Exemplos com altura controlada e resize desabilitado.">
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px] flex flex-col gap-4">
            <Field label="Altura mínima via rows" htmlFor="ta-rows">
              <Textarea id="ta-rows" rows={4} placeholder="Mínimo 4 linhas" />
            </Field>
            <Field label="Resize desabilitado" htmlFor="ta-noresize">
              <Textarea id="ta-noresize" className="resize-none" rows={3} placeholder="Sem resize" />
            </Field>
          </div>
          <div className="ds-card !p-[30px] flex flex-col gap-4">
            <Field label="Comentário" htmlFor="ta-comment">
              <Textarea id="ta-comment" placeholder="Deixe seu comentário..." className="min-h-[120px]" />
            </Field>
          </div>
        </div>
      </Section>

      <Section title="Padrão de implementação" subtitle="Snippets para uso do Textarea.">
        <div className="flex flex-col gap-6">
          <CodeBlock title="Textarea com Field" code={`import { Textarea } from "@/components/ui/textarea"
import { Field } from "@/components/field"

<Field label="Descrição" htmlFor="desc" required>
  <Textarea
    id="desc"
    placeholder="Descreva o problema..."
    rows={4}
  />
</Field>`} />

          <CodeBlock title="Textarea controlado" code={`"use client"
import { useState } from "react"

export function TextareaDemo() {
  const [value, setValue] = useState("")

  return (
    <div className="flex flex-col gap-1">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Escreva aqui..."
        maxLength={500}
      />
      <span className="text-xs text-muted-foreground text-right">
        {value.length}/500
      </span>
    </div>
  )
}`} />
        </div>
      </Section>

      <Section title="Props e uso" subtitle="API do Textarea.">
        <div className="ds-card !p-[30px] max-w-lg">
          <Typography as="p" variant="h3" className="mb-4 text-foreground">Props principais</Typography>
          <div className="flex flex-col gap-4">
            {[
              { name: "rows", type: "number", note: "Altura mínima em linhas." },
              { name: "placeholder", type: "string", note: "Texto de placeholder." },
              { name: "disabled", type: "boolean", note: "Desabilita o campo." },
              { name: "aria-invalid", type: "boolean", note: "Ativa o visual de erro." },
              { name: "className", type: "string", note: "Use resize-none para bloquear redimensionamento manual." },
            ].map((item) => (
              <div key={item.name} className="border-b border-white pb-4 last:border-0 last:pb-0">
                <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">{item.name}</Typography>
                <Typography as="p" variant="code" className="mt-1 text-foreground">{item.type}</Typography>
                <Typography as="p" variant="body-sm" className="mt-2 text-muted-foreground">{item.note}</Typography>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
