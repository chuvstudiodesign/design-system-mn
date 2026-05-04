import { Typography } from "@/components/typography";
import {
  FoundationFooter,
  FoundationPageHeader,
  Section,
} from "../../foundation-sections";
import { SonnerDemoButtons } from "./sonner-demo";

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

export default function SonnerPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Sonner"
        description="Sistema de notificações toast baseado em Sonner. Substitui o Toast legado do shadcn com uma API mais simples e recursos avançados."
      />

      <Section title="Visão geral" subtitle="Clique nos botões abaixo para ver os diferentes tipos de toast. O Toaster já está configurado no root layout." first>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">Demo — clique para disparar toasts</Typography>
            <div className="ds-card !p-[30px]">
              <SonnerDemoButtons />
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Setup no layout</Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`// src/app/layout.tsx
import { Toaster } from "@/components/ui/sonner"

<body>
  {children}
  <Toaster />
</body>`}
            </Typography>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Import para uso</Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { toast } from "sonner"`}
            </Typography>
          </div>
        </div>
      </Section>

      <Section title="Tipos de toast" subtitle="O Sonner tem funções específicas para cada tipo de notificação.">
        <div className="grid gap-4 xl:grid-cols-2">
          {[
            { fn: "toast(msg)", note: "Toast padrão neutro." },
            { fn: "toast.success(msg)", note: "Operação concluída com sucesso." },
            { fn: "toast.error(msg)", note: "Erro ou falha na operação." },
            { fn: "toast.warning(msg)", note: "Aviso não-crítico." },
            { fn: "toast.info(msg)", note: "Informação contextual." },
            { fn: "toast.loading(msg)", note: "Indicador de carregamento assíncrono." },
            { fn: "toast.promise(promise, opts)", note: "Toast que reage ao estado de uma Promise." },
          ].map((item) => (
            <div key={item.fn} className="ds-card !p-[30px] flex flex-col gap-1">
              <Typography as="p" variant="code" className="text-foreground">{item.fn}</Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">{item.note}</Typography>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Padrão de implementação" subtitle="Snippets para os usos mais comuns do Sonner.">
        <div className="flex flex-col gap-6">
          <CodeBlock title="Toast simples" code={`import { toast } from "sonner"

// Em qualquer componente cliente:
toast("Mensagem salva!")
toast.success("Usuário criado com sucesso!")
toast.error("Não foi possível excluir o registro.")`} />

          <CodeBlock title="Toast com ação" code={`toast("Arquivo excluído", {
  description: "O arquivo foi movido para a lixeira.",
  action: {
    label: "Desfazer",
    onClick: () => restaurarArquivo(),
  },
})`} />

          <CodeBlock title="Toast de Promise" code={`toast.promise(salvarDados(dados), {
  loading: "Salvando...",
  success: (resultado) => \`\${resultado.nome} salvo!\`,
  error: (err) => \`Erro: \${err.message}\`,
})`} />

          <CodeBlock title="Toast customizado" code={`toast("Notificação", {
  duration: 5000,    // duração em ms (padrão: 4000)
  position: "top-right",
  dismissible: true,
  icon: <BellIcon className="size-4" />,
})`} />
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
