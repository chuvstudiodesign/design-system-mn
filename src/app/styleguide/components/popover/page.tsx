import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
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
      <Typography as="p" variant="label" className="normal-case tracking-normal text-black">{title}</Typography>
      <div className="bg-[#D4D4D4] p-5">
        <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[12px] leading-6 text-foreground"><code>{code}</code></pre>
      </div>
    </div>
  );
}

export default function PopoverPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Popover"
        description="Painel flutuante não-modal que abre ao clicar em um trigger. Para filtros, forms inline e ações contextuais ricas."
      />

      <Section title="Visão geral" subtitle="O Popover é como um Dialog não-modal — abre próximo ao trigger e fecha ao clicar fora." first>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">Demo</Typography>
            <div className="ds-card !p-[30px] flex flex-wrap gap-4">
              <Popover>
                <PopoverTrigger render={<Button variant="outline" />}>Abrir popover</PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex flex-col gap-4">
                    <Typography as="p" variant="h3" className="text-foreground">Dimensões</Typography>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Largura" htmlFor="pop-w">
                        <Input id="pop-w" defaultValue="100%" />
                      </Field>
                      <Field label="Altura" htmlFor="pop-h">
                        <Input id="pop-h" defaultValue="auto" />
                      </Field>
                    </div>
                    <Button size="sm" className="w-full">Aplicar</Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Import</Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"`}
            </Typography>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Popover vs Dialog vs Tooltip</Typography>
            <Typography as="p" variant="body-sm" className="mt-3 text-muted-foreground">
              <strong className="text-foreground">Popover</strong>: painel não-modal com conteúdo interativo (forms, filtros). <strong className="text-foreground">Dialog</strong>: modal que bloqueia o fundo. <strong className="text-foreground">Tooltip</strong>: texto simples de apoio no hover.
            </Typography>
          </div>
        </div>
      </Section>

      <Section title="Padrão de implementação" subtitle="Snippets para o Popover.">
        <div className="flex flex-col gap-6">
          <CodeBlock title="Popover básico" code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Filtros</Button>
  </PopoverTrigger>
  <PopoverContent className="w-72" align="start">
    {/* conteúdo do popover */}
  </PopoverContent>
</Popover>`} />

          <CodeBlock title="Com posicionamento" code={`<PopoverContent
  side="bottom"     // top | bottom | left | right
  align="start"     // start | center | end
  sideOffset={8}    // distância do trigger
>
  ...
</PopoverContent>`} />
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
