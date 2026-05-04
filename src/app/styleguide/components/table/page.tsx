import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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

export default function TablePage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Table"
        description="Componente de tabela HTML semântica com estilização consistente. Base para Data Table e listas tabulares simples."
      />

      <Section title="Visão geral" subtitle="O Table é a base semântica de qualquer tabela no design system. Use Data Table para funcionalidades avançadas." first>
        <div className="flex flex-col gap-6">
          <div className="ds-card !p-[30px] overflow-hidden">
            <Table>
              <TableCaption className="mb-4">Transações recentes</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Método</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { method: "Pix", status: "Aprovado", email: "lucas@mn.com", amount: "R$ 250,00" },
                  { method: "Cartão", status: "Pendente", email: "ana@empresa.com", amount: "R$ 1.200,00" },
                  { method: "Boleto", status: "Recusado", email: "joao@site.com", amount: "R$ 75,00" },
                  { method: "Pix", status: "Aprovado", email: "maria@org.com", amount: "R$ 3.000,00" },
                ].map((row) => (
                  <TableRow key={row.email}>
                    <TableCell className="font-medium">{row.method}</TableCell>
                    <TableCell>
                      <Badge variant={row.status === "Aprovado" ? "default" : row.status === "Pendente" ? "secondary" : "destructive"}>
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell className="text-right">{row.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">R$ 4.525,00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">Import</Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import {
  Table, TableBody, TableCaption, TableCell,
  TableFooter, TableHead, TableHeader, TableRow
} from "@/components/ui/table"`}
            </Typography>
          </div>
        </div>
      </Section>

      <Section title="Padrão de implementação" subtitle="Snippets para tabelas simples e avançadas.">
        <div className="flex flex-col gap-6">
          <CodeBlock title="Tabela básica" code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Nome</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Valor</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {dados.map((row) => (
      <TableRow key={row.id}>
        <TableCell>{row.nome}</TableCell>
        <TableCell><Badge>{row.status}</Badge></TableCell>
        <TableCell className="text-right">{row.valor}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`} />
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
