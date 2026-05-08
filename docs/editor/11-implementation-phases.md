# 11 — Plano de Implementação em Fases

## Ordem de execução

Cada fase é um entregável funcionando. Não avançar para a próxima sem a atual estar estável.

---

## Fase 1 — Fundação: Estado e Canvas (2-3 sessões)

**Objetivo**: O editor abre com o slide 1 renderizado com fidelidade total, incluindo chanfro.

### Tarefas

1. Criar `src/components/commercial-presentations/editor/types.ts` com todos os tipos
2. Criar `context/EditorContext.tsx` com o estado básico (presentation, activeSlideIndex, tool, selection)
3. Criar `EditorRoot.tsx` com layout grid (toolbar + body + statusbar)
4. Criar `EditorSlidePanel.tsx` com lista de 20 slides e thumbnails
5. Criar `EditorCanvas.tsx` com:
   - ResizeObserver para calcular scale
   - `PresentationSlide` renderizado no tamanho 1600×900 escalado
   - Overlay SVG vazio (sem interação ainda)
6. Criar `EditorStatusBar.tsx` com info básica
7. Atualizar `CommercialPresentationsPage.tsx` para importar `EditorRoot`

**Verificação da Fase 1**:
- [ ] Todos os 20 slides aparecem no painel esquerdo como thumbnails
- [ ] Clicar em um thumbnail muda o slide no canvas
- [ ] O slide de capa mostra o ChamferedPanel corretamente
- [ ] O canvas escala corretamente ao redimensionar a janela
- [ ] A seção 1 (viewer original) não foi afetada

---

## Fase 2 — Seleção: Overlay e Hit Test (1-2 sessões)

**Objetivo**: Clicar no canvas seleciona campos, o painel direito mostra qual campo foi clicado.

### Tarefas

1. Criar `utils/slideGeometry.ts` com os rects para os 7 tipos de layout
2. Criar `utils/hitTest.ts`
3. Criar `EditorOverlay.tsx` (SVG sobre o canvas) com:
   - `onMouseMove` → hover highlight
   - `onMouseDown` → seleção
   - `SelectionBox` component
4. Criar `EditorPropertiesPanel.tsx` com header e lista de campos do slide ativo
5. Criar `utils/fieldMap.ts` com os 20 tipos de slide mapeados

**Verificação da Fase 2**:
- [ ] Mouse sobre o canvas mostra highlight pontilhado nos campos
- [ ] Clique seleciona o campo (outline verde sólido)
- [ ] Painel direito mostra o nome do campo selecionado
- [ ] Escape deseleciona
- [ ] Clicar em área sem campo deseleciona

---

## Fase 3 — Edição de Texto (1-2 sessões)

**Objetivo**: Editar textos no inspetor e ver a mudança no slide em tempo real.

### Tarefas

1. Criar `fields/TextField.tsx`, `fields/TextareaField.tsx`
2. Implementar `updateField` no contexto
3. Implementar `useHistory.ts` com push debounced para texto
4. Implementar `useAutosave.ts`
5. Criar `EditorToolbar.tsx` com botões de undo/redo (sem zoom ainda)
6. Atalhos: Ctrl+Z, Ctrl+Y, Escape

**Verificação da Fase 3**:
- [ ] Clicar em "Título" seleciona o campo e mostra input no painel direito
- [ ] Digitar no input atualiza o slide em tempo real
- [ ] Ctrl+Z desfaz (até 50 estados)
- [ ] Ctrl+Y refaz
- [ ] Fechar e reabrir o editor restaura as edições (localStorage)
- [ ] Botão "Resetar" limpa tudo e volta ao original

---

## Fase 4 — Edição de Campos Complexos (1-2 sessões)

**Objetivo**: Todos os tipos de campos (bullets, stats, cards, imagem) são editáveis.

### Tarefas

1. Criar `fields/BulletListField.tsx`
2. Criar `fields/StatsField.tsx`
3. Criar `fields/CardsField.tsx`
4. Criar `fields/ImageField.tsx` com URL input + file upload (data URL)
5. Criar `fields/DirectionField.tsx` (toggle left/right)
6. Implementar `updateBullet`, `updateStat`, `updateCard` no contexto

**Verificação da Fase 4**:
- [ ] Slide de cover: editar título, subtítulo, bullets (tags), imagem
- [ ] Slide de stats: editar valores e labels das estatísticas
- [ ] Slide de framework: editar título dos 4 quadrantes
- [ ] Upload de imagem via file picker aparece no slide
- [ ] Trocar imageDirection muda o lado da imagem

---

## Fase 5 — Resize de Imagem (1 sessão)

**Objetivo**: Arrastar handles de canto redimensiona a imagem.

### Tarefas

1. Criar `EditorOverlay` com `ResizeHandles` (8 pontos) para campos `imageSrc`
2. Implementar lógica de drag em `useSelection.ts`:
   - Mouse down no handle → inicia drag
   - Mouse move → calcula novo rect
   - Mouse up → confirma e faz push no histórico
3. Implementar `updateImageSize` no contexto (atualiza algum campo de dimensão)
4. Adicionar campos `imageWidth` e `imageHeight` ao `CommercialSlide` se necessário, ou usar um campo separado do editor

