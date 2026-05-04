import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
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

export default function MenubarPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Menubar"
        description="Barra de menus horizontal persistente no estilo aplicação desktop, com suporte a submenus e estados de seleção."
      />

      <Section title="Visão geral" subtitle="O Menubar reproduz o padrão de menu de aplicações desktop (File, Edit, View...) em interfaces web." first>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">Demo</Typography>
            <div className="ds-card !p-[30px]">
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>Arquivo</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>Novo<MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
                    <MenubarItem>Abrir<MenubarShortcut>⌘O</MenubarShortcut></MenubarItem>
                    <MenubarSeparator />
                    <MenubarSub>
                      <MenubarSubTrigger>Compartilhar</MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem>Por e-mail</MenubarItem>
                        <MenubarItem>Copiar link</MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                    <MenubarItem>Sair<MenubarShortcut>⌘Q</MenubarShortcut></MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>Editar</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem disabled>Desfazer<MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
                    <MenubarItem>Refazer<MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Cortar<MenubarShortcut>⌘X</MenubarShortcut></MenubarItem>
                    <MenubarItem>Copiar<MenubarShortcut>⌘C</MenubarShortcut></MenubarItem>
                    <MenubarItem>Colar<MenubarShortcut>⌘V</MenubarShortcut></MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>Visualizar</MenubarTrigger>
                  <MenubarContent>
                    <MenubarCheckboxItem checked>Barra de ferramentas</MenubarCheckboxItem>
                    <MenubarCheckboxItem>Painel lateral</MenubarCheckboxItem>
                    <MenubarSeparator />
                    <MenubarRadioGroup value="compact">
                      <MenubarRadioItem value="compact">Compacto</MenubarRadioItem>
                      <MenubarRadioItem value="normal">Normal</MenubarRadioItem>
                      <MenubarRadioItem value="large">Grande</MenubarRadioItem>
                    </MenubarRadioGroup>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Import</Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import {
  Menubar, MenubarMenu, MenubarTrigger, MenubarContent,
  MenubarItem, MenubarSeparator, MenubarShortcut, MenubarSub,
  MenubarSubTrigger, MenubarSubContent, MenubarCheckboxItem,
  MenubarRadioGroup, MenubarRadioItem
} from "@/components/ui/menubar"`}
            </Typography>
          </div>
        </div>
      </Section>

      <Section title="Padrão de implementação" subtitle="Estrutura base do Menubar.">
        <div className="flex flex-col gap-6">
          <CodeBlock title="Menubar básico" code={`<Menubar>
  <MenubarMenu>
    <MenubarTrigger>Arquivo</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Novo<MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Sair<MenubarShortcut>⌘Q</MenubarShortcut></MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Editar</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Copiar<MenubarShortcut>⌘C</MenubarShortcut></MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`} />
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
