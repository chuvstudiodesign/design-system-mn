# 10 — Persistência, Autosave e Export

## Camadas de persistência

```
┌─────────────────────────────────────────────────────────┐
│  Camada 1: Memória (React state)                        │
│  Rápido, volátil, perdido ao fechar aba                 │
├─────────────────────────────────────────────────────────┤
│  Camada 2: localStorage (autosave)                      │
│  Persiste entre sessões, ~5MB de limite                 │
├─────────────────────────────────────────────────────────┤
│  Camada 3: Servidor (save explícito)                    │
│  outputs/commercial-presentation-editor/latest.json     │
│  Persiste no filesystem, exportável                     │
└─────────────────────────────────────────────────────────┘
```

## useAutosave — autosave em localStorage

```typescript
// hooks/useAutosave.ts

import { useEffect, useRef } from 'react'
import type { CommercialPresentation } from '@/data/commercial-presentations/types'

const AUTOSAVE_DELAY = 1000  // 1 segundo de inatividade

function getStorageKey(slug: string) {
  return `editor-presentation-${slug}`
}

export function useAutosave(
  presentation: CommercialPresentation,
  isDirty: boolean,
  onSaved: () => void
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!isDirty) return

    // Cancelar timer anterior
    if (timerRef.current) clearTimeout(timerRef.current)

    // Agendar novo autosave
    timerRef.current = setTimeout(() => {
      try {
        const payload = {
          version: '2.0' as const,
          savedAt: new Date().toISOString(),
          presentation,
        }
        localStorage.setItem(getStorageKey(presentation.slug), JSON.stringify(payload))
        onSaved()
      } catch (e) {
        // localStorage cheio ou indisponível — silenciar no autosave
        console.warn('[editor] autosave failed:', e)
      }
    }, AUTOSAVE_DELAY)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [presentation, isDirty, onSaved])
}
```

## loadFromStorage — carregar ao inicializar

```typescript
// utils/storage.ts

import type { CommercialPresentation } from '@/data/commercial-presentations/types'

interface StoragePayload {
  version: '2.0'
  savedAt: string
  presentation: CommercialPresentation
}

export function loadFromStorage(slug: string): CommercialPresentation | null {
  if (typeof window === 'undefined') return null  // SSR guard

  try {
    const raw = localStorage.getItem(`editor-presentation-${slug}`)
    if (!raw) return null

    const payload = JSON.parse(raw) as StoragePayload
    if (payload.version !== '2.0') return null

    return payload.presentation
  } catch {
    return null
  }
}

export function clearStorage(slug: string) {
  localStorage.removeItem(`editor-presentation-${slug}`)
}

export function getStorageMetadata(slug: string): { savedAt: Date } | null {
  try {
    const raw = localStorage.getItem(`editor-presentation-${slug}`)
    if (!raw) return null
    const payload = JSON.parse(raw) as StoragePayload
    return { savedAt: new Date(payload.savedAt) }
  } catch {
    return null
  }
}
```

## Indicador de "Dados salvos localmente"

Ao abrir o editor, se existir dados no localStorage mais novos que os originais, mostrar banner:

```tsx
// No EditorRoot, após inicialização:

const [showRestoredBanner, setShowRestoredBanner] = useState(false)

useEffect(() => {
  const meta = getStorageMetadata(presentation.slug)
  if (meta) setShowRestoredBanner(true)
}, [])

// JSX:
{showRestoredBanner && (
  <div className="flex items-center gap-3 px-4 py-2 bg-[#5FC31815] border-b border-[#5FC318]/20 text-sm">
    <span className="text-[#5FC318]">✓</span>
    <span className="text-[#333]">Rascunho restaurado do último acesso.</span>
    <button
      onClick={() => {
        clearStorage(presentation.slug)
        reset()
        setShowRestoredBanner(false)
      }}
      className="ml-auto text-xs text-[#888] hover:text-[#333] underline"
    >
      Descartar e usar original
    </button>
    <button
      onClick={() => setShowRestoredBanner(false)}
      className="text-xs text-[#888] hover:text-[#333]"
    >
      ✕
    </button>
  </div>
)}
```

## Salvar no servidor

Usa a API existente em `src/app/api/commercial-presentations/editor/route.ts`.

```typescript
// context/EditorContext.tsx — função save

async function save() {
  setSaveStatus('saving')
  try {
    const res = await fetch('/api/commercial-presentations/editor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        version: '2.0',
        savedAt: new Date().toISOString(),
        presentation: state.presentation,
      }),
    })

    if (!res.ok) throw new Error('HTTP ' + res.status)

    const data = await res.json()
    setLastSaved(new Date(data.savedAt))
    setIsDirty(false)
    setSaveStatus('saved')
  } catch (e) {
    setSaveStatus('error')
    console.error('[editor] save failed:', e)
  }
}
```

A API route existente já salva `latest.json` e `{timestamp}.json` em `outputs/commercial-presentation-editor/`.

## Formato do JSON salvo

```json
{
  "version": "2.0",
  "savedAt": "2026-05-07T14:32:00.000Z",
  "presentation": {
    "id": "deck-01",
    "slug": "futuro-negocios-brasil",
    "title": "O Futuro dos Negócios no Brasil",
    "slides": [
      {
        "id": "slide-01",
        "type": "cover",
        "title": "Título editado pelo usuário",
        "eyebrow": "Eyebrow editado",
        "imageSrc": "https://...",
        ...
      }
    ]
  }
}
```

## Reset para original

```typescript
function reset() {
  clearStorage(state.presentation.slug)
  
  setState(prev => ({
    ...prev,
    presentation: {
      ...prev.presentation,
      slides: structuredClone(prev.originalSlides),
    },
    isDirty: false,
    lastSaved: null,
    selection: null,
  }))
  
  history.reset({
    slides: structuredClone(state.originalSlides),
    activeSlideIndex: state.activeSlideIndex,
  })
}
```

## Export como JSON (pós-MVP)

Adicionar botão "Exportar" que faz download do JSON no browser:

```typescript
function exportAsJSON() {
  const payload = {
    version: '2.0',
    exportedAt: new Date().toISOString(),
    presentation: state.presentation,
  }
  
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${state.presentation.slug}-${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
}
```

## Status de save na UI

```typescript
type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'
```

Exibir na status bar:

```tsx
// EditorStatusBar.tsx

const STATUS_MAP = {
  idle: null,
  saving: <span className="text-[#888]">Salvando...</span>,
  saved: <span className="text-[#5FC318]">✓ Salvo</span>,
  error: <span className="text-[#C52020]">✕ Erro ao salvar</span>,
}

{STATUS_MAP[saveStatus]}
```

## Considerações de segurança

1. **imageSrc com data URL**: permitir apenas para uso local. Em produção, fazer upload real para CDN e salvar a URL.
2. **localStorage**: não salvar informações sensíveis. Os dados de apresentação são conteúdo de design system, sem dados pessoais.
3. **API route**: adicionar rate limiting no futuro se o editor for publicado.
4. **Tamanho máximo do JSON**: slides com imagens em data URL podem exceder o limite de 5MB do localStorage. Nesse caso, salvar apenas a URL e não a data URL:

```typescript
// Antes de salvar no localStorage, substituir data URLs por placeholder
function sanitizeForStorage(presentation: CommercialPresentation): CommercialPresentation {
  return {
    ...presentation,
    slides: presentation.slides.map(slide => ({
      ...slide,
      imageSrc: slide.imageSrc?.startsWith('data:')
        ? undefined  // não salvar data URLs no localStorage
        : slide.imageSrc,
    })),
  }
}
```
