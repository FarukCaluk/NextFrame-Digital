import Image from "next/image";
import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { partners } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Partneri",
  description: "Klubovi, brendovi i ordinacije sa kojima radi NextFrame Digital.",
};

const [featured, ...rest] = partners;
const featuredImages = [
  "/images/portfolio/sport-taekwondo-ogledalo.jpg",
  "/images/portfolio/sport-taekwondo-trening.jpg",
  "/images/portfolio/sport-trener-bosna-rudar.jpg",
];

function Mark({ name, logo }: { name: string; logo?: string }) {
  return logo ? (
    <Image src={logo} alt="" width={56} height={56} className="h-14 w-14 shrink-0 rounded-full object-cover" />
  ) : (
    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line font-display text-lg font-semibold">
      {name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")}
    </span>
  );
}

export default function PartneriPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
        <Reveal>
          <h1 className="font-display text-6xl font-semibold leading-[0.9] tracking-tighter md:text-9xl">Partneri</h1>
          <p className="mt-8 max-w-md text-lg text-muted">Klubovi, brendovi i ordinacije sa kojima radimo.</p>
        </Reveal>
      </div>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <Mark name={featured.name} logo={featured.logo} />
            <h2 className="mt-6 font-display text-4xl font-semibold leading-none tracking-tighter md:text-5xl">
              {featured.name}
            </h2>
            <p className="mt-5 max-w-sm text-lg text-muted">Foto i video sa treninga i događaja kluba.</p>
            <a
              href={`https://www.instagram.com/${featured.instagram}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-sm font-medium underline underline-offset-8 hover:text-accent"
            >
              Instagram
            </a>
          </Reveal>
          <div className="grid grid-cols-3 gap-3 lg:col-span-7">
            {featuredImages.map((src, i) => (
              <Reveal key={src} image delay={i * 120}>
                <div className="relative aspect-[3/4] overflow-hidden bg-surface">
                  <Image src={src} alt="" fill quality={90} sizes="(max-width: 1024px) 33vw, 28vw" className="object-cover" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <ul className="grid gap-4 md:grid-cols-2">
            {rest.map((p, i) => (
              <li key={p.name}>
                <Reveal delay={(i % 2) * 100}>
                  <a
                    href={`https://www.instagram.com/${p.instagram}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-5 border border-line p-5 transition-colors hover:border-accent"
                  >
                    <Mark name={p.name} logo={p.logo} />
                    <span className="flex-1 font-display text-xl font-semibold tracking-tight md:text-2xl">{p.name}</span>
                    <span className="text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent">↗</span>
                  </a>
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
