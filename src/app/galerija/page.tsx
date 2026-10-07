import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import Gallery from "@/components/Gallery";
import Reveal from "@/components/Reveal";
import VideoReels from "@/components/VideoReels";
import { categories, photos } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Galerija",
  description: "Fotografije i video radovi NextFrame Digital: vjenčanja, sport, automobili, događaji i snimci dronom.",
};

export default function GalerijaPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
        <Reveal>
          <h1 className="font-display text-6xl font-semibold leading-[0.9] tracking-tighter md:text-9xl">Galerija</h1>
          <div className="mt-8 flex gap-8 text-sm font-medium">
            <a href="#video" className="underline underline-offset-8 hover:text-accent">Video</a>
            <a href="#foto" className="underline underline-offset-8 hover:text-accent">Fotografije</a>
          </div>
        </Reveal>
      </div>

      <section id="video" className="scroll-mt-16 border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <h2 className="mb-12 font-display text-4xl font-semibold tracking-tight md:text-6xl">Video</h2>
          </Reveal>
          <VideoReels />
        </div>
      </section>

      <section id="foto" className="scroll-mt-16 border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <h2 className="mb-10 font-display text-4xl font-semibold tracking-tight md:text-6xl">Fotografije</h2>
          </Reveal>
          <Gallery photos={photos} categories={categories} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
