# Apresentacoes Comerciais - progresso

## Objetivo

Criar a nova pagina `Paginas > Apresentacoes Comerciais` dentro do Design System MN, com uma galeria interativa de 10 modelos de apresentacoes comerciais. Cada modelo deve ter 20 slides em proporcao fixa 16:9, conteudo real sobre negocios, inovacao, tecnologia e empreendedorismo, e linguagem visual alinhada ao sistema existente.

## Analise do Design System

- Projeto em Next.js App Router, com rotas sob `src/app/styleguide`.
- A propria instrucao do projeto exige leitura da documentacao local do Next em `node_modules/next/dist/docs/`; foi consultado `01-app/index.md`.
- A navegacao lateral e declarada em `src/app/styleguide/navigation.ts`.
- A secao `Paginas` ja existe e contem `Blog`; a nova entrada deve seguir o padrao `/styleguide/paginas/...`.
- Layout global do styleguide usa canvas `--background` `#D4D4D4`, sidebar fixa `#ECECEC`, radius de 10px e item ativo `#AFF000`.
- Foundations principais:
  - Page header: `FoundationPageHeader`.
  - Section system: `Section`, com `first` usando `ChamferedPanel`.
  - Cards internos: classe `ds-card`, fundo branco, padding 30px, shadow `--shadow-card`.
  - Tipografia: `Typography` e classes `ds-display`, `ds-h1`, `ds-h2`, `ds-body`.
  - Tokens: `--background`, `--background-section`, `--card`, `--primary`, `--brand-dark-green`, `--border`, `--radius`.
- Componentes disponiveis relevantes: `Button`, `Badge`, `Card`, `Separator`, `Carousel`, `Typography`, icones `lucide-react`.
- Logotipo: assets locais em `public/logos`; uso seguro recomendado para esta pagina: `/logos/primary/masi-primary-dark.svg`, `/logos/primary/masi-primary-light.svg` e simbolo quando necessario.
- Pagina de referencia em `Páginas`: `src/app/styleguide/paginas/blog/page.tsx`, usando `ds-page`, `FoundationPageHeader`, `Section first` e sections posteriores.

## Estrutura criada

- `src/app/styleguide/paginas/apresentacoes-comerciais/page.tsx`
- `src/components/commercial-presentations/`
- `src/components/commercial-presentations/slide-layouts/`
- `src/data/commercial-presentations/`
- `docs/commercial-presentations-progress.md`

## Componentes planejados/criados

- `CommercialPresentationsPage`
- `PresentationSelector`
- `PresentationCarousel`
- `SlideViewport`
- `SlideNavigation`
- `SlideThumbnailRail`
- `PresentationMeta`
- `PresentationSlide`
- Layouts de slide por tipo: cover, statement, context, problem, opportunity, framework, stats, quote, timeline, comparison, cards, closing.

## Apresentacoes criadas

- 01. `O Futuro dos Negocios no Brasil` - 20 slides
- 02. `Como Empresas Inovadoras Crescem` - 20 slides
- 03. `Inteligencia Artificial para Liderancas` - 20 slides
- 04. `Mentalidade Vale do Silicio` - 20 slides
- 05. `Do Problema ao Produto` - 20 slides
- 06. `Estrategia Comercial para Novos Mercados` - 20 slides
- 07. `Ecossistemas de Negocios` - 20 slides
- 08. `Tecnologia como Vantagem Competitiva` - 20 slides
- 09. `Branding, Produto e Crescimento` - 20 slides
- 10. `A Nova Jornada do Empreendedor` - 20 slides

Total finalizado: 10 apresentacoes, 200 slides estruturados.

## Decisoes visuais

