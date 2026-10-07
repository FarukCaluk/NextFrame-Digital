import Image from "next/image";
import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "O nama",
  description: "NextFrame Digital je kreativni studio za fotografiju, video, dron, dizajn i marketing. Osnivač je Armin Šolbić.",
};

export default function ONamaPage() {
  return (
    <>
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-5">
          <div className="glass rounded-surface p-2 lg:sticky lg:top-28">
            <div className="relative aspect-[9/13] overflow-hidden rounded-[0.8rem] bg-surface">
            <Image
              src="/images/armin.webp"
              alt="Armin Šolbić sa gimbalom i kamerom"
              fill
              priority
              quality={90}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-[62%_30%]"
            />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-10">
          <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-tighter md:text-7xl">
            Studio koji vodi Armin Šolbić.
          </h1>
          <div className="mt-10 max-w-xl space-y-5 text-lg text-foreground/70">
            <p>
              NextFrame Digital je kreativni studio iz Kaknja, specijalizovan za fotografiju, video produkciju i
              digitalni marketing. Osnivač je Armin Šolbić.
            </p>
            <p>
              Rad obuhvata vjenčanja, sportske klubove, automobile, snimke dronom i promotivne videe za lokalne
              brendove.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium">
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="underline underline-offset-8 hover:text-accent">
              Instagram
            </a>
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="underline underline-offset-8 hover:text-accent">
              Facebook
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="underline underline-offset-8 hover:text-accent">
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <Reveal image className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-36">
        <div className="relative h-[60dvh] overflow-hidden rounded-surface bg-surface">
          <Image
            src="/images/portfolio/sport-taekwondo-majstor.jpg"
            alt="Taekwondo trener ispred polaznika u dvorani"
            fill
            quality={90}
            sizes="100vw"
            className="object-cover object-[65%_40%]"
          />
        </div>
      </Reveal>

      <CtaBand />
    </>
  );
}
