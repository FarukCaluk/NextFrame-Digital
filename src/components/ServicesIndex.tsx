"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { services } from "@/lib/site-data";

export default function ServicesIndex() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <ul className="space-y-2 lg:col-span-7">
        {services.map((s, i) => (
          <li
            key={s.slug}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            className={`rounded-surface border transition-colors duration-300 ${
              active === i ? "glass" : "border-transparent"
            }`}
          >
            <Link
              href={`/usluge#${s.slug}`}
              className="flex flex-col gap-1 px-5 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 md:px-7 md:py-6"
            >
              <span
                className={`font-display text-4xl font-semibold tracking-tight transition-colors duration-500 md:text-6xl ${
                  active === i ? "text-accent" : "text-foreground"
                }`}
              >
                {s.title}
              </span>
              <span className="text-sm text-foreground/60">{s.short}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="glass hidden self-start rounded-surface p-2 lg:sticky lg:top-28 lg:col-span-5 lg:block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[0.8rem] bg-surface">
          {services.map((s, i) => (
            <div
              key={s.slug}
              className={`absolute inset-0 transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-0"}`}
            >
              {s.preview ? (
                <Image src={s.preview} alt="" fill quality={90} sizes="40vw" className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Image src="/images/logo-mark.png" alt="" width={300} height={243} className="w-1/2 opacity-30" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