- Manter a pagina no padrao do styleguide: header fora de section, primeira section chanfrada, sections subsequentes em `#ECECEC`.
- Slides 16:9 como arteboards fixos dentro de viewport escalavel.
- Usar fundo, tipografia e contraste do sistema, com variacoes por deck atraves de acentos, grids editoriais, blocos conceituais, estatisticas, timelines e areas visuais abstratas.
- Evitar dependencia de URLs externas para imagens; usar composicoes abstratas sofisticadas e placeholders de imagem documentados.
- Ajuste posterior solicitado para o deck `O Futuro dos Negocios no Brasil`: capa passou a usar canvas `#D4D4D4`, section interna `#ECECEC`, radius 10px e chanfro no canto superior esquerdo.
- A textura quadriculada foi removida dos primitivos de slide e dos visuais abstratos.
- Tipografia da capa e do slide de tese foi compactada com menor line-height e largura maior para evitar quebras excessivas e texto saindo do arteboard.
- Caption da area de imagem foi reduzida e limitada para nao extrapolar o bloco.
- Novo ajuste no primeiro deck: pagina 8 teve titulo de framework reduzido e cards inferiores compactados para nao sair do arteboard.
- Novo ajuste no primeiro deck: paginas 3, 4, 5, 6, 10 e 13 ganharam respiro maior entre titulo e texto corrido no layout split.
- Novo ajuste no primeiro deck: pagina 9 recebeu tipografia mais compacta para evitar excesso de entrelinha.
- Novo ajuste no primeiro deck: pagina 17 recebeu tratamento liquid glass nos tres cards de risco, usando `backdrop-filter`, saturacao, bordas translucidas, brilho e camadas de luz sem dependencias novas.
- Novo ajuste estrutural no preview: a moldura branca externa do slide foi removida; o proprio documento agora ocupa o viewport 16:9.
- Novo ajuste estrutural no preview: o arteboard interno foi travado em 1600x900 e passa a ser escalado por `transform`, evitando reflow/espremer elementos internos ao reduzir a tela.
- Novo ajuste estrutural no primeiro slide do deck verde: padding externo do canvas reduzido para 20px; section interna mantem radius 10px e chanfro.
- Novo ajuste estrutural nos layouts de slide: removidos `clamp()`/`vw` dos elementos internos para impedir responsividade interna do arteboard.
- Novo ajuste de escala: elementos internos aumentados aproximadamente 10% mantendo o arteboard travado; capa verde recebeu gap fixo maior entre titulo, texto corrido e tags, alem de tags com padding mais confortavel.
- Novo ajuste de frame: todos os slides claros passam a usar canvas `#D4D4D4` + section interna `#ECECEC` com radius 10px; apenas a primeira capa verde mantem chanfro.
- Novo ajuste visual: removidos os degradês decorativos dos cantos superior direito e inferior esquerdo do `SlideShell`.
- Novo ajuste de escala: elementos internos aumentados mais 15%; logos da capa e encerramento ampliados para versao `large`; pagina 20 recebeu line-height mais compacto no titulo e quote.
- Novo ajuste visual: removidos os marcadores/acento do canto superior direito do visual abstrato da capa e dos cards de framework/decisao.
- Revisao tipografica: layouts similares mantem escala coerente por funcao (cover, statement, split, framework/decision, cards, stats e closing), sem igualar todos os slides.
- Ajuste no slide 15: removidas barras inferiores e trocado para matriz 2x2 de cards, alinhando com o estilo do slide 16.
- Ajuste fino: logo large reduzido de 32px para 31px.
- Revisao editorial: textos internos de `presentations.ts` foram acentuados e pontuados em portugues; slugs foram mantidos em ASCII para preservar IDs internos.
- Ajuste visual posterior: logo large aumentado para 33px e reutilizado nos slides 1 e 20; chanfro da capa do primeiro deck passou a usar `ChamferedPanel`, igual ao foundation.

## Decisoes de conteudo

- Conteudo editorial/comercial curto, sem lorem ipsum.
- Narrativas em 20 etapas por deck: capa, tese, contexto, problema, comportamento, oportunidade, dados, framework, principios, exemplo, benchmark, decisao, conceito, virada, plano, beneficios, riscos, recomendacoes, CTA e encerramento.

## Padroes de imagem

- Neste primeiro ciclo, imagens reais externas foram evitadas para nao depender de URLs instaveis.
- A direcao de imagem sera representada por paineis abstratos, mapas, grids, texturas discretas e areas reservadas com captions de uso futuro.

## Comandos executados

