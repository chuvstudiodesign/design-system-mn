# 02 — Arquitetura do Sistema

## Visão geral

O editor é um segundo modo de visualização dos mesmos slides. Ele usa os mesmos componentes de renderização do viewer (`PresentationSlide`, `SlideCover`, `SlideSplit`, etc.) e adiciona uma camada de interação por cima.

```
┌─────────────────────────────────────────────────────────────────┐
│  CommercialPresentationsPage                                     │
│  ┌─────────────────────────────┐  ┌──────────────────────────┐  │
│  │  SEÇÃO 1: VIEWER (readonly) │  │  SEÇÃO 2: EDITOR         │  │
│  │                             │  │                          │  │
│  │  PresentationCarousel       │  │  EditorRoot              │  │
│  │  └─ SlideViewport           │  │  ├─ EditorToolbar        │  │
│  │     └─ PresentationSlide    │  │  ├─ EditorSlidePanel     │  │
│  │        └─ SlideCover etc.   │  │  ├─ EditorCanvas         │  │
│  │                             │  │  │  ├─ PresentationSlide │  │
│  └─────────────────────────────┘  │  │  └─ EditorOverlay     │  │
│                                    │  └─ EditorPropsPanel     │  │
│                                    └──────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Princípio de renderização

O `EditorCanvas` renderiza dois elementos sobrepostos via `position: absolute`:

```
┌─────────────────────────────────┐
│  div.editor-canvas-wrapper      │  ← position: relative, overflow: hidden
│  ┌─────────────────────────────┐│
│  │  PresentationSlide (real)   ││  ← pointer-events: none, scale(scaleX)
│  │  (chanfro, gradients, tudo) ││
│  └─────────────────────────────┘│
│  ┌─────────────────────────────┐│
│  │  EditorOverlay (SVG)        ││  ← position: absolute, top: 0, left: 0
│  │  (handles, selection boxes) ││    pointer-events: all
│  └─────────────────────────────┘│
└─────────────────────────────────┘
```

**Por que SVG para o overlay?**
- Math de transform (escala) é mais preciso em SVG
- Handles circulares e retangulares são triviais com `<circle>` e `<rect>`
- Não há conflito de stacking context com o slide abaixo
- Drag de handle usa `onMouseMove` no SVG root, não no handle individual

## Árvore de componentes completa

```
EditorRoot                          ← use client, contém EditorContext
├─ EditorToolbar                    ← barra superior com ferramentas
│  ├─ ToolButton (select)
│  ├─ ToolButton (text)
│  ├─ ToolButton (image)
│  ├─ Separator
│  ├─ HistoryButtons (undo, redo)
│  ├─ Separator
│  ├─ ZoomControls (-, %, +, fit)
│  └─ ActionButtons (save, reset, export)
│
├─ div.editor-body (flex-row, flex-1)
│  ├─ EditorSlidePanel              ← painel esquerdo, lista de slides
│  │  └─ SlideThumbnail[] (20)      ← miniatura com PresentationSlide escalado
│  │
│  ├─ EditorCanvas                  ← área central com scroll/pan
│  │  └─ div.canvas-viewport        ← escala e centra o canvas 1600×900
│  │     ├─ PresentationSlide       ← componente real (pointer-events: none)
│  │     └─ EditorOverlay           ← SVG overlay (pointer-events: all)
│  │        ├─ SelectionBox[]       ← retângulos de seleção
│  │        └─ ResizeHandle[]       ← handles de resize (8 por seleção)
│  │
│  └─ EditorPropertiesPanel         ← painel direito
│     ├─ SlideMetaSection           ← título do deck, eyebrow, tema
│     └─ FieldEditor                ← campos do slide ativo
│        ├─ TextField               ← para title, subtitle, body, etc.
│        ├─ BulletListField         ← para bullets[]
│        ├─ StatsField              ← para stats[]
│        ├─ CardsField              ← para cards[]
│        └─ ImageField              ← para imageSrc, imageDirection
│
└─ EditorStatusBar                  ← barra inferior: zoom %, coords, status save
```

## Fluxo de dados

```
Usuário clica em campo
         │
         ▼
