import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
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

export default function InputOTPPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Input OTP"
        description="Componente para entrada de códigos de verificação de comprimento fixo (OTP, PIN, códigos de confirmação)."
      />

      <Section
        title="Visão geral"
        subtitle="O InputOTP divide a entrada em slots individuais, guiando o usuário durante a digitação do código."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              OTP de 6 dígitos
            </Typography>
            <div className="ds-card !p-[30px]">
              <InputOTP maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import {
  InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator
} from "@/components/ui/input-otp"`}
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Variações"
        subtitle="O InputOTP suporta diferentes comprimentos e padrões de agrupamento."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              PIN de 4 dígitos
            </Typography>
            <div className="ds-card !p-[30px]">
              <InputOTP maxLength={4}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Código de 8 caracteres (4+4)
            </Typography>
            <div className="ds-card !p-[30px]">
              <InputOTP maxLength={8}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                  <InputOTPSlot index={6} />
                  <InputOTPSlot index={7} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Padrão de implementação"
        subtitle="Como usar o InputOTP em fluxos de verificação."
      >
        <div className="flex flex-col gap-6">
          <CodeBlock
            title="OTP controlado"
            code={`"use client"
import { useState } from "react"
import {
  InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator
} from "@/components/ui/input-otp"

export function VerificacaoOTP() {
  const [value, setValue] = useState("")

  return (
    <div className="flex flex-col gap-4">
      <InputOTP maxLength={6} value={value} onChange={setValue}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-sm text-muted-foreground">
        Código digitado: {value || "—"}
      </p>
    </div>
  )
}`}
          />

          <CodeBlock
            title="Com validação ao completar"
            code={`<InputOTP
  maxLength={6}
  value={value}
  onChange={(val) => {
    setValue(val)
    if (val.length === 6) {
      verificarCodigo(val)
    }
  }}
>
  ...
</InputOTP>`}
          />

          <CodeBlock
            title="Somente números (pattern)"
            code={`import { REGEXP_ONLY_DIGITS } from "input-otp"

<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
  ...
</InputOTP>`}
          />
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="API dos sub-componentes do InputOTP."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Props principais
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                { name: "maxLength", type: "number", note: "Número total de caracteres do código. Obrigatório." },
                { name: "value", type: "string", note: "Valor controlado do código digitado." },
                { name: "onChange", type: "(value: string) => void", note: "Callback chamado ao digitar." },
                { name: "pattern", type: "string | RegExp", note: "Validação do tipo de caractere aceito (ex: REGEXP_ONLY_DIGITS)." },
                { name: "disabled", type: "boolean", note: "Desabilita o campo." },
                { name: "InputOTPSlot index", type: "number", note: "Posição do slot (0-indexed). Obrigatório." },
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
                O InputOTP usa <code className="font-mono text-foreground">aria-label</code> e gerencia foco automaticamente entre slots.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Paste de código completo (⌘V / Ctrl+V) funciona diretamente no primeiro slot.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Sempre informe ao usuário onde o código foi enviado e quanto tempo é válido.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
