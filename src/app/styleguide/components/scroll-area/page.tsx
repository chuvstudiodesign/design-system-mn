import { ScrollArea } from "@/components/ui/scroll-area";
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

const tags = Array.from({ length: 50 }, (_, i) => `v1.${i}.0`);

export default function ScrollAreaPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Scroll Area"
        description="Área de scroll customizada com scrollbar estilizada e consistente entre browsers."
      />

      <Section title="Visão geral" subtitle="O ScrollArea adiciona uma scrollbar visualmente integrada ao design system em qualquer container." first>
        <div className="flex flex-col gap-6">
          <div className="grid gap-6 xl:grid-cols-2">
            <div className="flex flex-col gap-3">
              <Typography as="p" variant="h3" className="text-foreground">Vertical</Typography>
              <div className="ds-card !p-[30px]">
                <ScrollArea className="h-48 w-full pr-4">
                  {tags.map((tag) => (
                    <div key={tag}>
                      <div className="flex items-center justify-between py-1.5">
                        <span className="font-mono text-sm text-foreground">{tag}</span>
                      </div>
                      <Separator className="last:hidden" />
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Typography as="p" variant="h3" className="text-foreground">Horizontal</Typography>
              <div className="ds-card !p-[30px]">
                <ScrollArea className="w-full whitespace-nowrap">
                  <div className="flex gap-4 pb-4">
                    {tags.slice(0, 20).map((tag) => (
                      <div key={tag} className="shrink-0 rounded-[10px] bg-muted px-4 py-2">
                        <span className="font-mono text-sm text-foreground">{tag}</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Import</Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { ScrollArea } from "@/components/ui/scroll-area"`}
            </Typography>
          </div>
        </div>
      </Section>

      <Section title="Padrão de implementação" subtitle="Snippets para uso do ScrollArea.">
        <div className="flex flex-col gap-6">
          <CodeBlock title="Scroll vertical com altura fixa" code={`<ScrollArea className="h-72 w-full">
  {items.map((item) => (
    <div key={item.id} className="py-2 border-b last:border-0">
      {item.name}
    </div>
  ))}
</ScrollArea>`} />

          <CodeBlock title="Scroll horizontal" code={`<ScrollArea className="w-full whitespace-nowrap">
  <div className="flex gap-4 pb-4">
    {chips.map((chip) => (
      <div key={chip} className="shrink-0 bg-muted rounded-full px-4 py-1.5">
        {chip}
      </div>
    ))}
  </div>
</ScrollArea>`} />
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
