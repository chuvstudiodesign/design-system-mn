"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/typography";
import { AlertTriangleIcon } from "lucide-react";
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

export default function AlertDialogPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Alert Dialog"
        description="Componente do shadcn/ui para confirmação de ações críticas, bloqueando o fluxo até o usuário decidir seguir ou cancelar."
      />

      <Section
        title="Visão geral"
        subtitle="O alert dialog já foi instalado em src/components/ui e funciona como modal de confirmação para ações sensíveis."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Demo básica
            </Typography>
            <div className="ds-card !p-[30px] w-full max-w-3xl">
              <AlertDialog>
                <AlertDialogTrigger render={<Button variant="outline" />}>
                  Abrir confirmação
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-[10px]">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza que deseja continuar?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não poderá ser desfeita depois da confirmação.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction>Continuar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography
              as="p"
              variant="label"
              className="normal-case tracking-normal text-foreground"
            >
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"`}
            </Typography>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography
              as="p"
              variant="label"
              className="normal-case tracking-normal text-foreground"
            >
              Estrutura base
            </Typography>
            <Typography as="p" variant="body-sm" className="mt-3 text-muted-foreground">
              O componente parte de `AlertDialog`, recebe um `AlertDialogTrigger`,
              e monta o modal com `AlertDialogContent`, `AlertDialogHeader`,
              `AlertDialogTitle`, `AlertDialogDescription` e `AlertDialogFooter`.
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Variações e estados"
        subtitle="O alert dialog muda mais pela composição do conteúdo do que por variantes visuais explícitas."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Confirmação simples
            </Typography>
            <div className="ds-card !p-[30px] w-full max-w-3xl">
              <AlertDialog>
                <AlertDialogTrigger render={<Button variant="outline" />}>
                  Excluir item
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-[10px]">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Excluir este item?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Você está prestes a remover este conteúdo da interface.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction>Excluir</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Com mídia de apoio
            </Typography>
            <div className="ds-card !p-[30px] w-full max-w-3xl">
              <AlertDialog>
                <AlertDialogTrigger render={<Button />}>
                  Encerrar sessão
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-[10px]">
                  <AlertDialogHeader>
                    <AlertDialogMedia>
                      <AlertTriangleIcon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Encerrar sessão agora?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Ao continuar, você sairá do sistema neste dispositivo e precisará autenticar novamente.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Voltar</AlertDialogCancel>
                    <AlertDialogAction>Encerrar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Padrão de implementação"
        subtitle="Resumo das classes e snippets principais para usar o alert dialog no projeto."
      >
        <div className="flex flex-col gap-4">
          <div className="ds-card !p-[30px] flex w-full max-w-md flex-col gap-1">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Content
            </Typography>
            <Typography as="p" variant="code" className="text-foreground">
              rounded-xl bg-popover p-[30px] ring-1
            </Typography>
            <Typography as="p" variant="body-sm" className="text-muted-foreground">
              Estrutura principal do modal de confirmação.
            </Typography>
          </div>

          <div className="ds-card !p-[30px] flex w-full max-w-md flex-col gap-1">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Footer
            </Typography>
            <Typography as="p" variant="code" className="text-foreground">
              border-t bg-muted/50 px-[30px] py-[30px]
            </Typography>
            <Typography as="p" variant="body-sm" className="text-muted-foreground">
              Área das ações, separada visualmente do conteúdo principal.
            </Typography>
          </div>

          <div className="ds-card !p-[30px] flex w-full max-w-md flex-col gap-1">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Trigger
            </Typography>
            <Typography as="p" variant="code" className="text-foreground">
              AlertDialogTrigger asChild
            </Typography>
            <Typography as="p" variant="body-sm" className="text-muted-foreground">
              Permite abrir o dialog a partir de um `Button` ou outro elemento interativo.
            </Typography>
          </div>

          <div className="flex flex-col gap-6 pt-2">
            <CodeBlock
              title="Alert dialog básico"
              code={`<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Abrir</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
      <AlertDialogDescription>
        Esta ação não poderá ser desfeita.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction>Continuar</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
            />

            <CodeBlock
              title="Alert dialog com mídia"
              code={`<AlertDialogContent>
  <AlertDialogHeader>
    <AlertDialogMedia>
      <AlertTriangleIcon />
    </AlertDialogMedia>
    <AlertDialogTitle>Encerrar sessão?</AlertDialogTitle>
    <AlertDialogDescription>
      Você precisará entrar novamente depois.
    </AlertDialogDescription>
  </AlertDialogHeader>
  <AlertDialogFooter>
    <AlertDialogCancel>Voltar</AlertDialogCancel>
    <AlertDialogAction>Encerrar</AlertDialogAction>
  </AlertDialogFooter>
</AlertDialogContent>`}
            />
          </div>
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="Pontos principais da API instalada no projeto."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Props e peças principais
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                {
                  name: "AlertDialogTrigger",
                  type: "slot",
                  note: "Elemento que abre o modal.",
                },
                {
                  name: "AlertDialogContent",
                  type: "container",
                  note: "Superfície principal do modal.",
                },
                {
                  name: "size",
                  type: `"default" | "sm"`,
                  note: "Controla o tamanho máximo do content.",
                },
                {
                  name: "AlertDialogCancel / Action",
                  type: "ações",
                  note: "Botões padrão para cancelar ou confirmar a ação.",
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

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Acessibilidade
            </Typography>
            <div className="flex flex-col gap-3">
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                O alert dialog deve ser usado para decisões críticas, porque ele interrompe o fluxo e exige confirmação explícita.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Garanta que o título explique a ação e que a descrição deixe claro o impacto da decisão.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Os botões de ação precisam ser inequívocos: cancelar deve ser seguro e confirmar deve refletir o efeito real da ação.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
