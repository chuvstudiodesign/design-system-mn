/* eslint-disable react/no-unescaped-entities */
import { Checkbox } from "@/components/ui/checkbox";
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

export default function CheckboxPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Checkbox"
        description="Componente de seleção binária para formulários. Suporta estado marcado, desmarcado, indeterminado e desabilitado."
      />

      <Section
        title="Visão geral"
        subtitle="O Checkbox é um input de seleção que aceita estado checked, unchecked e indeterminate."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Estados básicos
            </Typography>
            <div className="ds-card !p-[30px] flex flex-wrap items-start gap-6">
              <div className="flex items-center gap-2">
                <Checkbox id="cb-unchecked" />
                <label htmlFor="cb-unchecked" className="text-sm text-foreground cursor-pointer">
                  Desmarcado
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="cb-checked" defaultChecked />
                <label htmlFor="cb-checked" className="text-sm text-foreground cursor-pointer">
                  Marcado
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="cb-disabled" disabled />
                <label htmlFor="cb-disabled" className="text-sm text-muted-foreground cursor-not-allowed">
                  Desabilitado
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="cb-disabled-checked" disabled defaultChecked />
                <label htmlFor="cb-disabled-checked" className="text-sm text-muted-foreground cursor-not-allowed">
                  Desabilitado marcado
                </label>
              </div>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { Checkbox } from "@/components/ui/checkbox"`}
            </Typography>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Uso com label
            </Typography>
            <Typography as="p" variant="body-sm" className="mt-3 text-muted-foreground">
              Sempre associe um <code className="font-mono text-foreground">label</code> via <code className="font-mono text-foreground">htmlFor</code> ou envolva o Checkbox e label em um <code className="font-mono text-foreground">label</code> pai para acessibilidade correta.
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Lista de seleção"
        subtitle="Padrão comum para listas de opções com checkboxes."
      >
        <div className="flex flex-col gap-6">
          <div className="ds-card !p-[30px] w-full max-w-sm flex flex-col gap-4">
            <Typography as="p" variant="h3" className="text-foreground">
              Notificações
            </Typography>
            {[
              { id: "email", label: "E-mail", checked: true },
              { id: "sms", label: "SMS", checked: false },
              { id: "push", label: "Push notifications", checked: true },
              { id: "weekly", label: "Resumo semanal", checked: false },
            ].map(({ id, label, checked }) => (
              <div key={id} className="flex items-center gap-3">
                <Checkbox id={id} defaultChecked={checked} />
                <label htmlFor={id} className="text-sm text-foreground cursor-pointer">
                  {label}
                </label>
              </div>
            ))}
          </div>

          <CodeBlock
            title="Lista de checkboxes"
            code={`<div className="flex flex-col gap-3">
  <div className="flex items-center gap-3">
    <Checkbox id="email" defaultChecked />
    <label htmlFor="email" className="text-sm cursor-pointer">
      E-mail
    </label>
  </div>
  <div className="flex items-center gap-3">
    <Checkbox id="sms" />
    <label htmlFor="sms" className="text-sm cursor-pointer">
      SMS
    </label>
  </div>
</div>`}
          />
        </div>
      </Section>

      <Section
        title="Controlled"
        subtitle="Uso controlado com estado React para integração em formulários."
      >
        <div className="flex flex-col gap-6">
          <CodeBlock
            title="Checkbox controlado"
            code={`"use client"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"

export function CheckboxDemo() {
  const [checked, setChecked] = useState(false)

  return (
    <div className="flex items-center gap-3">
      <Checkbox
        id="termos"
        checked={checked}
        onCheckedChange={(value) => setChecked(Boolean(value))}
      />
      <label htmlFor="termos" className="text-sm cursor-pointer">
        Aceito os termos de uso
      </label>
    </div>
  )
}`}
          />

          <CodeBlock
            title="Com React Hook Form"
            code={`<FormField
  control={form.control}
  name="aceito"
  render={({ field }) => (
    <FormItem className="flex items-center gap-3">
      <FormControl>
        <Checkbox
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      </FormControl>
      <FormLabel>Aceito os termos</FormLabel>
    </FormItem>
  )}
/>`}
          />
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="API do Checkbox disponível no projeto."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Props principais
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                {
                  name: "checked",
                  type: "boolean | 'indeterminate'",
                  note: "Estado controlado. Use com onCheckedChange para formulários.",
                },
                {
                  name: "defaultChecked",
                  type: "boolean",
                  note: "Estado inicial não-controlado.",
                },
                {
                  name: "onCheckedChange",
                  type: "(checked: boolean | 'indeterminate') => void",
                  note: "Callback chamado ao mudar o estado.",
                },
                {
                  name: "disabled",
                  type: "boolean",
                  note: "Desabilita a interação.",
                },
                {
                  name: "id",
                  type: "string",
                  note: "Necessário para associar com label via htmlFor.",
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
                O componente renderiza um <code className="font-mono text-foreground">button</code> com <code className="font-mono text-foreground">role="checkbox"</code> e <code className="font-mono text-foreground">aria-checked</code> gerenciados automaticamente.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Sempre associe um label via <code className="font-mono text-foreground">htmlFor</code> para que leitores de tela anunciem o propósito do checkbox.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Foco visível e navegação por teclado (Space para toggle) estão incluídos.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
