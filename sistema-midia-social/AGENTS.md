# AI Social Post Agent System

Este repositório deve operar como um fluxo conversacional guiado para criação e aprimoramento do sistema de posts de social media.

## Startup Behavior

Quando o usuário iniciar a conversa com uma mensagem curta como:
- `oi`
- `ola`
- `olá`
- `hello`
- `hi`
- `start`
- `comece a criar`
- `pode começar a criar`
- `inicie a criação`
- ou qualquer equivalente claro de início

o agente deve:

1. carregar o contexto deste projeto
2. seguir `config/rules.md`
3. seguir `config/tone.md`
4. seguir `config/constraints.md`
5. usar `agents/orchestrator.md` como controlador principal
6. seguir `workflows/post-creation-flow.md`
7. iniciar diretamente no `Step 1`

Não fazer onboarding amplo.
Não pedir contexto genérico antes de começar.
Não pular etapas.
Interpretar comandos como `comece a criar` como início direto do fluxo completo em lote de 5 posts.

## Required Conversation Rules

- sempre responder em português do Brasil, salvo pedido contrário
- sempre seguir o fluxo step by step
- no fluxo em lote, avançar automaticamente até a conclusão, incluindo etapa visual e exportação para Figma
- depois do início do fluxo, não pedir confirmações intermediárias ao usuário
- nunca regenerar etapas anteriores sem pedido do usuário
- tratar design como assunto principal do sistema:
  - priorizar valor de produto, usabilidade, interface, linguagem visual, materiais, percepção, ergonomia e impacto prático
  - não usar sustentabilidade, carbono ou ESG como gancho principal quando o tema puder ser tratado pelo valor de design
  - se o tema envolver materiais ou cadeia produtiva, traduzir isso em benefício perceptível de produto, experiência ou decisão de projeto
- evitar referências já saturadas na pauta:
  - `Massimo Vignelli`
  - `Bauhaus`
  - `Dieter Rams`
- manter estado entre as etapas:
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
  - `figma_file_link`
  - `figma_page_result`

## Step Routing

- `Step 1`: usar `agents/topic-agent.md`
- `Step 2`: usar `agents/copy-agent.md`
- `Step 3`: usar `agents/fact-check-agent.md`
- `Step 4`: usar `agents/image-agent.md`
- `Step 5`: apresentar revisão final
- `Step 6`: usar `agents/visual-agent.md`
- `Step 7`: usar `agents/figma-agent.md`

## Opening Message

Ao iniciar, a primeira resposta deve seguir este padrão:

`Aqui estão 5 direções de post para desenvolver em lote. Posso ajustar a curadoria se você quiser, mas por padrão sigo com as 5.`

Depois disso, gerar imediatamente a saída de `Step 1` no formato correto.

## Visual Creation Rule

Quando chegar na etapa visual:

- criar sempre uma nova página dentro de `design-system/src/app/styleguide/social-media`
- usar um nome de rota derivado do nome do post aprovado
- colocar o post na section `Practical Demo` dessa nova página
- nunca sobrescrever uma página existente
- nunca substituir uma demo anterior por um novo post

## Batch Workflow Rule

- gerar sempre 5 posts por ciclo
- selecionar internamente os 5 tópicos gerados como batch padrão
- usar 3 temas recentes, 1 referência passada marcante e 1 insight amplo
- os temas recentes devem priorizar recência real e pesquisa
- não pausar entre topic, copy, fact check, imagens e revisão rápida
- após a revisão rápida, seguir direto para a criação visual
- após a criação visual, seguir direto para a exportação para Figma
- usar sempre o link de arquivo Figma pré-definido no sistema
- só interromper o avanço automático se houver falha técnica real ou se o usuário pedir mudanças

## Carousel Strategy Rule

- o padrão atual de copy deve seguir um carrossel de `8 páginas`
- a estrutura oficial passa a ser:
  - `P1` capa
  - `P2` contexto com imagem
  - `P3` tese ou leitura central
  - `P4` desdobramento em lista curta
  - `P5` novo contexto com imagem
  - `P6` nova tese ou consequência de design
  - `P7` síntese textual sem imagem
  - `P8` fechamento
- a revisão compacta continua existindo, mas é checkpoint interno e não pedido de aprovação
- a copy deve privilegiar retenção, compartilhamento e salvamento:
  - capa com hook claro
  - uma ideia principal por página
  - progressão narrativa com recompensa de swipe
  - conteúdo mais explicativo e menos baseado em frases de efeito

## Research Rule

- pesquisar temas recentes antes de fechar a curadoria
- validar fatos de todos os posts antes de selecionar imagens
- priorizar fontes oficiais e publicações confiáveis

## Image Rule

- cada post deve usar exatamente 4 imagens
- cada imagem deve ser entregue como URL direta do asset
- não usar páginas de busca, Google Images ou links intermediários como saída final
- a distribuição padrão deve privilegiar:
  - capa
  - apoio inicial
  - apoio intermediário na `Page 5`
  - fechamento

## Figma Default File Rule

- usar por padrão este arquivo Figma, sem pedir o link ao usuário:
- `https://www.figma.com/design/MtnwMcIBWw2pcXnjTbEZAo/Identidade-Chuv?node-id=0-1&t=qip2TXyAq7WTUTIV-1`
- na exportação, criar sempre 1 nova página em `Pages` para cada post aprovado
- em um lote de 5 posts, criar exatamente 5 novas páginas no Figma
- cada página deve receber apenas a captura completa do post correspondente

## Source Files

Arquivos de referência obrigatória:

- `README.md`
- `config/rules.md`
- `config/tone.md`
- `config/constraints.md`
- `agents/orchestrator.md`
- `agents/topic-agent.md`
- `agents/copy-agent.md`
- `agents/fact-check-agent.md`
- `agents/image-agent.md`
- `agents/visual-agent.md`
- `agents/figma-agent.md`
- `workflows/post-creation-flow.md`
- `memory/context.md`
