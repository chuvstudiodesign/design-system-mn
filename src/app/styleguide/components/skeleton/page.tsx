import { Skeleton } from "@/components/ui/skeleton";
import { Typography } from "@/components/typography";
import {
  FoundationFooter,
  FoundationPageHeader,
  Section,
} from "../../foundation-sections";

function CodeBlock({ title, code }: { title: string; code: string }) {
  return (
    <div className="flex flex-col gap-3">
      <Typography as="p" variant="label" className="normal-case tracking-normal text-black">{title}</Typography>
      <div className="bg-[#D4D4D4] p-5">
        <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[12px] leading-6 text-foreground"><code>{code}</code></pre>
      </div>
    </div>
  );
}

export default function SkeletonPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Skeleton"
        description="Placeholder animado para indicar carregamento de conteúdo. Substitui spinners em layouts estruturados."
      />

      <Section title="Visão geral" subtitle="O Skeleton reproduz a forma do conteúdo que está carregando, reduzindo o layout shift e melhorando a percepção de performance." first>
        <div className="flex flex-col gap-6">
          <div className="grid gap-6 xl:grid-cols-2">
            <div className="flex flex-col gap-3">
              <Typography as="p" variant="h3" className="text-foreground">Card de perfil</Typography>
              <div className="ds-card !p-[30px] flex items-center gap-4">
                <Skeleton className="size-12 rounded-full" />
                <div className="flex flex-col gap-2 flex-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Typography as="p" variant="h3" className="text-foreground">Linha de lista</Typography>
              <div className="ds-card !p-[30px] flex flex-col gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="size-8 rounded-[10px]" />
                    <div className="flex flex-col gap-1.5 flex-1">
                      <Skeleton className="h-3 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Typography as="p" variant="h3" className="text-foreground">Card de conteúdo</Typography>
              <div className="ds-card !p-[30px] flex flex-col gap-3">
                <Skeleton className="h-40 w-full rounded-[10px]" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <Skeleton className="h-3 w-4/6" />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Typography as="p" variant="h3" className="text-foreground">Tabela</Typography>
              <div className="ds-card !p-[30px] flex flex-col gap-3">
                <div className="flex gap-3">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-3 w-1/4" />
                    <Skeleton className="h-3 w-1/4" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Import</Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import { Skeleton } from "@/components/ui/skeleton"`}
            </Typography>
          </div>
        </div>
      </Section>

      <Section title="Padrão de implementação" subtitle="Como substituir conteúdo por Skeleton durante o carregamento.">
        <div className="flex flex-col gap-6">
          <CodeBlock title="Skeleton condicional" code={`function UserCard({ user, isLoading }) {
  if (isLoading) {
    return (
      <div className="ds-card !p-[30px] flex items-center gap-4">
        <Skeleton className="size-12 rounded-full" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    )
  }

  return (
    <div className="ds-card !p-[30px] flex items-center gap-4">
      <Avatar>...</Avatar>
      <div>{user.name}</div>
    </div>
  )
}`} />
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
