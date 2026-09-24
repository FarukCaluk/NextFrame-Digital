export const site = {
  name: "NextFrame Digital",
  tagline: "Od ideje do vizije – sve na jednom mjestu",
  description:
    "Digitalni marketing, video, dizajn i foto produkcija. Snimanje vjenčanja, foto/video usluge, snimanje dronom i grafički dizajn.",
  instagram: "https://www.instagram.com/nextframe.digital/",
  email: "farukcaluk12@gmail.com",
};

export const nav = [
  { href: "/", label: "Početna" },
  { href: "/o-nama", label: "O nama" },
  { href: "/usluge", label: "Usluge" },
  { href: "/galerija", label: "Galerija" },
  { href: "/rezervacija", label: "Rezervacija" },
];

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  bullets: string[];
  image: string;
};

export const services: Service[] = [
  {
    slug: "vjencanja",
    title: "Vjenčanja",
    short: "Vaš dan, ispričan kao film.",
    description:
      "Svaki detalj vjenčanja – od pripreme do prve pjesme – snimljen je tako da mu se vraćate godinama. Diskretan pristup na licu mjesta, bez ometanja gostiju i mladenaca.",
    bullets: [
      "Cjelodnevno snimanje fotografijom i videom",
      "Filmski video vjenčanja + kratki highlight za društvene mreže",
      "Profesionalna obrada i color grading",
      "Opcionalno snimanje dronom za vanjske kadrove",
    ],
    image: "/images/portfolio-wedding-1.jpg",
  },
  {
    slug: "foto-video",
    title: "Foto / Video",
    short: "Produkcija za brendove, event i intervjue.",
    description:
      "Produktna fotografija, promotivni video, intervjui i sadržaj za društvene mreže – sve snimljeno i montirano u modernom, dinamičnom stilu koji radi na svakoj platformi.",
    bullets: [
      "Promo i reklamni video za brendove",
      "Intervjui i testimonijali",
      "Foto produkcija za proizvode i usluge",
      "Sadržaj prilagođen Instagramu, TikToku i YouTubeu",
    ],
    image: "/images/portfolio-reel-1.jpg",
  },
  {
    slug: "dron",
    title: "Snimanje dronom",
    short: "Perspektiva koja podiže svaki projekat.",
    description:
      "Zračni kadrovi za nekretnine, events, turizam i vjenčanja. Sigurno, profesionalno i sa opremom koja hvata detalje u punoj rezoluciji.",
    bullets: [
      "Snimanje nekretnina i objekata",
      "Zračni kadrovi za vjenčanja i events",
      "Turistički i promotivni materijali",
      "4K rezolucija, stabilizovani kadrovi",
    ],
    image: "/images/portfolio-wedding-2.jpg",
  },
  {
    slug: "dizajn",
    title: "Dizajn",
    short: "Vizuelni identitet koji se pamti.",
    description:
      "Logo dizajn, vizuelni identitet, promotivni materijali i sadržaj za društvene mreže – dizajn koji vaš brend čini prepoznatljivim.",
    bullets: [
      "Logo i vizuelni identitet",
      "Dizajn za društvene mreže",
      "Promotivni i print materijali",
      "Šabloni za redovan sadržaj (content plan)",
    ],
    image: "/images/portfolio-reel-2.jpg",
  },
];

export type PortfolioItem = {
  src: string;
  alt: string;
  category: "Vjenčanja" | "Foto/Video";
};

export const portfolio: PortfolioItem[] = [
  { src: "/images/portfolio-wedding-1.jpg", alt: "Mladenci na vjenčanju – NextFrame Digital", category: "Vjenčanja" },
  { src: "/images/portfolio-wedding-2.jpg", alt: "Mladenci sa konjem na vjenčanju – NextFrame Digital", category: "Vjenčanja" },
  { src: "/images/portfolio-reel-1.jpg", alt: "Video produkcija – NextFrame Digital", category: "Foto/Video" },
  { src: "/images/portfolio-reel-2.jpg", alt: "Video produkcija – NextFrame Digital", category: "Foto/Video" },
  { src: "/images/portfolio-reel-3.jpg", alt: "Video produkcija vjenčanja – NextFrame Digital", category: "Vjenčanja" },
];

export const partners = [
  "Caffe & Restaurant Rondo",
  "TS GROUP D.O.O.",
  "MobiFon Shop",
  "Wool & Mama",
  "Sky Parking & Fly",
  "Foto Kubura Studio",
];

export const stats = [
  { value: "700+", label: "pratilaca na Instagramu" },
  { value: "200+", label: "objavljenih projekata" },
  { value: "6+", label: "stalnih partnera" },
  { value: "4", label: "usluge pod jednim krovom" },
];
