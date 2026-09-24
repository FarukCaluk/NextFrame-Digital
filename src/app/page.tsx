import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { partners, portfolio, services, site, stats } from "@/lib/site-data";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden border-b border-border">
        <Image
          src="/images/portfolio-wedding-1.jpg"
          alt="NextFrame Digital – produkcija vjenčanja"
          fill
          priority
          className="object-cover object-top opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-40">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">{site.name}</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
            {site.tagline}
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted sm:text-lg">
            {site.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/rezervacija"
              className="rounded-full bg-accent px-7 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.03]"
            >
              Zakaži termin
            </Link>
            <Link
              href="/usluge"
              className="rounded-full border border-foreground/30 px-7 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              Pogledaj usluge
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-background-alt">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 py-12 md:grid-cols-4">
          {stats.map((s) => (
            <Reveal key={s.label} className="text-center">
              <div className="font-display text-3xl text-accent sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-muted sm:text-sm">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Šta nudimo</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">Usluge koje pokrivaju cijelu priču</h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 80}>
              <Link
                href={`/usluge#${service.slug}`}
                className="group block h-full overflow-hidden rounded-2xl border border-border bg-background-alt transition-colors hover:border-accent"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl">{service.title}</h3>
                  <p className="mt-2 text-sm text-muted">{service.short}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Portfolio preview */}
      <section className="border-y border-border bg-background-alt py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-accent">Portfolio</p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl">Nedavni radovi</h2>
            </div>
            <Link href="/galerija" className="text-sm text-accent hover:underline">
              Pogledaj cijelu galeriju →
            </Link>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5">
            {portfolio.map((item, i) => (
              <Reveal key={item.src} delay={i * 60}>
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Povjerenje brendova</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">Sarađujemo sa</h2>
        </Reveal>
        <Reveal delay={100} className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {partners.map((p) => (
            <span key={p} className="text-sm uppercase tracking-wide text-muted sm:text-base">
              {p}
            </span>
          ))}
        </Reveal>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-background-alt">
        <Reveal className="mx-auto max-w-3xl px-5 py-24 text-center">
          <h2 className="font-display text-3xl sm:text-4xl">Spremni da ispričamo vašu priču?</h2>
          <p className="mt-4 text-muted">
            Zakažite besplatan razgovor i dogovorimo termin za vaše vjenčanje, event ili brend.
          </p>
          <Link
            href="/rezervacija"
            className="mt-8 inline-block rounded-full bg-accent px-8 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.03]"
          >
            Rezerviši termin
          </Link>
        </Reveal>
      </section>
    </>
  );
}
