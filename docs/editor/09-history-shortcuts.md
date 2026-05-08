# 09 — Histórico de Undo/Redo e Atalhos de Teclado

## useHistory — implementação do stack de histórico

```typescript
// hooks/useHistory.ts

import { useCallback, useRef, useState } from 'react'
import type { CommercialSlide } from '@/data/commercial-presentations/types'

interface HistorySnapshot {
  slides: CommercialSlide[]
  activeSlideIndex: number
}

const MAX_HISTORY = 50

export function useHistory(initialSnapshot: HistorySnapshot) {
  // Stack de estados passados
  const past = useRef<HistorySnapshot[]>([])
  // Stack de estados futuros (para redo)
  const future = useRef<HistorySnapshot[]>([])
  // Estado atual
  const [current, setCurrent] = useState<HistorySnapshot>(initialSnapshot)

  const push = useCallback((snapshot: HistorySnapshot) => {
    past.current = [...past.current.slice(-MAX_HISTORY + 1), current]
    future.current = []  // limpar redo ao fazer nova ação
    setCurrent(snapshot)
  }, [current])

  const undo = useCallback((): HistorySnapshot | null => {
    if (past.current.length === 0) return null
    const previous = past.current[past.current.length - 1]
    future.current = [current, ...future.current]
    past.current = past.current.slice(0, -1)
    setCurrent(previous)
    return previous
  }, [current])

  const redo = useCallback((): HistorySnapshot | null => {
    if (future.current.length === 0) return null
    const next = future.current[0]
    past.current = [...past.current, current]
    future.current = future.current.slice(1)
    setCurrent(next)
    return next
  }, [current])

  const reset = useCallback((snapshot: HistorySnapshot) => {
    past.current = []
    future.current = []
    setCurrent(snapshot)
  }, [])

  return {
    current,
    push,
    undo,
    redo,
    reset,
    canUndo: past.current.length > 0,
    canRedo: future.current.length > 0,
  }
}
```

## Quando fazer push no histórico

**Fazer push** após:
- Mudança em qualquer campo de texto (debounced 500ms — não a cada keystroke)
- Mudança de stat (value ou label)
- Mudança de card (title ou description)
- Mudança de bullet
- Mudança de imageSrc
- Mudança de imageDirection

**NÃO fazer push** para:
- Mudança de slide ativo (não é uma edição)
- Mudança de ferramenta
- Mudança de seleção (sem edição)
- Mudança de zoom/pan

### Debounce para campos de texto

```typescript
// No useEditorState, para campos de texto:
const debouncedPush = useDebouncedCallback((snapshot: HistorySnapshot) => {
  history.push(snapshot)
}, 500)

function updateTextField(slideIndex: number, field: keyof CommercialSlide, value: string) {
  const newState = applyUpdate(state, slideIndex, field, value)
  setState(newState)
  debouncedPush({
    slides: newState.presentation.slides,
    activeSlideIndex: newState.activeSlideIndex,
  })
}
```

Usar `useDebouncedCallback` do pacote `use-debounce` (verificar se já está no package.json) ou implementar com `useRef` + `setTimeout`.

## Integração com o contexto

O `EditorContext` expõe `undo`, `redo`, `canUndo`, `canRedo`. Internamente, `updateField` chama `history.push` após a mutation.

```typescript
// context/EditorContext.tsx — simplificado

const [state, setState] = useState(() => initState(initialPresentation))
const history = useHistory({ slides: state.presentation.slides, activeSlideIndex: 0 })

function updateField(slideIndex: number, field: keyof CommercialSlide, value: unknown) {
  const newSlides = structuredClone(state.presentation.slides)
  newSlides[slideIndex] = { ...newSlides[slideIndex], [field]: value }
  
  setState(prev => ({
    ...prev,
    presentation: { ...prev.presentation, slides: newSlides },
    isDirty: true,
  }))
  
  // push debounced para campos de texto, imediato para outros
  if (typeof value === 'string' && ['title', 'body', 'subtitle', 'eyebrow', 'quote', 'footer'].includes(String(field))) {
    debouncedPush({ slides: newSlides, activeSlideIndex: state.activeSlideIndex })
  } else {
    history.push({ slides: newSlides, activeSlideIndex: state.activeSlideIndex })
  }
}

function undo() {
  const snapshot = history.undo()
  if (!snapshot) return
  setState(prev => ({
    ...prev,
    presentation: { ...prev.presentation, slides: snapshot.slides },
    activeSlideIndex: snapshot.activeSlideIndex,
    isDirty: true,
  }))
}
```

