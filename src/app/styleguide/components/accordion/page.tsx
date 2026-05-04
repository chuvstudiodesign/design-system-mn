import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Typography } from "@/components/typography";
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

export default function AccordionPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Accordion"
        description="Componente do shadcn/ui para revelar e recolher conteúdo por item, com suporte a abertura única ou múltipla."
      />

      <Section
        title="Visão geral"
        subtitle="O accordion já foi instalado em src/components/ui e segue a base visual do projeto."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Demo básica
            </Typography>
            <div className="ds-card w-full max-w-3xl">
              <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>O que é este componente?</AccordionTrigger>
                  <AccordionContent>
                    O accordion organiza conteúdo denso em blocos recolhíveis sem quebrar a hierarquia da página.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Onde ele aparece melhor?</AccordionTrigger>
                  <AccordionContent>
                    Em FAQs, documentação, regras de uso, detalhes técnicos e qualquer grupo de conteúdo progressivo.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Como ele se comporta aqui?</AccordionTrigger>
                  <AccordionContent>
                    Neste projeto ele usa a implementação do shadcn baseada em Base UI, com trigger textual e ícone de expansão.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="ds-card">
              <Typography
                as="p"
                variant="label"
                className="normal-case tracking-normal text-foreground"
              >
                Import
              </Typography>
              <Typography as="p" variant="code" className="mt-3 text-foreground">
                {`import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"`}
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
                O componente usa `Accordion` como root, `AccordionItem` para cada item,
                `AccordionTrigger` para o cabeçalho clicável e `AccordionContent` para o painel.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Variações e estados"
        subtitle="O accordion não tem variantes visuais próprias aqui, então a documentação foca em comportamento e estados de uso."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Single + collapsible
            </Typography>
            <div className="ds-card w-full max-w-3xl">
              <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Um item aberto por vez</AccordionTrigger>
                  <AccordionContent>
                    Esse é o comportamento mais comum para páginas de suporte, FAQs e documentação.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Pode recolher tudo</AccordionTrigger>
                  <AccordionContent>
                    Com `collapsible`, o usuário também pode fechar o item atualmente aberto.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Multiple + item desabilitado
            </Typography>
            <div className="ds-card w-full max-w-3xl">
              <Accordion type="multiple" defaultValue={["item-1"]} className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Múltiplos itens abertos</AccordionTrigger>
                  <AccordionContent>
                    Use `type=&quot;multiple&quot;` quando as seções não competem entre si.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Outro item simultâneo</AccordionTrigger>
                  <AccordionContent>
                    Esse modo é útil para checklist, filtros e documentação técnica com leitura não linear.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" disabled>
                  <AccordionTrigger>Estado desabilitado</AccordionTrigger>
                  <AccordionContent>
                    Este conteúdo não deve abrir.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Padrão de implementação"
        subtitle="Resumo das classes e snippets mais úteis para usar o componente no projeto."
      >
        <div className="flex flex-col gap-4">
          <div className="ds-card flex w-full max-w-md flex-col gap-1">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Root
            </Typography>
            <Typography as="p" variant="code" className="text-foreground">
              type=&quot;single&quot; | type=&quot;multiple&quot;
            </Typography>
            <Typography as="p" variant="body-sm" className="text-muted-foreground">
              Define se abre um item por vez ou vários em paralelo.
            </Typography>
          </div>

          <div className="ds-card flex w-full max-w-md flex-col gap-1">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Trigger
            </Typography>
            <Typography as="p" variant="code" className="text-foreground">
              text-sm font-medium py-2.5
            </Typography>
            <Typography as="p" variant="body-sm" className="text-muted-foreground">
              O trigger já vem pronto com foco visível, estados e ícone de expansão.
            </Typography>
          </div>

          <div className="ds-card flex w-full max-w-md flex-col gap-1">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Content
            </Typography>
            <Typography as="p" variant="code" className="text-foreground">
              text-sm pb-2.5
            </Typography>
            <Typography as="p" variant="body-sm" className="text-muted-foreground">
              O painel usa animação de abertura e fechamento e aceita composição livre de conteúdo.
            </Typography>
          </div>
          <div className="flex flex-col gap-6 pt-2">
            <CodeBlock
              title="Accordion básico"
              code={`<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Pergunta</AccordionTrigger>
    <AccordionContent>
      Resposta do item.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
            />

            <CodeBlock
              title="Accordion em grid de conteúdo"
              code={`<section className="rounded-[10px] bg-[#ECECEC] px-[60px] py-[80px]">
  <div className="grid gap-6 xl:grid-cols-2">
    <div className="rounded-[10px] bg-[#FFFFFF] px-[28px] py-[24px]">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Detalhes</AccordionTrigger>
          <AccordionContent>Conteúdo do bloco.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </div>
</section>`}
            />
          </div>
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="Os principais pontos de uso da API instalada no projeto."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Props principais
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                {
                  name: "type",
                  type: `"single" | "multiple"`,
                  note: "Controla a quantidade de itens que podem ficar abertos ao mesmo tempo.",
                },
                {
                  name: "collapsible",
                  type: "boolean",
                  note: "No modo single, permite fechar o item aberto.",
                },
                {
                  name: "defaultValue",
                  type: "string | string[]",
                  note: "Define quais itens começam abertos.",
                },
                {
                  name: "disabled",
                  type: "boolean",
                  note: "Desabilita um item específico do accordion.",
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
                O componente já nasce acessível pela base do shadcn/Base UI, com estados de teclado, foco visível e atributos ARIA gerenciados internamente.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Use textos claros no `AccordionTrigger`, preserve a ordem lógica dos itens e evite esconder conteúdo crítico sem contexto.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Para conteúdo muito longo, prefira quebrar o painel em parágrafos ou listas em vez de um bloco único.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