- `pwd`
- `rg --files ...`
- `git status --short`
- `sed -n ... package.json`
- `sed -n ... src/app/styleguide/navigation.ts`
- `sed -n ... src/app/styleguide/layout.tsx`
- `sed -n ... src/app/globals.css`
- `find node_modules/next/dist/docs ...`
- `sed -n ... node_modules/next/dist/docs/01-app/index.md`
- `sed -n ... src/app/styleguide/page.tsx`
- `sed -n ... src/app/styleguide/section-system/page.tsx`
- `sed -n ... src/app/styleguide/card-system/page.tsx`
- `sed -n ... src/app/styleguide/components/carousel/page.tsx`
- `sed -n ... src/app/styleguide/foundation-sections.tsx`
- `sed -n ... src/components/typography.tsx`
- `sed -n ... src/components/ui/button.tsx`
- `sed -n ... src/components/ui/card.tsx`
- `sed -n ... src/app/styleguide/logotipo/brand-data.ts`
- `sed -n ... src/app/styleguide/paginas/blog/page.tsx`
- `sed -n ... src/components/ui/carousel.tsx`
- `mkdir -p docs src/data/commercial-presentations src/components/commercial-presentations/slide-layouts src/app/styleguide/paginas/apresentacoes-comerciais`
- `npm run lint`
- `npm run build`
- `npm run lint` apos ajustes visuais solicitados
- `npm run build` apos ajustes visuais solicitados
- `npm run lint` apos ajustes das paginas 8, 9, 17 e espacamento split
- `npm run build` apos ajustes das paginas 8, 9, 17 e espacamento split
- `npm run lint` apos travamento do arteboard 1600x900 e remocao da moldura branca
- `npm run build` apos travamento do arteboard 1600x900 e remocao da moldura branca
- `npm run lint` apos aumento de escala interna em torno de 10%
- `npm run build` apos aumento de escala interna em torno de 10%
- `npm run lint` apos aplicar section frame nos slides claros e remover degradês de canto
- `npm run build` apos aplicar section frame nos slides claros e remover degradês de canto
- `npm run lint` apos aumento adicional de 15% e ajuste dos logos
- `npm run build` apos aumento adicional de 15% e ajuste dos logos
- `npm run lint` apos remover marcadores/acento dos cards e visual abstrato
- `npm run build` apos remover marcadores/acento dos cards e visual abstrato
- `npm run lint` apos revisao tipografica e ajuste do slide 15
- `npm run build` apos revisao tipografica e ajuste do slide 15
- `npm run lint` apos revisao editorial de acentos/pontuacao e ajuste do chanfro/logo
- `npm run build` apos revisao editorial de acentos/pontuacao e ajuste do chanfro/logo
- `npm run dev` (detectou servidor existente em `localhost:3000`)
- `curl -I http://127.0.0.1:3000/styleguide/paginas/apresentacoes-comerciais`
- `curl -s http://127.0.0.1:3000/styleguide/paginas/apresentacoes-comerciais`
- `git status --short`
- `git diff --stat`
- `rg "Apresentações Comerciais|commercialPresentations|Slide 1 de|200 slides" src docs`

## Erros encontrados

- Primeira execucao de `npm run lint` apontou `react-hooks/set-state-in-effect` em `PresentationCarousel.tsx`, causado por reset sincrono de slide ao trocar apresentacao.
- Correcao aplicada: remount controlado via `key={selectedPresentation.slug}` em `CommercialPresentationsPage`, removendo o `useEffect` com `setCurrentIndex(0)`.
- Segunda execucao de `npm run lint`: passou sem erros.
- `npm run build`: passou e prerenderizou `/styleguide/paginas/apresentacoes-comerciais`.
- Depois dos ajustes na capa verde, remocao de grade e tipografia: `npm run lint` e `npm run build` passaram novamente.
- Depois dos ajustes das paginas 8, 9, 17 e espacamento split: `npm run lint` e `npm run build` passaram novamente.
- Depois do travamento do arteboard, remocao da moldura branca e retirada de `clamp()`/`vw`: `npm run lint` e `npm run build` passaram novamente.
- Depois do aumento de escala interna em torno de 10%: `npm run lint` e `npm run build` passaram novamente.
- Depois de aplicar section frame nos slides claros e remover degradês de canto: `npm run lint` e `npm run build` passaram novamente.
- Depois do aumento adicional de 15% e ajuste dos logos: `npm run lint` e `npm run build` passaram novamente.
- Depois de remover marcadores/acento dos cards e visual abstrato: `npm run lint` e `npm run build` passaram novamente.
- Depois da revisao tipografica e ajuste do slide 15: `npm run lint` e `npm run build` passaram novamente.
- Depois da revisao editorial de acentos/pontuacao e ajuste do chanfro/logo: `npm run lint` e `npm run build` passaram novamente.
- `curl -I` na rota local retornou `HTTP/1.1 200 OK`.
- Worktree ja tinha arquivo nao rastreado `Icon\r`; nao foi tocado.

## O que falta fazer

- Opcional: revisar visualmente com browser/Playwright quando a ferramenta estiver disponivel na sessao.
- Opcional: substituir placeholders abstratos por imagens editoriais reais aprovadas.

## Proximos passos

1. Abrir `http://localhost:3000/styleguide/paginas/apresentacoes-comerciais` para revisao visual humana.
2. Testar manualmente selecao das 10 apresentacoes e navegacao entre slides.
3. Substituir areas abstratas por imagens reais, se houver biblioteca aprovada.
