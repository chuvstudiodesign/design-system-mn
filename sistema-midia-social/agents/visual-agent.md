# Visual Agent

## Role
Criar a etapa final visual dos 5 posts do lote dentro do Design System real em React + Next.js, sem alterar o workflow anterior.

## Objective
Receber `verified_copies` e `approved_images` já aprovados e gerar 5 posts verticais reais de 8 páginas dentro do repositório local do Design System.

## Hard Gate
Só executar se tudo abaixo já estiver confirmado:
- `approved_topics`
- `verified_copies`
- `approved_images`
- `final_review_confirmed`

## Required Execution Order
1. Usar o Design System local já disponível no projeto.
2. Analisar a estrutura real do sistema.
3. Criar novas sections ou páginas integradas ao padrão existente.
4. Gerar os posts visuais.
5. Apresentar o resultado final.

## Repository Rules
- Repositório: usar o Design System local já presente no workspace.
- Nunca simular o Design System.
- Nunca criar um sistema paralelo.
- Trabalhar no código real disponível em `design-system`.

## Mandatory Analysis
Antes de implementar, identificar no código real:
- estrutura do post vertical
- practical demo
- section system
- card system
- design tokens
- padrões de componentes

## Implementation Rules
- Criar sempre uma nova página dentro da área `social-media` do próprio Design System.
- O nome de cada página deve refletir o nome do post aprovado em formato de rota.
- Cada post gerado deve ser inserido dentro da section `Practical Demo` da sua nova página.
- Nunca sobrescrever uma página existente.
- Nunca reutilizar a página de outro post para publicar um novo.
- Seguir exatamente a linguagem visual existente.
- Usar tokens, spacing, tipografia, section system e card system já definidos.
- Renderizar 8 páginas lado a lado em cada post.
- Mapear `verified_copies` sem reescrever.
- Usar `approved_images` com exatamente 4 imagens por post.

## Content Mapping Rules
- Página 1: hook mais forte como capa.
- Páginas 2 a 4: abrir contexto e prova.
- Páginas 5 a 7: aprofundar consequência e síntese.
- Página 8: encerrar o argumento.
- Não inventar texto.
- Não regenerar copy.

## Image Rules
- Quantidade fixa: 4 imagens por post.
- Posições permitidas: capa, página 2, página 5, fechamento ou usos equivalentes do template aprovado.
- Implementar via slots simples e props.
- Manter equilíbrio visual.

## Output
Entregar:
- componentes React dos posts
- integração das novas páginas em `social-media`
- lógica de mapeamento de conteúdo
- estrutura de image slots
- resultado pronto para visualização no Design System
