import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import ReelEmbed from "@/components/ReelEmbed";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Usluge",
  description: "Vjenčanja, foto i video, dron, dizajn i marketing. Sve usluge NextFrame Digital.",
};

const cols: Record<number, string> = { 1: "grid-cols-1 max-w-[16rem]", 2: "grid-cols-2 max-w-lg", 3: "grid-cols-3" };

export default function UslugePage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
        <Reveal>
          <h1 className="font-display text-6xl font-semibold leading-[0.9] tracking-tighter md:text-9xl">Usluge</h1>
          <p className="mt-8 max-w-md text-lg text-muted">
            Pet usluga koje se nadopunjuju: od snimanja do objave.
          </p>
        </Reveal>
      </div>

      {services.map((s) => (
        <section key={s.slug} id={s.slug} className="scroll-mt-24 border-t border-white/10">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className="font-display text-5xl font-semibold leading-none tracking-tighter md:text-7xl lg:sticky lg:top-28">
                {s.title}
              </h2>
            </div>
            <div className="lg:col-span-7">
              <Reveal>
                <p className="max-w-xl text-xl text-muted">{s.description}</p>
              </Reveal>
              {s.images.length + (s.reels?.length ?? 0) > 0 && (
                <div className={`mt-10 grid gap-3 ${cols[s.images.length + (s.reels?.length ?? 0)]}`}>
                  {s.images.map((src, i) => (
                    <Reveal key={src} image delay={i * 120}>
                      <div className="relative aspect-[3/4] overflow-hidden rounded-surface bg-surface">
                        <Image
                          src={src}
                          alt=""
                          fill
                          quality={90}
                          sizes="(max-width: 1024px) 33vw, 28vw"
                          className="object-cover"
                        />
                      </div>
                    </Reveal>
                  ))}
                  {s.reels?.map((url) => (
                    <ReelEmbed key={url} url={url} title={s.title} />
                  ))}
                </div>
              )}
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-medium">
                <Link
                  href={`/rezervacija?usluga=${encodeURIComponent(s.title)}`}
                  className="group inline-flex items-center gap-2 text-accent"
                >
                  Zakaži termin
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
                {s.slug === "dron" && (
                  <Link href="/galerija#video" className="underline underline-offset-8 hover:text-accent">
                    Pogledaj video
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      <CtaBand />
    </>
  );
}
