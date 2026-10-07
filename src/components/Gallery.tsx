"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Photo } from "@/lib/site-data";

export default function Gallery({ photos, categories }: { photos: Photo[]; categories: string[] }) {
  const [filter, setFilter] = useState("Sve");
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const shown = filter === "Sve" ? photos : photos.filter((p) => p.category === filter);
  const current = index === null ? null : shown[index];

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const step = (d: number) => setIndex((i) => (i === null ? null : (i + d + shown.length) % shown.length));

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter fotografija">
        {["Sve", ...categories].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            aria-pressed={filter === c}
            className={`h-11 rounded-full px-6 text-sm transition-colors active:translate-y-px ${
              filter === c
                ? "bg-accent font-semibold text-background"
                : "glass text-foreground/85 hover:border-white/30"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div key={filter} className="mt-10 columns-2 gap-3 md:columns-3 md:gap-4">
        {shown.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => open(i)}
            aria-label={`Uvećaj: ${p.alt}`}
            className="group mb-3 block w-full overflow-hidden rounded-surface bg-surface md:mb-4"
          >
            <Image
              src={p.src}
              alt={p.alt}
              width={p.w}
              height={p.h}
              quality={90}
              sizes="(max-width: 768px) 50vw, 33vw"
              className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      <dialog
        ref={dialog}
        onClose={() => setIndex(null)}
        onClick={(e) => {
          if ((e.target as HTMLElement).dataset.close) dialog.current?.close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="fixed inset-0 m-0 h-dvh max-h-none w-dvw max-w-none bg-transparent p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        <div data-close="1" className="relative h-full w-full p-4 md:p-12">
          {current && (
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              fill
              quality={90}
              sizes="100vw"
              className="pointer-events-none object-contain p-4 md:p-12"
            />
          )}
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="glass-strong absolute right-4 top-4 h-11 rounded-full px-6 text-sm md:right-8 md:top-8"
          >
            Zatvori
          </button>
          {shown.length > 1 && (
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 md:bottom-8">
              <button type="button" onClick={() => step(-1)} aria-label="Prethodna" className="glass-strong h-12 w-16 rounded-full text-lg">
                ←
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Sljedeća" className="glass-strong h-12 w-16 rounded-full text-lg">
                →
              </button>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
