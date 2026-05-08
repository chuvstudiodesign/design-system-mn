# 03 — Modelo de Dados e Camada de Tradução

## Princípio

O editor trabalha diretamente com `CommercialPresentation` e `CommercialSlide` de `src/data/commercial-presentations/types.ts`. Não existe um modelo separado de "EditorDocument" com layers livres.

## Tipos existentes (não alterar)

```typescript
// src/data/commercial-presentations/types.ts — READONLY, não modificar

export type CommercialSlideType =
  | 'cover' | 'statement' | 'context' | 'problem' | 'behavior'
  | 'opportunity' | 'stats' | 'framework' | 'principle' | 'example'
  | 'leaders' | 'decision' | 'concept' | 'turning-point' | 'action-plan'
  | 'benefits' | 'risks' | 'recommendations' | 'cta' | 'closing'

export interface CommercialSlide {
  id: string
  type: CommercialSlideType
  visual: CommercialSlideVisual
  title: string
  subtitle?: string
  eyebrow?: string
  body?: string
  quote?: string
  bullets?: string[]
  stats?: SlideStatItem[]
  cards?: SlideCardItem[]
  chart?: SlideChart
  footer?: string
  imageDirection?: 'left' | 'right'
  imageSrc?: string
  imageAlt?: string
}

export interface CommercialPresentation {
  id: string
  slug: string
  title: string
  subtitle?: string
  description?: string
  theme: string
  style: string
  useCase: string
  accent: string      // cor principal, ex: '#5FC318'
  darkAccent: string  // cor escura, ex: '#0C1C16'
  tags: string[]
  slides: CommercialSlide[]
}
```

## Tipos do editor (criar em `types.ts`)

```typescript
// src/components/commercial-presentations/editor/types.ts

import type { CommercialSlide, CommercialPresentation } from '@/data/commercial-presentations/types'

// Identificação de um campo editável de um slide
export interface FieldSelection {
  slideIndex: number
  field: EditableField
  subIndex?: number  // para bullets[], stats[], cards[]
}

// Campos editáveis por slide (todos os string/primitivos do CommercialSlide)
export type EditableField =
  | 'title'
  | 'subtitle'
  | 'eyebrow'
  | 'body'
  | 'quote'
  | 'footer'
  | 'bullets'       // bullets[subIndex]
  | 'stats'         // stats[subIndex].value ou .label
  | 'cards'         // cards[subIndex].title ou .description
  | 'imageSrc'
  | 'imageDirection'

export type EditorTool = 'select' | 'text' | 'image' | 'pan'

// Região no canvas 1600×900 de um campo editável
// Obtida via slideGeometry.ts
export interface FieldRect {
  field: EditableField
  subIndex?: number
  x: number
  y: number
  width: number
  height: number
  label: string  // nome amigável para o inspetor
}

// Estado do viewport
export interface ViewportState {
  zoom: number        // 0.1 a 2.0, padrão = fit to screen
  panX: number        // offset do canvas no container
  panY: number
}

// Um snapshot para undo/redo
export interface HistorySnapshot {
  slides: CommercialSlide[]  // deep clone dos slides naquele momento
  activeSlideIndex: number
}

// Estado completo do editor
export interface EditorState {
  presentation: CommercialPresentation
  originalSlides: CommercialSlide[]   // cópia imutável para reset
  activeSlideIndex: number
  tool: EditorTool
  selection: FieldSelection | null
  viewport: ViewportState
  isDirty: boolean
  lastSaved: Date | null
}
```

## Mapeamento campo → tipo de editor (fieldMap.ts)

Cada tipo de slide tem um conjunto diferente de campos visíveis e editáveis:

