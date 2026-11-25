import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function CtaBand() {
  return (
    <section className="pb-20 pt-10 md:pb-32">
      <Reveal className="@container relative">
        {/* Edge to edge, cut just above the plane and just under the tyres, and never taller than the window. */}
        <div className="relative aspect-[9/5] w-full overflow-hidden bg-surface md:aspect-[207/100] md:max-h-[calc(100svh_-_5.5rem)] md:min-h-[43.9cqw]">
          <Image
            src="/images/radovi/dejanbaa/02.jpg"
            alt="Automobili na parkingu i avion u pozadini"
            fill
            quality={90}
            sizes="100vw"
            className="object-cover object-[50%_71%]"
          />
        </div>
        {/* The sky on the right of the photo is empty: the card sits there so the plane and the cars stay visible. */}
        <div className="glass-strong relative mx-3 mt-3 rounded-surface p-6 md:mx-8 md:p-8 lg:absolute lg:right-[max(3cqw,calc((100cqw_-_80rem)/2))] lg:top-[6%] lg:m-0 lg:w-[min(36cqw,31rem)] lg:p-[min(2.2cqw,2.25rem)]">
          <h2 className="font-display text-3xl font-semibold leading-none tracking-tight md:text-4xl lg:text-[min(2.7cqw,2.75rem)]">
            Planirate vjenčanje, događaj ili kampanju?
          </h2>
          <p className="mt-4 text-foreground/80 lg:mt-[min(1.1cqw,1rem)] lg:text-[clamp(0.8rem,1.15cqw,1rem)]">
            Pošaljite datum i kratak opis, javljamo se uskoro.
          </p>
          <Link
            href="/rezervacija"
            className="mt-6 inline-flex h-12 items-center rounded-full bg-accent px-7 font-semibold text-background transition-colors hover:bg-foreground active:translate-y-px lg:mt-[min(1.5cqw,1.5rem)] lg:h-[clamp(2.5rem,3.4cqw,3.25rem)] lg:px-[min(2cqw,1.75rem)] lg:text-[clamp(0.85rem,1.1cqw,1rem)]"
          >
            Zakaži termin
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
