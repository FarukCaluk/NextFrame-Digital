"use client";

import { useEffect, useRef, useSyncExternalStore, type MouseEvent, type ReactNode } from "react";

/** A tab without its own content shows every tab marked `inAll`. */
export type Tab = { id: string; label: string; content?: ReactNode; inAll?: boolean };

const subscribe = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
  };
};
const currentHash = () => window.location.hash.slice(1);

/**
 * Sticky pill bar that shows one part of the page at a time. The choice lives in the address
 * (/galerija#sport), so links from other pages open the right tab.
 */
export default function GalleryTabs({ label, tabs }: { label: string; tabs: Tab[] }) {
  const hash = useSyncExternalStore(subscribe, currentHash, () => "");
  const active = tabs.find((t) => t.id === hash) ?? tabs[0];
  const shown = active.content ? [active] : tabs.filter((t) => t.inAll);
  const start = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);

  // A link straight to a tab lands on its content.
  useEffect(() => {
    if (!currentHash()) return;
    const frame = requestAnimationFrame(() => document.getElementById(currentHash())?.scrollIntoView());
    return () => cancelAnimationFrame(frame);
  }, []);

  // On narrow screens the bar scrolls sideways, so keep the chosen chip in view.
  useEffect(() => {
    const list = bar.current;
    const chip = list?.querySelector<HTMLElement>("[aria-current]");
    if (list && chip) {
      list.scrollTo({ left: chip.offsetLeft - (list.clientWidth - chip.offsetWidth) / 2, behavior: "smooth" });
    }
  }, [active.id]);

  const choose = (e: MouseEvent, id: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    window.history.replaceState(null, "", id === tabs[0].id ? window.location.pathname : `#${id}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    // Further down the page, go back up so the new tab is read from its beginning.
    const top = start.current!.getBoundingClientRect().top + window.scrollY - 88;
    if (window.scrollY > top) window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      <div ref={start} />
      <div className="sticky top-[5.5rem] z-30 flex justify-center px-3">
        <nav
          ref={bar}
          aria-label={label}
          className="glass-strong relative flex max-w-full gap-1 overflow-x-auto rounded-full p-1.5 [scrollbar-width:none]"
        >
          {tabs.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              onClick={(e) => choose(e, t.id)}
              aria-current={t === active ? "true" : undefined}
              className={`shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${
                t === active ? "bg-accent font-semibold text-background" : "text-foreground/80 hover:bg-white/10"
              }`}
            >
              {t.label}
            </a>
          ))}
        </nav>
      </div>

      <div key={active.id} id={active.id} className="mt-8 min-h-[60svh] scroll-mt-40">
        {shown.map((t) => (
          <section key={t.id} className="border-t border-white/10">
            {t.content}
          </section>
        ))}
      </div>
    </>
  );
}
