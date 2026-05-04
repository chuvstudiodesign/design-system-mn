import { NativeSelect } from "@/components/native-select";
import { Field } from "@/components/field";
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

export default function NativeSelectPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Native Select"
        description="Select nativo do HTML com estilização do design system. Mais simples que o Select shadcn — use quando a lista é curta e não precisa de busca."
      />

      <Section title="Visão geral" subtitle="O NativeSelect usa o select nativo do browser, garantindo comportamento padrão em mobile e desktop." first>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">Demo</Typography>
            <div className="ds-card !p-[30px] flex flex-col gap-4 max-w-sm">
              <Field label="País" htmlFor="ns-pais">
                <NativeSelect id="ns-pais" placeholder="Selecionar país" defaultValue="">
                  <option value="br">Brasil</option>
                  <option value="pt">Portugal</option>
                  <option value="us">Estados Unidos</option>
                </NativeSelect>
              </Field>

              <Field label="Idioma" htmlFor="ns-idioma">
                <NativeSelect id="ns-idioma" defaultValue="pt-br">
                  <option value="pt-br">Português (BR)</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </NativeSelect>
              </Field>

              <Field label="Desabilitado" htmlFor="ns-dis">
                <NativeSelect id="ns-dis" disabled defaultValue="br">
                  <option value="br">Brasil</option>
                </NativeSelect>
              </Field>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Import</Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { NativeSelect } from "@/components/native-select"`}
            </Typography>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Quando usar</Typography>
            <Typography as="p" variant="body-sm" className="mt-3 text-muted-foreground">
              Use NativeSelect para listas curtas (até 10 itens) em formulários simples. Use o componente Select shadcn para listas com grupos, ícones ou busca.
            </Typography>
          </div>
        </div>
      </Section>

      <Section title="Padrão de implementação" subtitle="Snippets para uso do NativeSelect.">
        <div className="flex flex-col gap-6">
          <CodeBlock title="NativeSelect com Field" code={`import { NativeSelect } from "@/components/native-select"
import { Field } from "@/components/field"

<Field label="Categoria" htmlFor="cat">
  <NativeSelect id="cat" placeholder="Selecionar categoria" defaultValue="">
    <option value="tech">Tecnologia</option>
    <option value="design">Design</option>
    <option value="marketing">Marketing</option>
  </NativeSelect>
</Field>`} />

          <CodeBlock title="Com optgroup" code={`<NativeSelect>
  <optgroup label="América">
    <option value="br">Brasil</option>
    <option value="ar">Argentina</option>
  </optgroup>
  <optgroup label="Europa">
    <option value="pt">Portugal</option>
    <option value="es">Espanha</option>
  </optgroup>
</NativeSelect>`} />
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
