# Blog/CMS Platform Progress

## Objetivo

Construir uma plataforma completa de Blog/CMS dentro do Design System MN, inicialmente como uma experiência local-first em `/styleguide/paginas/blog`, com UI, dados, componentes, SEO e documentação preparados para migração futura para CMS real.

## Permissões

O usuário concedeu modo full auto responsável para ler, criar, editar, documentar e validar o projeto. Não serão feitas alterações destrutivas nem instaladas dependências sem necessidade.

## Análise inicial do Design System

- Projeto Next.js App Router em `src/app`, com Next `16.2.4`.
- O repo exige ler docs locais em `node_modules/next/dist/docs/` antes de codar; foram consultados guias de pages/layouts, dynamic routes, Server/Client Components e metadata.
- Rotas principais vivem dentro de `src/app/styleguide`.
- Layout global do design system: `src/app/styleguide/layout.tsx`.
- Sidebar/navegação: `src/app/styleguide/navigation.ts`.
- Estrutura visual base:
  - `.ds-page` para fluxo vertical.
  - `FoundationPageHeader` para cabeçalho de página.
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

## Decisões técnicas

- Rota escolhida: `/styleguide/paginas/blog`, porque o Blog deve nascer dentro do Design System e a sidebar atual opera sob `/styleguide`.
- Página individual: `/styleguide/paginas/blog/[slug]`.
- CMS mockado: `/styleguide/paginas/blog/cms`.
- Conteúdo local-first em TypeScript para preservar tipagem e facilitar troca futura por adapter de CMS.
- Interatividade de busca/filtros ficará isolada em Client Components pequenos. Páginas e dados seguem Server Components por padrão.
- Não instalar dependências nesta primeira fase.

## Estrutura planejada

- `src/data/blog`: tipos, autores, categorias, tags, posts.
- `src/lib/blog`: helpers de busca, filtro, related posts, SEO e leitura.
- `src/components/blog`: componentes reutilizáveis da experiência editorial e CMS.
- `src/app/styleguide/paginas/blog`: home, post dinâmico e CMS mockado.
- `docs/blog-platform`: progresso, arquitetura e notas de CMS.

## Progresso

- [x] Permissões analisadas.
- [x] Design System e docs Next locais analisados.
- [x] Pastas base criadas.
- [x] Dados locais criados.
- [x] Helpers criados.
- [x] Componentes de blog criados.
- [x] Páginas conectadas.
- [x] Sidebar atualizada.
- [x] SEO implementado.
- [x] Validações executadas.
- [x] Capas substituidas por imagens reais em alta resolução.

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

## Estrutura criada até agora

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

- 5 categorias editoriais: Estratégia, Inovação, Tecnologia, Liderança e Crescimento.
- 12 tags editoriais.
- 4 autores mockados.
- 12 posts, sendo 10 publicados, 1 rascunho e 1 agendado.
- Conteúdo estruturado por blocos para página individual e migração futura.

## Componentes criados

- `BlogCover`: capa editorial com imagem real sem elementos sobrepostos e fallback visual apenas quando não houver URL.
- `BlogPostCard`: card editorial reutilizável para grid e relacionados.
- `BlogFilterExperience`: busca e filtros locais por query, categoria e tag.
- `BlogPostHeader`: header semântico de post.
- `BlogPostContent`: renderizador de blocos ricos.
- `BlogRelatedPosts`: grid de recomendados.
- `NewsletterCTA`: CTA visual demonstrativo.
- `CMSPostTable`: tabela client-side de posts com busca/filtro.
- `CMSPostFormPreview`: preview de formulário/editor mockado.
- `CMSStatusBadge`: padronização dos status editoriais.
- `CMSBlogManager`: gerenciador client-side funcional com criar, editar, selecionar e salvar em memória.

## Correção CMS

