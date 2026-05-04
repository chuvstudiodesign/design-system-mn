/* eslint-disable react/no-unescaped-entities */
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

export default function CardPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Card"
        description="Componente estruturado para exibir conteúdo agrupado com header, body, footer e ações opcionais."
      />

      <Section
        title="Visão geral"
        subtitle="O Card shadcn/ui é um container com sub-componentes para header, título, descrição, conteúdo e footer. Cada sub-componente gerencia seu próprio espaçamento interno."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Estrutura completa
            </Typography>
            <div className="max-w-sm">
              <Card>
                <CardHeader>
                  <CardTitle>Título do card</CardTitle>
                  <CardDescription>Descrição ou subtítulo do card.</CardDescription>
                  <CardAction>
                    <Badge variant="secondary">Novo</Badge>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <Typography as="p" variant="body-sm" className="text-muted-foreground">
                    Conteúdo principal do card. Pode incluir texto, gráficos, listas ou qualquer elemento de interface.
                  </Typography>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-3">
                    <Button size="sm" variant="outline">Cancelar</Button>
                    <Button size="sm">Confirmar</Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import {
  Card, CardHeader, CardTitle, CardDescription,
  CardAction, CardContent, CardFooter
} from "@/components/ui/card"`}
            </Typography>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Como funciona o espaçamento
            </Typography>
            <Typography as="p" variant="body-sm" className="mt-3 text-muted-foreground">
              O Card root agora tem <code className="font-mono text-foreground">30px</code> de padding em todos os lados. Quando existe <code className="font-mono text-foreground">CardFooter</code>, ele expande até as bordas com <code className="font-mono text-foreground">px-[30px] py-[30px]</code>, borda superior e fundo <code className="font-mono text-foreground">muted/50</code>.
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Variações"
        subtitle="Exemplos de diferentes composições do Card para casos de uso reais."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Cards de métricas (sem footer)
            </Typography>
            <div className="grid gap-4 xl:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Resumo da conta</CardTitle>
                  <CardDescription>Atualizado há 5 minutos.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Typography as="h2" variant="display" className="text-foreground">
                    R$ 24.800
                  </Typography>
                  <Typography as="p" variant="body-sm" className="mt-2 text-muted-foreground">
                    Saldo disponível
                  </Typography>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Usuários ativos</CardTitle>
                  <CardDescription>Últimas 24 horas.</CardDescription>
                  <CardAction>
                    <Badge variant="default">+12%</Badge>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <Typography as="h2" variant="display" className="text-foreground">
                    1.284
                  </Typography>
                  <Typography as="p" variant="body-sm" className="mt-2 text-muted-foreground">
                    Sessões simultâneas
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Card com footer
            </Typography>
            <div className="grid gap-4 xl:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Plano Pro</CardTitle>
                  <CardDescription>Todos os recursos desbloqueados.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Typography as="p" variant="body-sm" className="text-muted-foreground">
                    Acesse dashboards avançados, exportação de dados e suporte prioritário.
                  </Typography>
                </CardContent>
                <CardFooter>
                  <Button size="sm" className="w-full">Assinar agora</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notificação pendente</CardTitle>
                  <CardDescription>Aguardando aprovação.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Typography as="p" variant="body-sm" className="text-muted-foreground">
                    Uma nova solicitação de acesso está aguardando sua revisão.
                  </Typography>
                </CardContent>
                <CardFooter>
                  <div className="flex w-full gap-2">
                    <Button size="sm" variant="outline" className="flex-1">Rejeitar</Button>
                    <Button size="sm" className="flex-1">Aprovar</Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="ds-card vs Card"
        subtitle="O projeto tem dois padrões de card — cada um para um contexto diferente."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              ds-card (utility class)
            </Typography>
            <div className="ds-card !p-[30px] flex flex-col gap-2">
              <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
                Card de conteúdo simples
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Fundo branco, radius 10px, shadow-card, padding 30px em todos os lados. Para blocos de conteúdo dentro de sections do design system.
              </Typography>
            </div>
            <CodeBlock
              title="ds-card"
              code={`<div className="ds-card !p-[30px]">
  {/* conteúdo */}
</div>`}
            />
          </div>

          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Card (componente shadcn)
            </Typography>
            <Card>
              <CardHeader>
                <CardTitle>Card estruturado</CardTitle>
                <CardDescription>Com sub-componentes header, content e footer.</CardDescription>
              </CardHeader>
              <CardContent>
                <Typography as="p" variant="body-sm" className="text-muted-foreground">
                  Para cards com hierarquia clara: título, conteúdo, ações.
                </Typography>
              </CardContent>
            </Card>
            <CodeBlock
              title="Card shadcn"
              code={`<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descrição</CardDescription>
  </CardHeader>
  <CardContent>
    {/* conteúdo */}
  </CardContent>
</Card>`}
            />
          </div>
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="API dos sub-componentes do Card shadcn."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Sub-componentes
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                {
                  name: "Card",
                  type: `size?: "default" | "sm"`,
                  note: "Container raiz com 30px em todos os lados. O footer usa margens negativas para encostar nas bordas.",
                },
                {
                  name: "CardHeader",
                  type: "div",
                  note: "Cabeçalho alinhado ao padding de 30px do card. Grid automático para título/descrição + ação à direita.",
                },
                {
                  name: "CardTitle",
                  type: "div",
                  note: "Título com text-base font-medium.",
                },
                {
                  name: "CardDescription",
                  type: "div",
                  note: "Subtítulo com text-sm text-muted-foreground.",
                },
                {
                  name: "CardAction",
                  type: "div",
                  note: "Slot de ação no canto superior direito do header. Posicionado via grid automático.",
                },
                {
                  name: "CardContent",
                  type: "div",
                  note: "Área principal usando o mesmo respiro lateral de 30px.",
                },
                {
                  name: "CardFooter",
                  type: "div",
                  note: "Rodapé com 30px de padding, borda superior e fundo bg-muted/50.",
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
                O Card é um container visual sem role semântico específico. Para cards clicáveis, adicione <code className="font-mono text-foreground">role="article"</code> ou envolva com um elemento interativo.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Para listas de cards, use <code className="font-mono text-foreground">ul + li</code> como estrutura externa para que leitores de tela possam navegar pelos itens.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
