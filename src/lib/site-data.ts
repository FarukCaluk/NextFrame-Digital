export const site = {
  name: "NextFrame Digital",
  tagline: "Od ideje do vizije",
  description:
    "Fotografija, video, dron, dizajn i marketing na jednom mjestu. Za vjenčanja, sportske klubove i brendove.",
  instagram: "https://www.instagram.com/nextframe.digital/",
  facebook: "https://www.facebook.com/people/NextFrame/61566391409715/",
  linkedin: "https://www.linkedin.com/in/armin-%C5%A1olbi%C4%87-b1298325b/",
  email: "farukcaluk12@gmail.com",
};

export const nav = [
  { href: "/o-nama", label: "O nama" },
  { href: "/usluge", label: "Usluge" },
  { href: "/galerija", label: "Galerija" },
  { href: "/partneri", label: "Partneri" },
];

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  images: string[];
  reels?: string[];
  preview?: string;
};

const reel = (id: string) => `https://www.facebook.com/reel/${id}/`;

export const services: Service[] = [
  {
    slug: "vjencanja",
    title: "Vjenčanja",
    short: "Foto i video vjenčanja",
    description:
      "Foto i video priča vašeg vjenčanja, snimljena prirodno, od priprema do slavlja.",
    images: [
      "/images/portfolio/vjencanja-stepenice.jpg",
      "/images/portfolio/vjencanja-crno-bijelo.jpg",
      "/images/portfolio/vjencanja-prstenje.jpg",
    ],
    preview: "/images/portfolio/vjencanja-stepenice.jpg",
  },
  {
    slug: "foto-video",
    title: "Foto i video",
    short: "Sport, događaji, automobili",
    description:
      "Fotografija i video za sportske klubove, događaje, automobile i promotivne sadržaje.",
    images: [
      "/images/portfolio/sport-taekwondo-ogledalo.jpg",
      "/images/portfolio/auto-audi-cesta.jpg",
      "/images/portfolio/sport-fudbaler.jpg",
    ],
    preview: "/images/portfolio/sport-taekwondo-ogledalo.jpg",
  },
  {
    slug: "dron",
    title: "Dron",
    short: "Snimci iz zraka",
    description:
      "Snimci iz zraka za gradove, prirodu i događaje. Pogledajte Neretvu iz zraka.",
    images: [],
    reels: [reel("1636356934156393")],
  },
  {
    slug: "dizajn",
    title: "Dizajn",
    short: "Brendovi i društvene mreže",
    description:
      "Dizajn za brendove i društvene mreže: objave, promotivne grafike i vizuelni identitet.",
    images: [],
  },
  {
    slug: "marketing",
    title: "Marketing",
    short: "Sadržaj i društvene mreže",
    description:
      "Digitalni marketing i vođenje društvenih mreža: planiranje sadržaja, snimanje i objavljivanje.",
    images: [],
    reels: [reel("3484208181877704"), reel("1446142411906465")],
  },
];

export type Category = "Vjenčanja" | "Sport" | "Automobili" | "Događaji";

export type Photo = {
  src: string;
  alt: string;
  w: number;
  h: number;
  category: Category;
};

const P = "/images/portfolio/";

