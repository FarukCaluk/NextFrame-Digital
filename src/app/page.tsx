import Link from "next/link";
import AlbumCard from "@/components/AlbumCard";
import CtaBand from "@/components/CtaBand";
import FeaturedVideo from "@/components/FeaturedVideo";
import FilmHero from "@/components/FilmHero";
import PartnerMarquee from "@/components/PartnerMarquee";
import Reveal from "@/components/Reveal";
import ServicesIndex from "@/components/ServicesIndex";
import VideoReels from "@/components/VideoReels";
import { album, photo } from "@/lib/albums";
import type { Frame } from "@/lib/film";
import { reels } from "@/lib/site-data";

const featured = ["vjencanje-02", "bilijar", "vjencanje-08", "kakanjski-dani", "dr-karic", "dejanbaa"].map(album);

// Photos on the 3D film, in order: portrait and landscape mostly take turns, cars are spread out.
const film: Frame[] = (
  [
    ["vjencanje-02", 7],
    ["dejanbaa", 2],
    ["bilijar", 3],
    ["vjencanje-04", 4],
    ["sweetspot", 1],
    ["dr-karic", 3],
    ["vjencanje-04", 7],
    ["dejanbaa", 3],
    ["kakanjski-dani", 3],
    ["vjencanje-06", 10],
    ["fitness-trenerica", 1],
    ["vjencanje-02", 12],
    ["spartak-gym", 1],
    ["vjencanje-08", 7],
    ["dejanbaa", 1],
    ["caffe-gotiva", 2],
    ["vjencanje-06", 9],
    ["vjencanje-04", 9],
    ["adin-boutique", 2],
    ["kakanjski-dani", 4],
    ["matura", 3],
    ["sweetspot", 2],
    ["bosana-foundation", 2],
    ["vjencanje-08", 3],
  ] as const
).map(([slug, n]) => {
  const p = photo(slug, n);
  return {
    slug,
    title: album(slug).title,
    src: p.src,
    aspect: p.w / p.h,
    // The same optimized files next/image serves; the 3D scene picks the size it needs.
    urls: [384, 640, 828, 1080].map(
      (w) => [w, `/_next/image?url=${encodeURIComponent(p.src)}&w=${w}&q=90`] as [number, string],
    ),
  };
});

export default function Home() {
  return (
    <>
      <FilmHero frames={film}>
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-5 pt-10 md:gap-8 md:px-8 md:pt-14 lg:grid-cols-12 lg:items-end">
          <h1
            className="rise font-display text-[clamp(3.4rem,8.2vw,7.5rem)] font-semibold leading-[0.9] tracking-tighter lg:col-span-7"
            style={{ "--i": 0 } as React.CSSProperties}
          >
            <span className="block">Od ideje</span>
            <span className="block text-accent">do vizije.</span>
          </h1>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="rise max-w-md text-base text-foreground/75 md:text-lg" style={{ "--i": 1 } as React.CSSProperties}>
              Fotografija, video, dron, dizajn i marketing na jednom mjestu. Za vjenčanja, sportske klubove i brendove.
            </p>
            <div className="rise mt-6 flex flex-wrap items-center gap-3 md:mt-8" style={{ "--i": 2 } as React.CSSProperties}>
              <Link
                href="/rezervacija"
                className="inline-flex h-14 items-center rounded-full bg-accent px-8 font-semibold text-background transition-colors hover:bg-foreground active:translate-y-px"
              >
                Zakaži termin
              </Link>
              <Link
                href="/galerija"
                className="glass group inline-flex h-14 items-center gap-2 rounded-full px-7 text-sm font-medium transition-colors hover:border-white/30 active:translate-y-px"
              >
                Pogledaj radove
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </FilmHero>

      <PartnerMarquee />

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <Reveal>
          <h2 className="mb-12 font-display text-4xl font-semibold tracking-tight md:mb-16 md:text-6xl">Šta radimo</h2>
        </Reveal>
        <ServicesIndex />
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-28">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
            <h2 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">Odabrani radovi</h2>
            <Link
              href="/galerija"
              className="glass group inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-medium transition-colors hover:border-white/30"
            >
              Pogledaj radove
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
          <ul className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3">
            {featured.map((a, i) => (
              <li key={a.slug}>
                <Reveal delay={(i % 3) * 100} className="h-full">
                  <AlbumCard
                    album={{ slug: a.slug, title: a.title, category: a.category, cover: a.cover, count: a.photos.length }}
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-28">
          <Reveal>
            <h2 className="mb-12 font-display text-4xl font-semibold tracking-tight md:mb-16 md:text-6xl">Video</h2>
          </Reveal>
          <Reveal className="mb-14 md:mb-20">
            <FeaturedVideo />
          </Reveal>
          <VideoReels items={reels.filter((r) => r.featured)} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
