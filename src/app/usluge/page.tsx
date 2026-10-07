import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { ReelCard } from "@/components/VideoReels";
import { designs, reels, services } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Usluge",
  description: "Vjenčanja, foto i video, dron, dizajn i marketing. Sve usluge NextFrame Digital.",
};

const cols: Record<number, string> = { 1: "grid-cols-1 max-w-[16rem]", 2: "grid-cols-2 max-w-lg", 3: "grid-cols-3" };
const textLink = "group inline-flex items-center gap-2";

export default function UslugePage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
        <Reveal>
          <h1 className="font-display text-6xl font-semibold leading-[0.9] tracking-tighter md:text-9xl">Usluge</h1>
          <p className="mt-8 max-w-md text-lg text-foreground/70">
            Pet usluga koje se nadopunjuju: od snimanja do objave.
          </p>
        </Reveal>
      </div>

      {services.map((s) => {
        const serviceReels = s.reelGroup ? reels.filter((r) => r.group === s.reelGroup) : [];
        return (
          <section key={s.slug} id={s.slug} className="scroll-mt-24 border-t border-white/10">
            <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <h2 className="font-display text-5xl font-semibold leading-none tracking-tighter md:text-7xl lg:sticky lg:top-28">
                  {s.title}
                </h2>
              </div>
              <div className="lg:col-span-7">
                <Reveal>
                  <p className="max-w-xl text-xl text-foreground/70">{s.description}</p>
                </Reveal>

                {s.images.length > 0 && (
                  <div className={`mt-10 grid gap-3 ${cols[s.images.length]}`}>
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
                  </div>
                )}

                {s.slug === "dizajn" && (
                  <div className="mt-10 columns-2 gap-3 sm:columns-3">
                    {designs.slice(0, 6).map((d) => (
                      <Image
                        key={d.src}
                        src={d.src}
                        alt={d.alt}
                        width={d.w}
                        height={d.h}
                        quality={90}
                        sizes="(max-width: 1024px) 33vw, 22vw"
                        className="mb-3 h-auto w-full break-inside-avoid rounded-surface"
                      />
                    ))}
                  </div>
                )}

                {serviceReels.length > 0 && (
                  <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {serviceReels.map((r) => (
                      <li key={r.url}>
                        <ReelCard reel={r} />
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-medium">
                  <Link href={`/rezervacija?usluga=${encodeURIComponent(s.title)}`} className={`${textLink} text-accent`}>
                    Zakaži termin
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                  {s.slug === "dizajn" && (
                    <Link href="/galerija#dizajn" className="underline underline-offset-8 hover:text-accent">
                      Pogledaj sve dizajne
                    </Link>
                  )}
                  {s.reelGroup && (
                    <Link href="/galerija#video" className="underline underline-offset-8 hover:text-accent">
                      Sav video
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <CtaBand />
    </>
  );
}
