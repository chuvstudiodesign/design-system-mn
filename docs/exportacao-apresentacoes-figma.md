# Exportacao de apresentacoes para Figma

Este documento registra o processo que funcionou para exportar slides do Design System MN para o Figma sem quebrar o layout interno.

O objetivo deste fluxo e preservar o slide como composicao visual fiel, especialmente quando o slide tem proporcao fixa 16:9 e conteudo interno sensivel a escala, padding, crop e responsividade.

## Principio central

Nao exportar a pagina completa do carrossel quando o objetivo for levar slides individuais para o Figma.

Para cada slide, criar uma rota isolada que renderiza somente o slide em seu tamanho base fixo:

```txt
1600 x 900
```

Essa dimensao e a base usada pelo componente `SlideViewport` no projeto. Portanto, para exportacao, o slide deve ser renderizado diretamente em `1600x900`, sem wrapper responsivo, sem sidebar, sem padding da pagina e sem controles do carrossel.

## Estrutura de rota usada

Foi criada uma rota dinamica:

```txt
src/app/styleguide/paginas/apresentacoes-comerciais/[slide]/page.tsx
```

Ela gera URLs assim:

```txt
http://localhost:3000/styleguide/paginas/apresentacoes-comerciais/slide-1
http://localhost:3000/styleguide/paginas/apresentacoes-comerciais/slide-2
...
http://localhost:3000/styleguide/paginas/apresentacoes-comerciais/slide-20
```

Cada pagina renderiza o componente real:

```tsx
<PresentationSlide presentation={presentation} slide={currentSlide} />
```

Dentro de um container fixo:

```tsx
<div
  id="figma-slide-capture"
  className="h-[900px] w-[1600px] overflow-hidden bg-[#D4D4D4]"
>
  <PresentationSlide presentation={presentation} slide={currentSlide} />
</div>
```

O `id="figma-slide-capture"` e fundamental. Ele permite que o MCP capture somente o slide, e nao a pagina inteira.

## Excecao no layout do styleguide

O layout geral de `/styleguide` adiciona sidebar, padding e navegacao. Isso nao pode aparecer nas rotas isoladas dos slides.

Por isso foi adicionada uma excecao em:

```txt
src/app/styleguide/layout.tsx
```

Padrao usado:

```tsx
const slideExportRoute =
  pathname.startsWith("/styleguide/paginas/apresentacoes-comerciais/slide-");

if (slideExportRoute) {
  return <>{children}</>;
}
```

Com isso, as rotas `slide-1`, `slide-2`, etc. renderizam sem sidebar e sem padding externo.

## Garantias de preservacao 16:9

Antes de exportar, verificar:

1. O container do slide tem `width: 1600px`.
2. O container do slide tem `height: 900px`.
3. O componente interno e o mesmo usado na apresentacao real.
4. Nao existe `scale()` no wrapper da pagina isolada.
5. Nao existe sidebar do styleguide.
6. Nao existe padding externo interferindo na captura.
7. O seletor capturado no Figma e `#figma-slide-capture`, nao `body`.

## Validacao local antes de exportar

Rodar:

```bash
npm run lint
npm run build
```

Verificar algumas rotas:

```bash
curl -I http://127.0.0.1:3000/styleguide/paginas/apresentacoes-comerciais/slide-1
curl -I http://127.0.0.1:3000/styleguide/paginas/apresentacoes-comerciais/slide-20
```

Resultado esperado:

```txt
HTTP/1.1 200 OK
```

No build, confirmar que o Next gerou os 20 paths:

```txt
/styleguide/paginas/apresentacoes-comerciais/slide-1
/styleguide/paginas/apresentacoes-comerciais/slide-2
/styleguide/paginas/apresentacoes-comerciais/slide-3
[+17 more paths]
```

## Preparacao do MCP do Figma

Usar a ferramenta:

```txt
generate_figma_design
```

Modo:

```txt
outputMode: "existingFile"
fileKey: "<fileKey do arquivo Figma>"
```

Ela retorna um `captureId` e uma URL de endpoint. Cada `captureId` e single-use e captura uma unica pagina.

Para varios slides, gerar um `captureId` por slide.

## Script temporario de captura

Para projetos locais, o MCP exige inserir temporariamente este script no HTML:

