/* eslint-disable react/no-unescaped-entities */
import { Empty } from "@/components/empty";
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

const InboxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
  </svg>
);

const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
  </svg>
);

export default function EmptyPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Empty"
        description="Componente customizado para estados vazios. Exibe ícone, título, descrição e ação opcional quando não há conteúdo para mostrar."
      />

      <Section
        title="Visão geral"
        subtitle="O Empty é um componente de estado nulo — usado quando uma lista, tabela ou área de conteúdo não tem dados."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Demo básica
            </Typography>
            <div className="ds-card !p-[30px]">
              <Empty
                icon={<InboxIcon />}
                title="Nenhuma mensagem"
                description="Você não tem mensagens no momento. Quando chegar algo, aparece aqui."
                action={<Button size="sm">Criar mensagem</Button>}
              />
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { Empty } from "@/components/empty"`}
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Variações"
        subtitle="O Empty se adapta a diferentes contextos de estado vazio."
      >
        <div className="grid gap-6 xl:grid-cols-3">
          <div className="ds-card !p-[30px]">
            <Empty
              icon={<SearchIcon />}
              title="Sem resultados"
              description="Nenhum item corresponde à sua busca. Tente termos diferentes."
            />
          </div>

          <div className="ds-card !p-[30px]">
            <Empty
              icon={<FolderIcon />}
              title="Pasta vazia"
              description="Esta pasta não tem arquivos."
              action={<Button size="sm" variant="outline">Fazer upload</Button>}
            />
          </div>

          <div className="ds-card !p-[30px]">
            <Empty
              title="Nenhum dado"
              description="Nenhum registro encontrado para o período selecionado."
            />
          </div>
        </div>
      </Section>

      <Section
        title="Padrão de implementação"
        subtitle="Como usar o Empty em tabelas, listas e áreas de conteúdo."
      >
        <div className="flex flex-col gap-6">
          <CodeBlock
            title="Empty básico"
            code={`import { Empty } from "@/components/empty"
import { InboxIcon } from "lucide-react"

<Empty
  icon={<InboxIcon />}
  title="Caixa vazia"
  description="Não há itens para exibir."
  action={<Button>Adicionar item</Button>}
/>`}
          />

          <CodeBlock
            title="Em tabela de dados"
            code={`<Table>
  <TableHeader>...</TableHeader>
  <TableBody>
    {data.length === 0 ? (
      <TableRow>
        <TableCell colSpan={5}>
          <Empty
            icon={<SearchIcon />}
            title="Nenhum resultado"
            description="Tente ajustar os filtros."
          />
        </TableCell>
      </TableRow>
    ) : (
      data.map((row) => <TableRow key={row.id}>...</TableRow>)
    )}
  </TableBody>
</Table>`}
          />
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="API do componente Empty customizado."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Props
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                { name: "icon", type: "ReactNode", note: "Ícone ou SVG exibido no topo. Exibido em container circular com bg-muted." },
                { name: "title", type: "string", note: "Título principal do estado vazio." },
                { name: "description", type: "string", note: "Texto explicativo sobre o estado vazio." },
                { name: "action", type: "ReactNode", note: "Botão ou link de ação contextual." },
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
              Boas práticas
            </Typography>
            <div className="flex flex-col gap-3">
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Sempre inclua uma ação quando o usuário puder fazer algo para resolver o estado vazio.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Use linguagem positiva e orientada para a ação: "Crie seu primeiro projeto" em vez de "Nenhum projeto encontrado".
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Para estados de erro (não apenas vazio), considere usar o componente Alert em vez de Empty.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
