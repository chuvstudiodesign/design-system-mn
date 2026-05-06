import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/typography";

export function NewsletterCTA() {
  return (
    <div className="rounded-[10px] bg-brand-dark-green px-[60px] py-[80px] text-white">
      <div className="grid gap-6 lg:grid-cols-[1fr_420px] lg:items-end">
        <div>
          <Typography as="p" variant="caption" className="font-bold text-primary">
            Newsletter
          </Typography>
          <Typography as="h3" variant="h2" className="mt-3 text-white">
            Receba leituras sobre negócios, tecnologia e crescimento.
          </Typography>
          <Typography as="p" variant="body" className="mt-3 max-w-2xl text-white/70">
            CTA visual preparado para futura integração com CRM ou automação. Nesta versão, o formulário é demonstrativo.
          </Typography>
        </div>
        <form className="flex flex-col gap-3 sm:flex-row" aria-label="Assinar newsletter demonstrativa">
          <Input
            type="email"
            placeholder="email@empresa.com"
            className="h-12 border-white/20 bg-white text-black placeholder:text-black/50"
          />
          <Button type="button" className="min-h-12 bg-primary">
            Assinar
            <ArrowRight data-icon="inline-end" className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
