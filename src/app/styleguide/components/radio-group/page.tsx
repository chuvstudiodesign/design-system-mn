import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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

export default function RadioGroupPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Radio Group"
        description="Grupo de opções mutuamente exclusivas. O usuário pode selecionar apenas uma opção por vez."
      />

      <Section title="Visão geral" subtitle="O RadioGroup é composto por RadioGroupItem + Label. Use para escolhas exclusivas." first>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">Demo</Typography>
            <div className="ds-card !p-[30px] flex flex-col gap-6 max-w-sm">
              <div>
                <Typography as="p" variant="label" className="mb-3 normal-case tracking-normal text-foreground">Vertical (padrão)</Typography>
                <RadioGroup defaultValue="mensal">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="mensal" id="r-mensal" />
                    <Label htmlFor="r-mensal">Mensal</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="anual" id="r-anual" />
                    <Label htmlFor="r-anual">Anual <span className="text-xs text-primary ml-1">-20%</span></Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="empresarial" id="r-emp" disabled />
                    <Label htmlFor="r-emp" className="opacity-50">Empresarial (em breve)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Typography as="p" variant="label" className="mb-3 normal-case tracking-normal text-foreground">Horizontal</Typography>
                <RadioGroup defaultValue="sim" className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="sim" id="r-sim" />
                    <Label htmlFor="r-sim">Sim</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="nao" id="r-nao" />
                    <Label htmlFor="r-nao">Não</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Import</Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"`}
            </Typography>
          </div>
        </div>
      </Section>

      <Section title="Padrão de implementação" subtitle="Snippets para uso do RadioGroup.">
        <div className="flex flex-col gap-6">
          <CodeBlock title="RadioGroup controlado" code={`"use client"
import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function PlanoSelector() {
  const [plano, setPlano] = useState("mensal")

  return (
    <RadioGroup value={plano} onValueChange={setPlano}>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="mensal" id="plano-mensal" />
        <Label htmlFor="plano-mensal">Mensal</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="anual" id="plano-anual" />
        <Label htmlFor="plano-anual">Anual</Label>
      </div>
    </RadioGroup>
  )
}`} />
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
