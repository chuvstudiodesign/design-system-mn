"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const BRAND_LOGO_URL = "https://raw.githubusercontent.com/chuvstudiodesign/logos-masi-negocios/71ad67702f1e8fc61061ef81a2e9f372788e7dab/Negocios.svg";

const blogNav = [
  { name: "Início", href: "/blog-ml" },
  { name: "Biblioteca", href: "/blog-ml#biblioteca" },
  { name: "Categorias", href: "/blog-ml#categorias" },
  { name: "Leitura recomendada", href: "/blog-ml#recomendados" },
  { name: "Newsletter", href: "/blog-ml#newsletter" },
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

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu do blog"
          className="rounded-[10px] p-1.5 transition-colors hover:bg-black/5"
        >
          <Menu className="size-[22px]" strokeWidth={1.5} />
        </button>
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
      </div>
    </div>
  );
}
