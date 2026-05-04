import { Progress } from "@/components/ui/progress";
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

export default function ProgressPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Progress"
        description="Barra de progresso para comunicar o avanço de uma tarefa, upload, carregamento ou etapa de formulário."
      />

      <Section title="Visão geral" subtitle="O Progress exibe visualmente o percentual de conclusão de uma tarefa." first>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">Valores diferentes</Typography>
            <div className="ds-card !p-[30px] flex flex-col gap-5 max-w-lg">
              {[0, 25, 50, 75, 100].map((val) => (
                <div key={val} className="flex flex-col gap-1.5">
                  <div className="flex justify-between">
                    <Typography as="p" variant="body-sm" className="text-foreground">Progresso</Typography>
                    <Typography as="p" variant="body-sm" className="text-muted-foreground">{val}%</Typography>
                  </div>
                  <Progress value={val} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Import</Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { Progress } from "@/components/ui/progress"`}
            </Typography>
          </div>
        </div>
      </Section>

      <Section title="Tamanhos e cores" subtitle="Customize a altura e cor via className.">
        <div className="ds-card !p-[30px] flex flex-col gap-5 max-w-lg">
          <div className="flex flex-col gap-1.5">
            <Typography as="p" variant="body-sm" className="text-foreground">Fina (h-1)</Typography>
            <Progress value={60} className="h-1" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Typography as="p" variant="body-sm" className="text-foreground">Padrão (h-2)</Typography>
            <Progress value={60} className="h-2" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Typography as="p" variant="body-sm" className="text-foreground">Grossa (h-3)</Typography>
            <Progress value={60} className="h-3" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Typography as="p" variant="body-sm" className="text-foreground">Sucesso</Typography>
            <Progress value={100} className="h-2 [&>div]:bg-success" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Typography as="p" variant="body-sm" className="text-foreground">Destrutivo</Typography>
            <Progress value={30} className="h-2 [&>div]:bg-destructive" />
          </div>
        </div>
      </Section>

      <Section title="Padrão de implementação" subtitle="Snippets para uso dinâmico do Progress.">
        <div className="flex flex-col gap-6">
          <CodeBlock title="Progress básico" code={`import { Progress } from "@/components/ui/progress"

<Progress value={75} className="h-2" />`} />

          <CodeBlock title="Progress animado" code={`"use client"
import { useEffect, useState } from "react"

export function ProgressAnimado() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(75), 500)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={progress} className="h-2 transition-all duration-700" />
}`} />
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
