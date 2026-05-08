# 05 — Sistema de Seleção e Handles de Resize

## Conceito central: campos editáveis têm regiões no canvas

Cada campo do slide (`title`, `body`, `imageSrc`, etc.) ocupa uma região específica no canvas 1600×900. O sistema de seleção funciona assim:

1. `slideGeometry.ts` retorna os `FieldRect[]` para o slide atual
2. Quando o mouse move sobre o overlay SVG, o `hitTest.ts` encontra qual campo está sob o cursor
3. Esse campo é highlighted com um retângulo azul semitransparente
4. Ao clicar, o campo é selecionado e o painel direito mostra o editor correto
5. Para campos de imagem: handles de resize aparecem nos 8 pontos do bounding box

## slideGeometry.ts — regiões dos campos

Este é o arquivo mais complexo do sistema. Ele retorna as regiões dos campos para cada tipo de slide.

As regiões são derivadas do layout real dos componentes. Infelizmente, o React DOM não expõe os bounding boxes antes do render. Por isso, as regiões são **definidas manualmente** com base na análise dos layouts em `slide-layouts/*.tsx`.

```typescript
// utils/slideGeometry.ts

import type { CommercialSlide } from '@/data/commercial-presentations/types'
import type { FieldRect } from '../types'
import { CANVAS_W, CANVAS_H } from '../constants'

// Padding padrão dos slides (70px em 1600px = 4.375%)
const PAD = 70
const INNER_W = CANVAS_W - PAD * 2  // 1460
const INNER_H = CANVAS_H - PAD * 2  // 760

// SlideSplit: grid [0.92fr 1.08fr] com gap 7%
// Esquerda: 0 a 46% do INNER_W
// Direita: 54% do INNER_W a 100%
const SPLIT_LEFT_W = Math.round(INNER_W * 0.92 / 2)
const SPLIT_RIGHT_X = PAD + Math.round(INNER_W * 0.54)
const SPLIT_RIGHT_W = INNER_W - Math.round(INNER_W * 0.54)

export function getFieldRects(slide: CommercialSlide): FieldRect[] {
  switch (slide.type) {
    case 'cover':
      return getCoverRects(slide)
    case 'statement':
    case 'principle':
    case 'turning-point':
      return getStatementRects(slide)
    case 'stats':
    case 'risks':
      return getStatsRects(slide)
    case 'framework':
    case 'decision':
      return getFrameworkRects(slide)
    case 'leaders':
    case 'action-plan':
    case 'benefits':
    case 'recommendations':
      return getCardsRects(slide)
    case 'closing':
      return getClosingRects(slide)
    default:
      return getSplitRects(slide)
  }
}

function getCoverRects(slide: CommercialSlide): FieldRect[] {
  // SlideCover padrão (não futuro-negocios-brasil special):
  // Grid 2 cols [1.05fr 0.95fr]
  const leftW = Math.round(INNER_W * 1.05 / 2)
  const rightX = PAD + leftW + 40  // gap de ~40px
  const rightW = INNER_W - leftW - 40

  return [
    {
      field: 'eyebrow',
      x: PAD, y: PAD + 80, width: leftW, height: 30,
      label: 'Eyebrow',
    },
    {
      field: 'title',
      x: PAD, y: PAD + 120, width: leftW, height: 180,
      label: 'Título',
    },
    {
      field: 'subtitle',
      x: PAD, y: PAD + 320, width: leftW, height: 80,
      label: 'Subtítulo',
    },
    {
      field: 'imageSrc',
      x: rightX, y: PAD, width: rightW, height: INNER_H,
      label: 'Imagem',
    },
    {
      field: 'footer',
      x: PAD, y: CANVAS_H - PAD - 30, width: INNER_W, height: 30,
      label: 'Rodapé',
    },
  ]
}

function getSplitRects(slide: CommercialSlide): FieldRect[] {
  // Coluna esquerda: eyebrow, title, body
  // Coluna direita: imagem ou gráfico
  return [
    {
      field: 'eyebrow',
      x: PAD, y: PAD + 40, width: SPLIT_LEFT_W, height: 25,
      label: 'Eyebrow',
    },
    {
      field: 'title',
      x: PAD, y: PAD + 80, width: SPLIT_LEFT_W, height: 160,
      label: 'Título',
    },
    {
      field: 'body',
      x: PAD, y: PAD + 260, width: SPLIT_LEFT_W, height: 200,
      label: 'Corpo',
    },
    {
      field: 'imageSrc',
      x: SPLIT_RIGHT_X, y: PAD, width: SPLIT_RIGHT_W, height: Math.round(INNER_H * 0.65),
      label: 'Imagem',
    },
    {
      field: 'footer',
      x: PAD, y: CANVAS_H - PAD - 30, width: INNER_W, height: 30,
      label: 'Rodapé',
    },
  ]
}

// ... implementar para cada tipo
```

**Nota importante**: os rects são aproximações baseadas na análise visual dos layouts. No futuro, uma abordagem mais robusta seria usar `getBoundingClientRect()` nos elementos reais após o render — mas isso requer referências aos elementos DOM, o que complica a arquitetura. As aproximações manuais são suficientes para o MVP.

## hitTest.ts

```typescript
// utils/hitTest.ts

import type { FieldRect } from '../types'

export function hitTest(
  x: number,
  y: number,
  rects: FieldRect[]
): FieldRect | null {
  // Testar do maior index para o menor (z-index implícito: último renderizado = acima)
  for (let i = rects.length - 1; i >= 0; i--) {
    const r = rects[i]
    if (x >= r.x && x <= r.x + r.width && y >= r.y && y <= r.y + r.height) {
      return r
    }
  }
  return null
}
```

