/* eslint-disable react/no-unescaped-entities */
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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

export default function DrawerPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Drawer"
        description="Painel deslizante que surge a partir da borda da tela. Ideal para mobile e painéis laterais de configuração."
      />

      <Section
        title="Visão geral"
        subtitle="O Drawer usa vaul para criar painéis com gesto de arrastar no mobile. Pode ser posicionado em qualquer borda."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Demo básica (bottom)
            </Typography>
            <div className="ds-card !p-[30px] flex flex-wrap gap-3">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline">Abrir drawer (bottom)</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                      <DrawerTitle>Configurações rápidas</DrawerTitle>
                      <DrawerDescription>
                        Ajuste as preferências da sua conta.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="px-[30px]">
                      <Typography as="p" variant="body-sm" className="text-muted-foreground">
                        Conteúdo do drawer. Pode conter formulários, listas ou qualquer conteúdo interativo.
                      </Typography>
                    </div>
                    <DrawerFooter>
                      <Button>Salvar</Button>
                      <DrawerClose asChild>
                        <Button variant="outline">Cancelar</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>

              <Drawer direction="right">
                <DrawerTrigger asChild>
                  <Button variant="outline">Abrir drawer (right)</Button>
                </DrawerTrigger>
                <DrawerContent className="w-[320px]">
                  <DrawerHeader>
                    <DrawerTitle>Painel lateral</DrawerTitle>
                    <DrawerDescription>
                      Drawer deslizando da direita.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="px-[30px]">
                    <Typography as="p" variant="body-sm" className="text-muted-foreground">
                      Útil para filtros, detalhes de item e configurações em desktop.
                    </Typography>
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline">Fechar</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import {
  Drawer, DrawerContent, DrawerDescription, DrawerFooter,
  DrawerHeader, DrawerTitle, DrawerTrigger, DrawerClose
} from "@/components/ui/drawer"`}
            </Typography>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Drawer vs Sheet vs Dialog
            </Typography>
            <Typography as="p" variant="body-sm" className="mt-3 text-muted-foreground">
              <strong className="text-foreground">Drawer</strong>: painel com gesto de arrastar, ideal para mobile (bottom). <strong className="text-foreground">Sheet</strong>: painel lateral sem gesto, mais adequado para desktop. <strong className="text-foreground">Dialog</strong>: modal centralizado para confirmações e formulários.
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Padrão de implementação"
        subtitle="Snippets para os usos mais comuns do Drawer."
      >
        <div className="flex flex-col gap-6">
          <CodeBlock
            title="Drawer bottom (padrão mobile)"
            code={`<Drawer>
  <DrawerTrigger asChild>
    <Button>Abrir</Button>
  </DrawerTrigger>
  <DrawerContent>
    <div className="mx-auto w-full max-w-sm">
      <DrawerHeader>
        <DrawerTitle>Título</DrawerTitle>
        <DrawerDescription>Descrição.</DrawerDescription>
      </DrawerHeader>
      <div className="px-[30px]">
        {/* conteúdo */}
      </div>
      <DrawerFooter>
        <Button>Confirmar</Button>
        <DrawerClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DrawerClose>
      </DrawerFooter>
    </div>
  </DrawerContent>
</Drawer>`}
          />

          <CodeBlock
            title="Drawer lateral direito"
            code={`<Drawer direction="right">
  <DrawerTrigger asChild>
    <Button variant="outline">Filtros</Button>
  </DrawerTrigger>
  <DrawerContent className="w-[320px]">
    <DrawerHeader>
      <DrawerTitle>Filtros</DrawerTitle>
    </DrawerHeader>
    <div className="px-[30px]">{/* filtros */}</div>
    <DrawerFooter>
      <Button>Aplicar</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
          />
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="API dos sub-componentes do Drawer."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Props principais
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                {
                  name: "direction",
                  type: `"bottom" | "top" | "left" | "right"`,
                  note: "Direção de onde o drawer aparece. Padrão: bottom.",
                },
                {
                  name: "open",
                  type: "boolean",
                  note: "Estado controlado de abertura.",
                },
                {
                  name: "onOpenChange",
                  type: "(open: boolean) => void",
                  note: "Callback ao abrir/fechar.",
                },
                {
                  name: "shouldScaleBackground",
                  type: "boolean",
                  note: "Aplica escala no background ao abrir. Efeito visual do vaul.",
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
                O Drawer usa <code className="font-mono text-foreground">role="dialog"</code> e foco preso internamente.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                <code className="font-mono text-foreground">DrawerTitle</code> é obrigatório para nomear o dialog acessível.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                No mobile, o gesto de arrastar fecha o drawer. Em desktop, clique fora ou Escape.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
