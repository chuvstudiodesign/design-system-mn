# Sistema De Posts Para Midia Social MN

Este diretorio opera como um fluxo conversacional guiado para criacao de posts de negocios no Design System MN.

## Startup Behavior

Quando o usuario iniciar a conversa com:
- `oi`
- `ola`
- `olá`
- `hello`
- `hi`
- `start`
- `comece a criar`
- `pode começar a criar`
- `inicie a criação`
- ou equivalente claro de inicio

o agente deve:

1. carregar o contexto deste diretorio
2. seguir `config/rules.md`
3. seguir `config/tone.md`
4. seguir `config/constraints.md`
5. usar `agents/orchestrator.md` como controlador principal
6. seguir `workflows/post-creation-flow.md`
7. iniciar diretamente no `Step 1`

Nao fazer onboarding amplo.
Nao pedir contexto generico antes de comecar.
Nao pular etapas.
Interpretar comandos como `comece a criar` como inicio direto do fluxo de lote.

## Required Conversation Rules

- sempre responder em portugues do Brasil, salvo pedido contrario
- sempre seguir o fluxo step by step
- no fluxo em lote, avancar automaticamente ate a revisao compacta
- pausar antes da criacao visual
- nao executar exportacao para Figma sem pedido explicito
- nunca regenerar etapas anteriores sem pedido do usuario
- tratar negocios como assunto principal do sistema
- temas de tech, AI, Big Techs, inovacao e Vale do Silicio sao permitidos quando o insight central for de negocio
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
  - `figma_page_result`

## Step Routing

- `Step 1`: usar `agents/topic-agent.md`
- `Step 2`: usar `agents/copy-agent.md`
- `Step 3`: usar `agents/fact-check-agent.md`
- `Step 4`: usar `agents/image-agent.md`
- `Step 5`: apresentar revisao final compacta
- `Step 6`: usar `agents/visual-agent.md` somente apos confirmacao
- `Step 7`: usar `agents/figma-agent.md` somente apos pedido explicito

## Opening Message

Ao iniciar, a primeira resposta deve seguir este padrao:

`Aqui estao 5 direcoes de post para desenvolver em lote. Posso ajustar a curadoria se voce quiser, mas por padrao sigo com as 5.`

Depois disso, gerar imediatamente a saida de `Step 1` no formato correto.

## Visual Creation Rule

Quando chegar na etapa visual:

- usar a area real `src/app/styleguide/midia-social`
- integrar os posts ao ecossistema de `src/components/social-media`
- criar uma pagina/rota de lote chamada `cinco-posts` quando o lote visual for solicitado
- apresentar cada post em uma section propria
- incluir uma visao horizontal com todas as 8 paginas lado a lado
- incluir tambem uma versao em carrossel quando fizer sentido no componente existente
- basear a composicao no post validado `Vale do Silicio · Section`
- nunca sobrescrever um post existente
- nunca criar um sistema visual paralelo

## Batch Workflow Rule

- gerar sempre 5 posts por ciclo
- selecionar internamente os 5 topicos gerados como batch padrao
- usar a composicao:
  - 3 temas recentes do mes atual e do mes anterior
  - pelo menos 1 tema recente idealmente das ultimas 2 semanas
  - 1 tema de ensino sobre empreendedorismo
  - 1 insight amplo sobre negocios ou empreendedorismo
- nao pausar entre tema, copy, fact check, imagens e revisao rapida
- pausar antes da criacao visual
- exportacao para Figma e etapa posterior, manual e opcional

## Carousel Strategy Rule

- o padrao oficial de copy deve seguir carrossel de `8 paginas`
- estrutura oficial:
  - `P1` capa
  - `P2` contexto com imagem
  - `P3` dado, prova ou tensao central
  - `P4` desdobramento em lista curta
  - `P5` novo contexto com imagem
  - `P6` consequencia estrategica
  - `P7` sintese aplicavel
  - `P8` fechamento
- cada pagina deve ter uma ideia principal
- a progressao deve favorecer retencao, compartilhamento e salvamento
- o texto deve caber no template visual derivado de `Vale do Silicio · Section`

## Research Rule

- pesquisar temas recentes antes de fechar a curadoria
- validar fatos de todos os posts antes de selecionar imagens
- usar fontes oficiais e publicacoes confiaveis
- quando houver data relativa, registrar a data absoluta

## Image Rule

- cada post deve usar exatamente 4 imagens
- cada imagem deve ser entregue como URL direta do asset
- nao usar paginas de busca, Google Images ou links intermediarios como saida final
- distribuicao padrao:
  - capa
  - apoio inicial na `P2`
  - apoio intermediario na `P5`
  - fechamento ou reforco visual na `P8`

## Figma Rule

- nao exportar para Figma automaticamente
- so executar `Step 7` quando o usuario pedir explicitamente
- quando executado, capturar as paginas reais do Design System MN em localhost
- nao reconstruir manualmente o post no Figma

## Source Files

Arquivos de referencia obrigatoria:

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
