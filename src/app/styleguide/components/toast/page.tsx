import { Typography } from "@/components/typography";
import {
  FoundationFooter,
  FoundationPageHeader,
  Section,
} from "../../foundation-sections";

function CodeBlock({ title, code }: { title: string; code: string }) {
  return (
    <div className="flex flex-col gap-3">
      <Typography as="p" variant="label" className="normal-case tracking-normal text-black">{title}</Typography>
      <div className="bg-[#D4D4D4] p-5">
        <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[12px] leading-6 text-foreground"><code>{code}</code></pre>
      </div>
    </div>
  );
}

export default function ToastPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Toast"
        description="O sistema de toasts deste design system usa Sonner — a implementação moderna recomendada pelo shadcn/ui."
      />

      <Section
        title="Toast → Sonner"
        subtitle="O componente Toast legado foi substituído por Sonner em versões recentes do shadcn/ui. Este projeto usa Sonner."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Use Sonner</Typography>
            <Typography as="p" variant="body-sm" className="mt-3 text-muted-foreground">
              Para notificações toast neste projeto, use o componente <strong className="text-foreground">Sonner</strong>. Ele está instalado, configurado no root layout e oferece uma API mais simples com suporte a promise, ações e múltiplos tipos.
            </Typography>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Consulte</Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              /styleguide/components/sonner
            </Typography>
          </div>
        </div>
      </Section>

      <Section title="Por que Sonner?" subtitle="Vantagens de Sonner sobre o Toast legado.">
        <div className="grid gap-4 xl:grid-cols-2">
          {[
            { title: "API mais simples", note: "toast.success(), toast.error() — sem boilerplate de useToast()." },
            { title: "Promise nativa", note: "toast.promise() gerencia loading/success/error automaticamente." },
            { title: "Sem Provider", note: "Apenas adiciona <Toaster /> no layout — sem contexto extra." },
            { title: "Ações inline", note: "Suporta botão de desfazer e outras ações sem configuração adicional." },
            { title: "Posicionamento flexível", note: "Controle da posição via prop position no Toaster." },
            { title: "Tema automático", note: "Integrado com next-themes para dark/light mode." },
          ].map((item) => (
            <div key={item.title} className="ds-card !p-[30px] flex flex-col gap-1">
              <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">{item.title}</Typography>
              <Typography as="p" variant="body-sm" className="mt-1 text-muted-foreground">{item.note}</Typography>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Migração do Toast legado" subtitle="Se você tem código com o Toast antigo, aqui está como migrar.">
        <div className="flex flex-col gap-6">
          <CodeBlock title="Antes (Toast legado)" code={`// Não use — Toast legado removido
import { useToast } from "@/components/ui/use-toast"

const { toast } = useToast()
toast({ title: "Salvo!", description: "Seu perfil foi atualizado." })`} />

          <CodeBlock title="Depois (Sonner)" code={`// Use Sonner
import { toast } from "sonner"

toast.success("Perfil atualizado!")
// ou com descrição:
toast("Salvo!", { description: "Seu perfil foi atualizado." })`} />
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
