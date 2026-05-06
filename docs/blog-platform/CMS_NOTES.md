# CMS Notes

## Estado atual

O CMS criado nesta etapa é um protótipo visual local-first. Ele demonstra informação, estrutura e fluxos esperados, mas não grava dados em banco.

## Funcionalidades planejadas para o protótipo

- Tabela/lista de posts: implementado.
- Busca visual: implementado.
- Filtro por categoria: implementado.
- Status: publicado, rascunho e agendado: implementado.
- Indicador de destaque: implementado no formulário preview.
- Ações: criar, editar, preview e salvar localmente: implementado em memória no navegador.
- Painel de campos principais: implementado com inputs editaveis.
- Preview editorial: implementado por link para página de post.

## Campos de CMS

- Título, subtítulo, slug, excerpt.
- Categoria, tags, autor.
- Status, featured, datas.
- Cover image e alt text.
- SEO title, SEO description, keywords, OG image e canonical.
- Conteúdo estruturado por blocos.

## Persistência futura

Quando houver CMS real, criar mutations/server actions ou route handlers para:

- criar post;
- editar post;
- publicar/despublicar;
- agendar;
- validar slug único;
- upload/selecionar imagem;
- gerar preview.

## Próxima evolução sugerida

1. Persistir alterações via Server Actions, Route Handler ou CMS real.
2. Introduzir tabs no editor (`Conteúdo`, `SEO`, `Publicação`, `Histórico`).
3. Criar `BlogCMSAdapter` com interface única para local data e CMS real.
4. Adicionar validação de slug único.
5. Adicionar fluxo de upload/selecionador de imagem.
6. Implementar preview draft separado da rota pública, quando houver autenticação.
