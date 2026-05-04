/* eslint-disable react/no-unescaped-entities */
import { Field } from "@/components/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

export default function FieldPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Field"
        description="Componente customizado que envolve qualquer input com label, descrição e mensagem de erro de forma consistente."
      />

      <Section
        title="Visão geral"
        subtitle="O Field é um wrapper que adiciona label, description e error a qualquer componente de input do design system."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Demo básica
            </Typography>
            <div className="ds-card !p-[30px] flex flex-col gap-4 w-full max-w-sm">
              <Field label="Nome completo" htmlFor="nome" required description="Digite seu nome como aparece no documento.">
                <Input id="nome" placeholder="Lucas Zerlotini" />
              </Field>

              <Field label="E-mail" htmlFor="email" error="Este e-mail já está em uso.">
                <Input id="email" type="email" placeholder="lucas@exemplo.com" aria-invalid />
              </Field>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { Field } from "@/components/field"`}
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Estados"
        subtitle="O Field suporta quatro estados: padrão, com descrição, com erro e desabilitado."
      >
        <div className="flex flex-col gap-6">
          <div className="grid gap-4 xl:grid-cols-2">
            <div className="ds-card !p-[30px] flex flex-col gap-4">
              <Field label="Padrão" htmlFor="f-default">
                <Input id="f-default" placeholder="Sem estado especial" />
              </Field>

              <Field label="Com descrição" htmlFor="f-desc" description="Texto de apoio para orientar o usuário.">
                <Input id="f-desc" placeholder="Placeholder" />
              </Field>

              <Field label="Com erro" htmlFor="f-error" error="Campo obrigatório não preenchido.">
                <Input id="f-error" placeholder="Valor inválido" aria-invalid />
              </Field>

              <Field label="Obrigatório" htmlFor="f-req" required description="Campo marcado como obrigatório.">
                <Input id="f-req" placeholder="Necessário" />
              </Field>
            </div>

            <div className="ds-card !p-[30px] flex flex-col gap-4">
              <Field label="Textarea" htmlFor="f-area" description="Para textos longos.">
                <Textarea id="f-area" placeholder="Escreva aqui..." rows={3} />
              </Field>

              <Field htmlFor="f-check" description="O Field também funciona com checkboxes.">
                <div className="flex items-center gap-2">
                  <Checkbox id="f-check" />
                  <label htmlFor="f-check" className="text-sm text-foreground cursor-pointer">
                    Aceito os termos de uso
                  </label>
                </div>
              </Field>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Padrão de implementação"
        subtitle="Como usar o Field com diferentes tipos de input no projeto."
      >
        <div className="flex flex-col gap-6">
          <CodeBlock
            title="Field com Input"
            code={`import { Field } from "@/components/field"
import { Input } from "@/components/ui/input"

<Field
  label="E-mail"
  htmlFor="email"
  required
  description="Use seu e-mail corporativo."
>
  <Input id="email" type="email" placeholder="nome@empresa.com" />
</Field>`}
          />

          <CodeBlock
            title="Field com erro"
            code={`<Field
  label="Senha"
  htmlFor="senha"
  error="A senha deve ter pelo menos 8 caracteres."
>
  <Input
    id="senha"
    type="password"
    aria-invalid  // ativa o estilo de erro no input
  />
</Field>`}
          />

          <CodeBlock
            title="Formulário completo"
            code={`<form className="flex flex-col gap-4 max-w-sm">
  <Field label="Nome" htmlFor="nome" required>
    <Input id="nome" />
  </Field>
  <Field label="E-mail" htmlFor="email" required>
    <Input id="email" type="email" />
  </Field>
  <Field label="Mensagem" htmlFor="msg">
    <Textarea id="msg" rows={4} />
  </Field>
  <Button type="submit">Enviar</Button>
</form>`}
          />
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="API do componente Field customizado."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Props
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                { name: "label", type: "string", note: "Rótulo do campo. Associado via htmlFor." },
                { name: "htmlFor", type: "string", note: "ID do input ao qual o label está associado." },
                { name: "required", type: "boolean", note: "Exibe asterisco vermelho no label." },
                { name: "description", type: "string", note: "Texto de apoio exibido abaixo do input (oculto quando há error)." },
                { name: "error", type: "string", note: "Mensagem de erro exibida abaixo do input com role='alert'." },
                { name: "children", type: "ReactNode", note: "O input, select, textarea ou qualquer campo de formulário." },
                { name: "className", type: "string", note: "Classes adicionais para o container." },
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
                O <code className="font-mono text-foreground">label</code> é associado ao input via <code className="font-mono text-foreground">htmlFor</code>. Sempre forneça um valor igual ao <code className="font-mono text-foreground">id</code> do input filho.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                A mensagem de erro usa <code className="font-mono text-foreground">role="alert"</code> para ser anunciada imediatamente por leitores de tela.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Inputs com erro devem receber <code className="font-mono text-foreground">aria-invalid</code> para ativar o estilo visual correto.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