- O primeiro CMS era visual e os botões `Novo post` e `Editar` não alteravam estado.
- Foi criada a camada `CMSBlogManager`, que mantém posts em estado local no navegador.
- O fluxo agora permite selecionar um post, editar título/subtítulo/excerpt/slug/categoria/autor/status/tags/SEO, marcar destaque, criar rascunho e salvar as alterações em memória.
- Ainda não há persistência em banco/CMS real; isso fica documentado como próxima camada.

## Páginas criadas

- `/styleguide/paginas/blog`
- `/styleguide/paginas/blog/[slug]`
- `/styleguide/paginas/blog/cms`

## Sidebar

- Adicionada a área `Páginas`.
- Adicionado item `Blog` apontando para `/styleguide/paginas/blog`.

## Validação

- `npm run lint`: passou.
- `npm run build`: passou após corrigir dois erros de tipagem.
- Rotas locais checadas por HTTP:
  - `/styleguide/paginas/blog`: `200 OK`
  - `/styleguide/paginas/blog/cms`: `200 OK`
  - `/styleguide/paginas/blog/como-a-inovacao-aplicada-transforma-empresas-tradicionais`: `200 OK`

## Atualização de imagens

- Posts passaram a usar imagens reais remotas em alta resolução via `images.unsplash.com`.
- `BlogCover` foi atualizado para renderizar a foto real limpa, sem bordas, overlays ou elementos decorativos sobre a imagem. O fallback visual só aparece quando não houver URL.
- As imagens foram ajustadas para priorizar cenas com pessoas relacionadas ao tema de cada artigo.
- Todas as imagens reais recebem `saturate(1.1)` via classe Tailwind para ficarem cerca de 10% mais vivas sem overlay.
- Verdes do Blog usam `--primary` / `#5FC318`; `--brand-green` permanece reservado para sidebar ativa.
- Textos verdes do Blog usam a mesma tipografia em bold para reforçar hierarquia.
- As imagens continuam sem exigir configuração de `next/image`, porque o componente usa `<img>` e o build não precisa buscar os arquivos remotos.

## Problemas encontrados e correções

- A factory local de posts omitia `categorySlug` do tipo de entrada, mas precisava desse campo para resolver a categoria. Corrigido em `src/data/blog/posts.ts`.
- O type guard de relacionados acessava `item.status` antes de estreitar `undefined`. Corrigido em `src/lib/blog/queries.ts`.

## Onde parei

A base robusta do Blog/CMS está implementada e validada. O próximo trabalho deve focar em refinamento visual fino no navegador, melhoria do CMS mockado com tabs e futuros adapters reais.

## Próximos passos recomendados

1. Fazer QA visual em desktop e mobile com screenshots.
2. Adicionar tabs no editor mockado: Conteúdo, SEO, Publicação e Histórico.
3. Criar adapter real quando o CMS/banco for escolhido.
4. Adicionar imagens reais ou pipeline de OG images.
5. Criar testes unitários simples para filtros e helpers.

## Atualização de categorias e carrossel

- Categorias do blog agora usam cores de marcas do Design System:
  - Estratégia: Advisor `#5C00FF`
  - Inovação: Academy `#9E00FF`
  - Tecnologia: Webinar `#FFEA00`
  - Liderança: Workshop `#F54A00`
  - Crescimento: MXP `#FF0055`
- Badges de categoria usam a mesma cor nos cards, artigo, biblioteca e CMS.
- `Leitura recomendada` virou carrossel infinito (`loop: true`) usando o mesmo `BlogPostCard`, com todos os posts publicados.

## Ajuste editorial da abertura

- A primeira section deixou de usar texto interno sobre Design System/CMS e passou a comunicar o blog para o usuário final.
- A abertura agora usa uma composição editorial: destaque principal, dois cards médios abaixo, newsletter em card branco e menos cards compactos na lateral.

## Próximos passos imediatos

1. Criar tipos e conteúdo local-first.
2. Criar helpers puros para obter, filtrar e relacionar posts.
3. Criar componentes de UI reutilizáveis usando o Design System existente.
4. Criar rotas e atualizar sidebar.
