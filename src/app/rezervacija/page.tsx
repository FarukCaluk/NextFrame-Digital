import { Suspense } from "react";
import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";
import { site } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Zakaži termin",
  description: "Pošaljite datum i kratak opis. NextFrame Digital se javlja na email ili telefon.",
};

export default function RezervacijaPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 lg:grid-cols-12 lg:gap-16 lg:py-24">
      <div className="lg:col-span-5">
        <h1 className="font-display text-6xl font-semibold leading-[0.9] tracking-tighter md:text-8xl">Zakaži termin</h1>
        <p className="mt-8 max-w-sm text-lg text-muted">Pošaljite datum i kratak opis. Javljamo se na email ili telefon.</p>
        <ul className="mt-10 space-y-3 text-sm">
          <li>
            <a href={`mailto:${site.email}`} className="underline underline-offset-8 hover:text-accent">
              {site.email}
            </a>
          </li>
          <li>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="underline underline-offset-8 hover:text-accent">
              Instagram poruka
            </a>
          </li>
        </ul>
      </div>
      <div className="lg:col-span-7">
        <Suspense>
          <BookingForm />
        </Suspense>
      </div>
    </div>
  );
}
