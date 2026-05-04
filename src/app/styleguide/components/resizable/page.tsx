import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
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

export default function ResizablePage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Resizable"
        description="Painéis redimensionáveis por drag. Ideal para layouts de editores, IDEs e dashboards com painéis ajustáveis."
      />

      <Section title="Visão geral" subtitle="O Resizable usa react-resizable-panels para criar layouts com divisores arrastáveis." first>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">Horizontal</Typography>
            <div className="ds-card !p-[30px] overflow-hidden">
              <ResizablePanelGroup orientation="horizontal" className="min-h-[160px] rounded-[10px]">
                <ResizablePanel defaultSize={30}>
                  <div className="flex h-full items-center justify-center p-[30px]">
                    <Typography as="p" variant="body-sm" className="text-muted-foreground">Painel esquerdo</Typography>
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={70}>
                  <div className="flex h-full items-center justify-center p-[30px]">
                    <Typography as="p" variant="body-sm" className="text-muted-foreground">Painel direito</Typography>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">Vertical</Typography>
            <div className="ds-card !p-[30px] overflow-hidden">
              <ResizablePanelGroup orientation="vertical" className="min-h-[200px] rounded-[10px]">
                <ResizablePanel defaultSize={40}>
                  <div className="flex h-full items-center justify-center p-[30px]">
                    <Typography as="p" variant="body-sm" className="text-muted-foreground">Painel superior</Typography>
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={60}>
                  <div className="flex h-full items-center justify-center p-[30px]">
                    <Typography as="p" variant="body-sm" className="text-muted-foreground">Painel inferior</Typography>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Import</Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import {
  ResizableHandle, ResizablePanel, ResizablePanelGroup
} from "@/components/ui/resizable"`}
            </Typography>
          </div>
        </div>
      </Section>

      <Section title="Padrão de implementação" subtitle="Estrutura base do Resizable.">
        <div className="flex flex-col gap-6">
          <CodeBlock title="Layout resizável 3 painéis" code={`<ResizablePanelGroup orientation="horizontal">
  <ResizablePanel defaultSize={20} minSize={15}>
    {/* Sidebar */}
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={60}>
    {/* Conteúdo principal */}
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={20} minSize={15}>
    {/* Painel de propriedades */}
  </ResizablePanel>
</ResizablePanelGroup>`} />
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
