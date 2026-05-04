/* eslint-disable react/no-unescaped-entities */
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

export default function DialogPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Dialog"
        description="Janela modal para confirmações, formulários e conteúdo que requer atenção sem abandonar a página atual."
      />

      <Section
        title="Visão geral"
        subtitle="O Dialog interrompe o fluxo principal da interface e foca o usuário em uma ação específica. Use com moderação."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Demo básica
            </Typography>
            <div className="ds-card !p-[30px]">
              <Dialog>
                <DialogTrigger render={<Button />}>Abrir dialog</DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Editar perfil</DialogTitle>
                    <DialogDescription>
                      Atualize as informações do seu perfil. Clique em salvar ao terminar.
                    </DialogDescription>
                  </DialogHeader>
                  <Typography as="p" variant="body-sm" className="text-muted-foreground">
                    Conteúdo do dialog. Formulários, listas ou qualquer informação que precise de foco.
                  </Typography>
                  <DialogFooter>
                    <DialogClose render={<Button variant="outline" />}>Cancelar</DialogClose>
                    <Button>Salvar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger, DialogClose
} from "@/components/ui/dialog"`}
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Variações"
        subtitle="Exemplos de dialogs para diferentes contextos de uso."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Confirmação destrutiva
            </Typography>
            <div className="ds-card !p-[30px] flex gap-4">
              <Dialog>
                <DialogTrigger render={<Button variant="destructive" />}>Excluir conta</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Excluir conta permanentemente?</DialogTitle>
                    <DialogDescription>
                      Esta ação não pode ser desfeita. Todos os dados serão removidos dos nossos servidores.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose render={<Button variant="outline" />}>Cancelar</DialogClose>
                    <Button variant="destructive">Excluir permanentemente</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger render={<Button variant="outline" />}>Informações</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Sobre este componente</DialogTitle>
                    <DialogDescription>
                      Um dialog simples de informação sem ações.
                    </DialogDescription>
                  </DialogHeader>
                  <Typography as="p" variant="body-sm" className="text-muted-foreground">
                    O Dialog usa foco preso internamente — Tab navega apenas dentro do modal enquanto aberto. Pressione Escape ou clique fora para fechar.
                  </Typography>
                  <DialogFooter>
                    <DialogClose render={<Button />}>Entendido</DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Padrão de implementação"
        subtitle="Snippets para os usos mais comuns do Dialog."
      >
        <div className="flex flex-col gap-6">
          <CodeBlock
            title="Dialog básico"
            code={`<Dialog>
  <DialogTrigger asChild>
    <Button>Abrir</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Título do dialog</DialogTitle>
      <DialogDescription>Descrição opcional.</DialogDescription>
    </DialogHeader>
    {/* Conteúdo */}
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancelar</Button>
      </DialogClose>
      <Button>Confirmar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
          />

          <CodeBlock
            title="Dialog controlado (sem DialogTrigger)"
            code={`"use client"
import { useState } from "react"

export function DialogControlado() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Modal controlado</DialogTitle>
          {/* conteúdo */}
        </DialogContent>
      </Dialog>
    </>
  )
}`}
          />
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="API dos sub-componentes do Dialog."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Sub-componentes
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                { name: "Dialog", type: "open, onOpenChange", note: "Container raiz. Aceita estado controlado." },
                { name: "DialogTrigger", type: "asChild", note: "Elemento que abre o dialog. Use asChild para button/link custom." },
                { name: "DialogContent", type: "className, onInteractOutside", note: "Painel modal. Use sm:max-w-* para controlar largura." },
                { name: "DialogHeader", type: "div", note: "Container do cabeçalho (título + descrição)." },
                { name: "DialogTitle", type: "div", note: "Título obrigatório do dialog para acessibilidade." },
                { name: "DialogDescription", type: "div", note: "Descrição opcional com estilo muted." },
                { name: "DialogFooter", type: "div", note: "Container das ações com flex e alinhamento." },
                { name: "DialogClose", type: "asChild", note: "Botão que fecha o dialog. Use asChild para customizar." },
              ].map((item) => (
                <div key={item.name} className="border-b border-white pb-3 last:border-0 last:pb-0">
                  <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
                    {item.name}
                  </Typography>
                  <Typography as="p" variant="code" className="mt-1 text-foreground">
                    {item.type}
                  </Typography>
                  <Typography as="p" variant="body-sm" className="mt-1 text-muted-foreground">
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
                O Dialog usa <code className="font-mono text-foreground">role="dialog"</code> e <code className="font-mono text-foreground">aria-modal="true"</code> automaticamente.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                <code className="font-mono text-foreground">DialogTitle</code> é obrigatório — fornece o nome acessível do dialog. Omiti-lo gera warning de acessibilidade.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Foco fica preso dentro do dialog enquanto aberto. Escape fecha o dialog automaticamente.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
