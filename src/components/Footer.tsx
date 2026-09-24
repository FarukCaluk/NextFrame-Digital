import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/site-data";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background-alt">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt={site.name} width={40} height={40} className="h-10 w-10 rounded-full" />
            <span className="font-display text-lg">NextFrame Digital</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted">{site.tagline}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium uppercase tracking-widest text-accent">Navigacija</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium uppercase tracking-widest text-accent">Kontakt</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-foreground">
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                @nextframe.digital
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-5 py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} NextFrame Digital. Sva prava zadržana.
      </div>
    </footer>
  );
}
