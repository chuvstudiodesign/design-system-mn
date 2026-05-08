# KICKOFF — Início da Implementação do Editor

> Este arquivo é lido pelo agente (Claude, Codex ou similar) quando o usuário
> sinalizar que quer começar a construir o editor. O agente deve apresentar
> este briefing ao usuário e aguardar confirmação antes de escrever qualquer código.

---

## Mensagem de arranque (o agente envia isso ao usuário)

---

Olá! Vejo que você quer começar a implementação do novo editor de apresentações.

Antes de escrever qualquer linha de código, deixa eu confirmar que estou alinhado com o que você quer:

**O que vou construir:**
Um editor visual embutido na página `/styleguide/paginas/apresentacoes-comerciais`, na seção 2 — abaixo do viewer original que já existe. O editor vai ter fidelidade total ao design (incluindo o chanfro, gradients e tokens do sistema), suporte aos 20 slides, edição inline de texto e imagens, undo/redo, e autosave.

**Por onde vou começar (Fase 1):**
1. Criar a estrutura de contexto (`EditorContext`) e os tipos base em `types.ts`
2. Montar o layout do editor (`EditorRoot`) com os três painéis: slides à esquerda, canvas no centro, propriedades à direita
3. Renderizar o `PresentationSlide` real dentro do canvas escalado (sem interação ainda)
4. Mostrar os 20 slides como thumbnails no painel esquerdo — clicáveis para navegar

**O que NÃO vou tocar:**
- O viewer original (seção 1) — nenhum arquivo de `PresentationCarousel`, `SlideViewport` ou `slide-layouts/` será modificado
- Os dados originais em `src/data/commercial-presentations/`
- A rota `/apresentacoes-comerciais/[slide]`

**Arquivos que vou criar (Fase 1):**
```
src/components/commercial-presentations/editor/
├── EditorRoot.tsx
├── EditorCanvas.tsx
├── EditorSlidePanel.tsx
├── EditorStatusBar.tsx
├── context/EditorContext.tsx
└── types.ts
```

**Onde fica a documentação completa:**
Toda a especificação está em `docs/editor/` — consulte `MASTER.md` como índice.

---

**Pode confirmar:**
1. Esse entendimento está correto?
2. Quer começar pela Fase 1 agora?
3. Tem alguma mudança de rota, nome de arquivo ou prioridade que eu deva saber antes de começar?

---

## Instruções para o agente (não exibir ao usuário)

Após o usuário confirmar:

1. Leia **todos** os arquivos em `docs/editor/` antes de escrever código — especialmente `MASTER.md`, `02-architecture.md` e `03-data-model.md`
2. Verifique o estado atual dos arquivos existentes:
   - `src/components/commercial-presentations/editor/EditablePresentationEditor.tsx` (legado)
   - `src/components/commercial-presentations/CommercialPresentationsPage.tsx` (onde o editor é montado)
   - `src/data/commercial-presentations/types.ts` (tipos que o editor usa)
   - `src/app/globals.css` (tokens de design)
3. Renomeie o editor legado para `EditablePresentationEditor.legacy.tsx` antes de criar o novo
4. Siga a ordem exata das fases em `11-implementation-phases.md`
5. Ao final de cada fase, liste o que foi criado e peça confirmação antes de avançar para a próxima
6. Nunca avance duas fases de uma vez sem validação do usuário
7. Se encontrar qualquer divergência entre os docs e o código atual, sinalize ao usuário antes de tomar uma decisão
