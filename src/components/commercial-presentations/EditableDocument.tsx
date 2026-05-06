"use client";

import { useEffect, useRef, useState } from "react";

const CANVAS_W = 1600;
const CANVAS_PAD = 80;
const STORAGE_KEY = "editable-document-v1";
const HANDLE_SIZE = 10;

const BRAND_COLORS = [
  { hex: "#000000", label: "Preto" },
  { hex: "#1F1F1F", label: "Cinza 900" },
  { hex: "#474747", label: "Cinza texto" },
  { hex: "#8A8A8A", label: "Cinza 500" },
  { hex: "#D4D4D4", label: "Cinza claro" },
  { hex: "#FFFFFF", label: "Branco" },
  { hex: "#5FC318", label: "Verde primário" },
  { hex: "#AFF000", label: "Verde marca" },
  { hex: "#0C1C16", label: "Verde escuro" },
];

type HandleSide = "left" | "right" | null;
type HandleDef = { key: string; side: HandleSide; style: React.CSSProperties; cursor: string };

const HANDLES: HandleDef[] = [
  { key: "tl", side: "left",  style: { top: -HANDLE_SIZE / 2, left: -HANDLE_SIZE / 2 }, cursor: "nw-resize" },
  { key: "tc", side: null,    style: { top: -HANDLE_SIZE / 2, left: "50%", transform: "translateX(-50%)" }, cursor: "n-resize" },
  { key: "tr", side: "right", style: { top: -HANDLE_SIZE / 2, right: -HANDLE_SIZE / 2 }, cursor: "ne-resize" },
  { key: "ml", side: "left",  style: { top: "50%", left: -HANDLE_SIZE / 2, transform: "translateY(-50%)" }, cursor: "w-resize" },
  { key: "mr", side: "right", style: { top: "50%", right: -HANDLE_SIZE / 2, transform: "translateY(-50%)" }, cursor: "e-resize" },
  { key: "bl", side: "left",  style: { bottom: -HANDLE_SIZE / 2, left: -HANDLE_SIZE / 2 }, cursor: "sw-resize" },
  { key: "bc", side: null,    style: { bottom: -HANDLE_SIZE / 2, left: "50%", transform: "translateX(-50%)" }, cursor: "s-resize" },
  { key: "br", side: "right", style: { bottom: -HANDLE_SIZE / 2, right: -HANDLE_SIZE / 2 }, cursor: "se-resize" },
];

type Block = {
  id: string;
  content: string;
  x: number;
  width: number;
  color: string;
  className: string;
};

const INITIAL_BLOCKS: Block[] = [
  {
    id: "eyebrow",
    content: "Futuro dos Negócios",
    x: 0, width: 500, color: "#5FC318",
    className: "font-mono text-[24px] font-bold uppercase tracking-[0.1em] leading-none min-h-[1em]",
  },
  {
    id: "title",
    content: "O mercado está se movendo. A pergunta é: a sua empresa está se movendo junto?",
    x: 0, width: 1200, color: "#000000",
    className: "text-[80px] font-extrabold leading-[0.88] min-h-[1em]",
  },
  {
    id: "subtitle",
    content: "Empreendedorismo, transformação e inovação aplicada ao contexto brasileiro.",
    x: 0, width: 900, color: "#474747",
    className: "text-[26px] font-medium leading-[1.3] min-h-[1em]",
  },
  {
    id: "body1",
    content: "Empresas que combinam contexto local, tecnologia acessível e execução disciplinada definem o próximo ciclo de crescimento.",
    x: 0, width: 1060, color: "#1F1F1F",
    className: "text-[20px] leading-[1.5] min-h-[1em]",
  },
  {
    id: "body2",
    content: "A diferença não está em ter mais recursos. Está em tomar decisões com mais clareza e executar com mais consistência.",
    x: 0, width: 1060, color: "#474747",
    className: "text-[20px] leading-[1.5] min-h-[1em]",
  },
  {
    id: "quote",
    content: "Contexto local + tecnologia acessível + execução disciplinada.",
    x: 0, width: 1100, color: "#5FC318",
    className: "font-mono text-[28px] font-bold leading-[1.2] min-h-[1em]",
  },
];

function loadBlocks(): Block[] {
  try {
    if (typeof window === "undefined") return INITIAL_BLOCKS;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved) as Block[];
  } catch {}
  return INITIAL_BLOCKS;
}

