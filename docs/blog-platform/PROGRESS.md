# Blog/CMS Platform Progress

## Objetivo

Construir uma plataforma completa de Blog/CMS dentro do Design System MN, inicialmente como uma experiencia local-first em `/styleguide/paginas/blog`, com UI, dados, componentes, SEO e documentacao preparados para migracao futura para CMS real.

## Permissoes

O usuario concedeu modo full auto responsavel para ler, criar, editar, documentar e validar o projeto. Nao serao feitas alteracoes destrutivas nem instaladas dependencias sem necessidade.

## Analise inicial do Design System

- Projeto Next.js App Router em `src/app`, com Next `16.2.4`.
- O repo exige ler docs locais em `node_modules/next/dist/docs/` antes de codar; foram consultados guias de pages/layouts, dynamic routes, Server/Client Components e metadata.
- Rotas principais vivem dentro de `src/app/styleguide`.
- Layout global do design system: `src/app/styleguide/layout.tsx`.
- Sidebar/navegacao: `src/app/styleguide/navigation.ts`.
- Estrutura visual base:
  - `.ds-page` para fluxo vertical.
  - `FoundationPageHeader` para cabecalho de pagina.
  - `Section` para containers de assunto, com chanfro na primeira section.
  - `.ds-card` e `Card` para cards internos.
  - `Typography`, `Button`, `Badge`, `Input`, `Table` como componentes base.
- Tokens principais em `src/app/globals.css`:
  - `--background` `#D4D4D4`
  - `--background-section` `#ECECEC`
  - `--card` `#FFFFFF`
  - `--primary` `#5FC318`
  - `--brand-green` restrito ao item ativo da sidebar
  - radius base `10px`
  - spacing page `30px`, section `80px 60px`

## Decisoes tecnicas

- Rota escolhida: `/styleguide/paginas/blog`, porque o Blog deve nascer dentro do Design System e a sidebar atual opera sob `/styleguide`.
- Pagina individual: `/styleguide/paginas/blog/[slug]`.
- CMS mockado: `/styleguide/paginas/blog/cms`.
- Conteudo local-first em TypeScript para preservar tipagem e facilitar troca futura por adapter de CMS.
- Interatividade de busca/filtros ficara isolada em Client Components pequenos. Paginas e dados seguem Server Components por padrao.
- Nao instalar dependencias nesta primeira fase.

## Estrutura planejada

- `src/data/blog`: tipos, autores, categorias, tags, posts.
- `src/lib/blog`: helpers de busca, filtro, related posts, SEO e leitura.
- `src/components/blog`: componentes reutilizaveis da experiencia editorial e CMS.
- `src/app/styleguide/paginas/blog`: home, post dinamico e CMS mockado.
- `docs/blog-platform`: progresso, arquitetura e notas de CMS.

## Progresso

- [x] Permissoes analisadas.
- [x] Design System e docs Next locais analisados.
- [x] Pastas base criadas.
- [x] Dados locais criados.
- [x] Helpers criados.
- [x] Componentes de blog criados.
- [x] Paginas conectadas.
- [x] Sidebar atualizada.
- [x] SEO implementado.
- [x] Validacoes executadas.
- [x] Capas substituidas por imagens reais em alta resolucao.

## Comandos executados

- `rg --files ...` para mapear estrutura.
- `find node_modules/next/dist/docs ...` para localizar docs locais.
- Leituras com `sed` em `foundation-sections.tsx`, `layout.tsx`, `navigation.ts`, `globals.css`, componentes base e docs Next.
- `mkdir -p docs/blog-platform src/data/blog src/lib/blog src/components/blog src/app/styleguide/paginas/blog/cms src/app/styleguide/paginas/blog/[slug]`
- `npm run lint`
- `npm run build`
- `curl -I http://127.0.0.1:3000/styleguide/paginas/blog`
- `curl -I http://127.0.0.1:3000/styleguide/paginas/blog/cms`
- `curl -I http://127.0.0.1:3000/styleguide/paginas/blog/como-a-inovacao-aplicada-transforma-empresas-tradicionais`

## Estrutura criada ate agora

- `docs/blog-platform/PROGRESS.md`
- `docs/blog-platform/ARCHITECTURE.md`
- `docs/blog-platform/CMS_NOTES.md`
- `src/data/blog/types.ts`
- `src/data/blog/categories.ts`
- `src/data/blog/tags.ts`
- `src/data/blog/authors.ts`
- `src/data/blog/posts.ts`
- `src/lib/blog/format.ts`
- `src/lib/blog/queries.ts`
- `src/lib/blog/seo.ts`
- `src/components/blog/blog-cover.tsx`
- `src/components/blog/blog-post-card.tsx`
- `src/components/blog/blog-filter-experience.tsx`
- `src/components/blog/blog-post-header.tsx`
- `src/components/blog/blog-post-content.tsx`
- `src/components/blog/blog-related-posts.tsx`
- `src/components/blog/newsletter-cta.tsx`
- `src/components/blog/cms-status-badge.tsx`
- `src/components/blog/cms-post-table.tsx`
- `src/components/blog/cms-post-form-preview.tsx`

