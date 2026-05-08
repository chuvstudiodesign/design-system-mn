"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ImageIcon,
  Layers3,
  MousePointer2,
  Move,
  RotateCcw,
  Save,
  Type,
} from "lucide-react";
import type { CommercialPresentation, CommercialSlide } from "@/data/commercial-presentations";
import { cn } from "@/lib/utils";

const CANVAS_W = 1600;
const CANVAS_H = 900;
const STORAGE_KEY = "commercial-presentation-editor-v1";

type EditorLayerType = "text" | "image" | "shape";

type EditorLayer = {
  id: string;
  slideIndex: number;
  type: EditorLayerType;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  text?: string;
  src?: string;
  color?: string;
  background?: string;
  borderRadius?: number;
  fontSize?: number;
  fontWeight?: number;
  lineHeight?: number;
  letterSpacing?: number;
  opacity?: number;
  uppercase?: boolean;
  objectFit?: "contain" | "cover";
};

type EditorSlide = {
  id: string;
  name: string;
  background: string;
  layers: EditorLayer[];
};

type EditorDocument = {
  version: 1;
  canvas: {
    width: number;
    height: number;
  };
  slides: EditorSlide[];
};

type DragState = {
  layerId: string;
  startX: number;
  startY: number;
  layerX: number;
  layerY: number;
};

function readStorage(): EditorDocument | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as EditorDocument) : null;
  } catch {
    return null;
  }
}

function imageSrc(slide: CommercialSlide) {
  return slide.imageSrc?.src;
}

function tagLayer(slideIndex: number, text: string, index: number): EditorLayer[] {
  const x = 80 + index * 132;
  const width = Math.max(86, text.length * 12 + 42);

  return [
    {
      id: `slide-${slideIndex + 1}-tag-bg-${index + 1}`,
      slideIndex,
      type: "shape",
      name: `Tag ${text}`,
      x,
      y: 626,
      width,
      height: 36,
      zIndex: 30 + index * 2,
      background: "#000000",
      borderRadius: 18,
    },
    {
      id: `slide-${slideIndex + 1}-tag-text-${index + 1}`,
      slideIndex,
      type: "text",
      name: `Texto tag ${text}`,
      x: x + 21,
      y: 636,
      width: width - 42,
      height: 18,
      zIndex: 31 + index * 2,
      text: text.toUpperCase(),
      color: "#FFFFFF",
      fontSize: 13,
      fontWeight: 700,
      lineHeight: 1,
      letterSpacing: 0.08,
      uppercase: true,
    },
  ];
}

function bulletCardLayers(
  slideIndex: number,
  bullets: string[],
  startY = 660
): EditorLayer[] {
  const cardW = 250.6667;

  return bullets.slice(0, 3).flatMap((bullet, index) => {
    const x = 650 + index * (cardW + 14);

    return [
      {
        id: `slide-${slideIndex + 1}-bullet-bg-${index + 1}`,
        slideIndex,
        type: "shape",
        name: `Card bullet ${index + 1}`,
        x,
        y: startY,
        width: cardW,
        height: 120,
        zIndex: 35 + index * 3,
        background: "#FFFFFF",
        borderRadius: 10,
      },
      {
        id: `slide-${slideIndex + 1}-bullet-number-${index + 1}`,
        slideIndex,
        type: "text",
        name: `Numero bullet ${index + 1}`,
        x: x + 28,
        y: startY + 24,
        width: 45,
        height: 20,
        zIndex: 36 + index * 3,
        text: `0${index + 1}`,
        color: "#5FC318",
        fontSize: 15,
        fontWeight: 700,
        lineHeight: 1,
      },
      {
        id: `slide-${slideIndex + 1}-bullet-text-${index + 1}`,
        slideIndex,
        type: "text",
        name: `Texto bullet ${index + 1}`,
        x: x + 28,
        y: startY + 58,
        width: cardW - 50,
        height: 42,
        zIndex: 37 + index * 3,
        text: bullet,
        color: "#000000",
        fontSize: 16,
        fontWeight: 700,
        lineHeight: 1.2,
      },
    ];
  });
}

