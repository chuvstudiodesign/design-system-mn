import { Spinner } from "@/components/spinner";
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
      <Typography as="p" variant="label" className="normal-case tracking-normal text-black">{title}</Typography>
      <div className="bg-[#D4D4D4] p-5">
        <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[12px] leading-6 text-foreground"><code>{code}</code></pre>
      </div>
    </div>
  );
}

export default function SpinnerPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Spinner"
        description="Indicador de carregamento circular. Use para estados assíncronos inline onde o Skeleton não se aplica."
      />

      <Section title="Visão geral" subtitle="O Spinner é um componente customizado simples usando border-animation." first>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">Tamanhos</Typography>
            <div className="ds-card !p-[30px] flex flex-wrap items-center gap-8">
              {(["sm", "default", "lg"] as const).map((size) => (
                <div key={size} className="flex flex-col items-center gap-2">
                  <Spinner size={size} />
                  <Typography as="p" variant="caption" className="normal-case tracking-normal text-muted-foreground">{size}</Typography>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">Cores</Typography>
            <div className="ds-card !p-[30px] flex flex-wrap items-center gap-6">
              <Spinner />
              <Spinner className="text-muted-foreground" />
              <Spinner className="text-destructive" />
              <Spinner className="text-success" />
              <Spinner className="text-warning" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">Em botão</Typography>
            <div className="ds-card !p-[30px] flex flex-wrap gap-3">
              <Button disabled>
                <Spinner size="sm" className="text-primary-foreground" />
                Salvando...
              </Button>
              <Button variant="outline" disabled>
                <Spinner size="sm" />
                Carregando
              </Button>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Import</Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { Spinner } from "@/components/spinner"`}
            </Typography>
          </div>
        </div>
      </Section>

      <Section title="Padrão de implementação" subtitle="Snippets para uso do Spinner.">
        <div className="flex flex-col gap-6">
          <CodeBlock title="Botão com estado de loading" code={`"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/spinner"

export function BotaoSalvar() {
  const [loading, setLoading] = useState(false)

  async function handleSave() {
    setLoading(true)
    await salvarDados()
    setLoading(false)
  }

  return (
    <Button onClick={handleSave} disabled={loading}>
      {loading && <Spinner size="sm" className="text-primary-foreground" />}
      {loading ? "Salvando..." : "Salvar"}
    </Button>
  )
}`} />

          <CodeBlock title="Overlay de carregamento" code={`{isLoading && (
  <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-[10px]">
    <Spinner size="lg" />
  </div>
)}`} />
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
