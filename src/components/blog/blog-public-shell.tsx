"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { blogCategories } from "@/data/blog";
import { cn } from "@/lib/utils";

const BRAND_LOGO_URL = "https://raw.githubusercontent.com/chuvstudiodesign/logos-masi-negocios/71ad67702f1e8fc61061ef81a2e9f372788e7dab/Negocios.svg";

const blogNav = [
  { name: "Início", href: "/blog-ml" },
  { name: "Biblioteca", href: "/blog-ml/biblioteca" },
  { name: "Categorias", href: "/blog-ml/categorias" },
  { name: "Leitura recomendada", href: "/blog-ml/recomendados" },
  { name: "Newsletter", href: "/blog-ml#newsletter" },
];

const programLinks = [
  { name: "Workshop", href: "https://masinegocios.com.br" },
  { name: "Action", href: "https://masinegocios.com.br" },
  { name: "PAM", href: "https://masinegocios.com.br" },
  { name: "Founder", href: "https://masinegocios.com.br" },
  { name: "Advisor", href: "https://masinegocios.com.br" },
];

export function BlogPublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const categoryLinks = blogCategories.map((category) => ({
    name: category.name,
    href: `/blog-ml/biblioteca/${category.slug}`,
    description: category.description,
  }));

  return (
    <div className="relative min-h-screen bg-background">
      <header className="fixed left-[30px] right-[30px] top-[22px] z-30 flex h-[60px] items-center rounded-[10px] border border-white bg-[#ececec] px-[30px]">
        <Link href="/blog-ml" className="block shrink-0" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={BRAND_LOGO_URL} alt="Negocios" className="h-[19px] w-auto" />
        </Link>

        <nav aria-label="Navegação principal do blog" className="ml-auto hidden items-center justify-end gap-1 lg:flex">
          <Link
            href="/blog-ml"
            className={cn(
              "rounded-[10px] px-3 py-2 text-sm transition-colors",
              pathname === "/blog-ml"
                ? "bg-[#aff000] font-medium text-black"
                : "text-foreground hover:bg-black/5"
            )}
          >
            Início
          </Link>

          <div className="group relative">
            <Link
              href="/blog-ml/biblioteca"
              className={cn(
                "inline-flex items-center gap-1 rounded-[10px] px-3 py-2 text-sm transition-colors",
                pathname.startsWith("/blog-ml/biblioteca")
                  ? "bg-[#aff000] font-medium text-black"
                  : "text-foreground hover:bg-black/5"
              )}
            >
              Biblioteca
              <ChevronDown className="size-3.5" strokeWidth={1.5} />
            </Link>
            <div className="invisible absolute right-0 top-full z-40 w-[320px] pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-[10px] border border-white bg-[#ececec] p-2 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                <Link href="/blog-ml/biblioteca" className="block rounded-[10px] px-3 py-2 text-sm font-medium text-foreground hover:bg-black/5">
                  Toda a biblioteca
                </Link>
                {categoryLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="block rounded-[10px] px-3 py-2 hover:bg-black/5">
                    <span className="block text-sm font-medium text-foreground">{item.name}</span>
                    <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">{item.description}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="group relative">
            <Link
              href="/blog-ml/categorias"
              className={cn(
                "inline-flex items-center gap-1 rounded-[10px] px-3 py-2 text-sm transition-colors",
                pathname.startsWith("/blog-ml/categorias")
                  ? "bg-[#aff000] font-medium text-black"
                  : "text-foreground hover:bg-black/5"
              )}
            >
              Categorias
              <ChevronDown className="size-3.5" strokeWidth={1.5} />
            </Link>
            <div className="invisible absolute right-0 top-full z-40 w-[280px] pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-[10px] border border-white bg-[#ececec] p-2 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                <Link href="/blog-ml/categorias" className="block rounded-[10px] px-3 py-2 text-sm font-medium text-foreground hover:bg-black/5">
                  Todas as categorias
                </Link>
                {blogCategories.map((category) => (
                  <Link key={category.slug} href={`/blog-ml/categorias/${category.slug}`} className="flex items-center gap-2 rounded-[10px] px-3 py-2 text-sm text-foreground hover:bg-black/5">
                    <span className="size-2.5 rounded-full" style={{ background: category.colorToken }} />
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/blog-ml/recomendados"
            className={cn(
              "rounded-[10px] px-3 py-2 text-sm transition-colors",
              pathname === "/blog-ml/recomendados"
                ? "bg-[#aff000] font-medium text-black"
                : "text-foreground hover:bg-black/5"
            )}
          >
            Leitura recomendada
          </Link>

          <Link
            href="/blog-ml#newsletter"
            className="ml-2 inline-flex min-h-10 items-center rounded-[10px] bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
          >
            Newsletter
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu do blog"
          className="ml-auto rounded-[10px] p-1.5 transition-colors hover:bg-black/5 lg:hidden"
        >
          <Menu className="size-[22px]" strokeWidth={1.5} />
        </button>
      </header>

      {open && (
        <button
          type="button"
          aria-label="Fechar menu do blog"
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed right-[30px] top-[30px] z-50 flex w-[min(20rem,calc(100vw-60px))] flex-col overflow-y-auto rounded-[10px] border border-white bg-[#ececec] p-5 lg:hidden",
          "transition-transform duration-200",
          open ? "translate-x-0" : "translate-x-[calc(100%+30px)]"
        )}
        style={{ height: "calc(100vh - 60px)" }}
      >
        <div className="mb-5 flex items-center justify-between border-b border-white pb-5">
          <Link href="/blog-ml" onClick={() => setOpen(false)} className="block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={BRAND_LOGO_URL} alt="Negocios" className="h-5 w-auto" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fechar menu do blog"
            className="rounded-[10px] p-1.5 transition-colors hover:bg-black/5"
          >
            <X className="size-5" strokeWidth={1.5} />
          </button>
        </div>

        <nav className="flex flex-col gap-6">
          <div>
            <h3 className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Blog
            </h3>
            <ul className="flex flex-col gap-0.5">
              {blogNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-[10px] px-2 py-2.5 text-sm transition-colors",
                      pathname === item.href
                        ? "bg-[#aff000] font-medium text-black"
                        : "text-foreground hover:bg-black/5"
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Biblioteca
            </h3>
            <ul className="flex flex-col gap-0.5">
              {categoryLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-[10px] px-2 py-2.5 text-sm text-foreground transition-colors hover:bg-black/5"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="mt-auto border-t border-white pt-5">
          <p className="text-[11px] text-muted-foreground">MN Blog © 2025</p>
        </div>
      </aside>

      <div className="px-[30px] pb-[30px] pt-[112px]">
        <main>{children}</main>
        <footer className="mt-[30px] rounded-[10px] border border-white bg-[#ececec] px-[30px] py-[40px] lg:px-[60px]">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)_minmax(0,0.8fr)_auto]">
            <div className="max-w-xl">
              <Link href="/blog-ml" className="mb-5 block w-fit">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={BRAND_LOGO_URL} alt="Masi Negocios" className="h-6 w-auto" />
              </Link>
              <p className="text-sm leading-6 text-muted-foreground">
                Conteudos editoriais para empresários que precisam transformar tecnologia, mercado e operação em decisão, crescimento e margem.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Categorias
              </h2>
              <ul className="flex flex-col gap-2">
                {blogCategories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/blog-ml/categorias/${category.slug}`}
                      className="text-sm text-foreground transition-colors hover:text-primary"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Programas Masi
              </h2>
              <ul className="flex flex-col gap-2">
                {programLinks.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-foreground transition-colors hover:text-primary"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-start gap-3 lg:items-end">
              <Link
                href="/blog-ml#newsletter"
                className="inline-flex min-h-10 items-center rounded-[10px] bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
              >
                Assinar Newsletter
              </Link>
              <a
                href="https://masinegocios.com.br"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                masinegocios.com.br
              </a>
            </div>
          </div>

          <div className="mt-10 border-t border-white pt-5">
            <p className="text-xs text-muted-foreground">
              © 2026 Masi Negócios. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
