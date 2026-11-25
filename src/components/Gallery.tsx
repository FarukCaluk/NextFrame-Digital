"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Photo } from "@/lib/albums";

/** Photos with a full-screen viewer. `row` puts them side by side at one height instead of in columns. */
export default function Gallery({ photos, row = false }: { photos: Photo[]; row?: boolean }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const swipeStart = useRef<number | null>(null);
  const current = index === null ? null : photos[index];

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const step = (d: number) => setIndex((i) => (i === null ? null : (i + d + photos.length) % photos.length));

  return (
    <>
      <div className={row ? "flex items-start gap-2 md:gap-3" : "columns-2 gap-3 md:columns-3 md:gap-4"}>
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => open(i)}
            aria-label={`Uvećaj: ${p.alt}`}
            className={`group overflow-hidden rounded-surface bg-surface ${
              row ? "min-w-0" : "mb-3 block w-full break-inside-avoid md:mb-4"
            }`}
            style={row ? { flex: `${p.w / p.h} 1 0%` } : undefined}
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
        onPointerDown={(e) => {
          swipeStart.current = e.pointerType === "touch" ? e.clientX : null;
        }}
        onPointerUp={(e) => {
          const from = swipeStart.current;
          swipeStart.current = null;
          if (from !== null && Math.abs(e.clientX - from) > 50) step(e.clientX < from ? 1 : -1);
        }}
        className="fixed inset-0 m-0 h-dvh max-h-none w-dvw max-w-none touch-pan-y bg-transparent p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
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
          {photos.length > 1 && (
            <div className="glass-strong absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full p-1 md:bottom-8">
              <button type="button" onClick={() => step(-1)} aria-label="Prethodna" className="h-11 w-14 rounded-full text-lg hover:bg-white/10">
                ←
              </button>
              <span className="min-w-16 text-center text-sm tabular-nums text-foreground/70">
                {(index ?? 0) + 1} / {photos.length}
              </span>
              <button type="button" onClick={() => step(1)} aria-label="Sljedeća" className="h-11 w-14 rounded-full text-lg hover:bg-white/10">
                →
              </button>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