**Nota sobre dimensões de imagem**:
O tipo `CommercialSlide` não tem campos de width/height para imagens. Precisamos decidir:

**Opção A** (recomendada): Adicionar ao tipo do editor um mapa de overrides:
```typescript
// No EditorContext, estado adicional (não no CommercialSlide):
imageOverrides: Record<string, { width?: number; height?: number; x?: number; y?: number }>
```
Esses overrides são aplicados via CSS quando o slide é renderizado no editor.

**Opção B**: Adicionar `imageWidth`, `imageHeight` ao `CommercialSlide` e adaptar os componentes de slide para usá-los.

Preferir Opção A para não modificar o tipo original.

**Verificação da Fase 5**:
- [ ] Selecionar imagem mostra 8 handles nos cantos e meios
- [ ] Arrastar handle de canto redimensiona mantendo aspecto
- [ ] Arrastar handle de lado redimensiona em apenas uma direção
- [ ] Ctrl+Z desfaz o resize
- [ ] Handles têm cursor correto (nwse-resize, ns-resize, ew-resize)

---

## Fase 6 — Toolbar Completa e Zoom (1 sessão)

**Objetivo**: Todos os controles da toolbar funcionam.

### Tarefas

1. Criar `useViewport.ts` com zoom steps
2. Atualizar `EditorCanvas.tsx` para aplicar zoom sobre o fit scale
3. Adicionar controles de zoom na toolbar
4. Atalhos de zoom: Ctrl+= (in), Ctrl+- (out), Ctrl+0 (fit)
5. Botão "Salvar" conectado à API
6. Feedback visual de save status

**Verificação da Fase 6**:
- [ ] Zoom in/out funciona com botões e atalhos
- [ ] Porcentagem de zoom é exibida corretamente
- [ ] "Fit to screen" ajusta o canvas para caber na área disponível
- [ ] "Salvar" envia para a API e mostra "✓ Salvo"
- [ ] Estado de erro ao salvar é exibido

---

## Fase 7 — Polimento e Acessibilidade (1-2 sessões)

**Objetivo**: O editor está pronto para uso por não-desenvolvedores.

### Tarefas

1. Banner de "Rascunho restaurado" ao abrir com dados do localStorage
2. Indicador "Alterações não salvas" na toolbar
3. Confirmar antes de resetar: dialog "Tem certeza? Todas as edições serão perdidas."
4. Tooltip em todos os botões da toolbar
5. Scroll automático do painel direito para o campo selecionado
6. Atalhos de navegação entre slides (↑/↓)
7. `aria-label` em todos os elementos interativos do overlay
8. Estado de loading nos thumbnails (suspense ou skeleton)

**Verificação da Fase 7**:
- [ ] Dialog de confirmação ao resetar
- [ ] Banner aparece ao abrir com rascunho salvo
- [ ] Painel direito faz scroll para o campo selecionado via canvas
- [ ] Navegação com teclado funciona em todos os painéis
- [ ] Não há warnings de acessibilidade no Chrome DevTools

---

## Fase 8 (pós-MVP) — Recursos Avançados

Esses recursos podem ser implementados em sprints futuros:

- [ ] Multi-select com Shift+clique (selecionar múltiplos campos)
- [ ] Duplicar slide
- [ ] Reordenar slides (drag no painel esquerdo)
- [ ] Export JSON download
- [ ] Import JSON (restaurar um export)
- [ ] Múltiplos decks (o seletor `PresentationSelector` já existe)
- [ ] Preview em fullscreen
- [ ] Modo de apresentação (avançar slides com tecla)

---

## Checklist de não-regressão

Antes de finalizar cada fase, verificar:

- [ ] O viewer original (seção 1) não foi modificado
- [ ] Os 20 slides renderizam sem erros no painel esquerdo
- [ ] A página carrega sem erros de hidratação (Next.js)
- [ ] Nenhum `console.error` no DevTools
- [ ] TypeScript compila sem erros (`npm run build` ou `tsc --noEmit`)
- [ ] A rota `/styleguide/paginas/apresentacoes-comerciais/[slide]` ainda funciona

---

## Arquivos que NÃO devem ser tocados

```
src/data/commercial-presentations/types.ts          # tipos originais
src/data/commercial-presentations/presentations.ts  # dados dos slides
src/components/commercial-presentations/slide-layouts/*.tsx  # layouts dos slides
src/components/commercial-presentations/PresentationSlide.tsx
src/components/commercial-presentations/PresentationCarousel.tsx
src/components/commercial-presentations/SlideViewport.tsx
src/components/commercial-presentations/SlideNavigation.tsx
src/components/commercial-presentations/SlideThumbnailRail.tsx
src/components/commercial-presentations/PresentationMeta.tsx
src/app/styleguide/paginas/apresentacoes-comerciais/[slide]/page.tsx
```

---

## Dependências necessárias

Verificar se já estão instaladas:

```bash
# Já deve estar:
# - react, react-dom, next, typescript, tailwindcss, clsx

# Verificar se existe:
# - lucide-react (para ícones da toolbar)
# - use-debounce (para debounce do autosave/history)

npm ls lucide-react use-debounce
```

Se não estiver:

```bash
npm install lucide-react use-debounce
```
