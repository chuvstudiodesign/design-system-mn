import { Typography } from "@/components/typography";
import {
  FoundationFooter,
  FoundationPageHeader,
  Section,
} from "../../foundation-sections";
import {
  DatePickerBasicDemo,
  DatePickerDisabledPastDemo,
} from "./date-picker-demo";

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

export default function DatePickerPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Date Picker"
        description="Componente customizado para seleção de data via calendário em popover. Construído sobre Calendar + Popover + Button."
      />

      <Section
        title="Visão geral"
        subtitle="O DatePicker abre um Calendar em um Popover ao clicar no campo. Exibe a data selecionada formatada em pt-BR."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Demo básica
            </Typography>
            <div className="ds-card !p-[30px]">
              <DatePickerBasicDemo />
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { DatePicker } from "@/components/date-picker"`}
            </Typography>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Composição
            </Typography>
            <Typography as="p" variant="body-sm" className="mt-3 text-muted-foreground">
              O DatePicker é um componente customizado em <code className="font-mono text-foreground">/components/date-picker.tsx</code> que compõe <code className="font-mono text-foreground">Calendar</code>, <code className="font-mono text-foreground">Popover</code> e <code className="font-mono text-foreground">Button</code>. O formato de exibição usa <code className="font-mono text-foreground">date-fns</code> com locale <code className="font-mono text-foreground">pt-BR</code>.
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Variações"
        subtitle="Exemplos de configurações comuns do DatePicker."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Datas passadas desabilitadas
            </Typography>
            <div className="ds-card !p-[30px]">
              <DatePickerDisabledPastDemo />
            </div>
            <Typography as="p" variant="body-sm" className="text-muted-foreground">
              Útil para agendamentos e reservas.
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Padrão de implementação"
        subtitle="Como usar o DatePicker em formulários e contextos controlados."
      >
        <div className="flex flex-col gap-6">
          <CodeBlock
            title="Uso básico"
            code={`"use client"
import { useState } from "react"
import { DatePicker } from "@/components/date-picker"

export function FormComData() {
  const [data, setData] = useState<Date | undefined>()

  return (
    <DatePicker
      date={data}
      onDateChange={setData}
      placeholder="Selecionar data de vencimento"
    />
  )
}`}
          />

          <CodeBlock
            title="Com datas passadas desabilitadas"
            code={`<DatePicker
  date={data}
  onDateChange={setData}
  disabledDates={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
/>`}
          />

          <CodeBlock
            title="Com largura customizada"
            code={`<DatePicker
  date={data}
  onDateChange={setData}
  className="w-full"
/>`}
          />
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="API do componente DatePicker customizado."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Props
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                {
                  name: "date",
                  type: "Date | undefined",
                  note: "Data atualmente selecionada (estado controlado).",
                },
                {
                  name: "onDateChange",
                  type: "(date: Date | undefined) => void",
                  note: "Callback chamado ao selecionar uma data.",
                },
                {
                  name: "placeholder",
                  type: "string",
                  note: "Texto exibido quando nenhuma data está selecionada.",
                },
                {
                  name: "disabled",
                  type: "boolean",
                  note: "Desabilita o campo inteiro.",
                },
                {
                  name: "disabledDates",
                  type: "(date: Date) => boolean",
                  note: "Função que recebe uma data e retorna true para desabilitá-la.",
                },
                {
                  name: "className",
                  type: "string",
                  note: "Classes do botão trigger. Use w-full para preencher o container.",
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
                O trigger é um <code className="font-mono text-foreground">Button</code> com <code className="font-mono text-foreground">aria-expanded</code> gerenciado pelo Popover.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                O Calendar dentro do Popover herda navegação completa por teclado do react-day-picker.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Para campos de formulário, associe com um <code className="font-mono text-foreground">label</code> externo e use o <code className="font-mono text-foreground">id</code> do trigger para associação correta.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
