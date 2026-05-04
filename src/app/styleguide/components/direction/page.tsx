import { DirectionProvider } from "@/components/direction";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

export default function DirectionPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Direction"
        description="Utilitário para suporte a layouts LTR (esquerda-direita) e RTL (direita-esquerda) em interfaces multilíngues."
      />

      <Section
        title="Visão geral"
        subtitle="O DirectionProvider define o atributo dir no container para controlar a direção de leitura de blocos de conteúdo."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="grid gap-6 xl:grid-cols-2">
            <div className="flex flex-col gap-3">
              <Typography as="p" variant="h3" className="text-foreground">
                LTR (Left to Right)
              </Typography>
              <div className="ds-card !p-[30px]">
                <DirectionProvider dir="ltr">
                  <div className="flex flex-col gap-3">
                    <Typography as="p" variant="body-sm" className="text-foreground">
                      Este texto flui da esquerda para a direita. Padrão para português, inglês e espanhol.
                    </Typography>
                    <div className="flex gap-2">
                      <Button size="sm">Ação</Button>
                      <Badge>LTR</Badge>
                    </div>
                  </div>
                </DirectionProvider>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Typography as="p" variant="h3" className="text-foreground">
                RTL (Right to Left)
              </Typography>
              <div className="ds-card !p-[30px]">
                <DirectionProvider dir="rtl">
                  <div className="flex flex-col gap-3">
                    <Typography as="p" variant="body-sm" className="text-foreground">
                      هذا النص يتدفق من اليمين إلى اليسار. للغة العربية والعبرية والفارسية.
                    </Typography>
                    <div className="flex gap-2">
                      <Button size="sm">فعل</Button>
                      <Badge>RTL</Badge>
                    </div>
                  </div>
                </DirectionProvider>
              </div>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { DirectionProvider } from "@/components/direction"`}
            </Typography>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Como funciona
            </Typography>
            <Typography as="p" variant="body-sm" className="mt-3 text-muted-foreground">
              O <code className="font-mono text-foreground">DirectionProvider</code> adiciona o atributo <code className="font-mono text-foreground">dir</code> no container. Os componentes shadcn/ui baseados em Base UI já suportam RTL nativamente via <code className="font-mono text-foreground">data-direction</code>.
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Padrão de implementação"
        subtitle="Como aplicar direção a seções ou à aplicação inteira."
      >
        <div className="flex flex-col gap-6">
          <CodeBlock
            title="Aplicar RTL em um bloco"
            code={`import { DirectionProvider } from "@/components/direction"

<DirectionProvider dir="rtl">
  <p>محتوى باللغة العربية</p>
</DirectionProvider>`}
          />

          <CodeBlock
            title="Aplicar globalmente (layout.tsx)"
            code={`// src/app/[locale]/layout.tsx
export default function LocaleLayout({ children, params }) {
  const dir = params.locale === "ar" ? "rtl" : "ltr"

  return (
    <html lang={params.locale} dir={dir}>
      <body>{children}</body>
    </html>
  )
}`}
          />

          <CodeBlock
            title="Componente shadcn com suporte RTL"
            code={`// Componentes que suportam dir automaticamente:
// - Breadcrumb (ChevronRight vira ChevronLeft)
// - Slider (direção invertida)
// - Select/DropdownMenu (posicionamento espelhado)

// O Popover e Dialog reposicionam automaticamente com dir="rtl"
<DirectionProvider dir="rtl">
  <Select>...</Select>
</DirectionProvider>`}
          />
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="API do componente DirectionProvider."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Props
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                {
                  name: "dir",
                  type: `"ltr" | "rtl"`,
                  note: "Direção do texto e do layout. Obrigatório.",
                },
                {
                  name: "children",
                  type: "ReactNode",
                  note: "Conteúdo ao qual a direção será aplicada.",
                },
                {
                  name: "className",
                  type: "string",
                  note: "Classes adicionais para o container.",
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
              Suporte RTL nos componentes
            </Typography>
            <div className="flex flex-col gap-3">
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Os componentes shadcn baseados em Base UI já têm suporte RTL via <code className="font-mono text-foreground">data-direction</code> e classes <code className="font-mono text-foreground">rtl:</code>.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Para aplicações multilíngues completas, configure <code className="font-mono text-foreground">dir</code> diretamente no elemento <code className="font-mono text-foreground">html</code> via i18n.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
