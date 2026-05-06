# Blog/CMS Architecture

## Visão geral

A plataforma de Blog/CMS nasce dentro do Design System em `/styleguide/paginas/blog`. A primeira versão usa conteúdo local em TypeScript, com uma camada de helpers que funciona como adapter. Essa escolha evita bloquear a entrega por falta de banco ou CMS e mantém uma superfície fácil de migrar.

## Rotas

- `/styleguide/paginas/blog`: home editorial com hero, destaque, busca, filtros, cards, tags e CTA.
- `/styleguide/paginas/blog/[slug]`: post individual com metadata, cabeçalho, conteúdo, tags e relacionados.
- `/styleguide/paginas/blog/cms`: protótipo visual de Content Manager, sem persistência real.

## Navegação

A sidebar do Design System foi atualizada em `src/app/styleguide/navigation.ts` com uma nova seção:

- `Páginas`
  - `Blog`

O CMS permanece acessível por CTA dentro do Blog, para não poluir a primeira versão da sidebar com subrotas operacionais.

## Camadas

- `src/data/blog`: fonte local de conteúdo.
- `src/lib/blog`: queries, filtros, SEO, related posts e formatadores.
- `src/components/blog`: UI editorial e CMS.
- `src/app/styleguide/paginas/blog`: integração de rotas Next.js App Router.

## Modelo local-first

O modelo foi desenhado para mapear diretamente para entidades comuns de CMS headless:

- `BlogPost`
- `BlogCategory`
- `BlogTag`
- `BlogAuthor`
- blocos estruturados de conteúdo (`heading`, `paragraph`, `quote`, `list`, `metric`, `callout`)

## Componentes

- `BlogCover`: placeholder visual sem dependência externa, baseado nos tons do Design System.
- `BlogPostCard`: card editorial para grid, destaque e relacionados.
- `BlogFilterExperience`: busca e filtros client-side.
- `BlogPostHeader`: header da página individual.
- `BlogPostContent`: renderizador dos blocos estruturados.
- `BlogRelatedPosts`: grid de relacionados.
- `NewsletterCTA`: CTA demonstrativo.
- `CMSPostTable`: tabela de gestão com busca e filtros.
- `CMSPostFormPreview`: formulário mockado de edição.
- `CMSStatusBadge`: padrão de status editorial.

## SEO

- Home usa metadata estática.
- Post individual usa `generateMetadata` com dados locais.
- Slugs são estaticamente gerados por `generateStaticParams`.
- Cada post possui title, description, keywords, canonical, Open Graph básico e Twitter card.

## Interatividade

Para manter Server Components como padrão, apenas os componentes com estado são Client Components:

- `BlogFilterExperience`
- `CMSPostTable`

As páginas e componentes de renderizacao estática permanecem no servidor.

## Migração futura para CMS

Para migrar, manter os componentes e trocar apenas a camada `src/lib/blog` por um adapter:

- `getAllBlogPosts()`
- `getPublishedBlogPosts()`
- `getBlogPostBySlug(slug)`
- `filterBlogPosts(filters)`
- `getRelatedBlogPosts(post)`

Possíveis destinos: Sanity, Payload CMS, Contentful, Strapi, Supabase, Notion ou banco próprio.

## Validação atual

- `npm run lint`
- `npm run build`
- HTTP `200 OK` nas rotas principais.
