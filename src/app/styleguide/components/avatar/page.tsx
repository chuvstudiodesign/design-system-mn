import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import { Typography } from "@/components/typography";
import {
  FoundationFooter,
  FoundationPageHeader,
  Section,
} from "../../foundation-sections";

const DEMO_IMAGE = "https://github.com/shadcn.png";

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

export default function AvatarPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Avatar"
        description="Componente para exibir imagem de perfil de um usuário, com fallback automático para iniciais quando a imagem não está disponível."
      />

      <Section
        title="Visão geral"
        subtitle="O Avatar exibe imagem circular com fallback para iniciais. Suporta tamanhos, badge de status e agrupamento."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Demo básica
            </Typography>
            <div className="ds-card !p-[30px] flex items-center gap-4">
              <Avatar>
                <AvatarImage src={DEMO_IMAGE} alt="shadcn" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>MN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="/broken.png" alt="broken" />
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar"`}
            </Typography>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Estrutura base
            </Typography>
            <Typography as="p" variant="body-sm" className="mt-3 text-muted-foreground">
              Envolva <code className="font-mono text-foreground">AvatarImage</code> e <code className="font-mono text-foreground">AvatarFallback</code> dentro de <code className="font-mono text-foreground">Avatar</code>. O fallback aparece automaticamente quando a imagem falha ou ainda não carregou.
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Tamanhos"
        subtitle="O Avatar tem três tamanhos controlados pela prop size."
      >
        <div className="flex flex-col gap-6">
          <div className="ds-card !p-[30px] flex items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <Avatar size="sm">
                <AvatarImage src={DEMO_IMAGE} alt="sm" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <Typography as="p" variant="caption" className="normal-case tracking-normal text-muted-foreground">
                sm · 24px
              </Typography>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar size="default">
                <AvatarImage src={DEMO_IMAGE} alt="default" />
                <AvatarFallback>MD</AvatarFallback>
              </Avatar>
              <Typography as="p" variant="caption" className="normal-case tracking-normal text-muted-foreground">
                default · 32px
              </Typography>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar size="lg">
                <AvatarImage src={DEMO_IMAGE} alt="lg" />
                <AvatarFallback>LG</AvatarFallback>
              </Avatar>
              <Typography as="p" variant="caption" className="normal-case tracking-normal text-muted-foreground">
                lg · 40px
              </Typography>
            </div>
          </div>

          <CodeBlock
            title="Tamanhos disponíveis"
            code={`<Avatar size="sm">...</Avatar>
<Avatar size="default">...</Avatar>
<Avatar size="lg">...</Avatar>`}
          />
        </div>
      </Section>

      <Section
        title="Com badge de status"
        subtitle="O AvatarBadge indica status online, notificação ou outro marcador visual no canto inferior direito."
      >
        <div className="flex flex-col gap-6">
          <div className="ds-card !p-[30px] flex items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <Avatar size="sm">
                <AvatarImage src={DEMO_IMAGE} alt="online sm" />
                <AvatarFallback>AB</AvatarFallback>
                <AvatarBadge className="bg-success" />
              </Avatar>
              <Typography as="p" variant="caption" className="normal-case tracking-normal text-muted-foreground">sm</Typography>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar size="default">
                <AvatarImage src={DEMO_IMAGE} alt="online default" />
                <AvatarFallback>AB</AvatarFallback>
                <AvatarBadge className="bg-success" />
              </Avatar>
              <Typography as="p" variant="caption" className="normal-case tracking-normal text-muted-foreground">default</Typography>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar size="lg">
                <AvatarImage src={DEMO_IMAGE} alt="online lg" />
                <AvatarFallback>AB</AvatarFallback>
                <AvatarBadge className="bg-success" />
              </Avatar>
              <Typography as="p" variant="caption" className="normal-case tracking-normal text-muted-foreground">lg</Typography>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar size="default">
                <AvatarFallback>MN</AvatarFallback>
                <AvatarBadge className="bg-destructive" />
              </Avatar>
              <Typography as="p" variant="caption" className="normal-case tracking-normal text-muted-foreground">offline</Typography>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar size="default">
                <AvatarFallback>CD</AvatarFallback>
                <AvatarBadge className="bg-warning" />
              </Avatar>
              <Typography as="p" variant="caption" className="normal-case tracking-normal text-muted-foreground">away</Typography>
            </div>
          </div>

          <CodeBlock
            title="Avatar com badge de status online"
            code={`<Avatar>
  <AvatarImage src="/profile.jpg" alt="Lucas" />
  <AvatarFallback>LZ</AvatarFallback>
  <AvatarBadge className="bg-success" />
</Avatar>`}
          />
        </div>
      </Section>

      <Section
        title="Grupo de avatares"
        subtitle="AvatarGroup empilha avatares com sobreposição automática. AvatarGroupCount exibe a quantidade de itens restantes."
      >
        <div className="flex flex-col gap-6">
          <div className="ds-card !p-[30px] flex items-center gap-8">
            <div className="flex flex-col gap-2">
              <AvatarGroup>
                <Avatar>
                  <AvatarImage src={DEMO_IMAGE} alt="user 1" />
                  <AvatarFallback>A1</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src={DEMO_IMAGE} alt="user 2" />
                  <AvatarFallback>A2</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>A3</AvatarFallback>
                </Avatar>
                <AvatarGroupCount>+5</AvatarGroupCount>
              </AvatarGroup>
              <Typography as="p" variant="caption" className="normal-case tracking-normal text-muted-foreground">default</Typography>
            </div>

            <div className="flex flex-col gap-2">
              <AvatarGroup>
                <Avatar size="lg">
                  <AvatarImage src={DEMO_IMAGE} alt="user 1" />
                  <AvatarFallback>B1</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarFallback>B2</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarFallback>B3</AvatarFallback>
                </Avatar>
                <AvatarGroupCount>+12</AvatarGroupCount>
              </AvatarGroup>
              <Typography as="p" variant="caption" className="normal-case tracking-normal text-muted-foreground">size lg</Typography>
            </div>
          </div>

          <CodeBlock
            title="Grupo com contagem de extras"
            code={`<AvatarGroup>
  <Avatar>
    <AvatarImage src="/a.jpg" alt="Ana" />
    <AvatarFallback>AN</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback>BM</AvatarFallback>
  </Avatar>
  <AvatarGroupCount>+5</AvatarGroupCount>
</AvatarGroup>`}
          />
        </div>
      </Section>

      <Section
        title="Props e uso"
        subtitle="API dos sub-componentes disponíveis no projeto."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Props principais
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                {
                  name: "size",
                  type: `"sm" | "default" | "lg"`,
                  note: "Tamanho do avatar: sm (24px), default (32px), lg (40px).",
                },
                {
                  name: "AvatarImage src",
                  type: "string",
                  note: "URL da imagem de perfil.",
                },
                {
                  name: "AvatarFallback",
                  type: "ReactNode",
                  note: "Texto de fallback (geralmente iniciais) exibido quando a imagem não carrega.",
                },
                {
                  name: "AvatarBadge className",
                  type: "string",
                  note: "Cor do badge via classe Tailwind: bg-success, bg-destructive, bg-warning, etc.",
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
                Sempre use o atributo <code className="font-mono text-foreground">alt</code> em <code className="font-mono text-foreground">AvatarImage</code> com o nome do usuário para leitores de tela.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                O fallback de iniciais é puramente visual. Para acessibilidade, garanta que o nome completo do usuário esteja disponível via <code className="font-mono text-foreground">alt</code> ou label contextual.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Em grupos, considere adicionar <code className="font-mono text-foreground">aria-label</code> no container para descrever o conjunto de usuários.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
