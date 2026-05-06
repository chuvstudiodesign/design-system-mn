"use client";

import { commercialPresentations } from "@/data/commercial-presentations";
import type { CommercialSlide } from "@/data/commercial-presentations";
import { Typography } from "@/components/typography";
import { FoundationFooter, FoundationPageHeader, Section } from "@/app/styleguide/foundation-sections";
import { PresentationCarousel } from "./PresentationCarousel";
import { EditableDocument } from "./EditableDocument";

const presentation = commercialPresentations[0];

function charRange(items: string[]): string {
  const lengths = items.map((s) => s.length);
  const min = Math.min(...lengths);
  const max = Math.max(...lengths);
  return min === max ? `${min}` : `${min}–${max}`;
}

function FieldRow({ label, chars, note }: { label: string; chars?: number; note?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-[7px]">
      <Typography as="span" variant="caption" className="text-muted-foreground">
        {label}
      </Typography>
      <Typography as="span" variant="caption" className="shrink-0 font-mono text-foreground/70">
        {note ?? `${chars} car.`}
      </Typography>
    </div>
  );
}

function SlideContentCard({ slide, index }: { slide: CommercialSlide; index: number }) {
  return (
    <div className="ds-card !p-[30px]">
      <div className="mb-[18px] flex items-center gap-[10px]">
        <Typography as="span" variant="caption" className="font-mono text-muted-foreground/50">
          {String(index + 1).padStart(2, "0")}
        </Typography>
        <Typography as="span" variant="caption" className="font-semibold capitalize text-foreground">
          {slide.type.replace(/-/g, " ")}
        </Typography>
      </div>
      <div className="divide-y divide-border/40">
        <FieldRow label="título" chars={slide.title.length} />
        {slide.subtitle && <FieldRow label="subtítulo" chars={slide.subtitle.length} />}
        {slide.body && <FieldRow label="corpo" chars={slide.body.length} />}
        {slide.quote && <FieldRow label="citação" chars={slide.quote.length} />}
        {slide.bullets && (
          <FieldRow
            label={`bullets · ${slide.bullets.length} itens`}
            note={`${charRange(slide.bullets)} car./item`}
          />
        )}
        {slide.cards && (
          <>
            <FieldRow
              label={`cards · ${slide.cards.length} · título`}
              note={`${charRange(slide.cards.map((c) => c.title))} car.`}
            />
            <FieldRow
              label={`cards · ${slide.cards.length} · descrição`}
              note={`${charRange(slide.cards.map((c) => c.description))} car.`}
            />
          </>
        )}
        {slide.stats && (
          <>
            <FieldRow
              label={`stats · ${slide.stats.length} · valor`}
              note={`${charRange(slide.stats.map((s) => s.value))} car.`}
            />
            <FieldRow
              label={`stats · ${slide.stats.length} · label`}
              note={`${charRange(slide.stats.map((s) => s.label))} car.`}
            />
          </>
        )}
      </div>
    </div>
  );
}

export function CommercialPresentationsPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title={presentation.title}
        description={presentation.description}
      />

      <Section
        eyebrow="Preview 16:9"
        title="Apresentação completa"
        subtitle="20 slides em proporção 16:9, navegação por thumbnails e metadados por slide."
        first
      >
        <PresentationCarousel presentation={presentation} />
      </Section>

      <Section
        title="Documento de trabalho"
        subtitle="Canvas independente para rascunhos e edição de texto. Selecione um bloco para ativar os handles de largura, edite o conteúdo e aplique cores da paleta da marca."
      >
        <EditableDocument />
      </Section>

      <Section
        title="Arco narrativo"
        subtitle="Sequência dos 20 slides com tipo, papel na narrativa e visual aplicado."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {presentation.slides.map((slide, index) => (
            <div key={slide.id} className="ds-card flex items-start gap-5 !p-[20px]">
              <Typography
                as="span"
                variant="caption"
                className="mt-[2px] shrink-0 font-mono text-muted-foreground/50"
              >
                {String(index + 1).padStart(2, "0")}
              </Typography>
              <div className="min-w-0">
                <Typography as="p" variant="caption" className="font-semibold capitalize text-foreground">
                  {slide.type.replace(/-/g, " ")}
                </Typography>
                <Typography as="p" variant="caption" className="mt-[2px] text-muted-foreground">
                  {slide.eyebrow?.split(" - ").at(-1)}
                </Typography>
                <Typography
                  as="p"
                  variant="caption"
                  className="mt-[6px] font-mono text-muted-foreground/40"
                >
                  visual: {slide.visual}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Mapeamento de conteúdo"
        subtitle="Contagem de caracteres por campo em cada slide. Referência para manter consistência ao adaptar ou criar novos decks a partir deste modelo."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {presentation.slides.map((slide, index) => (
            <SlideContentCard key={slide.id} slide={slide} index={index} />
          ))}
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
