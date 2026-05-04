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

const variants = [
  { variant: "default" as const, label: "Default", note: "Usa a cor primária do sistema (verde #5FC318). Para ações principais, status de aprovação e marcadores de destaque." },
  { variant: "secondary" as const, label: "Secondary", note: "Fundo neutro (section). Para categorias, tags e labels de baixo contraste." },
  { variant: "destructive" as const, label: "Destructive", note: "Vermelho semântico. Para erros, alertas críticos e remoção." },
  { variant: "outline" as const, label: "Outline", note: "Apenas borda. Para tags neutras que não competem com o conteúdo principal." },
  { variant: "ghost" as const, label: "Ghost", note: "Sem fundo visível em repouso. Para labels discretas em tabelas e listas." },
  { variant: "link" as const, label: "Link", note: "Texto com underline no hover. Para badges que também funcionam como navegação." },
] as const;

export default function BadgePage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Badge"
        description="Componente para exibir rótulos, status, categorias e contadores de forma compacta e destacada."
      />

      <Section
        title="Visão geral"
        subtitle="O Badge exibe informações curtas dentro de um pill ou tag. Tem 6 variantes visuais e aceita ícones."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Todas as variantes
            </Typography>
            <div className="ds-card !p-[30px] flex flex-wrap items-center gap-3">
              {variants.map(({ variant, label }) => (
                <Badge key={variant} variant={variant}>
                  {label}
                </Badge>
              ))}
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { Badge } from "@/components/ui/badge"`}
            </Typography>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Uso básico
            </Typography>
            <Typography as="p" variant="body-sm" className="mt-3 text-muted-foreground">
              Use a prop <code className="font-mono text-foreground">variant</code> para controlar o estilo visual. O componente aceita texto, ícones e conteúdo arbitrário como children.
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Variantes"
        subtitle="Cada variante tem um propósito semântico diferente no design system."
      >
        <div className="grid gap-4 xl:grid-cols-2">
          {variants.map(({ variant, label, note }) => (
            <div key={variant} className="ds-card !p-[30px] flex items-start gap-4">
              <Badge variant={variant} className="shrink-0">
                {label}
              </Badge>
              <div>
                <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
                  {label}
                </Typography>
                <Typography as="p" variant="body-sm" className="mt-1 text-muted-foreground">
                  {note}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Com ícones"
        subtitle="O Badge aceita ícones Lucide antes ou depois do texto."
      >
        <div className="flex flex-col gap-6">
          <div className="ds-card !p-[30px] flex flex-wrap items-center gap-3">
            <Badge variant="default">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Aprovado
            </Badge>
            <Badge variant="destructive">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" />
              </svg>
              Erro
            </Badge>
            <Badge variant="secondary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              Pendente
            </Badge>
            <Badge variant="outline">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" x2="7.01" y1="7" y2="7" />
              </svg>
              Tag
            </Badge>
          </div>

          <CodeBlock
            title="Badge com ícone"
            code={`import { CheckIcon } from "lucide-react"

<Badge variant="default">
  <CheckIcon />
  Aprovado
</Badge>`}
          />
        </div>
      </Section>

      <Section
        title="Padrão de implementação"
        subtitle="Snippets dos usos mais comuns do Badge no projeto."
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-6 pt-2">
            <CodeBlock
              title="Badge de status"
              code={`<Badge variant="default">Ativo</Badge>
<Badge variant="destructive">Inativo</Badge>
<Badge variant="secondary">Rascunho</Badge>`}
            />

            <CodeBlock
              title="Badge como link (render prop)"
              code={`import Link from "next/link"

<Badge variant="link" render={<Link href="/categorias/marketing" />}>
  Marketing
</Badge>`}
            />

            <CodeBlock
              title="Badge em tabela de dados"
              code={`<td>
  <Badge variant={status === "ativo" ? "default" : "outline"}>
    {status}
  </Badge>
</td>`}
            />
          </div>
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="API do Badge disponível no projeto."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Props principais
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                {
                  name: "variant",
                  type: `"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"`,
                  note: "Define o estilo visual e semântico do badge.",
                },
                {
                  name: "render",
                  type: "ReactElement",
                  note: "Substitui o elemento raiz. Use render={<Link href='...' />} para badges navegáveis.",
                },
                {
                  name: "className",
                  type: "string",
                  note: "Classes Tailwind adicionais para customizar o estilo no contexto.",
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
                O Badge renderiza como <code className="font-mono text-foreground">&lt;span&gt;</code> por padrão, sem papel semântico adicional. Para badges interativos use <code className="font-mono text-foreground">render</code> com <code className="font-mono text-foreground">&lt;button&gt;</code> ou <code className="font-mono text-foreground">&lt;a&gt;</code>.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Para badges que indicam status, considere adicionar <code className="font-mono text-foreground">aria-label</code> com o contexto completo, especialmente quando o texto do badge for abreviado.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
