"use client";

import { useState, type FormEvent } from "react";
import { services, site } from "@/lib/site-data";

type Status = "idle" | "sending" | "sent" | "error";

const today = new Date().toISOString().split("T")[0];

function buildMailto(data: Record<string, string>) {
  const subject = `Nova rezervacija – ${data.ime} ${data.prezime} (${data.usluga})`;
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
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;

    setStatus("sending");
    setMessage(null);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("sent");
        setMessage("Hvala! Vaš upit je poslan, javljamo se uskoro.");
        form.reset();
        return;
      }

      // Server email not configured yet or send failed — fall back to opening the visitor's mail client.
      window.location.href = buildMailto(data);
      setStatus("sent");
      setMessage("Otvara se vaš email klijent da potvrdite slanje upita.");
      form.reset();
    } catch {
      window.location.href = buildMailto(data);
      setStatus("error");
      setMessage("Otvara se vaš email klijent da potvrdite slanje upita.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      <Field label="Ime" name="ime" required />
      <Field label="Prezime" name="prezime" required />

      <div className="sm:col-span-2">
        <label className="mb-1.5 block text-sm text-muted" htmlFor="usluga">
          Usluga <span className="text-accent">*</span>
        </label>
        <select
          id="usluga"
          name="usluga"
          required
          className="w-full rounded-xl border border-border bg-background-alt px-4 py-3 text-sm outline-none focus:border-accent"
          defaultValue=""
        >
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
      </div>

      <Field label="Email" name="email" type="email" required />
      <Field label="Broj telefona" name="telefon" type="tel" required />
      <Field label="Datum termina" name="datum" type="date" required min={today} />

      <div className="sm:col-span-2">
        <label className="mb-1.5 block text-sm text-muted" htmlFor="opis">
          Opis upita
        </label>
        <textarea
          id="opis"
          name="opis"
          rows={4}
          placeholder="Recite nam par detalja o vašem eventu ili projektu..."
          className="w-full resize-none rounded-xl border border-border bg-background-alt px-4 py-3 text-sm outline-none focus:border-accent"
        />
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-full bg-accent px-8 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.01] disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? "Slanje..." : "Pošalji upit"}
        </button>
        {message && (
          <p className={`mt-3 text-sm ${status === "error" ? "text-muted" : "text-accent"}`}>{message}</p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  min,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  min?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-muted" htmlFor={name}>
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        min={min}
        className="w-full rounded-xl border border-border bg-background-alt px-4 py-3 text-sm outline-none focus:border-accent"
      />
    </div>
  );
}
