import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/field";
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

const sides = ["top", "right", "bottom", "left"] as const;

export default function SheetPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Sheet"
        description="Painel deslizante lateral sem gesto de arrastar. Melhor que Drawer para desktop — painéis de configuração, filtros e detalhes."
      />

      <Section title="Visão geral" subtitle="O Sheet abre um painel de qualquer borda da tela. Usa Dialog internamente mas com layout lateral." first>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">Direções</Typography>
            <div className="ds-card !p-[30px] flex flex-wrap gap-3">
              {sides.map((side) => (
                <Sheet key={side}>
                  <SheetTrigger render={<Button variant="outline" />}>{side}</SheetTrigger>
                  <SheetContent side={side}>
                    <SheetHeader>
                      <SheetTitle>Sheet — {side}</SheetTitle>
                      <SheetDescription>Painel deslizando da borda {side}.</SheetDescription>
                    </SheetHeader>
                    <div className="px-[30px]">
                      <Field label="Nome" htmlFor={`sheet-${side}`}>
                        <Input id={`sheet-${side}`} placeholder="Lucas Zerlotini" />
                      </Field>
                    </div>
                    <SheetFooter>
                      <SheetClose render={<Button variant="outline" />}>Cancelar</SheetClose>
                      <Button>Salvar</Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              ))}
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Import</Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import {
  Sheet, SheetContent, SheetDescription, SheetFooter,
  SheetHeader, SheetTitle, SheetTrigger, SheetClose
} from "@/components/ui/sheet"`}
            </Typography>
          </div>
        </div>
      </Section>

      <Section title="Padrão de implementação" subtitle="Snippets para uso do Sheet.">
        <div className="flex flex-col gap-6">
          <CodeBlock title="Sheet lateral direito" code={`<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Editar perfil</Button>
  </SheetTrigger>
  <SheetContent side="right" className="sm:max-w-md">
    <SheetHeader>
      <SheetTitle>Editar perfil</SheetTitle>
      <SheetDescription>Atualize suas informações.</SheetDescription>
    </SheetHeader>
    <div className="px-[30px]">
      {/* formulário */}
    </div>
    <SheetFooter>
      <SheetClose asChild>
        <Button variant="outline">Cancelar</Button>
      </SheetClose>
      <Button type="submit">Salvar</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`} />
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
