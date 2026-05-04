import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

export default function TabsPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Tabs"
        description="Alternância entre painéis de conteúdo na mesma área. Para organizar categorias, configurações e seções relacionadas."
      />

      <Section title="Visão geral" subtitle="O Tabs organiza conteúdo em grupos acessíveis por aba, sem sair da página." first>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">Demo</Typography>
            <div className="ds-card !p-[30px] w-full max-w-lg">
              <Tabs defaultValue="conta">
                <TabsList>
                  <TabsTrigger value="conta">Conta</TabsTrigger>
                  <TabsTrigger value="senha">Senha</TabsTrigger>
                  <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
                </TabsList>
                <TabsContent value="conta" className="mt-4">
                  <div className="flex flex-col gap-2">
                    <Typography as="p" variant="body" className="font-semibold text-foreground">Configurações da conta</Typography>
                    <Typography as="p" variant="body-sm" className="text-muted-foreground">Atualize suas informações de perfil e e-mail.</Typography>
                  </div>
                </TabsContent>
                <TabsContent value="senha" className="mt-4">
                  <div className="flex flex-col gap-2">
                    <Typography as="p" variant="body" className="font-semibold text-foreground">Alterar senha</Typography>
                    <Typography as="p" variant="body-sm" className="text-muted-foreground">Defina uma nova senha segura para sua conta.</Typography>
                  </div>
                </TabsContent>
                <TabsContent value="notificacoes" className="mt-4">
                  <div className="flex flex-col gap-2">
                    <Typography as="p" variant="body" className="font-semibold text-foreground">Preferências de notificação</Typography>
                    <Typography as="p" variant="body-sm" className="text-muted-foreground">Escolha quando e como receber notificações.</Typography>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Import</Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"`}
            </Typography>
          </div>
        </div>
      </Section>

      <Section title="Padrão de implementação" subtitle="Snippets para uso do Tabs.">
        <div className="flex flex-col gap-6">
          <CodeBlock title="Tabs básico" code={`<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Aba 1</TabsTrigger>
    <TabsTrigger value="tab2">Aba 2</TabsTrigger>
    <TabsTrigger value="tab3" disabled>Aba 3</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    Conteúdo da Aba 1
  </TabsContent>
  <TabsContent value="tab2">
    Conteúdo da Aba 2
  </TabsContent>
</Tabs>`} />
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
