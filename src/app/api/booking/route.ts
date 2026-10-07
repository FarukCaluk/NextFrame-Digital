import { NextResponse } from "next/server";

const TO_EMAIL = process.env.BOOKING_EMAIL || "farukcaluk12@gmail.com";
const RESEND_API_KEY = process.env.RESEND_API_KEY;

type BookingPayload = {
  ime: string;
  prezime: string;
  usluga: string;
  opis: string;
  email: string;
  telefon: string;
  datum: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: Partial<BookingPayload>): string | null {
  if (!data.ime?.trim()) return "Ime je obavezno.";
  if (!data.prezime?.trim()) return "Prezime je obavezno.";
  if (!data.usluga?.trim()) return "Usluga je obavezna.";
  if (!data.email?.trim() || !EMAIL_RE.test(data.email)) return "Ispravan email je obavezan.";
  if (!data.telefon?.trim()) return "Broj telefona je obavezan.";
  if (!data.datum?.trim()) return "Datum je obavezan.";
  return null;
}

export async function POST(request: Request) {
  const data = (await request.json()) as Partial<BookingPayload>;

  const error = validate(data);
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  if (!RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Slanje emaila nije podešeno na serveru (RESEND_API_KEY)." },
      { status: 503 }
    );
  }

  const { ime, prezime, usluga, opis, email, telefon, datum } = data as BookingPayload;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "NextFrame Digital <onboarding@resend.dev>",
      to: [TO_EMAIL],
      reply_to: email,
      subject: `Nova rezervacija: ${ime} ${prezime} (${usluga})`,
      text: [
        `Ime i prezime: ${ime} ${prezime}`,
        `Usluga: ${usluga}`,
        `Datum termina: ${datum}`,
        `Email: ${email}`,
        `Telefon: ${telefon}`,
        "",
        "Opis upita:",
        opis?.trim() || "(nije unesen opis)",
      ].join("\n"),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("Resend error:", res.status, body);
    return NextResponse.json({ error: "Slanje emaila nije uspjelo. Pokušajte ponovo." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
