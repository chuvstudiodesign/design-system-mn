import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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

export default function LabelPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Label"
        description="Rótulo acessível para campos de formulário. Associado via htmlFor ao id do input."
      />

      <Section
        title="Visão geral"
        subtitle="O Label é um componente simples que estiliza e padroniza os rótulos de campos de formulário."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Com diferentes tipos de input
            </Typography>
            <div className="ds-card !p-[30px] flex flex-col gap-4 max-w-sm">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="l-text">Nome completo</Label>
                <Input id="l-text" placeholder="Breno Masi" />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="l-email">E-mail</Label>
                <Input id="l-email" type="email" placeholder="breno@empresa.com" />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox id="l-check" />
                <Label htmlFor="l-check">Aceito os termos</Label>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="l-dis" className="opacity-50">Campo desabilitado</Label>
                <Input id="l-dis" placeholder="Desabilitado" disabled />
              </div>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { Label } from "@/components/ui/label"`}
            </Typography>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Nota
            </Typography>
            <Typography as="p" variant="body-sm" className="mt-3 text-muted-foreground">
              Para a maioria dos formulários, use o componente <code className="font-mono text-foreground">Field</code> que já inclui Label, description e error state. Use Label diretamente apenas quando precisar de um rótulo standalone.
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Padrão de implementação"
        subtitle="Como usar Label em diferentes contextos de formulário."
      >
        <div className="flex flex-col gap-6">
          <CodeBlock
            title="Label com Input"
            code={`import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

<div className="flex flex-col gap-1.5">
  <Label htmlFor="email">E-mail</Label>
  <Input id="email" type="email" />
</div>`}
          />

          <CodeBlock
            title="Label obrigatório"
            code={`<div className="flex flex-col gap-1.5">
  <Label htmlFor="nome">
    Nome
    <span className="ml-1 text-destructive" aria-hidden>*</span>
  </Label>
  <Input id="nome" required />
</div>`}
          />

          <CodeBlock
            title="Label com ícone"
            code={`<Label htmlFor="senha" className="flex items-center gap-1.5">
  <LockIcon className="size-3.5" />
  Senha
</Label>
<Input id="senha" type="password" />`}
          />
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="O Label aceita todas as props nativas do elemento label HTML."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Props principais
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                { name: "htmlFor", type: "string", note: "ID do input ao qual o label está associado. Essencial para acessibilidade." },
                { name: "className", type: "string", note: "Classes adicionais." },
                { name: "children", type: "ReactNode", note: "Texto do label. Aceita ícones e elementos inline." },
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
                Sempre use <code className="font-mono text-foreground">htmlFor</code> com o mesmo valor do <code className="font-mono text-foreground">id</code> do input para associação correta.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                O Label já inclui <code className="font-mono text-foreground">peer-disabled:opacity-50</code> para reduzir a opacidade quando o input associado está desabilitado.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
