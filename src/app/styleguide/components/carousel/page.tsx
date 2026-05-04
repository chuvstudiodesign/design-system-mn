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
        subtitle="O Carousel usa Embla Carousel para navegação fluida. Suporta slides de qualquer largura, orientação vertical e autoplay."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Demo básica
            </Typography>
            <div className="ds-card !p-[30px] w-full max-w-xl">
              <Carousel className="w-full">
                <CarouselContent>
                  {SLIDES.map((slide) => (
                    <CarouselItem key={slide}>
                      <div className="flex h-40 items-center justify-center rounded-[10px] bg-muted">
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
        </div>
      </Section>

      <Section
        title="Múltiplos itens visíveis"
        subtitle="Controle quantos slides ficam visíveis por vez com classes basis."
      >
        <div className="flex flex-col gap-6">
          <div className="ds-card !p-[30px] w-full max-w-2xl">
            <Carousel className="w-full">
              <CarouselContent className="-ml-4">
                {SLIDES.map((slide) => (
                  <CarouselItem key={slide} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="flex h-32 items-center justify-center rounded-[10px] bg-muted">
                      <Typography as="p" variant="label" className="normal-case tracking-normal text-muted-foreground">
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
            title="3 slides visíveis em telas grandes"
            code={`<Carousel>
  <CarouselContent className="-ml-4">
    {items.map((item) => (
      <CarouselItem key={item.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
        {/* conteúdo do slide */}
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
