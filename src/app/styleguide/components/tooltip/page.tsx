import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/kbd";
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

export default function TooltipPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Tooltip"
        description="Texto de apoio exibido ao passar o mouse sobre um elemento. Para labels de ícones, atalhos e informações contextuais curtas."
      />

      <Section
        title="Visão geral"
        subtitle="O Tooltip é o componente mais discreto de feedback contextual — apenas texto ou kbd, sem interatividade."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">Demo — passe o mouse nos botões</Typography>
            <div className="ds-card !p-[30px] flex flex-wrap gap-4">
              <Tooltip>
                <TooltipTrigger render={<Button variant="outline" size="icon" aria-label="Editar" />}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" />
                    </svg>
                </TooltipTrigger>
                <TooltipContent>Editar</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger render={<Button variant="outline" size="icon" aria-label="Excluir" />}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                </TooltipTrigger>
                <TooltipContent>Excluir</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger render={<Button variant="outline" />}>Salvar</TooltipTrigger>
                <TooltipContent>
                  Salvar alterações <Kbd size="sm">⌘S</Kbd>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger render={<Button variant="outline" />}>Top</TooltipTrigger>
                <TooltipContent side="top">Tooltip acima</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger render={<Button variant="outline" />}>Right</TooltipTrigger>
                <TooltipContent side="right">Tooltip à direita</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger render={<Button variant="outline" />}>Bottom</TooltipTrigger>
                <TooltipContent side="bottom">Tooltip abaixo</TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Import</Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import {
  Tooltip, TooltipContent, TooltipTrigger
} from "@/components/ui/tooltip"

// TooltipProvider já está no root layout — não é necessário importar`}
            </Typography>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Setup</Typography>
            <Typography as="p" variant="body-sm" className="mt-3 text-muted-foreground">
              O <code className="font-mono text-foreground">TooltipProvider</code> já está configurado no <code className="font-mono text-foreground">src/app/layout.tsx</code>. Não é necessário adicionar provider em cada uso.
            </Typography>
          </div>
        </div>
      </Section>

      <Section title="Com atalho de teclado" subtitle="O Tooltip suporta o componente Kbd diretamente no conteúdo.">
        <div className="ds-card !p-[30px] flex flex-wrap gap-4">
          {[
            { label: "Copiar", shortcut: ["⌘", "C"] },
            { label: "Colar", shortcut: ["⌘", "V"] },
            { label: "Desfazer", shortcut: ["⌘", "Z"] },
            { label: "Buscar", shortcut: ["⌘", "K"] },
          ].map(({ label, shortcut }) => (
            <Tooltip key={label}>
              <TooltipTrigger render={<Button variant="ghost" size="sm" />}>{label}</TooltipTrigger>
              <TooltipContent className="flex items-center gap-1.5">
                {label}
                {shortcut.map((k, i) => (
                  <span key={i} className="flex items-center gap-0.5">
                    <Kbd size="sm">{k}</Kbd>
                    {i < shortcut.length - 1 && <span>+</span>}
                  </span>
                ))}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </Section>

      <Section title="Padrão de implementação" subtitle="Snippets para uso do Tooltip.">
        <div className="flex flex-col gap-6">
          <CodeBlock title="Tooltip básico" code={`<Tooltip>
  <TooltipTrigger asChild>
    <Button size="icon" variant="ghost" aria-label="Configurações">
      <SettingsIcon />
    </Button>
  </TooltipTrigger>
  <TooltipContent>Configurações</TooltipContent>
</Tooltip>`} />

          <CodeBlock title="Com atalho de teclado" code={`<TooltipContent className="flex items-center gap-1.5">
  Salvar
  <Kbd size="sm">⌘</Kbd>
  <Kbd size="sm">S</Kbd>
</TooltipContent>`} />

          <CodeBlock title="Posicionamento" code={`<TooltipContent
  side="right"     // top | right | bottom | left
  align="center"   // start | center | end
  sideOffset={4}   // distância em px
>
  Texto do tooltip
</TooltipContent>`} />
        </div>
      </Section>

      <Section title="Props e uso" subtitle="API dos sub-componentes do Tooltip.">
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">Props principais</Typography>
            <div className="flex flex-col gap-4">
              {[
                { name: "delayDuration", type: "number", note: "Delay em ms antes de abrir. Padrão: 700ms." },
                { name: "TooltipContent side", type: `"top" | "right" | "bottom" | "left"`, note: "Lado de exibição em relação ao trigger." },
                { name: "TooltipContent align", type: `"start" | "center" | "end"`, note: "Alinhamento no eixo perpendicular ao side." },
                { name: "TooltipTrigger asChild", type: "boolean", note: "Mescla o trigger com o elemento filho." },
              ].map((item) => (
                <div key={item.name} className="border-b border-white pb-4 last:border-0 last:pb-0">
                  <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">{item.name}</Typography>
                  <Typography as="p" variant="code" className="mt-1 text-foreground">{item.type}</Typography>
                  <Typography as="p" variant="body-sm" className="mt-2 text-muted-foreground">{item.note}</Typography>
                </div>
              ))}
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">Acessibilidade</Typography>
            <div className="flex flex-col gap-3">
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Para botões de ícone, use <strong>ambos</strong>: <code className="font-mono text-foreground">aria-label</code> no trigger E Tooltip — o aria-label funciona sem mouse, o Tooltip para usuários visuais.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Nunca coloque informação crítica apenas no Tooltip — usuários mobile e de teclado podem não conseguir acessá-lo.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                O Tooltip abre no focus do trigger para suporte parcial a teclado (via Tab).
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
