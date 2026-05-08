# 07 — Painéis e UI do Editor

## Layout geral (EditorRoot)

```
┌──────────────────────────────────────────────────────────────────────┐
│  EditorToolbar (altura: 48px)                                        │
├──────────────┬────────────────────────────────────────┬──────────────┤
│              │                                        │              │
│  Slide       │  EditorCanvas                          │  Properties  │
│  Panel       │  (área central, flex-1)                │  Panel       │
│  (220px)     │                                        │  (280px)     │
│              │                                        │              │
├──────────────┴────────────────────────────────────────┴──────────────┤
│  EditorStatusBar (altura: 28px)                                      │
└──────────────────────────────────────────────────────────────────────┘
```

```tsx
// EditorRoot.tsx

export function EditorRoot({ presentation: initialPresentation }: Props) {
  return (
    <EditorProvider initialPresentation={initialPresentation}>
      <div className="flex flex-col h-[calc(100vh-var(--layout-header-height,0px))] bg-white overflow-hidden">
        <EditorToolbar />
        <div className="flex flex-1 overflow-hidden">
          <EditorSlidePanel />
          <EditorCanvas />
          <EditorPropertiesPanel />
        </div>
        <EditorStatusBar />
      </div>
    </EditorProvider>
  )
}
```

**Atenção**: o editor deve ocupar toda a altura disponível menos o header do styleguide. Verificar o valor de `--layout-header-height` em `src/app/styleguide/layout.tsx`.

## Painel Esquerdo — Lista de Slides

```tsx
// EditorSlidePanel.tsx

export function EditorSlidePanel() {
  const { presentation, activeSlideIndex, setActiveSlide } = useEditorContext()

  return (
    <div className="w-[220px] flex-shrink-0 border-r border-[#D4D4D4] bg-[#FAFAFA] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2 border-b border-[#ECECEC]">
        <p className="text-xs font-semibold text-[#555] uppercase tracking-wide">
          Slides ({presentation.slides.length})
        </p>
      </div>

      {/* Lista scrollável */}
      <div className="flex-1 overflow-y-auto py-2 flex flex-col gap-1 px-2">
        {presentation.slides.map((slide, i) => (
          <SlideThumbnailItem
            key={slide.id}
            slide={slide}
            presentation={presentation}
            index={i}
            isActive={i === activeSlideIndex}
            onClick={() => setActiveSlide(i)}
          />
        ))}
      </div>
    </div>
  )
}

function SlideThumbnailItem({ slide, presentation, index, isActive, onClick }: ItemProps) {
  const THUMB_W = 180
  const THUMB_H = Math.round(THUMB_W * 9 / 16)
  const scale = THUMB_W / 1600

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col gap-1 p-1.5 rounded-lg text-left transition-colors',
        isActive
          ? 'bg-white ring-2 ring-[#5FC318] shadow-sm'
          : 'hover:bg-white hover:shadow-sm'
      )}
    >
      {/* Miniatura */}
      <div
        className="relative overflow-hidden rounded flex-shrink-0"
        style={{ width: THUMB_W, height: THUMB_H }}
      >
        <div
          style={{
            width: 1600,
            height: 900,
            transform: `scale(${scale})`,
            transformOrigin: '0 0',
            pointerEvents: 'none',
          }}
        >
          <PresentationSlide slide={slide} presentation={presentation} />
        </div>
      </div>

      {/* Metadata */}
      <div className="px-0.5">
        <p className="text-[10px] text-[#888] font-medium">
          {index + 1} · {slide.type}
        </p>
        <p className="text-[11px] text-[#333] font-semibold leading-tight line-clamp-1">
          {slide.eyebrow ?? slide.title}
        </p>
      </div>
    </button>
  )
}
```

## Painel Direito — Inspetor de Propriedades

O painel tem duas seções:
1. **Slide Info**: informações do slide (type, visual) — readonly
2. **Campos editáveis**: baseados no `FIELD_MAP[slide.type]`

