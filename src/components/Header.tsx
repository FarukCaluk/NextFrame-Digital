"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/site-data";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt={site.name}
            width={44}
            height={44}
            className="h-11 w-11 rounded-full"
            priority
          />
          <span className="font-display text-lg tracking-wide text-foreground">
            NextFrame <span className="text-accent">Digital</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm tracking-wide transition-colors hover:text-accent ${
                pathname === item.href ? "text-accent" : "text-foreground/80"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/rezervacija"
          className="hidden rounded-full border border-accent px-5 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-background lg:inline-block"
        >
          Zakaži termin
        </Link>

        <button
          type="button"
          aria-label="Otvori meni"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-1.5 p-2 lg:hidden"
        >
          <span className={`h-0.5 w-6 bg-foreground transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-foreground transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border bg-background px-5 py-4 lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-3 py-2 text-sm ${
                pathname === item.href ? "bg-background-alt text-accent" : "text-foreground/80"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/rezervacija"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full border border-accent px-4 py-2 text-center text-sm font-medium text-accent"
          >
            Zakaži termin
          </Link>
        </nav>
      )}
    </header>
  );
}
