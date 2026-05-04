import { Separator } from "@/components/ui/separator";
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

export default function SeparatorPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Separator"
        description="Linha divisória visual e semântica para separar grupos de conteúdo horizontal ou verticalmente."
      />

      <Section title="Visão geral" subtitle="O Separator é uma linha semântica (hr/div com role=separator) com suporte a orientação." first>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">Horizontal (padrão)</Typography>
            <div className="ds-card !p-[30px] flex flex-col gap-4 max-w-sm">
              <div className="flex flex-col gap-2">
                <Typography as="p" variant="body" className="font-semibold text-foreground">Seção A</Typography>
                <Typography as="p" variant="body-sm" className="text-muted-foreground">Conteúdo da seção A.</Typography>
              </div>
              <Separator />
              <div className="flex flex-col gap-2">
                <Typography as="p" variant="body" className="font-semibold text-foreground">Seção B</Typography>
                <Typography as="p" variant="body-sm" className="text-muted-foreground">Conteúdo da seção B.</Typography>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">Vertical</Typography>
            <div className="ds-card !p-[30px] flex h-8 items-center gap-4">
              <Typography as="p" variant="body-sm" className="text-foreground">Blog</Typography>
              <Separator orientation="vertical" />
              <Typography as="p" variant="body-sm" className="text-foreground">Docs</Typography>
              <Separator orientation="vertical" />
              <Typography as="p" variant="body-sm" className="text-foreground">GitHub</Typography>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Import</Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { Separator } from "@/components/ui/separator"`}
            </Typography>
          </div>
        </div>
      </Section>

      <Section title="Padrão de implementação" subtitle="Snippets para uso do Separator.">
        <div className="flex flex-col gap-6">
          <CodeBlock title="Separator básico" code={`<Separator />  // horizontal
<Separator orientation="vertical" />  // vertical`} />

          <CodeBlock title="Cor customizada" code={`<Separator className="bg-border" />     // cor padrão
<Separator className="bg-primary/20" /> // verde suave
<Separator className="bg-white" />      // branco (para sections)`} />
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
