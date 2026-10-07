import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function CtaBand() {
  return (
    <section className="px-5 pb-20 pt-10 md:px-8 md:pb-32">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-surface">
        <Image
          src="/images/portfolio/auto-audi-avion.jpg"
          alt=""
          fill
          quality={90}
          sizes="100vw"
          className="object-cover"
        />
        <div className="relative px-5 py-14 md:px-16 md:py-28">
          <div className="glass max-w-2xl rounded-surface bg-black/30 p-8 md:p-12">
            <h2 className="font-display text-4xl font-semibold leading-[0.98] tracking-tight md:text-6xl">
              Planirate vjenčanje, događaj ili kampanju?
            </h2>
            <p className="mt-5 max-w-md text-foreground/80">Pošaljite datum i kratak opis, javljamo se uskoro.</p>
            <Link
              href="/rezervacija"
              className="mt-8 inline-flex h-14 items-center rounded-full bg-accent px-8 font-semibold text-background transition-colors hover:bg-foreground active:translate-y-px"
            >
              Zakaži termin
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
