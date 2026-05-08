# 08 — Fidelidade ao Design: Chanfro, Tokens e Tipografia

## O problema atual

O editor antigo (`EditablePresentationEditor.tsx`) recria slides do zero como layers abstratos. Isso perde:

1. **ChamferedPanel** — o efeito de chanfro (clip-path SVG) do slide de capa
2. **Gradients** — fundos `linear-gradient` dos slides dark
3. **Glassmorphism** — efeito de vidro nos stats escuros
4. **Typography scale** — `SlideTitle` com `104px`, `81px`, `53px` dependendo do tamanho
5. **AbstractVisual** — os visuais geométricos gerados (orbital, bars, grid, panel)
6. **SlideLogo** — logo SVG da MASI em modo claro/escuro

## A solução: renderizar os componentes reais

O editor usa exatamente os mesmos componentes que o viewer. O `PresentationSlide` com `SlideCover`, `SlideSplit`, etc. são renderizados dentro do canvas. **Nada é reimplementado.**

Isso significa que qualquer melhoria no design dos slides aparece automaticamente no editor.

## O ChamferedPanel

O chanfro é implementado em `src/components/commercial-presentations/slide-layouts/SlidePrimitives.tsx` (ou componente separado `ChamferedPanel.tsx`).

### Como funciona

```typescript
// Valores do chanfro:
const BORDER_RADIUS = 10   // raio dos cantos normais
const CHAMFER_SIZE = 32    // tamanho do corte diagonal
const CHAMFER_RADIUS = 4.5 // suavização do canto do chanfro

// O SVG clip-path é gerado dinamicamente para o tamanho atual do elemento
// usando ResizeObserver
```

### Por que aparece no editor sem código extra

Porque o `SlideCover` já usa `ChamferedPanel` e o editor renderiza `SlideCover` diretamente. O ResizeObserver do ChamferedPanel funciona mesmo dentro do canvas escalado.

**Atenção**: o scale via CSS `transform: scale(factor)` não afeta o ResizeObserver — ele retorna o tamanho real do elemento antes do scale. Isso pode causar o clip-path a usar as dimensões erradas.

### Solução para o chanfro em escala

O `ChamferedPanel` deve receber o tamanho explícito quando usado dentro de um contexto escalado:

```tsx
// Se ChamferedPanel usa ResizeObserver internamente,
// verificar se o tamanho está correto no editor.
// Se não estiver, passar w e h explicitamente:

<ChamferedPanel forcedWidth={1600} forcedHeight={900}>
  {/* conteúdo */}
</ChamferedPanel>
```

Alternativa: fazer o ChamferedPanel aceitar `width` e `height` como props opcionais e usar essas dimensões quando presentes.

## Tokens de design do sistema

Todos os tokens estão em `src/app/globals.css`. O editor deve usar as mesmas variáveis CSS:

### Elevation system

```css
--elevation-0: #D4D4D4;  /* background da área do canvas */
--elevation-1: #ECECEC;  /* background dos painéis laterais */
--elevation-2: #FFFFFF;  /* cards, campos de input */
```

### Brand colors

```css
--color-primary: #5FC318;    /* verde accent — usado nos handles, seleção, botões */
--color-brand: #AFF000;      /* verde brilhante — NÃO usar no editor, apenas slides */
--color-dark: #0C1C16;       /* verde escuro — backgrounds dark dos slides */
```

### Aplicação no editor

| Elemento | Token |
|---|---|
| Background do canvas | `--elevation-0` (#D4D4D4) |
| Background painéis | `--elevation-1` (#ECECEC) |
| Background inputs | `--elevation-2` (#FFFFFF) |
| Cor de seleção | `--color-primary` (#5FC318) |
| Borda divisória | `--elevation-0` (#D4D4D4) |
| Texto secundário | #888 |
| Texto principal | #1A1A1A |

### O que NÃO usar no editor

- `--color-brand` (#AFF000): apenas dentro dos slides, não na UI do editor
- Gradients dos slides: apenas dentro dos componentes de slide
- `--color-dark` (#0C1C16): apenas como background de slides dark

## Tipografia nos slides

Os componentes de slide usam escala tipográfica própria (não os tokens globais):

```typescript
// SlideTitle — tamanhos em pixels (escala 1600px canvas)
const SIZE_MAP = {
  xl: 104,  // apenas para cover com título curto
  lg: 81,   // para closing e statement longos
  md: 53,   // padrão para a maioria dos slides
}
```

Esses tamanhos são internos ao componente `SlideTitle`. O editor não precisa replicá-los.

## Regras de fidelidade por campo

### Título
- Renderizado por `SlideTitle` com tamanho dinâmico
- O editor nunca muda o tamanho da fonte — apenas o conteúdo
- Máximo de caracteres recomendado por tamanho:
  - xl (cover): 40 chars
  - lg (closing): 60 chars
  - md (outros): 100 chars

### Corpo
- Renderizado por `SlideBody` com `22px` e `leading-[1.45]`
- Máximo recomendado: 300 chars

### Eyebrow
- `15px`, uppercase, `letter-spacing: 0.08em`
- Máximo: 40 chars

### Bullets (cover)
- Cada bullet vira uma tag preta com texto branco
- Máximo por bullet: 25 chars
- Máximo de bullets: 5

### Stats
- Valor: máximo 8 chars (ex: "78%", "R$1.2bi")
- Label: máximo 60 chars

### Cards (framework, leaders, etc.)
- Título: máximo 40 chars
- Descrição: máximo 120 chars

## Accent color

A cor accent (`presentation.accent = '#5FC318'`) é usada em:
- `SlideEyebrow`
- Números dos cards
- Barra de progresso no SlideStats
- Divider no SlideStatement

O editor **não precisa editar o accent** no MVP. Mas deve exibir a cor na status bar para referência.

## Conferência visual de fidelidade

Antes de declarar o editor completo, verificar visualmente cada um dos 7 layouts:

| Layout | Componente | Verificar |
|---|---|---|
| Cover | `SlideCover` | Chanfro aparece, logo posicionada, imagem à direita |
| Statement | `SlideStatement` | Gradient dark, quote grande, imagem bottom-right |
| Split | `SlideSplit` | Grid 2 colunas, bullet cards embaixo, gráfico |
| Stats | `SlideStats` | Valores grandes, progress bar, glassmorphism |
| Framework | `SlideFramework` | Grid 2×2, números accent |
| Cards | `SlideCards` | Grid 2×2, números circulados |
| Closing | `SlideClosing` | Gradient dark, logo grande, quote com barra |

## Fontes

O projeto usa a fonte definida em `src/app/layout.tsx`. Verificar se a fonte está carregando dentro do iframe/contexto do editor. Como o editor está na mesma página do design system, as fontes já estarão disponíveis.

## Garantia de não regressão

Criar um teste visual simples: renderizar o slide 1 (Cover) no viewer e no editor lado a lado e comparar visualmente. Se o chanfro, o gradient e as proporções forem idênticos, a fidelidade está garantida.
