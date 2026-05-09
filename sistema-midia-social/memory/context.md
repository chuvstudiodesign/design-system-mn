# Context

Use este arquivo para contexto fixo do sistema de posts de midia social MN.

## Objetivo Do Sistema
- criar um fluxo modular de agentes para posts editoriais de negocios
- gerar 5 posts por ciclo
- manter tema, copy, fact check, imagens e visual como etapas separadas
- usar o Design System MN real como fonte visual
- evitar qualquer referencia operacional a outra marca

## Estrutura Atual Do Sistema
- existe um sistema multi-agente estruturado em:
  - `agents/orchestrator.md`
  - `agents/topic-agent.md`
  - `agents/copy-agent.md`
  - `agents/fact-check-agent.md`
  - `agents/image-agent.md`
  - `agents/visual-agent.md`
  - `agents/figma-agent.md`
- o fluxo nao deve ser quebrado nem recriado fora desta estrutura

## Fluxo De Lote
- o sistema opera com 5 posts por ciclo
- os 5 temas sao selecionados internamente como lote padrao
- o sistema avanca automaticamente ate a revisao compacta
- a criacao visual so ocorre quando o usuario pedir
- a exportacao para Figma so ocorre quando o usuario pedir explicitamente

## Curadoria De Temas
Composicao fixa:
- 3 temas recentes
- 1 tema de ensino sobre empreendedorismo
- 1 insight amplo sobre negocios ou empreendedorismo

Temas recentes:
- devem vir do mes atual e do mes anterior
- pelo menos 1 deve idealmente vir das ultimas 2 semanas
- devem ser pesquisados antes de aprovados
- devem ter potencial de fact-check

Areas permitidas:
- negocios brasileiros
- mercado brasileiro
- Vale do Silicio
- Big Techs
- tecnologia
- AI
- inovacao
- startups
- produto
- crescimento
- modelos de negocio
- gestao
- vendas
- operacao
- planejamento estrategico
- OKRs
- posicionamento
- pricing
- eficiencia operacional
- capital, caixa e margem
- lideranca empreendedora

Regra central:
- o tema pode envolver tecnologia, mas o angulo principal deve ser negocio

## Padrao De Copy
- cada post tem exatamente 8 paginas
- estrutura oficial:
  - `P1` capa
  - `P2` contexto com imagem
  - `P3` dado, prova ou tensao central
  - `P4` lista curta
  - `P5` novo contexto com imagem
  - `P6` consequencia estrategica
  - `P7` sintese aplicavel
  - `P8` fechamento
- cada pagina deve ter uma ideia principal
- o conteudo deve ser salvavel e compartilhavel
- menos slogan, mais interpretacao

## Limites De Copy
Os limites oficiais ficam em `config/constraints.md`.

Principio geral:
- escrever curto
- evitar overflow
- distribuir explicacao nas 8 paginas
- nunca aumentar texto para preencher espaco

## Fact Check
- validar todos os fatos antes da selecao de imagens
- checar datas, nomes, empresas, produtos, metricas e atribuicoes
- usar fontes oficiais ou confiaveis
- corrigir copy apenas onde houver erro
- revisar portugues junto com factualidade

## Imagens
- cada post deve ter exatamente 4 imagens
- cada imagem deve ser URL direta do asset
- distribuicao padrao:
  - `P1`
  - `P2`
  - `P5`
  - `P8`
- evitar pagina de busca, galeria ou link intermediario como saida final

## Base Visual Do Design System MN
Matriz validada:
- `Vale do Silicio · Section`

Arquivos relevantes:
- `src/app/styleguide/midia-social/page.tsx`
- `src/components/social-media/SocialMediaPage.tsx`
- `src/components/social-media/CarouselViewer.tsx`
- `src/components/social-media/posts/foundation-carousels.tsx`

Caracteristicas visuais da matriz:
- formato `1080 x 1350`
- base cinza
- section interna clara
- cards brancos
- verde principal `#5FC318`
- verde brand `#AFF000`
- dark section `#0C1C16`
- raio visual proximo de `10px`
- capa com chanfro
- tipografia grande
- rodape com logo MN
- paginas com card, metrica, lista e fechamento

## Regra De Criacao Visual
- criar/integrar uma pagina de lote chamada `cinco-posts` quando o usuario pedir visual
- usar a area `src/app/styleguide/midia-social`
- usar componentes em `src/components/social-media`
- cada post deve ter uma section propria
- cada section deve mostrar as 8 paginas lado a lado
- incluir carrossel complementar quando fizer sentido
- nao sobrescrever demos existentes sem pedido
- nao criar sistema paralelo
- nao reescrever copy na etapa visual
- nao trocar imagens na etapa visual

## Figma
- Figma nao e etapa automatica
- executar apenas quando o usuario pedir explicitamente
- capturar as paginas reais do Design System MN em localhost
- nao reconstruir manualmente os posts no Figma

## Regra Do Orchestrator
- apos inicio, seguir ate a revisao compacta
- apos revisao compacta, pausar
- se o usuario pedir visual, executar Step 6
- se o usuario pedir Figma depois do visual, executar Step 7
- preservar estado aprovado entre etapas