## Dados criados

- 5 categorias editoriais: Estrategia, Inovacao, Tecnologia, Lideranca e Crescimento.
- 12 tags editoriais.
- 4 autores mockados.
- 12 posts, sendo 10 publicados, 1 rascunho e 1 agendado.
- Conteudo estruturado por blocos para pagina individual e migracao futura.

## Componentes criados

- `BlogCover`: capa editorial com imagem real sem elementos sobrepostos e fallback visual apenas quando nao houver URL.
- `BlogPostCard`: card editorial reutilizavel para grid e relacionados.
- `BlogFilterExperience`: busca e filtros locais por query, categoria e tag.
- `BlogPostHeader`: header semantico de post.
- `BlogPostContent`: renderizador de blocos ricos.
- `BlogRelatedPosts`: grid de recomendados.
- `NewsletterCTA`: CTA visual demonstrativo.
- `CMSPostTable`: tabela client-side de posts com busca/filtro.
- `CMSPostFormPreview`: preview de formulario/editor mockado.
- `CMSStatusBadge`: padronizacao dos status editoriais.
- `CMSBlogManager`: gerenciador client-side funcional com criar, editar, selecionar e salvar em memoria.

## Correção CMS

- O primeiro CMS era visual e os botoes `Novo post` e `Editar` nao alteravam estado.
- Foi criada a camada `CMSBlogManager`, que mantem posts em estado local no navegador.
- O fluxo agora permite selecionar um post, editar titulo/subtitulo/excerpt/slug/categoria/autor/status/tags/SEO, marcar destaque, criar rascunho e salvar as alteracoes em memoria.
- Ainda nao ha persistencia em banco/CMS real; isso fica documentado como proxima camada.

## Paginas criadas

- `/styleguide/paginas/blog`
- `/styleguide/paginas/blog/[slug]`
- `/styleguide/paginas/blog/cms`

## Sidebar

- Adicionada a area `Páginas`.
- Adicionado item `Blog` apontando para `/styleguide/paginas/blog`.

## Validacao

- `npm run lint`: passou.
- `npm run build`: passou apos corrigir dois erros de tipagem.
- Rotas locais checadas por HTTP:
  - `/styleguide/paginas/blog`: `200 OK`
  - `/styleguide/paginas/blog/cms`: `200 OK`
  - `/styleguide/paginas/blog/como-a-inovacao-aplicada-transforma-empresas-tradicionais`: `200 OK`

## Atualizacao de imagens

- Posts passaram a usar imagens reais remotas em alta resolucao via `images.unsplash.com`.
- `BlogCover` foi atualizado para renderizar a foto real limpa, sem bordas, overlays ou elementos decorativos sobre a imagem. O fallback visual so aparece quando nao houver URL.
- As imagens foram ajustadas para priorizar cenas com pessoas relacionadas ao tema de cada artigo.
- Todas as imagens reais recebem `saturate(1.1)` via classe Tailwind para ficarem cerca de 10% mais vivas sem overlay.
- Verdes do Blog usam `--primary` / `#5FC318`; `--brand-green` permanece reservado para sidebar ativa.
- Textos verdes do Blog usam a mesma tipografia em bold para reforcar hierarquia.
- As imagens continuam sem exigir configuracao de `next/image`, porque o componente usa `<img>` e o build nao precisa buscar os arquivos remotos.

## Problemas encontrados e correcoes

- A factory local de posts omitia `categorySlug` do tipo de entrada, mas precisava desse campo para resolver a categoria. Corrigido em `src/data/blog/posts.ts`.
- O type guard de relacionados acessava `item.status` antes de estreitar `undefined`. Corrigido em `src/lib/blog/queries.ts`.

## Onde parei

A base robusta do Blog/CMS esta implementada e validada. O proximo trabalho deve focar em refinamento visual fino no navegador, melhoria do CMS mockado com tabs e futuros adapters reais.

## Proximos passos recomendados

1. Fazer QA visual em desktop e mobile com screenshots.
2. Adicionar tabs no editor mockado: Conteudo, SEO, Publicacao e Historico.
3. Criar adapter real quando o CMS/banco for escolhido.
4. Adicionar imagens reais ou pipeline de OG images.
5. Criar testes unitarios simples para filtros e helpers.

## Atualizacao de categorias e carrossel

- Categorias do blog agora usam cores de marcas do Design System:
  - Estrategia: Advisor `#5C00FF`
  - Inovacao: Academy `#9E00FF`
  - Tecnologia: Webinar `#FFEA00`
  - Lideranca: Workshop `#F54A00`
  - Crescimento: MXP `#FF0055`
- Badges de categoria usam a mesma cor nos cards, artigo, biblioteca e CMS.
- `Leitura recomendada` virou carrossel infinito (`loop: true`) usando o mesmo `BlogPostCard`, com todos os posts publicados.

## Proximos passos imediatos

1. Criar tipos e conteudo local-first.
2. Criar helpers puros para obter, filtrar e relacionar posts.
3. Criar componentes de UI reutilizaveis usando o Design System existente.
4. Criar rotas e atualizar sidebar.
