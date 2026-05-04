import { Kbd } from "@/components/kbd";
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

const shortcuts = [
  { keys: ["⌘", "K"], description: "Abrir paleta de comandos" },
  { keys: ["⌘", "S"], description: "Salvar" },
  { keys: ["⌘", "Z"], description: "Desfazer" },
  { keys: ["Ctrl", "Shift", "P"], description: "Paleta de comandos (Windows)" },
  { keys: ["Esc"], description: "Fechar modal / Cancelar" },
  { keys: ["Tab"], description: "Avançar foco" },
  { keys: ["↑", "↓"], description: "Navegar na lista" },
  { keys: ["Enter"], description: "Confirmar seleção" },
];

export default function KbdPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Kbd"
        description="Componente para exibir atalhos de teclado e teclas de forma visualmente clara e semântica."
      />

      <Section
        title="Visão geral"
        subtitle="O Kbd renderiza como elemento kbd semântico com estilo de tecla física. Ideal para documentação e atalhos de teclado."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Teclas individuais
            </Typography>
            <div className="ds-card !p-[30px] flex flex-wrap items-center gap-3">
              {["⌘", "Ctrl", "Alt", "Shift", "Tab", "Esc", "Enter", "Space", "↑", "↓", "←", "→"].map((key) => (
                <Kbd key={key}>{key}</Kbd>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Atalhos compostos
            </Typography>
            <div className="ds-card !p-[30px] flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1">
                <Kbd>⌘</Kbd><span className="text-muted-foreground">+</span><Kbd>K</Kbd>
              </div>
              <div className="flex items-center gap-1">
                <Kbd>Ctrl</Kbd><span className="text-muted-foreground">+</span><Kbd>S</Kbd>
              </div>
              <div className="flex items-center gap-1">
                <Kbd>Ctrl</Kbd><span className="text-muted-foreground">+</span><Kbd>Shift</Kbd><span className="text-muted-foreground">+</span><Kbd>P</Kbd>
              </div>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { Kbd } from "@/components/kbd"`}
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Tamanhos"
        subtitle="O Kbd tem dois tamanhos: default e sm."
      >
        <div className="flex flex-col gap-6">
          <div className="ds-card !p-[30px] flex flex-wrap items-center gap-6">
            <div className="flex flex-col items-start gap-2">
              <Kbd size="default">⌘K</Kbd>
              <Typography as="p" variant="caption" className="normal-case tracking-normal text-muted-foreground">default</Typography>
            </div>
            <div className="flex flex-col items-start gap-2">
              <Kbd size="sm">⌘K</Kbd>
              <Typography as="p" variant="caption" className="normal-case tracking-normal text-muted-foreground">sm</Typography>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Tabela de atalhos"
        subtitle="Padrão para documentar atalhos de teclado no design system."
      >
        <div className="ds-card !p-[30px] overflow-hidden">
          {shortcuts.map((shortcut, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 border-b border-border px-5 py-3 last:border-0"
            >
              <Typography as="p" variant="body-sm" className="text-foreground">
                {shortcut.description}
              </Typography>
              <div className="flex items-center gap-1 shrink-0">
                {shortcut.keys.map((key, j) => (
                  <span key={j} className="flex items-center gap-1">
                    <Kbd size="sm">{key}</Kbd>
                    {j < shortcut.keys.length - 1 && (
                      <span className="text-xs text-muted-foreground">+</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Padrão de implementação"
        subtitle="Snippets para os usos mais comuns do Kbd."
      >
        <div className="flex flex-col gap-6">
          <CodeBlock
            title="Tecla única"
            code={`import { Kbd } from "@/components/kbd"

<Kbd>⌘</Kbd>
<Kbd>Esc</Kbd>
<Kbd>Enter</Kbd>`}
          />

          <CodeBlock
            title="Atalho composto"
            code={`<div className="flex items-center gap-1">
  <Kbd>⌘</Kbd>
  <span className="text-muted-foreground">+</span>
  <Kbd>K</Kbd>
</div>`}
          />

          <CodeBlock
            title="Inline em texto"
            code={`<p className="text-sm">
  Use <Kbd>Tab</Kbd> para avançar e{" "}
  <Kbd>Shift</Kbd> + <Kbd>Tab</Kbd> para voltar.
</p>`}
          />
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="API do componente Kbd."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Props
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                { name: "size", type: `"default" | "sm"`, note: "Tamanho do elemento. Default: 24px, sm: 20px de altura." },
                { name: "children", type: "ReactNode", note: "Conteúdo da tecla (texto ou símbolo)." },
                { name: "className", type: "string", note: "Classes adicionais." },
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
              Semântica
            </Typography>
            <div className="flex flex-col gap-3">
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                O Kbd renderiza como <code className="font-mono text-foreground">&lt;kbd&gt;</code>, que é o elemento HTML semântico correto para representar input de teclado.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Leitores de tela anunciam o conteúdo normalmente. Se precisar de um anúncio especial, use <code className="font-mono text-foreground">aria-label</code>.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
