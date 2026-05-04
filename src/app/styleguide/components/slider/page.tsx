import { Slider } from "@/components/ui/slider";
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

export default function SliderPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Slider"
        description="Controle deslizante para seleção de valor numérico dentro de um intervalo. Para volume, opacidade, preço e filtros de range."
      />

      <Section title="Visão geral" subtitle="O Slider usa Base UI e é totalmente acessível via teclado." first>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6 max-w-sm">
            <div className="flex flex-col gap-3">
              <Typography as="p" variant="h3" className="text-foreground">Padrão</Typography>
              <div className="ds-card !p-[30px]">
                <Slider defaultValue={[50]} max={100} step={1} />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Typography as="p" variant="h3" className="text-foreground">Range (dois handles)</Typography>
              <div className="ds-card !p-[30px]">
                <Slider defaultValue={[25, 75]} max={100} step={1} />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Typography as="p" variant="h3" className="text-foreground">Desabilitado</Typography>
              <div className="ds-card !p-[30px]">
                <Slider defaultValue={[60]} max={100} step={1} disabled />
              </div>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Import</Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { Slider } from "@/components/ui/slider"`}
            </Typography>
          </div>
        </div>
      </Section>

      <Section title="Padrão de implementação" subtitle="Snippets para uso do Slider.">
        <div className="flex flex-col gap-6">
          <CodeBlock title="Slider controlado" code={`"use client"
import { useState } from "react"

export function VolumeControl() {
  const [volume, setVolume] = useState([75])

  return (
    <div className="flex flex-col gap-2">
      <Slider
        value={volume}
        onValueChange={setVolume}
        max={100}
        step={1}
      />
      <span className="text-sm text-muted-foreground">
        Volume: {volume[0]}%
      </span>
    </div>
  )
}`} />

          <CodeBlock title="Slider de range de preço" code={`const [preco, setPreco] = useState([0, 500])

<Slider
  value={preco}
  onValueChange={setPreco}
  min={0}
  max={1000}
  step={10}
/>
<span>R$ {preco[0]} – R$ {preco[1]}</span>`} />
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