function lineChartLayers(slideIndex: number, slide: CommercialSlide): EditorLayer[] {
  const chart = slide.chart;
  if (!chart) return [];

  const x = 650;
  const y = 165;
  const w = 780;
  const h = 455;
  const left = x + 70;
  const top = y + 105;
  const chartW = w - 150;
  const chartH = 230;

  return [
    {
      id: `slide-${slideIndex + 1}-chart-panel`,
      slideIndex,
      type: "shape",
      name: "Painel grafico",
      x,
      y,
      width: w,
      height: h,
      zIndex: 20,
      background: "#FFFFFF",
      borderRadius: 10,
    },
    {
      id: `slide-${slideIndex + 1}-chart-label`,
      slideIndex,
      type: "text",
      name: "Titulo grafico",
      x: x + 35,
      y: y + 32,
      width: w - 70,
      height: 30,
      zIndex: 21,
      text: chart.valueLabel,
      color: "#000000",
      fontSize: 20,
      fontWeight: 700,
      lineHeight: 1,
    },
    ...chart.data.flatMap((datum, index) => {
      const px = left + (chartW / Math.max(1, chart.data.length - 1)) * index;
      const py = top + chartH - (chartH * datum.value) / 90;

      return [
        {
          id: `slide-${slideIndex + 1}-point-${index + 1}`,
          slideIndex,
          type: "shape" as const,
          name: `Ponto ${datum.label}`,
          x: px - 8,
          y: py - 8,
          width: 16,
          height: 16,
          zIndex: 28 + index * 3,
          background: "#5FC318",
          borderRadius: 8,
        },
        {
          id: `slide-${slideIndex + 1}-point-value-${index + 1}`,
          slideIndex,
          type: "text" as const,
          name: `Valor ${datum.label}`,
          x: px - 18,
          y: py - 38,
          width: 60,
          height: 22,
          zIndex: 29 + index * 3,
          text: String(datum.value),
          color: "#000000",
          fontSize: 18,
          fontWeight: 700,
          lineHeight: 1,
        },
        {
          id: `slide-${slideIndex + 1}-point-label-${index + 1}`,
          slideIndex,
          type: "text" as const,
          name: `Label ${datum.label}`,
          x: px - 35,
          y: y + 365,
          width: 90,
          height: 22,
          zIndex: 29 + index * 3,
          text: datum.label,
          color: "#000000",
          fontSize: 13,
          fontWeight: 400,
          lineHeight: 1,
          opacity: 0.56,
        },
      ];
    }),
  ];
}

