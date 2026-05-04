/* eslint-disable react/no-unescaped-entities */
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
import { Button } from "@/components/ui/button";
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

type Status = "ativo" | "pendente" | "inativo";

const statusVariant: Record<Status, "default" | "secondary" | "outline"> = {
  ativo: "default",
  pendente: "secondary",
  inativo: "outline",
};

const invoices = [
  { id: "INV-001", cliente: "Lucas Zerlotini", valor: "R$ 1.250,00", status: "ativo" as Status, vencimento: "2025-06-01" },
  { id: "INV-002", cliente: "Ana Carolina", valor: "R$ 3.800,00", status: "pendente" as Status, vencimento: "2025-05-28" },
  { id: "INV-003", cliente: "Roberto Faria", valor: "R$ 720,00", status: "inativo" as Status, vencimento: "2025-04-15" },
  { id: "INV-004", cliente: "Mariana Souza", valor: "R$ 5.100,00", status: "ativo" as Status, vencimento: "2025-06-10" },
  { id: "INV-005", cliente: "Paulo Henrique", valor: "R$ 980,00", status: "pendente" as Status, vencimento: "2025-05-30" },
];

export default function DataTablePage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Data Table"
        description="Tabela de dados estruturada e estilizada com Table shadcn. Para tabelas avançadas com ordenação e filtros, use TanStack Table."
      />

      <Section
        title="Visão geral"
        subtitle="Data Table é construído sobre os componentes Table do shadcn. Para funcionalidades avançadas (sort, filter, pagination), integrate com @tanstack/react-table."
        first
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Typography as="p" variant="h3" className="text-foreground">
              Tabela de faturas
            </Typography>
            <div className="ds-card !p-[30px] overflow-hidden">
              <Table>
                <TableCaption className="mb-4">Lista de faturas recentes.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-mono text-xs">{invoice.id}</TableCell>
                      <TableCell>{invoice.cliente}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant[invoice.status]}>
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{invoice.vencimento}</TableCell>
                      <TableCell className="text-right font-medium">
                        {invoice.valor}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={4}>Total</TableCell>
                    <TableCell className="text-right">R$ 11.850,00</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </div>

          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
              Import
            </Typography>
            <Typography as="p" variant="code" className="mt-3 text-foreground">
              {`import {
  Table, TableBody, TableCaption, TableCell,
  TableFooter, TableHead, TableHeader, TableRow
} from "@/components/ui/table"`}
            </Typography>
          </div>
        </div>
      </Section>

      <Section
        title="Com ações por linha"
        subtitle="Padrão comum para tabelas que precisam de ações por item."
      >
        <div className="flex flex-col gap-6">
          <div className="ds-card !p-[30px] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.slice(0, 3).map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.cliente}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[invoice.status]}>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{invoice.valor}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="xs" variant="ghost">Editar</Button>
                        <Button size="xs" variant="ghost" className="text-destructive hover:text-destructive">Excluir</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <CodeBlock
            title="Linha com ações"
            code={`<TableRow key={item.id}>
  <TableCell>{item.nome}</TableCell>
  <TableCell>
    <Badge variant="default">{item.status}</Badge>
  </TableCell>
  <TableCell className="text-right">
    <Button size="xs" variant="ghost">Editar</Button>
    <Button size="xs" variant="ghost" className="text-destructive">
      Excluir
    </Button>
  </TableCell>
</TableRow>`}
          />
        </div>
      </Section>

      <Section
        title="Com TanStack Table (avançado)"
        subtitle="Para ordenação, filtros, paginação e seleção, use @tanstack/react-table com o Table shadcn."
      >
        <div className="flex flex-col gap-6">
          <CodeBlock
            title="Estrutura com TanStack Table"
            code={`"use client"
import {
  useReactTable, getCoreRowModel, flexRender,
  type ColumnDef,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns, data
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}`}
          />
        </div>
      </Section>

      <Section
        title="Sub-componentes do Table"
        subtitle="API dos componentes disponíveis no projeto."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="ds-card !p-[30px]">
            <Typography as="p" variant="h3" className="mb-4 text-foreground">
              Sub-componentes
            </Typography>
            <div className="flex flex-col gap-4">
              {[
                { name: "Table", note: "Container com overflow e scroll responsivo." },
                { name: "TableHeader", note: "Bloco thead." },
                { name: "TableBody", note: "Bloco tbody." },
                { name: "TableFooter", note: "Bloco tfoot com estilo diferenciado." },
                { name: "TableRow", note: "Linha da tabela com hover." },
                { name: "TableHead", note: "Célula de cabeçalho (th)." },
                { name: "TableCell", note: "Célula de dados (td)." },
                { name: "TableCaption", note: "Legenda da tabela." },
              ].map((item) => (
                <div key={item.name} className="border-b border-white pb-3 last:border-0 last:pb-0">
                  <Typography as="p" variant="label" className="normal-case tracking-normal text-foreground">
                    {item.name}
                  </Typography>
                  <Typography as="p" variant="body-sm" className="mt-1 text-muted-foreground">
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
                Use sempre <code className="font-mono text-foreground">TableHead</code> para colunas de dados, pois ele renderiza <code className="font-mono text-foreground">th scope="col"</code> automaticamente.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Para tabelas com muitas colunas, adicione <code className="font-mono text-foreground">TableCaption</code> descritivo para identificação por leitores de tela.
              </Typography>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">
                Para ordenação por coluna, use <code className="font-mono text-foreground">aria-sort</code> no <code className="font-mono text-foreground">TableHead</code> ativo.
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <FoundationFooter />
    </div>
  );
}
