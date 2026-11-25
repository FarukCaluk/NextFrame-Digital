"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createFilm, type Frame } from "@/lib/film";

/**
 * Home hero: the page text sits on top, and 3D film strips run behind it and through the free space below.
 * Drag the front strip to move it, click a photo to open its album. Without WebGL2 it is a plain photo row.
 */
export default function FilmHero({ frames, children }: { frames: Frame[]; children: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const area = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [title, setTitle] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const section = root.current!;
    const stage = area.current!;
    const screen = canvas.current!;
    const flat = () => section.setAttribute("data-flat", "true");
    const film = createFilm(screen, frames, window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    if (!film) {
      flat();
      return;
    }

    const events = new AbortController();
    const on = <K extends keyof HTMLElementEventMap>(
      target: HTMLElement,
      type: K,
      listener: (e: HTMLElementEventMap[K]) => void,
    ) => target.addEventListener(type, listener, { signal: events.signal });

    const sizes = new ResizeObserver(() => {
      const outer = section.getBoundingClientRect();
      const free = stage.getBoundingClientRect();
      film.resize({ width: outer.width, height: outer.height, areaTop: free.top - outer.top, areaHeight: free.height });
    });
    sizes.observe(section);
    sizes.observe(stage);
    const visible = new IntersectionObserver(([entry]) => film.run(entry.isIntersecting));
    visible.observe(section);

    let lastScroll = window.scrollY;
    window.addEventListener(
      "scroll",
      () => {
        film.scroll(Math.min(1, window.scrollY / section.offsetHeight), window.scrollY - lastScroll);
        lastScroll = window.scrollY;
      },
      { passive: true, signal: events.signal },
    );

    // The camera follows the mouse over the whole hero.
    on(section, "pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      const r = section.getBoundingClientRect();
      film.look(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
    });
    on(section, "pointerleave", () => film.look(0, 0));

    const frameAt = (e: PointerEvent) => {
      const r = screen.getBoundingClientRect();
      return film.pick(e.clientX - r.left, e.clientY - r.top);
    };
    const hover = (shape: ReturnType<typeof frameAt>) => {
      film.hover(shape ? shape.slot : -1);
      const frame = shape && frames[shape.frame];
      setTitle(frame ? frame.title : null);
      stage.style.cursor = frame ? "pointer" : "";
      if (frame) router.prefetch(`/galerija/${frame.slug}`);
    };

    let drag: { id: number; from: number; x: number; time: number; speed: number; moved: boolean } | null = null;
    on(stage, "pointerdown", (e) => {
      if (e.button !== 0) return;
      drag = { id: e.pointerId, from: e.clientX, x: e.clientX, time: e.timeStamp, speed: 0, moved: false };
    });
    on(stage, "pointermove", (e) => {
      if (!drag || e.pointerId !== drag.id) {
        if (e.pointerType === "mouse") hover(frameAt(e));
        return;
      }
      if (!drag.moved && Math.abs(e.clientX - drag.from) > 6) {
        drag.moved = true;
        stage.setPointerCapture(e.pointerId);
        hover(null);
        stage.style.cursor = "grabbing";
      }
      if (drag.moved) {
        const dx = e.clientX - drag.x;
        film.drag(dx);
        drag.speed = drag.speed * 0.5 + (dx / Math.max(8, e.timeStamp - drag.time)) * 500;
      }
      drag.x = e.clientX;
      drag.time = e.timeStamp;
    });
    const end = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      if (drag.moved) {
        // Let go of a resting pointer and the film stops; flick it and it keeps going.
        film.release(e.timeStamp - drag.time > 90 ? 0 : drag.speed);
        stage.style.cursor = "";
      } else if (e.type === "pointerup") {
        const shape = frameAt(e);
        if (shape) router.push(`/galerija/${frames[shape.frame].slug}`);
      }
      drag = null;
    };
    on(stage, "pointerup", end);
    on(stage, "pointercancel", end);
    on(stage, "pointerleave", () => {
      if (!drag?.moved) hover(null);
    });
    screen.addEventListener(
      "webglcontextlost",
      () => {
        film.run(false);
        flat();
      },
      { signal: events.signal },
    );

    return () => {
      events.abort();
      sizes.disconnect();
      visible.disconnect();
      film.destroy();
    };
  }, [frames, router]);

  return (
    <section
      ref={root}
      className="group relative isolate -mt-[4.25rem] flex min-h-svh flex-col overflow-hidden pt-[4.25rem] lg:min-h-[min(100svh,64rem)]"
    >
      <canvas ref={canvas} aria-hidden className="absolute inset-0 -z-10 h-full w-full group-data-[flat=true]:hidden" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(85%_48%_at_20%_24%,rgb(11_11_12/0.85),transparent_72%),radial-gradient(38%_24%_at_73%_29%,rgb(11_11_12/0.8),transparent)]"
      />
      {children}
      <div ref={area} className="relative min-h-[21rem] flex-1 cursor-grab touch-pan-y select-none group-data-[flat=true]:cursor-auto">
        <ul className="hidden h-full items-center gap-3 overflow-x-auto px-5 group-data-[flat=true]:flex">
          {frames.map((f) => (
            <li key={f.src} className="relative h-64 shrink-0 overflow-hidden rounded-surface" style={{ aspectRatio: f.aspect }}>
              <Link href={`/galerija/${f.slug}`}>
                <Image src={f.src} alt={f.title} fill sizes="24rem" className="object-cover" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="glass pointer-events-none absolute bottom-5 left-1/2 w-max max-w-[calc(100%-2rem)] -translate-x-1/2 truncate rounded-full px-5 py-2.5 text-sm text-foreground/85 group-data-[flat=true]:hidden">
          {title ? (
            <>
              <span className="font-semibold">{title}</span> <span className="text-accent">Otvori album →</span>
            </>
          ) : (
            <>
              <span className="pointer-coarse:hidden">Povucite traku, kliknite na fotografiju</span>
              <span className="hidden pointer-coarse:inline">Prevucite traku, dodirnite fotografiju</span>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
