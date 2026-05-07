import { TypingAnimation } from "@/components/magicui/typing-animation";
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

const props = [
  {
    name: "children",
    type: "string",
    defaultValue: "-",
    description: "Texto exibido pela animação. Use frases curtas.",
  },
  {
    name: "text",
    type: "string",
    defaultValue: "-",
    description: "Alternativa a children quando o texto precisa vir como prop.",
  },
  {
    name: "as",
    type: '"span" | "p" | "h1" | "h2" | "h3" | "div"',
    defaultValue: '"span"',
    description: "Elemento HTML usado no wrapper do texto.",
  },
  {
    name: "speed",
    type: "number",
    defaultValue: "40",
    description: "Tempo em milissegundos entre cada caractere.",
  },
  {
    name: "duration",
    type: "number",
    defaultValue: "-",
    description: "Duração total em milissegundos. Quando informado, tem prioridade sobre speed.",
  },
  {
    name: "delay",
    type: "number",
    defaultValue: "0",
    description: "Espera inicial em milissegundos antes da digitação começar.",
  },
  {
    name: "startOnView",
    type: "boolean",
    defaultValue: "false",
    description: "Inicia a animação quando o componente entra na viewport.",
  },
  {
    name: "className",
    type: "string",
    defaultValue: "-",
    description: "Classes Tailwind para tipografia, cor e espaçamento.",
  },
];

export default function TypingAnimationPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Typing Animation"
        description="Animação de digitação para frases curtas, chamadas editoriais e destaques de produto no ecossistema MASI."
      />

      <Section
        title="Visão geral"
        subtitle="Componente customizado criado porque o Magic UI MCP não está disponível neste ambiente. A API segue o padrão Magic UI do projeto e usa tokens de tipografia e cor."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="caption" className="mb-4 font-bold text-primary">
              Preview principal
            </Typography>
            <TypingAnimation
              as="h2"
              duration={2200}
              className="max-w-3xl text-[32px] font-bold leading-[1.12] text-foreground"
            >
              Estratégia, inovação e negócios em movimento.
            </TypingAnimation>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="ds-card !p-[30px]">
              <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
                Import
              </Typography>
              <Typography as="p" variant="code" className="mt-3 text-foreground">
                {`import { TypingAnimation } from "@/components/magicui/typing-animation"`}
              </Typography>
            </div>
            <div className="ds-card !p-[30px]">
              <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
                Arquivo
              </Typography>
              <Typography as="p" variant="code" className="mt-3 text-foreground">
                src/components/magicui/typing-animation.tsx
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Variações"
        subtitle="Tamanhos, ritmos e frases alinhadas a negócios, inovação e tecnologia."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="caption" className="mb-4 font-bold text-primary">
              Display
            </Typography>
            <TypingAnimation
              as="h2"
              duration={1800}
              className="text-[32px] font-bold leading-[1.12] text-foreground"
            >
              Construindo o futuro dos negócios.
            </TypingAnimation>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="caption" className="mb-4 font-bold text-primary">
              Headline compacta
            </Typography>
            <TypingAnimation
              as="h3"
              speed={34}
              delay={250}
              className="text-[24px] font-bold leading-[1.2] text-foreground"
            >
              Tecnologia, estratégia e execução.
            </TypingAnimation>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="caption" className="mb-4 font-bold text-primary">
              Texto de apoio
            </Typography>
            <TypingAnimation
              as="p"
              speed={28}
              className="text-[18px] leading-[1.6] text-muted-foreground"
            >
              O próximo movimento começa com clareza.
            </TypingAnimation>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="caption" className="mb-4 font-bold text-primary">
              Inicia ao aparecer
            </Typography>
            <TypingAnimation
              as="p"
              startOnView
              duration={1600}
              className="text-[18px] font-semibold leading-[1.5] text-foreground"
            >
              Empreender é decidir com visão.
            </TypingAnimation>
          </div>
        </div>
      </Section>

      <Section
        title="Padrão de implementação"
        subtitle="Snippets práticos para usar e customizar o componente."
      >
        <div className="flex flex-col gap-6">
          <CodeBlock
            title="Uso básico"
            code={`import { TypingAnimation } from "@/components/magicui/typing-animation"

<TypingAnimation>
  Estratégia, inovação e negócios em movimento.
</TypingAnimation>`}
          />

          <CodeBlock
            title="Uso com className"
            code={`<TypingAnimation
  as="h2"
  duration={2200}
  className="text-[32px] font-bold leading-[1.12] text-foreground"
>
  Construindo o futuro dos negócios.
</TypingAnimation>`}
          />

          <CodeBlock
            title="Delay e startOnView"
            code={`<TypingAnimation
  as="p"
  speed={34}
  delay={250}
  startOnView
  className="text-[18px] leading-[1.6] text-muted-foreground"
>
  Tecnologia, estratégia e execução.
</TypingAnimation>`}
          />
        </div>
      </Section>

      <Section
        title="Props"
        subtitle="API disponível no componente TypingAnimation."
      >
        <div className="flex flex-col gap-3">
          {props.map((prop) => (
            <div key={prop.name} className="ds-card !p-[30px] grid gap-3 lg:grid-cols-[180px_220px_120px_1fr]">
              <Typography as="p" variant="code" className="font-semibold text-foreground">
                {prop.name}
              </Typography>
              <Typography as="p" variant="code" className="text-muted-foreground">
                {prop.type}
              </Typography>
              <Typography as="p" variant="code" className="text-muted-foreground">
                {prop.defaultValue}
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                {prop.description}
              </Typography>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Acessibilidade e implementação"
        subtitle="Cuidados para usar animação textual sem prejudicar leitura."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Acessibilidade
            </Typography>
            <div className="flex flex-col gap-3">
              {[
                "O texto animado deve continuar legível durante e depois da animação.",
                "Evite parágrafos longos; use frases curtas e diretas.",
                "Não dependa apenas da animação para comunicar informação crítica.",
                "O componente respeita prefers-reduced-motion e exibe o texto completo.",
                "O texto final fica disponível por aria-label enquanto a animação visual roda.",
              ].map((note) => (
                <Typography key={note} as="p" variant="body-sm" className="text-muted-foreground">
                  {note}
                </Typography>
              ))}
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Notas de implementação
            </Typography>
            <div className="flex flex-col gap-3">
              {[
                "A animação roda em um Client Component isolado.",
                "duration define o tempo total; speed define o intervalo por caractere.",
                "className controla a aparência com tokens do design system.",
                "startOnView usa IntersectionObserver para iniciar apenas quando visível.",
                "Variáveis CSS internas expõem delay e duração para futuras extensões.",
              ].map((note) => (
                <Typography key={note} as="p" variant="body-sm" className="text-muted-foreground">
                  {note}
                </Typography>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