export function EditableDocument() {
  const [blocks, setBlocks] = useState<Block[]>(() => loadBlocks());
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [innerHeight, setInnerHeight] = useState(0);

  const viewportRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Set innerHTML on mount (preserves HTML color spans from localStorage)
  useEffect(() => {
    blocks.forEach((b) => {
      const el = blockRefs.current[b.id];
      if (el) el.innerHTML = b.content;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scale observer
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale((entry?.contentRect.width ?? CANVAS_W) / CANVAS_W);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Inner height observer for correct outer div sizing
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setInnerHeight(entry?.contentRect.height ?? 0);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const outerHeight = innerHeight * scale;

  // Width resize via drag handles
  const onHandleMouseDown = (
    e: React.MouseEvent,
    block: Block,
    side: HandleSide
  ) => {
    if (!side) return;
    e.stopPropagation();
    e.preventDefault();

    const startX = e.clientX;
    const startBlockX = block.x;
    const startWidth = block.width;

    const onMove = (ev: MouseEvent) => {
      const dx = (ev.clientX - startX) / scale;
      setBlocks((prev) =>
        prev.map((b) => {
          if (b.id !== block.id) return b;
          if (side === "right") {
            return { ...b, width: Math.max(100, startWidth + dx) };
          }
          const newWidth = Math.max(100, startWidth - dx);
          return { ...b, x: Math.max(0, startBlockX + (startWidth - newWidth)), width: newWidth };
        })
      );
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  // Apply color to current text selection
  const applyColor = (hex: string) => {
    document.execCommand("styleWithCSS", false, "true");
    document.execCommand("foreColor", false, hex);
  };

  const save = () => {
    const saved = blocks.map((b) => ({
      ...b,
      content: blockRefs.current[b.id]?.innerHTML ?? b.content,
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    setBlocks(saved);
  };

  const reset = () => {
    setBlocks(INITIAL_BLOCKS);
    INITIAL_BLOCKS.forEach((b) => {
      const el = blockRefs.current[b.id];
      if (el) el.innerHTML = b.content;
    });
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="flex items-start gap-4">
      {/* Toolbar */}
      <div
        className="flex w-[100px] shrink-0 flex-col gap-3 rounded-[10px] bg-white p-3 shadow-[var(--shadow-card)]"
        style={{ minHeight: outerHeight > 0 ? outerHeight : 200 }}
      >
        <button
          onClick={() => {
            if (isEditing) save();
            setIsEditing((v) => !v);
            setSelectedId(null);
          }}
          className={`w-full rounded-[6px] px-2 py-[8px] text-[10px] font-bold uppercase tracking-wider transition-colors ${
            isEditing
              ? "bg-black text-white"
              : "bg-[#ECECEC] text-black hover:bg-black hover:text-white"
          }`}
        >
          {isEditing ? "Salvar" : "Editar"}
        </button>

        {isEditing && (
          <>
            <div className="h-px bg-[#ECECEC]" />
            <p className="text-[9px] font-bold uppercase tracking-wider text-[#8A8A8A]">Cor</p>
            <div className="grid grid-cols-3 gap-[4px]">
              {BRAND_COLORS.map((c) => (
                <button
                  key={c.hex}
                  title={c.label}
                  onMouseDown={(e) => {
                    e.preventDefault(); // keep text selection alive
                    applyColor(c.hex);
                  }}
                  style={{
                    width: 24,
                    height: 24,
                    background: c.hex,
                    border: c.hex === "#FFFFFF" ? "1px solid #D4D4D4" : "1px solid transparent",
                    borderRadius: 4,
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
            <div className="h-px bg-[#ECECEC]" />
            <button
              onClick={reset}
              className="w-full rounded-[6px] bg-[#ECECEC] px-2 py-[8px] text-[10px] font-bold uppercase tracking-wider text-[#8A8A8A] transition-colors hover:bg-[#D4D4D4]"
            >
              Reset
            </button>
          </>
        )}
      </div>

      {/* Canvas */}
      <div
        ref={viewportRef}
        className="relative flex-1 overflow-hidden"
        style={{ height: outerHeight > 0 ? outerHeight : undefined, minHeight: 200 }}
      >
        <div
          ref={innerRef}
          className="w-[1600px] origin-top-left bg-white shadow-[var(--shadow-card)]"
          style={{ transform: `scale(${scale})` }}
          onClick={() => setSelectedId(null)}
        >
          <div className="flex flex-col gap-[48px]" style={{ padding: CANVAS_PAD }}>
            {blocks.map((block) => {
              const isSelected = isEditing && selectedId === block.id;
              return (
                <div
                  key={block.id}
                  className="relative"
                  style={{ marginLeft: block.x, width: block.width, color: block.color }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isEditing) setSelectedId(block.id);
                  }}
                >
                  {/* Selection outline */}
                  {isSelected && (
                    <div
                      className="pointer-events-none absolute rounded-[3px]"
                      style={{ inset: -8, border: "1.5px solid #5FC318" }}
                    />
                  )}

                  {/* 8 resize handles */}
                  {isSelected &&
                    HANDLES.map((h) => (
                      <div
                        key={h.key}
                        className="absolute z-10 rounded-[2px] bg-white"
                        style={{
                          ...h.style,
                          width: HANDLE_SIZE,
                          height: HANDLE_SIZE,
                          border: "1.5px solid #5FC318",
                          cursor: h.cursor,
                        }}
                        onMouseDown={
                          h.side ? (e) => onHandleMouseDown(e, block, h.side) : undefined
                        }
                      />
                    ))}

                  {/* Editable text — innerHTML managed via ref, not React */}
                  <div
                    ref={(el) => { blockRefs.current[block.id] = el; }}
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    className={`outline-none ${block.className}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
