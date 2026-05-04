import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Typography } from "@/components/typography";
import {
  FoundationFooter,
  FoundationPageHeader,
  Section,
} from "../../foundation-sections";

function CodeBlock({ title, code }: { title: string; code: string }) {
  return (
    <div className="flex flex-col gap-3">
      <Typography as="p" variant="label" className="normal-case tracking-normal text-black">
        {title}
      </Typography>
      <div className="bg-[#D4D4D4] p-5">
        <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[12px] leading-6 text-foreground">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

export default function AspectRatioPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Aspect Ratio"
        description="Componente para manter proporções fixas de largura e altura em qualquer tipo de mídia ou bloco de conteúdo."
      />

      <Section
        title="Visão geral"
        subtitle="O AspectRatio garante que o bloco filho mantenha a proporção definida independentemente do tamanho do container."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              16:9 — padrão para vídeo e imagem wide
            </Typography>
            <div className="ds-card !p-[30px] w-full max-w-xl">
              <AspectRatio ratio={16 / 9}>
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-muted">
                  <Typography as="p" variant="label" className="normal-case tracking-normal text-muted-foreground">
                    16 : 9
                  </Typography>
                </div>
              </AspectRatio>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { AspectRatio } from "@/components/ui/aspect-ratio"`}
            </Typography>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Como funciona
            </Typography>
            <Typography as="p" variant="body-sm" className="mt-3 text-muted-foreground">
              O componente usa a prop <code className="font-mono text-foreground">ratio</code> para definir a proporção. O valor é um número representando largura dividido por altura (ex: <code className="font-mono text-foreground">16/9</code>, <code className="font-mono text-foreground">1</code>, <code className="font-mono text-foreground">4/3</code>).
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Proporções comuns"
        subtitle="Exemplos das proporções mais usadas em interfaces e mídias digitais."
      >
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { ratio: 16 / 9, label: "16:9", note: "Vídeo wide, banners" },
            { ratio: 4 / 3, label: "4:3", note: "Imagens clássicas" },
            { ratio: 1, label: "1:1", note: "Avatar, thumbnail quadrado" },
            { ratio: 9 / 16, label: "9:16", note: "Stories, mobile" },
          ].map(({ ratio, label, note }) => (
            <div key={label} className="ds-card !p-[30px] flex flex-col gap-3">
              <AspectRatio ratio={ratio}>
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-muted">
                  <Typography as="p" variant="label" className="normal-case tracking-normal text-muted-foreground">
                    {label}
                  </Typography>
                </div>
              </AspectRatio>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                {note}
              </Typography>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Com imagem real"
        subtitle="O uso mais comum do AspectRatio é envolver uma imagem e garantir que ela preencha o espaço sem distorção."
      >
        <div className="flex flex-col gap-6">
          <div className="w-full max-w-xl">
            <div className="ds-card !p-[30px]">
              <AspectRatio ratio={16 / 9}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                  alt="Foto de demonstração"
                  className="h-full w-full rounded-[10px] object-cover"
                />
              </AspectRatio>
            </div>
          </div>

          <div className="flex flex-col gap-6 pt-2">
            <CodeBlock
              title="Imagem com proporção 16:9"
              code={`<AspectRatio ratio={16 / 9}>
  <img
    src="/minha-imagem.jpg"
    alt="Descrição"
    className="h-full w-full rounded-[10px] object-cover"
  />
</AspectRatio>`}
            />
          </div>
        </div>
      </Section>

      <Section
        title="Padrão de implementação"
        subtitle="Snippets prontos para os casos de uso mais comuns do componente."
      >
        <div className="flex flex-col gap-4">
          <div className="ds-card !p-[30px] flex w-full max-w-md flex-col gap-1">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Prop: ratio
            </Typography>
            <Typography as="p" variant="code" className="text-foreground">
              number (ex: 16/9, 4/3, 1)
            </Typography>
            <Typography as="p" variant="body-sm" className="text-muted-foreground">
              Define a proporção largura/altura do bloco. Obrigatório.
            </Typography>
          </div>

          <div className="flex flex-col gap-6 pt-2">
            <CodeBlock
              title="Uso básico"
              code={`<AspectRatio ratio={16 / 9}>
  <div className="h-full w-full bg-muted rounded-[10px]" />
</AspectRatio>`}
            />

            <CodeBlock
              title="Thumbnail quadrado com imagem"
              code={`<AspectRatio ratio={1}>
  <img
    src="/thumb.jpg"
    alt="Thumbnail"
    className="h-full w-full object-cover rounded-[10px]"
  />
</AspectRatio>`}
            />

            <CodeBlock
              title="Vídeo incorporado"
              code={`<AspectRatio ratio={16 / 9}>
  <iframe
    src="https://www.youtube.com/embed/..."
    className="h-full w-full rounded-[10px]"
    allowFullScreen
  />
</AspectRatio>`}
            />
          </div>
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="API disponível no componente instalado."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Props principais
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                {
                  name: "ratio",
                  type: "number",
                  note: "Proporção largura/altura. Obrigatório. Ex: 16/9 resulta em aspect-ratio: 1.777...",
                },
                {
                  name: "className",
                  type: "string",
                  note: "Classes adicionais para o container externo.",
                },
                {
                  name: "children",
                  type: "ReactNode",
                  note: "Conteúdo a ser exibido com a proporção definida. Deve usar h-full e w-full para preencher o container.",
                },
              ].map((item) => (
                <div key={item.name} className="border-b border-white pb-4 last:border-0 last:pb-0">
                  <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
                    {item.name}
                  </Typography>
                  <Typography as="p" variant="code" className="mt-1 text-foreground">
                    {item.type}
                  </Typography>
                  <Typography as="p" variant="body-sm" className="mt-2 text-muted-foreground">
                    {item.note}
                  </Typography>
                </div>
              ))}
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Acessibilidade
            </Typography>
            <div className="flex flex-col gap-3">
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Para imagens, sempre inclua o atributo <code className="font-mono text-foreground">alt</code> descritivo para garantir que leitores de tela possam identificar o conteúdo.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Para vídeos incorporados via iframe, adicione <code className="font-mono text-foreground">title</code> ao iframe para descrever o conteúdo.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                O componente em si é um <code className="font-mono text-foreground">div</code> neutro e não precisa de atributos ARIA específicos.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