```tsx
// EditorPropertiesPanel.tsx

export function EditorPropertiesPanel() {
  const { presentation, activeSlideIndex, selection } = useEditorContext()
  const slide = presentation.slides[activeSlideIndex]
  const fields = FIELD_MAP[slide.type] ?? []

  return (
    <div className="w-[280px] flex-shrink-0 border-l border-[#D4D4D4] bg-[#FAFAFA] flex flex-col overflow-hidden">
      {/* Header com info do slide */}
      <div className="px-4 py-3 border-b border-[#ECECEC] bg-white">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#555] uppercase tracking-wide">
            Propriedades
          </span>
          <span className="text-xs px-2 py-0.5 bg-[#ECECEC] rounded-full text-[#555] font-mono">
            {slide.type}
          </span>
        </div>
        {slide.eyebrow && (
          <p className="text-xs text-[#888] mt-1 truncate">{slide.eyebrow}</p>
        )}
      </div>

      {/* Campos editáveis */}
      <div className="flex-1 overflow-y-auto">
        {fields.length === 0 ? (
          <p className="text-xs text-[#AAA] p-4">
            Nenhum campo editável para este tipo de slide.
          </p>
        ) : (
          <div className="divide-y divide-[#ECECEC]">
            {fields.map(fieldConfig => (
              <FieldSection
                key={fieldConfig.field}
                config={fieldConfig}
                slide={slide}
                slideIndex={activeSlideIndex}
                isSelected={selection?.field === fieldConfig.field}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info da apresentação */}
      <div className="px-4 py-3 border-t border-[#ECECEC] bg-white">
        <p className="text-[10px] text-[#AAA]">
          Accent: <span style={{ color: presentation.accent }}>■</span> {presentation.accent}
        </p>
      </div>
    </div>
  )
}
```

## FieldSection — seção de campo no inspetor

```tsx
// Renderiza label + editor correto para cada campo

function FieldSection({ config, slide, slideIndex, isSelected }: FieldSectionProps) {
  const { updateField, setSelection } = useEditorContext()

  const handleFocus = () => {
    setSelection({ slideIndex, field: config.field })
  }

  return (
    <div
      className={cn(
        'px-4 py-3 transition-colors',
        isSelected ? 'bg-[#5FC31808]' : ''
      )}
    >
      <label className="block text-[10px] font-semibold text-[#888] uppercase tracking-wide mb-1.5">
        {config.label}
        {config.maxLength && (
          <span className="ml-1 font-normal normal-case">
            ({String(slide[config.field] ?? '').length}/{config.maxLength})
          </span>
        )}
      </label>

      {config.editorType === 'text' && (
        <TextField
          value={String(slide[config.field] ?? '')}
          maxLength={config.maxLength}
          placeholder={config.placeholder}
          onFocus={handleFocus}
          onChange={v => updateField(slideIndex, config.field as keyof CommercialSlide, v)}
        />
      )}

      {config.editorType === 'textarea' && (
        <TextareaField
          value={String(slide[config.field] ?? '')}
          maxLength={config.maxLength}
          placeholder={config.placeholder}
          onFocus={handleFocus}
          onChange={v => updateField(slideIndex, config.field as keyof CommercialSlide, v)}
        />
      )}

      {config.editorType === 'bullets' && (
        <BulletListField
          items={slide.bullets ?? []}
          slideIndex={slideIndex}
          onFocus={handleFocus}
        />
      )}

      {config.editorType === 'stats' && (
        <StatsField
          items={slide.stats ?? []}
          slideIndex={slideIndex}
          onFocus={handleFocus}
        />
      )}

      {config.editorType === 'cards' && (
        <CardsField
          items={slide.cards ?? []}
          slideIndex={slideIndex}
          onFocus={handleFocus}
        />
      )}

      {config.editorType === 'image' && (
        <ImageField
          value={slide.imageSrc ?? ''}
          slideIndex={slideIndex}
          onFocus={handleFocus}
        />
      )}

      {config.editorType === 'direction' && (
        <DirectionField
          value={slide.imageDirection ?? 'right'}
          slideIndex={slideIndex}
        />
      )}
    </div>
  )
}
```

## Editores de campo — campos/

### TextField

```tsx
// fields/TextField.tsx

export function TextField({ value, onChange, maxLength, placeholder, onFocus }: Props) {
  return (
    <input
      type="text"
      value={value}
      maxLength={maxLength}
      placeholder={placeholder}
      onFocus={onFocus}
      onChange={e => onChange(e.target.value)}
      className="w-full text-sm px-2.5 py-1.5 rounded-md border border-[#D4D4D4] bg-white focus:outline-none focus:ring-2 focus:ring-[#5FC318]/40 focus:border-[#5FC318]"
    />
  )
}
```

### TextareaField

