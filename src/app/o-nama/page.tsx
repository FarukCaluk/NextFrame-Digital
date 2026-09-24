import Image from "next/image";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { stats } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "O nama",
  description: "Upoznajte NextFrame Digital – foto, video, dron i dizajn produkciju iza svakog projekta.",
};

const experience = [
  {
    title: "Foto & video produkcija",
    text: "Snimanje i montaža vjenčanja, eventa i promotivnog sadržaja, od prve ideje do finalnog kadra.",
  },
  {
    title: "Snimanje dronom",
    text: "Zračni kadrovi za nekretnine, vjenčanja i turističke sadržaje, sniman sigurno i u punoj rezoluciji.",
  },
  {
    title: "Dizajn i vizuelni identitet",
    text: "Logotipi, vizuelni identiteti i promotivni materijali koji brendu daju prepoznatljiv izgled.",
  },
  {
    title: "Social media management",
    text: "Vođenje i kreiranje sadržaja za društvene mreže, kontinuirano i usklađeno sa identitetom brenda.",
  },
];

export default function ONamaPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-24">
      <Reveal>
        <p className="text-sm uppercase tracking-[0.3em] text-accent">O nama</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Priča iza NextFrame Digital</h1>
      </Reveal>

      <div className="mt-12 grid gap-12 md:grid-cols-2 md:items-center">
        <Reveal>
          <p className="text-muted">
            NextFrame Digital je jednočlana produkcijska kuća koju vodi Armin Šolbić – fotograf, videograf i
            dizajner iz Bosne i Hercegovine. Ono što je počelo kao ljubav prema pričanju priča kroz kadar,
            preraslo je u studio koji brendovima i mladencima pomaže da svoju priču ispričaju na način koji se
            pamti.
          </p>
          <p className="mt-4 text-muted">
            Svaki projekat – bilo da je u pitanju vjenčanje, promotivni video za brend ili kompletan vizuelni
            identitet – prolazi kroz isti princip: <span className="text-foreground">od ideje do vizije, sve
            na jednom mjestu.</span> Bez posrednika, bez kompromisa u kvalitetu, uz direktnu komunikaciju od
            prvog razgovora do isporuke finalnog materijala.
          </p>
        </Reveal>
        <Reveal
          delay={100}
          className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-background-alt px-8 py-12 text-center"
        >
          <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-accent">
            <Image
              src="/images/armin-portrait.jpg"
              alt="Armin Šolbić – osnivač NextFrame Digital"
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>
          <div>
            <p className="font-display text-xl">Armin Šolbić</p>
            <p className="mt-1 text-sm text-muted">Osnivač & kreativni direktor</p>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-20 grid grid-cols-2 gap-8 border-y border-border py-10 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-3xl text-accent">{s.value}</div>
            <div className="mt-1 text-xs uppercase tracking-wide text-muted">{s.label}</div>
          </div>
        ))}
      </Reveal>

      <div className="mt-20">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Iskustvo</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">Šta radimo najbolje</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {experience.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 80}
              className="rounded-2xl border border-border bg-background-alt p-6"
            >
              <h3 className="font-display text-lg text-accent">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
