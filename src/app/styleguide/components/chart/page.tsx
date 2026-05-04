/* eslint-disable react/no-unescaped-entities */
import { Typography } from "@/components/typography";
import {
  FoundationFooter,
  FoundationPageHeader,
  Section,
} from "../../foundation-sections";
import { BarChartDemo, LineChartDemo, AreaChartDemo } from "./chart-demo";

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

const chartColors = [
  { name: "chart-1", color: "#8AD059", token: "--chart-1", note: "Verde — dados primários" },
  { name: "chart-2", color: "#58C7FF", token: "--chart-2", note: "Azul — dados secundários" },
  { name: "chart-3", color: "#FF8B58", token: "--chart-3", note: "Laranja — terceiro dataset" },
  { name: "chart-4", color: "#FB5053", token: "--chart-4", note: "Vermelho — dados críticos" },
  { name: "chart-5", color: "#C059FF", token: "--chart-5", note: "Roxo — quinto dataset" },
  { name: "chart-6", color: "#A3A3A3", token: "--chart-6", note: "Cinza — dados neutros" },
];

export default function ChartPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Chart"
        description="Sistema de gráficos baseado em Recharts com tokens de cor do design system, tooltip e legenda customizados."
      />

      <Section
        title="Visão geral"
        subtitle="O Chart usa ChartContainer para aplicar automaticamente os tokens de cor e o tema do design system."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Bar Chart
            </Typography>
            <div className="ds-card !p-[30px] w-full">
              <BarChartDemo />
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
  ChartLegend, ChartLegendContent, type ChartConfig
} from "@/components/ui/chart"

// Componentes de gráfico (recharts)
import { BarChart, Bar, LineChart, Line, ... } from "recharts"`}
            </Typography>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              ChartConfig
            </Typography>
            <Typography as="p" variant="body-sm" className="mt-3 text-muted-foreground">
              O <code className="font-mono text-foreground">ChartConfig</code> mapeia chaves de dados para labels e cores. Use as cores como <code className="font-mono text-foreground">var(--color-chart-1)</code> até <code className="font-mono text-foreground">var(--color-chart-6)</code> definidas no design system.
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Tipos de gráfico"
        subtitle="Exemplos dos tipos mais comuns construídos com Recharts + ChartContainer."
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Line Chart
            </Typography>
            <div className="ds-card !p-[30px] w-full">
              <LineChartDemo />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Area Chart
            </Typography>
            <div className="ds-card !p-[30px] w-full">
              <AreaChartDemo />
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Paleta de cores para gráficos"
        subtitle="Tokens de cor dedicados para dados. Definidos no globals.css e disponíveis como variáveis CSS."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {chartColors.map((c) => (
            <div key={c.name} className="ds-card !p-[30px] flex items-center gap-4">
              <div
                className="size-10 shrink-0 rounded-[10px] border border-black/10"
                style={{ backgroundColor: c.color }}
              />
              <div>
                <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
                  {c.note}
                </Typography>
                <Typography as="p" variant="code" className="mt-1 text-muted-foreground">
                  {c.token}
                </Typography>
                <Typography as="p" variant="code" className="text-muted-foreground">
                  {c.color}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Padrão de implementação"
        subtitle="Receita para criar qualquer gráfico usando o sistema de charts do projeto."
      >
        <div className="flex flex-col gap-6">
          <CodeBlock
            title="Bar Chart completo"
            code={`"use client"
import { BarChart, Bar, CartesianGrid, XAxis } from "recharts"
import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
  type ChartConfig
} from "@/components/ui/chart"

const data = [
  { mes: "Jan", vendas: 4000 },
  { mes: "Fev", vendas: 5200 },
]

const config = {
  vendas: { label: "Vendas", color: "var(--color-chart-1)" },
} satisfies ChartConfig

export function MeuGrafico() {
  return (
    <ChartContainer config={config} className="h-[300px] w-full">
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="mes" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="vendas" fill="var(--color-vendas)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}`}
          />

          <CodeBlock
            title="Como acessar as cores no config"
            code={`const config = {
  receita: {
    label: "Receita",
    color: "var(--color-chart-1)",  // verde
  },
  despesa: {
    label: "Despesa",
    color: "var(--color-chart-4)",  // vermelho
  },
} satisfies ChartConfig

// No gráfico, acesse via var(--color-[key]):
<Bar dataKey="receita" fill="var(--color-receita)" />`}
          />
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="API do ChartContainer e dos componentes de suporte."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              ChartContainer
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                {
                  name: "config",
                  type: "ChartConfig",
                  note: "Mapa de dados para labels e cores. Injeta variáveis CSS para uso no gráfico.",
                },
                {
                  name: "className",
                  type: "string",
                  note: "Use para definir a altura: className='h-[300px] w-full'.",
                },
                {
                  name: "children",
                  type: "ReactElement (recharts)",
                  note: "Qualquer componente de gráfico do recharts.",
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
                O ChartContainer adiciona <code className="font-mono text-foreground">role="img"</code> automaticamente. Adicione <code className="font-mono text-foreground">aria-label</code> descritivo no container para descrever o gráfico para leitores de tela.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Para dados críticos, forneça também uma tabela de dados como alternativa acessível ao gráfico visual.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Não use cor como único diferenciador — garanta que label e forma também distinguem as séries.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
