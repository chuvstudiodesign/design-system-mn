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

export default function SidebarPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Sidebar"
        description="Sistema de sidebar shadcn/ui instalado. O design system MN usa uma implementação customizada no layout do styleguide."
      />

      <Section title="Visão geral" subtitle="O Sidebar shadcn foi instalado. O MN Design System usa uma sidebar customizada que pode ser encontrada em src/app/styleguide/layout.tsx." first>
        <div className="flex flex-col gap-6">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Sidebar customizada</Typography>
            <Typography as="p" variant="body-sm" className="mt-3 text-muted-foreground">
              O design system MN usa uma sidebar completamente customizada em <code className="font-mono text-foreground">src/app/styleguide/layout.tsx</code>. Ela inclui colapso/expansão animada, menu mobile (drawer lateral), e navegação por seções. Você pode ver ela funcionando ao lado desta página.
            </Typography>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Import do componente shadcn</Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup,
  SidebarGroupContent, SidebarGroupLabel, SidebarHeader,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarProvider, SidebarTrigger
} from "@/components/ui/sidebar"`}
            </Typography>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Tokens de sidebar</Typography>
            <Typography as="p" variant="body-sm" className="mt-3 text-muted-foreground">
              O sistema de cores da sidebar no MN Design System usa tokens dedicados: <code className="font-mono text-foreground">--sidebar</code>, <code className="font-mono text-foreground">--sidebar-foreground</code>, <code className="font-mono text-foreground">--sidebar-primary</code>, <code className="font-mono text-foreground">--sidebar-accent</code> (Brand Green #AFF000, apenas para item ativo).
            </Typography>
          </div>
        </div>
      </Section>

      <Section title="Sidebar shadcn — uso básico" subtitle="Como usar o componente Sidebar do shadcn em um novo projeto.">
        <div className="flex flex-col gap-6">
          <CodeBlock title="Estrutura básica com SidebarProvider" code={`import {
  SidebarProvider, Sidebar, SidebarContent,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem
} from "@/components/ui/sidebar"

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/dashboard">Dashboard</a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <main>{children}</main>
    </SidebarProvider>
  )
}`} />

          <CodeBlock title="Sidebar customizada do MN Design System" code={`// A sidebar customizada vive em:
// src/app/styleguide/layout.tsx

// Características:
// - Animação de colapso/expansão (translateX)
// - Menu mobile com overlay
// - Botão de colapso fixo na borda da sidebar
// - Tab de expansão visível ao mover o mouse

// Tokens de cor usados:
// --sidebar: #ECECEC (fundo)
// --sidebar-foreground: #1F1F1F
// --sidebar-accent: #AFF000 (item ativo — Brand Green)
// --sidebar-border: #FFFFFF`} />
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