## Tabela completa de atalhos de teclado

| Atalho | Ação | Contexto |
|---|---|---|
| `S` | Ferramenta Select | Canvas ativo |
| `T` | Ferramenta Text | Canvas ativo |
| `I` | Ferramenta Image | Canvas ativo |
| `H` | Ferramenta Pan | Canvas ativo |
| `Escape` | Deselecionar / Fechar dialog | Sempre |
| `Ctrl/Cmd + Z` | Desfazer | Sempre* |
| `Ctrl/Cmd + Shift + Z` | Refazer | Sempre* |
| `Ctrl/Cmd + Y` | Refazer | Sempre* |
| `Ctrl/Cmd + S` | Salvar no servidor | Sempre* |
| `Ctrl/Cmd + +` | Zoom in | Sempre* |
| `Ctrl/Cmd + -` | Zoom out | Sempre* |
| `Ctrl/Cmd + 0` | Fit to screen | Sempre* |
| `↑ / ↓` | Navegar entre slides | Quando canvas focado |
| `Tab` | Próximo campo no inspetor | Quando inspetor focado |
| `Shift + Tab` | Campo anterior | Quando inspetor focado |
| `Delete / Backspace` | Limpar campo selecionado | Quando campo de texto selecionado no canvas |

*"Sempre" = exceto quando usuário está digitando em input/textarea do inspetor

## Implementação dos atalhos

```typescript
// No EditorRoot, useEffect com window.addEventListener

useEffect(() => {
  function onKeyDown(e: KeyboardEvent) {
    const isMeta = e.metaKey || e.ctrlKey
    const isEditingText = (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      (e.target as HTMLElement)?.contentEditable === 'true'
    )

    // Atalhos que só funcionam fora de inputs
    if (!isEditingText) {
      switch (e.key.toLowerCase()) {
        case 's': setTool('select'); return
        case 't': setTool('text'); return
        case 'i': setTool('image'); return
        case 'h': setTool('pan'); return
        case 'escape': setSelection(null); return
        case 'arrowdown':
          e.preventDefault()
          setActiveSlide(Math.min(activeSlideIndex + 1, totalSlides - 1))
          return
        case 'arrowup':
          e.preventDefault()
          setActiveSlide(Math.max(activeSlideIndex - 1, 0))
          return
      }
    }

    // Atalhos com meta key (funcionam sempre exceto em inputs para Z/Y)
    if (isMeta) {
      switch (e.key.toLowerCase()) {
        case 'z':
          if (!isEditingText || !selection) {
            e.preventDefault()
            e.shiftKey ? redo() : undo()
          }
          return
        case 'y':
          if (!isEditingText) {
            e.preventDefault()
            redo()
          }
          return
        case 's':
          e.preventDefault()
          save()
          return
        case '=':
        case '+':
          e.preventDefault()
          zoomIn()
          return
        case '-':
          e.preventDefault()
          zoomOut()
          return
        case '0':
          e.preventDefault()
          fitToScreen()
          return
      }
    }
  }

  window.addEventListener('keydown', onKeyDown)
  return () => window.removeEventListener('keydown', onKeyDown)
}, [tool, activeSlideIndex, selection, canUndo, canRedo])
```

## Feedback visual de undo/redo

Quando o usuário pressiona Ctrl+Z, mostrar um toast temporário:

```tsx
// Usar um estado de flash simples no EditorRoot

const [undoFlash, setUndoFlash] = useState<'undo' | 'redo' | null>(null)

function handleUndo() {
  undo()
  setUndoFlash('undo')
  setTimeout(() => setUndoFlash(null), 1200)
}

// No JSX, um overlay temporário no canvas:
{undoFlash && (
  <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full z-50 pointer-events-none">
    {undoFlash === 'undo' ? '↩ Desfeito' : '↪ Refeito'}
  </div>
)}
```

## Copiar/Colar campos (pós-MVP)

Para fase futura: copiar o conteúdo de um campo (ex: todos os bullets) para aplicar em outro slide do mesmo tipo.

```typescript
// Clipboard interno do editor (não usa o clipboard do SO)
const [clipboard, setClipboard] = useState<{ field: EditableField; value: unknown } | null>(null)

function copyField(field: EditableField) {
  const slide = presentation.slides[activeSlideIndex]
  setClipboard({ field, value: structuredClone(slide[field as keyof CommercialSlide]) })
}

function pasteField() {
  if (!clipboard) return
  updateField(activeSlideIndex, clipboard.field as keyof CommercialSlide, structuredClone(clipboard.value))
}
```
