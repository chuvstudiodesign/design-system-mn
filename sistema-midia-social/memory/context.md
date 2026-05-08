# Context

Use este arquivo para contexto que precisa permanecer acessível neste projeto.

Exemplos:
- objetivos fixos do sistema
- estrutura dos agentes
- convenções locais
- regras que não devem ser esquecidas

## Estrutura Atual Do Sistema
- existe um sistema multi-agente já estruturado
- agentes existentes:
- `agents/orchestrator.md`
- `agents/topic-agent.md`
- `agents/copy-agent.md`
- `agents/fact-check-agent.md`
- `agents/image-agent.md`
- o fluxo original não deve ser quebrado nem recriado

## Extensão Implementada
- o fluxo passou a operar em lote com 5 posts por ciclo
- o sistema seleciona internamente os 5 tópicos e segue automaticamente até o gate visual
- o sistema agora segue até a etapa visual e a exportação no Figma sem pedir checkpoints intermediários
- a curadoria de tópicos agora exige:
- 3 temas recentes
- 1 referência passada marcante
- 1 insight amplo
- os temas recentes devem priorizar produtos, interfaces, identidades, motion, 3D, VFX, design industrial e sistemas visuais
- os temas recentes devem priorizar janela de 1 a 2 meses, com pelo menos 1 opção idealmente nas últimas 2 a 3 semanas
- a curadoria deve privilegiar valor de design:
  - benefício de produto
  - usabilidade
  - UI / UX
  - design industrial
  - materiais traduzidos em efeito prático
- não usar sustentabilidade ou carbono como gancho principal quando houver um recorte melhor de design
- evitar referências saturadas:
  - `Massimo Vignelli`
  - `Bauhaus`
  - `Dieter Rams`

- foi adicionada a etapa intermediária de validação factual antes da seleção de imagens
- essa etapa verifica datas, nomes, atribuições e detalhes de produto em fontes confiáveis
- se houver erro factual, a copy é corrigida antes do fluxo seguir

- o padrão atual de copy passou para `8 páginas`:
  - `P1` capa
  - `P2` contexto com imagem
  - `P3` tese ou leitura central
  - `P4` lista curta de prova
  - `P5` novo contexto com imagem
  - `P6` nova tese ou consequência
  - `P7` síntese textual sem imagem
  - `P8` fechamento
- a mudança foi motivada para melhorar retenção, compartilhamento e densidade narrativa sem inflar demais cada página individual

## Base Recente Para A Mudança
- referência de dados recente usada para orientar o novo padrão:
  - `Buffer`, relatório atualizado em `5 de março de 2026`, com análise de `52M+` posts de `2024–2025`
  - `Socialinsider`, benchmark de `2026` com análise de `35M` posts do Instagram coletados entre `janeiro de 2025` e `dezembro de 2025`
  - `Hootsuite`, guia publicado em `3 de dezembro de 2025` sobre carrosséis no Instagram
- síntese operacional adotada:
  - carrosséis continuam fortes para engajamento e saves
  - a primeira página funciona como hook crítico
  - conteúdo educativo e storytelling sequencial tendem a sustentar melhor o swipe
  - saves, shares e interações privadas importam mais do que leitura baseada só em likes públicos

- foi adicionada a etapa `Step 6 — Visual Creation`
- essa etapa só acontece depois de:
- tópicos definidos
- copies verificadas
- imagens definidas
- revisão rápida apresentada

- foi adicionada a etapa `Step 7 — Export to Figma`
- essa etapa só acontece depois de:
- `Step 6` concluído
- `visual_post_result` existente

## Regra Do Orchestrator
- após a revisão rápida do lote, o orchestrator deve seguir direto para a etapa visual

- após a criação visual, o orchestrator deve seguir direto para a exportação no Figma
- o fluxo não deve pedir checkpoints intermediários ao usuário depois que o lote começa

## Link Figma Padrão
- `figma_file_link` padrão:
- `https://www.figma.com/design/MtnwMcIBWw2pcXnjTbEZAo/Identidade-Chuv?node-id=0-1&t=qip2TXyAq7WTUTIV-1`
- o fluxo deve usar esse link automaticamente, sem pedir o arquivo ao usuário
- a exportação deve criar uma nova página em `Pages` para cada post do lote
- em ciclos de 5 posts, a exportação deve criar exatamente 5 novas páginas no arquivo
- cada página criada deve receber apenas a captura do seu respectivo post

## Design System Local
- o Design System usado pelo fluxo está no diretório local do projeto:
- `/Users/lucaszerlotini/Documents/post-midia-chuv/design-system`
- o fluxo deve trabalhar nesse diretório, sem pedir clone adicional

## Página De Teste Atual
- rota local do teste visual:
- `http://localhost:3000/styleguide/social-media/visual-post-creation`
- essa página foi criada para validar a etapa visual com conteúdo já aprovado, sem refazer os passos anteriores

## Regra De Criação Visual
- cada novo post aprovado deve gerar uma nova página dentro de `social-media`
- o nome da página deve seguir o nome do post em formato de rota
- o conteúdo do post deve entrar na section `Practical Demo` dessa nova página
- nunca substituir uma página de post já existente
- nunca publicar um novo post por cima de uma demo anterior

## Regra De Imagens
- cada post deve sair com exatamente 4 imagens
- o agente deve selecionar a URL direta do arquivo da imagem
- não usar link de busca, página de galeria ou página intermediária
- a distribuição padrão deve reforçar a narrativa:
  - capa
  - contexto inicial
  - contexto intermediário na página 5
  - fechamento
