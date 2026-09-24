import Image from "next/image";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { portfolio, site } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Galerija",
  description: "Pregled radova NextFrame Digital – vjenčanja, foto i video produkcija.",
};

export default function GalerijaPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-24">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Galerija</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">Radovi koji govore sami za sebe</h1>
        </div>
        <a
          href={site.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-accent hover:underline"
        >
          Više na Instagramu →
        </a>
      </Reveal>

      <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {portfolio.map((item, i) => (
          <Reveal key={item.src} delay={i * 60} className="mb-4 break-inside-avoid">
            <div className="group relative overflow-hidden rounded-2xl border border-border">
              <Image
                src={item.src}
                alt={item.alt}
                width={640}
                height={800}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-background/80 px-3 py-1 text-xs uppercase tracking-wide text-accent backdrop-blur">
                {item.category}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
