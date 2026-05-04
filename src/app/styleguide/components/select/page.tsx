import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export default function SelectPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Select"
        description="Campo de seleção estilizado com popover de opções. Suporta grupos, labels e opções desabilitadas."
      />

      <Section title="Visão geral" subtitle="O Select é mais rico que o NativeSelect — suporta grupos, ícones e customização visual completa." first>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">Demo</Typography>
            <div className="ds-card !p-[30px] flex flex-col gap-4 max-w-sm">
              <Field label="Framework" htmlFor="sel-fw">
                <Select>
                  <SelectTrigger id="sel-fw">
                    <SelectValue placeholder="Selecionar framework" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>React</SelectLabel>
                      <SelectItem value="next">Next.js</SelectItem>
                      <SelectItem value="remix">Remix</SelectItem>
                      <SelectItem value="astro">Astro</SelectItem>
                    </SelectGroup>
                    <SelectSeparator />
                    <SelectGroup>
                      <SelectLabel>Vue</SelectLabel>
                      <SelectItem value="nuxt">Nuxt.js</SelectItem>
                      <SelectItem value="quasar" disabled>Quasar (em breve)</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Tamanho" htmlFor="sel-size">
                <Select defaultValue="md">
                  <SelectTrigger id="sel-size">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sm">Pequeno</SelectItem>
                    <SelectItem value="md">Médio</SelectItem>
                    <SelectItem value="lg">Grande</SelectItem>
                    <SelectItem value="xl">Extra grande</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Import</Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import {
  Select, SelectContent, SelectGroup, SelectItem,
  SelectLabel, SelectSeparator, SelectTrigger, SelectValue
} from "@/components/ui/select"`}
            </Typography>
          </div>
        </div>
      </Section>

      <Section title="Padrão de implementação" subtitle="Snippets para uso do Select.">
        <div className="flex flex-col gap-6">
          <CodeBlock title="Select controlado" code={`"use client"
import { useState } from "react"

export function SelectDemo() {
  const [value, setValue] = useState("")

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger>
        <SelectValue placeholder="Selecionar..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="opcao1">Opção 1</SelectItem>
        <SelectItem value="opcao2">Opção 2</SelectItem>
      </SelectContent>
    </Select>
  )
}`} />

          <CodeBlock title="Com grupos" code={`<Select>
  <SelectTrigger>
    <SelectValue placeholder="Selecionar país" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>América do Sul</SelectLabel>
      <SelectItem value="br">Brasil</SelectItem>
      <SelectItem value="ar">Argentina</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Europa</SelectLabel>
      <SelectItem value="pt">Portugal</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`} />
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
