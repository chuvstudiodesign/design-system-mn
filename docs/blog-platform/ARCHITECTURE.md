# Blog/CMS Architecture

## Visao geral

A plataforma de Blog/CMS nasce dentro do Design System em `/styleguide/paginas/blog`. A primeira versao usa conteudo local em TypeScript, com uma camada de helpers que funciona como adapter. Essa escolha evita bloquear a entrega por falta de banco ou CMS e mantem uma superficie facil de migrar.

## Rotas

- `/styleguide/paginas/blog`: home editorial com hero, destaque, busca, filtros, cards, tags e CTA.
- `/styleguide/paginas/blog/[slug]`: post individual com metadata, cabecalho, conteudo, tags e relacionados.
- `/styleguide/paginas/blog/cms`: prototipo visual de Content Manager, sem persistencia real.

## Navegacao

A sidebar do Design System foi atualizada em `src/app/styleguide/navigation.ts` com uma nova secao:

- `Páginas`
  - `Blog`

O CMS permanece acessivel por CTA dentro do Blog, para nao poluir a primeira versao da sidebar com subrotas operacionais.

## Camadas

- `src/data/blog`: fonte local de conteudo.
- `src/lib/blog`: queries, filtros, SEO, related posts e formatadores.
- `src/components/blog`: UI editorial e CMS.
- `src/app/styleguide/paginas/blog`: integracao de rotas Next.js App Router.

## Modelo local-first

O modelo foi desenhado para mapear diretamente para entidades comuns de CMS headless:

- `BlogPost`
- `BlogCategory`
- `BlogTag`
- `BlogAuthor`
- blocos estruturados de conteudo (`heading`, `paragraph`, `quote`, `list`, `metric`, `callout`)

## Componentes

- `BlogCover`: placeholder visual sem dependencia externa, baseado nos tons do Design System.
- `BlogPostCard`: card editorial para grid, destaque e relacionados.
- `BlogFilterExperience`: busca e filtros client-side.
- `BlogPostHeader`: header da pagina individual.
- `BlogPostContent`: renderizador dos blocos estruturados.
- `BlogRelatedPosts`: grid de relacionados.
- `NewsletterCTA`: CTA demonstrativo.
- `CMSPostTable`: tabela de gestao com busca e filtros.
- `CMSPostFormPreview`: formulario mockado de edicao.
- `CMSStatusBadge`: padrao de status editorial.

## SEO

- Home usa metadata estatica.
- Post individual usa `generateMetadata` com dados locais.
- Slugs sao estaticamente gerados por `generateStaticParams`.
- Cada post possui title, description, keywords, canonical, Open Graph basico e Twitter card.

## Interatividade

Para manter Server Components como padrao, apenas os componentes com estado sao Client Components:

- `BlogFilterExperience`
- `CMSPostTable`

As paginas e componentes de renderizacao estatica permanecem no servidor.

## Migracao futura para CMS

Para migrar, manter os componentes e trocar apenas a camada `src/lib/blog` por um adapter:

- `getAllBlogPosts()`
- `getPublishedBlogPosts()`
- `getBlogPostBySlug(slug)`
- `filterBlogPosts(filters)`
- `getRelatedBlogPosts(post)`

Possiveis destinos: Sanity, Payload CMS, Contentful, Strapi, Supabase, Notion ou banco proprio.

## Validacao atual

- `npm run lint`
- `npm run build`
- HTTP `200 OK` nas rotas principais.
