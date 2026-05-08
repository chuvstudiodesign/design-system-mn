# 06 — Ferramentas e Toolbar

## Ferramentas disponíveis

### Select (padrão — tecla V ou S)
- Clique em campo de texto → seleciona campo, inspetor mostra editor de texto
- Clique em imagem → seleciona campo de imagem, handles de resize aparecem
- Clique em área vazia → deseleciona tudo
- Duplo clique em campo de texto → entra em modo de edição inline (se implementado)

### Text (tecla T)
- Clique direto em qualquer campo de texto → seleciona e abre editor no inspetor
- Ícone: `Type` (Lucide)

### Image (tecla I)
- Clique em região de imagem do slide → abre file picker ou URL dialog
- Ícone: `Image` (Lucide)

### Pan (tecla H ou Space + drag)
- Drag para mover o canvas no viewport quando zoom > fit
- Cursor: grab/grabbing
- Ícone: `Hand` (Lucide)

## Layout da Toolbar

```
┌─────────────────────────────────────────────────────────────────┐
│  [S] [T] [I] [H]  │  [←] [→]  │  [-] [75%] [+] [fit]  │  [↗ Salvar] [↺ Reset]  │
└─────────────────────────────────────────────────────────────────┘
     Ferramentas      Undo/Redo        Zoom                 Ações
```

```tsx
// EditorToolbar.tsx

export function EditorToolbar() {
  const { tool, setTool, canUndo, canRedo, undo, redo, save, reset, isDirty, zoom, zoomIn, zoomOut, fitToScreen } = useEditorContext()

  return (
    <div className="flex items-center gap-2 px-4 py-2 border-b border-[#D4D4D4] bg-white">
      {/* Grupo: ferramentas */}
      <div className="flex items-center gap-1 p-1 bg-[#ECECEC] rounded-lg">
        <ToolButton
          icon={<MousePointer2 size={16} />}
          label="Selecionar (S)"
          active={tool === 'select'}
          onClick={() => setTool('select')}
          shortcut="S"
        />
        <ToolButton
          icon={<Type size={16} />}
          label="Texto (T)"
          active={tool === 'text'}
          onClick={() => setTool('text')}
          shortcut="T"
        />
        <ToolButton
          icon={<ImageIcon size={16} />}
          label="Imagem (I)"
          active={tool === 'image'}
          onClick={() => setTool('image')}
          shortcut="I"
        />
        <ToolButton
          icon={<Hand size={16} />}
          label="Mover (H)"
          active={tool === 'pan'}
          onClick={() => setTool('pan')}
          shortcut="H"
        />
      </div>

      <Separator />

      {/* Grupo: histórico */}
      <div className="flex items-center gap-1">
        <IconButton
          icon={<Undo2 size={16} />}
          label="Desfazer (Ctrl+Z)"
          onClick={undo}
          disabled={!canUndo}
        />
        <IconButton
          icon={<Redo2 size={16} />}
          label="Refazer (Ctrl+Y)"
          onClick={redo}
          disabled={!canRedo}
        />
      </div>

      <Separator />

      {/* Grupo: zoom */}
      <div className="flex items-center gap-1">
        <IconButton icon={<Minus size={14} />} label="Diminuir zoom" onClick={zoomOut} />
        <button
          className="text-xs font-mono w-12 text-center hover:bg-[#ECECEC] rounded px-1 py-1"
          onClick={fitToScreen}
          title="Clique para ajustar à tela"
        >
          {Math.round(zoom * 100)}%
        </button>
        <IconButton icon={<Plus size={14} />} label="Aumentar zoom" onClick={zoomIn} />
        <IconButton icon={<Maximize2 size={14} />} label="Ajustar à tela" onClick={fitToScreen} />
      </div>

      <div className="flex-1" />

      {/* Grupo: ações */}
      <div className="flex items-center gap-2">
        {isDirty && (
          <span className="text-xs text-[#F59E0B] font-medium">
            Alterações não salvas
          </span>
        )}
        <button
          onClick={reset}
          className="text-sm px-3 py-1.5 rounded-lg border border-[#D4D4D4] hover:bg-[#ECECEC] text-[#666]"
        >
          Resetar
        </button>
        <button
          onClick={save}
          className="text-sm px-3 py-1.5 rounded-lg bg-[#5FC318] text-white hover:bg-[#5FC318]/90 font-medium"
        >
          Salvar
        </button>
      </div>
    </div>
  )
}
```

## ToolButton — componente interno

```tsx
function ToolButton({ icon, label, active, onClick, shortcut }: ToolButtonProps) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={cn(
        'w-8 h-8 flex items-center justify-center rounded-md transition-colors',
        active
          ? 'bg-white text-[#5FC318] shadow-sm'
          : 'text-[#555] hover:bg-white/60'
      )}
    >
      {icon}
    </button>
  )
}
```

## Atalhos de teclado da toolbar

Registrar no `useEffect` do `EditorRoot`:

```typescript
useEffect(() => {
  function handleKeyDown(e: KeyboardEvent) {
    // Não interceptar quando usuário está editando texto
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
    if ((e.target as HTMLElement)?.contentEditable === 'true') return

    switch (e.key.toLowerCase()) {
      case 's': if (!e.metaKey && !e.ctrlKey) setTool('select'); break
      case 't': setTool('text'); break
      case 'i': setTool('image'); break
      case 'h': setTool('pan'); break
      case 'z':
        if (e.metaKey || e.ctrlKey) {
          e.preventDefault()
          if (e.shiftKey) redo()
          else undo()
        }
        break
      case 'y':
        if (e.metaKey || e.ctrlKey) { e.preventDefault(); redo() }
        break
      case 'escape':
        setSelection(null)
        break
      case '=':
      case '+':
        if (e.metaKey || e.ctrlKey) { e.preventDefault(); zoomIn() }
        break
      case '-':
        if (e.metaKey || e.ctrlKey) { e.preventDefault(); zoomOut() }
        break
      case '0':
        if (e.metaKey || e.ctrlKey) { e.preventDefault(); fitToScreen() }
        break
    }
  }
  
  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [tool, setTool, undo, redo, setSelection, zoomIn, zoomOut, fitToScreen])
```

## Status Bar — barra inferior

```tsx
// EditorStatusBar.tsx

export function EditorStatusBar() {
  const { activeSlideIndex, presentation, lastSaved, zoom, selection } = useEditorContext()
  const slide = presentation.slides[activeSlideIndex]

  return (
    <div className="flex items-center gap-4 px-4 py-1.5 border-t border-[#D4D4D4] bg-white text-xs text-[#888]">
      <span>Slide {activeSlideIndex + 1} de {presentation.slides.length}</span>
      <span>·</span>
      <span>{slide.type}</span>
      {selection && (
        <>
          <span>·</span>
          <span className="text-[#5FC318]">{selection.field} selecionado</span>
        </>
      )}
      <div className="flex-1" />
      <span>
        {lastSaved
          ? `Salvo às ${lastSaved.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
          : 'Não salvo'}
      </span>
      <span>·</span>
      <span>{Math.round(zoom * 100)}%</span>
    </div>
  )
}
```
