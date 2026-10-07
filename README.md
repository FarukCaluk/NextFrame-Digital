# NextFrame Digital

Sajt za NextFrame Digital – foto, video, dron i dizajn produkciju (Armin Šolbić).

Next.js 16 (App Router) + TypeScript + Tailwind CSS 4. Bez UI biblioteka ili animacionih
paketa — scroll-reveal animacije su napravljene direktno preko `IntersectionObserver`
([src/components/Reveal.tsx](src/components/Reveal.tsx)).

## Stranice

- `/` – početna
- `/o-nama` – o nama
- `/usluge` – vjenčanja, foto i video, dron, dizajn, marketing
- `/galerija` – video (Facebook reels) i fotografije
- `/partneri` – partneri i klijenti
- `/rezervacija` – forma za rezervaciju termina

Sav sadržaj (usluge, fotografije, video, partneri) je u [src/lib/site-data.ts](src/lib/site-data.ts).
Fotografije su originali u `public/images/portfolio`, bez ponovne kompresije.

## Razvoj

```bash
npm install
npm run dev
```

## Forma za rezervaciju

Forma šalje POST na `/api/booking` ([src/app/api/booking/route.ts](src/app/api/booking/route.ts)),
koji email šalje preko [Resend](https://resend.com) API-ja.

**Bez podešavanja radi odmah**: ako `RESEND_API_KEY` nije postavljen, forma automatski otvara
email klijent posjetioca sa popunjenim podacima (mailto) — ne zahtijeva nikakav nalog ni ključ.

**Da uključite automatsko slanje emaila** (bez da posjetilac mora ručno potvrditi slanje):

1. Napravite besplatan nalog na [resend.com](https://resend.com) sa `nextframe.digital2025@gmail.com`.
2. Kopirajte API key i dodajte ga u Vercel project settings → Environment Variables kao
   `RESEND_API_KEY` (vidi [.env.example](.env.example)).
3. Redeploy — nema potrebe mijenjati kod.

## Deploy

Repo je povezan na GitHub. Za Vercel: Import Project → odaberite ovaj repo → deploy
(Next.js se prepoznaje automatski, nema dodatne konfiguracije).
