# Editor de Apresentações Comerciais — Documento Mestre

Este arquivo é o ponto de entrada para construir o editor. Leia-o primeiro, depois os arquivos referenciados na ordem indicada.

## O que estamos construindo

Um editor de apresentações no estilo Canva/Figma, embutido no design system MN, capaz de editar os 20 slides da apresentação "O Futuro dos Negócios no Brasil" com fidelidade total ao design original — incluindo o chanfro (ChamferedPanel), os tokens do sistema de elevação, a tipografia e as cores de accent.

## O que NÃO deve ser tocado

A seção 1 da página (`/styleguide/paginas/apresentacoes-comerciais`) é o viewer original. Esses componentes são somente leitura:

- `src/components/commercial-presentations/PresentationCarousel.tsx`
- `src/components/commercial-presentations/SlideViewport.tsx`
- `src/components/commercial-presentations/PresentationSlide.tsx`
- `src/components/commercial-presentations/slide-layouts/*.tsx`
- `src/data/commercial-presentations/*.ts`

O editor vive em paralelo, na seção 2 da mesma página, e usa uma representação própria de dados que **deriva** dos dados originais mas não os altera.

## Para começar a implementação

Leia `KICKOFF.md` antes de escrever qualquer código. Ele contém a mensagem de arranque que o agente deve apresentar ao usuário para confirmar o entendimento antes de iniciar.

## Índice de documentos

| Arquivo | Conteúdo |
|---|---|
| [KICKOFF.md](./KICKOFF.md) | **Leia primeiro ao implementar** — mensagem de arranque e instruções iniciais |
| [01-vision.md](./01-vision.md) | Objetivos, não-objetivos, critérios de sucesso |
| [02-architecture.md](./02-architecture.md) | Arquitetura de componentes, árvore de arquivos |
| [03-data-model.md](./03-data-model.md) | Tipos TypeScript completos, camada de tradução |
| [04-canvas-engine.md](./04-canvas-engine.md) | Renderização, escala, zoom/pan |
| [05-selection-handles.md](./05-selection-handles.md) | Seleção, handles de resize, multi-select |
| [06-tools-toolbar.md](./06-tools-toolbar.md) | Todas as ferramentas e toolbar |
| [07-panels-ui.md](./07-panels-ui.md) | Layout dos painéis, inspetor de propriedades |
| [08-design-fidelity.md](./08-design-fidelity.md) | Chanfro, tokens, tipografia, fidelidade |
| [09-history-shortcuts.md](./09-history-shortcuts.md) | Undo/redo, atalhos, copy/paste |
| [10-persistence-export.md](./10-persistence-export.md) | Salvar, carregar, exportar |
| [11-implementation-phases.md](./11-implementation-phases.md) | Plano de implementação em fases |

## Decisões arquiteturais críticas

### 1. Estratégia de renderização: Overlay sobre componentes reais

O editor NÃO recria os slides do zero como uma lista de layers livres. Em vez disso:

1. Renderiza o componente real (`PresentationSlide`) em escala reduzida
2. Sobrepõe um canvas de edição transparente (SVG ou div) por cima
3. As handles de seleção e transformação ficam no overlay
4. Quando o usuário edita, atualiza os dados do `CommercialSlide` que alimenta o componente

Isso garante fidelidade 100% ao design original (chanfro, tokens, gradients) sem duplicar lógica.

### 2. Modelo de dados: `EditorDocument` wrapping `CommercialPresentation`

Não existe um modelo separado de layers. O estado do editor é:

```typescript
interface EditorState {
  presentation: CommercialPresentation  // Os dados originais (modificáveis)
  activeSlideIndex: number
  selection: SelectionState
  history: HistoryStack
  viewport: ViewportState
  ui: UIState
}
```

Editar um campo de texto atualiza `presentation.slides[i].title`, que o componente real renderiza.

### 3. Campos editáveis por slide

Cada `CommercialSlide` tem campos bem definidos. O editor expõe apenas esses campos no inspetor — não há layers livres. Os campos são:

- `title`, `subtitle`, `eyebrow`, `body`, `quote`, `footer`
- `bullets: string[]`
- `stats: { label, value }[]`
- `cards: { title, description, number? }[]`
- `imageSrc`, `imageAlt`, `imageDirection`

### 4. Stack obrigatória

- React 18+ com hooks
- TypeScript strict
- Tailwind CSS (sem CSS modules)
- Nenhuma biblioteca de canvas/editor externa (sem Fabric.js, Konva, etc.)
- Componentes Base UI para UI chrome (dialogs, tooltips, etc.)
- `use client` apenas onde necessário

## Convenções do projeto

```
src/components/commercial-presentations/editor/
├── EditorRoot.tsx              # Componente raiz do editor (substitui EditablePresentationEditor)
├── EditorCanvas.tsx            # Canvas central com overlay
├── EditorOverlay.tsx           # SVG overlay para handles
├── EditorToolbar.tsx           # Barra de ferramentas superior
├── EditorSlidePanel.tsx        # Painel esquerdo: lista de slides
├── EditorPropertiesPanel.tsx   # Painel direito: inspetor de propriedades
├── EditorFieldEditor.tsx       # Componentes de edição por tipo de campo
├── hooks/
│   ├── useEditorState.ts       # Estado global do editor
│   ├── useHistory.ts           # Undo/redo
│   ├── useViewport.ts          # Zoom/pan/scale
│   └── useSelection.ts         # Estado de seleção
├── types.ts                    # Tipos exclusivos do editor
└── utils/
    ├── fieldMap.ts             # Mapeamento slideType → campos editáveis
    └── slideToEditorProps.ts   # Adaptador CommercialSlide → EditorProps
```

## Constraints inegociáveis

1. O canvas sempre mostra 1600×900 (proporção 16:9), escalado para caber na tela
2. Qualquer edição é imediatamente refletida no preview ao lado (mesma sessão)
3. O estado original dos slides deve ser recuperável via "Resetar"
4. Nenhum campo editável pode quebrar a renderização do slide original
5. O chanfro do slide de capa deve aparecer no editor exatamente como no viewer
