"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { services, site } from "@/lib/site-data";

type Status = "idle" | "sending" | "sent" | "fallback";

const today = new Date().toISOString().split("T")[0];

const field =
  "peer h-12 w-full rounded-surface border border-white/25 bg-white/5 px-4 text-base outline-none transition-colors focus:border-accent user-invalid:border-red-400";
const error = "mt-1.5 hidden text-sm text-red-400 peer-user-invalid:block";

function buildMailto(data: Record<string, string>) {
  const subject = `Nova rezervacija: ${data.ime} ${data.prezime} (${data.usluga})`;
  const body = [
    `Ime i prezime: ${data.ime} ${data.prezime}`,
    `Usluga: ${data.usluga}`,
    `Datum termina: ${data.datum}`,
    `Email: ${data.email}`,
    `Telefon: ${data.telefon}`,
    "",
    "Opis upita:",
    data.opis || "(nije unesen opis)",
  ].join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function BookingForm() {
  const defaultService = useSearchParams().get("usluga") ?? "";
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    setStatus("sending");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
    } catch {
      // falls through to the mail client fallback
    }
    window.location.href = buildMailto(data);
    setStatus("fallback");
  }

  if (status === "sent") {
    return (
      <div className="glass rounded-surface border-accent p-8 md:p-10">
        <h2 className="font-display text-3xl font-semibold tracking-tight">Upit je poslan.</h2>
        <p className="mt-3 max-w-md text-muted">Hvala vam. Javljamo se na email ili telefon koji ste ostavili.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="glass mt-8 h-12 rounded-full px-6 text-sm transition-colors hover:border-white/30 active:translate-y-px"
        >
          Pošalji novi upit
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
      <div>
        <label htmlFor="ime" className="mb-2 block text-sm text-muted">Ime</label>
        <input id="ime" name="ime" required autoComplete="given-name" className={field} />
        <p className={error}>Upišite ime.</p>
      </div>
      <div>
        <label htmlFor="prezime" className="mb-2 block text-sm text-muted">Prezime</label>
        <input id="prezime" name="prezime" required autoComplete="family-name" className={field} />
        <p className={error}>Upišite prezime.</p>
      </div>

      <div>
        <label htmlFor="usluga" className="mb-2 block text-sm text-muted">Usluga</label>
        <select id="usluga" name="usluga" required defaultValue={defaultService} className={field}>
          <option value="" disabled>
            Odaberite uslugu
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="Ostalo">Ostalo</option>
        </select>
        <p className={error}>Odaberite uslugu.</p>
      </div>
      <div>
        <label htmlFor="datum" className="mb-2 block text-sm text-muted">Datum termina</label>
        <input id="datum" name="datum" type="date" required min={today} className={field} />
        <p className={error}>Odaberite datum od danas nadalje.</p>
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm text-muted">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" className={field} />
        <p className={error}>Upišite ispravnu email adresu.</p>
      </div>
      <div>
        <label htmlFor="telefon" className="mb-2 block text-sm text-muted">Broj telefona</label>
        <input id="telefon" name="telefon" type="tel" required autoComplete="tel" className={field} />
        <p className={error}>Upišite broj telefona.</p>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="opis" className="mb-2 block text-sm text-muted">Opis upita</label>
        <textarea
          id="opis"
          name="opis"
          rows={5}
          className="w-full resize-none rounded-surface border border-white/25 bg-white/5 px-4 py-3 text-base outline-none transition-colors focus:border-accent"
        />
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-14 w-full items-center justify-center rounded-full bg-accent px-10 font-semibold text-background transition-colors hover:bg-foreground active:translate-y-px disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? "Šaljem..." : "Pošalji upit"}
        </button>
        {status === "fallback" && (
          <p role="status" className="mt-4 max-w-md text-sm text-muted">
            Otvorili smo vaš email program sa popunjenim upitom, pritisnite Pošalji. Ako se ništa ne otvori, pišite na{" "}
            <a href={`mailto:${site.email}`} className="text-accent underline underline-offset-4">
              {site.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