function createInitialDocument(presentation: CommercialPresentation): EditorDocument {
  const [cover, statement, context] = presentation.slides;

  return {
    version: 1,
    canvas: { width: CANVAS_W, height: CANVAS_H },
    slides: [
      {
        id: "slide-1",
        name: "Slide 01 - Capa",
        background: "#D4D4D4",
        layers: [
          {
            id: "slide-1-inner",
            slideIndex: 0,
            type: "shape",
            name: "Area interna",
            x: 20,
            y: 20,
            width: 1560,
            height: 860,
            zIndex: 1,
            background: "#ECECEC",
            borderRadius: 10,
          },
          {
            id: "slide-1-logo",
            slideIndex: 0,
            type: "text",
            name: "Logo MASI",
            x: 80,
            y: 72,
            width: 160,
            height: 34,
            zIndex: 10,
            text: "MASI",
            color: "#000000",
            fontSize: 28,
            fontWeight: 800,
            lineHeight: 1,
          },
          {
            id: "slide-1-eyebrow",
            slideIndex: 0,
            type: "text",
            name: "Eyebrow",
            x: 1120,
            y: 78,
            width: 390,
            height: 28,
            zIndex: 10,
            text: cover.eyebrow,
            color: "#5FC318",
            fontSize: 15,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: 0.08,
            uppercase: true,
          },
          {
            id: "slide-1-title",
            slideIndex: 0,
            type: "text",
            name: "Titulo",
            x: 80,
            y: 260,
            width: 680,
            height: 210,
            zIndex: 20,
            text: cover.title,
            color: "#000000",
            fontSize: 85,
            fontWeight: 800,
            lineHeight: 0.82,
          },
          {
            id: "slide-1-body",
            slideIndex: 0,
            type: "text",
            name: "Descricao",
            x: 80,
            y: 500,
            width: 570,
            height: 92,
            zIndex: 20,
            text: cover.body,
            color: "#000000",
            fontSize: 22,
            fontWeight: 400,
            lineHeight: 1.45,
            opacity: 0.62,
          },
          {
            id: "slide-1-image",
            slideIndex: 0,
            type: "image",
            name: "Imagem Brasil 2",
            x: 910,
            y: 130,
            width: 430,
            height: 645,
            zIndex: 15,
            src: imageSrc(cover),
            objectFit: "contain",
          },
          ...(cover.bullets ?? []).flatMap((bullet, index) => tagLayer(0, bullet, index)),
        ],
      },
      {
        id: "slide-2",
        name: "Slide 02 - Tese central",
        background: "#0C1C16",
        layers: [
          {
            id: "slide-2-logo",
            slideIndex: 1,
            type: "text",
            name: "Logo MASI",
            x: 80,
            y: 72,
            width: 160,
            height: 34,
            zIndex: 20,
            text: "MASI",
            color: "#FFFFFF",
            fontSize: 28,
            fontWeight: 800,
            lineHeight: 1,
          },
          {
            id: "slide-2-eyebrow",
            slideIndex: 1,
            type: "text",
            name: "Eyebrow",
            x: 1120,
            y: 78,
            width: 390,
            height: 28,
            zIndex: 20,
            text: statement.eyebrow,
            color: "#FFFFFF",
            fontSize: 15,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: 0.08,
            opacity: 0.72,
            uppercase: true,
          },
          {
            id: "slide-2-title",
            slideIndex: 1,
            type: "text",
            name: "Titulo",
            x: 86,
            y: 250,
            width: 760,
            height: 260,
            zIndex: 20,
            text: statement.quote ?? statement.title,
            color: "#FFFFFF",
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 0.9,
          },
          {
            id: "slide-2-divider",
            slideIndex: 1,
            type: "shape",
            name: "Divisor",
            x: 86,
            y: 552,
            width: 165,
            height: 6,
            zIndex: 20,
            background: "#5FC318",
            borderRadius: 3,
          },
          {
            id: "slide-2-body",
            slideIndex: 1,
            type: "text",
            name: "Descricao",
            x: 86,
            y: 590,
            width: 560,
            height: 72,
            zIndex: 20,
            text: statement.body,
            color: "#FFFFFF",
            fontSize: 22,
            fontWeight: 400,
            lineHeight: 1.45,
            opacity: 0.72,
          },
          {
            id: "slide-2-image",
            slideIndex: 1,
            type: "image",
            name: "Imagem Moinho",
            x: 820,
            y: 69,
            width: 805,
            height: 813,
            zIndex: 10,
            src: imageSrc(statement),
            objectFit: "contain",
          },
        ],
      },
      {
        id: "slide-3",
        name: "Slide 03 - Contexto",
        background: "#D4D4D4",
        layers: [
          {
            id: "slide-3-inner",
            slideIndex: 2,
            type: "shape",
            name: "Area interna",
            x: 20,
            y: 20,
            width: 1560,
            height: 860,
            zIndex: 1,
            background: "#ECECEC",
            borderRadius: 10,
          },
          {
            id: "slide-3-logo",
            slideIndex: 2,
            type: "text",
            name: "Logo MASI",
            x: 80,
            y: 72,
            width: 160,
            height: 34,
            zIndex: 10,
            text: "MASI",
            color: "#000000",
            fontSize: 28,
            fontWeight: 800,
            lineHeight: 1,
          },
          {
            id: "slide-3-eyebrow",
            slideIndex: 2,
            type: "text",
            name: "Eyebrow",
            x: 1120,
            y: 78,
            width: 390,
            height: 28,
            zIndex: 10,
            text: context.eyebrow,
            color: "#5FC318",
            fontSize: 15,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: 0.08,
            uppercase: true,
          },
          {
            id: "slide-3-title",
            slideIndex: 2,
            type: "text",
            name: "Titulo",
            x: 80,
            y: 350,
            width: 430,
            height: 160,
            zIndex: 20,
            text: context.title,
            color: "#000000",
            fontSize: 53,
            fontWeight: 800,
            lineHeight: 0.96,
          },
          {
            id: "slide-3-body",
            slideIndex: 2,
            type: "text",
            name: "Descricao",
            x: 80,
            y: 548,
            width: 500,
            height: 120,
            zIndex: 20,
            text: context.body,
            color: "#000000",
            fontSize: 22,
            fontWeight: 400,
            lineHeight: 1.45,
            opacity: 0.62,
          },
          ...lineChartLayers(2, context),
          ...bulletCardLayers(2, context.bullets ?? []),
        ],
      },
    ],
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function updateLayer(
  document: EditorDocument,
  slideIndex: number,
  layerId: string,
  patch: Partial<EditorLayer>
): EditorDocument {
  return {
    ...document,
    slides: document.slides.map((slide, index) =>
      index === slideIndex
        ? {
            ...slide,
            layers: slide.layers.map((layer) =>
              layer.id === layerId ? { ...layer, ...patch } : layer
            ),
          }
        : slide
    ),
  };
}

export function EditablePresentationEditor({
  presentation,
}: {
  presentation: CommercialPresentation;
}) {
  const initialDocument = useMemo(
    () => createInitialDocument(presentation),
    [presentation]
  );
  const [document, setDocument] = useState<EditorDocument>(
    () => readStorage() ?? createInitialDocument(presentation)
  );
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [saveMessage, setSaveMessage] = useState("");
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      setScale((entry?.contentRect.width ?? CANVAS_W) / CANVAS_W);
    });

    resizeObserver.observe(viewport);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!dragState) return;

    const onMove = (event: MouseEvent) => {
      const dx = (event.clientX - dragState.startX) / scale;
      const dy = (event.clientY - dragState.startY) / scale;
      const layer = document.slides[activeSlideIndex].layers.find(
        (item) => item.id === dragState.layerId
      );

      if (!layer) return;

      setDocument((current) =>
        updateLayer(current, activeSlideIndex, dragState.layerId, {
          x: clamp(dragState.layerX + dx, -400, CANVAS_W + 400),
          y: clamp(dragState.layerY + dy, -400, CANVAS_H + 400),
        })
      );
    };

    const onUp = () => setDragState(null);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [activeSlideIndex, document.slides, dragState, scale]);

  const activeSlide = document.slides[activeSlideIndex];
  const sortedLayers = [...activeSlide.layers].sort((a, b) => a.zIndex - b.zIndex);
  const selectedLayer = activeSlide.layers.find((layer) => layer.id === selectedLayerId);

  function updateSelectedLayer(patch: Partial<EditorLayer>) {
    if (!selectedLayerId) return;
    setDocument((current) =>
      updateLayer(current, activeSlideIndex, selectedLayerId, patch)
    );
  }

  function resetEditor() {
    localStorage.removeItem(STORAGE_KEY);
    setDocument(initialDocument);
    setSelectedLayerId(null);
    setSaveState("idle");
    setSaveMessage("");
  }

  async function saveEditor() {
    setSaveState("saving");
    setSaveMessage("");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(document));

    try {
      const response = await fetch("/api/commercial-presentations/editor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(document),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Falha ao salvar");
      }

      setSaveState("saved");
      setSaveMessage(`Salvo em ${result.path}`);
    } catch (error) {
      setSaveState("error");
      setSaveMessage(error instanceof Error ? error.message : "Erro ao salvar");
    }
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[260px_minmax(0,1fr)_300px]">
      <aside className="flex flex-col gap-4 rounded-[10px] border border-white bg-[#ECECEC] p-4 shadow-[var(--shadow-card)]">
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.08em] text-black/45">
            Slides editaveis
          </p>
          <div className="grid gap-2">
            {document.slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => {
                  setActiveSlideIndex(index);
                  setSelectedLayerId(null);
                }}
                className={cn(
                  "flex items-center justify-between rounded-[8px] px-3 py-2 text-left text-sm font-semibold transition-colors",
                  activeSlideIndex === index
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-black/5"
                )}
              >
                <span>{slide.name}</span>
                <span className="font-mono text-[11px] opacity-50">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-white" />

        <button
          type="button"
          onClick={saveEditor}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-[#5FC318] px-4 text-sm font-bold text-black transition-colors hover:bg-[#AFF000]"
        >
          <Save className="h-4 w-4" />
          {saveState === "saving" ? "Salvando" : "Salvar arquivo"}
        </button>

        <button
          type="button"
          onClick={resetEditor}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-[8px] bg-white px-4 text-sm font-bold text-black transition-colors hover:bg-black/5"
        >
          <RotateCcw className="h-4 w-4" />
          Resetar teste
        </button>

        {saveMessage && (
          <p
            className={cn(
              "rounded-[8px] px-3 py-2 text-xs leading-[1.35]",
              saveState === "error"
                ? "bg-red-50 text-red-700"
                : "bg-white text-black/60"
            )}
          >
            {saveMessage}
          </p>
        )}
      </aside>

      <div className="min-w-0">
        <div
          ref={viewportRef}
          className="relative aspect-video w-full overflow-hidden bg-[#D4D4D4] shadow-[var(--shadow-card)]"
        >
          <div
            className="absolute left-0 top-0 h-[900px] w-[1600px] origin-top-left overflow-hidden"
            style={{
              transform: `scale(${scale})`,
              background: activeSlide.background,
            }}
            onMouseDown={() => setSelectedLayerId(null)}
          >
            {sortedLayers.map((layer) => {
              const selected = selectedLayerId === layer.id;
              const commonStyle = {
                left: layer.x,
                top: layer.y,
                width: layer.width,
                height: layer.height,
                zIndex: layer.zIndex,
                opacity: layer.opacity ?? 1,
              };

              return (
                <div
                  key={layer.id}
                  className={cn(
                    "absolute select-none",
                    selected && "outline outline-2 outline-[#5FC318]"
                  )}
                  style={commonStyle}
                  onMouseDown={(event) => {
                    event.stopPropagation();
                    setSelectedLayerId(layer.id);

                    if ((event.target as HTMLElement).isContentEditable) return;

                    setDragState({
                      layerId: layer.id,
                      startX: event.clientX,
                      startY: event.clientY,
                      layerX: layer.x,
                      layerY: layer.y,
                    });
                  }}
                >
                  {layer.type === "shape" && (
                    <div
                      className="h-full w-full"
                      style={{
                        background: layer.background,
                        borderRadius: layer.borderRadius,
                      }}
                    />
                  )}

                  {layer.type === "image" && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={layer.src}
                      alt={layer.name}
                      className="h-full w-full"
                      draggable={false}
                      style={{ objectFit: layer.objectFit ?? "contain" }}
                    />
                  )}

                  {layer.type === "text" && (
                    <div
                      contentEditable
                      suppressContentEditableWarning
                      className="h-full w-full cursor-text whitespace-pre-wrap outline-none"
                      style={{
                        color: layer.color,
                        fontSize: layer.fontSize,
                        fontWeight: layer.fontWeight,
                        lineHeight: layer.lineHeight,
                        letterSpacing: layer.letterSpacing
                          ? `${layer.letterSpacing}em`
                          : undefined,
                        textTransform: layer.uppercase ? "uppercase" : undefined,
                      }}
                      onInput={(event) => {
                        updateSelectedLayer({
                          text: event.currentTarget.innerText,
                        });
                      }}
                    >
                      {layer.text}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <aside className="flex flex-col gap-4 rounded-[10px] border border-white bg-[#ECECEC] p-4 shadow-[var(--shadow-card)]">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Layers3 className="h-4 w-4 text-black/45" />
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-black/45">
              Camadas
            </p>
          </div>
          <div className="grid max-h-[270px] gap-1 overflow-y-auto pr-1">
            {[...activeSlide.layers]
              .sort((a, b) => b.zIndex - a.zIndex)
              .map((layer) => (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setSelectedLayerId(layer.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-[7px] px-2 py-2 text-left text-xs font-semibold transition-colors",
                    selectedLayerId === layer.id
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-black/5"
                  )}
                >
                  {layer.type === "text" && <Type className="h-3.5 w-3.5" />}
                  {layer.type === "image" && <ImageIcon className="h-3.5 w-3.5" />}
                  {layer.type === "shape" && <MousePointer2 className="h-3.5 w-3.5" />}
                  <span className="min-w-0 truncate">{layer.name}</span>
                </button>
              ))}
          </div>
        </div>

        <div className="h-px bg-white" />

        <div>
          <div className="mb-3 flex items-center gap-2">
            <Move className="h-4 w-4 text-black/45" />
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-black/45">
              Propriedades
            </p>
          </div>

          {selectedLayer ? (
            <div className="grid gap-3">
              <p className="text-sm font-bold text-black">{selectedLayer.name}</p>
              <div className="grid grid-cols-2 gap-2">
                {(["x", "y", "width", "height"] as const).map((field) => (
                  <label key={field} className="grid gap-1 text-[11px] font-bold uppercase tracking-[0.06em] text-black/45">
                    {field}
                    <input
                      type="number"
                      value={Math.round(selectedLayer[field])}
                      onChange={(event) =>
                        updateSelectedLayer({ [field]: Number(event.target.value) })
                      }
                      className="h-9 rounded-[7px] border border-white bg-white px-2 text-sm text-black outline-none"
                    />
                  </label>
                ))}
              </div>

              {selectedLayer.type === "text" && (
                <div className="grid grid-cols-2 gap-2">
                  <label className="grid gap-1 text-[11px] font-bold uppercase tracking-[0.06em] text-black/45">
                    Fonte
                    <input
                      type="number"
                      value={selectedLayer.fontSize ?? 16}
                      onChange={(event) =>
                        updateSelectedLayer({ fontSize: Number(event.target.value) })
                      }
                      className="h-9 rounded-[7px] border border-white bg-white px-2 text-sm text-black outline-none"
                    />
                  </label>
                  <label className="grid gap-1 text-[11px] font-bold uppercase tracking-[0.06em] text-black/45">
                    Cor
                    <input
                      type="color"
                      value={selectedLayer.color ?? "#000000"}
                      onChange={(event) =>
                        updateSelectedLayer({ color: event.target.value })
                      }
                      className="h-9 rounded-[7px] border border-white bg-white p-1"
                    />
                  </label>
                </div>
              )}
            </div>
          ) : (
            <p className="rounded-[8px] bg-white p-3 text-sm leading-[1.35] text-black/55">
              Selecione uma camada no canvas ou na lista para mover, editar texto e ajustar medidas.
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}
