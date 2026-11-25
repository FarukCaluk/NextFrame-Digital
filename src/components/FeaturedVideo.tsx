"use client";

import Image from "next/image";
import { useState } from "react";
import { featuredVideo as video } from "@/lib/site-data";

/** A YouTube film behind its own poster: nothing is loaded from YouTube until someone presses play. */
export default function FeaturedVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="mx-auto lg:max-w-[calc((100svh_-_12rem)*16/9)]">
      <div className="glass-rim rounded-surface p-1.5">
        <div className="relative aspect-video overflow-hidden rounded-[0.9rem] bg-surface">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.youtube}?autoplay=1&rel=0`}
              title={video.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 rounded-[0.9rem]">
              <Image
                src={video.poster}
                alt=""
                fill
                quality={90}
                sizes="(max-width: 1280px) 100vw, 1216px"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <span className="glass-strong absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full md:h-24 md:w-24">
                <svg viewBox="0 0 24 24" aria-hidden className="ml-1 h-7 w-7 fill-accent md:h-10 md:w-10">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="sr-only">Pusti video: {video.title}</span>
            </button>
          )}
        </div>
      </div>
      <figcaption className="mt-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <span>
          <span className="block font-display text-2xl font-semibold tracking-tight md:text-3xl">{video.title}</span>
          <span className="text-sm text-foreground/60">{video.note}</span>
        </span>
        <a
          href={`https://www.youtube.com/watch?v=${video.youtube}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm underline underline-offset-4 hover:text-accent"
        >
          Otvori na YouTube-u
        </a>
      </figcaption>
    </figure>
  );
}