EditorOverlay detecta hit test
         │
         ▼
useEditorState.setSelection({ fieldKey, slideIndex })
         │
         ▼
EditorPropertiesPanel renderiza FieldEditor correto
         │
         ▼
Usuário edita valor
         │
         ▼
useEditorState.updateField(slideIndex, fieldKey, value)
         │
         ▼
EditorContext atualiza presentation.slides[i][fieldKey]
         │
         ▼
PresentationSlide re-renderiza com novo valor
         │  (mesma sessão, mesmos dados)
         ▼
useHistory.push(snapshot)
         │
         ▼
autosave → localStorage (debounced 1s)
```

## Estado global: EditorContext

```typescript
// src/components/commercial-presentations/editor/context/EditorContext.tsx

interface EditorContextValue {
  // Dados
  presentation: CommercialPresentation
  
  // UI state
  activeSlideIndex: number
  tool: 'select' | 'text' | 'image' | 'pan'
  selection: FieldSelection | null
  zoom: number
  
  // Ações
  setActiveSlide: (index: number) => void
  setTool: (tool: EditorTool) => void
  setSelection: (sel: FieldSelection | null) => void
  updateField: (slideIndex: number, field: keyof CommercialSlide, value: unknown) => void
  updateBullet: (slideIndex: number, bulletIndex: number, value: string) => void
  updateStat: (slideIndex: number, statIndex: number, stat: Partial<SlideStatItem>) => void
  updateCard: (slideIndex: number, cardIndex: number, card: Partial<SlideCardItem>) => void
  
  // Historia
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
  
  // Persistência
  save: () => Promise<void>
  reset: () => void
  isDirty: boolean
  lastSaved: Date | null
  
  // Viewport
  setZoom: (zoom: number) => void
  fitToScreen: () => void
}
```

## Arquivos a criar

```
src/components/commercial-presentations/editor/
├─ EditorRoot.tsx
├─ EditorToolbar.tsx
├─ EditorCanvas.tsx
├─ EditorOverlay.tsx
├─ EditorSlidePanel.tsx
├─ EditorPropertiesPanel.tsx
├─ EditorStatusBar.tsx
├─ context/
│  └─ EditorContext.tsx
├─ fields/
│  ├─ TextField.tsx
│  ├─ BulletListField.tsx
│  ├─ StatsField.tsx
│  ├─ CardsField.tsx
│  └─ ImageField.tsx
├─ hooks/
│  ├─ useEditorState.ts
│  ├─ useHistory.ts
│  ├─ useViewport.ts
│  ├─ useSelection.ts
│  └─ useAutosave.ts
├─ utils/
│  ├─ fieldMap.ts
│  ├─ hitTest.ts
│  └─ slideGeometry.ts
└─ types.ts
```

## Arquivo a substituir (NÃO deletar ainda, renomear)

`EditablePresentationEditor.tsx` → `EditablePresentationEditor.legacy.tsx`

O `CommercialPresentationsPage.tsx` deve ser atualizado para importar `EditorRoot` em vez de `EditablePresentationEditor`.

## Separação de responsabilidades

| Componente | Responsabilidade |
|---|---|
| `EditorRoot` | Provedores de contexto, layout geral |
| `EditorCanvas` | Escala do canvas, scroll, eventos de mouse base |
| `EditorOverlay` | Hit test, seleção, handles de resize, drag |
| `EditorToolbar` | Ferramentas ativas, undo/redo, zoom, save |
| `EditorSlidePanel` | Lista de slides, navegação, reordenação futura |
| `EditorPropertiesPanel` | Edição de campos baseada na seleção atual |
| `useEditorState` | Estado central, mutations |
| `useHistory` | Stack de undo/redo |
| `useViewport` | Zoom, pan, escala |
| `useSelection` | Estado de seleção de campo |
| `useAutosave` | Debounce + localStorage |
| `fieldMap.ts` | Mapeamento slideType → quais campos são editáveis |
| `hitTest.ts` | Dado coordenadas do click, qual campo foi clicado |
| `slideGeometry.ts` | Rects dos campos em coordenadas do canvas 1600×900 |
