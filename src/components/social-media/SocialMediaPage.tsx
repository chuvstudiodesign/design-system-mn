"use client";

import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Layers, Sparkles, Cpu, Building2 } from "lucide-react";
import { ChamferedPanel } from "@/components/chamfered-panel";
import { CarouselViewer, POST_H, POST_W } from "./CarouselViewer";
import { SiliconValleySlides } from "./posts/silicon-valley";
import { AiOperatingSystemSlides } from "./posts/ai-operating-system";
import { BigTechPlaybookSlides } from "./posts/big-tech-playbook";
import {
  AiFoundationSlides,
  BoardBriefingSlides,
  SiliconValleyFoundationSlides,
  VentureBuilderSlides,
} from "./posts/foundation-carousels";

const carousels = [
  {
    id: "silicon-valley",
    name: "Vale do Silício",
    theme: "Big Techs, inovação e liderança de mercado",
    direction: "Editorial claro, tipografia grande, ritmo de leitura rápido.",
    accent: "#5FC318",
    icon: Building2,
    slides: SiliconValleySlides,
  },
  {
    id: "silicon-valley-foundation",
    name: "Vale do Silício · Section",
    theme: "Mesmo conteúdo do post 1 com base, section e cards do foundation",
    direction:
      "Duplicata do carrossel Vale do Silício no estilo do section system usado em AI Foundation.",
    accent: "#5FC318",
    icon: Layers,
    slides: SiliconValleyFoundationSlides,
  },
  {
    id: "ai-operating-system",
    name: "IA como sistema",
    theme: "AI, processos e operação inteligente",
    direction: "Dark interface, grids técnicos, linguagem de painel executivo.",
    accent: "#5FC318",
    icon: Cpu,
    slides: AiOperatingSystemSlides,
  },
  {
    id: "big-tech-playbook",
    name: "Playbook Big Tech",
    theme: "Estratégia, dados, produto e escala",
    direction: "Revista de negócios, blocos editoriais, contrastes duros.",
    accent: "#5FC318",
    icon: Sparkles,
    slides: BigTechPlaybookSlides,
  },
  {
    id: "ai-foundation",
    name: "AI Foundation",
    theme: "IA, sistema operacional e governança",
    direction:
      "Base canvas, section e cards aplicados em cada tela, com chanfro na abertura.",
    accent: "#5FC318",
    icon: Cpu,
    slides: AiFoundationSlides,
  },
  {
    id: "venture-builder",
    name: "Venture Builder",
    theme: "Big Techs, produto, mercado e escala",
    direction:
      "Composição editorial construída com section #ECECEC, cards brancos e grid do foundation.",
    accent: "#5FC318",
    icon: Building2,
    slides: VentureBuilderSlides,
  },
  {
    id: "board-briefing",
    name: "Board Briefing",
    theme: "Estratégia, inovação e decisão executiva",
    direction:
      "Roteiro de reunião em camadas fixas: página, section, card, métrica e decisão.",
    accent: "#5FC318",
    icon: Layers,
    slides: BoardBriefingSlides,
  },
];

export function SocialMediaPage() {
  const [selectedId, setSelectedId] = useState(carousels[0].id);
  const selected = carousels.find((item) => item.id === selectedId) ?? carousels[0];
  const slides = useMemo(() => selected.slides(), [selected]);

  return (
    <div className="ds-page">
      <header className="ds-page-header px-1">
        <h1 className="ds-page-title">Mídia Social</h1>
        <p className="ds-page-description">
          Modelos de carrossel 4:5 para posts de negócios, inovação, AI,
          Big Techs e Vale do Silício, usando as camadas visuais do design system.
        </p>
      </header>

      <section className="w-full">
        <ChamferedPanel
          strokeColor="#FFFFFF"
          strokeWidth={1}
          innerStyle={{
            background: "#ECECEC",
            borderRadius: 10,
            padding: "var(--section-padding-y) var(--section-padding-x)",
          }}
        >
          <div className="grid w-full gap-8 xl:grid-cols-[minmax(0,390px)_minmax(0,1fr)]">
            <div className="flex flex-col gap-6">
              <div>
                <p className="ds-caption mb-2 text-primary">Posts & Carrosséis</p>
                <h2 className="ds-section-title">Seis direções prontas para publicar.</h2>
                <p className="ds-section-subtitle">
                  Cada modelo tem cinco telas no formato 1080 x 1350 px, com
                  narrativa completa e estrutura visual própria. As variações em section system seguem explicitamente as regras de foundation:
                  base canvas, section, card, radius, padding e chanfro inicial.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {carousels.map((carousel) => {
                  const Icon = carousel.icon;
                  const active = carousel.id === selected.id;

                  return (
                    <button
                      key={carousel.id}
                      type="button"
                      onClick={() => setSelectedId(carousel.id)}
                      className={`flex w-full items-start gap-4 rounded-[10px] border p-4 text-left transition-colors ${
                        active
                          ? "border-[#5FC318] bg-white"
                          : "border-white bg-white/45 hover:bg-white"
                      }`}
                    >
                      <span
                        className={`flex size-10 shrink-0 items-center justify-center rounded-[10px] ${
                          active ? "bg-primary text-white" : "bg-[#ECECEC] text-foreground"
                        }`}
                      >
                        <Icon className="size-5" strokeWidth={1.8} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[15px] font-bold leading-tight text-foreground">
                          {carousel.name}
                        </span>
                        <span className="mt-1 block text-[13px] leading-5 text-muted-foreground">
                          {carousel.theme}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex min-w-0 justify-center">
              <div className="w-full max-w-[520px]">
                <CarouselViewer slides={slides} accentColor={selected.accent} />
              </div>
            </div>
          </div>
        </ChamferedPanel>
      </section>

      <section className="ds-section">
        <div className="mb-6">
          <p className="ds-caption mb-2 text-primary">Visão do carrossel</p>
          <h2 className="ds-section-title">{selected.name}</h2>
          <p className="ds-section-subtitle">
            {selected.direction}
          </p>
        </div>

        <div className="-mx-[var(--page-padding-x)] overflow-x-auto px-[var(--page-padding-x)] pb-4">
          <div className="flex w-max gap-5">
            {slides.map((slide, index) => (
              <div key={`${selected.id}-${index}`} className="w-[min(72vw,320px)] shrink-0">
                <SlidePreview slide={slide} />
                <p className="mt-3 text-center font-mono text-[12px] font-bold text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function SlidePreview({ slide }: { slide: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / POST_W);
    });
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-[10px] bg-white shadow-[0_18px_44px_rgba(0,0,0,0.12)]"
      style={{ height: scale > 0 ? POST_H * scale : undefined, aspectRatio: `${POST_W} / ${POST_H}` }}
    >
      {scale > 0 ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: POST_W,
            height: POST_H,
            transform: `scale(${scale})`,
            transformOrigin: "0 0",
          }}
        >
          {slide}
        </div>
      ) : null}
    </div>
  );
}
