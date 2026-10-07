"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { services } from "@/lib/site-data";

export default function ServicesIndex() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <ul className="lg:col-span-7">
        {services.map((s, i) => (
          <li
            key={s.slug}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            className="border-t border-line last:border-b"
          >
            <Link
              href={`/usluge#${s.slug}`}
              className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 md:py-7"
            >
              <span
                className={`font-display text-4xl font-semibold tracking-tight transition-all duration-500 md:text-6xl ${
                  active === i ? "text-accent lg:translate-x-3" : "text-foreground"
                }`}
              >
                {s.title}
              </span>
              <span className="text-sm text-muted">{s.short}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="relative hidden aspect-[4/5] self-start overflow-hidden bg-surface lg:sticky lg:top-24 lg:col-span-5 lg:block">
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
  );
}
