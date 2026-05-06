import type { Metadata } from "next";
import { CommercialPresentationsPage } from "@/components/commercial-presentations/CommercialPresentationsPage";

export const metadata: Metadata = {
  title: "O Futuro dos Negócios no Brasil | MN Design System",
  description:
    "Modelo de apresentação comercial com 20 slides em 16:9 para conversas estratégicas sobre mercado, inovação e oportunidades no Brasil.",
};

export default function ApresentacoesComerciaisPage() {
  return <CommercialPresentationsPage />;
}
