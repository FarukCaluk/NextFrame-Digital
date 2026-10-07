import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PartnerMarquee from "@/components/PartnerMarquee";
import Reveal from "@/components/Reveal";
import ServicesIndex from "@/components/ServicesIndex";
import VideoReels from "@/components/VideoReels";

const bento = [
  {
    src: "/images/portfolio/vjencanja-stepenice.jpg",
    alt: "Mladenci na stepenicama modernog objekta",
    cell: "col-span-2 aspect-[4/5] lg:aspect-auto lg:col-span-4 lg:row-span-6",
    pos: "object-center",
  },
  {
    src: "/images/portfolio/auto-audi-krov.jpg",
    alt: "Audi A3 na krovu parking garaže",
    cell: "col-span-2 aspect-[3/2] lg:aspect-auto lg:col-span-8 lg:row-span-3",
    pos: "object-center",
  },
  {
    src: "/images/portfolio/sport-fudbaler.jpg",
    alt: "Portret mladog fudbalera na terenu",
    cell: "aspect-square lg:aspect-auto lg:col-span-4 lg:row-span-3",
    pos: "object-top",
  },
  {
    src: "/images/portfolio/sport-kickbox.jpg",
    alt: "Trener i kickboks takmičar u uglu ringa",
    cell: "aspect-square lg:aspect-auto lg:col-span-4 lg:row-span-3",
    pos: "object-center",
  },
];

export default function Home() {
  return (
    <>
      <section className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-7xl items-center gap-12 px-5 py-12 md:px-8 lg:grid-cols-12 lg:gap-8 lg:py-0">
        <div className="lg:col-span-7">
          <h1
            className="rise font-display text-[clamp(3.4rem,8.2vw,7.5rem)] font-semibold leading-[0.9] tracking-tighter"
            style={{ "--i": 0 } as React.CSSProperties}
          >
            <span className="block">Od ideje</span>
            <span className="block text-accent">do vizije.</span>
          </h1>
          <p className="rise mt-8 max-w-md text-lg text-muted" style={{ "--i": 2 } as React.CSSProperties}>
            Fotografija, video, dron, dizajn i marketing na jednom mjestu. Za vjenčanja, sportske klubove i brendove.
          </p>
          <div
            className="rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <Link
              href="/rezervacija"
              className="inline-flex h-14 items-center bg-accent px-8 font-semibold text-background transition-colors hover:bg-foreground active:translate-y-px"
            >
              Zakaži termin
            </Link>
            <Link href="/galerija" className="group inline-flex items-center gap-2 text-sm font-medium">
              Pogledaj radove
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        <div className="rise relative lg:col-span-5" style={{ "--i": 1 } as React.CSSProperties}>
          <div className="relative h-[56dvh] overflow-hidden lg:h-[min(74dvh,680px)]">
            <Image
              src="/images/portfolio/vjencanja-stepenice.jpg"
              alt="Mladenci na stepenicama modernog objekta"
              fill
              priority
              quality={90}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="drift object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-4 hidden w-2/5 border-[6px] border-background md:block lg:-left-12">
            <Image
              src="/images/portfolio/sport-kickbox.jpg"
              alt="Trener i kickboks takmičar u uglu ringa"
              width={1616}
              height={1080}
              quality={90}
              sizes="20vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      <PartnerMarquee />

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <Reveal>
          <h2 className="mb-12 font-display text-4xl font-semibold tracking-tight md:mb-16 md:text-6xl">Šta radimo</h2>
        </Reveal>
        <ServicesIndex />
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
            <h2 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">Odabrani radovi</h2>
            <Link href="/galerija" className="group inline-flex items-center gap-2 text-sm font-medium">
              Pogledaj radove
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:h-[780px] lg:grid-cols-12 lg:grid-rows-6">
            {bento.map((b, i) => (
              <Reveal key={b.src} image delay={i * 120} className={b.cell}>
                <Link href="/galerija" className="group relative block h-full w-full overflow-hidden bg-surface">
                  <Image
                    src={b.src}
                    alt={b.alt}
                    fill
                    quality={90}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={`object-cover ${b.pos} transition-transform duration-700 group-hover:scale-[1.04]`}
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
          <Reveal>
            <h2 className="mb-12 font-display text-4xl font-semibold tracking-tight md:mb-16 md:text-6xl">Video</h2>
          </Reveal>
          <VideoReels />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
