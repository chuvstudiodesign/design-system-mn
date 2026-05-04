import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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

export default function SwitchPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Switch"
        description="Toggle de liga/desliga. Use para configurações binárias que têm efeito imediato, sem necessidade de confirmar."
      />

      <Section title="Visão geral" subtitle="O Switch é semanticamente diferente do Checkbox — indica ativação imediata, não seleção em formulário." first>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">Estados</Typography>
            <div className="ds-card !p-[30px] flex flex-col gap-4 max-w-sm">
              <div className="flex items-center justify-between">
                <Label htmlFor="sw-default">Notificações por e-mail</Label>
                <Switch id="sw-default" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sw-off">Push notifications</Label>
                <Switch id="sw-off" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sw-dis" className="opacity-50">Modo beta (indisponível)</Label>
                <Switch id="sw-dis" disabled />
              </div>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Import</Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"`}
            </Typography>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Switch vs Checkbox</Typography>
            <Typography as="p" variant="body-sm" className="mt-3 text-muted-foreground">
              Use <strong className="text-foreground">Switch</strong> para configurações que têm efeito imediato (ex: ativar notificações). Use <strong className="text-foreground">Checkbox</strong> para seleções em formulários que são confirmadas ao enviar.
            </Typography>
          </div>
        </div>
      </Section>

      <Section title="Padrão de implementação" subtitle="Snippets para uso do Switch.">
        <div className="flex flex-col gap-6">
          <CodeBlock title="Switch controlado" code={`"use client"
import { useState } from "react"

export function NotificacoesSwitch() {
  const [ativo, setAtivo] = useState(false)

  return (
    <div className="flex items-center gap-3">
      <Switch
        id="notif"
        checked={ativo}
        onCheckedChange={setAtivo}
      />
      <Label htmlFor="notif">
        Notificações {ativo ? "ativadas" : "desativadas"}
      </Label>
    </div>
  )
}`} />
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
