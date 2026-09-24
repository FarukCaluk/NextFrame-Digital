import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Usluge",
  description: "Vjenčanja, foto/video produkcija, snimanje dronom i dizajn – sve usluge NextFrame Digital.",
};

export default function UslugePage() {
  return (
    <div>
      <div className="mx-auto max-w-5xl px-5 pt-24 pb-12">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Usluge</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">Sve što vam treba, pod jednim krovom</h1>
          <p className="mt-6 max-w-2xl text-muted">
            Od prve ideje do finalnog kadra – četiri usluge koje se prirodno nadopunjuju, bilo da vam treba
            snimanje vjenčanja, produkcija za brend, kadrovi iz vazduha ili kompletan vizuelni identitet.
          </p>
        </Reveal>
      </div>

      {services.map((service, i) => (
        <section
          key={service.slug}
          id={service.slug}
          className={`scroll-mt-24 border-t border-border ${i % 2 === 1 ? "bg-background-alt" : ""}`}
        >
          <div
            className={`mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:items-center ${
              i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <Reveal className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-display text-3xl sm:text-4xl">{service.title}</h2>
              <p className="mt-4 text-muted">{service.description}</p>
              <ul className="mt-6 space-y-3">
                {service.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-foreground/90">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                href="/rezervacija"
                className="mt-8 inline-block rounded-full border border-accent px-6 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-background"
              >
                Zakaži za: {service.title}
              </Link>
            </Reveal>
          </div>
        </section>
      ))}
    </div>
  );
}