```tsx
// fields/TextareaField.tsx

export function TextareaField({ value, onChange, maxLength, placeholder, onFocus }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-height
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [value])

  return (
    <textarea
      ref={textareaRef}
      value={value}
      maxLength={maxLength}
      placeholder={placeholder}
      rows={3}
      onFocus={onFocus}
      onChange={e => onChange(e.target.value)}
      className="w-full text-sm px-2.5 py-1.5 rounded-md border border-[#D4D4D4] bg-white focus:outline-none focus:ring-2 focus:ring-[#5FC318]/40 focus:border-[#5FC318] resize-none overflow-hidden"
    />
  )
}
```

### BulletListField

```tsx
// fields/BulletListField.tsx

export function BulletListField({ items, slideIndex, onFocus }: Props) {
  const { updateBullet } = useEditorContext()

  return (
    <div className="flex flex-col gap-1.5">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <span className="text-[#5FC318] text-xs">·</span>
          <input
            type="text"
            value={item}
            onFocus={onFocus}
            onChange={e => updateBullet(slideIndex, i, e.target.value)}
            className="flex-1 text-sm px-2 py-1 rounded border border-[#D4D4D4] bg-white focus:outline-none focus:ring-1 focus:ring-[#5FC318]/40"
          />
        </div>
      ))}
    </div>
  )
}
```

### StatsField

```tsx
// fields/StatsField.tsx

export function StatsField({ items, slideIndex, onFocus }: Props) {
  const { updateStat } = useEditorContext()

  return (
    <div className="flex flex-col gap-2">
      {items.map((stat, i) => (
        <div key={i} className="flex flex-col gap-1">
          <input
            type="text"
            value={stat.value}
            placeholder="Valor (ex: 78%)"
            onFocus={onFocus}
            onChange={e => updateStat(slideIndex, i, { value: e.target.value })}
            className="w-full text-sm font-bold px-2 py-1 rounded border border-[#D4D4D4] bg-white focus:outline-none focus:ring-1 focus:ring-[#5FC318]/40"
          />
          <input
            type="text"
            value={stat.label}
            placeholder="Label"
            onFocus={onFocus}
            onChange={e => updateStat(slideIndex, i, { label: e.target.value })}
            className="w-full text-xs px-2 py-1 rounded border border-[#D4D4D4] bg-white focus:outline-none focus:ring-1 focus:ring-[#5FC318]/40"
          />
        </div>
      ))}
    </div>
  )
}
```

### ImageField

```tsx
// fields/ImageField.tsx

export function ImageField({ value, slideIndex, onFocus }: Props) {
  const { updateField } = useEditorContext()
  const [mode, setMode] = useState<'url' | 'upload'>('url')

  return (
    <div className="flex flex-col gap-2">
      {/* Preview */}
      {value && (
        <div className="w-full h-20 rounded-md overflow-hidden bg-[#ECECEC]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      {/* URL input */}
      <input
        type="url"
        value={value}
        placeholder="https://..."
        onFocus={onFocus}
        onChange={e => updateField(slideIndex, 'imageSrc', e.target.value)}
        className="w-full text-xs px-2.5 py-1.5 rounded-md border border-[#D4D4D4] bg-white focus:outline-none focus:ring-1 focus:ring-[#5FC318]/40"
      />

      {/* Upload button */}
      <label className="cursor-pointer text-xs text-center px-2 py-1.5 rounded-md border border-dashed border-[#D4D4D4] hover:border-[#5FC318] hover:bg-[#5FC31808] transition-colors">
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={async e => {
            const file = e.target.files?.[0]
            if (!file) return
            // Converter para data URL (apenas para uso local/demo)
            const reader = new FileReader()
            reader.onload = ev => {
              updateField(slideIndex, 'imageSrc', ev.target?.result as string)
            }
            reader.readAsDataURL(file)
          }}
        />
        Fazer upload de imagem
      </label>
    </div>
  )
}
```

## Highlight de campo selecionado no painel

Quando o usuário clica em um campo no canvas, o painel direito deve fazer scroll para mostrar o campo correspondente e destacá-lo com a borda verde.

```typescript
// Usar useEffect que observa selection e faz scroll
useEffect(() => {
  if (!selection) return
  const el = document.getElementById(`field-${selection.field}`)
  el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
}, [selection])
```

Cada `FieldSection` deve ter `id={`field-${config.field}`}`.
