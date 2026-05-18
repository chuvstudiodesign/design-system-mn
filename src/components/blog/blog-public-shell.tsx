"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { blogCategories } from "@/data/blog";
import { cn } from "@/lib/utils";

const BRAND_LOGO_URL = "https://raw.githubusercontent.com/chuvstudiodesign/logos-masi-negocios/71ad67702f1e8fc61061ef81a2e9f372788e7dab/Negocios.svg";

const blogNav = [
  { name: "Início", href: "/blog-ml" },
  { name: "Biblioteca", href: "/blog-ml#biblioteca" },
  { name: "Categorias", href: "/blog-ml#categorias" },
  { name: "Leitura recomendada", href: "/blog-ml#recomendados" },
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

  return (
    <div className="relative min-h-screen bg-background">
      <header
        className="fixed left-[30px] right-[30px] top-[22px] z-30 flex h-[60px] items-center justify-between rounded-[10px] border border-white bg-[#ececec] px-[30px]"
      >
        <Link href="/blog-ml" className="block" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={BRAND_LOGO_URL} alt="Negocios" className="h-[19px] w-auto" />
        </Link>

        <nav aria-label="Navegação principal do blog" className="hidden items-center gap-1 lg:flex">
          {blogNav.slice(0, 4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-[10px] px-3 py-2 text-sm transition-colors",
                pathname === item.href
                  ? "bg-[#aff000] font-medium text-black"
                  : "text-foreground hover:bg-black/5"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/blog-ml#newsletter"
            className="hidden min-h-10 items-center rounded-[10px] bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85 sm:inline-flex"
          >
            Newsletter
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu do blog"
            className="rounded-[10px] p-1.5 transition-colors hover:bg-black/5"
          >
            <Menu className="size-[22px]" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {open && (
        <button
          type="button"
          aria-label="Fechar menu do blog"
          className="fixed inset-0 z-40 bg-black/30"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed right-[30px] top-[30px] z-50 flex w-[min(20rem,calc(100vw-60px))] flex-col overflow-y-auto rounded-[10px] border border-white bg-[#ececec] p-5",
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
                      href={`/blog-ml#categoria-${category.slug}`}
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
