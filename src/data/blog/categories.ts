import type { BlogCategory } from "./types";

export const blogCategories: BlogCategory[] = [
  {
    id: "cat-strategy",
    name: "Estrategia",
    slug: "estrategia",
    description: "Decisoes, posicionamento e vantagem competitiva para empresas em crescimento.",
    colorToken: "var(--primary)",
  },
  {
    id: "cat-innovation",
    name: "Inovacao",
    slug: "inovacao",
    description: "Novos modelos, experimentacao e transformacao aplicada a negocios reais.",
    colorToken: "var(--chart-2)",
  },
  {
    id: "cat-technology",
    name: "Tecnologia",
    slug: "tecnologia",
    description: "IA, dados, produto e infraestrutura como alavancas de desempenho.",
    colorToken: "var(--chart-5)",
  },
  {
    id: "cat-leadership",
    name: "Lideranca",
    slug: "lideranca",
    description: "Cultura, gestao e tomada de decisao para founders e executivos.",
    colorToken: "var(--chart-3)",
  },
  {
    id: "cat-growth",
    name: "Crescimento",
    slug: "crescimento",
    description: "Operacao, mercado, vendas e sistemas para escalar com consistencia.",
    colorToken: "var(--chart-1)",
  },
];