## SelectionBox — retângulo de seleção no SVG

```tsx
// components/SelectionBox.tsx

const SELECTION_COLOR = '#5FC318'
const SELECTION_STROKE = 2

function SelectionBox({ rect }: { rect: FieldRect }) {
  return (
    <g pointerEvents="none">
      {/* Fundo semitransparente */}
      <rect
        x={rect.x}
        y={rect.y}
        width={rect.width}
        height={rect.height}
        fill={`${SELECTION_COLOR}18`}
        stroke={SELECTION_COLOR}
        strokeWidth={SELECTION_STROKE}
        rx={4}
      />
      {/* Label do campo */}
      <text
        x={rect.x + 6}
        y={rect.y - 6}
        fontSize={11}
        fill={SELECTION_COLOR}
        fontFamily="var(--font-sans)"
        fontWeight={600}
      >
        {rect.label}
      </text>
    </g>
  )
}
```

## ResizeHandles — apenas para campos de imagem

Os handles aparecem nos 8 pontos do bounding box da imagem.

```typescript
type HandlePosition =
  | 'nw' | 'n' | 'ne'
  | 'w'          | 'e'
  | 'sw' | 's' | 'se'

interface HandleDef {
  position: HandlePosition
  cx: (rect: FieldRect) => number  // centro X
  cy: (rect: FieldRect) => number  // centro Y
  cursor: string
}

const HANDLES: HandleDef[] = [
  { position: 'nw', cx: r => r.x, cy: r => r.y, cursor: 'nwse-resize' },
  { position: 'n',  cx: r => r.x + r.width / 2, cy: r => r.y, cursor: 'ns-resize' },
  { position: 'ne', cx: r => r.x + r.width, cy: r => r.y, cursor: 'nesw-resize' },
  { position: 'w',  cx: r => r.x, cy: r => r.y + r.height / 2, cursor: 'ew-resize' },
  { position: 'e',  cx: r => r.x + r.width, cy: r => r.y + r.height / 2, cursor: 'ew-resize' },
  { position: 'sw', cx: r => r.x, cy: r => r.y + r.height, cursor: 'nesw-resize' },
  { position: 's',  cx: r => r.x + r.width / 2, cy: r => r.y + r.height, cursor: 'ns-resize' },
  { position: 'se', cx: r => r.x + r.width, cy: r => r.y + r.height, cursor: 'nwse-resize' },
]

const HANDLE_RADIUS = 5  // em coordenadas canvas (escala junto com o canvas)
```

```tsx
function ResizeHandles({ rect, onDragStart }: Props) {
  return (
    <g>
      {HANDLES.map(h => (
        <circle
          key={h.position}
          cx={h.cx(rect)}
          cy={h.cy(rect)}
          r={HANDLE_RADIUS}
          fill="white"
          stroke="#5FC318"
          strokeWidth={1.5}
          style={{ cursor: h.cursor }}
          onMouseDown={e => {
            e.stopPropagation()
            onDragStart(h.position, rect)
          }}
        />
      ))}
    </g>
  )
}
```

## Lógica de drag do handle

```typescript
// useSelection.ts — drag de resize

interface ResizeDragState {
  handle: HandlePosition
  startRect: FieldRect
  startMouseX: number
  startMouseY: number
}

function applyResize(
  drag: ResizeDragState,
  currentX: number,
  currentY: number
): FieldRect {
  const dx = currentX - drag.startMouseX
  const dy = currentY - drag.startMouseY
  const { startRect: r, handle } = drag

  // Calcular novo rect baseado no handle
  let { x, y, width, height } = r

  if (handle.includes('e')) width = Math.max(50, r.width + dx)
  if (handle.includes('s')) height = Math.max(30, r.height + dy)
  if (handle.includes('w')) {
    x = r.x + dx
    width = Math.max(50, r.width - dx)
  }
  if (handle.includes('n')) {
    y = r.y + dy
    height = Math.max(30, r.height - dy)
  }

  return { ...r, x, y, width, height }
}
```

**Nota**: para imagens com aspect ratio preservado, usar apenas os handles de canto (nw, ne, sw, se) e calcular o redimensionamento proporcional.

## Highlight de hover (antes do clique)

Quando o mouse move sobre o canvas sem botão pressionado, mostrar um outline sutil:

```tsx
// No EditorOverlay:
const [hoveredRect, setHoveredRect] = useState<FieldRect | null>(null)

function handleMouseMove(e: React.MouseEvent<SVGSVGElement>) {
  if (isDragging) return  // não fazer hover durante drag
  const { x, y } = svgCoords(e)
  const rect = hitTest(x, y, fieldRects)
  setHoveredRect(rect)
}

// No JSX:
{hoveredRect && !isSelected(hoveredRect) && (
  <rect
    x={hoveredRect.x}
    y={hoveredRect.y}
    width={hoveredRect.width}
    height={hoveredRect.height}
    fill="transparent"
    stroke="#5FC31860"
    strokeWidth={1.5}
    strokeDasharray="4 3"
    rx={4}
    pointerEvents="none"
  />
)}
```

## Cursor por contexto

```typescript
function getCursor(tool: EditorTool, hovered: FieldRect | null): string {
  if (tool === 'pan') return 'grab'
  if (tool === 'text') return 'text'
  if (tool === 'image') return 'crosshair'
  
  // select tool
  if (!hovered) return 'default'
  if (hovered.field === 'imageSrc') return 'move'
  return 'text'
}
```
