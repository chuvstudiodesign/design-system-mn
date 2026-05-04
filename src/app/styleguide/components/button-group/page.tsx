/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/button-group";
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

export default function ButtonGroupPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Button Group"
        description="Componente customizado que agrupa botões adjacentes em uma unidade visual coesa, horizontal ou vertical."
      />

      <Section
        title="Visão geral"
        subtitle="ButtonGroup une botões removendo as bordas entre eles e criando um bloco contínuo de ações relacionadas."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Horizontal (padrão)
            </Typography>
            <div className="ds-card !p-[30px] flex flex-wrap gap-4">
              <ButtonGroup>
                <Button variant="outline">Dia</Button>
                <Button variant="outline">Semana</Button>
                <Button variant="outline">Mês</Button>
              </ButtonGroup>

              <ButtonGroup>
                <Button>Salvar</Button>
                <Button variant="outline">Cancelar</Button>
              </ButtonGroup>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { ButtonGroup } from "@/components/button-group"
import { Button } from "@/components/ui/button"`}
            </Typography>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Estrutura
            </Typography>
            <Typography as="p" variant="body-sm" className="mt-3 text-muted-foreground">
              Envolva botões <code className="font-mono text-foreground">Button</code> dentro de <code className="font-mono text-foreground">ButtonGroup</code>. O componente remove as bordas internas e junta os raios de borda dos extremos.
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Orientação vertical"
        subtitle="ButtonGroup também funciona em orientação vertical para menus de ações empilhadas."
      >
        <div className="flex flex-col gap-6">
          <div className="ds-card !p-[30px] flex gap-8">
            <ButtonGroup orientation="vertical">
              <Button variant="outline">Perfil</Button>
              <Button variant="outline">Configurações</Button>
              <Button variant="outline">Sair</Button>
            </ButtonGroup>

            <ButtonGroup orientation="vertical">
              <Button size="sm" variant="outline">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" x2="12" y1="5" y2="19" /><line x1="5" x2="19" y1="12" y2="12" />
                </svg>
              </Button>
              <Button size="sm" variant="outline">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" x2="19" y1="12" y2="12" />
                </svg>
              </Button>
            </ButtonGroup>
          </div>

          <CodeBlock
            title="Orientação vertical"
            code={`<ButtonGroup orientation="vertical">
  <Button variant="outline">Perfil</Button>
  <Button variant="outline">Configurações</Button>
  <Button variant="outline">Sair</Button>
</ButtonGroup>`}
          />
        </div>
      </Section>

      <Section
        title="Com variantes mistas"
        subtitle="Botões de variantes diferentes podem ser combinados dentro do mesmo grupo."
      >
        <div className="flex flex-col gap-6">
          <div className="ds-card !p-[30px] flex flex-wrap gap-4">
            <ButtonGroup>
              <Button>Principal</Button>
              <Button variant="secondary">Secundário</Button>
              <Button variant="ghost">Terciário</Button>
            </ButtonGroup>
          </div>

          <CodeBlock
            title="Grupo com variantes mistas"
            code={`<ButtonGroup>
  <Button>Confirmar</Button>
  <Button variant="outline">Editar</Button>
  <Button variant="ghost">Cancelar</Button>
</ButtonGroup>`}
          />
        </div>
      </Section>

      <Section
        title="Padrão de implementação"
        subtitle="Snippets dos usos mais comuns do ButtonGroup no projeto."
      >
        <div className="flex flex-col gap-6">
          <CodeBlock
            title="Filtro de período"
            code={`<ButtonGroup>
  <Button variant="outline">Hoje</Button>
  <Button variant="outline">7 dias</Button>
  <Button variant="outline">30 dias</Button>
  <Button variant="outline">Custom</Button>
</ButtonGroup>`}
          />

          <CodeBlock
            title="Ações de formulário"
            code={`<ButtonGroup>
  <Button>Salvar</Button>
  <Button variant="outline">Salvar e continuar</Button>
</ButtonGroup>`}
          />

          <CodeBlock
            title="Controles de zoom"
            code={`<ButtonGroup>
  <Button size="icon-sm" variant="outline" aria-label="Reduzir">
    <MinusIcon />
  </Button>
  <Button size="icon-sm" variant="outline" aria-label="Ampliar">
    <PlusIcon />
  </Button>
</ButtonGroup>`}
          />
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="API do componente customizado ButtonGroup."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Props principais
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                {
                  name: "orientation",
                  type: `"horizontal" | "vertical"`,
                  note: "Direção do agrupamento. Padrão: horizontal.",
                },
                {
                  name: "children",
                  type: "ReactNode",
                  note: "Botões Button a serem agrupados. Outros elementos também são aceitos.",
                },
                {
                  name: "className",
                  type: "string",
                  note: "Classes adicionais para o container do grupo.",
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
                O container usa <code className="font-mono text-foreground">role="group"</code> para indicar que os botões fazem parte de um conjunto relacionado.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Para grupos de alternância (ex: visualização por dia/semana/mês), considere usar <code className="font-mono text-foreground">aria-pressed</code> no botão ativo ou o componente <code className="font-mono text-foreground">ToggleGroup</code>.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
