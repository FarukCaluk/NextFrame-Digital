import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import BookingForm from "@/components/BookingForm";
import { site } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Rezervacija",
  description: "Zakažite termin za vjenčanje, foto/video produkciju, snimanje dronom ili dizajn.",
};

export default function RezervacijaPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24">
      <Reveal>
        <p className="text-sm uppercase tracking-[0.3em] text-accent">Rezervacija</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Zakažimo vaš termin</h1>
        <p className="mt-6 text-muted">
          Popunite formu ispod sa detaljima vašeg eventa ili projekta. Odgovaramo u najkraćem mogućem roku na{" "}
          <a href={`mailto:${site.email}`} className="text-accent hover:underline">
            {site.email}
          </a>
          .
        </p>
      </Reveal>

      <Reveal delay={100} className="mt-12 rounded-2xl border border-border bg-background-alt p-6 sm:p-10">
        <BookingForm />
      </Reveal>
    </div>
  );
}
