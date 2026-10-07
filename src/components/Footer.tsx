import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/site-data";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-6">
          <div className="flex items-center gap-3">
            <Image src="/images/logo-mark.png" alt="" width={300} height={243} className="h-8 w-auto" />
            <span className="font-display text-xl font-semibold tracking-tight">
              NextFrame <span className="text-accent">Digital</span>
            </span>
          </div>
          <p className="mt-5 max-w-sm text-muted">Od ideje do vizije, sve na jednom mjestu.</p>
        </div>

        <ul className="space-y-3 text-sm md:col-span-3">
          {[{ href: "/", label: "Početna" }, ...nav, { href: "/rezervacija", label: "Rezervacija" }].map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-muted transition-colors hover:text-foreground">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="space-y-3 text-sm md:col-span-3">
          <li>
            <a href={`mailto:${site.email}`} className="text-muted transition-colors hover:text-foreground">
              {site.email}
            </a>
          </li>
          <li>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-foreground">
              Instagram
            </a>
          </li>
          <li>
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-foreground">
              Facebook
            </a>
          </li>
          <li>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-foreground">
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
      <div className="border-t border-line px-5 py-6 text-xs text-muted md:px-8">
        <p className="mx-auto max-w-7xl">© {new Date().getFullYear()} NextFrame Digital</p>
      </div>
    </footer>
  );
}
