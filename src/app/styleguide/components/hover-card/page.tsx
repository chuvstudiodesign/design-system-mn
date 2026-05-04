import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
      <Typography as="p" variant="label" className="normal-case tracking-normal text-black">
        {title}
      </Typography>
      <div className="bg-[#D4D4D4] p-5">
        <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[12px] leading-6 text-foreground">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

export default function HoverCardPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Hover Card"
        description="Card que aparece ao passar o mouse sobre um trigger. Para preview de informações sem redirecionar o usuário."
      />

      <Section
        title="Visão geral"
        subtitle="O HoverCard exibe um popover com conteúdo rico ao fazer hover em um link ou elemento. Não requer clique."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Demo — passe o mouse no link
            </Typography>
            <div className="ds-card !p-[30px] flex items-center gap-4">
              <HoverCard>
                <HoverCardTrigger render={<Button variant="link" className="h-auto p-0" />}>@lucaszerlotini</HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex items-start gap-4">
                    <Avatar size="lg">
                      <AvatarImage src="https://github.com/shadcn.png" alt="Lucas" />
                      <AvatarFallback>LZ</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <Typography as="p" variant="body" className="font-semibold text-foreground">
                        Lucas Zerlotini
                      </Typography>
                      <Typography as="p" variant="body-sm" className="text-muted-foreground">
                        Designer & Developer. Trabalhando no MN Design System.
                      </Typography>
                      <Typography as="p" variant="caption" className="mt-1 normal-case tracking-normal text-muted-foreground">
                        Entrou em Janeiro 2024
                      </Typography>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>

              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                ← Passe o mouse aqui
              </Typography>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import {
  HoverCard, HoverCardTrigger, HoverCardContent
} from "@/components/ui/hover-card"`}
            </Typography>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Quando usar
            </Typography>
            <Typography as="p" variant="body-sm" className="mt-3 text-muted-foreground">
              Use HoverCard para preview contextual que enriquece a experiência sem interromper o fluxo. Para informações simples de uma linha, use <code className="font-mono text-foreground">Tooltip</code>. Para conteúdo interativo (botões, formulários), use <code className="font-mono text-foreground">Popover</code>.
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Mais exemplos"
        subtitle="Outros usos comuns do HoverCard no projeto."
      >
        <div className="flex flex-col gap-6">
          <div className="ds-card !p-[30px] flex flex-wrap gap-6">
            <HoverCard>
              <HoverCardTrigger render={<Button variant="link" className="h-auto p-0" />}>Design Tokens</HoverCardTrigger>
              <HoverCardContent className="w-64">
                <Typography as="p" variant="body" className="font-semibold text-foreground">
                  Design Tokens
                </Typography>
                <Typography as="p" variant="body-sm" className="mt-1 text-muted-foreground">
                  Variáveis CSS que definem cor, tipografia, espaçamento e elevação no sistema.
                </Typography>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger render={<Button variant="link" className="h-auto p-0" />}>@next/font</HoverCardTrigger>
              <HoverCardContent side="right" className="w-72">
                <Typography as="p" variant="body" className="font-semibold text-foreground">
                  next/font
                </Typography>
                <Typography as="p" variant="body-sm" className="mt-1 text-muted-foreground">
                  Sistema de fontes do Next.js. Otimiza o carregamento e elimina o layout shift (CLS).
                </Typography>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </Section>

      <Section
        title="Padrão de implementação"
        subtitle="Snippets para uso do HoverCard em diferentes contextos."
      >
        <div className="flex flex-col gap-6">
          <CodeBlock
            title="HoverCard de perfil"
            code={`<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link">@usuario</Button>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="flex items-start gap-4">
      <Avatar>
        <AvatarImage src="/avatar.jpg" alt="Usuário" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold">Ana Beatriz</p>
        <p className="text-sm text-muted-foreground">
          Desenvolvedora front-end
        </p>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`}
          />

          <CodeBlock
            title="Com posicionamento customizado"
            code={`<HoverCard openDelay={300} closeDelay={100}>
  <HoverCardTrigger asChild>
    <span className="cursor-help underline underline-offset-2">
      Termo técnico
    </span>
  </HoverCardTrigger>
  <HoverCardContent side="top" align="start" className="w-64">
    <p className="text-sm">Definição do termo técnico aqui.</p>
  </HoverCardContent>
</HoverCard>`}
          />
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="API dos sub-componentes do HoverCard."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Props principais
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                { name: "openDelay", type: "number", note: "Delay em ms antes de abrir. Padrão: 700ms." },
                { name: "closeDelay", type: "number", note: "Delay em ms antes de fechar. Padrão: 300ms." },
                { name: "HoverCardContent side", type: `"top" | "bottom" | "left" | "right"`, note: "Posição do card em relação ao trigger." },
                { name: "HoverCardContent align", type: `"start" | "center" | "end"`, note: "Alinhamento do card." },
                { name: "HoverCardTrigger asChild", type: "boolean", note: "Mescla props no elemento filho." },
              ].map((item) => (
                <div key={item.name} className="border-b border-white pb-4 last:border-0 last:pb-0">
                  <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
                    {item.name}
                  </Typography>
                  <Typography as="p" variant="code" className="mt-1 text-foreground">
                    {item.type}
                  </Typography>
                  <Typography as="p" variant="body-sm" className="mt-2 text-muted-foreground">
                    {item.note}
                  </Typography>
                </div>
              ))}
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Acessibilidade
            </Typography>
            <div className="flex flex-col gap-3">
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                O HoverCard não é acessível apenas via hover — garanta que a mesma informação esteja disponível de outra forma para usuários de teclado e mobile.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Use para informações complementares, nunca para informações críticas que só existem no hover.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                O componente abre no focus do trigger para suporte parcial a teclado.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
