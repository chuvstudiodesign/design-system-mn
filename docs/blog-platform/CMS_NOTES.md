# CMS Notes

## Estado atual

O CMS criado nesta etapa e um prototipo visual local-first. Ele demonstra informacao, estrutura e fluxos esperados, mas nao grava dados em banco.

## Funcionalidades planejadas para o prototipo

- Tabela/lista de posts: implementado.
- Busca visual: implementado.
- Filtro por categoria: implementado.
- Status: publicado, rascunho e agendado: implementado.
- Indicador de destaque: implementado no formulario preview.
- Acoes: criar, editar, preview e salvar localmente: implementado em memoria no navegador.
- Painel de campos principais: implementado com inputs editaveis.
- Preview editorial: implementado por link para pagina de post.

## Campos de CMS

- Titulo, subtitulo, slug, excerpt.
- Categoria, tags, autor.
- Status, featured, datas.
- Cover image e alt text.
- SEO title, SEO description, keywords, OG image e canonical.
- Conteudo estruturado por blocos.

## Persistencia futura

Quando houver CMS real, criar mutations/server actions ou route handlers para:

- criar post;
- editar post;
- publicar/despublicar;
- agendar;
- validar slug unico;
- upload/selecionar imagem;
- gerar preview.

## Proxima evolucao sugerida

1. Persistir alteracoes via Server Actions, Route Handler ou CMS real.
2. Introduzir tabs no editor (`Conteudo`, `SEO`, `Publicacao`, `Historico`).
3. Criar `BlogCMSAdapter` com interface unica para local data e CMS real.
4. Adicionar validacao de slug unico.
5. Adicionar fluxo de upload/selecionador de imagem.
6. Implementar preview draft separado da rota publica, quando houver autenticacao.
