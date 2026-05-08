# 01 — Visão, Objetivos e Critérios de Sucesso

## Problema atual

O editor experimental em `EditablePresentationEditor.tsx` tem falhas estruturais:

1. **Modelo de dados paralelo**: cria uma representação própria de layers que não se conecta ao `CommercialPresentation`. Resultado: chanfro, gradients, bullets, gráficos e todas as particularidades visuais dos slides não aparecem no editor.
2. **Apenas 3 slides**: os dados iniciais hardcoded cobrem apenas cover, statement e context. Os 17 outros slides não são editáveis.
3. **Sem resize de imagem**: drag só move, não redimensiona.
4. **Sem undo/redo**: qualquer erro é permanente até o reset.
5. **Escala incorreta**: o canvas não respeita a proporção 16:9 em todos os breakpoints.
6. **Sem feedback visual de campo**: o usuário não sabe quais partes do slide são editáveis.

## O que queremos construir

Um editor que funciona como o Google Slides ou Canva, mas integrado ao design system MN:

- **Fidelidade 100%**: o slide no editor é idêntico ao slide no viewer
- **Edição contextual**: clicar em um elemento seleciona o campo correspondente no inspetor
- **Resize visual**: arrastar handles de imagem redimensiona `width`/`height` com feedback em tempo real
- **Todos os 20 slides editáveis**
- **Undo/redo** com Ctrl+Z / Ctrl+Y
- **Keyboard-first**: Delete para excluir seleção de campo, Tab para navegar entre campos
- **Autosave**: localStorage salva a cada 1s de inatividade

## Objetivos (O que vamos construir)

### Obrigatório (MVP)
- [ ] Renderizar todos os 20 slides no editor com fidelidade visual completa
- [ ] Selecionar campos de texto com clique e editar inline
- [ ] Selecionar imagens com clique e redimensionar via handles
- [ ] Painel de propriedades que reflete o campo selecionado
- [ ] Lista de slides à esquerda com thumbnails navegáveis
- [ ] Undo/redo funcional (mínimo 50 estados)
- [ ] Autosave em localStorage
- [ ] Botão "Salvar no servidor" (POST para API existente)
- [ ] Botão "Resetar para original"

### Importante (pós-MVP)
- [ ] Multi-select com Shift+clique
- [ ] Alinhamento de elementos (centro, esquerda, etc.) — apenas para campos de imagem
- [ ] Arrastar slides para reordenar
- [ ] Duplicar slide
- [ ] Export como JSON com dados do `CommercialPresentation`

### Fora do escopo (não construir agora)
- Export para PDF (complexidade alta, exige headless browser)
- Adicionar novos tipos de slide
- Criar novos campos que não existem no tipo `CommercialSlide`
- Suporte multi-usuário / colaboração
- Versionamento histórico além do localStorage

## Critérios de sucesso

O editor é bem-sucedido quando:

1. Abrir o editor no slide 1 (Cover "futuro-negocios-brasil") mostra o ChamferedPanel exatamente como no viewer
2. Clicar no título do slide 1 seleciona o campo `title` e o painel direito mostra um textarea com o conteúdo
3. Editar o textarea atualiza o slide em tempo real (sem recarregar)
4. Clicar e arrastar a imagem do slide muda a posição visual
5. Arrastar um handle de canto da imagem redimensiona com aspect ratio
6. Ctrl+Z desfaz a última edição
7. Fechar e reabrir o editor preserva as edições (localStorage)
8. O slide 1 no viewer original NÃO é afetado pelas edições do editor

## Personas

**Designer de Conteúdo (usuário primário)**: Trabalha no design system MN, precisa adaptar apresentações comerciais para clientes diferentes. Muda textos, troca imagens, ajusta proporções. Não é desenvolvedor.

**Designer de Sistema**: Constrói e mantém o design system. Usa o editor para testar variações sem editar código. Conhece o sistema de tokens.
