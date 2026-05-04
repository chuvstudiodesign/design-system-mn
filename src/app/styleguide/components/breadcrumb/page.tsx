/* eslint-disable react/no-unescaped-entities */
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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

export default function BreadcrumbShowcasePage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Breadcrumb"
        description="Componente de navegação secundária que indica a posição do usuário dentro da hierarquia de páginas."
      />

      <Section
        title="Visão geral"
        subtitle="O Breadcrumb exibe o caminho de navegação com links clicáveis e a página atual não-interativa."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Demo básica
            </Typography>
            <div className="ds-card !p-[30px]">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/styleguide">Design System</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/styleguide/components/breadcrumb">Componentes</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem,
  BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis
} from "@/components/ui/breadcrumb"`}
            </Typography>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Estrutura base
            </Typography>
            <Typography as="p" variant="body-sm" className="mt-3 text-muted-foreground">
              <code className="font-mono text-foreground">Breadcrumb</code> é o container <code className="font-mono text-foreground">nav</code>. Dentro vai <code className="font-mono text-foreground">BreadcrumbList</code>, depois pares de <code className="font-mono text-foreground">BreadcrumbItem + BreadcrumbSeparator</code>, e o item final usa <code className="font-mono text-foreground">BreadcrumbPage</code> (não é link).
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Variações"
        subtitle="Exemplos de usos comuns do breadcrumb em diferentes contextos."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Com elipse (caminho longo)
            </Typography>
            <div className="ds-card !p-[30px]">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbEllipsis />
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Componentes</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Com separador customizado (barra)
            </Typography>
            <div className="ds-card !p-[30px]">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <span className="text-muted-foreground">/</span>
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Produtos</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <span className="text-muted-foreground">/</span>
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Detalhes</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Dois níveis simples
            </Typography>
            <div className="ds-card !p-[30px]">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Configurações</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Padrão de implementação"
        subtitle="Snippets prontos para os contextos mais comuns."
      >
        <div className="flex flex-col gap-6">
          <CodeBlock
            title="Breadcrumb básico (3 níveis)"
            code={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/produtos">Produtos</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Detalhes do produto</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
          />

          <CodeBlock
            title="Com Next.js Link"
            code={`import Link from "next/link"

<BreadcrumbLink render={<Link href="/produtos" />}>
  Produtos
</BreadcrumbLink>`}
          />

          <CodeBlock
            title="Com elipse para caminho longo"
            code={`<BreadcrumbItem>
  <BreadcrumbEllipsis />
</BreadcrumbItem>`}
          />
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="API dos sub-componentes disponíveis no projeto."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Sub-componentes
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                {
                  name: "Breadcrumb",
                  type: "nav",
                  note: "Container raiz com aria-label='breadcrumb'.",
                },
                {
                  name: "BreadcrumbList",
                  type: "ol",
                  note: "Lista ordenada dos itens do caminho.",
                },
                {
                  name: "BreadcrumbItem",
                  type: "li",
                  note: "Container de cada item individual.",
                },
                {
                  name: "BreadcrumbLink",
                  type: "a | render prop",
                  note: "Link navegável. Use render={<Link href='...' />} para Next.js.",
                },
                {
                  name: "BreadcrumbPage",
                  type: "span",
                  note: "Item atual (não-navegável). Tem aria-current='page' automaticamente.",
                },
                {
                  name: "BreadcrumbSeparator",
                  type: "li",
                  note: "Separador visual (padrão: ChevronRight). Aceita children para customizar.",
                },
                {
                  name: "BreadcrumbEllipsis",
                  type: "span",
                  note: "Ícone de reticências para caminhos longos colapsados.",
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
                O componente usa <code className="font-mono text-foreground">nav aria-label="breadcrumb"</code> automaticamente para identificação por leitores de tela.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                O <code className="font-mono text-foreground">BreadcrumbPage</code> inclui <code className="font-mono text-foreground">aria-current="page"</code> para indicar a página atual.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Os separadores têm <code className="font-mono text-foreground">aria-hidden="true"</code> para não serem anunciados por leitores de tela.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