export const photos: Photo[] = [
  { src: P + "vjencanja-stepenice.jpg", alt: "Mladenci na stepenicama modernog objekta", w: 1334, h: 2000, category: "Vjenčanja" },
  { src: P + "sport-taekwondo-ogledalo.jpg", alt: "Taekwondo majstor ispred ogledala u dvorani", w: 2000, h: 1334, category: "Sport" },
  { src: P + "auto-audi-krov.jpg", alt: "Audi A3 na krovu parking garaže", w: 2000, h: 1334, category: "Automobili" },
  { src: P + "vjencanja-prstenje.jpg", alt: "Ruke mladenaca sa vjenčanim prstenjem", w: 1334, h: 2000, category: "Vjenčanja" },
  { src: P + "sport-kickbox.jpg", alt: "Trener i kickboks takmičar u uglu ringa", w: 1616, h: 1080, category: "Sport" },
  { src: P + "sport-fudbaler.jpg", alt: "Portret mladog fudbalera na terenu", w: 1334, h: 2000, category: "Sport" },
  { src: P + "vjencanja-crno-bijelo.jpg", alt: "Mladenci, crno-bijela fotografija vjenčanja", w: 1334, h: 2000, category: "Vjenčanja" },
  { src: P + "sport-taekwondo-majstor.jpg", alt: "Taekwondo trener ispred polaznika u dvorani", w: 2000, h: 1334, category: "Sport" },
  { src: P + "auto-audi-cesta.jpg", alt: "Audi A3 u vožnji na cesti", w: 2000, h: 1334, category: "Automobili" },
  { src: P + "dogadjaji-zastava.jpg", alt: "Djevojka sa zastavom na prozoru automobila u noćnom kadru", w: 1334, h: 2000, category: "Događaji" },
  { src: P + "sport-taekwondo-trening.jpg", alt: "Trening taekwondo kluba u dvorani", w: 2000, h: 1334, category: "Sport" },
  { src: P + "auto-audi-avion.jpg", alt: "Audi A3 i avion u slijetanju", w: 2000, h: 1334, category: "Automobili" },
  { src: P + "sport-trener-bosna-rudar.jpg", alt: "Leđa trenera sa natpisom Bosna Rudar", w: 2000, h: 1334, category: "Sport" },
  { src: P + "dogadjaji-kamion.jpg", alt: "Kamion sa zastavom Bosne i Hercegovine u noćnom kadru", w: 1334, h: 2000, category: "Događaji" },
  { src: P + "auto-audi-dva.jpg", alt: "Dva Audija na krovu garaže", w: 2000, h: 1334, category: "Automobili" },
  { src: P + "sport-taekwondo-grupa.jpg", alt: "Grupa mladih taekwondo takmičara u dvorani", w: 2000, h: 1125, category: "Sport" },
  { src: P + "sport-taekwondo-mural.jpg", alt: "Djeca na taekwondo treningu ispred murala", w: 2000, h: 1125, category: "Sport" },
];

export const categories: Category[] = ["Vjenčanja", "Sport", "Automobili", "Događaji"];

export type Reel = {
  url: string;
  title: string;
  tag?: string;
};

// Left out because Facebook refuses to embed them: Kakanj iz zraka (1381225033688486)
// and the Adin Boutique trenerke video post.
export const reels: Reel[] = [
  { url: reel("1636356934156393"), title: "Neretva iz zraka", tag: "Dron" },
  { url: reel("2085375498717968"), title: "Dr. Karić", tag: "Stomatološka ordinacija" },
  { url: reel("882032824911856"), title: "Adin Boutique", tag: "Nova kolekcija" },
  { url: reel("3484208181877704"), title: "MobiFon Shop" },
  { url: reel("1058319456728179"), title: "Adin Boutique", tag: "Osvježi stil" },
  { url: reel("1446142411906465"), title: "Sky Parking & Fly" },
  { url: reel("28825078587089597"), title: "Sky Parking & Fly" },
];

export type Partner = {
  name: string;
  logo?: string;
  href: string;
};

const L = "/images/partners/";
const ig = (handle: string) => `https://www.instagram.com/${handle}/`;

export const partners: Partner[] = [
  { name: "Taekwondo kolektiv Bosna Rudar", logo: L + "bosna-rudar.jpg", href: ig("tkdkolektivbosnarudar") },
  { name: "Stomatološka ordinacija Dr. Karić", logo: L + "dr-karic.jpg", href: ig("dr.karic_dent") },
  { name: "Adin Boutique", logo: L + "adin-boutique.jpg", href: "https://www.facebook.com/adin.boutique" },
  { name: "MobiFon Shop", logo: L + "mobifon.jpg", href: ig("mobifon_shop") },
  { name: "Sky Parking & Fly", logo: L + "sky-parking.jpg", href: ig("skyparkingandflyba") },
  { name: "Caffe & Restaurant Rondo", logo: L + "rondo.jpg", href: ig("caffe.restaurant.rondo") },
  { name: "SBK Mezz", logo: L + "sbk-mezz.jpg", href: ig("sbk_mezz") },
  { name: "TS Group", logo: L + "ts-group.jpg", href: ig("tsgroup.doo") },
  { name: "Wool & Mama", logo: L + "wool-and-mama.jpg", href: ig("woolandmama") },
  { name: "My Space", href: ig("myspace28.03") },
];

export const logoWall = partners.filter((p) => p.logo);
