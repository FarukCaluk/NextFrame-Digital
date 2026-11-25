import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import Tilt from "@/components/Tilt";
import { album } from "@/lib/albums";
import { partners, type Partner } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Partneri",
  description: "Klubovi, brendovi i ordinacije sa kojima radi NextFrame Digital.",
};

const showcased = partners.filter((p) => p.shots);
const linked = partners.filter((p) => !p.shots);
const textLink = "underline underline-offset-8 hover:text-accent";

/** Logo if we have one, otherwise the album cover, otherwise initials. */
function Mark({ partner }: { partner: Partner }) {
  const src = partner.logo ?? (partner.album ? album(partner.album).cover.src : undefined);
  return src ? (
    <Image
      src={src}
      alt=""
      width={56}
      height={56}
      quality={90}
      className={`h-14 w-14 shrink-0 rounded-full object-cover ${partner.album === "dah-planine" ? "object-top" : ""}`}
    />
  ) : (
    <span className="glass flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-display text-lg font-semibold">
      {partner.name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")}
    </span>
  );
}

/** A partner with their pictures: what was done on one side, up to three pictures on the other. */
function Showcase({ partner, flip }: { partner: Partner; flip: boolean }) {
  const shots = partner.shots!;
  const work = partner.album ? `/galerija/${partner.album}` : "/galerija#dizajn";
  const spare = 3 - shots.reduce((n, s) => n + (s.wide ? 2 : 1), 0);
  const tile =
    "glass flex h-full min-h-32 items-center justify-center rounded-surface p-3 text-center text-sm font-medium transition-colors hover:border-accent/60";

  return (
    <article className="grid gap-3 lg:grid-cols-12 lg:gap-8">
      <Reveal
        className={`glass flex flex-col justify-between gap-5 rounded-surface p-5 md:gap-8 md:p-8 lg:col-span-5 ${
          flip ? "lg:order-2" : ""
        }`}
      >
        <Mark partner={partner} />
        <div>
          <h2 className="font-display text-3xl font-semibold leading-none tracking-tighter md:text-4xl">{partner.name}</h2>
          <p className="mt-4 max-w-sm text-foreground/70">{partner.work}</p>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium">
            <Link href={work} className={textLink}>
              {partner.album ? "Pogledaj fotografije" : "Pogledaj dizajne"}
            </Link>
            {partner.href && (
              <a href={partner.href} target="_blank" rel="noopener noreferrer" className={textLink}>
                Instagram
              </a>
            )}
          </div>
        </div>
      </Reveal>

      <div className="grid grid-cols-3 gap-2 md:gap-3 lg:col-span-7">
        {shots.map((s, i) => (
          <Reveal key={s.src} image delay={i * 120} className={s.wide ? "col-span-2" : ""}>
            <Tilt className="h-full">
              <Link
                href={work}
                aria-label={`${partner.name}: pogledaj radove`}
                className={`relative block h-full overflow-hidden rounded-surface bg-surface ${s.wide ? "" : "aspect-[3/4]"}`}
              >
                <Image
                  src={s.src}
                  alt=""
                  fill
                  quality={90}
                  sizes={s.wide ? "(max-width: 1024px) 66vw, 40vw" : "(max-width: 1024px) 33vw, 20vw"}
                  className={s.contain ? "object-contain" : "object-cover"}
                  style={{ objectPosition: s.position }}
                />
              </Link>
            </Tilt>
          </Reveal>
        ))}
        {spare > 0 && (
          <div className={spare === 2 ? "col-span-2" : ""}>
            {partner.album ? (
              <Link href={work} className={tile}>
                Pogledaj album →
              </Link>
            ) : (
              <a href={partner.href} target="_blank" rel="noopener noreferrer" className={tile}>
                Posjeti profil ↗
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default function PartneriPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 md:px-8 md:pb-14 md:pt-24">
        <Reveal>
          <h1 className="font-display text-6xl font-semibold leading-[0.9] tracking-tighter md:text-9xl">Partneri</h1>
          <p className="mt-8 max-w-md text-lg text-foreground/70">Klubovi, brendovi i ordinacije sa kojima radimo.</p>
        </Reveal>
      </div>

      <div className="mx-auto max-w-7xl space-y-14 px-5 py-8 md:space-y-20 md:px-8">
        {showcased.map((p, i) => (
          <Showcase key={p.name} partner={p} flip={i % 2 === 1} />
        ))}
      </div>

      <section>
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <h2 className="mb-8 font-display text-3xl font-semibold tracking-tight md:text-5xl">Još partnera</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {linked.map((p, i) => (
              <li key={p.name}>
                <Reveal delay={(i % 2) * 100} className="h-full">
                  <Tilt className="h-full">
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass group flex h-full items-center gap-5 rounded-surface p-5 transition-colors hover:border-accent/60"
                    >
                      <Mark partner={p} />
                      <span className="flex-1">
                        <span className="block font-display text-xl font-semibold tracking-tight md:text-2xl">{p.name}</span>
                        <span className="text-sm text-foreground/60">Posjeti profil</span>
                      </span>
                      <span className="text-foreground/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent">
                        ↗
                      </span>
                    </a>
                  </Tilt>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
