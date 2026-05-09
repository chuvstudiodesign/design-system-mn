# Sistema De Posts Para Midia Social MN

Sistema modular de agentes para criar lotes de posts editoriais de negocios para o Design System MN.

O objetivo e transformar pesquisa, copy, validacao factual, imagens e criacao visual em um fluxo consistente, sem improvisar estrutura a cada post.

## Estrutura
- `agents/orchestrator.md`: controlador principal do processo
- `agents/topic-agent.md`: gera 5 direcoes de tema
- `agents/copy-agent.md`: escreve a copy dos carrosseis
- `agents/fact-check-agent.md`: valida fatos antes de seguir
- `agents/image-agent.md`: escolhe URLs diretas de imagens
- `agents/visual-agent.md`: transforma o post em pagina visual no Design System MN
- `agents/figma-agent.md`: guia opcional para captura futura no Figma
- `workflows/post-creation-flow.md`: sequencia completa de execucao
- `config/rules.md`: regras globais
- `config/tone.md`: voz editorial
- `config/constraints.md`: limites de tema, copy, imagem e visual
- `memory/context.md`: memoria fixa do sistema

## Como Funciona
1. O usuario inicia o fluxo com `oi`, `comece a criar` ou equivalente.
2. O orchestrator carrega as regras e chama o topic agent.
3. O sistema gera 5 temas para um lote.
4. O sistema escreve 5 copies em carrossel de 8 paginas.
5. O sistema valida fatos antes de escolher imagens.
6. O sistema escolhe exatamente 4 imagens por post.
7. O sistema apresenta uma revisao compacta.
8. O sistema pausa antes da criacao visual.
9. Quando autorizado, o visual agent cria os posts no Design System MN.
10. A captura para Figma fica como etapa separada e opcional.

## Principios
- responder em portugues do Brasil
- operar passo a passo
- manter estado entre etapas
- pesquisar quando houver recencia ou risco factual
- preservar a copy validada na etapa visual
- usar o post `Vale do Silicio · Section` como matriz visual
- nao criar linguagem visual paralela
- nao usar nomes, links, arquivos ou convencoes de outra marca

## Lote Padrao
Cada ciclo gera exatamente 5 posts:
- 3 temas recentes do mes atual e do mes anterior
- pelo menos 1 tema recente idealmente das ultimas 2 semanas
- 1 tema de ensino sobre empreendedorismo
- 1 insight amplo sobre negocios, estrategia ou empreendedorismo

Temas de tecnologia, Big Techs, AI, inovacao ou Vale do Silicio sao permitidos quando o angulo principal for negocio, mercado, empreendedorismo, operacao, produto, crescimento ou decisao estrategica.

## Saida Visual Pretendida
Cada post deve virar um carrossel 4:5 de 8 paginas, dentro da area de midia social do Design System MN, baseado na estrutura validada do `Vale do Silicio · Section`.

## Ordem Recomendada De Uso
1. Ler `config/rules.md`
2. Ler `config/tone.md`
3. Ler `config/constraints.md`
4. Rodar `agents/orchestrator.md`
5. Seguir `workflows/post-creation-flow.md`
