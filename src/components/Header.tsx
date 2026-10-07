"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site-data";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3"
          >
            <Image
              src="/images/logo-mark.png"
              alt=""
              width={300}
              height={243}
              className="h-7 w-auto"
              priority
            />
            <span className="font-display text-lg font-semibold tracking-tight">
              NextFrame <span className="text-accent">Digital</span>
            </span>
          </Link>

          <nav
            className="hidden items-center gap-9 lg:flex"
            aria-label="Glavna navigacija"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`text-sm transition-colors hover:text-accent ${
                  isActive(item.href) ? "text-accent" : "text-foreground/80"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/rezervacija"
              className="inline-flex h-10 items-center bg-accent px-5 text-sm font-semibold text-background transition-colors hover:bg-foreground active:translate-y-px"
            >
              Zakaži termin
            </Link>
          </nav>

          <button
            type="button"
            aria-label={open ? "Zatvori meni" : "Otvori meni"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative h-10 w-10 lg:hidden"
          >
            <span
              className={`absolute left-2 top-[15px] h-px w-6 bg-foreground transition-transform duration-300 ${
                open ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-2 top-[25px] h-px w-6 bg-foreground transition-transform duration-300 ${
                open ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Outside the header: its backdrop-filter would otherwise become the containing block of this fixed panel. */}
      {open && (
        <nav
          aria-label="Mobilna navigacija"
          className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col justify-between bg-background px-5 pb-10 pt-8 lg:hidden"
        >
          <ul className="flex flex-col">
            {[{ href: "/", label: "Početna" }, ...nav].map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block py-4 font-display text-4xl font-semibold tracking-tight ${
                    isActive(item.href) ? "text-accent" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/rezervacija"
            onClick={() => setOpen(false)}
            className="flex h-14 items-center justify-center bg-accent text-base font-semibold text-background active:translate-y-px"
          >
            Zakaži termin
          </Link>
        </nav>
      )}
    </>
  );
}
