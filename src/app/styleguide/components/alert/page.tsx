import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/typography";
import { AlertCircleIcon, CheckCircle2Icon, InfoIcon, PopcornIcon } from "lucide-react";
import {
  FoundationFooter,
  FoundationPageHeader,
  Section,
} from "../../foundation-sections";

function CodeBlock({
  title,
  code,
}: {
  title: string;
  code: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <Typography
        as="p"
        variant="label"
        className="normal-case tracking-normal text-black"
      >
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

export default function AlertPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Alert"
        description="Componente do shadcn/ui para comunicar estados, avisos e confirmações de forma direta dentro do fluxo da interface."
      />

      <Section
        title="Visão geral"
        subtitle="O alert já existe em src/components/ui e funciona como bloco contextual de comunicação."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Demo básica
            </Typography>
            <div className="ds-card w-full max-w-3xl">
              <Alert className="rounded-[10px]">
                <CheckCircle2Icon />
                <AlertTitle>Alterações salvas com sucesso</AlertTitle>
                <AlertDescription>
                  Este é o uso base do alert com ícone, título e descrição.
                </AlertDescription>
              </Alert>
            </div>
          </div>

          <div className="ds-card">
            <Typography
              as="p"
              variant="label"
              className="normal-case tracking-normal text-foreground"
            >
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert"`}
            </Typography>
          </div>

          <div className="ds-card">
            <Typography
              as="p"
              variant="label"
              className="normal-case tracking-normal text-foreground"
            >
              Estrutura base
            </Typography>
            <Typography as="p" variant="body-sm" className="mt-3 text-muted-foreground">
              O componente usa `Alert` como container principal. Dentro dele entram
              `AlertTitle`, `AlertDescription` e, se necessário, `AlertAction`.
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Variações e estados"
        subtitle="O alert é mais sobre contexto e composição do que sobre múltiplas variantes visuais."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Default
            </Typography>
            <div className="grid gap-4">
              <div className="ds-card w-full max-w-3xl">
                <Alert className="rounded-[10px]">
                  <InfoIcon />
                  <AlertTitle>Informação importante</AlertTitle>
                  <AlertDescription>
                    Use o alert padrão para comunicação de contexto, status ou observação útil.
                  </AlertDescription>
                </Alert>
              </div>

              <div className="ds-card w-full max-w-3xl">
                <Alert className="rounded-[10px]">
                  <PopcornIcon />
                  <AlertTitle>Alert com título e ícone, sem descrição</AlertTitle>
                </Alert>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Destructive + action
            </Typography>
            <div className="grid gap-4">
              <div className="ds-card w-full max-w-3xl">
                <Alert variant="destructive" className="rounded-[10px]">
                  <AlertCircleIcon />
                  <AlertTitle>Não foi possível concluir a ação</AlertTitle>
                  <AlertDescription>
                    Verifique os dados enviados e tente novamente.
                  </AlertDescription>
                </Alert>
              </div>

              <div className="ds-card w-full max-w-3xl">
                <Alert className="rounded-[10px]">
                  <InfoIcon />
                  <AlertTitle>Atualização disponível</AlertTitle>
                  <AlertDescription>
                    Você pode aplicar a atualização agora ou continuar depois.
                  </AlertDescription>
                  <AlertAction>
                    <Button variant="outline" size="sm">Atualizar</Button>
                  </AlertAction>
                </Alert>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Padrão de implementação"
        subtitle="Resumo das classes e snippets principais para usar o alert no projeto."
      >
        <div className="flex flex-col gap-4">
          <div className="ds-card flex w-full max-w-md flex-col gap-1">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Root
            </Typography>
            <Typography as="p" variant="code" className="text-foreground">
              rounded-lg border px-2.5 py-2 text-sm
            </Typography>
            <Typography as="p" variant="body-sm" className="text-muted-foreground">
              Estrutura base do container do alert.
            </Typography>
          </div>

          <div className="ds-card flex w-full max-w-md flex-col gap-1">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Variant
            </Typography>
            <Typography as="p" variant="code" className="text-foreground">
              default | destructive
            </Typography>
            <Typography as="p" variant="body-sm" className="text-muted-foreground">
              Hoje o componente expõe as variantes `default` e `destructive`.
            </Typography>
          </div>

          <div className="ds-card flex w-full max-w-md flex-col gap-1">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Action
            </Typography>
            <Typography as="p" variant="code" className="text-foreground">
              AlertAction
            </Typography>
            <Typography as="p" variant="body-sm" className="text-muted-foreground">
              Permite encaixar uma ação contextual no canto superior direito do bloco.
            </Typography>
          </div>

          <div className="flex flex-col gap-6 pt-2">
            <CodeBlock
              title="Alert básico"
              code={`<Alert>
  <InfoIcon />
  <AlertTitle>Título do alert</AlertTitle>
  <AlertDescription>
    Texto de apoio para explicar o contexto.
  </AlertDescription>
</Alert>`}
            />

            <CodeBlock
              title="Alert destrutivo"
              code={`<Alert variant="destructive">
  <AlertCircleIcon />
  <AlertTitle>Erro ao processar</AlertTitle>
  <AlertDescription>
    Verifique os dados e tente novamente.
  </AlertDescription>
</Alert>`}
            />

            <CodeBlock
              title="Alert com ação"
              code={`<Alert>
  <InfoIcon />
  <AlertTitle>Atualização disponível</AlertTitle>
  <AlertDescription>
    Você pode aplicar a atualização agora.
  </AlertDescription>
  <AlertAction>
    <Button variant="outline" size="sm">Atualizar</Button>
  </AlertAction>
</Alert>`}
            />
          </div>
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="Pontos principais da API disponível no projeto."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Props principais
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                {
                  name: "variant",
                  type: `"default" | "destructive"`,
                  note: "Controla a semântica visual do alerta.",
                },
                {
                  name: "className",
                  type: "string",
                  note: "Permite ajustar layout, radius e composição no contexto de uso.",
                },
                {
                  name: "AlertAction",
                  type: "slot opcional",
                  note: "Adiciona uma ação contextual sem sair do componente.",
                },
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

          <div className="ds-card">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Acessibilidade
            </Typography>
            <div className="flex flex-col gap-3">
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                O componente já sai com `role=&quot;alert&quot;` no container principal, o que ajuda leitores de tela a identificarem a mensagem.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Use o alert para mensagens importantes, mas evite empilhar vários blocos iguais sem hierarquia clara.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Quando houver ação, garanta que o texto do botão seja direto e coerente com a mensagem apresentada.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
