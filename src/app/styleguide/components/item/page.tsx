/* eslint-disable react/no-unescaped-entities */
import { Item } from "@/components/item";
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

const FileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const ChevronIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default function ItemPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Item"
        description="Componente customizado para linhas de lista com ícone, label, descrição e trailing opcional."
      />

      <Section
        title="Visão geral"
        subtitle="O Item é um bloco de linha de lista padronizado. Pode ser estático ou interativo."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Demo básica
            </Typography>
            <div className="ds-card !p-[30px] flex flex-col divide-y divide-border">
              <Item icon={<FileIcon />} label="relatorio-q1.pdf" description="842 KB · PDF" trailing={<ChevronIcon />} />
              <Item icon={<FileIcon />} label="apresentacao.pptx" description="2.1 MB · PowerPoint" trailing={<ChevronIcon />} />
              <Item icon={<UserIcon />} label="Lucas Zerlotini" description="lucas@empresa.com" trailing={<Badge variant="default">Admin</Badge>} />
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { Item } from "@/components/item"`}
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Interativo"
        subtitle="Use interactive para items clicáveis com hover e foco visível."
      >
        <div className="flex flex-col gap-6">
          <div className="ds-card !p-[30px] flex flex-col">
            <Item icon={<UserIcon />} label="Perfil" description="Ver e editar suas informações" trailing={<ChevronIcon />} interactive />
            <Item icon={<FileIcon />} label="Documentos" description="Seus arquivos e relatórios" trailing={<ChevronIcon />} interactive />
            <Item icon={<UserIcon />} label="Configurações" description="Privacidade e preferências" trailing={<ChevronIcon />} interactive />
          </div>

          <CodeBlock
            title="Item interativo"
            code={`<Item
  icon={<UserIcon />}
  label="Perfil"
  description="Ver suas informações"
  trailing={<ChevronRightIcon className="size-3.5" />}
  interactive
  onClick={() => router.push("/perfil")}
/>`}
          />
        </div>
      </Section>

      <Section
        title="Padrão de implementação"
        subtitle="Snippets para os usos mais comuns do Item."
      >
        <div className="flex flex-col gap-6">
          <CodeBlock
            title="Lista de usuários"
            code={`import { Item } from "@/components/item"

<div className="ds-card !p-[30px] flex flex-col divide-y divide-border">
  {users.map((user) => (
    <Item
      key={user.id}
      icon={<Avatar size="sm"><AvatarFallback>{user.initials}</AvatarFallback></Avatar>}
      label={user.name}
      description={user.email}
      trailing={<Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</Badge>}
    />
  ))}
</div>`}
          />

          <CodeBlock
            title="Menu de navegação"
            code={`<nav className="flex flex-col">
  {navItems.map((navItem) => (
    <Item
      key={navItem.href}
      icon={navItem.icon}
      label={navItem.label}
      trailing={<ChevronRightIcon className="size-3.5" />}
      interactive
      onClick={() => router.push(navItem.href)}
    />
  ))}
</nav>`}
          />
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="API do componente Item customizado."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Props
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                { name: "icon", type: "ReactNode", note: "Ícone ou avatar exibido à esquerda." },
                { name: "label", type: "string", note: "Texto principal do item (truncado se longo)." },
                { name: "description", type: "string", note: "Texto secundário abaixo do label." },
                { name: "trailing", type: "ReactNode", note: "Elemento à direita (badge, ícone, ação)." },
                { name: "interactive", type: "boolean", note: "Adiciona hover, foco e cursor-pointer." },
                { name: "children", type: "ReactNode", note: "Conteúdo customizado no bloco central." },
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
                Com <code className="font-mono text-foreground">interactive</code>, o Item recebe <code className="font-mono text-foreground">role="button"</code> e <code className="font-mono text-foreground">tabIndex=0</code> automaticamente.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Para listas, envolva os Items em <code className="font-mono text-foreground">ul + li</code> ou use <code className="font-mono text-foreground">role="list"</code> no container para semântica correta.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
