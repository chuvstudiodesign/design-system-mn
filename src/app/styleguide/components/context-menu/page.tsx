/* eslint-disable react/no-unescaped-entities */
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
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

export default function ContextMenuPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Context Menu"
        description="Menu contextual exibido ao clicar com o botão direito do mouse em um elemento. Para ações contextuais de um item específico."
      />

      <Section
        title="Visão geral"
        subtitle="Clique com o botão direito na área abaixo para ver o Context Menu em ação."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Demo básica (clique com botão direito)
            </Typography>
            <ContextMenu>
              <ContextMenuTrigger>
                <div className="ds-card !p-[30px] flex h-36 cursor-context-menu items-center justify-center rounded-[10px] border-2 border-dashed border-border text-sm text-muted-foreground">
                  Clique com o botão direito aqui
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-56">
                <ContextMenuItem>
                  Voltar
                  <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem disabled>
                  Avançar
                  <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                  Recarregar
                  <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuSub>
                  <ContextMenuSubTrigger>Mais ferramentas</ContextMenuSubTrigger>
                  <ContextMenuSubContent className="w-48">
                    <ContextMenuItem>
                      Salvar página como...
                      <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem>Criar atalho...</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem>Ferramentas do desenvolvedor</ContextMenuItem>
                  </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSeparator />
                <ContextMenuCheckboxItem checked>
                  Mostrar favoritos
                </ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem>
                  Mostrar URLs completas
                </ContextMenuCheckboxItem>
                <ContextMenuSeparator />
                <ContextMenuRadioGroup value="pedro">
                  <ContextMenuLabel>Pessoas</ContextMenuLabel>
                  <ContextMenuSeparator />
                  <ContextMenuRadioItem value="pedro">Pedro</ContextMenuRadioItem>
                  <ContextMenuRadioItem value="colm">Colm</ContextMenuRadioItem>
                </ContextMenuRadioGroup>
              </ContextMenuContent>
            </ContextMenu>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import {
  ContextMenu, ContextMenuTrigger, ContextMenuContent,
  ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut,
  ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent,
  ContextMenuCheckboxItem, ContextMenuRadioGroup, ContextMenuRadioItem
} from "@/components/ui/context-menu"`}
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Variações"
        subtitle="O ContextMenu suporta itens simples, submenus, checkboxes e radio groups."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Menu para item de lista
            </Typography>
            <div className="ds-card !p-[30px] w-full max-w-sm">
              {["arquivo-1.pdf", "apresentacao.pptx", "relatorio.docx"].map((file) => (
                <ContextMenu key={file}>
                  <ContextMenuTrigger>
                    <div className="flex cursor-context-menu items-center gap-3 rounded-[6px] px-2 py-2 hover:bg-muted">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-muted-foreground">
                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" />
                      </svg>
                      <Typography as="p" variant="body-sm" className="text-foreground">
                        {file}
                      </Typography>
                    </div>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem>Abrir</ContextMenuItem>
                    <ContextMenuItem>Renomear</ContextMenuItem>
                    <ContextMenuItem>Duplicar</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem className="text-destructive focus:text-destructive">
                      Excluir
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Padrão de implementação"
        subtitle="Snippets para os usos mais comuns do Context Menu."
      >
        <div className="flex flex-col gap-6">
          <CodeBlock
            title="Context Menu básico"
            code={`<ContextMenu>
  <ContextMenuTrigger>
    <div>Clique com o botão direito</div>
  </ContextMenuTrigger>
  <ContextMenuContent className="w-48">
    <ContextMenuItem>Editar</ContextMenuItem>
    <ContextMenuItem>Duplicar</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem className="text-destructive">
      Excluir
    </ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`}
          />

          <CodeBlock
            title="Com submenu"
            code={`<ContextMenuSub>
  <ContextMenuSubTrigger>Compartilhar</ContextMenuSubTrigger>
  <ContextMenuSubContent>
    <ContextMenuItem>Por e-mail</ContextMenuItem>
    <ContextMenuItem>Copiar link</ContextMenuItem>
  </ContextMenuSubContent>
</ContextMenuSub>`}
          />
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="API dos sub-componentes do Context Menu."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Sub-componentes
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                { name: "ContextMenu", note: "Container raiz sem UI própria." },
                { name: "ContextMenuTrigger", note: "Área que responde ao clique direito." },
                { name: "ContextMenuContent", note: "Painel flutuante do menu. Use w-* para controlar largura." },
                { name: "ContextMenuItem", note: "Item clicável. Aceita disabled e onSelect." },
                { name: "ContextMenuCheckboxItem", note: "Item com estado checked. Para toggles visuais." },
                { name: "ContextMenuRadioGroup + RadioItem", note: "Grupo de seleção única." },
                { name: "ContextMenuSub", note: "Container para submenu aninhado." },
                { name: "ContextMenuShortcut", note: "Texto de atalho de teclado à direita." },
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
                O componente usa <code className="font-mono text-foreground">role="menu"</code> e <code className="font-mono text-foreground">role="menuitem"</code> automaticamente.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Navegação por teclado: setas para mover, Enter/Space para selecionar, Escape para fechar, seta direita para abrir submenu.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Ações destrutivas devem sempre ter cor <code className="font-mono text-foreground">text-destructive</code> e estar separadas das demais por um <code className="font-mono text-foreground">ContextMenuSeparator</code>.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
