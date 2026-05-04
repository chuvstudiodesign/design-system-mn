/* eslint-disable react/no-unescaped-entities */
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

export default function DropdownMenuPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Dropdown Menu"
        description="Menu flutuante que aparece ao clicar em um trigger. Para navegação, ações e configurações contextuais."
      />

      <Section
        title="Visão geral"
        subtitle="O DropdownMenu exibe uma lista de opções ao clicar no trigger. É diferente do Context Menu pois requer clique explícito."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Demo básica
            </Typography>
            <div className="ds-card !p-[30px] flex flex-wrap items-start gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="outline" />}>Opções</DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      Perfil
                      <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Faturamento
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Configurações
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Time</DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Convidar usuários</DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>Por e-mail</DropdownMenuItem>
                        <DropdownMenuItem>Por link</DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive focus:text-destructive">
                    Sair
                    <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="rounded-full" />}>
                    <Avatar size="default">
                      <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                      <AvatarFallback>MN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Lucas Z.</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Perfil</DropdownMenuItem>
                  <DropdownMenuItem>Configurações</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive focus:text-destructive">Sair</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent,
  DropdownMenuSubTrigger, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"`}
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Com checkboxes e radio"
        subtitle="O DropdownMenu também suporta items de seleção com estado."
      >
        <div className="flex flex-col gap-6">
          <div className="ds-card !p-[30px] flex flex-wrap gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}>Visualização</DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>Exibir</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>Barra de status</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Painel lateral</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Console</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}>Tema</DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuLabel>Aparência</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value="system">
                  <DropdownMenuRadioItem value="light">Claro</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">Escuro</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">Sistema</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Section>

      <Section
        title="Padrão de implementação"
        subtitle="Snippets para os usos mais comuns do Dropdown Menu."
      >
        <div className="flex flex-col gap-6">
          <CodeBlock
            title="Menu de usuário"
            code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      <Avatar>
        <AvatarImage src="/avatar.jpg" alt="User" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-48">
    <DropdownMenuLabel>Ana Beatriz</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Perfil</DropdownMenuItem>
    <DropdownMenuItem>Configurações</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive focus:text-destructive">
      Sair
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
          />

          <CodeBlock
            title="Menu de ações por linha"
            code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button size="icon-sm" variant="ghost" aria-label="Ações">
      <MoreHorizontalIcon />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem>Editar</DropdownMenuItem>
    <DropdownMenuItem>Duplicar</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive focus:text-destructive">
      Excluir
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
          />
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="API dos sub-componentes do DropdownMenu."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Sub-componentes
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                { name: "DropdownMenuContent", type: "align, side, sideOffset, className", note: "Painel flutuante. Use align='end' para alinhar à direita do trigger." },
                { name: "DropdownMenuItem", type: "disabled, onSelect, className", note: "Item clicável. Use className='text-destructive' para ações perigosas." },
                { name: "DropdownMenuCheckboxItem", type: "checked, onCheckedChange", note: "Item com estado checked." },
                { name: "DropdownMenuRadioGroup", type: "value, onValueChange", note: "Container para radio items de seleção única." },
                { name: "DropdownMenuSub", type: "—", note: "Container para submenu aninhado." },
              ].map((item) => (
                <div key={item.name} className="border-b border-white pb-3 last:border-0 last:pb-0">
                  <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
                    {item.name}
                  </Typography>
                  <Typography as="p" variant="code" className="mt-1 text-foreground">
                    {item.type}
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
                O menu usa <code className="font-mono text-foreground">role="menu"</code> com navegação por teclado completa (setas, Enter, Escape).
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                O trigger recebe <code className="font-mono text-foreground">aria-haspopup="menu"</code> e <code className="font-mono text-foreground">aria-expanded</code> automaticamente.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