```html
<script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>
```

No projeto Next, isso foi feito temporariamente em:

```txt
src/app/layout.tsx
```

Dentro do `body`:

```tsx
<body className="min-h-full bg-background text-foreground">
  <TooltipProvider>{children}</TooltipProvider>
  <Toaster />
  <script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async />
</body>
```

Importante: remover esse script depois que as capturas terminarem.

## URL de captura

Abrir cada slide no navegador com o hash de captura.

Formato:

```txt
http://localhost:3000/styleguide/paginas/apresentacoes-comerciais/slide-N#figmacapture=<captureId>&figmaendpoint=<endpoint-encoded>&figmadelay=1000&figmaselector=%23figma-slide-capture
```

Exemplo:

```bash
open "http://localhost:3000/styleguide/paginas/apresentacoes-comerciais/slide-1#figmacapture=<captureId>&figmaendpoint=<endpoint-encoded>&figmadelay=1000&figmaselector=%23figma-slide-capture"
```

Detalhes importantes:

- `figmaselector=%23figma-slide-capture` significa `#figma-slide-capture`.
- Esse seletor impede que o MCP capture body, sidebar, pagina inteira ou area vazia.
- `figmadelay=1000` da tempo para fontes, imagens e layout estabilizarem antes da captura.
- Usar `open` no macOS para abrir a URL no navegador.

## Polling obrigatorio

Depois de abrir a URL no navegador, aguardar alguns segundos e pollar o capture ID:

```txt
generate_figma_design({ captureId: "<captureId>" })
```

Continuar ate o MCP responder que o design foi adicionado ao arquivo Figma.

Resposta esperada:

```txt
The design has been added to your existing file: https://www.figma.com/design/<fileKey>?node-id=<node>
```

Nao gerar outro capture ID para o mesmo slide.
Nao reutilizar capture ID.

## Processo em lote

O processo pode ser feito em lotes para manter controle:

1. Gerar capture IDs para slides 1 a 5.
2. Abrir as 5 URLs com seus respectivos capture IDs.
3. Aguardar.
4. Pollar os 5 capture IDs.
5. Repetir para slides 6 a 10.
6. Repetir para slides 11 a 15.
7. Repetir para slides 16 a 20.

Esse foi o processo usado com sucesso.

## Limpeza final

Depois das capturas:

1. Remover o script temporario de `src/app/layout.tsx`.
2. Rodar `npm run lint`.
3. Rodar `npm run build`.
4. Confirmar que as rotas continuam respondendo.

Comando de validacao:

```bash
npm run lint
npm run build
curl -I http://127.0.0.1:3000/styleguide/paginas/apresentacoes-comerciais/slide-1
```

## O que evitar

Nao usar captura da pagina do carrossel quando a intencao for exportar os slides individualmente.

Nao capturar `body`.

Nao renderizar os slides dentro do layout normal do styleguide.

Nao usar wrapper responsivo tipo `SlideViewport` para a rota de exportacao, porque ele escala o slide com base na largura do viewport.

Nao deixar o script do Figma permanentemente no app.

Nao criar uma versao alternativa do slide para exportacao. A rota isolada deve usar o mesmo componente real:

```tsx
PresentationSlide
```

## Resultado esperado no Figma

Cada slide entra no arquivo Figma como uma captura separada, preservando:

- proporcao 16:9;
- composicao interna;
- posicoes;
- imagens;
- tipografia visual;
- espacamentos;
- fundos;
- cortes e overflow definidos no proprio slide.

O resultado deve ser visualmente identico ao slide isolado aberto no navegador em:

```txt
http://localhost:3000/styleguide/paginas/apresentacoes-comerciais/slide-N
```

## Checklist rapido para proximas exportacoes

1. Criar rota isolada por slide.
2. Garantir `1600x900`.
3. Garantir `id="figma-slide-capture"`.
4. Excluir sidebar/padding via excecao no layout.
5. Rodar lint/build.
6. Inserir script temporario do Figma no layout raiz.
7. Gerar um capture ID por slide com `generate_figma_design`.
8. Abrir cada URL com `figmaselector=%23figma-slide-capture`.
9. Pollar cada capture ID ate completar.
10. Remover script temporario.
11. Rodar lint/build de novo.

