/* eslint-disable react/no-unescaped-entities */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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

const SLIDES = ["Slide 1", "Slide 2", "Slide 3", "Slide 4", "Slide 5"];

export default function CarouselPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Carousel"
        description="Componente para exibir conteúdo em sequência com navegação por setas. Baseado em Embla Carousel."
      />

      <Section
        title="Visão geral"
        subtitle="O Carousel usa Embla Carousel para navegação fluida. Padrão Netflix: slides 1:1 com tamanho fixo, overflow lateral mostra o próximo parcialmente."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Demo — estilo Netflix (1:1)
            </Typography>
            <div className="overflow-hidden"><div className="relative px-20">
              <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent viewportClassName="overflow-visible" className="-ml-4">
                  {SLIDES.map((slide) => (
                    <CarouselItem key={slide} className="pl-4 basis-[520px] shrink-0">
                      <div className="aspect-square flex items-center justify-center rounded-[10px] bg-white shadow-[var(--shadow-card)]">
                        <Typography as="p" variant="h3" className="text-foreground">
                          {slide}
                        </Typography>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import {
  Carousel, CarouselContent, CarouselItem,
  CarouselPrevious, CarouselNext
} from "@/components/ui/carousel"`}
            </Typography>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Padrão 1:1 Netflix
            </Typography>
            <Typography as="p" variant="body-sm" className="mt-3 text-muted-foreground">
              Cada slide tem largura fixa (<code className="font-mono text-foreground">basis-[520px]</code>) e proporção quadrada via <code className="font-mono text-foreground">aspect-square</code>. O slide seguinte aparece parcialmente na borda direita. O conteúdo é o slide em si — sem card externo envolvendo o carrossel.
            </Typography>
          </div>
        </div>
      </Section>


      <Section
        title="Múltiplos slides visíveis"
        subtitle="Slides menores exibidos em grupo — usa basis fracionado para definir quantos aparecem por vez."
      >
        <div className="flex flex-col gap-6">
          <div className="overflow-hidden"><div className="relative px-20">
            <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent viewportClassName="overflow-visible" className="-ml-4">
                {["Mentorias", "Financeiro", "Agenda", "Relatórios", "Metas", "Equipe"].map((label) => (
                  <CarouselItem key={label} className="pl-4 basis-1/2 md:basis-1/3 shrink-0">
                    <div className="aspect-square flex flex-col items-center justify-center gap-3 rounded-[10px] bg-white shadow-[var(--shadow-card)]">
                      <div className="h-10 w-10 rounded-full bg-[#ECECEC]" />
                      <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
                        {label}
                      </Typography>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          </div>

          <CodeBlock
            title="2 ou 3 slides visíveis"
            code={`<Carousel opts={{ align: "start" }}>
  <CarouselContent viewportClassName="overflow-visible" className="-ml-4">
    {items.map((item) => (
      <CarouselItem key={item} className="pl-4 basis-1/2 md:basis-1/3 shrink-0">
        <div className="aspect-square rounded-[10px] bg-white shadow-[var(--shadow-card)]">
          {/* conteúdo */}
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}
          />
        </div>
      </Section>

      <Section
        title="Loop infinito"
        subtitle="Com opts={{ loop: true }} o carrossel reinicia automaticamente ao chegar no último slide."
      >
        <div className="flex flex-col gap-6">
          <div className="overflow-hidden"><div className="relative px-20">
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent viewportClassName="overflow-visible" className="-ml-4">
                {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"].map((mes) => (
                  <CarouselItem key={mes} className="pl-4 basis-[520px] shrink-0">
                    <div className="aspect-square flex items-center justify-center rounded-[10px] bg-white shadow-[var(--shadow-card)]">
                      <Typography as="p" variant="h2" className="text-foreground">
                        {mes}
                      </Typography>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          </div>

          <CodeBlock
            title="Loop habilitado"
            code={`<Carousel opts={{ align: "start", loop: true }}>
  <CarouselContent viewportClassName="overflow-visible" className="-ml-4">
    {items.map((item) => (
      <CarouselItem key={item} className="pl-4 basis-[520px] shrink-0">
        <div className="aspect-square rounded-[10px] bg-white shadow-[var(--shadow-card)]" />
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}
          />
        </div>
      </Section>

      <Section
        title="Cards de conteúdo"
        subtitle="Slides com estrutura de card real — badge, título, descrição e ação."
      >
        <div className="flex flex-col gap-6">
          <div className="overflow-hidden"><div className="relative px-20">
            <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent viewportClassName="overflow-visible" className="-ml-4">
                {[
                  { badge: "Gestão", title: "Mentorados ativos", desc: "Acompanhe o progresso com métricas em tempo real." },
                  { badge: "Financeiro", title: "Receita do mês", desc: "Visão consolidada de entradas e metas atingidas." },
                  { badge: "Agenda", title: "Próximas sessões", desc: "Sessões agendadas para os próximos 7 dias." },
                  { badge: "Relatório", title: "NPS da semana", desc: "Satisfação dos mentorados nas últimas avaliações." },
                ].map((card) => (
                  <CarouselItem key={card.title} className="pl-4 basis-[340px] shrink-0">
                    <div className="flex h-full flex-col justify-between rounded-[10px] bg-white p-[30px] shadow-[var(--shadow-card)]">
                      <div>
                        <span className="mb-3 inline-block rounded-full bg-[#ECECEC] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-foreground">
                          {card.badge}
                        </span>
                        <Typography as="p" variant="h3" className="mb-2 text-foreground">
                          {card.title}
                        </Typography>
                        <Typography as="p" variant="body-sm" className="text-muted-foreground">
                          {card.desc}
                        </Typography>
                      </div>
                      <Typography as="p" variant="body-sm" className="mt-6 font-medium text-primary">
                        Ver mais →
                      </Typography>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          </div>

          <CodeBlock
            title="Card com badge, título e descrição"
            code={`<CarouselItem className="pl-4 basis-[340px] shrink-0">
  <div className="flex h-full flex-col justify-between rounded-[10px] bg-white p-[30px] shadow-[var(--shadow-card)]">
    <div>
      <span className="mb-3 inline-block rounded-full bg-muted px-3 py-1 text-xs font-semibold">
        Badge
      </span>
      <h3 className="mb-2 text-base font-semibold">Título do card</h3>
      <p className="text-sm text-muted-foreground">Descrição do conteúdo.</p>
    </div>
    <p className="mt-6 text-sm font-medium text-primary">Ver mais →</p>
  </div>
</CarouselItem>`}
          />
        </div>
      </Section>

      <Section
        title="Orientação vertical"
        subtitle="Carousel com scroll vertical — útil para listas de itens em painéis laterais."
      >
        <div className="flex flex-col gap-6">
          <div className="mx-auto w-full sm:w-[520px]">
            <Carousel orientation="vertical" opts={{ align: "start" }} className="w-full">
              <CarouselContent viewportClassName="overflow-hidden" className="-mt-4 h-[560px]">
                {SLIDES.map((slide) => (
                  <CarouselItem key={slide} className="pt-4 basis-full shrink-0">
                    <div className="flex h-full items-center justify-center rounded-[10px] bg-white shadow-[var(--shadow-card)]">
                      <Typography as="p" variant="h3" className="text-foreground">
                        {slide}
                      </Typography>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <CodeBlock
            title="Carousel vertical"
            code={`<Carousel orientation="vertical" opts={{ align: "start" }}>
  <CarouselContent className="-mt-4 h-[560px]">
    {items.map((item) => (
      <CarouselItem key={item} className="pt-4 basis-full">
        <div className="flex h-full items-center justify-center rounded-[10px] bg-white" />
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}
          />
        </div>
      </Section>

      <Section
        title="Padrão de implementação"
        subtitle="Snippets para os usos mais comuns do Carousel no projeto."
      >
        <div className="flex flex-col gap-6">
          <CodeBlock
            title="Carousel básico"
            code={`<Carousel className="w-full max-w-xl">
  <CarouselContent>
    <CarouselItem>
      <img src="/slide-1.jpg" alt="Slide 1" />
    </CarouselItem>
    <CarouselItem>
      <img src="/slide-2.jpg" alt="Slide 2" />
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}
          />

          <CodeBlock
            title="Com autoplay (plugin)"
            code={`"use client"
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"

export function CarouselAutoplay() {
  const plugin = useRef(Autoplay({ delay: 3000 }))

  return (
    <Carousel plugins={[plugin.current]}>
      <CarouselContent>...</CarouselContent>
    </Carousel>
  )
}`}
          />

          <CodeBlock
            title="Acesso à API do carousel"
            code={`"use client"
import { useState } from "react"
import { type CarouselApi } from "@/components/ui/carousel"

export function CarouselControlled() {
  const [api, setApi] = useState<CarouselApi>()

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>...</CarouselContent>
    </Carousel>
  )
}`}
          />
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="API dos sub-componentes do Carousel."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Props principais
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                {
                  name: "orientation",
                  type: `"horizontal" | "vertical"`,
                  note: "Direção do scroll. Padrão: horizontal.",
                },
                {
                  name: "opts",
                  type: "EmblaOptionsType",
                  note: "Opções do Embla Carousel (loop, align, etc).",
                },
                {
                  name: "plugins",
                  type: "EmblaPluginType[]",
                  note: "Plugins do Embla (autoplay, autoScroll, etc).",
                },
                {
                  name: "setApi",
                  type: "(api: CarouselApi) => void",
                  note: "Callback para acessar a API do carousel para controle externo.",
                },
                {
                  name: "CarouselItem basis",
                  type: "className: basis-*",
                  note: "Largura do slide via Tailwind. Ex: basis-1/2 para 2 slides visíveis.",
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
                O Embla Carousel não inclui atributos ARIA automaticamente. Para carousels de conteúdo importante, adicione <code className="font-mono text-foreground">role="region"</code> e <code className="font-mono text-foreground">aria-label</code> no container.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Os botões CarouselPrevious e CarouselNext têm textos <code className="font-mono text-foreground">sr-only</code> embutidos ("Previous slide" / "Next slide").
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Para carousels com autoplay, sempre forneça um controle de pause acessível.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
