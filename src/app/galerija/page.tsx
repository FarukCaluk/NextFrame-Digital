import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import Gallery from "@/components/Gallery";
import Reveal from "@/components/Reveal";
import VideoReels from "@/components/VideoReels";
import { categories, designs, photos, reelGroups, reels } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Galerija",
  description:
    "Video, fotografije i dizajn NextFrame Digital: vjenčanja, sport, automobili, snimci dronom i objave za brendove.",
};

const link = "underline underline-offset-8 hover:text-accent";

export default function GalerijaPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
        <Reveal>
          <h1 className="font-display text-6xl font-semibold leading-[0.9] tracking-tighter md:text-9xl">Galerija</h1>
          <div className="mt-8 flex gap-8 text-sm font-medium">
            <a href="#video" className={link}>Video</a>
            <a href="#foto" className={link}>Fotografije</a>
            <a href="#dizajn" className={link}>Dizajn</a>
          </div>
        </Reveal>
      </div>

      <section id="video" className="scroll-mt-24 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <h2 className="mb-12 font-display text-4xl font-semibold tracking-tight md:text-6xl">Video</h2>
          </Reveal>
          <div className="space-y-14">
            {reelGroups.map((g) => (
              <div key={g}>
                <h3 className="mb-6 font-display text-2xl font-semibold tracking-tight text-accent">{g}</h3>
                <VideoReels items={reels.filter((r) => r.group === g)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="foto" className="scroll-mt-24 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <h2 className="mb-10 font-display text-4xl font-semibold tracking-tight md:text-6xl">Fotografije</h2>
          </Reveal>
          <Gallery photos={photos} categories={categories} />
        </div>
      </section>

      <section id="dizajn" className="scroll-mt-24 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <h2 className="mb-10 font-display text-4xl font-semibold tracking-tight md:text-6xl">Dizajn</h2>
          </Reveal>
          <Gallery photos={designs} categories={[]} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
