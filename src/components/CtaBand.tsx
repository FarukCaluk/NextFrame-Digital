import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function CtaBand() {
  return (
    <section className="border-t border-line">
      <Reveal className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <h2 className="max-w-4xl font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-8xl">
          Planirate vjenčanje, događaj ili kampanju?
        </h2>
        <p className="mt-6 max-w-md text-muted">Pošaljite datum i kratak opis, javljamo se uskoro.</p>
        <Link
          href="/rezervacija"
          className="mt-10 inline-flex h-14 items-center bg-accent px-8 font-semibold text-background transition-colors hover:bg-foreground active:translate-y-px"
        >
          Zakaži termin
        </Link>
      </Reveal>
    </section>
  );
}
