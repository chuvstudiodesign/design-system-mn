import { Typography } from "@/components/typography";
import {
  FoundationFooter,
  FoundationPageHeader,
  Section,
} from "../../foundation-sections";
import {
  CalendarSingleDemo,
  CalendarRangeDemo,
  CalendarMultipleDemo,
} from "./calendar-demo";

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

export default function CalendarPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Calendar"
        description="Componente de seleção de datas baseado no react-day-picker. Suporta seleção única, múltipla e por intervalo."
      />

      <Section
        title="Visão geral"
        subtitle="O Calendar exibe um calendário interativo para seleção de datas. É a base do componente Date Picker."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Seleção única
            </Typography>
            <div className="ds-card !p-[30px] w-full max-w-xs">
              <CalendarSingleDemo />
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { Calendar } from "@/components/ui/calendar"`}
            </Typography>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Dependência
            </Typography>
            <Typography as="p" variant="body-sm" className="mt-3 text-muted-foreground">
              O Calendar usa <code className="font-mono text-foreground">react-day-picker</code> e <code className="font-mono text-foreground">date-fns</code> como dependências. Ambas foram instaladas automaticamente via shadcn CLI.
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Modos de seleção"
        subtitle="O Calendar suporta três modos de seleção controlados pela prop mode."
      >
        <div className="grid gap-6 xl:grid-cols-3">
          <div className="ds-card !p-[30px] flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Single
            </Typography>
            <Typography as="p" variant="body-sm" className="text-muted-foreground">
              Seleciona uma data por vez.
            </Typography>
            <CalendarSingleDemo />
          </div>

          <div className="ds-card !p-[30px] flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Range
            </Typography>
            <Typography as="p" variant="body-sm" className="text-muted-foreground">
              Seleciona um intervalo de datas.
            </Typography>
            <CalendarRangeDemo />
          </div>

          <div className="ds-card !p-[30px] flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Multiple
            </Typography>
            <Typography as="p" variant="body-sm" className="text-muted-foreground">
              Seleciona múltiplas datas não contínuas.
            </Typography>
            <CalendarMultipleDemo />
          </div>
        </div>
      </Section>

      <Section
        title="Padrão de implementação"
        subtitle="Snippets controlados para cada modo de seleção."
      >
        <div className="flex flex-col gap-6">
          <CodeBlock
            title="Seleção única (controlled)"
            code={`"use client"
import * as React from "react"
import { Calendar } from "@/components/ui/calendar"

export function MeuCalendario() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
    />
  )
}`}
          />

          <CodeBlock
            title="Intervalo de datas"
            code={`"use client"
import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import type { DateRange } from "react-day-picker"

export function CalendarioRange() {
  const [range, setRange] = React.useState<DateRange>({ from: undefined })

  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={(r) => setRange(r ?? { from: undefined })}
    />
  )
}`}
          />

          <CodeBlock
            title="Com datas desabilitadas"
            code={`<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  disabled={(date) => date < new Date()}
/>`}
          />

          <CodeBlock
            title="Com layout de dropdown (mês/ano)"
            code={`<Calendar
  mode="single"
  captionLayout="dropdown"
  selected={date}
  onSelect={setDate}
/>`}
          />
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="Principais props disponíveis no componente Calendar."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Props principais
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                {
                  name: "mode",
                  type: `"single" | "multiple" | "range"`,
                  note: "Define o comportamento de seleção de datas.",
                },
                {
                  name: "selected",
                  type: "Date | Date[] | DateRange",
                  note: "Valor controlado. Tipo depende do mode.",
                },
                {
                  name: "onSelect",
                  type: "(date) => void",
                  note: "Callback chamado ao selecionar uma data.",
                },
                {
                  name: "disabled",
                  type: "Matcher | Matcher[]",
                  note: "Desabilita datas. Aceita função, data, range, entre outros.",
                },
                {
                  name: "captionLayout",
                  type: `"label" | "dropdown"`,
                  note: "Define se o cabeçalho mostra label simples ou dropdowns de mês/ano.",
                },
                {
                  name: "showOutsideDays",
                  type: "boolean",
                  note: "Exibe os dias do mês anterior/próximo na grade. Padrão: true.",
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
                O Calendar herda a acessibilidade do react-day-picker, com navegação completa por teclado: setas para mover entre dias, Enter para selecionar, PageUp/PageDown para mudar de mês.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Para datas com restrições (disabled), certifique-se de que há uma mensagem clara explicando por que a data não está disponível.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Use em conjunto com o componente <code className="font-mono text-foreground">Popover</code> para criar um Date Picker acessível (ver componente Date Picker).
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
