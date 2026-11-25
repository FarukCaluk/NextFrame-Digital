import type { Metadata } from "next";
import AlbumCard from "@/components/AlbumCard";
import CtaBand from "@/components/CtaBand";
import Gallery from "@/components/Gallery";
import GalleryTabs, { type Tab } from "@/components/GalleryTabs";
import Reveal from "@/components/Reveal";
import VideoReels from "@/components/VideoReels";
import { albums, categories, categoryId, designGroups, plural, type Category } from "@/lib/albums";
import { reelGroups, reels } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Galerija",
  description:
    "Albumi, video i dizajn NextFrame Digital: vjenčanja, sport, događaji, brendovi i snimci dronom.",
};

// Two clients per row on wide screens; widths follow the designs, so both sides end up equally tall.
const designRows = [designGroups.slice(0, 2), designGroups.slice(2)];

const inner = "mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16";

function Heading({ title, note }: { title: string; note?: string }) {
  return (
    <Reveal className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 md:mb-10">
      <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">{title}</h2>
      {note && <p className="text-sm text-foreground/60">{note}</p>}
    </Reveal>
  );
}

function Albums({ category }: { category: Category }) {
  const list = albums.filter((a) => a.category === category);
  return (
    <div className={inner}>
      <Heading title={category} note={`${list.length} ${plural(list.length, "album", "albuma", "albuma")}`} />
      <ul className={`grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5 ${list.length % 5 === 0 ? "lg:grid-cols-5" : ""}`}>
        {list.map((a) => (
          <li key={a.slug}>
            <AlbumCard
              album={{ slug: a.slug, title: a.title, category: a.category, cover: a.cover, count: a.photos.length }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Videos() {
  return (
    <div className={inner}>
      <Heading title="Video" />
      <div className="space-y-14">
        {reelGroups.map((g) => (
          <div key={g}>
            <h3 className="mb-6 font-display text-2xl font-semibold tracking-tight text-accent">{g}</h3>
            <VideoReels items={reels.filter((r) => r.group === g)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Designs() {
  return (
    <div className={inner}>
      <Heading title="Dizajn" note="Objave i plakati po klijentima" />
      <div className="space-y-10 lg:space-y-12">
        {designRows.map((row) => (
          <div key={row[0].client} className="flex flex-col gap-10 lg:flex-row lg:gap-8">
            {row.map((group) => (
              <div
                key={group.client}
                className="min-w-0 lg:flex-[var(--grow)_1_0%]"
                style={{ "--grow": group.designs.reduce((sum, d) => sum + d.w / d.h, 0) } as React.CSSProperties}
              >
                <h3 className="mb-4 font-display text-xl font-semibold tracking-tight">{group.client}</h3>
                <Gallery photos={group.designs} row />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const tabs: Tab[] = [
  { id: "svi", label: "Svi albumi" },
  ...categories.map((c) => ({ id: categoryId[c], label: c, inAll: true, content: <Albums category={c} /> })),
  { id: "video", label: "Video", content: <Videos /> },
  { id: "dizajn", label: "Dizajn", content: <Designs /> },
];

export default function GalerijaPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 md:px-8 md:pb-14 md:pt-24">
        <Reveal>
          <h1 className="font-display text-6xl font-semibold leading-[0.9] tracking-tighter md:text-9xl">Galerija</h1>
          <p className="mt-8 max-w-md text-lg text-foreground/70">Albumi po vrsti, video i dizajn.</p>
        </Reveal>
      </div>

      <GalleryTabs label="Dijelovi galerije" tabs={tabs} />

      <CtaBand />
    </>
  );
}
