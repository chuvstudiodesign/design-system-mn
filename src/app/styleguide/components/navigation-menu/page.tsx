import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
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

const components = [
  { title: "Alert", href: "/styleguide/components/alert", description: "Mensagens de status e avisos contextuais." },
  { title: "Badge", href: "/styleguide/components/badge", description: "Rótulos e indicadores visuais." },
  { title: "Button", href: "/styleguide/components/button", description: "Ações primárias e secundárias." },
  { title: "Card", href: "/styleguide/components/card", description: "Container estruturado de conteúdo." },
];

export default function NavigationMenuPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Navigation Menu"
        description="Componente de navegação horizontal com suporte a menus dropdown e painéis de conteúdo rico."
      />

      <Section title="Visão geral" subtitle="O NavigationMenu é para navegação principal de aplicações web com submenus e painéis de conteúdo." first>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">Demo</Typography>
            <div className="ds-card !p-[30px] overflow-visible">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Componentes</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[min(400px,calc(100vw-40px))] gap-3 p-4 md:grid-cols-2">
                        {components.map((comp) => (
                          <li key={comp.title}>
                            <NavigationMenuLink href={comp.href} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">{comp.title}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{comp.description}</p>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/styleguide" className={navigationMenuTriggerStyle()}>
                      Foundation
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Import</Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"`}
            </Typography>
          </div>
        </div>
      </Section>

      <Section title="Padrão de implementação" subtitle="Estrutura base do Navigation Menu.">
        <div className="flex flex-col gap-6">
          <CodeBlock title="Navigation Menu com submenu" code={`<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Produtos</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 w-[400px] grid-cols-2">
          <li>
            <NavigationMenuLink asChild>
              <a href="/produto-1">
                <div className="font-medium">Produto 1</div>
                <p className="text-sm text-muted-foreground">Descrição breve.</p>
              </a>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/sobre" className={navigationMenuTriggerStyle()}>
        Sobre
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`} />
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
