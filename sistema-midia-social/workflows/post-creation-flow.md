# Post Creation Flow

## Purpose
Definir a execucao passo a passo para gerar 5 posts de negocios em um lote, com pesquisa, copy, fact-check, imagens e preparacao para criacao visual no Design System MN.

## Flow Overview
1. Inicio da interacao
2. Sugestao de temas
3. Travar os 5 temas como lote padrao
4. Gerar copy dos carrosseis
5. Validar fatos
6. Selecionar imagens
7. Apresentar revisao compacta
8. Aguardar pedido para criacao visual
9. Criar pagina visual no Design System MN quando solicitado
10. Exportar para Figma somente se solicitado
11. Apresentar resultado
12. Encerrar

## Execution Steps

### Step 0: Start
Condicao de trigger:
- usuario diz `hi`
- ou diz `comece a criar`
- ou diz `pode começar a criar`
- ou diz `inicie a criação`
- ou envia mensagem curta equivalente

Acao do orchestrator:
- inicializar estado
- definir `current_step = topic_suggestion`
- chamar topic agent

### Step 1: Topic Suggestion
Agente:
- `agents/topic-agent.md`

Saida obrigatoria:
- exatamente 5 ideias
- 3 recentes
- 1 ensino
- 1 insight

Acao do orchestrator:
- salvar ideias em `topic_options`
- marcar as 5 como lote de producao por padrao
- salvar em `selected_topics`
- salvar em `approved_topics` salvo intervencao do usuario
- apresentar a lista

Stop condition:
- nao parar salvo pedido do usuario para alterar temas

### Step 2: Copy Generation
Agente:
- `agents/copy-agent.md`

Input:
- temas selecionados
- matriz visual `Vale do Silicio · Section`

Saida obrigatoria:
- 5 posts
- cada post com exatamente 8 paginas
- estrutura de copy compativel com os limites definidos

Acao do orchestrator:
- salvar resultado em `generated_copies`
- mover direto para verificacao factual

Stop condition:
- nao parar salvo interrupcao do usuario

### Step 3: Fact Check
Agente:
- `agents/fact-check-agent.md`

Input:
- temas selecionados
- copies geradas
- data atual

Saida obrigatoria:
- relatorio compacto de verificacao
- copy corrigida quando necessario

Acao do orchestrator:
- salvar relatorio em `fact_check_report`
- salvar copy corrigida em `verified_copies`
- mover direto para selecao de imagens

Stop condition:
- nao parar salvo interrupcao do usuario

### Step 4: Image Selection
Agente:
- `agents/image-agent.md`

Input:
- temas aprovados
- copies verificadas

Saida obrigatoria:
- exatamente 4 URLs diretas de imagem por post
- uso sugerido em `P1`, `P2`, `P5`, `P8`

Acao do orchestrator:
- salvar resultado em `image_selections`
- salvar resultado aprovado em `approved_images`
- mover direto para revisao compacta

Stop condition:
- nao parar salvo interrupcao do usuario

### Step 5: Final Review
Acao do orchestrator:
- apresentar pacote compacto com:
  - temas aprovados
  - copy verificada completa
  - imagens aprovadas
- marcar `final_review_presented = true`
- marcar `final_review_confirmed = true` apenas se o usuario confirmar
- pausar antes da etapa visual

Stop condition:
- parar e aguardar o usuario pedir criacao visual

### Step 6: Visual Creation
Agente:
- `agents/visual-agent.md`

Flow:
1. Validar que a revisao compacta existe.
2. Analisar o codigo real de midia social.
3. Usar a matriz `Vale do Silicio · Section`.
4. Criar/integrar a rota `styleguide/midia-social/cinco-posts`.
5. Criar uma section por post.
6. Renderizar 8 paginas lado a lado por post.
7. Incluir carrossel quando fizer sentido.
8. Apresentar resultado.

Acao do orchestrator:
- executar somente apos pedido do usuario
- salvar resultado em `visual_post_result`

Stop condition:
- nao executar antes do pedido explicito

Mandatory creation rule:
- usar o Design System MN real
- nunca substituir demo anterior sem pedido
- nunca criar sistema visual paralelo
- nao reescrever copy
- nao trocar imagens

### Step 7: Export To Figma
Agente:
- `agents/figma-agent.md`

Flow:
1. Confirmar pedido explicito do usuario.
2. Confirmar destino Figma.
3. Usar rotas locais criadas no Step 6.
4. Capturar a pagina real no localhost.
5. Enviar para o destino solicitado.
6. Confirmar conclusao.

Acao do orchestrator:
- executar somente se o usuario pedir

Stop condition:
- nao executar automaticamente
- nao executar se `visual_post_result` nao existir

### Step 8: Completion
Acao do orchestrator:
- confirmar temas aprovados
- confirmar copies verificadas
- confirmar imagens aprovadas
- confirmar resultado visual se Step 6 rodou
- confirmar exportacao se Step 7 rodou
- encerrar a sessao

## State Model
- `current_step`
- `topic_options`
- `selected_topics`
- `approved_topics`
- `generated_copies`
- `verified_copies`
- `fact_check_report`
- `image_selections`
- `approved_images`
- `final_review_presented`
- `final_review_confirmed`
- `visual_creation_confirmed`
- `visual_post_result`
- `figma_export_confirmed`
- `figma_page_result`

## Regeneration Rules
- Regenerar Step 1 nao gera copy nem imagens.
- Regenerar Step 2 mantem o lote de temas.
- Regenerar Step 3 mantem os temas e corrige apenas problemas factuais.
- Regenerar Step 4 mantem temas e copy verificada.
- Edicoes apos revisao compacta atualizam apenas a camada afetada.
- Step 6 nunca regenera tema, copy ou imagens.
- Step 7 nunca regenera tema, copy, imagens ou visual.
- Nunca recomputar etapas aprovadas sem pedido.

## Token Optimization Rules
- Usar um agente especialista por vez.
- Nao gerar analise longa de imagens.
- Pesquisar somente onde recencia e verificacao exigirem.
- Manter saidas compactas.
- Reutilizar estado aprovado.
- Nao adicionar rationale salvo pedido.

## Interaction Standard
- saidas curtas
- formato limpo
- checkpoints compactos
- sem aprovacoes desnecessarias antes da revisao
- pausa clara antes da criacao visual

## Narrative Standard
- cada carrossel deve operar como sequencia editorial
- `Page 1` prende a atencao
- `Pages 2 a 4` contextualizam e mostram a logica da leitura
- `Pages 5 a 7` aprofundam implicacao pratica
- `Page 8` fecha o raciocinio
- o sistema deve privilegiar conteudo salvavel e compartilhavel:
  - explicacao clara
  - progressao coerente
  - um ponto principal por pagina
  - menos slogan, mais interpretacao
