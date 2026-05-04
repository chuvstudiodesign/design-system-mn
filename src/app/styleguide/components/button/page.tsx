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

const variants = [
  { variant: "default" as const, label: "Default", note: "Ação principal. Usa a cor primária do sistema." },
  { variant: "secondary" as const, label: "Secondary", note: "Ação secundária com fundo neutro." },
  { variant: "outline" as const, label: "Outline", note: "Ação de baixo contraste com borda visível." },
  { variant: "ghost" as const, label: "Ghost", note: "Mínima interferência visual. Fundo aparece apenas no hover." },
  { variant: "destructive" as const, label: "Destructive", note: "Ação de risco: deletar, remover, encerrar." },
  { variant: "link" as const, label: "Link", note: "Aparência de link. Para navegação inline." },
] as const;

export default function ButtonPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Button"
        description="Componente de ação primária. Suporta variantes visuais, múltiplos tamanhos e ícones embutidos."
      />

      <Section
        title="Visão geral"
        subtitle="O Button é o componente de ação central do sistema. 6 variantes, 8 tamanhos e suporte nativo a ícones."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Todas as variantes
            </Typography>
            <div className="ds-card !p-[30px] flex flex-wrap items-center gap-3">
              {variants.map(({ variant, label }) => (
                <Button key={variant} variant={variant}>
                  {label}
                </Button>
              ))}
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { Button } from "@/components/ui/button"`}
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Variantes"
        subtitle="Cada variante comunica uma intenção diferente. Use a variante certa para o contexto."
      >
        <div className="grid gap-4 xl:grid-cols-2">
          {variants.map(({ variant, label, note }) => (
            <div key={variant} className="ds-card !p-[30px] flex items-center gap-4">
              <Button variant={variant} className="shrink-0">
                {label}
              </Button>
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
        title="Tamanhos"
        subtitle="O Button tem 8 tamanhos: 4 para texto e 4 para ícone isolado."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Com texto
            </Typography>
            <div className="ds-card !p-[30px] flex flex-wrap items-end gap-4">
              {(["xs", "sm", "default", "lg"] as const).map((size) => (
                <div key={size} className="flex flex-col items-center gap-2">
                  <Button size={size}>Botão</Button>
                  <Typography as="p" variant="caption" className="normal-case tracking-normal text-muted-foreground">
                    {size}
                  </Typography>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Ícone isolado (icon)
            </Typography>
            <div className="ds-card !p-[30px] flex flex-wrap items-end gap-4">
              {(["icon-xs", "icon-sm", "icon", "icon-lg"] as const).map((size) => (
                <div key={size} className="flex flex-col items-center gap-2">
                  <Button size={size} aria-label={`Ícone ${size}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" x2="12" y1="5" y2="19" /><line x1="5" x2="19" y1="12" y2="12" />
                    </svg>
                  </Button>
                  <Typography as="p" variant="caption" className="normal-case tracking-normal text-muted-foreground">
                    {size}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Com ícones"
        subtitle="O Button suporta ícones antes ou depois do texto com espaçamento automático."
      >
        <div className="flex flex-col gap-6">
          <div className="ds-card !p-[30px] flex flex-wrap items-center gap-3">
            <Button>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" x2="12" y1="5" y2="19" /><line x1="5" x2="19" y1="12" y2="12" />
              </svg>
              Criar
            </Button>
            <Button variant="outline">
              Editar
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" />
              </svg>
            </Button>
            <Button variant="destructive">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
              Excluir
            </Button>
          </div>

          <CodeBlock
            title="Botão com ícone à esquerda"
            code={`import { PlusIcon } from "lucide-react"

<Button>
  <PlusIcon />
  Criar novo
</Button>`}
          />
        </div>
      </Section>

      <Section
        title="Estados"
        subtitle="O Button tem estados de hover, foco, desabilitado e ativo."
      >
        <div className="flex flex-col gap-6">
          <div className="ds-card !p-[30px] flex flex-wrap items-center gap-3">
            <Button>Normal</Button>
            <Button disabled>Desabilitado</Button>
            <Button aria-invalid="true">Inválido</Button>
          </div>

          <CodeBlock
            title="Estado desabilitado"
            code={`<Button disabled>Salvar</Button>`}
          />
        </div>
      </Section>

      <Section
        title="Padrão de implementação"
        subtitle="Snippets dos contextos mais comuns."
      >
        <div className="flex flex-col gap-6">
          <CodeBlock
            title="Botão padrão"
            code={`<Button>Salvar alterações</Button>`}
          />

          <CodeBlock
            title="Dupla de ações (confirm / cancel)"
            code={`<div className="flex gap-3">
  <Button variant="outline">Cancelar</Button>
  <Button>Confirmar</Button>
</div>`}
          />

          <CodeBlock
            title="Botão de ícone"
            code={`import { TrashIcon } from "lucide-react"

<Button size="icon" variant="ghost" aria-label="Excluir item">
  <TrashIcon />
</Button>`}
          />

          <CodeBlock
            title="Como link (render prop)"
            code={`import Link from "next/link"

<Button render={<Link href="/dashboard" />}>
  Ir para o painel
</Button>`}
          />
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="API do Button disponível no projeto."
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
                  type: `"default" | "secondary" | "outline" | "ghost" | "destructive" | "link"`,
                  note: "Define o estilo visual e a intenção do botão.",
                },
                {
                  name: "size",
                  type: `"xs" | "sm" | "default" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"`,
                  note: "Controla a altura e padding do botão.",
                },
                {
                  name: "disabled",
                  type: "boolean",
                  note: "Desabilita interação e aplica opacidade reduzida.",
                },
                {
                  name: "render",
                  type: "ReactElement",
                  note: "Substitui o elemento raiz. Use render={<Link href='...' />} para navegação.",
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
                O componente tem foco visível completo via <code className="font-mono text-foreground">focus-visible:ring</code> para navegação por teclado.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Para botões de ícone (sem texto), use <code className="font-mono text-foreground">aria-label</code> descritivo para que leitores de tela possam identificar a ação.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Use <code className="font-mono text-foreground">disabled</code> apenas quando a ação está temporariamente indisponível. Para ações permanentemente inacessíveis, remova o botão da interface.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