```typescript
// src/components/commercial-presentations/editor/utils/fieldMap.ts

import type { CommercialSlideType, EditableField } from '../types'

interface FieldConfig {
  field: EditableField
  label: string
  editorType: 'text' | 'textarea' | 'bullets' | 'stats' | 'cards' | 'image' | 'direction'
  maxLength?: number
  placeholder?: string
}

const COMMON_FIELDS: FieldConfig[] = [
  { field: 'eyebrow', label: 'Eyebrow', editorType: 'text', maxLength: 40 },
  { field: 'title', label: 'Título', editorType: 'text', maxLength: 120 },
  { field: 'body', label: 'Corpo', editorType: 'textarea', maxLength: 400 },
  { field: 'footer', label: 'Rodapé', editorType: 'text', maxLength: 80 },
]

export const FIELD_MAP: Record<CommercialSlideType, FieldConfig[]> = {
  cover: [
    { field: 'eyebrow', label: 'Eyebrow', editorType: 'text', maxLength: 40 },
    { field: 'title', label: 'Título principal', editorType: 'text', maxLength: 80 },
    { field: 'subtitle', label: 'Subtítulo', editorType: 'textarea', maxLength: 200 },
    { field: 'bullets', label: 'Tags', editorType: 'bullets', maxLength: 30 },
    { field: 'imageSrc', label: 'Imagem', editorType: 'image' },
    { field: 'imageDirection', label: 'Lado da imagem', editorType: 'direction' },
    { field: 'footer', label: 'Rodapé', editorType: 'text', maxLength: 80 },
  ],
  statement: [
    { field: 'eyebrow', label: 'Eyebrow', editorType: 'text', maxLength: 40 },
    { field: 'title', label: 'Afirmação', editorType: 'text', maxLength: 120 },
    { field: 'quote', label: 'Citação/destaque', editorType: 'textarea', maxLength: 200 },
    { field: 'body', label: 'Corpo', editorType: 'textarea', maxLength: 400 },
    { field: 'imageSrc', label: 'Imagem', editorType: 'image' },
  ],
  stats: [
    ...COMMON_FIELDS,
    { field: 'stats', label: 'Estatísticas', editorType: 'stats' },
  ],
  framework: [
    ...COMMON_FIELDS,
    { field: 'cards', label: 'Quadrantes', editorType: 'cards' },
  ],
  leaders: [
    ...COMMON_FIELDS,
    { field: 'cards', label: 'Cards', editorType: 'cards' },
  ],
  closing: [
    { field: 'eyebrow', label: 'Eyebrow', editorType: 'text', maxLength: 40 },
    { field: 'title', label: 'Título final', editorType: 'text', maxLength: 80 },
    { field: 'body', label: 'Corpo', editorType: 'textarea', maxLength: 300 },
    { field: 'quote', label: 'Citação', editorType: 'textarea', maxLength: 200 },
  ],
  // ... repetir para todos os 20 tipos
  // Padrão para types sem configuração específica:
  context:      [...COMMON_FIELDS, { field: 'imageSrc', label: 'Imagem', editorType: 'image' }],
  problem:      [...COMMON_FIELDS, { field: 'imageSrc', label: 'Imagem', editorType: 'image' }],
  behavior:     [...COMMON_FIELDS, { field: 'imageSrc', label: 'Imagem', editorType: 'image' }],
  opportunity:  [...COMMON_FIELDS, { field: 'imageSrc', label: 'Imagem', editorType: 'image' }],
  principle:    [...COMMON_FIELDS],
  example:      [...COMMON_FIELDS, { field: 'imageSrc', label: 'Imagem', editorType: 'image' }],
  decision:     [...COMMON_FIELDS, { field: 'cards', label: 'Quadrantes', editorType: 'cards' }],
  concept:      [...COMMON_FIELDS],
  'turning-point': [...COMMON_FIELDS],
  'action-plan': [...COMMON_FIELDS, { field: 'cards', label: 'Cards', editorType: 'cards' }],
  benefits:     [...COMMON_FIELDS, { field: 'cards', label: 'Cards', editorType: 'cards' }],
  risks:        [...COMMON_FIELDS, { field: 'stats', label: 'Riscos', editorType: 'stats' }],
  recommendations: [...COMMON_FIELDS, { field: 'cards', label: 'Cards', editorType: 'cards' }],
  cta:          [...COMMON_FIELDS],
}
```

## Camada de persistência

### Formato salvo em localStorage

```typescript
interface LocalStoragePayload {
  version: '2.0'
  savedAt: string  // ISO date
  presentation: CommercialPresentation
  activeSlideIndex: number
}
```

### Migração do formato legacy (v1)

O editor antigo salvava `EditorDocument` em `STORAGE_KEY = 'editable-document-v1'`.

```typescript
// utils/migrateStorage.ts
export function loadFromStorage(slug: string): CommercialPresentation | null {
  const key = `editor-presentation-${slug}`
  const raw = localStorage.getItem(key)
  if (!raw) return null
  
  try {
    const payload = JSON.parse(raw) as LocalStoragePayload
    if (payload.version !== '2.0') return null  // ignora formato antigo
    return payload.presentation
  } catch {
    return null
  }
}
```

### Chave de localStorage por apresentação

```typescript
const STORAGE_KEY = (slug: string) => `editor-presentation-${slug}`
// Ex: 'editor-presentation-futuro-negocios-brasil'
```

## Inicialização do editor

```typescript
// useEditorState.ts — inicialização

function initState(presentation: CommercialPresentation): EditorState {
  // Tenta carregar do localStorage primeiro
  const saved = loadFromStorage(presentation.slug)
  const activePres = saved ?? presentation
  
  return {
    presentation: activePres,
    originalSlides: structuredClone(presentation.slides),  // cópia imutável
    activeSlideIndex: 0,
    tool: 'select',
    selection: null,
    viewport: { zoom: 1, panX: 0, panY: 0 },
    isDirty: saved !== null,
    lastSaved: null,
  }
}
```

## Immutabilidade nas mutations

Todas as mutations usam `structuredClone` para garantir que o history stack funcione:

```typescript
function updateField(
  state: EditorState,
  slideIndex: number,
  field: keyof CommercialSlide,
  value: unknown
): EditorState {
  const slides = structuredClone(state.presentation.slides)
  slides[slideIndex] = { ...slides[slideIndex], [field]: value }
  return {
    ...state,
    presentation: { ...state.presentation, slides },
    isDirty: true,
  }
}
```
