# NextFrame Digital

Sajt za NextFrame Digital – foto, video, dron i dizajn produkciju (Armin Šolbić).

Next.js 16 (App Router) + TypeScript + Tailwind CSS 4. Bez UI, 3D ili animacionih
biblioteka — scroll-reveal animacije su napravljene preko `IntersectionObserver`
([src/components/Reveal.tsx](src/components/Reveal.tsx)).

## Stranice

- `/` – početna
- `/o-nama` – o nama
- `/usluge` – vjenčanja, foto i video, dron, dizajn, marketing
- `/galerija` – albumi po vrsti, video (Facebook reels) i dizajn, u tabovima (`/galerija#sport`)
- `/galerija/<album>` – jedan album sa uvećavanjem fotografija
- `/partneri` – partneri i klijenti
- `/rezervacija` – forma za rezervaciju termina

Usluge, video i partneri (sa do tri slike po partneru) su u [src/lib/site-data.ts](src/lib/site-data.ts).

## 3D traka na početnoj

Filmske trake sa fotografijama crtaju se u čistom WebGL2 ([src/lib/film.ts](src/lib/film.ts)),
a miš, dodir i klik obrađuje [src/components/FilmHero.tsx](src/components/FilmHero.tsx). Koje su
fotografije na traci bira se na vrhu [src/app/page.tsx](src/app/page.tsx). Bez WebGL2 prikazuje se
običan red fotografija, a uz isključene animacije u sistemu traka miruje.

## Fotografije

Svaki album je folder u `public/images/radovi` (fajlovi `01.jpg`, `02.jpg`, ...), a spisak sa
dimenzijama je u [src/lib/albums.json](src/lib/albums.json). Fotografije su web kopije (duža
stranica 2560 px, JPEG 90) napravljene iz originala od 6000 px, koji nisu u repozitoriju.

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
