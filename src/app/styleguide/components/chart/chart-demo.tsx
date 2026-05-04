"use client";

import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

const monthlyData = [
  { month: "Jan", receita: 18000, despesa: 12000 },
  { month: "Fev", receita: 22000, despesa: 13500 },
  { month: "Mar", receita: 19500, despesa: 11000 },
  { month: "Abr", receita: 25000, despesa: 14000 },
  { month: "Mai", receita: 28000, despesa: 15500 },
  { month: "Jun", receita: 24000, despesa: 13000 },
];

const barConfig = {
  receita: { label: "Receita", color: "var(--color-chart-1)" },
  despesa: { label: "Despesa", color: "var(--color-chart-4)" },
} satisfies ChartConfig;

const lineConfig = {
  receita: { label: "Receita", color: "var(--color-chart-1)" },
} satisfies ChartConfig;

const areaConfig = {
  receita: { label: "Receita", color: "var(--color-chart-1)" },
  despesa: { label: "Despesa", color: "var(--color-chart-2)" },
} satisfies ChartConfig;

export function BarChartDemo() {
  return (
    <ChartContainer config={barConfig} className="h-[200px] w-full">
      <BarChart data={monthlyData}>
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="receita" fill="var(--color-receita)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="despesa" fill="var(--color-despesa)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}

export function LineChartDemo() {
  return (
    <ChartContainer config={lineConfig} className="h-[200px] w-full">
      <LineChart data={monthlyData}>
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
        <YAxis hide />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          dataKey="receita"
          type="monotone"
          stroke="var(--color-receita)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}

export function AreaChartDemo() {
  return (
    <ChartContainer config={areaConfig} className="h-[200px] w-full">
      <AreaChart data={monthlyData}>
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
        <YAxis hide />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Area
          dataKey="receita"
          type="monotone"
          fill="var(--color-receita)"
          fillOpacity={0.15}
          stroke="var(--color-receita)"
          strokeWidth={2}
        />
        <Area
          dataKey="despesa"
          type="monotone"
          fill="var(--color-despesa)"
          fillOpacity={0.15}
          stroke="var(--color-despesa)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  );
}
