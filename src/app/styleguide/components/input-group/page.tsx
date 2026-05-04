/* eslint-disable react/no-unescaped-entities */
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
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

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
  </svg>
);

const AtIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
  </svg>
);

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

export default function InputGroupPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Input Group"
        description="Componente para adicionar ícones, texto, botões e outros addons dentro de campos de input de forma visualmente integrada."
      />

      <Section
        title="Visão geral"
        subtitle="O InputGroup unifica um campo de texto com addons (ícones, texto, botões) em uma unidade visual coesa."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Exemplos básicos
            </Typography>
            <div className="ds-card !p-[30px] flex flex-col gap-4 max-w-sm">
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <InputGroupText>
                    <SearchIcon />
                  </InputGroupText>
                </InputGroupAddon>
                <InputGroupInput placeholder="Buscar..." />
              </InputGroup>

              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <InputGroupText>
                    <AtIcon />
                  </InputGroupText>
                </InputGroupAddon>
                <InputGroupInput placeholder="usuario" />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>.com.br</InputGroupText>
                </InputGroupAddon>
              </InputGroup>

              <InputGroup>
                <InputGroupInput defaultValue="https://meu-link.com/share" readOnly />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton size="xs" aria-label="Copiar">
                    <CopyIcon />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import {
  InputGroup, InputGroupAddon, InputGroupButton,
  InputGroupInput, InputGroupText
} from "@/components/ui/input-group"`}
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Posicionamento dos addons"
        subtitle="Os addons podem ser posicionados inline (esquerda/direita) ou em bloco (topo/base)."
      >
        <div className="flex flex-col gap-6">
          <div className="grid gap-4 xl:grid-cols-2">
            <div className="ds-card !p-[30px] flex flex-col gap-4">
              <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
                Inline (horizontal)
              </Typography>

              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <InputGroupText>R$</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput placeholder="0,00" type="number" />
              </InputGroup>

              <InputGroup>
                <InputGroupInput placeholder="meunome" />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>@empresa.com</InputGroupText>
                </InputGroupAddon>
              </InputGroup>

              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <InputGroupText>https://</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput placeholder="meusite.com" />
              </InputGroup>
            </div>

            <div className="ds-card !p-[30px] flex flex-col gap-4">
              <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
                Bloco (vertical)
              </Typography>

              <InputGroup>
                <InputGroupAddon align="block-start">
                  <InputGroupText>Endereço de e-mail</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput placeholder="nome@empresa.com" type="email" />
              </InputGroup>

              <InputGroup>
                <InputGroupInput placeholder="Digite seu nome" />
                <InputGroupAddon align="block-end">
                  <InputGroupText>Mínimo 2 caracteres</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Padrão de implementação"
        subtitle="Snippets para os usos mais comuns do InputGroup."
      >
        <div className="flex flex-col gap-6">
          <CodeBlock
            title="Campo de busca"
            code={`import { SearchIcon } from "lucide-react"

<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText>
      <SearchIcon />
    </InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="Buscar..." />
</InputGroup>`}
          />

          <CodeBlock
            title="Campo monetário"
            code={`<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText>R$</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput
    type="number"
    placeholder="0,00"
    min={0}
    step={0.01}
  />
</InputGroup>`}
          />

          <CodeBlock
            title="Com botão de ação"
            code={`<InputGroup>
  <InputGroupInput
    value={url}
    readOnly
    placeholder="Link gerado..."
  />
  <InputGroupAddon align="inline-end">
    <InputGroupButton onClick={handleCopy} aria-label="Copiar link">
      <CopyIcon />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>`}
          />
        </div>
      </Section>

      <Section
        title="Sub-componentes"
        subtitle="API dos sub-componentes do InputGroup."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Sub-componentes
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                { name: "InputGroup", note: "Container principal. Gerencia o visual unificado." },
                { name: "InputGroupInput", note: "Campo de texto interno. Substitui o Input padrão dentro do grupo." },
                { name: "InputGroupAddon", note: "Container de addon. Prop align: inline-start | inline-end | block-start | block-end." },
                { name: "InputGroupText", note: "Texto ou ícone não-interativo no addon." },
                { name: "InputGroupButton", note: "Botão dentro do addon. Prop size: xs | sm | icon-xs | icon-sm." },
                { name: "InputGroupTextarea", note: "Textarea dentro do grupo. Para inputs multiline com addons." },
              ].map((item) => (
                <div key={item.name} className="border-b border-white pb-3 last:border-0 last:pb-0">
                  <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
                    {item.name}
                  </Typography>
                  <Typography as="p" variant="body-sm" className="mt-1 text-muted-foreground">
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
                O container usa <code className="font-mono text-foreground">role="group"</code> para agrupar o input e seus addons.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Use <code className="font-mono text-foreground">Field</code> externo com <code className="font-mono text-foreground">label</code> para nomear o InputGroup para leitores de tela.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Para botões de ação (copiar, enviar), sempre inclua <code className="font-mono text-foreground">aria-label</code> descritivo.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
