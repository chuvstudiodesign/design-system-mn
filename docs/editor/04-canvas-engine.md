# 04 — Canvas Engine: Renderização, Escala e Viewport

## Dimensões canônicas

O slide sempre tem **1600×900** pixels (proporção 16:9). Toda coordenada no editor usa esse sistema.

```typescript
export const CANVAS_W = 1600
export const CANVAS_H = 900
```

## Como a escala funciona

O canvas é escalado via `transform: scale(factor)` a partir do canto superior esquerdo (`transform-origin: 0 0`).

```
canvas de 1600×900 → escalado para caber no container disponível
factor = containerWidth / 1600
altura visual = 900 * factor
```

O `EditorCanvas` usa `ResizeObserver` para detectar mudanças no container e recalcular o fator:

```typescript
// EditorCanvas.tsx
function EditorCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const { zoom } = useViewport()

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width
      const h = entry.contentRect.height
      // Fit: menor entre fit-width e fit-height
      const scaleW = w / CANVAS_W
      const scaleH = h / CANVAS_H
      const fitScale = Math.min(scaleW, scaleH) * 0.92  // 8% de margin
      setScale(fitScale * zoom)
    })
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [zoom])

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-hidden bg-[#D4D4D4] flex items-center justify-center"
    >
      {/* wrapper define o espaço visual do canvas */}
      <div
        style={{
          width: CANVAS_W * scale,
          height: CANVAS_H * scale,
          position: 'relative',
          flexShrink: 0,
        }}
      >
        {/* slide real — pointer-events desligado */}
        <div
          style={{
            width: CANVAS_W,
            height: CANVAS_H,
            transform: `scale(${scale})`,
            transformOrigin: '0 0',
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <PresentationSlide slide={activeSlide} presentation={presentation} />
        </div>

        {/* overlay SVG — recebe eventos */}
        <EditorOverlay
          scale={scale}
          slide={activeSlide}
          slideIndex={activeSlideIndex}
        />
      </div>
    </div>
  )
}
```

## Conversão de coordenadas

Eventos de mouse chegam em coordenadas da tela (screen space). Precisamos converter para o espaço do canvas (1600×900):

```typescript
// utils/coords.ts

export function screenToCanvas(
  event: React.MouseEvent,
  wrapperRef: React.RefObject<HTMLDivElement>,
  scale: number
): { x: number; y: number } {
  const rect = wrapperRef.current!.getBoundingClientRect()
  return {
    x: (event.clientX - rect.left) / scale,
    y: (event.clientY - rect.top) / scale,
  }
}

export function canvasToScreen(
  point: { x: number; y: number },
  wrapperRef: React.RefObject<HTMLDivElement>,
  scale: number
): { x: number; y: number } {
  const rect = wrapperRef.current!.getBoundingClientRect()
  return {
    x: point.x * scale + rect.left,
    y: point.y * scale + rect.top,
  }
}
```

## O SVG Overlay

O overlay é um SVG que ocupa 100% do wrapper (em coordenadas de tela, com viewBox no espaço do canvas):

```tsx
// EditorOverlay.tsx — estrutura base

function EditorOverlay({ scale, slide, slideIndex }: OverlayProps) {
  const { selection, tool } = useEditorContext()
  const svgRef = useRef<SVGSVGElement>(null)

  // O viewBox usa o espaço canvas (1600×900) mas o SVG ocupa o espaço da tela
  // Assim, qualquer coordenada que calcularmos em espaço canvas
  // funciona diretamente nos elementos SVG
  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: CANVAS_W * scale,
        height: CANVAS_H * scale,
        overflow: 'visible',
        cursor: cursorForTool(tool),
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Retângulos de highlight dos campos editáveis (hover) */}
      {hoveredField && <FieldHighlight field={hoveredField} />}
      
      {/* Seleção atual */}
      {selection && <SelectionBox selection={selection} />}
      
      {/* Handles de resize (apenas para campos de imagem) */}
      {selection?.field === 'imageSrc' && (
        <ResizeHandles selection={selection} />
      )}
    </svg>
  )
}
```

## Zoom controls

```typescript
// useViewport.ts

const ZOOM_STEPS = [0.25, 0.33, 0.5, 0.67, 0.75, 0.8, 0.9, 1.0, 1.1, 1.25, 1.5, 2.0]

export function useViewport() {
  const [zoom, setZoomRaw] = useState(1)

  function zoomIn() {
    setZoomRaw(z => {
      const next = ZOOM_STEPS.find(s => s > z)
      return next ?? ZOOM_STEPS[ZOOM_STEPS.length - 1]
    })
  }

  function zoomOut() {
    setZoomRaw(z => {
      const prev = [...ZOOM_STEPS].reverse().find(s => s < z)
      return prev ?? ZOOM_STEPS[0]
    })
  }

  function setZoomPercent(percent: number) {
    setZoomRaw(Math.max(0.1, Math.min(2.0, percent / 100)))
  }

  return { zoom, zoomIn, zoomOut, setZoomPercent }
}
```

## Thumbnails no painel de slides

Os thumbnails usam a mesma técnica de escala, mas com fator muito menor (~0.12 para caber em ~192px de largura):

```tsx
// SlideThumbnail.tsx
function SlideThumbnail({ slide, presentation, isActive, onClick }: Props) {
  const THUMB_W = 192
  const thumbScale = THUMB_W / CANVAS_W  // ≈ 0.12

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative rounded overflow-hidden border-2 flex-shrink-0',
        isActive ? 'border-[#5FC318]' : 'border-transparent hover:border-[#5FC318]/40'
      )}
      style={{ width: THUMB_W, height: THUMB_W * (9/16) }}
    >
      <div
        style={{
          width: CANVAS_W,
          height: CANVAS_H,
          transform: `scale(${thumbScale})`,
          transformOrigin: '0 0',
          pointerEvents: 'none',
        }}
      >
        <PresentationSlide slide={slide} presentation={presentation} />
      </div>
    </button>
  )
}
```

**Atenção**: renderizar 20 thumbnails pode ser pesado. Usar `React.memo` e `will-change: transform` nos thumbnails. Considerar `content-visibility: auto` para os que estão fora do scroll.

## Background do canvas

O background da área de edição segue o token de nível 0 do sistema de elevação:

```
background: var(--elevation-0, #D4D4D4)
```

O slide em si tem seu próprio background (branco, dark green, gradiente — dependendo do tipo).

## Evitar re-renders desnecessários

O `PresentationSlide` dentro do canvas só deve re-renderizar quando o slide ativo muda. Usar `React.memo`:

```typescript
const MemoizedSlide = React.memo(PresentationSlide, (prev, next) => {
  return JSON.stringify(prev.slide) === JSON.stringify(next.slide)
})
```

Ou melhor: implementar comparação por campo usando `useMemo` para o objeto `slide` no estado do editor.
